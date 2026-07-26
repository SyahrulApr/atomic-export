/**
 * Generates the narration track from vo-text/ and fits it to the video.
 *
 *   node tools/tts-build.mjs [part] [voiceId]
 *
 *   part     'demo' (default) or 'pitch'
 *   voiceId  ElevenLabs voice id; defaults to a free-tier voice
 *
 * Two-stage fit, because engines cannot be pinned to an exact length:
 *
 *   1. Ask for a faster read natively (`speed` in voice_settings). This sounds
 *      better than resampling after the fact, but the engine applies it
 *      conservatively, so it only gets part of the way.
 *   2. Close the remainder with ffmpeg `atempo`, which is only acceptable in
 *      small doses. Anything past about 8% starts to sound processed, so the
 *      script reports it rather than silently applying a large correction.
 *
 * Output:
 *   vo-out/<part>/NN-name.mp3   per segment, fitted
 *   vo-out/<part>.mp3           one track, segments placed at scene offsets
 *   vo-out/<part>-report.json   measured vs target, and the correction used
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const PART = process.argv[2] ?? 'demo'
// Brian: read fastest of the free-tier voices sampled, which leaves the least
// correction to do afterwards
const VOICE = process.argv[3] ?? process.env.TTS_VOICE_ID ?? 'nPczCjzI2devNBz1zQrb'
const MODEL = process.env.TTS_MODEL ?? 'eleven_multilingual_v2'
const SPEED = Number(process.env.TTS_SPEED ?? 1.2) // 0.7-1.2 accepted
const ATEMPO_WARN = 1.08

const SRC = path.resolve('vo-text', PART)
const OUT = path.resolve('vo-out', PART)

const envFile = path.resolve('.env.local')
if (!process.env.ELEVENLABS_API_KEY && fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^ELEVENLABS_API_KEY=(.+)$/)
    if (m) process.env.ELEVENLABS_API_KEY = m[1].trim()
  }
}
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error('ELEVENLABS_API_KEY not set (put it in .env.local)')

const durationOf = (f) =>
  Number(
    execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'csv=p=0',
      f,
    ]).toString().trim(),
  )

async function tts(text) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'content-type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true,
          speed: SPEED,
        },
      }),
    },
  )
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

// ------------------------------------------------------------------ generate
// wipe first: scene durations are in the filenames, so a retime would
// otherwise leave stale mp3s from the previous timing next to the new ones
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const segs = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith('.txt'))
  .sort()
  .map((f) => ({
    file: f,
    name: f.replace('.txt', ''),
    target: Number(f.match(/-(\d+)s\.txt$/)[1]),
    text: fs.readFileSync(path.join(SRC, f), 'utf8').trim(),
  }))

const report = []

for (const seg of segs) {
  const raw = path.join(OUT, `${seg.name}.raw.mp3`)
  const fitted = path.join(OUT, `${seg.name}.mp3`)

  fs.writeFileSync(raw, await tts(seg.text))
  const rawDur = durationOf(raw)

  // only ever speed up, never slow down: a short segment just leaves silence,
  // which is fine, whereas stretching audio to fill a gap sounds worse
  const tempo = Math.max(1, rawDur / seg.target)

  if (tempo > 1.001) {
    execFileSync('ffmpeg', [
      '-y', '-i', raw,
      '-filter:a', `atempo=${tempo.toFixed(4)}`,
      '-c:a', 'libmp3lame', '-q:a', '2',
      fitted,
    ], { stdio: ['ignore', 'ignore', 'pipe'] })
  } else {
    fs.copyFileSync(raw, fitted)
  }

  const finalDur = durationOf(fitted)
  fs.rmSync(raw)

  report.push({
    name: seg.name,
    target: seg.target,
    rawSeconds: Number(rawDur.toFixed(2)),
    atempo: Number(tempo.toFixed(4)),
    finalSeconds: Number(finalDur.toFixed(2)),
    chars: seg.text.length,
  })

  const flag = tempo > ATEMPO_WARN ? '  <-- atempo tinggi, pertimbangkan potong teks' : ''
  console.log(
    `  ${seg.name.padEnd(26)} ${String(seg.target).padStart(3)}s  ` +
      `mentah ${rawDur.toFixed(2).padStart(6)}s  atempo ${tempo.toFixed(3)}  ` +
      `jadi ${finalDur.toFixed(2)}s${flag}`,
  )
}

// --------------------------------------------------------- assemble one track
// Place each segment at its scene offset so the narration lines up with the
// picture, padding the gaps with silence.
let offset = 0
const inputs = []
const filters = []
segs.forEach((seg, i) => {
  inputs.push('-i', path.join(OUT, `${seg.name}.mp3`))
  filters.push(`[${i}:a]adelay=${Math.round(offset * 1000)}|${Math.round(offset * 1000)}[a${i}]`)
  offset += seg.target
})
const mix =
  filters.join(';') +
  ';' +
  segs.map((_, i) => `[a${i}]`).join('') +
  `amix=inputs=${segs.length}:normalize=0[out]`

const track = path.resolve('vo-out', `${PART}.mp3`)
execFileSync('ffmpeg', [
  '-y', ...inputs,
  '-filter_complex', mix,
  '-map', '[out]',
  '-c:a', 'libmp3lame', '-q:a', '2',
  track,
], { stdio: ['ignore', 'ignore', 'pipe'] })

fs.writeFileSync(
  path.resolve('vo-out', `${PART}-report.json`),
  JSON.stringify(
    { voice: VOICE, model: MODEL, speed: SPEED, segments: report },
    null,
    2,
  ) + '\n',
)

const totalRaw = report.reduce((a, r) => a + r.rawSeconds, 0)
const totalTarget = report.reduce((a, r) => a + r.target, 0)
const worst = report.reduce((a, r) => (r.atempo > a.atempo ? r : a))

console.log(`\ntrack   ${path.relative(process.cwd(), track)}  ${durationOf(track).toFixed(2)}s`)
console.log(`mentah  ${totalRaw.toFixed(1)}s vs ruang video ${totalTarget}s`)
console.log(`atempo tertinggi  ${worst.atempo} pada ${worst.name}`)

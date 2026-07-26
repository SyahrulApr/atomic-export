/**
 * Prepares a recording and creates an ElevenLabs instant voice clone from it.
 *
 *   node tools/voice-clone.mjs <recording> [voiceName]
 *
 * Preparation is deliberately minimal. ElevenLabs learns whatever is in the
 * sample, so noise reduction and heavy EQ get modelled along with the voice.
 * The only things done here are the ones that are unambiguously wins:
 *
 *   - take a single channel rather than downmixing. A phone or interface
 *     recording is often lopsided, and averaging a loud channel with a quiet
 *     one throws away signal.
 *   - pull the peaks off the ceiling. Samples pinned at 0 dBFS are clipped,
 *     and clipping is distortion the model would learn as part of the voice.
 *   - keep the original sample rate, as long as it is above 22 kHz.
 *
 * Prints the new voice id on success; pass it to tts-build.mjs.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'

const SRC = path.resolve(process.argv[2] ?? '')
const NAME = process.argv[3] ?? 'Atomic Export narrator'
const CHANNEL = Number(process.env.CLONE_CHANNEL ?? 0)
const HEADROOM_DB = Number(process.env.CLONE_HEADROOM_DB ?? 1.5)
// Instant cloning wants one to three minutes; past that the extra audio adds
// little. Capping also keeps the upload under the API's 11 MB limit.
const MAX_SECONDS = Number(process.env.CLONE_MAX_SECONDS ?? 180)
const SKIP_SECONDS = Number(process.env.CLONE_SKIP_SECONDS ?? 0)

if (!SRC || !fs.existsSync(SRC)) {
  throw new Error(`recording not found: ${SRC || '(no path given)'}`)
}

const envFile = path.resolve('.env.local')
if (!process.env.ELEVENLABS_API_KEY && fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^ELEVENLABS_API_KEY=(.+)$/)
    if (m) process.env.ELEVENLABS_API_KEY = m[1].trim()
  }
}
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error('ELEVENLABS_API_KEY not set (put it in .env.local)')

const probe = (args) =>
  execFileSync('ffprobe', ['-v', 'error', ...args, '-of', 'default=nw=1', SRC])
    .toString()
    .trim()

const info = Object.fromEntries(
  probe(['-show_entries', 'format=duration:stream=sample_rate,channels'])
    .split('\n')
    .map((l) => l.split('=')),
)
const duration = Number(info.duration)
const rate = Number(info.sample_rate)

console.log(`sumber   ${path.basename(SRC)}`)
console.log(`         ${duration.toFixed(1)}s  ${rate} Hz  ${info.channels} kanal`)

if (duration < 60) {
  console.warn('\nWARNING: di bawah satu menit. Instant cloning ingin 1-3 menit.')
}
if (rate < 22050) {
  console.warn(`\nWARNING: ${rate} Hz di bawah 22 kHz yang disarankan.`)
}

const OUT = path.resolve('vo-out/clone-source.mp3')
fs.mkdirSync(path.dirname(OUT), { recursive: true })

const filters = [`pan=mono|c0=c${CHANNEL}`, `volume=-${HEADROOM_DB}dB`]

// mp3 rather than wav: the API caps uploads at 11 MB and 192 kbps mono is
// transparent for speech
execFileSync(
  'ffmpeg',
  [
    '-y',
    ...(SKIP_SECONDS ? ['-ss', String(SKIP_SECONDS)] : []),
    '-t', String(MAX_SECONDS),
    '-i', SRC,
    '-af', filters.join(','),
    '-c:a', 'libmp3lame', '-b:a', '192k',
    OUT,
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
)

// volumedetect reports on stderr, so spawnSync is needed to read it back
const check = spawnSync(
  'ffmpeg',
  ['-i', OUT, '-af', 'volumedetect', '-f', 'null', '-'],
  { encoding: 'utf8' },
).stderr
const clipped = check.match(/histogram_0db: (\d+)/)?.[1] ?? '0'
const peak = check.match(/max_volume: (\S+)/)?.[1] ?? '?'
const mean = check.match(/mean_volume: (\S+)/)?.[1] ?? '?'

const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(1)
console.log(`\nsiap     ${path.relative(process.cwd(), OUT)}  ${mb} MB`)
const usedSeconds = Math.min(MAX_SECONDS, duration - SKIP_SECONDS)
console.log(`         kanal ${CHANNEL}, mono, ${usedSeconds.toFixed(0)}s dipakai`)
console.log(`         puncak ${peak} dB, rata ${mean} dB`)
console.log(`         sample di 0 dB: ${clipped}`)

console.log('\nmengunggah ...')
const form = new FormData()
form.append('name', NAME)
form.append(
  'description',
  'Narasi bahasa Indonesia untuk video submission Atomic Export.',
)
form.append('files', new Blob([fs.readFileSync(OUT)]), 'clone-source.mp3')

const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
  method: 'POST',
  headers: { 'xi-api-key': KEY },
  body: form,
})
const body = await res.text()
if (!res.ok) throw new Error(`${res.status} ${body}`)

const voiceId = JSON.parse(body).voice_id
console.log(`\nvoice_id ${voiceId}`)
console.log(`\npakai:\n  TTS_SPEED=1.08 node tools/tts-build.mjs demo ${voiceId}`)

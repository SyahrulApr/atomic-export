/**
 * Mixes a music bed under the narration and muxes the result onto the video.
 *
 *   node tools/mix-music.mjs <video> <narration.mp3> <music...> [out.mp4]
 *
 * More than one music file plays in sequence, crossfading at SWITCH_AT:
 *
 *   SWITCH_AT=82 node tools/mix-music.mjs video.mp4 vo.mp3 a.mp3 b.mp3 out.mp4
 *
 * The music is ducked against the narration rather than set to a fixed level.
 * A static bed either fights the voice during speech or leaves the pauses
 * feeling empty; ducking gives both. The narration drives a sidechain
 * compressor on the music, so the bed steps back when someone talks and
 * returns in the gaps.
 *
 * The mix is normalised to -14 LUFS, which is what YouTube targets. A quieter
 * master gets turned up on playback and a louder one turned down, so hitting
 * the target is how the intended balance survives.
 *
 * Released music is mastered loud, often peaking at 0 dBFS, so it needs a lot
 * more attenuation than a library bed before ducking has anything to work
 * with. That is what MUSIC_DB is for.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
if (args.length < 3) {
  throw new Error(
    'usage: node tools/mix-music.mjs <video> <narration.mp3> <music...> [out.mp4]',
  )
}

const VIDEO = path.resolve(args[0])

// Pass "none" as the narration to get music only, for laying a voice over
// later in an editor. Without a voice there is nothing to duck against, and
// the target loudness has to be lower: normalising music alone to -14 LUFS
// makes it as loud as a finished mix, leaving no room for speech on top.
const NO_VO = args[1] === 'none'
const VO = NO_VO ? null : path.resolve(args[1])
const LUFS = Number(process.env.LUFS ?? (NO_VO ? -20 : -14))

// trailing .mp4 is the output; everything between is music
const last = args[args.length - 1]
const hasOut = /\.mp4$/i.test(last) && args.length > 3
const OUT = path.resolve(hasOut ? last : '../video-out/FINAL-with-music.mp4')
const MUSIC = args.slice(2, hasOut ? -1 : undefined).map((f) => path.resolve(f))

// Measured against this narration: at -20 dB with a gentle sidechain the bed
// lands about 12 dB under the voice, which is the band where music is audible
// without competing. The first attempt used -22 dB with threshold 0.02 and
// ratio 12, which put it 19 dB down; since this narration has almost no pauses
// the bed never recovered and the music was inaudible.
const MUSIC_DB = Number(process.env.MUSIC_DB ?? -20)
const DUCK_THRESHOLD = Number(process.env.DUCK_THRESHOLD ?? 0.05)
const DUCK_RATIO = Number(process.env.DUCK_RATIO ?? 6)
const DUCK_RELEASE = Number(process.env.DUCK_RELEASE ?? 300)
const FADE = Number(process.env.MUSIC_FADE ?? 2)
const XFADE = Number(process.env.MUSIC_XFADE ?? 3)
const SWITCH_AT = (process.env.SWITCH_AT ?? '')
  .split(',')
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n) && n > 0)

if (!fs.existsSync(VIDEO)) throw new Error(`video not found: ${VIDEO}`)
if (VO && !fs.existsSync(VO)) throw new Error(`narration not found: ${VO}`)
for (const m of MUSIC) {
  if (!fs.existsSync(m)) throw new Error(`music not found: ${m}`)
}
if (MUSIC.length > 1 && SWITCH_AT.length !== MUSIC.length - 1) {
  throw new Error(
    `${MUSIC.length} music files need ${MUSIC.length - 1} switch point(s); ` +
      `set SWITCH_AT (e.g. SWITCH_AT=82)`,
  )
}

const durationOf = (f) =>
  Number(
    execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'csv=p=0',
      f,
    ]).toString().trim(),
  )

const vDur = durationOf(VIDEO)

console.log(`video      ${vDur.toFixed(2)}s  ${path.basename(VIDEO)}`)
console.log(
  VO
    ? `narasi     ${durationOf(VO).toFixed(2)}s  ${path.basename(VO)}`
    : `narasi     (tidak ada, musik saja)`,
)

// Each track covers a window of the timeline. Loop it if it is shorter than
// its window, trim it if longer, then fade its edges so the joins are soft.
const bounds = [0, ...SWITCH_AT, vDur]
const parts = []
MUSIC.forEach((m, i) => {
  const from = bounds[i]
  const to = bounds[i + 1]
  const span = to - from + (i < MUSIC.length - 1 ? XFADE : 0)
  const mDur = durationOf(m)
  console.log(
    `musik ${i + 1}    ${mDur.toFixed(2)}s  ${path.basename(m)}` +
      `  ->  ${from.toFixed(0)}-${to.toFixed(0)}s` +
      (mDur < span ? '  (di-loop)' : ''),
  )
  parts.push({ from, to, span })
})

const chain = []
MUSIC.forEach((_, i) => {
  const { span } = parts[i]
  const inIdx = i + (VO ? 2 : 1) // 0 is video, then narration if present
  const fadeIn = i === 0 ? FADE : XFADE
  const fadeOut = i === MUSIC.length - 1 ? FADE : XFADE
  chain.push(
    `[${inIdx}:a]aloop=loop=-1:size=2e9,atrim=0:${span.toFixed(3)},asetpts=N/SR/TB,` +
      `afade=t=in:st=0:d=${fadeIn},` +
      `afade=t=out:st=${Math.max(0, span - fadeOut).toFixed(3)}:d=${fadeOut},` +
      `adelay=${Math.round(parts[i].from * 1000)}|${Math.round(parts[i].from * 1000)}[m${i}]`,
  )
})

const bed =
  MUSIC.length === 1
    ? '[m0]anull[bed];'
    : `${MUSIC.map((_, i) => `[m${i}]`).join('')}amix=inputs=${MUSIC.length}:normalize=0[bed];`

const filter = VO
  ? [
      chain.join(';') + ';',
      bed,
      `[bed]volume=${MUSIC_DB}dB[bedq];`,
      // one copy of the voice goes to the mix, the other drives the ducking
      `[1:a]asplit=2[vo][key];`,
      `[bedq][key]sidechaincompress=threshold=${DUCK_THRESHOLD}:ratio=${DUCK_RATIO}:attack=20:release=${DUCK_RELEASE}[ducked];`,
      `[vo][ducked]amix=inputs=2:normalize=0:duration=first[mixed];`,
      `[mixed]loudnorm=I=${LUFS}:TP=-1.5:LRA=11[out]`,
    ].join('')
  : [
      chain.join(';') + ';',
      bed,
      `[bed]loudnorm=I=${LUFS}:TP=-3:LRA=9[out]`,
    ].join('')

console.log(
  VO
    ? `\nmixing (bed ${MUSIC_DB} dB, ducked terhadap narasi, target ${LUFS} LUFS) ...`
    : `\nmixing musik saja (target ${LUFS} LUFS, menyisakan ruang untuk VO) ...`,
)

execFileSync(
  'ffmpeg',
  [
    '-y',
    '-i', VIDEO,
    ...(VO ? ['-i', VO] : []),
    ...MUSIC.flatMap((m) => ['-i', m]),
    '-filter_complex', filter,
    '-map', '0:v:0',
    '-map', '[out]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-movflags', '+faststart',
    '-t', String(vDur),
    OUT,
  ],
  { stdio: ['ignore', 'ignore', 'pipe'] },
)

// report the balance actually achieved, so "narration stays audible" is a
// measurement rather than an opinion
const stats = spawnSync(
  'ffmpeg',
  ['-i', OUT, '-af', 'volumedetect', '-f', 'null', '-'],
  { encoding: 'utf8' },
).stderr
const mean = stats.match(/mean_volume: (\S+)/)?.[1] ?? '?'
const peak = stats.match(/max_volume: (\S+)/)?.[1] ?? '?'

const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(0)
console.log(`\nwrote      ${OUT}`)
console.log(`           ${durationOf(OUT).toFixed(2)}s  ${mb} MB`)
console.log(`           mean ${mean} dB, puncak ${peak} dB`)
if (VO) {
  console.log(
    `\nMusik ada di sekitar 12 dB di bawah narasi. Untuk menggeser:` +
      `\n  MUSIC_DB=-19  musik lebih terdengar` +
      `\n  MUSIC_DB=-23  musik lebih mundur`,
  )
}

/**
 * Muxes the narration track onto the rendered video.
 *
 *   node tools/mux-video.mjs [videoIn] [audioIn] [videoOut]
 *
 * Defaults produce ../video-out/demo-final.mp4 from the Remotion render and
 * vo-out/demo.mp3.
 *
 * The video stream is copied, not re-encoded: it has already been through
 * H.264 once and a second pass would only lose quality. Audio is encoded to
 * AAC, which is what YouTube expects.
 *
 * `-shortest` is deliberately not used. The narration is a little shorter than
 * the picture, and trimming the video to the audio would cut the tail of the
 * closing scene.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const VIDEO = path.resolve(
  process.argv[2] ?? '../video-out/approach-B-remotion.mp4',
)
const AUDIO = path.resolve(process.argv[3] ?? 'vo-out/demo.mp3')
const OUT = path.resolve(process.argv[4] ?? '../video-out/demo-final.mp4')

for (const [label, f] of [['video', VIDEO], ['audio', AUDIO]]) {
  if (!fs.existsSync(f)) throw new Error(`${label} not found: ${f}`)
}

const probe = (f, entries) =>
  execFileSync('ffprobe', [
    '-v', 'error',
    '-show_entries', entries,
    '-of', 'default=nw=1',
    f,
  ]).toString().trim()

const vDur = Number(probe(VIDEO, 'format=duration').split('=')[1])
const aDur = Number(probe(AUDIO, 'format=duration').split('=')[1])

console.log(`video  ${vDur.toFixed(2)}s  ${path.basename(VIDEO)}`)
console.log(`audio  ${aDur.toFixed(2)}s  ${path.basename(AUDIO)}`)

if (aDur > vDur + 0.5) {
  console.warn(
    `\nWARNING: narration runs ${(aDur - vDur).toFixed(2)}s past the picture.` +
      `\nThe tail will be cut. Shorten a segment or lengthen a scene in scenes.ts.`,
  )
}

execFileSync('ffmpeg', [
  '-y',
  '-i', VIDEO,
  '-i', AUDIO,
  '-map', '0:v:0',
  '-map', '1:a:0',
  '-c:v', 'copy',
  '-c:a', 'aac',
  '-b:a', '192k',
  '-movflags', '+faststart',
  OUT,
], { stdio: ['ignore', 'ignore', 'inherit'] })

const outDur = Number(probe(OUT, 'format=duration').split('=')[1])
const size = (fs.statSync(OUT).size / 1024 / 1024).toFixed(0)
console.log(`\nwrote  ${OUT}`)
console.log(`       ${outDur.toFixed(2)}s  ${size} MB`)
console.log(`       ${probe(OUT, 'stream=width,height,r_frame_rate,codec_name').replace(/\n/g, '  ')}`)

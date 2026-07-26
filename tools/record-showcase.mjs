/**
 * Records the /showcase timeline to an mp4.
 *
 * The dev (or prod) server must already be running on PORT.
 *
 *   node tools/record-showcase.mjs [outFile] [seconds]
 *
 * Playback is real time, so the run takes as long as the video. Chromium
 * records webm; ffmpeg then normalises it to 30fps H.264 at 1920x1080, which
 * is what the submission requires.
 */
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const OUT = path.resolve(process.argv[2] ?? 'video-out/approach-A-gsap.mp4')
const SECONDS = Number(process.argv[3] ?? 123)
const PORT = process.env.PORT ?? '3000'
const URL = `http://localhost:${PORT}/showcase?rec=1`

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'showcase-rec-'))
fs.mkdirSync(path.dirname(OUT), { recursive: true })

console.log(`recording ${URL} for ${SECONDS}s`)

const browser = await chromium.launch({
  args: ['--force-device-scale-factor=1', '--hide-scrollbars'],
})
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  recordVideo: { dir: tmp, size: { width: 1920, height: 1080 } },
})
const page = await ctx.newPage()

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForFunction(() => !!window.__showcase, null, { timeout: 20000 })

// start from frame 0 so the recording is not missing the opening beat
await page.evaluate(() => {
  const tl = window.__showcase
  tl.seek(0)
  tl.play()
})

await page.waitForTimeout(SECONDS * 1000)

await ctx.close()
await browser.close()

const webm = fs.readdirSync(tmp).find((f) => f.endsWith('.webm'))
if (!webm) throw new Error('chromium produced no video file')

console.log('transcoding ...')
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-i', path.join(tmp, webm),
    '-vf', 'fps=30,scale=1920:1080:flags=lanczos',
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    OUT,
  ],
  { stdio: ['ignore', 'ignore', 'inherit'] },
)

fs.rmSync(tmp, { recursive: true, force: true })
console.log('wrote', OUT)

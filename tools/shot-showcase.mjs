/**
 * Grabs still frames from the /showcase timeline at given timestamps.
 *
 *   node tools/shot-showcase.mjs 8,15,63 out/prefix [scale]
 *
 * Used for reviewing composition without sitting through playback, and to
 * export high-resolution panel stills for the Remotion composition (pass a
 * scale of 2 for retina assets).
 *
 * Note: captions and the Copilot thread animate on their own real-time clock,
 * so a still taken right after a seek can catch them mid-entrance. The wait
 * below is tuned to let them settle.
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const times = (process.argv[2] ?? '3').split(',').map(Number)
const prefix = path.resolve(process.argv[3] ?? 'video-out/frames/shot')
const scale = Number(process.argv[4] ?? 1)
const PORT = process.env.PORT ?? '3000'

fs.mkdirSync(path.dirname(prefix), { recursive: true })

const browser = await chromium.launch({ args: ['--hide-scrollbars'] })
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: scale,
})

await page.goto(`http://localhost:${PORT}/showcase?autoplay=0&rec=1`, {
  waitUntil: 'networkidle',
})
await page.waitForFunction(() => !!window.__showcase, null, { timeout: 20000 })
await page.waitForTimeout(700)

for (const t of times) {
  await page.evaluate((tt) => {
    const tl = window.__showcase
    tl.pause()
    tl.seek(0)
    tl.seek(tt)
  }, t)
  // let the Copilot replay and caption reveals finish
  await page.waitForTimeout(7000)

  const file = `${prefix}-${String(t).replace('.', '_')}s.jpeg`
  await page.screenshot({ path: file, type: 'jpeg', quality: 90 })
  console.log('wrote', file)
}

await browser.close()

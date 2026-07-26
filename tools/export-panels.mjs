/**
 * Exports each dashboard panel as a 3x still for the Remotion composition.
 *
 *   node tools/export-panels.mjs [outDir]
 *
 * Output is 5760x3240 PNG per panel, so the Remotion camera can push past
 * 1.3x without the frame going soft.
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve(
  process.argv[2] ?? '../showcase-remotion/public/panels',
)
const PORT = process.env.PORT ?? '3000'

const PANELS = [
  'overview',
  'atomic',
  'copilot',
  'readiness',
  'documents',
  'market',
  'qc',
  'logistics',
  'track',
]

fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ args: ['--hide-scrollbars'] })
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 3,
})

for (const panel of PANELS) {
  await page.goto(
    `http://localhost:${PORT}/showcase?still=${panel}`,
    { waitUntil: 'networkidle' },
  )
  // recharts animates its series in on mount; wait it out
  await page.waitForTimeout(2500)

  const file = path.join(OUT, `${panel}.png`)
  await page.screenshot({ path: file, type: 'png' })
  console.log('wrote', file)
}

await browser.close()

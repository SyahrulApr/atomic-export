/**
 * Captures a screenshot of every page and feature for the proposal appendix.
 *
 *   node tools/capture-pages.mjs [outDir]
 *
 * The dev server must be running on PORT.
 *
 * Landing sections are captured as element screenshots rather than scrolled
 * viewport grabs, so each image is cropped to the section itself with no
 * half-visible neighbour. Dashboard panels are captured as full viewport,
 * because the sidebar showing which feature is open is part of what the
 * reader needs to see.
 *
 * The dashboard sits behind the session cookie the login route sets, so the
 * cookie is injected directly instead of driving the form each time.
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve(process.argv[2] ?? '../lampiran/screenshots')
const PORT = process.env.PORT ?? '3000'
const BASE = `http://localhost:${PORT}`
const SCALE = Number(process.env.SHOT_SCALE ?? 2)

/** Landing sections, in document order, as probed from the page. */
const LANDING = [
  { slug: 'hero', title: 'Halaman Utama — Hero' },
  { slug: 'partners', title: 'Halaman Utama — Ekosistem Mitra' },
  { slug: 'masalah', title: 'Halaman Utama — Akar Masalah' },
  { slug: 'alur', title: 'Halaman Utama — Alur Kerja Enam Tahap' },
  { slug: 'fitur', title: 'Halaman Utama — Arsitektur Teknologi' },
  { slug: 'dampak', title: 'Halaman Utama — Skala Dampak' },
  { slug: 'roadmap', title: 'Halaman Utama — Model Bisnis Bertahap' },
  { slug: 'arsitektur', title: 'Halaman Utama — Arsitektur Sistem' },
  { slug: 'cta', title: 'Halaman Utama — Ajakan Masuk Dashboard' },
]

/** Dashboard panels, by the sidebar label used to open them. */
const PANELS = [
  { nav: 'Beranda', slug: 'beranda', title: 'Dashboard — Beranda' },
  { nav: 'Atomic Steps', slug: 'atomic-steps', title: 'Dashboard — Atomic Steps' },
  { nav: 'AI Copilot', slug: 'ai-copilot', title: 'Dashboard — AI Copilot Regulasi' },
  { nav: 'Readiness Score', slug: 'readiness-score', title: 'Dashboard — Export Readiness Score' },
  { nav: 'Dokumen', slug: 'dokumen', title: 'Dashboard — Otomasi Dokumen Ekspor' },
  { nav: 'Market & P2P2B', slug: 'market-p2p2b', title: 'Dashboard — Market dan Matchmaking P2P2B' },
  { nav: 'QC Hybrid', slug: 'qc-hybrid', title: 'Dashboard — QC Hybrid Computer Vision' },
  { nav: 'Logistik LCL ke FCL', slug: 'logistik', title: 'Dashboard — Konsolidasi Logistik LCL ke FCL' },
  { nav: 'Track Record', slug: 'track-record', title: 'Dashboard — Digital Export Track Record' },
]

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ args: ['--hide-scrollbars'] })
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: SCALE,
})
await ctx.addCookies([
  { name: 'ae_session', value: '1', domain: 'localhost', path: '/' },
])
const page = await ctx.newPage()

const manifest = []
let n = 0

const shot = async (target, slug, title) => {
  n += 1
  const file = `${String(n).padStart(2, '0')}-${slug}.png`
  await target.screenshot({ path: path.join(OUT, file) })
  manifest.push({ n, file, title })
  console.log(`  ${String(n).padStart(2)}. ${title}`)
}

// ------------------------------------------------------------------- landing
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
// the landing animates sections in on scroll, so each has to be brought into
// view and given time before it is captured
const sections = await page.$$('main > section')
for (let i = 0; i < LANDING.length && i < sections.length; i++) {
  await sections[i].scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await shot(sections[i], LANDING[i].slug, LANDING[i].title)
}

// --------------------------------------------------------------------- login
await ctx.clearCookies()
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
await shot(page, 'login', 'Halaman Login')

// ----------------------------------------------------------------- dashboard
await ctx.addCookies([
  { name: 'ae_session', value: '1', domain: 'localhost', path: '/' },
])
await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// The dashboard opens a guided-tour prompt over everything, which swallows
// clicks on the sidebar. Dismiss it before touching the nav.
const skip = page.getByRole('button', { name: 'Nanti saja' })
if (await skip.count()) {
  await skip.first().click()
  await page.waitForTimeout(800)
}

for (const panel of PANELS) {
  await page.getByRole('button', { name: panel.nav, exact: false }).first().click()
  // recharts animates its series in, and the Copilot types its thread out
  await page.waitForTimeout(panel.slug === 'ai-copilot' ? 9000 : 2500)
  await shot(page, panel.slug, panel.title)
}

await browser.close()

fs.writeFileSync(
  path.join(OUT, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
)
console.log(`\n${manifest.length} tangkapan layar -> ${OUT}`)

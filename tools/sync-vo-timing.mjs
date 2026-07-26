/**
 * Rewrites the demo-section timecodes in VIDEO_SCRIPT_VO.md from
 * components/showcase/scenes.ts.
 *
 *   node tools/sync-vo-timing.mjs
 *
 * scenes.ts is the single source of truth for scene lengths. The markdown
 * headings are written for a human to read, so they are kept in sync here
 * rather than being edited by hand, which is how they drifted before.
 *
 * Run this after changing any scene duration, then rebuild the text:
 *   node tools/sync-vo-timing.mjs && node tools/build-vo-text.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const SCENES = path.resolve('components/showcase/scenes.ts')
const SCRIPT = path.resolve('VIDEO_SCRIPT_VO.md')

// words per second a text-to-speech read actually lands on, measured from the
// generated segments rather than assumed
const WORDS_PER_SECOND = 2.5

const scenes = [
  ...fs
    .readFileSync(SCENES, 'utf8')
    .matchAll(/id: '([a-z]+)',\s*start: (\d+),\s*dur: (\d+)/g),
].map((m) => ({ id: m[1], start: Number(m[2]), dur: Number(m[3]) }))

if (!scenes.length) throw new Error('no scenes parsed')

const md = fs.readFileSync(SCRIPT, 'utf8')
const lines = md.split('\n')

const demoStart = lines.findIndex((l) => /^#\s+BAGIAN\s+2/.test(l))
if (demoStart < 0) throw new Error('demo section not found')

const HEADING = /^###\s+\d+-\d+\s+detik\s*·\s*(`?)([a-z-]+)\1\s*\(±\s*\d+\s*kata\)\s*$/

let i = 0
const out = lines.map((line, idx) => {
  if (idx <= demoStart) return line
  const m = line.match(HEADING)
  if (!m) return line

  const scene = scenes[i]
  if (!scene) throw new Error(`more headings than scenes at index ${i}`)
  if (scene.id !== m[2]) {
    throw new Error(
      `heading order does not match scenes.ts: heading "${m[2]}" vs scene "${scene.id}"`,
    )
  }
  i += 1

  const words = Math.round(scene.dur * WORDS_PER_SECOND)
  return `### ${scene.start}-${scene.start + scene.dur} detik · \`${scene.id}\` (±${words} kata)`
})

if (i !== scenes.length) {
  throw new Error(`synced ${i} headings but scenes.ts has ${scenes.length}`)
}

fs.writeFileSync(SCRIPT, out.join('\n'))
console.log(`synced ${i} demo headings from scenes.ts`)
for (const s of scenes) {
  console.log(
    `  ${String(s.start).padStart(3)}-${String(s.start + s.dur).padStart(3)}s ` +
      `(${String(s.dur).padStart(2)}s) ${s.id}`,
  )
}

/**
 * Builds the screenshot appendix as Markdown, .docx and .pdf.
 *
 *   node tools/build-lampiran.mjs [lampiranDir]
 *
 * Reads screenshots/manifest.json written by capture-pages.mjs, so the
 * numbering and titles come from the capture run rather than being retyped.
 *
 * The PDF is the actual deliverable: the submission form accepts a file only
 * as PDF, capped at 5 MB. The docx is the editable intermediate, and is also
 * what LibreOffice converts from.
 *
 * The docx is generated with the `docx` package rather than converted from
 * Markdown, because it gives control over image sizing. A screenshot placed at
 * native pixel size overflows an A4 page, and pandoc would need per-image
 * width attributes in the Markdown to avoid that.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  ImageRun,
  AlignmentType,
} from 'docx'

const DIR = path.resolve(process.argv[2] ?? '../lampiran')
const SHOTS = path.join(DIR, 'screenshots')

const manifest = JSON.parse(
  fs.readFileSync(path.join(SHOTS, 'manifest.json'), 'utf8'),
)

const TITLE = 'Lampiran Tangkapan Layar Prototipe'
const SUB = 'Atomic Export · Tetra Core Team · P1438'
const NOTE =
  'Tangkapan layar diambil langsung dari prototipe yang berjalan. ' +
  'Data yang tampil adalah data ilustrasi untuk koridor pilot gula semut ' +
  'kelapa di Cilongok, Banyumas.'

/** Reads width and height straight from the PNG IHDR chunk. */
function pngSize(file) {
  const b = fs.readFileSync(file)
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
}

// A4 portrait with 1 inch margins leaves 6.5in of usable width. At 96 dpi that
// is 624 px, which is the cap an image is scaled down to.
const MAX_W = 624
const MAX_H = 820 // keep a tall section from pushing its heading onto its own page

// ------------------------------------------------------------------ markdown
const md = [
  `# ${TITLE}`,
  '',
  `**${SUB}**`,
  '',
  NOTE,
  '',
  '---',
  '',
]
for (const item of manifest) {
  md.push(`## ${item.n}. ${item.title}`, '', `![${item.title}](screenshots/${item.file})`, '')
}
fs.writeFileSync(path.join(DIR, 'LAMPIRAN.md'), md.join('\n'))
console.log(`markdown  ${path.join(DIR, 'LAMPIRAN.md')}`)

// ---------------------------------------------------------------------- docx
const children = [
  new Paragraph({ text: TITLE, heading: HeadingLevel.HEADING_1 }),
  new Paragraph({
    children: [new TextRun({ text: SUB, bold: true })],
  }),
  new Paragraph({ text: '' }),
  new Paragraph({ text: NOTE }),
  new Paragraph({ text: '' }),
]

for (const item of manifest) {
  const file = path.join(SHOTS, item.file)
  const { w, h } = pngSize(file)
  const scale = Math.min(MAX_W / w, MAX_H / h, 1)

  children.push(
    new Paragraph({
      text: `${item.n}. ${item.title}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 320, after: 160 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: 'png',
          data: fs.readFileSync(file),
          transformation: {
            width: Math.round(w * scale),
            height: Math.round(h * scale),
          },
        }),
      ],
    }),
  )
}

const doc = new Document({ sections: [{ children }] })
const out = path.join(DIR, 'LAMPIRAN.docx')
fs.writeFileSync(out, await Packer.toBuffer(doc))

const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1)
console.log(`docx      ${out}  ${mb} MB`)

// The submission form only accepts a PDF, capped at 5 MB, so the PDF is the
// actual deliverable and the docx is the editable intermediate.
try {
  execFileSync(
    'soffice',
    ['--headless', '--convert-to', 'pdf', '--outdir', DIR, out],
    { stdio: ['ignore', 'ignore', 'pipe'], timeout: 300000 },
  )
  const pdf = path.join(DIR, 'LAMPIRAN.pdf')
  const pdfMb = fs.statSync(pdf).size / 1024 / 1024
  console.log(
    `pdf       ${pdf}  ${pdfMb.toFixed(2)} MB` +
      (pdfMb > 5 ? '  <-- LEWAT BATAS 5 MB panitia' : '  (batas 5 MB, aman)'),
  )
  if (pdfMb > 5) {
    console.log(
      '\n  Untuk memperkecil: turunkan SHOT_SCALE saat capture, misal' +
        '\n    SHOT_SCALE=1.5 node tools/capture-pages.mjs',
    )
  }
} catch (e) {
  console.log(
    `pdf       gagal (${String(e.message).slice(0, 80)})` +
      `\n          jalankan manual:  soffice --headless --convert-to pdf --outdir ${DIR} ${out}`,
  )
}

console.log(`\n${manifest.length} halaman/fitur`)

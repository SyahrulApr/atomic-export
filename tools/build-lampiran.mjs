/**
 * Builds the screenshot appendix as Markdown and as .docx.
 *
 *   node tools/build-lampiran.mjs [lampiranDir]
 *
 * Reads screenshots/manifest.json written by capture-pages.mjs, so the
 * numbering and titles come from the capture run rather than being retyped.
 *
 * The .docx is generated with the `docx` package rather than converted from
 * Markdown: neither pandoc nor LibreOffice is installed here, and generating
 * directly also gives control over image sizing, which matters because a
 * screenshot pasted at native pixel size overflows the page.
 */
import fs from 'node:fs'
import path from 'node:path'
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
console.log(`\n${manifest.length} halaman/fitur`)

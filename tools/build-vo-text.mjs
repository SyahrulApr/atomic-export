/**
 * Turns VIDEO_SCRIPT_VO.md into plain .txt files ready to paste into a
 * text-to-speech tool.
 *
 *   node tools/build-vo-text.mjs [outDir]
 *
 * The markdown carries breath marks for a human reader that a TTS engine would
 * read out literally, so they are converted here:
 *
 *   `|`   short breath  ->  comma
 *   `||`  full beat     ->  sentence end + line break
 *
 * A line break is used for the long pause rather than an ellipsis because most
 * engines lengthen the gap at a paragraph boundary, while "..." often gets
 * spoken as "dot dot dot".
 *
 * Numbers in the script are already spelled out ("delapan puluh dua"), which is
 * deliberate: engines routinely mangle digits and symbols like "82/100".
 */
import fs from 'node:fs'
import path from 'node:path'

const SRC = path.resolve('VIDEO_SCRIPT_VO.md')
const OUT = path.resolve(process.argv[2] ?? 'vo-text')

const md = fs.readFileSync(SRC, 'utf8')

/** `### 25-35 detik · \`formfill\` (±25 kata)` */
const HEADING = /^###\s+(\d+)-(\d+)\s+detik\s*·\s*(.+?)\s*\(±\s*(\d+)\s*kata\)\s*$/

function cleanLabel(raw) {
  return raw
    .replace(/`/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Collapse the breath marks into ordinary punctuation. */
function toSpeech(text) {
  let s = text.replace(/\s+/g, ' ').trim()

  // full beat: end the sentence if it is not already ended, then break the line
  s = s.replace(/\s*\|\|\s*/g, (_m, offset, str) => {
    const before = str.slice(0, offset).trimEnd()
    return /[.,!?:;]$/.test(before) ? '\n' : '.\n'
  })

  // short breath: a comma, unless punctuation is already there
  s = s.replace(/\s*\|\s*/g, (_m, offset, str) => {
    const before = str.slice(0, offset).trimEnd()
    return /[.,!?:;]$/.test(before) ? ' ' : ', '
  })

  return s
    .split('\n')
    .map((line) =>
      line
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,!?:;])/g, '$1')
        .replace(/,\s*,/g, ',')
        .trim(),
    )
    .filter(Boolean)
    .join('\n')
}

// ---------------------------------------------------------------- parse
const lines = md.split('\n')
const sections = { pitch: [], demo: [] }
let part = null
let current = null

const flush = () => {
  if (current && current.quote.length) {
    sections[current.part].push({
      ...current,
      text: toSpeech(current.quote.join(' ')),
    })
  }
  current = null
}

for (const line of lines) {
  if (/^#\s+BAGIAN\s+1/.test(line)) {
    flush()
    part = 'pitch'
    continue
  }
  if (/^#\s+BAGIAN\s+2/.test(line)) {
    flush()
    part = 'demo'
    continue
  }
  if (/^##\s+Checklist/.test(line)) {
    flush()
    part = null
    continue
  }
  if (!part) continue

  const m = line.match(HEADING)
  if (m) {
    flush()
    current = {
      part,
      from: Number(m[1]),
      to: Number(m[2]),
      label: cleanLabel(m[3]),
      words: Number(m[4]),
      quote: [],
    }
    continue
  }

  if (current && line.startsWith('>')) {
    current.quote.push(line.replace(/^>\s?/, '').trim())
  }
}
flush()

// ---------------------------------------------------------------- write
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const manifest = []

for (const [name, segs] of Object.entries(sections)) {
  if (!segs.length) continue
  const dir = path.join(OUT, name)
  fs.mkdirSync(dir, { recursive: true })

  segs.forEach((seg, i) => {
    const dur = seg.to - seg.from
    const n = String(i + 1).padStart(2, '0')
    const file = path.join(dir, `${n}-${seg.label}-${dur}s.txt`)
    fs.writeFileSync(file, seg.text + '\n')
    manifest.push({
      part: name,
      file: path.relative(OUT, file),
      window: `${seg.from}-${seg.to}s`,
      targetSeconds: dur,
      budgetWords: seg.words,
      actualWords: seg.text.split(/\s+/).filter(Boolean).length,
    })
  })

  fs.writeFileSync(
    path.join(OUT, `${name}-full.txt`),
    segs.map((s) => s.text).join('\n\n') + '\n',
  )
}

fs.writeFileSync(
  path.join(OUT, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
)

const readme = `NARASI SIAP TEMPEL KE TTS
=========================

Dihasilkan otomatis dari VIDEO_SCRIPT_VO.md. Jangan diedit di sini, edit
markdown-nya lalu jalankan ulang:

    node tools/build-vo-text.mjs

Isi folder
----------
  pitch-full.txt        seluruh pitch 60 detik dalam satu blok
  demo-full.txt         seluruh demo 120 detik dalam satu blok
  pitch/                pitch dipecah per segmen
  demo/                 demo dipecah per scene, nama file memuat target durasi
  manifest.json         target durasi dan jumlah kata tiap segmen

Pakai yang mana
---------------
Untuk hasil rapi, generate PER SEGMEN, jangan sekali jalan. Nama file sudah
memuat target durasinya, misal 05-formfill-10s.txt berarti hasil audionya
harus mendekati 10 detik. Kalau digenerate sekaligus, tidak ada cara
menyelaraskan tiap kalimat ke scene-nya.

Tanda napas sudah dikonversi
----------------------------
Notasi | dan || di markdown dipakai untuk pembaca manusia. Di sini sudah
diganti koma dan pergantian baris, karena TTS akan membaca simbol itu apa
adanya. Jangan dimasukkan kembali.

Angka sengaja ditulis sebagai kata
----------------------------------
"delapan puluh dua dari seratus", bukan "82/100". Mesin TTS sering salah
membaca digit dan simbol. Jangan diubah jadi angka.

Menyamakan durasi
-----------------
TTS tidak bisa dipaksa ke detik tertentu. Alurnya:
  1. generate audio per segmen
  2. ukur durasinya:  ffprobe -v error -show_entries format=duration -of csv=p=0 file.mp3
  3. koreksi tempo tipis:  ffmpeg -i in.mp3 -filter:a "atempo=1.04" out.mp3
Jangan lewat kira-kira 6 persen, di atas itu suaranya mulai terdengar aneh.
Kalau selisihnya lebih besar dari itu, lebih baik potong kata di markdown.

Lisensi
-------
Panduan panitia mewajibkan aset yang dimiliki atau berizin. Tier gratis
beberapa layanan TTS mewajibkan atribusi dan membatasi penggunaan komersial,
jadi gunakan tier berbayar supaya hak pakainya jelas.
`

fs.writeFileSync(path.join(OUT, 'README.txt'), readme)

console.log(`wrote ${manifest.length} segments to ${OUT}`)
for (const m of manifest) {
  const flag = m.actualWords > m.budgetWords * 1.15 ? '  <-- OVER BUDGET' : ''
  console.log(
    `  ${m.part.padEnd(5)} ${m.window.padEnd(9)} ${String(m.actualWords).padStart(3)} kata ` +
      `(jatah ~${m.budgetWords})${flag}`,
  )
}

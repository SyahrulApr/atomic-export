/**
 * Chunking sederhana berbasis paragraf + batas ukuran karakter.
 * Regulasi Indonesia banyak berbentuk pasal/ayat pendek — pecah per blok
 * paragraf ganda dulu, gabungkan sampai mendekati target, jangan motong
 * di tengah kalimat kalau bisa dihindari.
 */

const TARGET_CHARS = 1200
const OVERLAP_CHARS = 150

export function chunkText(text: string): string[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const chunks: string[] = []
  let current = ''

  for (const para of paragraphs) {
    if (current.length + para.length + 2 > TARGET_CHARS && current) {
      chunks.push(current.trim())
      const tailStart = Math.max(0, current.length - OVERLAP_CHARS)
      current = current.slice(tailStart)
    }
    current += (current ? '\n\n' : '') + para
  }
  if (current.trim()) chunks.push(current.trim())

  // fallback: kalau ada satu paragraf tunggal yang jauh lebih besar dari
  // target (dokumen tanpa jeda paragraf jelas), potong paksa per kalimat
  return chunks.flatMap((c) => (c.length <= TARGET_CHARS * 1.8 ? [c] : hardSplit(c)))
}

function hardSplit(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const out: string[] = []
  let cur = ''
  for (const s of sentences) {
    if (cur.length + s.length > TARGET_CHARS && cur) {
      out.push(cur.trim())
      cur = ''
    }
    cur += (cur ? ' ' : '') + s
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

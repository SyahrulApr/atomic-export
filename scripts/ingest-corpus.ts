import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { eq } from 'drizzle-orm'
import OpenAI from 'openai'
import pdfParse from 'pdf-parse'
import { db } from '../lib/db/client'
import { ragChunks, ragDocuments } from '../lib/db/schema'
import { chunkText } from '../lib/rag/chunk'

const CORPUS_DIR = path.join(process.cwd(), 'corpus', 'regulasi')
const EMBEDDING_MODEL = 'text-embedding-3-small'
const EMBED_BATCH_SIZE = 64

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (/\.(md|pdf)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function extractText(filePath: string): Promise<string> {
  if (filePath.toLowerCase().endsWith('.pdf')) {
    const buf = await readFile(filePath)
    try {
      const parsed = await pdfParse(buf)
      return parsed.text
    } catch (err) {
      console.warn(`  gagal parse PDF ${filePath}: ${(err as Error).message}`)
      return ''
    }
  }
  return readFile(filePath, 'utf-8')
}

function normalizeForHash(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase()
}

function titleFromPath(filePath: string): string {
  return path
    .basename(filePath)
    .replace(/\.(md|pdf)$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim()
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  })
  return res.data.map((d) => d.embedding)
}

async function main() {
  console.log('Menyapu corpus/regulasi ...')
  const allFiles = await walk(CORPUS_DIR)
  const files = allFiles.filter(
    (f) => path.relative(CORPUS_DIR, f) !== 'index.md',
  )
  console.log(`${files.length} file ditemukan.`)

  const seenHashes = new Map<string, string>() // hash -> path pertama
  let inserted = 0
  let skippedDup = 0
  let skippedEmpty = 0

  for (const filePath of files) {
    const relPath = path.relative(CORPUS_DIR, filePath)
    const category = relPath.split(path.sep)[0]

    const raw = await extractText(filePath)
    const text = raw.trim()
    if (text.length < 50) {
      skippedEmpty++
      continue
    }

    const hash = createHash('sha256').update(normalizeForHash(text)).digest('hex')
    if (seenHashes.has(hash)) {
      console.log(`  [dup] ${relPath} identik dengan ${seenHashes.get(hash)}, dilewati`)
      skippedDup++
      continue
    }
    seenHashes.set(hash, relPath)

    const chunks = chunkText(text)
    if (chunks.length === 0) {
      skippedEmpty++
      continue
    }

    const [doc] = await db
      .insert(ragDocuments)
      .values({
        category,
        sourcePath: relPath,
        title: titleFromPath(filePath),
      })
      .onConflictDoUpdate({
        target: ragDocuments.sourcePath,
        set: { title: titleFromPath(filePath) },
      })
      .returning()

    // hapus chunk lama kalau re-ingest dokumen yang sama
    await db.delete(ragChunks).where(eq(ragChunks.documentId, doc.id))

    for (let i = 0; i < chunks.length; i += EMBED_BATCH_SIZE) {
      const batch = chunks.slice(i, i + EMBED_BATCH_SIZE)
      const embeddings = await embedBatch(batch)
      await db.insert(ragChunks).values(
        batch.map((content, j) => ({
          documentId: doc.id,
          chunkIndex: i + j,
          content,
          embedding: embeddings[j],
        })),
      )
    }

    inserted++
    console.log(`  [ok] ${relPath} -> ${chunks.length} chunk`)
  }

  console.log('\n=== Ringkasan Ingestion ===')
  console.log(`Dokumen berhasil diproses : ${inserted}`)
  console.log(`Dilewati (duplikat isi)   : ${skippedDup}`)
  console.log(`Dilewati (kosong/gagal)   : ${skippedEmpty}`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

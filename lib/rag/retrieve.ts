import { sql } from 'drizzle-orm'
import OpenAI from 'openai'
import { db } from '../db/client'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type RetrievedChunk = {
  chunkId: string
  documentId: string
  content: string
  title: string
  sourcePath: string
  sourceUrl: string | null
  category: string
  similarity: number
}

export async function embedQuery(query: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  })
  return res.data[0].embedding
}

/**
 * Cosine similarity search via pgvector (<=> operator, cosine distance).
 * Kembalikan top-k chunk paling relevan beserta metadata dokumen sumber.
 */
export async function retrieveRelevantChunks(
  query: string,
  topK = 6,
): Promise<RetrievedChunk[]> {
  const embedding = await embedQuery(query)
  const vectorLiteral = `[${embedding.join(',')}]`

  const rows = await db.execute<{
    chunk_id: string
    document_id: string
    content: string
    title: string
    source_path: string
    source_url: string | null
    category: string
    similarity: number
  }>(sql`
    SELECT
      c.id AS chunk_id,
      c.document_id AS document_id,
      c.content AS content,
      d.title AS title,
      d.source_path AS source_path,
      d.source_url AS source_url,
      d.category AS category,
      1 - (c.embedding <=> ${vectorLiteral}::vector) AS similarity
    FROM rag_chunks c
    JOIN rag_documents d ON d.id = c.document_id
    WHERE c.embedding IS NOT NULL
    ORDER BY c.embedding <=> ${vectorLiteral}::vector
    LIMIT ${topK}
  `)

  return rows.map((r) => ({
    chunkId: r.chunk_id,
    documentId: r.document_id,
    content: r.content,
    title: r.title,
    sourcePath: r.source_path,
    sourceUrl: r.source_url,
    category: r.category,
    similarity: Number(r.similarity),
  }))
}

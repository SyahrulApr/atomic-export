import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { db } from '@/lib/db/client'
import { copilotQueries } from '@/lib/db/schema'
import { retrieveRelevantChunks } from '@/lib/rag/retrieve'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `Kamu adalah AI Copilot Ekspor untuk UMKM Indonesia di aplikasi Atomic Export.

ATURAN KETAT:
1. Jawab HANYA berdasarkan konteks dokumen yang diberikan. Jangan mengarang regulasi, nomor peraturan, atau angka yang tidak ada di konteks.
2. Kalau konteks tidak cukup untuk menjawab, katakan jelas "Saya tidak menemukan sumber resmi untuk pertanyaan ini di korpus regulasi yang tersedia" — jangan menebak.
3. Sebutkan sumber dokumen yang kamu pakai secara natural di jawaban (nama peraturan/nomor, bukan hanya path file).
4. Kamu MEMBANTU dengan data ekspor (skor kesiapan, dokumen, regulasi) — kamu BUKAN penilai kelayakan kredit. Jangan pernah bilang "kelayakan kredit" atau "skor kredit" — itu wewenang lembaga keuangan.
5. Jawab ringkas, actionable, bahasa Indonesia, untuk pelaku UMKM (bukan bahasa hukum yang kaku).`

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()

    if (!question || typeof question !== 'string' || question.trim().length < 3) {
      return NextResponse.json({ error: 'Pertanyaan tidak valid.' }, { status: 400 })
    }

    const chunks = await retrieveRelevantChunks(question, 6)

    if (chunks.length === 0) {
      return NextResponse.json({
        answer:
          'Korpus regulasi belum terisi. Jalankan ingestion (`pnpm db:ingest`) sebelum memakai Copilot.',
        sources: [],
      })
    }

    const context = chunks
      .map(
        (c, i) =>
          `[Sumber ${i + 1}: ${c.title}]\n${c.content}`,
      )
      .join('\n\n---\n\n')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `KONTEKS DOKUMEN:\n${context}\n\nPERTANYAAN UMKM: ${question}`,
        },
      ],
    })

    const answer = completion.choices[0]?.message?.content ?? ''

    const sources = Array.from(
      new Map(chunks.map((c) => [c.documentId, c])).values(),
    ).map((c) => ({
      title: c.title,
      category: c.category,
      sourceUrl: c.sourceUrl,
    }))

    await db.insert(copilotQueries).values({
      question,
      answer,
      sourceChunkIds: chunks.map((c) => c.chunkId),
    })

    return NextResponse.json({ answer, sources })
  } catch (err) {
    console.error('Copilot API error:', err)
    return NextResponse.json(
      { error: 'Gagal memproses pertanyaan. Coba lagi sebentar.' },
      { status: 500 },
    )
  }
}

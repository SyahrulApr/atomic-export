import { NextRequest, NextResponse } from 'next/server'
import { generateDocument } from '@/lib/documents/generate'
import { DOC_TYPES, type DocType, type ExportDocInput } from '@/lib/documents/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const type = body.type as DocType
    const data = body.data as ExportDocInput

    const known = DOC_TYPES.find((d) => d.type === type)
    if (!known) {
      return NextResponse.json({ error: 'Tipe dokumen tidak dikenal' }, { status: 400 })
    }
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Data dokumen tidak valid' }, { status: 400 })
    }

    const bytes = await generateDocument(type, data)

    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${known.filename}"`,
      },
    })
  } catch (err) {
    console.error('[documents] generation failed', err)
    return NextResponse.json({ error: 'Gagal membuat dokumen' }, { status: 500 })
  }
}

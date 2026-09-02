import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { exportProfile } from '@/lib/db/schema'
import { DEMO_EXPORT_DOC_INPUT, type ExportDocInput } from '@/lib/documents/types'

function rowToProfile(row: typeof exportProfile.$inferSelect): ExportDocInput {
  const { id: _id, updatedAt: _updatedAt, ...rest } = row
  return rest
}

export async function GET() {
  const [existing] = await db.select().from(exportProfile).where(eq(exportProfile.id, 'default'))
  if (existing) {
    return NextResponse.json(rowToProfile(existing))
  }

  const [created] = await db
    .insert(exportProfile)
    .values({ id: 'default', ...DEMO_EXPORT_DOC_INPUT })
    .returning()
  return NextResponse.json(rowToProfile(created))
}

export async function PUT(req: NextRequest) {
  const data = (await req.json()) as ExportDocInput
  const [updated] = await db
    .insert(exportProfile)
    .values({ id: 'default', ...data })
    .onConflictDoUpdate({
      target: exportProfile.id,
      set: { ...data, updatedAt: new Date() },
    })
    .returning()
  return NextResponse.json(rowToProfile(updated))
}

import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { exportProfile } from '@/lib/db/schema'
import { DEMO_EXPORT_DOC_INPUT } from '@/lib/documents/types'
import { computeAllMatches } from '@/lib/market/buyers'

export async function GET() {
  const [row] = await db.select().from(exportProfile).where(eq(exportProfile.id, 'default'))
  const profile = row ?? DEMO_EXPORT_DOC_INPUT

  const matches = computeAllMatches(profile).map((m) => ({
    name: m.buyer.name,
    loc: m.buyer.loc,
    vol: m.buyer.vol,
    verified: m.buyer.verified,
    match: m.score,
    reasons: m.reasons,
  }))

  return NextResponse.json({ matches, profile: { productName: profile.productName, hsCode: profile.hsCode, quantity: profile.quantity, unit: profile.unit } })
}

import { NextRequest, NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { exportEvents } from '@/lib/db/schema'
import { computeTrackRecordSummary } from '@/lib/track-record/score'

const SEED_EVENTS = [
  { date: '2026-02-18', buyerName: 'Osaka Organic Foods', valueJutaIdr: 320, pebNumber: 'PEB-0312', status: 'Selesai' },
  { date: '2026-01-22', buyerName: 'Kyoto Natural Sweeteners', valueJutaIdr: 240, pebNumber: 'PEB-0287', status: 'Selesai' },
  { date: '2025-12-09', buyerName: 'Osaka Organic Foods', valueJutaIdr: 180, pebNumber: 'PEB-0241', status: 'Selesai' },
]

async function loadEvents() {
  let rows = await db.select().from(exportEvents).orderBy(desc(exportEvents.date))
  if (rows.length === 0) {
    await db.insert(exportEvents).values(SEED_EVENTS)
    rows = await db.select().from(exportEvents).orderBy(desc(exportEvents.date))
  }
  return rows
}

export async function GET() {
  const rows = await loadEvents()
  const summary = computeTrackRecordSummary(rows)
  return NextResponse.json({ ...summary, history: rows })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { date, buyerName, valueJutaIdr, pebNumber, status } = body

  if (!date || !buyerName || !pebNumber || typeof valueJutaIdr !== 'number') {
    return NextResponse.json({ error: 'Data transaksi tidak lengkap' }, { status: 400 })
  }

  await db.insert(exportEvents).values({
    date,
    buyerName,
    valueJutaIdr,
    pebNumber,
    status: status || 'Selesai',
  })

  const rows = await loadEvents()
  const summary = computeTrackRecordSummary(rows)
  return NextResponse.json({ ...summary, history: rows })
}

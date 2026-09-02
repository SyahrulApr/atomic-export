export type ExportEvent = {
  id: string
  date: string
  buyerName: string
  valueJutaIdr: number
  pebNumber: string
  status: string
}

export type BankabilityStep = { t: string; done: boolean }

export type TrackRecordSummary = {
  score: number
  steps: BankabilityStep[]
}

const MONTH_MS = 30 * 24 * 60 * 60 * 1000

/**
 * Rubrik tertimbang yang transparan (bukan model kredit terlatih) yang
 * dipetakan ke skala 300-850 yang familiar, dibangun murni dari rekam jejak
 * transaksi ekspor atas nama UMKM sendiri. Bukan penilaian kelayakan kredit
 * resmi -- itu tetap wewenang lembaga keuangan (lihat guardrail Copilot).
 */
export function computeTrackRecordSummary(events: ExportEvent[]): TrackRecordSummary {
  const completed = events.filter((e) => e.status === 'Selesai')
  const distinctBuyers = new Set(completed.map((e) => e.buyerName)).size
  const totalValueJuta = completed.reduce((sum, e) => sum + e.valueJutaIdr, 0)

  const mostRecent = events
    .map((e) => new Date(e.date).getTime())
    .filter((t) => !Number.isNaN(t))
    .sort((a, b) => b - a)[0]
  const recentActivity = mostRecent != null && Date.now() - mostRecent <= 6 * MONTH_MS

  let score = 500
  score += Math.min(completed.length, 5) * 40 // transaction count, capped
  if (distinctBuyers >= 2) score += 30 // buyer diversification
  score += Math.min(Math.round(totalValueJuta / 10), 150) // value tier, capped
  if (recentActivity) score += 50 // recency

  score = Math.max(300, Math.min(850, score))

  const steps: BankabilityStep[] = [
    { t: 'Unbankable', done: true },
    { t: 'Rekam jejak terbentuk', done: events.length >= 1 },
    { t: 'Credit identity', done: events.length >= 3 && distinctBuyers >= 2 },
    { t: 'Akses pembiayaan formal', done: false },
  ]

  return { score, steps }
}

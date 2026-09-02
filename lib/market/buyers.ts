import type { ExportDocInput } from '@/lib/documents/types'

export type Buyer = {
  name: string
  loc: string
  country: string
  hsPrefixes: string[]
  minQtyKg: number
  maxQtyKg: number | null
  incoterms: string[]
  vol: string
  verified: boolean
}

export const BUYERS: Buyer[] = [
  {
    name: 'Osaka Organic Foods',
    loc: 'Osaka, Jepang',
    country: 'Jepang',
    hsPrefixes: ['1702'],
    minQtyKg: 1000,
    maxQtyKg: 12000,
    incoterms: ['FOB', 'CFR', 'CIF'],
    vol: '2× 20ft / kuartal',
    verified: true,
  },
  {
    name: 'Kyoto Natural Sweeteners',
    loc: 'Kyoto, Jepang',
    country: 'Jepang',
    hsPrefixes: ['1702'],
    minQtyKg: 500,
    maxQtyKg: 6000,
    incoterms: ['FOB'],
    vol: '1× 20ft / kuartal',
    verified: true,
  },
  {
    name: 'Tokyo Wholefoods Trading',
    loc: 'Tokyo, Jepang',
    country: 'Jepang',
    hsPrefixes: ['1702', '0801'],
    minQtyKg: 50,
    maxQtyKg: 3000,
    incoterms: ['FOB', 'EXW'],
    vol: 'LCL fleksibel',
    verified: false,
  },
]

export type MatchResult = {
  buyer: Buyer
  score: number
  reasons: string[]
}

/**
 * Rubrik tertimbang, sama pola dengan Readiness Score: transparan dan bisa
 * dijelaskan per faktor, bukan black-box similarity model.
 */
export function computeMatchScore(profile: ExportDocInput, buyer: Buyer): MatchResult {
  let score = 0
  const reasons: string[] = []

  const hs = (profile.hsCode || '').replace(/\./g, '')
  const hsMatch = hs.length > 0 && buyer.hsPrefixes.some((p) => hs.startsWith(p.replace(/\./g, '')))
  if (hsMatch) {
    score += 45
    reasons.push('Kategori produk (HS Code) cocok dengan minat buyer')
  }

  const qty = parseFloat(profile.quantity || '0')
  const qtyOk = qty > 0 && qty >= buyer.minQtyKg && (buyer.maxQtyKg == null || qty <= buyer.maxQtyKg)
  if (qtyOk) {
    score += 35
    reasons.push('Volume sesuai kapasitas buyer')
  } else if (qty > 0) {
    reasons.push(
      qty < buyer.minQtyKg
        ? 'Volume di bawah minimum order buyer ini'
        : 'Volume melebihi kapasitas serap buyer ini',
    )
  }

  const incotermOk = buyer.incoterms.includes((profile.incoterm || '').toUpperCase())
  if (incotermOk) {
    score += 20
    reasons.push('Incoterm yang diajukan didukung buyer')
  }

  return { buyer, score: Math.min(100, score), reasons }
}

export function computeAllMatches(profile: ExportDocInput): MatchResult[] {
  return BUYERS.map((b) => computeMatchScore(profile, b)).sort((a, b) => b.score - a.score)
}

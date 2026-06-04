'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export type TourStep = {
  /** dashboard panel key this step belongs to */
  panel: string
  /** CSS selector of the element to spotlight */
  target: string
  title: string
  desc: string
  /** stage label badge */
  stage?: string
  /** triggers the live-typing Copilot demo */
  typing?: boolean
}

export const TOUR_STEPS: TourStep[] = [
  {
    panel: 'overview',
    target: '[data-tour="ov-banner"]',
    stage: 'Mulai',
    title: 'Selamat datang di Atomic Export',
    desc: 'Operating System ekspor untuk UMKM. Kita akan telusuri alur lengkap, dari kesiapan sampai layak modal. Klik Lanjut untuk mulai.',
  },
  {
    panel: 'overview',
    target: '[data-tour="ov-stats"]',
    stage: 'Ringkasan',
    title: 'Metrik kunci dalam satu layar',
    desc: 'Readiness score, progres Atomic Steps, margin retensi vs agregator, dan jumlah PEB atas nama sendiri.',
  },
  {
    panel: 'overview',
    target: '[data-tour="ov-flow"]',
    stage: 'Alur',
    title: 'Flywheel of Trust & Scale',
    desc: 'Enam tahap end-to-end: dari Frictionless Execution hingga Network Aggregation.',
  },
  {
    panel: 'atomic',
    target: '[data-tour="atomic-level"]',
    stage: 'Tahap 1',
    title: 'Atomic Steps · gamifikasi',
    desc: 'Birokrasi ekspor dipecah jadi tugas mikro < 15 menit. Level, streak, dan XP menjaga konsistensi UMKM.',
  },
  {
    panel: 'atomic',
    target: '[data-tour="atomic-tasks"]',
    stage: 'Tahap 1',
    title: 'Tugas harian terpandu',
    desc: 'Setiap langkah kecil memberi XP dan menaikkan kesiapan ekspor secara terukur.',
  },
  {
    panel: 'copilot',
    target: '[data-tour="copilot-card"]',
    stage: 'Tahap 2',
    title: 'AI Copilot menjawab regulasi',
    desc: 'Perhatikan: pertanyaan diketik otomatis, Copilot RAG menjawab dengan sitasi sumber resmi. Tunggu animasi selesai, lalu klik Lanjut.',
    typing: true,
  },
  {
    panel: 'readiness',
    target: '[data-tour="ready-score"]',
    stage: 'Scoring',
    title: 'Export Readiness Score',
    desc: 'Model LightGBM menilai kesiapan 0-100. Skor 82 berarti UMKM siap ekspor.',
  },
  {
    panel: 'readiness',
    target: '[data-tour="ready-shap"]',
    stage: 'Scoring',
    title: 'Transparan via SHAP',
    desc: 'Faktor mana yang menaikkan dan menurunkan skor ditampilkan jelas, bukan kotak hitam.',
  },
  {
    panel: 'documents',
    target: '[data-tour="docs-hero"]',
    stage: 'Tahap 2',
    title: 'Single-entry, multi-output',
    desc: 'Satu kali input data menghasilkan enam dokumen perdagangan otomatis, tanpa error.',
  },
  {
    panel: 'documents',
    target: '[data-tour="docs-grid"]',
    stage: 'Tahap 2',
    title: 'Dokumen siap unduh',
    desc: 'Commercial Invoice, Packing List, COO Form IJEPA, PEB, klasifikasi HS, dan Phytosanitary.',
  },
  {
    panel: 'market',
    target: '[data-tour="market-buyers"]',
    stage: 'Tahap 3·4',
    title: 'P2P2B Matchmaking',
    desc: 'Dicocokkan ke buyer internasional terverifikasi via cosine similarity produk ke buyer.',
  },
  {
    panel: 'market',
    target: '[data-tour="market-consortium"]',
    stage: 'Tahap 3·4',
    title: 'Konsorsium groupage',
    desc: 'Tiap UMKM tersambung ke buyer-nya sendiri dan berbagi logistik. PEB, buyer, dan margin tetap atas nama masing-masing.',
  },
  {
    panel: 'qc',
    target: '[data-tour="qc-cv"]',
    stage: 'Tahap 5',
    title: 'QC Hybrid · Computer Vision',
    desc: 'EfficientNet-B4 plus surveyor independen memverifikasi mutu per-UMKM sebelum kirim.',
  },
  {
    panel: 'qc',
    target: '[data-tour="qc-batch"]',
    stage: 'Tahap 5',
    title: 'Gatekeeper mutu',
    desc: 'Batch reject ditahan otomatis. Rejection rate tiap eksportir turun, reputasi platform terjaga.',
  },
  {
    panel: 'logistics',
    target: '[data-tour="logi-consol"]',
    stage: 'Tahap 6',
    title: 'Konsolidasi LCL ke FCL',
    desc: 'Kargo kecil beberapa UMKM digabung jadi kontainer penuh. Hemat 43% biaya per unit.',
  },
  {
    panel: 'logistics',
    target: '[data-tour="logi-pkbe"]',
    stage: 'Tahap 6',
    title: 'Penerbitan PKBE',
    desc: 'Konsolidator yang disetujui Bea Cukai menerbitkan PKBE. Tiap UMKM tetap memegang satu PEB sendiri.',
  },
  {
    panel: 'track',
    target: '[data-tour="track-score"]',
    stage: 'Bankability',
    title: 'Alternative Credit Score',
    desc: 'Setiap transaksi atas nama UMKM membangun skor kredit alternatif yang layak pembiayaan.',
  },
  {
    panel: 'track',
    target: '[data-tour="track-history"]',
    stage: 'Selesai',
    title: 'Rekam jejak permanen',
    desc: 'Riwayat ekspor tercatat atas nama UMKM, mengubah unbankable jadi layak modal. Itulah alur penuh Atomic Export.',
  },
]

type TourCtx = {
  isActive: boolean
  stepIndex: number
  step: TourStep | null
  total: number
  start: () => void
  stop: () => void
  next: () => void
  prev: () => void
}

const Ctx = createContext<TourCtx | null>(null)

export function useTour() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useTour must be used within TourProvider')
  return c
}

export function TourProvider({
  children,
  onPanel,
}: {
  children: ReactNode
  onPanel: (panel: string) => void
}) {
  const [isActive, setIsActive] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const total = TOUR_STEPS.length

  const start = useCallback(() => {
    setStepIndex(0)
    onPanel(TOUR_STEPS[0].panel)
    setIsActive(true)
  }, [onPanel])

  const stop = useCallback(() => setIsActive(false), [])

  const next = useCallback(() => {
    if (stepIndex >= total - 1) {
      setIsActive(false)
      return
    }
    const ni = stepIndex + 1
    onPanel(TOUR_STEPS[ni].panel)
    setStepIndex(ni)
  }, [onPanel, total, stepIndex])

  const prev = useCallback(() => {
    const ni = Math.max(0, stepIndex - 1)
    onPanel(TOUR_STEPS[ni].panel)
    setStepIndex(ni)
  }, [onPanel, stepIndex])

  return (
    <Ctx.Provider
      value={{
        isActive,
        stepIndex,
        step: isActive ? TOUR_STEPS[stepIndex] : null,
        total,
        start,
        stop,
        next,
        prev,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

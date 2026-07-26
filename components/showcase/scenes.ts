/**
 * Showcase timeline: the 120-second "Two-Minutes Demo" segment.
 *
 * Segment boundaries follow the panel's recommended format, compressed
 * slightly so the last 10 seconds are free for the closing and CTA:
 *    0-  9s  pengantar deep dive (aktor, konteks, skenario)
 *    9- 59s  bukti utama inovasi (walkthrough + simulasi pengisian)
 *   59- 83s  cara kerja dan kedalaman solusi
 *   83- 96s  bukti validasi atau hasil awal
 *   96-102s  status dan batas kesiapan
 *  102-120s  next steps lalu penutup dan collaboration ask
 *
 * Scene lengths are set from the measured narration for each segment, so the
 * voice-over lands inside its scene without an audible tempo correction.
 *
 * Durations are locked here first; the voice-over script is written to fit
 * these numbers afterwards, not the other way around.
 */

export type StageKind =
  | 'panel'
  | 'intro'
  | 'formfill'
  | 'pipeline'
  | 'value'
  | 'status'
  | 'roadmap'
  | 'outro'

/** Camera state applied to the 3D stage element. */
export type Cam = {
  scale: number
  /** degrees, positive tilts the top of the stage away from the viewer */
  rotateX: number
  /** degrees, positive swings the right edge away from the viewer */
  rotateY: number
  /** px, horizontal drift */
  x: number
  /** px, vertical drift */
  y: number
  /** px, translateY applied to the panel content, for autoscroll */
  scroll: number
}

export type Caption = {
  kicker?: string
  title: string
  /** trailing fragment of `title` rendered in the brand gradient */
  highlight?: string
  sub?: string
  pos: 'left' | 'right' | 'bottom' | 'center' | 'top'
  from: 'left' | 'right' | 'up' | 'down'
  /** seconds after scene start before the caption enters */
  delay?: number
}

export type Scene = {
  id: string
  /** seconds from timeline start */
  start: number
  /** seconds */
  dur: number
  kind: StageKind
  /** dashboard panel key, when kind === 'panel' */
  panel?: string
  from: Cam
  to: Cam
  ease?: string
  caption?: Caption
}

const cam = (p: Partial<Cam> = {}): Cam => ({
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  x: 0,
  y: 0,
  scroll: 0,
  ...p,
})

export const SCENES: Scene[] = [
  /* ----------------------------------------- 0-9s · pengantar deep dive */
  {
    id: 'intro',
    start: 0,
    dur: 5,
    kind: 'intro',
    from: cam({ scale: 1.06 }),
    to: cam({ scale: 1 }),
    ease: 'power2.out',
    caption: {
      kicker: 'Koridor pilot',
      title: 'Produsen gula semut, ',
      highlight: 'Cilongok, Banyumas',
      sub: 'Kapasitas produksi sudah ada. Status eksportir belum pernah.',
      pos: 'center',
      from: 'up',
      delay: 0.4,
    },
  },
  {
    id: 'overview',
    start: 5,
    dur: 4,
    kind: 'panel',
    panel: 'overview',
    from: cam({ scale: 0.82, rotateX: 14, rotateY: -16, y: 40 }),
    to: cam({ scale: 0.93, rotateX: 4, rotateY: -5, y: 0 }),
    ease: 'power3.out',
    caption: {
      title: 'Satu siklus ekspor, dari nol sampai ',
      highlight: 'layak modal',
      pos: 'bottom',
      from: 'up',
      delay: 0.6,
    },
  },

  /* -------------------------------------- 9-60s · bukti utama inovasi */
  {
    id: 'readiness',
    start: 9,
    dur: 8,
    kind: 'panel',
    panel: 'readiness',
    from: cam({ scale: 0.95, rotateY: -6 }),
    to: cam({ scale: 1.35, rotateY: 2, x: -300, y: 150, scroll: -60 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Diagnosis',
      title: 'Skor kesiapan ekspor ',
      highlight: '82 dari 100',
      sub: 'Empat dimensi: legalitas, spesifikasi produk, kapasitas, rekam jejak.',
      pos: 'right',
      from: 'right',
      delay: 0.5,
    },
  },
  {
    id: 'atomic',
    start: 17,
    dur: 7,
    kind: 'panel',
    panel: 'atomic',
    from: cam({ scale: 0.9, rotateX: 8, rotateY: 10 }),
    to: cam({ scale: 1.12, rotateX: 0, rotateY: 0, x: 300, y: -120, scroll: -140 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Eksekusi',
      title: 'Birokrasi dipecah jadi tugas ',
      highlight: 'di bawah 15 menit',
      sub: 'Level, streak, dan XP menjaga UMKM tetap bergerak tiap hari.',
      pos: 'left',
      from: 'left',
      delay: 0.4,
    },
  },
  {
    id: 'formfill',
    start: 24,
    dur: 10,
    kind: 'formfill',
    from: cam({ scale: 0.97, rotateY: 5 }),
    to: cam({ scale: 1.04, rotateY: -1, x: -40 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Input sekali',
      title: 'Isi data transaksi ',
      highlight: 'satu kali saja',
      sub: 'Sisanya diturunkan sistem, tanpa mengisi formulir yang sama berulang.',
      pos: 'left',
      from: 'left',
      delay: 0.3,
    },
  },
  {
    id: 'copilot',
    start: 34,
    dur: 13,
    kind: 'panel',
    panel: 'copilot',
    from: cam({ scale: 0.92, rotateY: -12, x: 60 }),
    to: cam({ scale: 1.08, rotateY: 0, x: -280, y: -40 }),
    ease: 'power2.out',
    caption: {
      kicker: 'Panduan regulasi',
      title: 'Pertanyaan ekspor dijawab dengan ',
      highlight: 'sitasi sumber',
      sub: 'Jawaban dirujuk ke dokumen resmi, bukan tebakan.',
      pos: 'right',
      from: 'right',
      delay: 1.2,
    },
  },
  {
    id: 'documents',
    start: 47,
    dur: 5,
    kind: 'panel',
    panel: 'documents',
    from: cam({ scale: 0.86, rotateX: 12, rotateY: 8, y: 30 }),
    to: cam({ scale: 1.02, rotateX: 0, rotateY: 0, x: 300, y: -80, scroll: -110 }),
    ease: 'power3.out',
    caption: {
      kicker: 'Output',
      title: 'Satu kali input, ',
      highlight: 'enam dokumen',
      sub: 'Invoice, packing list, COO, PEB, klasifikasi HS, health certificate.',
      pos: 'left',
      from: 'left',
      delay: 0.5,
    },
  },
  {
    id: 'market',
    start: 52,
    dur: 7,
    kind: 'panel',
    panel: 'market',
    from: cam({ scale: 0.95, rotateY: 8 }),
    to: cam({ scale: 1.18, rotateY: -2, x: -320, y: 60, scroll: -40 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Akses pembeli',
      title: 'Dicocokkan langsung ke ',
      highlight: 'buyer terverifikasi',
      sub: 'Tanpa perantara yang mengambil alih identitas dagang UMKM.',
      pos: 'right',
      from: 'right',
      delay: 0.6,
    },
  },

  /* -------------------------------- 60-84s · cara kerja dan kedalaman */
  {
    id: 'pipeline',
    start: 59,
    dur: 12,
    kind: 'pipeline',
    from: cam({ scale: 1.04 }),
    to: cam({ scale: 1 }),
    ease: 'none',
    caption: {
      kicker: 'Cara kerja',
      title: 'Input, proses, ',
      highlight: 'output',
      pos: 'top',
      from: 'down',
      delay: 0.3,
    },
  },
  {
    id: 'qc',
    start: 71,
    dur: 5,
    kind: 'panel',
    panel: 'qc',
    from: cam({ scale: 0.9, rotateX: 10, rotateY: -10 }),
    to: cam({ scale: 1.14, rotateX: 0, rotateY: 3, x: 320, y: 40 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Human in the loop',
      title: 'Computer vision menyaring, ',
      highlight: 'surveyor memutuskan',
      sub: 'Batch meragukan ditahan sebelum masuk kontainer.',
      pos: 'left',
      from: 'left',
      delay: 0.5,
    },
  },
  {
    id: 'logistics',
    start: 76,
    dur: 7,
    kind: 'panel',
    panel: 'logistics',
    from: cam({ scale: 0.92, rotateY: 10, x: -60 }),
    to: cam({ scale: 1.1, rotateY: -3, x: -300, y: -50, scroll: -70 }),
    ease: 'power2.inOut',
    caption: {
      kicker: 'Mekanisme legal',
      title: 'Kargo digabung, ',
      highlight: 'PEB tetap masing-masing',
      sub: 'Konsolidator berizin Bea Cukai menerbitkan PKBE.',
      pos: 'right',
      from: 'right',
      delay: 0.5,
    },
  },

  /* --------------------------------- 84-98s · bukti dan hasil awal */
  {
    id: 'track',
    start: 83,
    dur: 7,
    kind: 'panel',
    panel: 'track',
    from: cam({ scale: 0.88, rotateX: 12, rotateY: 8, y: 40 }),
    to: cam({ scale: 1.16, rotateX: 0, rotateY: 0, x: 330, y: 90 }),
    ease: 'power3.out',
    caption: {
      kicker: 'Hasil',
      title: 'Rekam jejak ekspor ',
      highlight: 'atas nama sendiri',
      sub: 'Riwayat inilah yang bisa dinilai lembaga keuangan.',
      pos: 'left',
      from: 'left',
      delay: 0.6,
    },
  },
  {
    id: 'value',
    start: 90,
    dur: 6,
    kind: 'value',
    from: cam({ scale: 1.03 }),
    to: cam({ scale: 1 }),
    ease: 'none',
    caption: {
      kicker: 'Nilai bagi produsen',
      title: 'Selisih harga yang tadinya ',
      highlight: 'diambil perantara',
      pos: 'top',
      from: 'down',
      delay: 0.3,
    },
  },

  /* ------------------------------ 98-104s · status dan batas kesiapan */
  {
    id: 'status',
    start: 96,
    dur: 6,
    kind: 'status',
    from: cam({ scale: 1.02 }),
    to: cam({ scale: 1 }),
    ease: 'none',
    caption: {
      kicker: 'Status kesiapan',
      title: 'Yang sudah berjalan dan yang ',
      highlight: 'sedang dibangun',
      pos: 'top',
      from: 'down',
      delay: 0.2,
    },
  },
  {
    id: 'roadmap',
    start: 102,
    dur: 9,
    kind: 'roadmap',
    from: cam({ scale: 1.03 }),
    to: cam({ scale: 1 }),
    ease: 'none',
    caption: {
      kicker: 'Langkah berikutnya',
      title: 'Dari satu desa, menuju ',
      highlight: 'skala global',
      pos: 'top',
      from: 'down',
      delay: 0.2,
    },
  },
  {
    id: 'outro',
    start: 111,
    dur: 9,
    kind: 'outro',
    from: cam({ scale: 1.08 }),
    to: cam({ scale: 1 }),
    ease: 'power2.out',
  },
]

export const TOTAL_DURATION = SCENES.reduce(
  (end, s) => Math.max(end, s.start + s.dur),
  0,
)

export function sceneAt(t: number): Scene {
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (t >= SCENES[i].start) return SCENES[i]
  }
  return SCENES[0]
}

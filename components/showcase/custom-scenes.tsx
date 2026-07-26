'use client'

import { motion } from 'framer-motion'
import {
  Atom,
  Bot,
  Gauge,
  ScanLine,
  Handshake,
  FileCheck2,
  Landmark,
  ArrowRight,
  MapPin,
  CheckCircle2,
  CircleDot,
  Circle,
  TrendingUp,
  Container,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const easeOut = [0.16, 1, 0.3, 1] as const

const rise = (i: number) => ({
  initial: { opacity: 0, y: 26, filter: 'blur(5px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease: easeOut, delay: 0.15 + i * 0.09 },
})

/**
 * Shared shell for the non-dashboard scenes. The top band is left empty for
 * the scene caption; the body is centred in whatever height remains, so these
 * scenes never sit top-heavy against a big empty lower half.
 */
function SceneBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-background px-20 pb-20 pt-[17rem]',
        className,
      )}
    >
      <div className="relative w-full">{children}</div>
    </div>
  )
}

/* ==================================================================== INTRO */
export function IntroScene() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <div className="absolute inset-0 dot-pattern-dark" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
      />

      {/* wordmark sits above the caption, the middle is left clear for it */}
      <motion.div
        className="absolute left-1/2 top-[9.5rem] flex -translate-x-1/2 items-center gap-3"
        initial={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand-diagonal shadow-accent-lg">
          <Atom className="h-8 w-8 text-white" strokeWidth={1.9} />
        </span>
        <span className="font-display text-4xl tracking-tight">
          Atomic<span className="gradient-text">Export</span>
        </span>
      </motion.div>

      {/* location pill sits below the caption */}
      <motion.div
        className="absolute bottom-[11rem] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm"
        {...rise(6)}
      >
        <MapPin className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">
          Desa Langgongsari &amp; Pageraji, Cilongok, Banyumas
        </span>
      </motion.div>
    </div>
  )
}

/* ================================================================= PIPELINE */
const IN = [
  'Profil & legalitas UMKM',
  'Spesifikasi produk',
  'Foto produk',
  'Pertanyaan regulasi',
]

const PROC = [
  { icon: Bot, t: 'RAG', s: 'FAISS + embedding + LLM' },
  { icon: Gauge, t: 'Readiness Scoring', s: 'LightGBM + SHAP' },
  { icon: ScanLine, t: 'Computer Vision', s: 'EfficientNet-B4' },
  { icon: Handshake, t: 'Matching', s: 'Cosine similarity' },
]

const OUT = [
  { icon: Gauge, t: 'Skor kesiapan + faktor penekan' },
  { icon: Bot, t: 'Panduan regulasi bersitasi' },
  { icon: FileCheck2, t: 'Dokumen ekspor lengkap' },
  { icon: Landmark, t: 'Rekam jejak untuk penilaian kredit' },
]

function Col({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-1 flex-col gap-2.5">{children}</div>
    </div>
  )
}

export function PipelineScene() {
  return (
    <SceneBody>
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto grid max-w-[70rem] grid-cols-[1fr_auto_1.15fr_auto_1.15fr] items-start gap-5">
        <Col label="Input">
          {IN.map((t, i) => (
            <motion.div
              key={t}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm"
              {...rise(i)}
            >
              {t}
            </motion.div>
          ))}
        </Col>

        <motion.div className="mt-32" {...rise(4)}>
          <ArrowRight className="h-7 w-7 text-primary/50" />
        </motion.div>

        <Col label="Proses">
          {PROC.map((p, i) => (
            <motion.div
              key={p.t}
              className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.04] px-4 py-3 shadow-sm"
              {...rise(4 + i)}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg gradient-brand-diagonal text-white shadow-accent">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">{p.t}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {p.s}
                </p>
              </div>
            </motion.div>
          ))}
        </Col>

        <motion.div className="mt-32" {...rise(8)}>
          <ArrowRight className="h-7 w-7 text-primary/50" />
        </motion.div>

        <Col label="Output">
          {OUT.map((o, i) => (
            <motion.div
              key={o.t}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
              {...rise(8 + i)}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                <o.icon className="h-[18px] w-[18px]" />
              </span>
              <p className="text-sm leading-snug">{o.t}</p>
            </motion.div>
          ))}
        </Col>
      </div>

      <motion.div
        className="mx-auto mt-10 flex max-w-[62rem] items-center gap-3 rounded-xl border border-warning/30 bg-warning/[0.06] px-5 py-3.5"
        {...rise(13)}
      >
        <CircleDot className="h-4 w-4 shrink-0 text-warning" />
        <p className="text-sm text-foreground/80">
          Data tidak lengkap atau anomali ditandai untuk ditinjau manusia, tidak
          diproses otomatis.
        </p>
      </motion.div>
    </SceneBody>
  )
}

/* ==================================================================== VALUE */
export function ValueScene() {
  return (
    <SceneBody>
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[64rem]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-6">
          {/* before */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-7 shadow-sm"
            {...rise(0)}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Sekarang
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Jual beli putus ke pengepul lokal
            </p>
            <p className="mt-4 font-display text-[3.2rem] leading-none tracking-tight">
              Rp15.000
            </p>
            <p className="mt-1 text-sm text-muted-foreground">per kilogram</p>
          </motion.div>

          <motion.div
            className="grid place-items-center"
            {...rise(2)}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full gradient-brand-diagonal text-white shadow-accent-lg">
              <ArrowRight className="h-6 w-6" />
            </span>
          </motion.div>

          {/* after */}
          <motion.div
            className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-7 shadow-accent"
            {...rise(1)}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Ekspor atas nama sendiri
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Harga FOB pasar ekspor
            </p>
            <p className="mt-4 font-display text-[3.2rem] leading-none tracking-tight">
              <span className="gradient-text">Rp35.000</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              per kilogram, kisaran
            </p>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <motion.div
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            {...rise(3)}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-success/10 text-success">
              <Container className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-3xl tracking-tight text-success">
                −30%
              </p>
              <p className="text-sm text-muted-foreground">
                ongkos logistik per kg, konsolidasi LCL ke FCL
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            {...rise(4)}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-3xl tracking-tight">
                Rp588.000
              </p>
              <p className="text-sm text-muted-foreground">
                biaya langganan setahun, balik modal sejak kiriman pertama
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="mt-7 text-center text-[13px] leading-relaxed text-muted-foreground"
          {...rise(6)}
        >
          Harga FOB mengacu pada capaian koperasi gula semut sejenis yang sudah
          mengekspor. Angka ini proyeksi koridor pilot, belum hasil transaksi
          tim kami.
        </motion.p>
      </div>
    </SceneBody>
  )
}

/* =================================================================== STATUS */
type Tier = 'run' | 'proto' | 'sim' | 'plan'

const TIERS: Record<Tier, { label: string; cls: string; icon: typeof Circle }> =
  {
    run: {
      label: 'Berjalan',
      cls: 'border-success/40 bg-success/[0.07] text-success',
      icon: CheckCircle2,
    },
    proto: {
      label: 'Prototipe',
      cls: 'border-primary/40 bg-primary/[0.06] text-primary',
      icon: CircleDot,
    },
    sim: {
      label: 'Simulasi',
      cls: 'border-warning/45 bg-warning/[0.08] text-warning',
      icon: CircleDot,
    },
    plan: {
      label: 'Rencana',
      cls: 'border-border bg-muted/50 text-muted-foreground',
      icon: Circle,
    },
  }

const STATUS_ITEMS: { tier: Tier; t: string; s: string }[] = [
  {
    tier: 'run',
    t: 'Antarmuka & alur end-to-end',
    s: 'PWA Next.js, Atomic Steps, alur dokumen',
  },
  {
    tier: 'proto',
    t: 'AI Copilot regulasi',
    s: 'RAG atas korpus regulasi terkurasi',
  },
  {
    tier: 'sim',
    t: 'Readiness Scoring & QC Vision',
    s: 'Bobot belum dikalibrasi data lapangan',
  },
  {
    tier: 'plan',
    t: 'Integrasi INSW & lembaga keuangan',
    s: 'Masih penjajakan kemitraan',
  },
]

export function StatusScene() {
  return (
    <SceneBody>
      <div className="absolute left-1/4 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[62rem]">
        <div className="grid grid-cols-2 gap-4">
          {STATUS_ITEMS.map((it, i) => {
            const tier = TIERS[it.tier]
            return (
              <motion.div
                key={it.t}
                className={cn('rounded-2xl border p-6 shadow-sm', tier.cls)}
                {...rise(i)}
              >
                <div className="flex items-center gap-2">
                  <tier.icon className="h-4 w-4" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                    {tier.label}
                  </span>
                </div>
                <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {it.t}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{it.s}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="mt-8 text-center text-[15px] text-muted-foreground"
          {...rise(5)}
        >
          Milestone berikutnya: kalibrasi model dengan data pilot dan
          formalisasi kerja sama konsolidator, Semester II 2026.
        </motion.p>
      </div>
    </SceneBody>
  )
}

/* ============================================================ OUTRO / CTA */
const ASKS = [
  { icon: Container, t: 'Konsolidator berizin Bea Cukai' },
  { icon: ScanLine, t: 'Surveyor mutu independen' },
  { icon: Handshake, t: 'Koperasi & PLUT pendamping UMKM' },
]

export function OutroScene() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[150px]" />
      <div className="absolute inset-0 dot-pattern-dark" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
      />

      <div className="relative flex flex-col items-center px-16">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl gradient-brand-diagonal shadow-accent-lg">
            <Atom className="h-10 w-10 text-white" strokeWidth={1.9} />
          </span>
          <span className="font-display text-[4.25rem] leading-none tracking-tight">
            Atomic<span className="gradient-text">Export</span>
          </span>
        </motion.div>

        <motion.p
          className="mt-6 font-display text-3xl tracking-tight"
          {...rise(2)}
        >
          Ekspor <span className="gradient-text">atas nama sendiri</span>.
        </motion.p>

        {/* collaboration ask */}
        <motion.p
          className="mt-12 font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground"
          {...rise(4)}
        >
          Kami mencari mitra
        </motion.p>

        <div className="mt-4 flex items-center gap-3">
          {ASKS.map((a, i) => (
            <motion.div
              key={a.t}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
              {...rise(5 + i)}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <a.icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{a.t}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-11 flex flex-col items-center gap-2"
          {...rise(9)}
        >
          <span className="rounded-full gradient-brand px-7 py-3 text-base font-semibold text-white shadow-accent-lg">
            atomic-export-five.vercel.app
          </span>
          <span className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Tetra Core Team · P1438 · BI-OJK PIDI DIGDAYA Hackathon 2026
          </span>
        </motion.div>
      </div>
    </div>
  )
}

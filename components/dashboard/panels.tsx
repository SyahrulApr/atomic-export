'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTourOptional } from './onboarding/tour-context'
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  TrendingUp,
  Gauge,
  Coins,
  Landmark,
  CheckCircle2,
  Circle,
  Flame,
  Trophy,
  Star,
  Clock,
  Bot,
  User,
  FileText,
  Download,
  CheckCheck,
  Globe2,
  BadgeCheck,
  ScanLine,
  Container,
  Package,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ============================================================ PRIMITIVES */
function Card({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-5 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardTitle({
  children,
  icon: Icon,
  sub,
}: {
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  sub?: string
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10">
            <Icon className="h-[18px] w-[18px] text-primary" />
          </span>
        )}
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{children}</h3>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

function Pill({
  children,
  tone = 'primary',
}: {
  children: React.ReactNode
  tone?: 'primary' | 'success' | 'warning' | 'muted'
}) {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/15 text-warning',
    muted: 'bg-muted text-muted-foreground',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

function Progress({ value, tone = 'primary' }: { value: number; tone?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn(
          'h-full rounded-full',
          tone === 'success' ? 'bg-success' : 'gradient-brand',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  delta,
  tone = 'primary',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta?: string
  tone?: 'primary' | 'success' | 'warning'
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'grid h-10 w-10 place-items-center rounded-xl',
            tone === 'success'
              ? 'bg-success/10 text-success'
              : tone === 'warning'
                ? 'bg-warning/15 text-warning'
                : 'gradient-brand-diagonal text-white shadow-accent',
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {delta && <Pill tone="success">{delta}</Pill>}
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </Card>
  )
}

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="space-y-5" {...panelMotion}>
      {children}
    </motion.div>
  )
}

function Banner() {
  return (
    <div className="relative overflow-hidden rounded-2xl gradient-brand-diagonal p-5 text-white shadow-accent">
      <div className="absolute inset-0 dot-pattern opacity-100" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
            Koridor Pilot Aktif
          </p>
          <p className="mt-1 text-lg font-semibold">
            Gula Semut Kelapa Banyumas ke Osaka, Jepang
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Fase 4 · Network Aggregation</span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================== OVERVIEW */
const exportTrend = [
  { m: 'Sep', v: 0 },
  { m: 'Okt', v: 0 },
  { m: 'Nov', v: 120 },
  { m: 'Des', v: 180 },
  { m: 'Jan', v: 240 },
  { m: 'Feb', v: 320 },
]

const stages = [
  { n: 1, label: 'Frictionless Execution', status: 'done' },
  { n: 2, label: 'Autonomous Compliance', status: 'done' },
  { n: 3, label: 'Integrated Education', status: 'done' },
  { n: 4, label: 'Community Building', status: 'done' },
  { n: 5, label: 'Algorithmic Gatekeeper', status: 'active' },
  { n: 6, label: 'Network Aggregation', status: 'pending' },
]

export function OverviewPanel() {
  return (
    <Panel>
      <div data-tour="ov-banner">
        <Banner />
      </div>
      <div data-tour="ov-stats" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Gauge} label="Export Readiness Score" value="82 / 100" delta="+14" />
        <Stat icon={CheckCheck} label="Atomic Steps selesai" value="18 / 24" tone="success" />
        <Stat icon={Coins} label="Margin retensi vs agregator" value="+34%" delta="naik" />
        <Stat icon={Landmark} label="Ekspor atas nama sendiri" value="3 PEB" tone="warning" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle icon={TrendingUp} sub="Nilai ekspor terkonsolidasi (juta Rp)">
            Pertumbuhan Ekspor
          </CardTitle>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={exportTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0052ff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0052ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#0052ff" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardTitle icon={Clock} sub="Aktivitas terbaru">
            Activity Feed
          </CardTitle>
          <ul className="space-y-3.5">
            {[
              { t: 'COO diterbitkan otomatis', s: 'Tahap 2 · 2 jam lalu', tone: 'success' },
              { t: 'QC Hybrid: batch lolos 98%', s: 'Tahap 5 · 5 jam lalu', tone: 'success' },
              { t: 'Buyer match baru: Osaka Organic Foods', s: 'P2P2B · kemarin', tone: 'primary' },
              { t: 'Kontainer FCL terisi 78%', s: 'Tahap 6 · kemarin', tone: 'warning' },
            ].map((a) => (
              <li key={a.t} className="flex gap-3">
                <span
                  className={cn(
                    'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                    a.tone === 'success'
                      ? 'bg-success'
                      : a.tone === 'warning'
                        ? 'bg-warning'
                        : 'bg-primary',
                  )}
                />
                <div>
                  <p className="text-sm font-medium leading-snug">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card data-tour="ov-flow">
        <CardTitle icon={Sparkles} sub="Flywheel of Trust & Scale, 6 tahap end-to-end">
          Progres Alur Ekspor
        </CardTitle>
        <div className="grid gap-3 md:grid-cols-6">
          {stages.map((s) => (
            <div
              key={s.n}
              className={cn(
                'rounded-xl border p-3',
                s.status === 'done'
                  ? 'border-success/30 bg-success/5'
                  : s.status === 'active'
                    ? 'border-primary/40 bg-primary/5 shadow-accent'
                    : 'border-border bg-muted/40',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">
                  T{s.n}
                </span>
                {s.status === 'done' ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : s.status === 'active' ? (
                  <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground/40" />
                )}
              </div>
              <p className="mt-2 text-xs font-medium leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </Panel>
  )
}

/* =========================================================== ATOMIC STEPS */
const tasks = [
  { t: 'Verifikasi NIB & izin edar BPOM', done: true, min: 10, xp: 120 },
  { t: 'Unggah spesifikasi produk (mesh, kadar air)', done: true, min: 8, xp: 100 },
  { t: 'Tetapkan kapasitas produksi bulanan', done: true, min: 5, xp: 80 },
  { t: 'Pelajari klasifikasi HS Code gula semut (1702.90)', done: false, min: 12, xp: 150, active: true },
  { t: 'Konfirmasi standar organik JAS buyer Jepang', done: false, min: 10, xp: 130 },
  { t: 'Siapkan sampel untuk QC Hybrid', done: false, min: 15, xp: 160 },
]

export function AtomicStepsPanel() {
  return (
    <Panel>
      <Card data-tour="atomic-level" className="relative overflow-hidden">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-brand-diagonal text-white shadow-accent">
              <Trophy className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Level saat ini</p>
              <p className="text-xl font-semibold tracking-tight">Eksportir Madya</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1.5 text-warning">
                <Flame className="h-5 w-5" />
                <span className="text-xl font-semibold">12</span>
              </div>
              <p className="text-xs text-muted-foreground">hari beruntun</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1.5 text-primary">
                <Star className="h-5 w-5" />
                <span className="text-xl font-semibold">2.450</span>
              </div>
              <p className="text-xs text-muted-foreground">XP terkumpul</p>
            </div>
          </div>
        </div>
        <div className="relative mt-5">
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>Menuju Eksportir Mahir</span>
            <span>2.450 / 3.000 XP</span>
          </div>
          <Progress value={82} />
        </div>
      </Card>

      <Card data-tour="atomic-tasks">
        <CardTitle icon={Sparkles} sub="Tugas mikro hari ini · masing-masing < 15 menit">
          Atomic Steps Harian
        </CardTitle>
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.t}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3.5 transition-colors',
                task.active
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border',
              )}
            >
              {task.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <Circle
                  className={cn(
                    'h-5 w-5 shrink-0',
                    task.active ? 'text-primary' : 'text-muted-foreground/40',
                  )}
                />
              )}
              <div className="flex-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    task.done && 'text-muted-foreground line-through',
                  )}
                >
                  {task.t}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {task.min}m
              </span>
              <Pill tone={task.done ? 'success' : 'primary'}>+{task.xp} XP</Pill>
            </div>
          ))}
        </div>
      </Card>
    </Panel>
  )
}

/* ================================================================ COPILOT */
const chat = [
  {
    role: 'user',
    text: 'Dokumen apa saja yang wajib untuk ekspor gula semut kelapa ke Jepang?',
  },
  {
    role: 'bot',
    text: 'Untuk gula semut kelapa (pos tarif famili HS 1702.90) ke Jepang, dokumen wajib: (1) PEB, Pemberitahuan Ekspor Barang via INSW, (2) Commercial Invoice, (3) Packing List, (4) Certificate of Origin, dan (5) Health Certificate untuk produk pangan olahan. Jepang menerapkan Food Sanitation Act, jadi hasil uji laboratorium pangan perlu disiapkan sebelum pengapalan.',
    sources: ['INSW', 'Permendag', 'MAFF Japan'],
  },
  {
    role: 'user',
    text: 'Apa fungsi Certificate of Origin Form IJEPA?',
  },
  {
    role: 'bot',
    text: 'Form IJEPA adalah dasar untuk mengajukan klaim tarif preferensi di bawah perjanjian Indonesia-Jepang. Besaran tarifnya mengikuti IJEPA Tariff Schedule pada pos tarif produk Anda, jadi perlu diverifikasi per pos, bukan otomatis nol. Syarat utamanya kriteria origin terpenuhi. Draf COO Anda tersedia di menu Dokumen untuk ditinjau sebelum diajukan.',
    sources: ['IJEPA Tariff Schedule', 'Bea Cukai'],
  },
]

type ChatMsg = {
  role: string
  text: string
  sources?: string[]
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function CopilotPanel({ replay = false }: { replay?: boolean }) {
  const tour = useTourOptional()
  const tourHere = !!tour?.isActive && tour.step?.panel === 'copilot'
  // the /showcase timeline drives the replay directly via `replay`
  const shouldReplay = replay || tourHere

  // when replaying, type the thread out live; otherwise show the full thread
  const [msgs, setMsgs] = useState<ChatMsg[]>(shouldReplay ? [] : chat)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [liveInput, setLiveInput] = useState('')
  const [liveError, setLiveError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  async function handleAsk() {
    const question = liveInput.trim()
    if (!question || thinking) return
    setLiveInput('')
    setLiveError(null)
    setMsgs((p) => [...p, { role: 'user', text: question }])
    setThinking(true)
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal memproses pertanyaan.')
      setMsgs((p) => [
        ...p,
        {
          role: 'bot',
          text: data.answer,
          sources: (data.sources ?? []).map((s: { title: string }) => s.title),
        },
      ])
    } catch (err) {
      setLiveError(
        err instanceof Error ? err.message : 'Gagal terhubung ke Copilot.',
      )
    } finally {
      setThinking(false)
    }
  }

  // auto-scroll on new content
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, draft, thinking])

  // scripted live demo, triggered by the tour or by the showcase timeline
  useEffect(() => {
    if (!shouldReplay) {
      // restore the static thread once the replay is no longer requested
      setMsgs(chat)
      setDraft('')
      setThinking(false)
      return
    }

    let cancelled = false
    ;(async () => {
      setMsgs([])
      setDraft('')
      await sleep(400)
      for (const m of chat) {
        if (cancelled) return
        if (m.role === 'user') {
          for (let i = 1; i <= m.text.length; i++) {
            if (cancelled) return
            setDraft(m.text.slice(0, i))
            await sleep(16)
          }
          await sleep(280)
          if (cancelled) return
          setDraft('')
          setMsgs((p) => [...p, m])
          await sleep(260)
        } else {
          setThinking(true)
          await sleep(950)
          if (cancelled) return
          setThinking(false)
          setMsgs((p) => [...p, m])
          await sleep(450)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [shouldReplay])

  return (
    <Panel>
      <Card data-tour="copilot-card" className="flex h-[600px] flex-col p-0">
        <div className="flex items-center gap-2.5 border-b border-border p-4">
          <span className="grid h-9 w-9 place-items-center rounded-lg gradient-brand-diagonal text-white">
            <Bot className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-sm font-semibold">AI Copilot Ekspor</p>
            <p className="text-xs text-muted-foreground">
              RAG atas korpus regulasi terkurasi
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-warning">
            <span className="h-2 w-2 rounded-full bg-warning" />
            Prototipe
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={cn(
                'flex gap-3',
                m.role === 'user' && 'flex-row-reverse',
              )}
            >
              <span
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-lg',
                  m.role === 'bot'
                    ? 'gradient-brand-diagonal text-white'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {m.role === 'bot' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </span>
              <div
                className={cn(
                  'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  m.role === 'bot'
                    ? 'rounded-tl-sm bg-muted'
                    : 'rounded-tr-sm gradient-brand text-white',
                )}
              >
                <p>{m.text}</p>
                {m.sources && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.sources.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 rounded-md bg-card px-2 py-0.5 font-mono text-[10px] text-primary"
                      >
                        <FileText className="h-3 w-3" />
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-brand-diagonal text-white">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3.5">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-muted-foreground/60" />
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          {liveError && (
            <p className="mb-2 text-xs text-destructive">{liveError}</p>
          )}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
            <input
              readOnly={shouldReplay}
              value={shouldReplay ? draft : liveInput}
              onChange={(e) => setLiveInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !shouldReplay) handleAsk()
              }}
              disabled={thinking}
              placeholder={
                shouldReplay
                  ? 'Tanya regulasi ekspor… (demo)'
                  : 'Tanya regulasi ekspor ke Copilot…'
              }
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-60"
            />
            {shouldReplay && draft && (
              <span className="inline-block h-4 w-px animate-pulse-dot bg-primary" />
            )}
            <button
              onClick={handleAsk}
              disabled={shouldReplay || thinking || !liveInput.trim()}
              className="grid h-8 w-8 place-items-center rounded-lg gradient-brand text-white disabled:opacity-40"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </Panel>
  )
}

/* =============================================================== READINESS */
const radar = [
  { dim: 'Legalitas', v: 95 },
  { dim: 'Spek Produk', v: 88 },
  { dim: 'Kapasitas', v: 72 },
  { dim: 'Rekam Jejak', v: 74 },
]
const shap = [
  { f: 'NIB & izin edar lengkap', v: 18, pos: true },
  { f: 'Kadar air memenuhi standar', v: 15, pos: true },
  { f: '12 hari streak Atomic Steps', v: 11, pos: true },
  { f: 'Kapasitas < target buyer', v: -7, pos: false },
  { f: 'Belum ada sertifikasi organik JAS', v: -5, pos: false },
]

export function ReadinessPanel() {
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card data-tour="ready-score" className="flex flex-col items-center justify-center text-center">
          <div className="relative grid h-44 w-44 place-items-center">
            <svg className="h-44 w-44 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#0052ff"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.82)}`}
              />
            </svg>
            <div className="absolute">
              <div className="font-display text-4xl tracking-tight">82</div>
              <div className="text-xs text-muted-foreground">/ 100</div>
            </div>
          </div>
          <p className="mt-3 font-semibold">Siap Ekspor</p>
          <p className="text-xs text-muted-foreground">
            Rubrik berbobot · transparan
          </p>
          <Pill tone="success">
            <TrendingUp className="h-3 w-3" /> +14 dari kohort
          </Pill>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={Gauge} sub="Skor multi-dimensi (4 dimensi)">
            Profil Kesiapan
          </CardTitle>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 12, fill: '#64748b' }} />
                <Radar dataKey="v" stroke="#0052ff" fill="#0052ff" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card data-tour="ready-shap">
        <CardTitle icon={Sparkles} sub="Kontribusi fitur terhadap skor (SHAP values)">
          Faktor Penentu Skor
        </CardTitle>
        <div className="space-y-3">
          {shap.map((s) => (
            <div key={s.f} className="flex items-center gap-3">
              <span className="w-56 shrink-0 text-sm">{s.f}</span>
              <div className="flex flex-1 items-center">
                <div className="flex w-1/2 justify-end">
                  {!s.pos && (
                    <div
                      className="h-5 rounded-l-md bg-destructive/70"
                      style={{ width: `${Math.abs(s.v) * 4}%` }}
                    />
                  )}
                </div>
                <div className="h-5 w-px bg-border" />
                <div className="flex w-1/2">
                  {s.pos && (
                    <div
                      className="h-5 rounded-r-md gradient-brand"
                      style={{ width: `${s.v * 4}%` }}
                    />
                  )}
                </div>
              </div>
              <span
                className={cn(
                  'w-12 text-right text-sm font-medium',
                  s.pos ? 'text-primary' : 'text-destructive',
                )}
              >
                {s.pos ? '+' : ''}
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </Panel>
  )
}

/* =============================================================== DOCUMENTS */
const docs = [
  { name: 'Commercial Invoice', code: 'CI-2026-0312', status: 'Siap', icon: FileText },
  { name: 'Packing List', code: 'PL-2026-0312', status: 'Siap', icon: Package },
  { name: 'Certificate of Origin (Form IJEPA)', code: 'COO-2026-0312', status: 'Siap', icon: BadgeCheck },
  { name: 'PEB, Pemberitahuan Ekspor Barang', code: 'PEB-DRAFT', status: 'Draf', icon: FileText },
  { name: 'Klasifikasi HS Code 1702.90', code: 'HS-REVIEW', status: 'Terverifikasi', icon: CheckCheck },
  { name: 'Health Certificate produk pangan', code: 'HC-REQ', status: 'Menunggu', icon: ShieldCheck },
]

export function DocumentsPanel() {
  return (
    <Panel>
      <Card data-tour="docs-hero" className="border-primary/30 bg-primary/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-diagonal text-white shadow-accent">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Single-Entry, Multi-Output</p>
              <p className="text-xs text-muted-foreground">
                Satu kali input data, 6 dokumen perdagangan tergenerasi otomatis
              </p>
            </div>
          </div>
          <Pill tone="success">
            <CheckCheck className="h-3 w-3" /> Zero-Defect · 0 error
          </Pill>
        </div>
      </Card>

      <div data-tour="docs-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => {
          const tone =
            d.status === 'Siap' || d.status === 'Terverifikasi'
              ? 'success'
              : d.status === 'Draf'
                ? 'primary'
                : 'warning'
          return (
            <Card key={d.name} className="flex flex-col">
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </span>
                <Pill tone={tone as 'success' | 'primary' | 'warning'}>
                  {d.status}
                </Pill>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-snug">{d.name}</h3>
              <p className="font-mono text-[11px] text-muted-foreground">{d.code}</p>
              <button className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium transition-colors hover:bg-muted">
                <Download className="h-3.5 w-3.5" />
                Unduh PDF
              </button>
            </Card>
          )
        })}
      </div>
    </Panel>
  )
}

/* ================================================================= MARKET */
const demand = [
  { m: 'Q1', v: 62 },
  { m: 'Q2', v: 70 },
  { m: 'Q3', v: 78 },
  { m: 'Q4', v: 91 },
]
const buyers = [
  { name: 'Osaka Organic Foods', loc: 'Osaka, Jepang', match: 94, verified: true, vol: '2× 20ft / kuartal' },
  { name: 'Kyoto Natural Sweeteners', loc: 'Kyoto, Jepang', match: 89, verified: true, vol: '1× 20ft / kuartal' },
  { name: 'Tokyo Wholefoods Trading', loc: 'Tokyo, Jepang', match: 81, verified: false, vol: 'LCL fleksibel' },
]

export function MarketPanel() {
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardTitle icon={TrendingUp} sub="Indeks permintaan pemanis alami Jepang">
            Market Intelligence
          </CardTitle>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demand} margin={{ left: -24, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="v" fill="#0052ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Tren naik +47% YoY · spek dicocokkan ke produk Anda secara real-time.
          </p>
        </Card>

        <Card data-tour="market-buyers" className="lg:col-span-2">
          <CardTitle icon={Globe2} sub="P2P2B Matchmaking · cosine similarity produk ke buyer">
            Verified International Buyers
          </CardTitle>
          <div className="space-y-3">
            {buyers.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-4 rounded-xl border border-border p-3.5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-muted font-semibold">
                  {b.name[0]}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{b.name}</p>
                    {b.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {b.loc} · {b.vol}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">{b.match}%</div>
                  <p className="text-[10px] text-muted-foreground">match</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card data-tour="market-consortium" className="border-primary/30 bg-primary/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">
              Konsorsium P2P2B · Koperasi Merah Putih
            </p>
            <p className="text-xs text-muted-foreground">
              8 UMKM peer · tiap UMKM tersambung ke buyer-nya sendiri & berbagi
              logistik FCL · PEB, buyer, dan margin tetap atas nama masing-masing
            </p>
          </div>
          <Pill tone="success">
            <Handshakeicon /> Bendera legal aktif
          </Pill>
        </div>
      </Card>
    </Panel>
  )
}

function Handshakeicon() {
  return <Sparkles className="h-3 w-3" />
}

/* ===================================================================== QC */
const batch = [
  { id: 'GSL-A1', grade: 'Grade A · mesh 16', defect: 1.2, pass: true },
  { id: 'GSL-A2', grade: 'Grade A · mesh 18', defect: 1.8, pass: true },
  { id: 'GSL-A3', grade: 'Grade B · mesh 20', defect: 2.4, pass: true },
  { id: 'GSL-B1', grade: 'Reject · menggumpal', defect: 8.6, pass: false },
]

export function QCPanel() {
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card data-tour="qc-cv" className="lg:col-span-1">
          <CardTitle icon={ScanLine} sub="EfficientNet-B4 · transfer learning ImageNet">
            Computer Vision Scan
          </CardTitle>
          <div className="relative grid h-44 place-items-center overflow-hidden rounded-xl gradient-brand-diagonal">
            <div className="absolute inset-0 dot-pattern opacity-100" />
            <Package className="relative h-16 w-16 text-white/90" />
            <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium">
              Kristal gula semut
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Confidence deteksi</span>
                <span className="font-medium">98,4%</span>
              </div>
              <Progress value={98} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Defect rate batch</span>
                <span className="font-medium text-success">1,6%</span>
              </div>
              <Progress value={16} tone="success" />
            </div>
          </div>
        </Card>

        <Card data-tour="qc-batch" className="lg:col-span-2">
          <CardTitle icon={ShieldCheck} sub="QC Hybrid · CV + verifikasi surveyor independen">
            Hasil Inspeksi Batch
          </CardTitle>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Batch</th>
                  <th className="px-4 py-2.5 text-left font-medium">Grade (CV)</th>
                  <th className="px-4 py-2.5 text-left font-medium">Defect</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {batch.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs">{b.id}</td>
                    <td className="px-4 py-3">{b.grade}</td>
                    <td className="px-4 py-3">{b.defect}%</td>
                    <td className="px-4 py-3">
                      {b.pass ? (
                        <Pill tone="success">
                          <CheckCircle2 className="h-3 w-3" /> Lolos
                        </Pill>
                      ) : (
                        <Pill tone="warning">
                          <AlertTriangle className="h-3 w-3" /> Ditahan
                        </Pill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/5 p-3 text-sm">
            <BadgeCheck className="h-4 w-4 text-success" />
            <span>
              Surveyor independen (Sucofindo) memverifikasi mutu per-UMKM
              sebelum kirim, rejection rate tiap eksportir turun, reputasi
              platform terjaga.
            </span>
          </div>
        </Card>
      </div>
    </Panel>
  )
}

/* ============================================================== LOGISTICS */
const contributors = [
  { name: 'Koperasi Gula Semut Langgongsari', vol: 38 },
  { name: 'UMKM Pageraji Manis', vol: 22 },
  { name: 'Tani Cilongok Sejahtera', vol: 18 },
  { name: 'KWT Langgongsari', vol: 0 },
]

export function LogisticsPanel() {
  const fill = 78
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card data-tour="logi-consol" className="lg:col-span-2">
          <CardTitle icon={Container} sub="Less-than-Container-Load ke Full-Container-Load">
            Konsolidasi Kargo
          </CardTitle>
          <div className="rounded-xl border border-border p-5">
            <div className="mb-2 flex items-end justify-between">
              <span className="text-sm font-medium">Kontainer 1× 20ft</span>
              <span className="text-2xl font-semibold text-primary">{fill}%</span>
            </div>
            <div className="flex h-10 overflow-hidden rounded-lg border border-border">
              {contributors.map((c, i) =>
                c.vol > 0 ? (
                  <div
                    key={c.name}
                    className={cn(
                      'flex items-center justify-center text-[10px] font-medium text-white',
                      i === 0
                        ? 'bg-primary'
                        : i === 1
                          ? 'bg-primary/80'
                          : 'bg-primary/60',
                    )}
                    style={{ width: `${c.vol}%` }}
                  >
                    {c.vol}%
                  </div>
                ) : null,
              )}
              <div
                className="flex items-center justify-center bg-muted text-[10px] text-muted-foreground"
                style={{ width: `${100 - fill}%` }}
              >
                kosong
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Tersisa 22% kapasitas, menunggu 1 UMKM untuk mencapai FCL & memicu
              penerbitan PKBE oleh konsolidator yang disetujui Bea Cukai.
            </p>
          </div>

          <div className="mt-4 space-y-2.5">
            {contributors.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-xs font-semibold">
                  {c.name[0]}
                </span>
                <span className="flex-1 text-sm">{c.name}</span>
                {c.vol > 0 ? (
                  <Pill tone="primary">{c.vol}% volume</Pill>
                ) : (
                  <Pill tone="muted">menunggu</Pill>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Stat icon={Coins} label="Penghematan biaya/unit vs LCL" value="−30%" delta="hemat" tone="success" />
          <Card data-tour="logi-pkbe">
            <CardTitle sub="Setiap UMKM punya PEB sendiri">Status PKBE</CardTitle>
            <ul className="space-y-3">
              {[
                { t: 'Kargo terkumpul di gudang Koperasi', done: true },
                { t: 'QC Hybrid lolos', done: true },
                { t: 'Konsolidator (disetujui Bea Cukai) ditunjuk', done: true },
                { t: 'PKBE terbit · tiap UMKM 1 PEB (LCL ke FCL)', done: false },
              ].map((s) => (
                <li key={s.t} className="flex items-center gap-2.5 text-sm">
                  {s.done ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/40" />
                  )}
                  <span className={cn(s.done && 'text-muted-foreground')}>
                    {s.t}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Panel>
  )
}

/* ============================================================ TRACK RECORD */
const history = [
  { date: '2026-02-18', buyer: 'Osaka Organic Foods', val: '320 jt', peb: 'PEB-0312', status: 'Selesai' },
  { date: '2026-01-22', buyer: 'Kyoto Natural Sweeteners', val: '240 jt', peb: 'PEB-0287', status: 'Selesai' },
  { date: '2025-12-09', buyer: 'Osaka Organic Foods', val: '180 jt', peb: 'PEB-0241', status: 'Selesai' },
]

export function TrackRecordPanel() {
  return (
    <Panel>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card data-tour="track-score" className="flex flex-col items-center justify-center text-center">
          <p className="text-xs text-muted-foreground">Alternative Credit Score</p>
          <div className="mt-2 font-display text-5xl tracking-tight">
            <span className="gradient-text">720</span>
          </div>
          <Pill tone="success">
            <TrendingUp className="h-3 w-3" /> Layak pembiayaan
          </Pill>
          <p className="mt-3 text-xs text-muted-foreground">
            Dibangun dari behavioral log & 3 transaksi ekspor atas nama sendiri.
          </p>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={Landmark} sub="Status bankability UMKM">
            Dari Unbankable ke Layak Modal
          </CardTitle>
          <div className="flex items-center gap-2">
            {[
              { t: 'Unbankable', done: true },
              { t: 'Rekam jejak terbentuk', done: true },
              { t: 'Credit identity', done: true },
              { t: 'Akses pembiayaan formal', done: false },
            ].map((s, i, arr) => (
              <div key={s.t} className="flex flex-1 items-center">
                <div className="flex flex-1 flex-col items-center text-center">
                  <span
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-full',
                      s.done
                        ? 'gradient-brand text-white'
                        : 'border-2 border-dashed border-border text-muted-foreground',
                    )}
                  >
                    {s.done ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </span>
                  <span className="mt-1.5 text-[11px] leading-tight">{s.t}</span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className={cn(
                      'mb-4 h-0.5 flex-1',
                      s.done ? 'bg-primary' : 'bg-border',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl gradient-brand py-3 text-sm font-medium text-white shadow-accent transition-all hover:shadow-accent-lg hover:brightness-110">
            Ajukan ke Lembaga Keuangan
            <ArrowRight className="h-4 w-4" />
          </button>
        </Card>
      </div>

      <Card data-tour="track-history">
        <CardTitle icon={FileText} sub="Tercatat permanen atas nama UMKM (bukan perantara)">
          Riwayat Ekspor
        </CardTitle>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Tanggal</th>
                <th className="px-4 py-2.5 text-left font-medium">Buyer</th>
                <th className="px-4 py-2.5 text-left font-medium">Nilai</th>
                <th className="px-4 py-2.5 text-left font-medium">PEB</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.peb} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{h.date}</td>
                  <td className="px-4 py-3">{h.buyer}</td>
                  <td className="px-4 py-3 font-medium">Rp {h.val}</td>
                  <td className="px-4 py-3 font-mono text-xs text-primary">{h.peb}</td>
                  <td className="px-4 py-3">
                    <Pill tone="success">
                      <CheckCircle2 className="h-3 w-3" /> {h.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Panel>
  )
}

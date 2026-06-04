'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Atom,
  LayoutDashboard,
  ListChecks,
  Bot,
  Gauge,
  FileText,
  Globe2,
  ScanLine,
  Container,
  Landmark,
  Search,
  Bell,
  ArrowLeft,
  LogOut,
} from 'lucide-react'
import {
  OverviewPanel,
  AtomicStepsPanel,
  CopilotPanel,
  ReadinessPanel,
  DocumentsPanel,
  MarketPanel,
  QCPanel,
  LogisticsPanel,
  TrackRecordPanel,
} from './panels'
import { TourProvider } from './onboarding/tour-context'
import { TourLayer } from './onboarding/tour-layer'
import { useCallback } from 'react'

const NAV = [
  { key: 'overview', label: 'Beranda', icon: LayoutDashboard, stage: null },
  { key: 'atomic', label: 'Atomic Steps', icon: ListChecks, stage: 'Tahap 1' },
  { key: 'copilot', label: 'AI Copilot', icon: Bot, stage: 'Tahap 2' },
  { key: 'readiness', label: 'Readiness Score', icon: Gauge, stage: 'Scoring' },
  { key: 'documents', label: 'Dokumen', icon: FileText, stage: 'Tahap 2' },
  { key: 'market', label: 'Market & P2P2B', icon: Globe2, stage: 'Tahap 3·4' },
  { key: 'qc', label: 'QC Hybrid', icon: ScanLine, stage: 'Tahap 5' },
  { key: 'logistics', label: 'Logistik LCL ke FCL', icon: Container, stage: 'Tahap 6' },
  { key: 'track', label: 'Track Record', icon: Landmark, stage: 'Bankability' },
] as const

type NavKey = (typeof NAV)[number]['key']

const PANELS: Record<NavKey, React.ComponentType> = {
  overview: OverviewPanel,
  atomic: AtomicStepsPanel,
  copilot: CopilotPanel,
  readiness: ReadinessPanel,
  documents: DocumentsPanel,
  market: MarketPanel,
  qc: QCPanel,
  logistics: LogisticsPanel,
  track: TrackRecordPanel,
}

export function DashboardShell() {
  const router = useRouter()
  const [active, setActive] = useState<NavKey>('overview')
  const Panel = PANELS[active]
  const activeNav = NAV.find((n) => n.key === active)!

  const handlePanel = useCallback((p: string) => setActive(p as NavKey), [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <TourProvider onPanel={handlePanel}>
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand-diagonal shadow-accent">
              <Atom className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Atomic<span className="gradient-text">Export</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map((n) => {
            const isActive = n.key === active
            return (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'gradient-brand text-white shadow-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <n.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">{n.label}</span>
                {n.stage && (
                  <span
                    className={cn(
                      'font-mono text-[9px] uppercase tracking-wider',
                      isActive ? 'text-white/70' : 'text-muted-foreground/60',
                    )}
                  >
                    {n.stage}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            Kembali ke Landing
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 lg:pl-64">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <activeNav.icon className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-sm font-semibold leading-none tracking-tight">
                {activeNav.label}
              </h1>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {activeNav.stage ?? 'Ringkasan'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
              <Search className="h-4 w-4" />
              <span className="text-xs">Cari…</span>
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-1.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-diagonal text-xs font-semibold text-white">
                KG
              </span>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold leading-none">
                  Koperasi Kopi Gayo
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Aceh Tengah · NIB aktif
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-6">
          <Panel />
        </main>
      </div>
    </div>
    <TourLayer />
    </TourProvider>
  )
}

'use client'

import { forwardRef } from 'react'
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
  Lock,
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
} from '@/components/dashboard/panels'
import { cn } from '@/lib/utils'

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

/** Panels that should not remount between scenes keep their own state; the
 *  Copilot is the exception, it replays its thread whenever it becomes active. */
function PanelFor({ panel }: { panel: string }) {
  switch (panel) {
    case 'atomic':
      return <AtomicStepsPanel />
    case 'copilot':
      return <CopilotPanel replay />
    case 'readiness':
      return <ReadinessPanel />
    case 'documents':
      return <DocumentsPanel />
    case 'market':
      return <MarketPanel />
    case 'qc':
      return <QCPanel />
    case 'logistics':
      return <LogisticsPanel />
    case 'track':
      return <TrackRecordPanel />
    default:
      return <OverviewPanel />
  }
}

/**
 * A 1600x980 replica of the dashboard shell, laid out for the fixed showcase
 * canvas instead of the responsive app. Presented inside a browser chrome so
 * the footage reads as a real product rather than a slide.
 */
export const StageFrame = forwardRef<
  HTMLDivElement,
  { panel: string }
>(function StageFrame({ panel }, contentRef) {
  const nav = NAV.find((n) => n.key === panel) ?? NAV[0]

  return (
    <div className="h-[980px] w-[1600px] overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_50px_120px_-20px_rgba(2,10,40,0.45)]">
      {/* browser chrome */}
      <div className="flex h-12 items-center gap-4 border-b border-border bg-muted/60 px-5">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-1.5 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            atomic-export-five.vercel.app/dashboard
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* app */}
      <div className="flex h-[932px]">
        {/* sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
          <div className="flex h-16 items-center border-b border-border px-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-brand-diagonal shadow-accent">
                <Atom className="h-5 w-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Atomic<span className="gradient-text">Export</span>
              </span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {NAV.map((n) => {
              const active = n.key === panel
              return (
                <div
                  key={n.key}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-500',
                    active
                      ? 'gradient-brand text-white shadow-accent'
                      : 'text-muted-foreground',
                  )}
                >
                  <n.icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="flex-1 text-left">{n.label}</span>
                  {n.stage && (
                    <span
                      className={cn(
                        'font-mono text-[9px] uppercase tracking-wider',
                        active ? 'text-white/70' : 'text-muted-foreground/60',
                      )}
                    >
                      {n.stage}
                    </span>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6">
            <div className="flex items-center gap-3">
              <nav.icon className="h-5 w-5 text-primary" />
              <div>
                <h1 className="text-sm font-semibold leading-none tracking-tight">
                  {nav.label}
                </h1>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {nav.stage ?? 'Ringkasan'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-xs">Cari…</span>
              </div>
              <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
                <Bell className="h-[18px] w-[18px] text-muted-foreground" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-1.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-diagonal text-xs font-semibold text-white">
                  GS
                </span>
                <div>
                  <p className="text-xs font-semibold leading-none">
                    Koperasi Gula Semut Langgongsari
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Cilongok, Banyumas · NIB aktif
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* scrollable body, driven by the camera's `scroll` value */}
          <div className="relative flex-1 overflow-hidden">
            <div ref={contentRef} className="absolute inset-x-0 top-0 p-6">
              <div className="mx-auto max-w-[1180px]">
                <PanelFor panel={panel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

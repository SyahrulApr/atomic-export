'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Sparkles,
  X,
  Check,
} from 'lucide-react'
import { useTour } from './tour-context'

const TT_WIDTH = 380
const PAD = 10

function useMounted() {
  const [m, setM] = useState(false)
  useEffect(() => setM(true), [])
  return m
}

/* ----------------------------------------------------------- spotlight */
function Spotlight() {
  const { isActive, step, stepIndex, total, next, prev, stop } = useTour()
  const [rect, setRect] = useState<DOMRect | null>(null)

  // scroll target into view once per step
  useEffect(() => {
    if (!isActive || !step) return
    const el = document.querySelector(step.target)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [isActive, step, stepIndex])

  // continuously track target position (panel animates in, scroll, resize)
  useEffect(() => {
    if (!isActive || !step) {
      setRect(null)
      return
    }
    const measure = () => {
      const el = document.querySelector(step.target)
      setRect(el ? el.getBoundingClientRect() : null)
    }
    measure()
    const id = window.setInterval(measure, 120)
    window.addEventListener('resize', measure)
    return () => {
      window.clearInterval(id)
      window.removeEventListener('resize', measure)
    }
  }, [isActive, step, stepIndex])

  if (!isActive || !step) return null

  const vw = window.innerWidth
  const vh = window.innerHeight
  const isLast = stepIndex === total - 1

  // tooltip placement
  let ttTop: number
  let ttLeft: number
  const ttH = 230
  if (rect) {
    ttLeft = Math.min(Math.max(rect.left, 16), vw - TT_WIDTH - 16)
    const below = rect.bottom + 14
    if (below + ttH < vh) ttTop = below
    else ttTop = Math.max(16, rect.top - ttH - 14)
  } else {
    ttLeft = vw / 2 - TT_WIDTH / 2
    ttTop = vh / 2 - ttH / 2
  }

  return (
    <div className="fixed inset-0 z-[2000]">
      {/* click blocker (transparent; dim comes from spotlight box-shadow) */}
      <div className="absolute inset-0" />

      {/* spotlight cutout */}
      {rect && (
        <div
          className="pointer-events-none absolute rounded-2xl"
          style={{
            top: rect.top - PAD,
            left: rect.left - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
            boxShadow: '0 0 0 9999px rgba(2, 6, 23, 0.68)',
            border: '2px solid var(--brand)',
            transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      {/* tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="absolute rounded-2xl border border-border bg-card p-5 shadow-2xl"
          style={{ top: ttTop, left: ttLeft, width: TT_WIDTH }}
        >
          <div className="mb-2 flex items-center justify-between">
            {step.stage && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" />
                {step.stage}
              </span>
            )}
            <button
              onClick={stop}
              className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Tutup tur"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {step.desc}
          </p>

          {/* progress */}
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={
                  'h-1 flex-1 rounded-full transition-colors ' +
                  (i <= stepIndex ? 'bg-primary' : 'bg-muted')
                }
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground">
              Langkah {stepIndex + 1} / {total}
            </span>
            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <button
                  onClick={prev}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Kembali
                </button>
              )}
              <button
                onClick={next}
                className="flex items-center gap-1.5 rounded-lg gradient-brand px-4 py-1.5 text-sm font-semibold text-white shadow-accent transition hover:opacity-90"
              >
                {isLast ? (
                  <>
                    Selesai
                    <Check className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Lanjut
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------- welcome modal */
function Welcome() {
  const { start, isActive } = useTour()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('ae_tour_seen')
    if (!seen) setOpen(true)
  }, [])

  function dismiss() {
    sessionStorage.setItem('ae_tour_seen', '1')
    setOpen(false)
  }

  if (!open || isActive) return null

  return (
    <div className="fixed inset-0 z-[1900] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="relative overflow-hidden gradient-brand-diagonal p-6 text-white">
          <div className="absolute inset-0 dot-pattern opacity-100" />
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Play className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">
              Lihat demo Atomic Export
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Tur terpandu otomatis menelusuri seluruh alur, dari Atomic Steps
              hingga bankability, lengkap dengan demo AI Copilot.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4">
          <button
            onClick={dismiss}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Nanti saja
          </button>
          <button
            onClick={() => {
              dismiss()
              start()
            }}
            className="flex items-center gap-2 rounded-lg gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-accent transition hover:opacity-90"
          >
            <Play className="h-4 w-4" />
            Mulai Tur
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ----------------------------------------------------- floating button */
function Fab() {
  const { isActive, start } = useTour()
  if (isActive) return null
  return (
    <button
      onClick={start}
      className="fixed bottom-6 right-6 z-[1800] flex items-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-accent-lg transition hover:scale-105 hover:opacity-95"
    >
      <Play className="h-4 w-4" />
      Mulai Demo Pemandu
    </button>
  )
}

/* ------------------------------------------------------------- exported */
export function TourLayer() {
  const mounted = useMounted()
  const portalRef = useRef<Element | null>(null)
  if (mounted && !portalRef.current) portalRef.current = document.body
  if (!mounted || !portalRef.current) return null

  return createPortal(
    <>
      <Welcome />
      <Fab />
      <Spotlight />
    </>,
    portalRef.current,
  )
}

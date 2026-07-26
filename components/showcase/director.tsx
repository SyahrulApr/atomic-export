'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { SCENES, TOTAL_DURATION, sceneAt, type Scene } from './scenes'
import { StageFrame } from './stage'
import { CaptionLayer } from './caption'
import {
  IntroScene,
  PipelineScene,
  ValueScene,
  StatusScene,
  OutroScene,
} from './custom-scenes'

const FRAME_W = 1920
const FRAME_H = 1080

function CustomScene({ kind }: { kind: Scene['kind'] }) {
  switch (kind) {
    case 'intro':
      return <IntroScene />
    case 'pipeline':
      return <PipelineScene />
    case 'value':
      return <ValueScene />
    case 'status':
      return <StatusScene />
    case 'outro':
      return <OutroScene />
    default:
      return null
  }
}

export function Director({
  recording,
  autoplay,
}: {
  recording: boolean
  autoplay: boolean
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const lastSceneId = useRef<string>('')

  const [scene, setScene] = useState<Scene>(SCENES[0])
  const [playing, setPlaying] = useState(false)
  const [fit, setFit] = useState(1)

  // transport readout is written straight to the DOM; putting the playhead in
  // React state would re-render the whole stage every frame
  const timeLabelRef = useRef<HTMLSpanElement>(null)
  const seekRef = useRef<HTMLInputElement>(null)
  const scrubbing = useRef(false)

  /* ------------------------------------------------ scale canvas to window */
  useEffect(() => {
    const resize = () =>
      setFit(
        Math.min(
          window.innerWidth / FRAME_W,
          window.innerHeight / FRAME_H,
          1,
        ),
      )
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  /* ----------------------------------------------------- build the timeline */
  useEffect(() => {
    // Camera state is tweened as a plain object and written to the DOM in
    // onUpdate. Keeps the stage transform and the inner scroll in lockstep,
    // and stays correct when the timeline is scrubbed backwards.
    const cam = { scale: 1, rotateX: 0, rotateY: 0, x: 0, y: 0, scroll: 0 }

    const apply = () => {
      if (stageRef.current) {
        stageRef.current.style.transform =
          `translate3d(${cam.x}px, ${cam.y}px, 0) ` +
          `rotateX(${cam.rotateX}deg) rotateY(${cam.rotateY}deg) ` +
          `scale(${cam.scale})`
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${cam.scroll}px)`
      }
    }

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => setPlaying(false),
    })

    for (const s of SCENES) {
      tl.fromTo(
        cam,
        { ...s.from },
        {
          ...s.to,
          duration: s.dur,
          ease: s.ease ?? 'power2.inOut',
          immediateRender: false,
        },
        s.start,
      )
    }

    // hold the final frame so the timeline length is exact
    tl.to({}, { duration: 0.01 }, TOTAL_DURATION)

    timelineRef.current = tl
    tl.seek(0)

    // Drive everything from our own rAF loop rather than GSAP callbacks:
    // `seek()` suppresses callbacks by default, so an onUpdate-based approach
    // silently stops updating whenever the timeline is scrubbed.
    let raf = 0
    const loop = () => {
      apply()

      const t = tl.time()
      const s = sceneAt(t)
      if (s.id !== lastSceneId.current) {
        lastSceneId.current = s.id
        setScene(s)
      }

      if (timeLabelRef.current) {
        timeLabelRef.current.textContent = `${t.toFixed(1)}s / ${TOTAL_DURATION}s`
      }
      if (seekRef.current && !scrubbing.current) {
        seekRef.current.value = String(t)
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // exposed so the timeline can be scrubbed deterministically from an
    // automation script when capturing frames
    ;(window as unknown as { __showcase?: gsap.core.Timeline }).__showcase = tl

    return () => {
      cancelAnimationFrame(raf)
      tl.kill()
      timelineRef.current = null
      delete (window as unknown as { __showcase?: gsap.core.Timeline })
        .__showcase
    }
  }, [])

  /* --------------------------------------------------------------- controls */
  const play = useCallback(() => {
    const tl = timelineRef.current
    if (!tl) return
    if (tl.time() >= TOTAL_DURATION) tl.seek(0)
    tl.play()
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    timelineRef.current?.pause()
    setPlaying(false)
  }, [])

  const restart = useCallback(() => {
    const tl = timelineRef.current
    if (!tl) return
    tl.seek(0)
    tl.play()
    setPlaying(true)
  }, [])

  const seek = useCallback((t: number) => {
    timelineRef.current?.seek(t)
  }, [])

  /* autoplay once mounted, after giving webfonts a beat to settle */
  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(() => restart(), 900)
    return () => window.clearTimeout(id)
  }, [autoplay, restart])

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        playing ? pause() : play()
      }
      if (e.key.toLowerCase() === 'r') restart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playing, play, pause, restart])

  const isPanel = scene.kind === 'panel'

  return (
    <div className="fixed inset-0 grid place-items-center overflow-hidden bg-[#05070f]">
      {/* fixed 1920x1080 canvas, scaled to fit the window */}
      <div
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: `scale(${fit})`,
          transformOrigin: 'center center',
        }}
        className="relative shrink-0 overflow-hidden bg-background"
      >
        {/* backdrop */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 dot-pattern-dark" />
        <div className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/10 blur-[170px]" />
        <div className="absolute -right-40 bottom-[-15%] h-[42rem] w-[42rem] rounded-full bg-primary/[0.07] blur-[170px]" />

        {/* 3D camera */}
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ perspective: '2200px' }}
        >
          <div
            ref={stageRef}
            className="relative grid h-full w-full place-items-center will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {isPanel ? (
              <StageFrame ref={contentRef} panel={scene.panel ?? 'overview'} />
            ) : (
              <div className="absolute inset-0">
                <CustomScene kind={scene.kind} />
              </div>
            )}
          </div>
        </div>

        {/* kinetic captions */}
        <CaptionLayer caption={scene.caption} sceneId={scene.id} />
      </div>

      {/* review controls, hidden while recording */}
      {!recording && (
        <div className="pointer-events-auto fixed bottom-5 left-1/2 z-50 flex w-[46rem] -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
          <button
            onClick={playing ? pause : play}
            className="w-16 shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={restart}
            className="shrink-0 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20"
          >
            Restart
          </button>
          <input
            ref={seekRef}
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.05}
            defaultValue={0}
            onPointerDown={() => (scrubbing.current = true)}
            onPointerUp={() => (scrubbing.current = false)}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-[#0052ff]"
          />
          <span
            ref={timeLabelRef}
            className="w-24 shrink-0 text-right font-mono text-xs text-white/70"
          >
            0.0s / {TOTAL_DURATION}s
          </span>
          <span className="w-28 shrink-0 truncate font-mono text-xs text-white/40">
            {scene.id}
          </span>
        </div>
      )}
    </div>
  )
}

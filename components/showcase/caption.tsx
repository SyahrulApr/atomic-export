'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Caption } from './scenes'

const easeOut = [0.16, 1, 0.3, 1] as const

const OFFSET: Record<Caption['from'], { x: number; y: number }> = {
  left: { x: -70, y: 0 },
  right: { x: 70, y: 0 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
}

const POS: Record<Caption['pos'], string> = {
  left: 'items-center justify-start pl-24',
  right: 'items-center justify-end pr-24',
  bottom: 'items-end justify-center pb-28',
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-20',
}

/** Splits the title into words so they can be revealed in sequence. */
function Words({
  text,
  highlight,
  delay,
}: {
  text: string
  highlight?: string
  delay: number
}) {
  const plain = text.split(' ').filter(Boolean)
  const accent = (highlight ?? '').split(' ').filter(Boolean)
  const all = [
    ...plain.map((w) => ({ w, accent: false })),
    ...accent.map((w) => ({ w, accent: true })),
  ]
  return (
    <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1">
      {all.map((item, i) => (
        <motion.span
          key={`${item.w}-${i}`}
          className={cn('inline-block', item.accent && 'gradient-text')}
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            ease: easeOut,
            delay: delay + i * 0.055,
          }}
        >
          {item.w}
        </motion.span>
      ))}
    </span>
  )
}

/** Darkens the stage behind the text so captions stay readable over the UI
 *  without needing a solid card, which would read as a slide rather than film. */
const SCRIM: Record<Caption['pos'], string> = {
  left: 'inset-y-0 left-0 w-[58%] bg-gradient-to-r from-background via-background/92 to-transparent',
  right:
    'inset-y-0 right-0 w-[58%] bg-gradient-to-l from-background via-background/92 to-transparent',
  bottom:
    'inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-background via-background/92 to-transparent',
  top: 'inset-x-0 top-0 h-[40%] bg-gradient-to-b from-background via-background/92 to-transparent',
  center: 'inset-0 bg-background/75',
}

export function CaptionLayer({
  caption,
  sceneId,
}: {
  caption?: Caption
  sceneId: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <AnimatePresence mode="wait">
        {caption && (
          <motion.div
            key={`scrim-${sceneId}`}
            className={cn('absolute', SCRIM[caption.pos])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.55, ease: easeOut }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {caption && (
          <motion.div
            key={sceneId}
            className={cn('absolute inset-0 flex', POS[caption.pos])}
            initial={{ opacity: 0, ...OFFSET[caption.from] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, y: -18, transition: { duration: 0.28 } }}
            transition={{
              duration: 0.6,
              ease: easeOut,
              delay: caption.delay ?? 0,
            }}
          >
            <div
              className={cn(
                'max-w-[38rem]',
                caption.pos === 'center' && 'max-w-[52rem] text-center',
                caption.pos === 'bottom' && 'max-w-[46rem] text-center',
                caption.pos === 'top' && 'max-w-[74rem] text-center',
              )}
            >
              {caption.kicker && (
                <motion.p
                  className="mb-3 font-mono text-[13px] uppercase tracking-[0.22em] text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (caption.delay ?? 0) + 0.1 }}
                >
                  {caption.kicker}
                </motion.p>
              )}

              <h2
                className={cn(
                  'font-display leading-[1.08] tracking-tight text-foreground',
                  caption.pos === 'center'
                    ? 'text-[3.4rem]'
                    : caption.pos === 'top'
                      ? 'text-[2.7rem]'
                      : 'text-[2.6rem]',
                )}
                style={{ textShadow: '0 2px 30px rgba(255,255,255,0.55)' }}
              >
                <Words
                  text={caption.title}
                  highlight={caption.highlight}
                  delay={(caption.delay ?? 0) + 0.16}
                />
              </h2>

              {caption.sub && (
                <motion.p
                  className="mt-4 text-[1.15rem] leading-relaxed text-muted-foreground"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: easeOut,
                    delay: (caption.delay ?? 0) + 0.42,
                  }}
                >
                  {caption.sub}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

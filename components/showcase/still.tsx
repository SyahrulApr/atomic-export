'use client'

import { StageFrame } from './stage'

/**
 * Renders one dashboard panel inside the browser chrome with no camera
 * transform and no caption, filling the 1920x1080 canvas.
 *
 * This is the asset source for the Remotion composition: capture it at
 * deviceScaleFactor 2 and the resulting stills stay sharp even when the
 * camera pushes past 1.3x.
 */
export function Still({ panel }: { panel: string }) {
  return (
    <div className="fixed inset-0 grid place-items-center overflow-hidden bg-[#05070f]">
      <div
        style={{ width: 1920, height: 1080 }}
        className="relative grid shrink-0 place-items-center overflow-hidden bg-background"
      >
        <div className="absolute inset-0 dot-pattern-dark" />
        <div className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/10 blur-[170px]" />
        <div className="absolute -right-40 bottom-[-15%] h-[42rem] w-[42rem] rounded-full bg-primary/[0.07] blur-[170px]" />
        <StageFrame panel={panel} />
      </div>
    </div>
  )
}

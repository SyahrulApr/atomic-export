import { Director } from '@/components/showcase/director'
import { Still } from '@/components/showcase/still'

export const metadata = {
  title: 'Atomic Export · Showcase',
}

/**
 * Cinematic showcase route used to record the two-minute demo segment.
 *
 *   /showcase              review mode, transport controls visible
 *   /showcase?rec=1        clean frame for screen recording
 *   /showcase?autoplay=0   stay on the first frame until played manually
 *   /showcase?still=track  one static panel, used to export Remotion assets
 */
export default async function ShowcasePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const recording = sp.rec === '1'
  const autoplay = sp.autoplay !== '0'
  const still = typeof sp.still === 'string' ? sp.still : null

  return (
    <>
      <style>{`
        html, body { overflow: hidden; background: #05070f; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
      `}</style>
      {still ? (
        <Still panel={still} />
      ) : (
        <Director recording={recording} autoplay={autoplay} />
      )}
    </>
  )
}

import { Director } from '@/components/showcase/director'

export const metadata = {
  title: 'Atomic Export · Showcase',
}

/**
 * Cinematic showcase route used to record the two-minute demo segment.
 *
 *   /showcase           review mode, transport controls visible
 *   /showcase?rec=1     clean frame for screen recording
 *   /showcase?autoplay=0  stay on the first frame until played manually
 */
export default async function ShowcasePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const recording = sp.rec === '1'
  const autoplay = sp.autoplay !== '0'

  return (
    <>
      <style>{`
        html, body { overflow: hidden; background: #05070f; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        * { scrollbar-width: none; }
      `}</style>
      <Director recording={recording} autoplay={autoplay} />
    </>
  )
}

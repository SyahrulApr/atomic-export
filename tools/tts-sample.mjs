/**
 * Generates short samples of the same line across several Indonesian voices so
 * one can be picked before spending characters on the whole script.
 *
 *   node tools/tts-sample.mjs [segmentFile] [outDir]
 *
 * Needs ELEVENLABS_API_KEY. Read it from .env.local rather than passing it on
 * the command line, so it does not end up in shell history.
 */
import fs from 'node:fs'
import path from 'node:path'

const SEG = path.resolve(process.argv[2] ?? 'vo-text/demo/03-readiness-8s.txt')
const OUT = path.resolve(process.argv[3] ?? 'vo-out/samples')

// read the key out of .env.local
const envFile = path.resolve('.env.local')
if (!process.env.ELEVENLABS_API_KEY && fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^ELEVENLABS_API_KEY=(.+)$/)
    if (m) process.env.ELEVENLABS_API_KEY = m[1].trim()
  }
}
const KEY = process.env.ELEVENLABS_API_KEY
if (!KEY) throw new Error('ELEVENLABS_API_KEY not set')

/** Native Indonesian voices from the shared library, shortlisted for a
 *  business product narration rather than a casual or character read. */
export const CANDIDATES = [
  { id: 'SEe2cBFwK0vc2vwHoPfh', name: 'ryo-business' },
  { id: 'j7n5yC6BN3oA2ZIWImty', name: 'bambang-grounded' },
  { id: '0HgW3YEiPlysXzVQ9jON', name: 'eric-dipoetra' },
  { id: 'wvv6DzcHyOVTDgDY7SMW', name: 'andi-clear' },
  { id: '9zOaLLJKBwYOwr8bOPDj', name: 'steven' },
  { id: 'KKXAp01L2aZHbsBTR7QG', name: 'sabiq-podcast' },
]

const MODEL = process.env.TTS_MODEL ?? 'eleven_multilingual_v2'

export async function speak({ text, voiceId, model = MODEL }) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          // low-ish style and high similarity keeps a narration read steady
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    },
  )
  if (!res.ok) {
    throw new Error(`${res.status} ${await res.text()}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const text = fs.readFileSync(SEG, 'utf8').trim()
  fs.mkdirSync(OUT, { recursive: true })
  console.log(`sample text (${text.length} chars): ${text.slice(0, 70)}...`)
  console.log(`model: ${MODEL}\n`)

  for (const v of CANDIDATES) {
    const file = path.join(OUT, `${v.name}.mp3`)
    try {
      fs.writeFileSync(file, await speak({ text, voiceId: v.id }))
      console.log(`  ok    ${v.name.padEnd(18)} -> ${path.relative(process.cwd(), file)}`)
    } catch (e) {
      console.log(`  FAIL  ${v.name.padEnd(18)} ${String(e.message).slice(0, 120)}`)
    }
  }
}

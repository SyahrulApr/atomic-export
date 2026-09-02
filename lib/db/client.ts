import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

try {
  process.loadEnvFile('.env.local')
} catch {}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'DATABASE_URL belum diset. Isi di .env.local dengan connection string Postgres (harus punya extension pgvector aktif).',
  )
}

const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })

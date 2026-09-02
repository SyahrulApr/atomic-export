import postgres from 'postgres'

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL belum diset di .env.local')
  }

  const sql = postgres(connectionString, { prepare: false })

  console.log('Mengaktifkan extension pgvector...')
  await sql`CREATE EXTENSION IF NOT EXISTS vector;`
  console.log('pgvector aktif. Sekarang jalankan: pnpm db:push')

  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

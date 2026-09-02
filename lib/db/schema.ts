import {
  pgTable,
  text,
  timestamp,
  uuid,
  vector,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'

export const ragDocuments = pgTable('rag_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: text('category').notNull(), // folder korpus, mis. "hs-code-gula-kelapa"
  sourcePath: text('source_path').notNull().unique(), // path relatif dari corpus/regulasi
  title: text('title').notNull(),
  sourceUrl: text('source_url'),
  status: text('status').notNull().default('valid'), // valid | suspect (dari index.md)
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const ragChunks = pgTable('rag_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  documentId: uuid('document_id')
    .notNull()
    .references(() => ragDocuments.id, { onDelete: 'cascade' }),
  chunkIndex: integer('chunk_index').notNull(),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }),
  metadata: jsonb('metadata').$type<{
    headingPath?: string[]
    charStart?: number
    charEnd?: number
  }>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const copilotQueries = pgTable('copilot_queries', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  sourceChunkIds: jsonb('source_chunk_ids').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

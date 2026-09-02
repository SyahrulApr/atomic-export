import {
  pgTable,
  text,
  timestamp,
  uuid,
  vector,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'

export const exportProfile = pgTable('export_profile', {
  id: text('id').primaryKey().default('default'),
  exporterName: text('exporter_name').notNull().default(''),
  exporterAddress: text('exporter_address').notNull().default(''),
  exporterNib: text('exporter_nib').notNull().default(''),
  buyerName: text('buyer_name').notNull().default(''),
  buyerAddress: text('buyer_address').notNull().default(''),
  buyerCountry: text('buyer_country').notNull().default(''),
  productName: text('product_name').notNull().default(''),
  hsCode: text('hs_code').notNull().default(''),
  quantity: text('quantity').notNull().default(''),
  unit: text('unit').notNull().default(''),
  unitPrice: text('unit_price').notNull().default(''),
  currency: text('currency').notNull().default(''),
  incoterm: text('incoterm').notNull().default(''),
  portOfLoading: text('port_of_loading').notNull().default(''),
  portOfDestination: text('port_of_destination').notNull().default(''),
  vesselOrFlight: text('vessel_or_flight').notNull().default(''),
  invoiceNumber: text('invoice_number').notNull().default(''),
  invoiceDate: text('invoice_date').notNull().default(''),
  netWeightKg: text('net_weight_kg').notNull().default(''),
  grossWeightKg: text('gross_weight_kg').notNull().default(''),
  packageCount: text('package_count').notNull().default(''),
  packageType: text('package_type').notNull().default(''),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const exportEvents = pgTable('export_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: text('date').notNull(),
  buyerName: text('buyer_name').notNull(),
  valueJutaIdr: integer('value_juta_idr').notNull(),
  pebNumber: text('peb_number').notNull(),
  status: text('status').notNull().default('Selesai'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

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

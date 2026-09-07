import { sql } from 'drizzle-orm'
import {
  check,
  index,
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'

export const resumeTable = pgTable(
  'resumes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    originalFileName: varchar('original_file_name', { length: 255 }).notNull(),
    storageKey: varchar('storage_key', { length: 1024 }).notNull().unique(),
    sizeBytes: integer('size_bytes').notNull(),
    mimeType: varchar('mime_type', { length: 100 }).default('application/pdf').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    archivedAt: timestamp('archived_at', { withTimezone: true, mode: 'string' }),
  },
  (table) => [
    unique('resumes_id_user_id_unique').on(table.id, table.userId),
    index('resumes_user_id_index').on(table.userId),
    check('resumes_size_positive', sql`${table.sizeBytes} > 0`),
    check('resumes_pdf_only', sql`${table.mimeType} = 'application/pdf'`),
  ],
)

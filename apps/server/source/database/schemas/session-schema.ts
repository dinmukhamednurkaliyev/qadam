import { index, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'

export const sessionTable = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    tokenHash: varchar('token_hash', { length: 255 }).notNull(),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('sessions_token_hash_unique').on(table.tokenHash),
    index('sessions_user_id_index').on(table.userId),
    index('sessions_expires_at_index').on(table.expiresAt),
  ],
)

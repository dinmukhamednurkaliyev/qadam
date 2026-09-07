import { index, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { vacancyTable } from './vacancy-schema'
import { usersTable } from './user-schema'

export const bookmarkTable = pgTable(
  'bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    vacancyId: uuid('vacancy_id')
      .notNull()
      .references(() => vacancyTable.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique().on(table.userId, table.vacancyId),
    index('bookmarks_vacancy_id_index').on(table.vacancyId),
  ],
)

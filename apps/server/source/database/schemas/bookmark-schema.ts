import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { vacancyTable } from './vacancy-schema'
import { usersTable } from './user-schema'

export const bookmarkTable = pgTable(
  'bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),

    vacancyId: uuid('vacancy_id')
      .notNull()
      .references(() => vacancyTable.id),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique().on(table.userId, table.vacancyId)],
)

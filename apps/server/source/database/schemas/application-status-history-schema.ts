import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { applicationStatusEnum, applicationTable } from './application-schema'
import { usersTable } from './user-schema'

export const applicationStatusHistoryTable = pgTable(
  'application_status_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    applicationId: uuid('application_id')
      .notNull()
      .references(() => applicationTable.id, { onDelete: 'cascade' }),

    fromStatus: applicationStatusEnum('from_status'),

    toStatus: applicationStatusEnum('to_status').notNull(),

    changedByUserId: uuid('changed_by_user_id').references(() => usersTable.id, {
      onDelete: 'set null',
    }),

    note: text('note'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('application_status_history_application_id_created_at_index').on(
      table.applicationId,
      table.createdAt,
    ),
  ],
)

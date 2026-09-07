import {
  foreignKey,
  pgEnum,
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'

import { vacancyTable } from './vacancy-schema'
import { usersTable } from './user-schema'
import { resumeTable } from './resume-schema'

export const applicationStatusEnum = pgEnum('application_status', [
  'submitted',
  'reviewing',
  'interview',
  'offered',
  'hired',
  'rejected',
  'withdrawn',
])

export const applicationTable = pgTable(
  'applications',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    vacancyId: uuid('vacancy_id')
      .notNull()
      .references(() => vacancyTable.id),

    resumeId: uuid('resume_id').notNull(),

    status: applicationStatusEnum('status').default('submitted').notNull(),

    coverLetter: text('cover_letter'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),

    withdrawnAt: timestamp('withdrawn_at', {
      withTimezone: true,
      mode: 'string',
    }),
  },
  (table) => [
    foreignKey({
      name: 'applications_resume_owner_fk',
      columns: [table.resumeId, table.userId],
      foreignColumns: [resumeTable.id, resumeTable.userId],
    }),
    index('applications_resume_id_index').on(table.resumeId),
    unique().on(table.userId, table.vacancyId),
    index('applications_user_id_status_index').on(table.userId, table.status),
    index('applications_vacancy_id_status_index').on(table.vacancyId, table.status),
  ],
)

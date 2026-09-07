import { foreignKey, index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'
import { resumeTable } from './resume-schema'

export const candidateProfileTable = pgTable(
  'candidate_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    userId: uuid('user_id')
      .notNull()
      .unique()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    firstName: varchar('first_name', { length: 100 }).notNull(),

    lastName: varchar('last_name', { length: 100 }).notNull(),

    headline: varchar('headline', { length: 255 }),

    bio: text('bio'),

    phone: varchar('phone', { length: 50 }),

    defaultResumeId: uuid('default_resume_id'),

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
  },
  (table) => [
    foreignKey({
      name: 'candidate_profiles_default_resume_owner_fk',
      columns: [table.defaultResumeId, table.userId],
      foreignColumns: [resumeTable.id, resumeTable.userId],
    }),
    index('candidate_profiles_default_resume_id_index').on(table.defaultResumeId),
  ],
)

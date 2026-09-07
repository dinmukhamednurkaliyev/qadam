import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'

export const candidateProfileTable = pgTable('candidate_profiles', {
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

  resumeUrl: varchar('resume_url', { length: 2048 }),

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
})

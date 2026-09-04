import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'

export const candidateProfileTable = pgTable('candidate_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => usersTable.id),

  firstName: varchar('first_name', { length: 100 }).notNull(),

  lastName: varchar('last_name', { length: 100 }).notNull(),

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

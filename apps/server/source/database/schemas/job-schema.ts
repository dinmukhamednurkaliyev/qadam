import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { organizationTable } from './organization-schema'
import { locationsTable } from './location-schema'

export const jobsTable = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),

  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizationTable.id),

  locationId: uuid('location_id').references(() => locationsTable.id),

  title: varchar('title', { length: 255 }).notNull(),

  description: text('description').notNull(),

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

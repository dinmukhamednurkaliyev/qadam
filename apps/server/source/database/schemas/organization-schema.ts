import {
  pgEnum,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { usersTable } from './user-schema'

export const organizationStatusEnum = pgEnum('organization_status', [
  'draft',
  'pending',
  'verified',
  'rejected',
  'suspended',
])

export const organizationTable = pgTable(
  'organizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    createdByUserId: uuid('created_by_user_id')
      .notNull()
      .references(() => usersTable.id),

    name: varchar('name', { length: 255 }).notNull(),

    slug: varchar('slug', { length: 100 }).notNull(),

    legalName: varchar('legal_name', { length: 255 }).notNull(),

    registrationCountryCode: varchar('registration_country_code', { length: 2 }).notNull(),

    registrationNumber: varchar('registration_number', { length: 100 }).notNull(),

    contactEmail: varchar('contact_email', { length: 255 }).notNull(),

    website: varchar('website', { length: 2048 }),

    description: text('description').notNull(),

    status: organizationStatusEnum('status').default('draft').notNull(),

    verifiedAt: timestamp('verified_at', {
      withTimezone: true,
      mode: 'string',
    }),

    verifiedByUserId: uuid('verified_by_user_id').references(() => usersTable.id, {
      onDelete: 'set null',
    }),

    rejectionReason: text('rejection_reason'),

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
    uniqueIndex('organizations_slug_unique').on(table.slug),
    uniqueIndex('organizations_registration_unique').on(
      table.registrationCountryCode,
      table.registrationNumber,
    ),
    index('organizations_created_by_user_id_index').on(table.createdByUserId),
    index('organizations_status_index').on(table.status),
  ],
)

import { sql } from 'drizzle-orm'
import {
  pgEnum,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

import { organizationTable } from './organization-schema'
import { locationTable } from './location-schema'
import { usersTable } from './user-schema'

export const vacancyStatusEnum = pgEnum('vacancy_status', [
  'draft',
  'published',
  'closed',
  'archived',
])

export const employmentTypeEnum = pgEnum('employment_type', [
  'full_time',
  'part_time',
  'contract',
  'internship',
  'temporary',
])

export const workplaceTypeEnum = pgEnum('workplace_type', ['onsite', 'hybrid', 'remote'])

export const vacancyTable = pgTable(
  'vacancies',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id),

    createdByUserId: uuid('created_by_user_id')
      .notNull()
      .references(() => usersTable.id),

    locationId: uuid('location_id').references(() => locationTable.id, {
      onDelete: 'set null',
    }),

    title: varchar('title', { length: 255 }).notNull(),

    description: text('description').notNull(),

    status: vacancyStatusEnum('status').default('draft').notNull(),

    employmentType: employmentTypeEnum('employment_type'),

    workplaceType: workplaceTypeEnum('workplace_type'),

    salaryFrom: integer('salary_from'),

    salaryTo: integer('salary_to'),

    salaryCurrency: varchar('salary_currency', { length: 3 }),

    publishedAt: timestamp('published_at', {
      withTimezone: true,
      mode: 'string',
    }),

    closedAt: timestamp('closed_at', {
      withTimezone: true,
      mode: 'string',
    }),

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
    index('vacancies_organization_id_index').on(table.organizationId),
    index('vacancies_location_id_index').on(table.locationId),
    index('vacancies_status_published_at_index').on(table.status, table.publishedAt),
    check(
      'vacancies_salary_from_nonnegative',
      sql`${table.salaryFrom} is null or ${table.salaryFrom} >= 0`,
    ),
    check(
      'vacancies_salary_to_nonnegative',
      sql`${table.salaryTo} is null or ${table.salaryTo} >= 0`,
    ),
    check(
      'vacancies_salary_range_valid',
      sql`${table.salaryFrom} is null or ${table.salaryTo} is null or ${table.salaryFrom} <= ${table.salaryTo}`,
    ),
    check(
      'vacancies_salary_currency_required',
      sql`(${table.salaryFrom} is null and ${table.salaryTo} is null) or ${table.salaryCurrency} is not null`,
    ),
  ],
)

import { pgEnum, index, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core'

import { organizationTable } from './organization-schema'
import { usersTable } from './user-schema'

export const organizationRoleEnum = pgEnum('organization_role', ['owner', 'recruiter'])

export const organizationMemberTable = pgTable(
  'organization_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'cascade' }),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),

    role: organizationRoleEnum('role').notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique().on(table.organizationId, table.userId),
    index('organization_members_user_id_index').on(table.userId),
  ],
)

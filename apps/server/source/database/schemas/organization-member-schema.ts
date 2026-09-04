import { pgTable, unique, uuid } from 'drizzle-orm/pg-core'

import { organizationTable } from './organization-schema'
import { usersTable } from './user-schema'

export const organizationMemberTable = pgTable(
  'organization_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [unique().on(table.organizationId, table.userId)],
)

import { pgTable, unique, uuid } from 'drizzle-orm/pg-core'

import { companiesTable } from './company-schema'
import { usersTable } from './user-schema'

export const companyMembersTable = pgTable(
  'company_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    companyId: uuid('company_id')
      .notNull()
      .references(() => companiesTable.id),

    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [unique().on(table.companyId, table.userId)],
)

import { pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core'

export const regionsTable = pgTable(
  'regions',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    countryCode: varchar('country_code', { length: 2 }).notNull(),

    name: varchar('name', { length: 255 }).notNull(),

    code: varchar('code', { length: 50 }).notNull(),
  },
  (table) => [unique().on(table.countryCode, table.code)],
)

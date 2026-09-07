import { index, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core'

import { regionsTable } from './region-schema'

export const locationTable = pgTable(
  'locations',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    regionId: uuid('region_id')
      .notNull()
      .references(() => regionsTable.id),

    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => [
    unique().on(table.regionId, table.name),
    index('locations_region_id_index').on(table.regionId),
  ],
)

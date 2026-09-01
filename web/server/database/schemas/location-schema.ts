import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { regionsTable } from "./region-schema";

export const locationsTable = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  regionId: uuid("region_id")
    .notNull()
    .references(() => regionsTable.id),
  city: varchar("city", { length: 255 }).notNull(),
});

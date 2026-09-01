import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { companiesTable } from "./company-schema";
import { locationsTable } from "./location-schema";

export const jobsTable = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),

  companyId: uuid("company_id")
    .notNull()
    .references(() => companiesTable.id),

  locationId: uuid("location_id").references(() => locationsTable.id),

  title: varchar("title", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

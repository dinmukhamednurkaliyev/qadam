import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const companiesTable = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }).notNull(),

  website: varchar("website", { length: 2048 }),

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

import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const regionsTable = pgTable("regions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
});

import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { usersTable } from "./user-schema";

export const candidateProfilesTable = pgTable("candidate_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => usersTable.id),

  firstName: varchar("first_name", { length: 100 }).notNull(),

  lastName: varchar("last_name", { length: 100 }).notNull(),
});

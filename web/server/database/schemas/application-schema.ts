import { pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { jobsTable } from "./job-schema";
import { usersTable } from "./user-schema";

export const applicationsTable = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),

    jobId: uuid("job_id")
      .notNull()
      .references(() => jobsTable.id),

    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueUserJob: unique().on(table.userId, table.jobId),
  }),
);

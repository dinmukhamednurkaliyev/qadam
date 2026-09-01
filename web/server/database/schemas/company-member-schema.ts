import { pgTable, unique, uuid } from "drizzle-orm/pg-core";

import { companiesTable } from "./company-schema";
import { usersTable } from "./user-schema";

export const companyMembersTable = pgTable(
  "company_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),

    companyId: uuid("company_id")
      .notNull()
      .references(() => companiesTable.id),
  },
  (table) => ({
    uniqueUserCompany: unique().on(table.userId, table.companyId),
  }),
);

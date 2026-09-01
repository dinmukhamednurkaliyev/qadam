import { sql } from "drizzle-orm";

import { database } from "../../database/database-client";

export default defineEventHandler(async () => {
  const result = await database.execute(sql`SELECT 1`);

  return {
    ok: true,
    result,
  };
});

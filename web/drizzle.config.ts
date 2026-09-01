import "dotenv/config";

import process from "node:process";

import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schemas/*.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    url: databaseUrl,
  },
});

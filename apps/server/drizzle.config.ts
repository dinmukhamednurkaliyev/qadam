import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  // Database scripts run from the server workspace, so these paths are relative to apps/server.
  schema: './source/database/schemas/*.ts',
  out: './source/database/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

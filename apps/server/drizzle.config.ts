import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',

  schema: './source/database/schemas/*.ts',

  out: './source/database/migrations',

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})

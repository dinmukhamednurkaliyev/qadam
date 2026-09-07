import { sql } from 'drizzle-orm'
import { pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

export const platformRoleEnum = pgEnum('platform_role', ['user', 'admin'])

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    email: varchar('email', { length: 255 }).notNull(),

    passwordHash: varchar('password_hash', { length: 255 }).notNull(),

    platformRole: platformRoleEnum('platform_role').default('user').notNull(),

    emailVerifiedAt: timestamp('email_verified_at', {
      withTimezone: true,
      mode: 'string',
    }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex('users_email_normalized_unique').on(sql`lower(${table.email})`)],
)

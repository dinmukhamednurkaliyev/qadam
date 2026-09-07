import { index, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'

import { organizationRoleEnum } from './organization-member-schema'
import { organizationTable } from './organization-schema'
import { usersTable } from './user-schema'

export const organizationInvitationTable = pgTable(
  'organization_invitations',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizationTable.id, { onDelete: 'cascade' }),

    email: varchar('email', { length: 255 }).notNull(),

    role: organizationRoleEnum('role').notNull(),

    tokenHash: varchar('token_hash', { length: 255 }).notNull(),

    invitedByUserId: uuid('invited_by_user_id')
      .notNull()
      .references(() => usersTable.id),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'string',
    }).notNull(),

    acceptedAt: timestamp('accepted_at', {
      withTimezone: true,
      mode: 'string',
    }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('organization_invitations_token_hash_unique').on(table.tokenHash),
    index('organization_invitations_organization_id_index').on(table.organizationId),
    index('organization_invitations_email_index').on(table.email),
    index('organization_invitations_expires_at_index').on(table.expiresAt),
  ],
)

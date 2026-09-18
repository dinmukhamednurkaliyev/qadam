import { z } from 'zod'

export const authenticatedUserSchema = z.object({
  id: z.uuid(),
  email: z.email().max(255),
  emailVerified: z.boolean(),
})

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>

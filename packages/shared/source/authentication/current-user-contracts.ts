import { z } from 'zod'

import { authenticatedUserSchema } from './authenticated-user-contracts.js'

export const currentUserResponseSchema = z.object({
  user: authenticatedUserSchema,
})

export type CurrentUserResponse = z.infer<typeof currentUserResponseSchema>

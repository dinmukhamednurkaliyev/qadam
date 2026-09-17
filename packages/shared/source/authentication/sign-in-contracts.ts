import { z } from 'zod'

import { authenticatedUserSchema } from './authenticated-user-contracts.js'

const signInEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(255, 'Email must contain no more than 255 characters')
  .pipe(z.email({ error: 'Enter a valid email address' }))

const signInPasswordSchema = z.string().refine(
  (password: string): boolean => {
    const characterCount = Array.from(password).length

    return characterCount >= 1 && characterCount <= 128
  },
  { error: 'Password must contain between 1 and 128 characters' },
)

export const signInRequestSchema = z.strictObject({
  email: signInEmailSchema,
  password: signInPasswordSchema,
})

export const signInResponseSchema = z.object({
  user: authenticatedUserSchema,
})

export type SignInRequest = z.infer<typeof signInRequestSchema>
export type SignInResponse = z.infer<typeof signInResponseSchema>

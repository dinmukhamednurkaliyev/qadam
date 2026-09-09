import { z } from 'zod'

const signUpEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(255, 'Email must contain no more than 255 characters')
  .pipe(z.email({ error: 'Enter a valid email address' }))

const signUpPasswordSchema = z.string().refine(
  (password: string): boolean => {
    const characterCount = Array.from(password).length

    return characterCount >= 15 && characterCount <= 128
  },
  { error: 'Password must contain between 15 and 128 characters' },
)

export const signUpRequestSchema = z.strictObject({
  email: signUpEmailSchema,
  password: signUpPasswordSchema,
})

export const signUpResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    email: z.email().max(255),
    emailVerified: z.boolean(),
  }),
})

export type SignUpInput = z.infer<typeof signUpRequestSchema>
export type SignUpResponse = z.infer<typeof signUpResponseSchema>

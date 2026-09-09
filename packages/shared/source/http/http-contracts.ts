import { z } from 'zod'

export const errorResponseSchema = z.object({
  code: z.enum(['VALIDATION_ERROR', 'NOT_FOUND', 'CONFLICT', 'INTERNAL_ERROR']),
  message: z.string(),
  issues: z
    .array(
      z.object({
        path: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
})

export type ErrorResponse = z.infer<typeof errorResponseSchema>

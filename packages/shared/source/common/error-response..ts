import { z } from 'zod'

export const errorResponseScheme = z.object({
  code: z.enum(['VALIDATION_ERROR', 'NOT_FOUND', 'INTERNAL_ERROR']),
  message: z.string(),
  issues: z.array(z.object({ path: z.string(), message: z.string() })).optional(),
})

export type ApiError = z.infer<typeof errorResponseScheme>

import { errorResponseSchema, vacancyFiltersSchema, vacancyParametersSchema } from '@qadam/shared'
import { Hono } from 'hono'

import { getVacancies, getVacancy } from './vacancy-service'

export const vacanciesRoute = new Hono()

vacanciesRoute.onError((error, context) => {
  console.error('Vacancies request failed:', error)
  return context.json(
    errorResponseSchema.parse({
      code: 'INTERNAL_ERROR',
      message: 'Unable to process vacancies request',
    }),
    500,
  )
})

vacanciesRoute.get('/', async (context) => {
  const parsed = vacancyFiltersSchema.safeParse(context.req.query())
  if (!parsed.success) {
    return context.json(
      errorResponseSchema.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid vacancy filters',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      }),
      400,
    )
  }

  const vacancies = await getVacancies(parsed.data)

  return context.json(vacancies)
})

vacanciesRoute.get('/:id', async (context) => {
  const parsed = vacancyParametersSchema.safeParse(context.req.param())
  if (!parsed.success) {
    return context.json(
      errorResponseSchema.parse({
        code: 'VALIDATION_ERROR',
        message: 'Invalid vacancy ID',
      }),
      400,
    )
  }

  const vacancy = await getVacancy(parsed.data.id)

  if (!vacancy) {
    return context.json(
      errorResponseSchema.parse({
        code: 'NOT_FOUND',
        message: 'Vacancy not found',
      }),
      404,
    )
  }

  return context.json(vacancy)
})

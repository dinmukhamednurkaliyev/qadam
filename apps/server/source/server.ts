import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

export interface ServerDependencies {
  readonly reportError: (error: Error) => void
}

export const createServer = ({ reportError }: ServerDependencies) => {
  const server = new Hono()

  server.onError((error, context) => {
    if (error instanceof HTTPException && error.status < 500) {
      const response = error.getResponse()

      return context.newResponse(response.body, response)
    }

    reportError(error)

    return context.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred.',
        },
      },
      500,
    )
  })

  server.notFound((context) => {
    return context.json(
      {
        error: {
          code: 'NOT_FOUND',
          message: 'The requested resource was not found.',
        },
      },
      404,
    )
  })

  server.get('/health', (context) => {
    context.header('Cache-Control', 'no-store')

    return context.json({ status: 'ok' })
  })

  return server
}

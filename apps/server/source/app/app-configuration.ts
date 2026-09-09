type Environment = 'development' | 'production' | 'test'

function readEnvironment(): Environment {
  const value = process.env.NODE_ENV ?? 'development'

  if (value !== 'development' && value !== 'production' && value !== 'test') {
    throw new Error('Application configuration: NODE_ENV must be development, production or test')
  }

  return value
}

function readDatabaseUrl(): string {
  const value = process.env.DATABASE_URL

  if (!value) {
    throw new Error('Application configuration: DATABASE_URL is required')
  }

  let url: URL

  try {
    url = new URL(value)
  } catch {
    throw new Error('Application configuration: DATABASE_URL must be a valid URL')
  }

  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname) {
    throw new Error('Application configuration: DATABASE_URL has an unsupported URL')
  }

  return url.href
}

function readWebOrigin(environment: Environment): string {
  const value =
    process.env.WEB_ORIGIN ?? (environment === 'development' ? 'http://localhost:5173' : undefined)

  if (!value) {
    throw new Error('Application configuration: WEB_ORIGIN is required')
  }

  let url: URL

  try {
    url = new URL(value)
  } catch {
    throw new Error('Application configuration: WEB_ORIGIN must be a valid URL')
  }

  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) {
    throw new Error('Application configuration: WEB_ORIGIN has an unsupported URL')
  }

  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(
      'Application configuration: WEB_ORIGIN must contain only protocol, host and port',
    )
  }

  return url.origin
}

function readPort(): number {
  const value = process.env.PORT ?? '3000'
  const port = Number(value)

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Application configuration: PORT must be an integer between 1 and 65535')
  }

  return port
}

const environment = readEnvironment()
const databaseUrl = readDatabaseUrl()
const webOrigin = readWebOrigin(environment)
const port = readPort()

export const appConfiguration = {
  environment,
  databaseUrl,
  webOrigin,
  port,
}

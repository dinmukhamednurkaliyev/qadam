import { readServerConfiguration } from '@/server-configuration'
import { createServer } from '@/server'

const configuration = readServerConfiguration(Bun.env)
const server = createServer({
  reportError: (error) => console.error(error),
})

export default {
  port: configuration.port,
  fetch: server.fetch,
}

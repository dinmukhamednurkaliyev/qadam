import { Hono } from 'hono'

const server = new Hono()

// Bun starts the HTTP server from this default export and forwards requests to Hono.
export default {
  port: 3000,
  fetch: server.fetch,
}

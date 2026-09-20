import { Hono } from 'hono'

const server = new Hono()

export default {
  port: 3000,
  fetch: server.fetch,
}

import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import type { Database } from './db.js'
import { healthPlugin } from './health/plugin.js'

export async function buildApp(db: Database) {
  const app = Fastify({ logger: true })

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Bookshelf API',
        description: 'Book lookup and management API',
        version: '1.0.0',
      },
    },
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  })

  await app.register(healthPlugin, { db })

  return app
}

import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export async function buildApp() {
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

  app.get('/health', {
    schema: {
      summary: 'Health check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
    handler: async () => ({ status: 'ok' }),
  })

  return app
}
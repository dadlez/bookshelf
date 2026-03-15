import type { FastifyPluginAsync } from 'fastify'
import type { Database } from '../db'
import { healthHandler } from './handler'

interface HealthPluginOptions {
  db: Database
}

export const healthPlugin: FastifyPluginAsync<HealthPluginOptions> = async (app, { db }) => {
  app.get('/health', {
    schema: {
      summary: 'Health check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            db: { type: 'string' },
          },
        },
      },
    },
    handler: healthHandler(db),
  })
}

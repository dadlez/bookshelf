import type { RouteHandler } from 'fastify'
import type { Database } from '../db'

export const healthHandler = (db: Database): RouteHandler  => {
  return async () => {
    try {
      await db.query('SELECT 1')
      return { status: 'ok', db: 'ok' }
    } catch (error) {
      // TODO: added logger
      console.error(error);
      return { status: 'ok', db: 'error' }
    }
  }
}

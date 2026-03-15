import type { RouteHandler } from 'fastify'
import type { Database } from '../db.js'

export const healthHandler = (db: Database): RouteHandler  => {
  return async () => {
    try {
      await db.query('SELECT 1')
      console.log('SUCCESS')
      return { status: 'ok', db: 'ok' }
    } catch {
      return { status: 'ok', db: 'error' }
    }
  }
}

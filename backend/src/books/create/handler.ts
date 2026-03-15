import type { RouteHandler } from 'fastify'
import type { Database } from '../../db'
import { type CreateBookBody } from '../schemas'
import { createBook } from './query'

export const createBookHandler = (db: Database): RouteHandler<{ Body: CreateBookBody }> => {
  return async (request, reply) => {
    try {
      const book = await createBook(db, request.body)
      return reply.code(201).send(book)
    } catch (err: unknown) {
      if (
        // TODO: add proper error classes extending Error, with codes property passed to frontend.
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: string }).code === '23505' // TODO create db handled codes reference
      ) {
        return reply.code(409).send({ error: 'ISBN already exists' })
      }
      throw err
    }
  }
}
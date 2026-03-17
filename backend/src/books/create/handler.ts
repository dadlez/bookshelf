import type { RouteHandler } from 'fastify'
import type { Database } from '../../db'
import type { AddBookBody } from '@bookshelf/shared'
import { createBook } from './query'

export const createBookHandler = (db: Database): RouteHandler<{ Body: AddBookBody }> => {
  return async (request, reply) => {
    try {
      const book = await createBook(db, request.body)
      return reply.code(201).send(book)
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: string }).code === '23505'
      ) {
        return reply.code(409).send({ error: 'ISBN already exists' })
      }
      throw err
    }
  }
}

import type { RouteHandler } from 'fastify'
import type { Database } from '../../db'
import { addBookSchema, type AddBookBody } from '@bookshelf/shared'
import { createBook } from './query'

export const createBookHandler = (db: Database): RouteHandler<{ Body: AddBookBody }> => {
  return async (request, reply) => {
    const result = addBookSchema.safeParse(request.body)
    if (!result.success) {
      return reply.code(422).send({ error: result.error.issues[0]?.message ?? 'Validation error' })
    }
    try {
      const book = await createBook(db, result.data)
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

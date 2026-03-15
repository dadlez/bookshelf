import type { FastifyPluginAsync } from 'fastify'
import type { Database } from '../db'
import {
  createBookBodySchema,
  bookResponseSchema,
  listBooksQuerySchema,
} from './schemas'
import { createBookHandler } from './create/handler'
import { getBooksHandler } from './get/handler'

interface BooksPluginOptions {
  db: Database
}

export const booksPlugin: FastifyPluginAsync<BooksPluginOptions> = async (app, { db }) => {
  app.post('/books', {
    schema: {
      summary: 'Create a book',
      body: createBookBodySchema,
      response: {
        201: bookResponseSchema,
        409: {
          type: 'object',
          properties: { error: { type: 'string' } },
        },
      },
    },
    handler: createBookHandler(db),
  })

  app.get('/books', {
    schema: {
      summary: 'List books',
      description:
        'The `cursor` is tied to the `sortBy` and `sortOrder` values active when it was issued. Changing either while paginating will produce incorrect results.',
      querystring: listBooksQuerySchema,
      response: {
        200: {
          type: 'object',
          properties: {
            data: { type: 'array', items: bookResponseSchema },
            nextCursor: { type: 'string', nullable: true },
          },
        },
      },
    },
    handler: getBooksHandler(db),
  })
}

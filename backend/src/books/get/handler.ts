import type { RouteHandler } from 'fastify'
import type { Database } from '../../db'
import type { GetBooksParams } from '@bookshelf/shared'
import { getBooks } from './query'

export const getBooksHandler = (db: Database): RouteHandler<{ Querystring: GetBooksParams }> => {
  return async (request) => {
    return getBooks(db, request.query)
  }
}

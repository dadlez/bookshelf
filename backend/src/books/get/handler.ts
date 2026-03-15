import type { RouteHandler } from 'fastify'
import type { Database } from '../../db'
import { type ListBooksQuery } from '../schemas'
import { getBooks } from './query'

export const getBooksHandler = (db: Database): RouteHandler<{ Querystring: ListBooksQuery }> => {
  return async (request) => {
    return getBooks(db, request.query)
  }
}
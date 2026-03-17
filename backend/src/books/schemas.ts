import { z } from 'zod'
import { addBookSchema, bookSchema, getBooksParamsSchema, type Book } from '@bookshelf/shared'

// Rating conversion: DB stores 0.0–1.0, API uses 1–5
export function toStoredRating(userRating: number): number {
  return (userRating - 1) / 4
}

export function toUserRating(storedRating: number): number {
  return Math.min(5, Math.max(1, Math.ceil(storedRating * 5)))
}

export interface BookRow {
  book_id: string
  title: string
  author: string
  isbn: string
  page_count: number
  rating: number
  created_at: string
}

export function toBookResponse(row: BookRow): Book {
  return {
    bookId: Number(row.book_id),
    title: row.title,
    author: row.author,
    isbn: row.isbn,
    pageCount: row.page_count,
    rating: toUserRating(row.rating),
    createdAt: row.created_at,
  }
}

const jsonSchemaOptions = { target: 'draft-7' } as const

export const createBookBodySchema = z.toJSONSchema(addBookSchema, jsonSchemaOptions)

export const bookResponseSchema = z.toJSONSchema(bookSchema, jsonSchemaOptions)

export const listBooksQuerySchema = z.toJSONSchema(getBooksParamsSchema, jsonSchemaOptions)

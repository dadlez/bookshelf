import type { Book } from '@bookshelf/shared'

// Rating conversion: DB stores 0.0–1.0, API uses 1–5
export function toStoredRating(userRating: number): number {
  return (userRating - 1) / 4
}

export function toUserRating(storedRating: number): number {
  return storedRating * 4 + 1
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

export const createBookBodySchema = {
  type: 'object',
  required: ['title', 'author', 'isbn', 'pageCount', 'rating'],
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 500 },
    author: { type: 'string', minLength: 1, maxLength: 255 },
    isbn: { type: 'string', minLength: 1 },
    pageCount: { type: 'integer', minimum: 1 },
    rating: { type: 'number', minimum: 1, maximum: 5 },
  },
  additionalProperties: false,
} as const

export const bookResponseSchema = {
  type: 'object',
  properties: {
    bookId: { type: 'string' },
    title: { type: 'string' },
    author: { type: 'string' },
    isbn: { type: 'string' },
    pageCount: { type: 'integer' },
    rating: { type: 'number' },
    createdAt: { type: 'string' },
  },
} as const

export const listBooksQuerySchema = {
  type: 'object',
  properties: {
    q: { type: 'string' },
    author: { type: 'string' },
    minRating: { type: 'number', minimum: 1, maximum: 5 },
    maxRating: { type: 'number', minimum: 1, maximum: 5 },
    minPages: { type: 'integer', minimum: 1 },
    maxPages: { type: 'integer', minimum: 1 },
    sortBy: {
      type: 'string',
      enum: ['title', 'author', 'rating', 'page_count', 'created_at'],
      default: 'created_at',
    },
    sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
    cursor: { type: 'string' },
    limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
  },
  additionalProperties: false,
} as const

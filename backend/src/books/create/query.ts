import type { Database } from '../../db'
import type { AddBookBody, Book } from '@bookshelf/shared'
import { toStoredRating, toBookResponse, type BookRow } from '../schemas'

export async function createBook(db: Database, body: AddBookBody): Promise<Book> {
  const { title, author, isbn, pageCount, rating } = body
  const result = await db.query<BookRow>(
    `INSERT INTO books (title, author, isbn, page_count, rating)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING book_id, title, author, isbn, page_count, rating, created_at`,
    [title, author, isbn, pageCount, toStoredRating(rating)],
  )
  return toBookResponse(result.rows[0])
}

import type { Database } from '../../db'
import { toBookResponse, type BookRow, type BookResponse, type ListBooksQuery } from '../schemas'
import { encodeCursor, type SortDirection } from './cursorPagination'
import { buildWhereClause, type WhereCondition } from '../../utils/whereClause'
import {
  searchCondition,
  authorCondition,
  minRatingCondition,
  maxRatingCondition,
  minPagesCondition,
  maxPagesCondition,
  cursorCondition,
} from './utils'

export async function getBooks(
  db: Database,
  queryParams: ListBooksQuery,
): Promise<{ data: BookResponse[]; nextCursor: string | null }> {
  // TODO: replace these casts with a Zod validator on ListBooksQuery so sortBy and
  // sortOrder are narrowed to their exact union types before reaching here.
  const sortColumn = (queryParams.sortBy ?? 'created_at') as keyof BookRow
  const sortDirection = (queryParams.sortOrder ?? 'desc') as SortDirection
  const limit = queryParams.limit ?? 20

  const whereConditions = [
    searchCondition(queryParams.q),
    authorCondition(queryParams.author),
    minRatingCondition(queryParams.minRating),
    maxRatingCondition(queryParams.maxRating),
    minPagesCondition(queryParams.minPages),
    maxPagesCondition(queryParams.maxPages),
    cursorCondition(queryParams.cursor, sortColumn, sortDirection),
  ].filter((c): c is WhereCondition => c !== null)

  const { sql: whereClause, params } = buildWhereClause(whereConditions)

  const queryString = `
    SELECT book_id, title, author, isbn, page_count, rating, created_at
    FROM books
    ${whereClause}
    ORDER BY ${sortColumn} ${sortDirection.toUpperCase()}, book_id ${sortDirection.toUpperCase()}
    LIMIT $${params.length + 1}
  `

  // Fetch limit+1 rows: if we get that many back, there's another page.
  // Encode a cursor from the last kept row (index limit-1), then slice to limit.
  const result = await db.query<BookRow>(queryString, [...params, limit + 1])
  const rows = result.rows

  let nextCursor: string | null = null
  if (rows.length === limit + 1) {
    const lastKept = rows[limit - 1]
    nextCursor = encodeCursor(lastKept[sortColumn], lastKept.book_id)
  }

  const data = rows.slice(0, limit).map(toBookResponse)
  return { data, nextCursor }
}
import type { Database } from '../../db'
import { getBooksParamsSchema, type GetBooksParams, type Book } from '@bookshelf/shared'
import { toBookResponse, type BookRow } from '../schemas'
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
  queryParams: GetBooksParams,
): Promise<{ data: Book[]; nextCursor: string | null }> {
  const parsed = getBooksParamsSchema.parse(queryParams)
  const sortColumn = (parsed.sortBy ?? 'created_at') as keyof BookRow
  const sortDirection: SortDirection = parsed.sortOrder ?? 'desc'
  const limit = parsed.limit ?? 20

  const whereConditions = [
    searchCondition(parsed.q),
    authorCondition(parsed.author),
    minRatingCondition(parsed.minRating),
    maxRatingCondition(parsed.maxRating),
    minPagesCondition(parsed.minPages),
    maxPagesCondition(parsed.maxPages),
    cursorCondition(parsed.cursor, sortColumn, sortDirection),
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

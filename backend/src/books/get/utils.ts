import { toStoredRating } from '../schemas'
import { type WhereCondition } from '../../utils/whereClause'
import { decodeCursor, type SortDirection } from './cursorPagination'

export const searchCondition = (searchQuery: string | undefined): WhereCondition | null => {
  if (!searchQuery) return null
  return {
    condition: `(search_vector @@ plainto_tsquery('english', ?) OR title % ? OR author % ?)`,
    values: [searchQuery, searchQuery, searchQuery],
  }
}

export const titleCondition = (title: string | undefined): WhereCondition | null => {
  if (!title) return null
  return { condition: `title ILIKE ?`, values: [`%${title}%`] }
}

export const authorCondition = (author: string | undefined): WhereCondition | null => {
  if (!author) return null
  return { condition: `author ILIKE ?`, values: [`%${author}%`] }
}

export const isbnCondition = (isbn: string | undefined): WhereCondition | null => {
  if (!isbn) return null
  return { condition: `isbn ILIKE ?`, values: [`%${isbn}%`] }
}

export const minRatingCondition = (minRating: number | undefined): WhereCondition | null => {
  if (minRating === undefined) return null
  return { condition: `rating >= ?`, values: [toStoredRating(minRating)] }
}

export const maxRatingCondition = (maxRating: number | undefined): WhereCondition | null => {
  if (maxRating === undefined) return null
  return { condition: `rating <= ?`, values: [toStoredRating(maxRating)] }
}

export const minPagesCondition = (minPages: number | undefined): WhereCondition | null => {
  if (minPages === undefined) return null
  return { condition: `page_count >= ?`, values: [minPages] }
}

export const maxPagesCondition = (maxPages: number | undefined): WhereCondition | null => {
  if (maxPages === undefined) return null
  return { condition: `page_count <= ?`, values: [maxPages] }
}

export const cursorCondition = (
  cursor: string | undefined,
  sortColumn: string,
  direction: SortDirection,
): WhereCondition | null => {
  if (!cursor) return null
  const { sortValue, bookId } = decodeCursor(cursor)
  const operator = direction === 'asc' ? '>' : '<'
  return {
    condition: `(${sortColumn} ${operator} ? OR (${sortColumn} = ? AND book_id ${operator} ?))`,
    values: [sortValue, sortValue, bookId],
  }
}
export type SortDirection = 'asc' | 'desc'

interface CursorPayload {
  v: unknown
  id: string
}

export const encodeCursor = (sortValue: unknown, bookId: string): string => {
  const payload = JSON.stringify({ v: sortValue, id: bookId })
  return Buffer.from(payload).toString('base64url')
}

export const decodeCursor = (cursor: string): { sortValue: unknown; bookId: string } => {
  const payload = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8')) as CursorPayload
  return { sortValue: payload.v, bookId: payload.id }
}
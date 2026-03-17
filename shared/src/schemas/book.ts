import { z } from 'zod'

export const bookSchema = z.object({
  bookId: z.number().int().positive(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  pageCount: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  createdAt: z.string().datetime(),
})

export const getBooksResponseSchema = z.object({
  data: z.array(bookSchema),
  nextCursor: z.string().nullable(),
})

export type Book = z.infer<typeof bookSchema>
export type GetBooksResponse = z.infer<typeof getBooksResponseSchema>
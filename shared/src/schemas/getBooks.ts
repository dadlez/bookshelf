import { z } from 'zod'

export const searchSchema = z.object({
  q: z.string().optional(),
})

export const filterSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  isbn: z.string().optional(),
  minRating: z.number().min(1).max(5).optional(),
  maxRating: z.number().min(1).max(5).optional(),
  minPages: z.number().int().min(1).optional(),
  maxPages: z.number().int().min(1).optional(),
})

export const orderSchema = z.object({
  sortBy: z.enum(['title', 'author', 'rating', 'page_count', 'created_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export const paginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(100).optional(),
})

export const getBooksParamsSchema = searchSchema
  .merge(filterSchema)
  .merge(orderSchema)
  .merge(paginationSchema)

export type SearchParams = z.infer<typeof searchSchema>
export type FilterParams = z.infer<typeof filterSchema>
export type OrderParams = z.infer<typeof orderSchema>
export type PaginationParams = z.infer<typeof paginationSchema>
export type GetBooksParams = z.infer<typeof getBooksParamsSchema>
import { z } from 'zod'

export const addBookSchema = z.object({
  title: z.string().min(1).max(500),
  author: z.string().min(1).max(255),
  isbn: z.string().min(1),
  pageCount: z.number().int().min(1),
  rating: z.number().min(1).max(5),
})

export type AddBookBody = z.infer<typeof addBookSchema>
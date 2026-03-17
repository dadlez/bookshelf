import { z } from 'zod'

function isValidIsbn(raw: string): boolean {
  const s = raw.replace(/[-\s]/g, '')
  if (s.length === 13) {
    if (!/^\d{13}$/.test(s)) return false
    const sum = s.split('').reduce((acc, ch, i) => acc + Number(ch) * (i % 2 === 0 ? 1 : 3), 0)
    return sum % 10 === 0
  }
  if (s.length === 10) {
    if (!/^\d{9}[\dX]$/.test(s)) return false
    const sum = s.split('').reduce((acc, ch, i) => acc + (ch === 'X' ? 10 : Number(ch)) * (10 - i), 0)
    return sum % 11 === 0
  }
  return false
}

export const addBookSchema = z.object({
  title: z.string().min(1).max(500),
  author: z.string().min(1).max(255),
  isbn: z.string().min(1).refine(isValidIsbn, { message: 'Invalid ISBN-10 or ISBN-13' }),
  pageCount: z.number().int().min(1),
  rating: z.number().min(1).max(5),
})

export type AddBookBody = z.infer<typeof addBookSchema>
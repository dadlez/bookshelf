import { getBooksResponseSchema, type GetBooksResponse, AppError } from "@bookshelf/shared";

const VALIDATE = import.meta.env.VITE_VALIDATE_RESPONSES === "true";

export async function fetchBooks(cursor?: string): Promise<GetBooksResponse> {
  const url = new URL("/api/books", window.location.origin);
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url.toString());
  if (!res.ok) throw new AppError(res.status);

  const json = await res.json();
  return VALIDATE ? getBooksResponseSchema.parse(json) : (json as GetBooksResponse);
}

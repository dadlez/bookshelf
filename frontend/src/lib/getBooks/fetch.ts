import { getBooksResponseSchema, type GetBooksResponse, AppError, type FilterParams } from "@bookshelf/shared";

const VALIDATE = import.meta.env.VITE_VALIDATE_RESPONSES === "true";

export async function fetchBooks(cursor?: string, filterParams?: FilterParams): Promise<GetBooksResponse> {
  const url = new URL("/api/books", window.location.origin);
  if (cursor) url.searchParams.set("cursor", cursor);
  if (filterParams?.title) url.searchParams.set("title", filterParams.title);
  if (filterParams?.author) url.searchParams.set("author", filterParams.author);
  if (filterParams?.isbn) url.searchParams.set("isbn", filterParams.isbn);
  if (filterParams?.minRating != null) url.searchParams.set("minRating", String(filterParams.minRating));
  if (filterParams?.maxRating != null) url.searchParams.set("maxRating", String(filterParams.maxRating));

  const res = await fetch(url.toString());
  if (!res.ok) throw new AppError(res.status);

  const json = await res.json();
  return VALIDATE ? getBooksResponseSchema.parse(json) : (json as GetBooksResponse);
}

import { AppError, type AddBookBody } from "@bookshelf/shared";

export async function addBook(body: AddBookBody): Promise<void> {
  const res = await fetch("/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new AppError(res.status);
}

# Bookshelf

A simple, performant CRUD app for looking up books from a PostgreSQL database.

## Project Overview

- **Purpose**: Book lookup and management via CRUD operations
- **Database**: PostgreSQL (Docker Compose on port 5433)
- **Goals**: Simplicity and performance
- **Architecture**: Monorepo with `backend/`, `frontend/`, and `shared/` packages

## Structure

- `backend/` — server-side code (TypeScript, Fastify, compiled to `dist/`)
  - `src/index.ts` — entry point, starts the server
  - `src/app.ts` — Fastify app setup, registers plugins
  - `src/db.ts` — PostgreSQL connection (uses `.env`)
  - `src/health/plugin.ts` — registers the health route
  - `src/health/handler.ts` — health check handler (includes DB ping)
  - `src/books/plugin.ts` — registers `POST /books` and `GET /books` routes with JSON schemas
  - `src/books/schemas.ts` — JSON schemas, TypeScript interfaces, and rating conversion helpers (DB stores 0.0–1.0, API uses 1–5)
  - `src/books/create/handler.ts` — POST /books handler; maps DB error code 23505 to 409 on duplicate ISBN
  - `src/books/create/query.ts` — INSERT query; converts rating before writing, maps result row to `BookResponse`
  - `src/books/get/handler.ts` — GET /books handler; delegates entirely to `getBooks` query
  - `src/books/get/query.ts` — SELECT query with filtering, cursor-based pagination (fetches limit+1 to detect next page), and dynamic ORDER BY
  - `src/books/get/cursorPagination.ts` — base64url encode/decode for opaque cursors carrying the sort value and `book_id`
  - `src/books/get/utils.ts` — per-filter `WhereCondition` builders (search, author, rating, pages, cursor)
  - `src/utils/whereClause.ts` — builds a parameterised `WHERE … AND …` clause from an array of `WhereCondition` objects

- `shared/` — shared TypeScript library consumed by both backend and frontend
  - `src/index.ts` — barrel export for all schemas and AppError
  - `src/schemas/book.ts` — Zod schema for `Book` type and `GetBooksResponse` (data array + nullable nextCursor)
  - `src/schemas/addBook.ts` — Zod schema for `AddBookBody` input validation (title, author, isbn, pageCount, rating 1–5)
  - `src/schemas/getBooks.ts` — Zod schemas for GET /books query params: `searchSchema`, `filterSchema`, `orderSchema`, `paginationSchema`, merged into `getBooksParamsSchema`
  - `src/errors/AppError.ts` — custom Error class mapping HTTP status codes (400, 404, 409, 422, 500) to human-readable messages

- `frontend/` — React SPA (Vite, MUI, React Query, nuqs)
  - `src/main.tsx` — entry point; sets up NuqsAdapter (URL state), QueryClientProvider, and MUI CssBaseline
  - `src/App.tsx` — root component; renders BooksPage
  - `src/pages/BooksPage.tsx` — main page; uses `useGetBooks` for infinite-scroll pagination, passes data to BooksTableView
  - `src/views/BooksTableView.tsx` — table wrapper; renders Table with book rows and a "Load more" button (or "All books loaded" when exhausted)
  - `src/views/booksColumns.ts` — column definitions (title, author, rating, pageCount, isbn) with proportional widths
  - `src/components/table/Table.tsx` — generic MUI Table component with configurable columns, render functions, and optional empty message
  - `src/components/layout/PageWrapper.tsx` — centers content with max-width 1200px and padding
  - `src/lib/getBooks/fetch.ts` — `fetchBooks()`: GET `/api/books` with cursor and filterParams; optionally validates response via Zod if `VITE_VALIDATE_RESPONSES` is set
  - `src/lib/getBooks/query.ts` — `useGetBooks()`: React Query `useInfiniteQuery` hook; derives nextCursor from each page response
  - `src/lib/getBooks/filter/schema.ts` — re-exports `filterSchema` and `FilterParams` from shared
  - `src/lib/getBooks/filter/useFilterParams.ts` — nuqs hook managing URL query param state for the author filter
  - `src/lib/getBooks/pagination/schema.ts` — re-exports `paginationSchema` and `PaginationParams` from shared
  - `vite.config.ts` — Vite config: React plugin, `@bookshelf/shared` path alias, dev proxy forwarding `/api` to `localhost:3000`

- `database/` — database utilities (not part of the server)
  - `migrate.js` — migration runner; reads `.sql` files from `migrations/` alphabetically, tracks applied migrations in `schema_migrations` table, rolls back on error
  - `seed10k.js` — inserts 10,000 books using Faker (pool of 3,000 authors, fake ISBNs/titles/page counts, 500-book chunks)
  - `seed100k.js` — spawns 10 parallel `seed10k.js` processes for 100,000 total books

- `compose.yaml` — Docker Compose: PostgreSQL service with volume persistence, port 5433, env from `backend/.env.example`
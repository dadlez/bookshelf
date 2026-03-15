# Bookshelf

A simple, performant CRUD app for looking up books from a PostgreSQL database.

## Project Overview

- **Purpose**: Book lookup and management via CRUD operations
- **Database**: PostgreSQL
- **Goals**: Simplicity and performance

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
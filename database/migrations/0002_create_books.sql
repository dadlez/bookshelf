CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE DOMAIN percentage AS DOUBLE PRECISION
  CHECK (VALUE >= 0.0 AND VALUE <= 1.0);

CREATE TABLE books (
  book_id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title         TEXT NOT NULL CHECK (LENGTH(title) <= 500),
  author        TEXT NOT NULL CHECK (LENGTH(author) <= 255),
  isbn          TEXT NOT NULL UNIQUE,
  page_count    INTEGER NOT NULL CHECK (page_count > 0),
  rating        percentage NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || author)
  ) STORED
);

CREATE INDEX books_search_vector_gin ON books USING GIN (search_vector);
CREATE INDEX books_title_trgm        ON books USING GIN (title gin_trgm_ops);
CREATE INDEX books_author_trgm       ON books USING GIN (author gin_trgm_ops);
CREATE INDEX books_created_at        ON books (created_at);
CREATE INDEX books_author_sort       ON books (author, book_id);
CREATE INDEX books_title_sort        ON books (title, book_id);
CREATE INDEX books_rating            ON books (rating);
CREATE INDEX books_page_count        ON books (page_count);
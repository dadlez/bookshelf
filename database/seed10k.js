const pg = require('pg');
const { faker } = require('@faker-js/faker');

const TOTAL_BOOKS = 10_000;
const AUTHOR_POOL_SIZE = 3_000;
const CHUNK_SIZE = 500;

const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

function buildAuthors() {
  const authors = [];
  for (let i = 0; i < AUTHOR_POOL_SIZE; i++) {
    authors.push(faker.person.fullName());
  }
  return authors;
}

function buildBook(authors) {
  return {
    title: faker.book.title(),
    author: authors[Math.floor(Math.random() * authors.length)],
    isbn: faker.commerce.isbn(),
    pageCount: faker.number.int({ min: 50, max: 700 }),
    // DB stores rating as 0.0–1.0
    rating: Math.random(),
  };
}

async function insertChunk(client, books) {
  if (books.length === 0) return 0;

  const values = [];
  const params = [];
  let paramIdx = 1;

  for (const book of books) {
    values.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`);
    params.push(book.title, book.author, book.isbn, book.pageCount, book.rating);
  }

  const result = await client.query(
    `INSERT INTO books (title, author, isbn, page_count, rating)
     VALUES ${values.join(', ')}
     ON CONFLICT (isbn) DO NOTHING`,
    params,
  );

  return result.rowCount ?? 0;
}

async function seed() {
  const authors = buildAuthors();
  console.log(`Generated ${authors.length} authors`);

  const client = await pool.connect();
  let inserted = 0;
  let skipped = 0;

  try {
    for (let offset = 0; offset < TOTAL_BOOKS; offset += CHUNK_SIZE) {
      const count = Math.min(CHUNK_SIZE, TOTAL_BOOKS - offset);
      const chunk = Array.from({ length: count }, () => buildBook(authors));

      const rowCount = await insertChunk(client, chunk);
      inserted += rowCount;
      skipped += count - rowCount;

      console.log(`  chunk ${offset / CHUNK_SIZE + 1}: inserted ${rowCount}, skipped ${count - rowCount} (isbn conflict)`);
    }
  } finally {
    client.release();
    await pool.end();
  }

  console.log(`\nDone. Total inserted: ${inserted}, skipped: ${skipped}`);
}

seed().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

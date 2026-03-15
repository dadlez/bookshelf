const pg = require('pg');
const { readdir, readFile } = require('fs/promises');
const { join } = require('path');

const MIGRATIONS_DIR = join(__dirname, 'migrations');

const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

async function migrate() {
  const client = await pool.connect();
  try {
    let applied = new Set();
    try {
      const { rows } = await client.query('SELECT name FROM schema_migrations');
      applied = new Set(rows.map((r) => r.name));
    } catch (err) {
      if (err.code !== '42P01') throw err; // undefined_table — first run, table not yet created
    }

    const files = (await readdir(MIGRATIONS_DIR))
      .filter((f) => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const name = file.replace(/\.sql$/, '');
      if (applied.has(name)) {
        console.log(`skip  ${file}`);
        continue;
      }

      const sql = await readFile(join(MIGRATIONS_DIR, file), 'utf8');
      await client.query('BEGIN');

      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [name]);
        await client.query('COMMIT');
        console.log(`apply ${file}`);
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

import { buildApp } from './app.js'
import { Database } from './db.js'

const HOST = process.env.HOST ?? '0.0.0.0'
const PORT = Number(process.env.PORT ?? 3000)

const db = new Database({
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'bookshelf',
  user: process.env.PGUSER ?? 'postgres',
  password: process.env.PGPASSWORD ?? '',
})

const app = await buildApp(db)

await app.listen({ host: HOST, port: PORT })

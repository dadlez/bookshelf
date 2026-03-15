import pg from 'pg';

export class Database {
  private pool: pg.Pool;

  constructor(config: pg.PoolConfig) {
    this.pool = new pg.Pool(config);
  }

  query<T extends pg.QueryResultRow = pg.QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<pg.QueryResult<T>> {
    return this.pool.query<T>(text, values);
  }

  connect(): Promise<pg.PoolClient> {
    return this.pool.connect();
  }

  end(): Promise<void> {
    return this.pool.end();
  }
}

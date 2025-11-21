import { Pool } from 'pg'
import type { Env } from './env'

let pool: Pool | null = null

export function initDb(env: Env) {
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  })
  return pool
}

export function getDb() {
  if (!pool) {
    throw new Error('DB not initialized')
  }
  return pool
}

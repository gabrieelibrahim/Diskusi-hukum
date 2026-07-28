import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'

import * as schema from './schema'

/**
 * Create the libSQL (Turso) client using DATABASE_URL from environment
 * or fall back to a local SQLite file at project root.
 *
 * For Turso remote: DATABASE_URL=libsql://<db-name>.turso.io
 * For local file:    DATABASE_URL=file:./diskusi-hukum.db
 */
const client = createClient({
  url: process.env.DATABASE_URL || 'file:./diskusi-hukum.db',
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

/**
 * Drizzle ORM instance bound to the libSQL client.
 * Import `db` from this module to run queries.
 */
export const db: LibSQLDatabase<typeof schema> = drizzle(client, { schema })

export { client, schema }
export default db
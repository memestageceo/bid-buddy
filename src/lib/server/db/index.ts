import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

declare global {
	// eslint-disable-next-line no-var
	var database: PostgresJsDatabase<typeof schema> | undefined;
}

let database: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
pg = postgres(env.DATABASE_URL);
database = drizzle(pg, { schema });

export { database, pg };

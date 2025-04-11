import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../../drizzle/schema';

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://origin_admin:origin_password@localhost:5432/origin_db';

// Create postgres connection
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });

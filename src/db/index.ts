import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// In Astro with Cloudflare, we might need to access env from context, 
// but for simple initialization we can try process.env or import.meta.env.
// Note: On Cloudflare, ensure DATABASE_URL is set in the dashboard.
const sql = neon(import.meta.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

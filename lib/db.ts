import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export function getDb(): Pool {
  const connectionString =
    process.env.NEON_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error(
      "Missing NEON_DATABASE_URL, DATABASE_URL, or POSTGRES_URL environment variable",
    );
  }

  if (!global.__dbPool) {
    global.__dbPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }

  return global.__dbPool;
}

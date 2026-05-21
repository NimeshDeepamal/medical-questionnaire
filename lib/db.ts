import { Pool } from "pg";

const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "Missing NEON_DATABASE_URL, DATABASE_URL, or POSTGRES_URL environment variable",
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: Pool | undefined;
}

export const db =
  global.__dbPool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbPool = db;
}

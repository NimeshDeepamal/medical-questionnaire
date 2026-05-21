import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "pg";

const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.SUPABASE_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    "Missing NEON_DATABASE_URL, SUPABASE_DATABASE_URL, DATABASE_URL, or POSTGRES_URL.",
  );
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  const schemaPath = resolve("supabase/schema.sql");
  const sql = readFileSync(schemaPath, "utf8");
  await client.query(sql);
  console.log("Questionnaires table created or already exists.");
} finally {
  await client.end();
}

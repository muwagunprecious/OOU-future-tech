
import pg from 'pg';
const { Client } = pg;

// Connection string for Supabase Postgres
const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const sql = `
-- Create Founders Connect Table
CREATE TABLE IF NOT EXISTS founders_connect (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    who_they_are TEXT NOT NULL,
    requirements TEXT NOT NULL,
    whatsapp_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE founders_connect ENABLE ROW LEVEL SECURITY;

-- Allow public insert
DROP POLICY IF EXISTS "Allow public insert" ON founders_connect;
CREATE POLICY "Allow public insert" ON founders_connect FOR INSERT WITH CHECK (true);

-- Allow select for all (prototype phase)
DROP POLICY IF EXISTS "Allow select for all" ON founders_connect;
CREATE POLICY "Allow select for all" ON founders_connect FOR SELECT USING (true);
`;

async function run() {
    try {
        console.log("📡 Connecting to Supabase Postgres...");
        await client.connect();
        console.log("✅ Connection established.");

        console.log("🚀 Executing SQL to create founders_connect table...");
        await client.query(sql);
        console.log("✅ founders_connect table setup completed successfully!");

    } catch (err) {
        console.error("❌ Setup Failed:", err);
    } finally {
        await client.end();
    }
}

run();

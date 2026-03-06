import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres";

const client = new Client({
    user: 'postgres',
    host: 'db.kvghrhwkwlydpdlenrzo.supabase.co',
    database: 'postgres',
    password: 'YZ8dY*fqxk$h+*j',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sql = `
-- Create Partners Table
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Public Read Policy
DROP POLICY IF EXISTS "Allow public read" ON partners;
CREATE POLICY "Allow public read" ON partners FOR SELECT USING (true);

-- Public CRUD
DROP POLICY IF EXISTS "Allow public CRUD" ON partners;
CREATE POLICY "Allow public CRUD" ON partners FOR ALL USING (true);
`;

async function run() {
    try {
        console.log("📡 Connecting to Supabase Postgres...");
        await client.connect();
        console.log("✅ Connection established.");

        console.log("🚀 Creating partners table...");
        await client.query(sql);
        console.log("✅ Partners table created successfully.");

    } catch (err) {
        console.error("❌ Setup Failed:", err);
    } finally {
        await client.end();
    }
}

run();

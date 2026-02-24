import pg from 'pg';
const { Client } = pg;

// Connection string for Supabase Postgres
const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const sql = `
-- 1. Create Speakers Table
CREATE TABLE IF NOT EXISTS speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    expertise TEXT,
    image_url TEXT,
    bg_class TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable RLS
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policies
DROP POLICY IF EXISTS "Allow public read" ON speakers;
CREATE POLICY "Allow public read" ON speakers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON team_members;
CREATE POLICY "Allow public read" ON team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON site_settings;
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);

-- 6. Public CRUD (For simple admin prototype)
DROP POLICY IF EXISTS "Allow public CRUD" ON speakers;
CREATE POLICY "Allow public CRUD" ON speakers FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON team_members;
CREATE POLICY "Allow public CRUD" ON team_members FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON site_settings;
CREATE POLICY "Allow public CRUD" ON site_settings FOR ALL USING (true);

-- 7. Seed Data
INSERT INTO site_settings (key, value)
VALUES ('registration_open', 'true')
ON CONFLICT (key) DO NOTHING;

-- 8. Create Storage Bucket (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- 9. Storage Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'cms-images' );

DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'cms-images' );

DROP POLICY IF EXISTS "Public Update" ON storage.objects;
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'cms-images' );

DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'cms-images' );
`;

async function run() {
    try {
        console.log("📡 Connecting to Supabase Postgres...");
        await client.connect();
        console.log("✅ Connection established.");

        console.log("🔍 Inspecting schemas...");
        const schemas = await client.query("SELECT schema_name FROM information_schema.schemata");
        console.log("Schemas found:", schemas.rows.map(r => r.schema_name).join(", "));

        console.log("� Inspecting storage tables...");
        try {
            const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'storage'");
            console.log("Storage tables found:", tables.rows.map(r => r.table_name).join(", "));
        } catch (e) {
            console.log("❌ Error accessing storage schema:", e.message);
        }

        // Try to create bucket if schema exists
        console.log("🚀 Attempting to create bucket via SQL...");
        await client.query(`
            INSERT INTO storage.buckets (id, name, public)
            VALUES ('cms-images', 'cms-images', true)
            ON CONFLICT (id) DO NOTHING;
        `);
        console.log("✅ Bucket creation command sent.");

    } catch (err) {
        console.error("❌ Diagnostic Failed:", err);
    } finally {
        await client.end();
    }
}

run();

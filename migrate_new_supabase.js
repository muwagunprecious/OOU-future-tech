import pg from 'pg';
const { Client } = pg;

// New Supabase Connection String
const connectionString = "postgresql://postgres.addtzgrmmoybmvasmxss:6lKKxgT9QhHlBt5n@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const sql = `
-- 1. Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  ticket_type TEXT NOT NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  company_name TEXT,
  whatsapp_number TEXT,
  products TEXT
);

-- 2. Create Speakers Table
CREATE TABLE IF NOT EXISTS speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    expertise TEXT,
    image_url TEXT,
    bg_class TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create Partners Table
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- 7. Policies for registrations
DROP POLICY IF EXISTS "Allow public insert" ON registrations;
CREATE POLICY "Allow public insert" ON registrations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for all" ON registrations;
CREATE POLICY "Allow select for all" ON registrations FOR SELECT USING (true);

-- 8. Policies for CMS tables
DROP POLICY IF EXISTS "Allow public read" ON speakers;
CREATE POLICY "Allow public read" ON speakers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON speakers;
CREATE POLICY "Allow public CRUD" ON speakers FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read" ON team_members;
CREATE POLICY "Allow public read" ON team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON team_members;
CREATE POLICY "Allow public CRUD" ON team_members FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read" ON site_settings;
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON site_settings;
CREATE POLICY "Allow public CRUD" ON site_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read" ON partners;
CREATE POLICY "Allow public read" ON partners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public CRUD" ON partners;
CREATE POLICY "Allow public CRUD" ON partners FOR ALL USING (true);

-- 9. Seed Initial Data
INSERT INTO site_settings (key, value)
VALUES 
  ('registration_open', 'true'),
  ('speakers_mode', 'live'),
  ('event_tags_open', 'true')
ON CONFLICT (key) DO NOTHING;

-- 10. Storage Setup (Note: storage schema needs to be enabled in target)
-- This assumes Supabase standard storage schema is present
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('cms-images', 'cms-images', true)
    ON CONFLICT (id) DO NOTHING;

    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'cms-images' );

    DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
    CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'cms-images' );

    DROP POLICY IF EXISTS "Public Update" ON storage.objects;
    CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'cms-images' );

    DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
    CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'cms-images' );
  END IF;
END $$;
`;

async function run() {
    try {
        console.log("📡 Connecting to New Supabase Postgres...");
        await client.connect();
        console.log("✅ Connection established.");

        console.log("🚀 Running Migration SQL...");
        await client.query(sql);
        console.log("✅ Schema migration completed successfully.");

    } catch (err) {
        console.error("❌ Migration Failed:", err);
    } finally {
        await client.end();
    }
}

run();

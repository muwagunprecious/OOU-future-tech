const { Client } = require('pg');

// Direct connection string from cms_setup.js
const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Starting database migration (Direct URL from cms_setup)...');
    try {
        await client.connect();
        console.log('✅ Connected.');
        
        await client.query('BEGIN');
        
        console.log('📝 Adding columns to registrations table...');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS checked_in BOOLEAN DEFAULT false;');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS is_legacy BOOLEAN DEFAULT false;');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMP WITH TIME ZONE;');
        
        await client.query('COMMIT');
        console.log('✅ Migration successful!');
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        await client.end();
    }
}

migrate();

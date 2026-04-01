const { Pool } = require('pg');

// Corrected connection string for Supabase pooling (requires project ref in username)
const CURRENT_PROJECT_REF = 'kvghrhwkwlydpdlenrzo';
const DB_PASS = 'YZ8dY*fqxk$h+*j';
const connectionString = `postgresql://postgres.${CURRENT_PROJECT_REF}:${DB_PASS}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`;

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Starting database migration (Corrected URL)...');
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        console.log('📝 Adding columns to registrations table...');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS checked_in BOOLEAN DEFAULT false;');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS is_legacy BOOLEAN DEFAULT false;');
        await client.query('ALTER TABLE registrations ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMP WITH TIME ZONE;');
        
        await client.query('COMMIT');
        console.log('✅ Migration successful!');
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('❌ Migration failed:', err.message);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

migrate();

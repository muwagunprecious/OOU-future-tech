const { Pool } = require('pg');

// Use process.env directly (populated via node --env-file)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Starting database migration (Native Env)...');
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL is missing!');
        process.exit(1);
    }

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

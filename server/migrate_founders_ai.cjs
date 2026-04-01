require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

// Manually constructed from .env to ensure correct username for pooling
const pool = new Pool({
    connectionString: 'postgresql://postgres.kvghrhwkwlydpdlenrzo:YZ8dY*fqxk$h+*j@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Adding AI Analysis columns to founders_applications...');
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        await client.query('ALTER TABLE founders_applications ADD COLUMN IF NOT EXISTS ai_industry TEXT;');
        await client.query('ALTER TABLE founders_applications ADD COLUMN IF NOT EXISTS ai_complexity TEXT;');
        await client.query('ALTER TABLE founders_applications ADD COLUMN IF NOT EXISTS ai_seriousness INTEGER;');
        await client.query('ALTER TABLE founders_applications ADD COLUMN IF NOT EXISTS ai_experience INTEGER;');
        await client.query('ALTER TABLE founders_applications ADD COLUMN IF NOT EXISTS ai_summary TEXT;');
        
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

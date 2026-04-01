import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Starting database migration...');
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
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();

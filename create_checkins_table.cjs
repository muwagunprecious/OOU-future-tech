const { Client } = require('pg');

// Trying the pooling URL again but for the check_ins table
const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log('🚀 Attempting to create check_ins table...');
    try {
        await client.connect();
        
        await client.query(`
            CREATE TABLE IF NOT EXISTS check_ins (
                ticket_id TEXT PRIMARY KEY,
                checked_in_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `);
        
        console.log('✅ check_ins table created successfully!');
    } catch (err) {
        console.error('❌ Failed:', err.message);
    } finally {
        await client.end();
    }
}

migrate();

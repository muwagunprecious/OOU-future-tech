const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function testNew() {
    console.log(`📡 Connecting to NEW Postgres...`);
    try {
        await client.connect();
        const res = await client.query('SELECT current_database(), current_user');
        console.log(`✅ Success! Connected to:`, res.rows[0]);
        
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('📊 Tables in public schema:', tables.rows.map(r => r.table_name).join(', '));
        
    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
    } finally {
        await client.end();
    }
}

testNew();

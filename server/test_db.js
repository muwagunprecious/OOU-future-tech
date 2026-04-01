const pg = require('pg');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    console.log('📡 Testing connection to:', process.env.DATABASE_URL.split('@')[1]);
    try {
        const client = await pool.connect();
        console.log('✅ Connected!');
        const res = await client.query('SELECT current_database();');
        console.log('📊 Current Database:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    } finally {
        await pool.end();
    }
}

test();

const { Client } = require('pg');

const connectionString = 'postgresql://postgres:YZ8dY*fqxk$h+*j@addtzgrmmoybmvasmxss.supabase.co:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

async function runTest() {
    console.log('Connecting directly to addtzgrmmoybmvasmxss.supabase.co:5432...');
    try {
        await client.connect();
        console.log('✅ Connected!');
        const res = await client.query('SELECT now()');
        console.log('Time from DB:', res.rows[0]);
    } catch(e) {
        console.error('❌ Connection failed:', e);
    } finally {
        await client.end();
    }
}

runTest();


const { Client } = require('pg');

const connectionString = "postgresql://postgres:YZ8dY*fqxk$h+*j@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres";

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    console.log(`📡 Connecting to: db.kvghrhwkwlydpdlenrzo.supabase.co via URL string`);
    try {
        await client.connect();
        console.log("✅ Connection established!");
        const result = await client.query('SELECT count(*) FROM registrations');
        console.log(`📊 Found ${result.rows[0].count} records.`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await client.end();
    }
}

test();

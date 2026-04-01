
const { Client } = require('pg');

// Original pass: YZ8dY*fqxk$h+*j
// Direct host: db.kvghrhwkwlydpdlenrzo.supabase.co
const directConn = "postgresql://postgres:YZ8dY%2Afqxk%24h%2B%2Aj@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres";

const client = new Client({
    connectionString: directConn,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('📡 Attempting direct connection to 5432...');
        await client.connect();
        console.log('✅ Connected!');
        const res = await client.query('SELECT current_user, current_database()');
        console.log('User/DB:', res.rows[0]);
    } catch (e) {
        console.error('❌ Error:', e.message);
    } finally {
        await client.end();
    }
}

run();

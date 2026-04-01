
const { Client } = require('pg');

// Original: postgresql://postgres:YZ8dY*fqxk$h+*j@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
// Encoded password: YZ8dY%2Afqxk%24h%2B%2Aj
const encodedConn = "postgresql://postgres:YZ8dY%2Afqxk%24h%2B%2Aj@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const client = new Client({
    connectionString: encodedConn,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('📡 Attempting connection with encoded password...');
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

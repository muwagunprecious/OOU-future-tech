
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'kvghrhwkwlydpdlenrzo.pooler.supabase.com',
    database: 'postgres',
    password: 'YZ8dY*fqxk$h+*j',
    port: 6543,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    console.log(`📡 Connecting to: kvghrhwkwlydpdlenrzo.pooler.supabase.com`);
    try {
        const result = await pool.query('SELECT count(*) FROM registrations');
        console.log(`✅ Success! Found ${result.rows[0].count} records in registrations table.`);
        
        const attendees = await pool.query('SELECT name, email, ticket_id FROM registrations LIMIT 5');
        console.log('Sample data:', attendees.rows);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

test();


const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'db.kvghrhwkwlydpdlenrzo.supabase.co',
    database: 'postgres',
    password: 'YZ8dY*fqxk$h+*j',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    console.log(`📡 Connecting to: db.kvghrhwkwlydpdlenrzo.supabase.co`);
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

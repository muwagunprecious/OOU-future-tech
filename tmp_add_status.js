import pg from 'pg';
const { Client } = pg;

const client = new Client({
    user: 'postgres',
    host: 'db.kvghrhwkwlydpdlenrzo.supabase.co',
    database: 'postgres',
    password: 'YZ8dY*fqxk$h+*j',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to DB.");
        await client.query("ALTER TABLE pitches ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';");
        console.log("Column 'status' added successfully.");
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await client.end();
    }
}

run();

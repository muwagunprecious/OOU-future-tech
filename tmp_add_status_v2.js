import pg from 'pg';
const { Client } = pg;

// Connection details from setup_partners_table.js
const client = new Client({
    connectionString: "postgresql://postgres:YZ8dY*fqxk$h+*j@db.kvghrhwkwlydpdlenrzo.supabase.co:5432/postgres",
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected.");
        await client.query("ALTER TABLE pitches ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';");
        console.log("SQL executed successfully.");
    } catch (err) {
        console.error("FAILED:", err.message);
        console.error("FULL ERROR:", JSON.stringify(err));
    } finally {
        await client.end();
    }
}

run();

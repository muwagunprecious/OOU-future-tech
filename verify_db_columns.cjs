
const { Pool } = require('pg');
const fs = require('fs');

// Load .env manually
const envPath = 'c:\\Users\\TINGO-AI-010\\Documents\\OOUFUTURE CONFERENCE\\.env';
const envRaw = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envRaw.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        envConfig[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    }
});

const databaseUrl = envConfig.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ Missing DATABASE_URL');
    process.exit(1);
}

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
});

async function check() {
    try {
        console.log('📡 Connecting to Postgres...');
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'registrations'
        `);
        console.log('✅ Columns in registrations:');
        res.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });
    } catch (e) {
        console.error('❌ Error:', e.message);
    } finally {
        await pool.end();
    }
}

check();

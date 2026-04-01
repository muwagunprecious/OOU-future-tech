
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verify() {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'registrations'
            AND column_name IN ('checked_in', 'checked_in_at', 'is_legacy');
        `);
        console.log('Columns found:');
        console.table(res.rows);
        
        const countRes = await pool.query('SELECT count(*) FROM registrations');
        console.log('Total registrations:', countRes.rows[0].count);
        
        const legacyCount = await pool.query('SELECT count(*) FROM registrations WHERE is_legacy = true');
        console.log('Legacy registrations:', legacyCount.rows[0].count);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

verify();

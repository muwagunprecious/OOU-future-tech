const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function runMigration() {
    const sqlPath = path.join(__dirname, 'create_tech_waitlist.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🚀 Connecting to Database to create tech_waitlist...');
    try {
        await client.connect();
        console.log('🔨 Applying schema updates...');
        
        const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
        for (const statement of statements) {
            try {
                await client.query(statement);
            } catch (err) {
                console.error(`❌ Statement Failed: ${statement.substring(0, 50)}...`);
                throw err;
            }
        }
        
        console.log('✅ tech_waitlist table created successfully!');
    } catch (err) {
        console.error('❌ Migration Failed:', err.message);
    } finally {
        await client.end();
    }
}

runMigration();

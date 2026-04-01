const pg = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

async function migrate() {
  const client = new pg.Client(config);
  try {
    console.log('🚀 Connecting to Database...');
    await client.connect();

    console.log('📖 Reading matchmaking_schema.sql...');
    const sql = fs.readFileSync(path.join(__dirname, 'matchmaking_schema.sql'), 'utf8');

    console.log('🔨 Executing SQL...');
    // Split SQL by semicolons to run statement by statement (naive but works for this)
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (const statement of statements) {
        try {
            await client.query(statement);
        } catch (statementErr) {
            console.error(`❌ Error in statement: ${statement}`);
            console.error(statementErr);
            // Continue if it's "already exists" error, otherwise throw
            if (!statementErr.message.includes('already exists')) {
                throw statementErr;
            }
        }
    }

    console.log('✅ Matchmaking Tables created successfully!');
  } catch (err) {
    console.error('❌ Migration Failed overall:', err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();

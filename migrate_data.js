import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Simple .env parser
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value.length > 0) {
            process.env[key.trim()] = value.join('=').trim();
        }
    });
}

const OLD_URL = process.env.OLD_SUPABASE_URL;
const OLD_KEY = process.env.OLD_SUPABASE_ANON_KEY;
const NEW_URL = process.env.VITE_SUPABASE_URL;
const NEW_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OLD_URL || !OLD_KEY || !NEW_URL || !NEW_KEY) {
    console.error("❌ Missing environment variables. Please check .env");
    process.exit(1);
}

const oldSupabase = createClient(OLD_URL, OLD_KEY);
const newSupabase = createClient(NEW_URL, NEW_KEY); // Use service role for bulk insert

async function migrateTable(tableName) {
    console.log(`📦 Migrating table: ${tableName}...`);

    // Fetch from old
    const { data, error: fetchError } = await oldSupabase.from(tableName).select('*');
    if (fetchError) {
        console.error(`❌ Error fetching from ${tableName}:`, fetchError.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log(`ℹ️ No data found in ${tableName}.`);
        return;
    }

    console.log(`📥 Found ${data.length} rows in ${tableName}. Inserting into new database...`);

    // Insert into new (using upsert to avoid conflicts if re-run)
    const { error: insertError } = await newSupabase.from(tableName).upsert(data, { onConflict: tableName === 'site_settings' ? 'key' : 'id' });

    if (insertError) {
        console.error(`❌ Error inserting into ${tableName}:`, insertError.message);
    } else {
        console.log(`✅ Successfully migrated ${data.length} rows to ${tableName}.`);
    }
}

async function run() {
    const tables = ['registrations', 'speakers', 'team_members', 'partners', 'site_settings'];

    for (const table of tables) {
        await migrateTable(table);
    }

    console.log("🏁 Data migration process finished.");
}

run();

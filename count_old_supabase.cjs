const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manual .env parser
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2 && !parts[0].trim().startsWith('#')) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

// Using NEW_SUPABASE_URL and NEW_SUPABASE_ANON_KEY (from .env) to check the other Supabase instance
const supabase = createClient(env.NEW_SUPABASE_URL, env.NEW_SUPABASE_ANON_KEY);

async function countOldSupabase() {
    console.log(`📡 Connecting to: ${env.NEW_SUPABASE_URL}`);
    
    // We will test if 'registrations' exists on the second database config
    const { count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('❌ Error fetching from other Supabase:', error.message);
        return;
    }

    console.log(`✅ Success! Found ${count} registrations in the other Supabase database.`);
}

countOldSupabase();

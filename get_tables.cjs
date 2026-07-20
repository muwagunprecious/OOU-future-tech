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

const db = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function checkTables() {
    console.log('Querying Swagger/OpenAPI spec from PostgREST...');
    const res = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/`, {
        headers: {
            'apikey': env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${env.VITE_SUPABASE_ANON_KEY}`
        }
    });
    if (res.ok) {
        const spec = await res.json();
        console.log('Definitions found in database:', Object.keys(spec.definitions || {}));
    } else {
        console.error('Failed to query definitions:', res.status, await res.text());
    }
}

checkTables();

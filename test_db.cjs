
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic .env parser
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');
const env = {};
envLines.forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log(`📡 Connecting to: ${supabaseUrl}`);
    const { data, count, error } = await supabase
        .from('registrations')
        .select('*', { count: 'exact' });

    if (error) {
        console.error('❌ Error:', error.message);
    } else {
        console.log(`✅ Success! Found ${data.length} records in registrations table.`);
        console.log(`📊 Full count: ${count}`);
        if (data && data.length > 0) {
            console.log('Sample record:', data[0]);
        }
    }
}

test();

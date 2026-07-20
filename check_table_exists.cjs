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

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function testSelect() {
    const { data, error } = await supabase
        .from('tech_waitlist')
        .select('*')
        .limit(1);

    if (error) {
        console.error('❌ Table check failed:', error.message);
    } else {
        console.log('✅ Table tech_waitlist exists! Data sample:', data);
    }
}

testSelect();

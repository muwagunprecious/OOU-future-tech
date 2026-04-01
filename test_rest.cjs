
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

const url = `${env.VITE_SUPABASE_URL}/rest/v1/registrations?select=id,name&limit=5`;
const key = env.VITE_SUPABASE_ANON_KEY;

async function test() {
    console.log(`📡 Fetching from: ${url}`);
    try {
        const res = await fetch(url, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        });
        
        if (!res.ok) {
            const body = await res.text();
            throw new Error(`HTTP ${res.status}: ${body}`);
        }
        
        const data = await res.json();
        console.log(`✅ Success! Found ${data.length} records.`);
        console.log('Sample:', data);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

test();

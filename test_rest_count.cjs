
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

const url = `${env.VITE_SUPABASE_URL}/rest/v1/registrations?select=id&count=exact`;
const key = env.VITE_SUPABASE_ANON_KEY;

async function test() {
    console.log(`📡 Checking count at: ${url}`);
    try {
        const res = await fetch(url, {
            method: 'HEAD',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Range': '0-0'
            }
        });
        
        const count = res.headers.get('content-range');
        console.log(`✅ Success! Full count from Content-Range: ${count}`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

test();

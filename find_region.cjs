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

async function findRegion() {
    console.log('📡 Fetching headers from Supabase REST API...');
    try {
        const res = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/`, {
            method: 'GET',
            headers: {
                'apikey': env.VITE_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${env.VITE_SUPABASE_ANON_KEY}`
            }
        });
        
        console.log('Status:', res.status);
        console.log('Headers:');
        for (const [key, value] of res.headers.entries()) {
            console.log(`  ${key}: ${value}`);
        }
    } catch(e) {
        console.error('Error fetching:', e.message);
    }
}

findRegion();

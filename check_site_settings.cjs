
const https = require('https');
const fs = require('fs');

const envPath = 'c:\\Users\\TINGO-AI-010\\Documents\\OOUFUTURE CONFERENCE\\.env';
const envRaw = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envRaw.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        envConfig[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    }
});

const options = {
    hostname: envConfig.VITE_SUPABASE_URL.replace('https://', ''),
    path: '/rest/v1/site_settings',
    method: 'GET',
    headers: {
        'apikey': envConfig.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${envConfig.VITE_SUPABASE_ANON_KEY}`
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('✅ site_settings content:', data);
    });
});

req.on('error', (e) => { console.error('❌ Error:', e.message); });
req.end();

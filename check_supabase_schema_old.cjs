
const https = require('https');
const fs = require('fs');

// Load .env manually
const envPath = 'c:\\Users\\TINGO-AI-010\\Documents\\OOUFUTURE CONFERENCE\\.env';
const envRaw = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envRaw.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        envConfig[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    }
});

const supabaseUrl = envConfig.OLD_SUPABASE_URL;
const supabaseAnonKey = envConfig.OLD_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing OLD_SUPABASE credentials');
    process.exit(1);
}

const options = {
    hostname: supabaseUrl.replace('https://', ''),
    path: '/rest/v1/',
    method: 'GET',
    headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
    }
};

console.log(`📡 Fetching OLD Supabase OpenAPI spec from ${options.hostname}...`);

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const spec = JSON.parse(data);
            const tables = Object.keys(spec.definitions);
            console.log('--- OLD SUPABASE TABLES AND COLUMNS ---');
            tables.forEach(table => {
                console.log(`\nTABLE: ${table}`);
                const cols = spec.definitions[table].properties;
                if (cols) {
                    Object.keys(cols).forEach(c => {
                        console.log(`  - ${c} (${cols[c].type})`);
                    });
                }
            });
        } catch (e) {
            console.log('❌ Error parsing:', data.substring(0, 200));
        }
    });
});

req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
});

req.end();

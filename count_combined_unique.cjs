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

// Setup clients for both Supabase instances
const db1 = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
const db2 = createClient(env.NEW_SUPABASE_URL, env.NEW_SUPABASE_ANON_KEY);

async function countCombinedUnique() {
    console.log('📡 Querying both Supabase databases...');
    
    // DB 1 registrations
    let reg1 = [];
    try {
        const { data, error } = await db1.from('registrations').select('email');
        if (error) throw error;
        reg1 = data || [];
    } catch(e) {
        console.error('DB1 Reg error:', e.message);
    }
    
    // DB 1 founders_applications
    let founders1 = [];
    try {
        const { data, error } = await db1.from('founders_applications').select('email');
        if (error) throw error;
        founders1 = data || [];
    } catch(e) {
        console.error('DB1 Founders error:', e.message);
    }
    
    // DB 2 registrations
    let reg2 = [];
    try {
        const { data, error } = await db2.from('registrations').select('email');
        if (error) throw error;
        reg2 = data || [];
    } catch(e) {
        console.error('DB2 Reg error:', e.message);
    }

    const emailSet = new Set();

    // Collect all emails
    reg1.forEach(r => r.email && emailSet.add(r.email.trim().toLowerCase()));
    founders1.forEach(f => f.email && emailSet.add(f.email.trim().toLowerCase()));
    reg2.forEach(r => r.email && emailSet.add(r.email.trim().toLowerCase()));

    const uniqueDB1 = new Set([...reg1, ...founders1].map(x => x.email?.trim().toLowerCase()).filter(Boolean)).size;
    const uniqueDB2 = new Set(reg2.map(x => x.email?.trim().toLowerCase()).filter(Boolean)).size;

    console.log('\n📊 COMBINED UNIQUE EMAIL SUMMARY:');
    console.log(`- Unique in DB 1 (URL: ${env.VITE_SUPABASE_URL}): ${uniqueDB1}`);
    console.log(`- Unique in DB 2 (URL: ${env.NEW_SUPABASE_URL}): ${uniqueDB2}`);
    console.log(`- Combined Unique Emails (Both databases): **${emailSet.size}**`);
}

countCombinedUnique();

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

async function countTotalRaw() {
    console.log('📡 Fetching total records from both Supabase databases...');
    
    // DB 1 (VITE_SUPABASE_URL)
    const { count: countReg1, error: err1 } = await db1.from('registrations').select('*', { count: 'exact', head: true });
    const { count: countF1, error: err2 } = await db1.from('founders_applications').select('*', { count: 'exact', head: true });
    
    // DB 2 (NEW_SUPABASE_URL)
    const { count: countReg2, error: err3 } = await db2.from('registrations').select('*', { count: 'exact', head: true });

    if (err1) console.error('Error DB1 Reg:', err1.message);
    if (err2) console.error('Error DB1 Founders:', err2.message);
    if (err3) console.error('Error DB2 Reg:', err3.message);

    const db1Total = (countReg1 || 0) + (countF1 || 0);
    const db2Total = (countReg2 || 0);
    const combinedTotal = db1Total + db2Total;

    console.log('\n📊 RAW EMAIL/RECORD COUNTS (TOTAL):');
    console.log(`- Database 1 Registrations: ${countReg1 || 0}`);
    console.log(`- Database 1 Co-founder Applications: ${countF1 || 0}`);
    console.log(`- Database 1 Total: ${db1Total}`);
    console.log('------------------------------');
    console.log(`- Database 2 Registrations: ${countReg2 || 0}`);
    console.log(`- Database 2 Total: ${db2Total}`);
    console.log('------------------------------');
    console.log(`- Combined Total (All registrations/applications): **${combinedTotal}**`);
}

countTotalRaw();

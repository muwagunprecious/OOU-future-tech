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

async function listAll() {
    console.log('📡 Fetching ALL founders...\n');

    const { data, error } = await supabase
        .from('founders_applications')
        .select('id, name, email, user_type, status, ai_summary, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No founders found.');
        return;
    }

    const matched = data.filter(u => u.status === 'matched');
    const unmatched = data.filter(u => u.status !== 'matched');

    console.log(`📊 TOTAL: ${data.length} founder(s)\n`);

    console.log('═'.repeat(65));
    console.log(`  ✅ MATCHED (${matched.length})`);
    console.log('═'.repeat(65));
    if (matched.length === 0) {
        console.log('  (none)\n');
    } else {
        matched.forEach((u, i) => {
            console.log(`  ${i + 1}. ${u.name || 'N/A'}`);
            console.log(`     📧 ${u.email}`);
            console.log(`     🏷  ${u.user_type || 'N/A'} | Status: ${u.status}`);
            console.log(`     📅 ${new Date(u.created_at).toLocaleDateString()}`);
            console.log('');
        });
    }

    console.log('═'.repeat(65));
    console.log(`  ⏳ UNMATCHED / WAITING (${unmatched.length})`);
    console.log('═'.repeat(65));
    if (unmatched.length === 0) {
        console.log('  (none)\n');
    } else {
        unmatched.forEach((u, i) => {
            console.log(`  ${i + 1}. ${u.name || 'N/A'}`);
            console.log(`     📧 ${u.email}`);
            console.log(`     🏷  ${u.user_type || 'N/A'} | Status: ${u.status}`);
            console.log(`     📅 ${new Date(u.created_at).toLocaleDateString()}`);
            console.log('');
        });
    }
}

listAll();

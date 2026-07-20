const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manual .env parser (avoids dotenv issues)
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

async function listUnmatched() {
    console.log('📡 Fetching unmatched founders...\n');

    const { data, error } = await supabase
        .from('founders_applications')
        .select('id, name, email, user_type, status, ai_summary, created_at')
        .eq('status', 'waiting')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No unmatched founders found.');
        return;
    }

    console.log(`✅ Found ${data.length} unmatched founder(s):\n`);
    console.log('─'.repeat(60));
    data.forEach((u, i) => {
        console.log(`${i + 1}. ${u.name || 'N/A'}`);
        console.log(`   📧 Email: ${u.email}`);
        console.log(`   🏷  Type:  ${u.user_type || 'N/A'}`);
        console.log(`   📅 Joined: ${new Date(u.created_at).toLocaleDateString()}`);
        console.log(`   📝 Summary: ${(u.ai_summary || '').substring(0, 80)}...`);
        console.log('─'.repeat(60));
    });
}

listUnmatched();

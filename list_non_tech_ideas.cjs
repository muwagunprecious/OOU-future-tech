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

async function listNonTechIdeas() {
    console.log('📡 Fetching non-technical founders & their startup details...\n');

    const { data, error } = await supabase
        .from('founders_applications')
        .select('name, email, user_type, startup_name, ai_summary, tech_stack')
        .or('user_type.eq.non_technical_founder,user_type.eq.Founder,user_type.eq.founder')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No non-technical founders found.');
        return;
    }

    data.forEach((u, i) => {
        console.log(`${i + 1}. 👤 Name: ${u.name || 'N/A'}`);
        console.log(`   📧 Email: ${u.email || 'N/A'}`);
        console.log(`   💡 Startup Name: ${u.startup_name || 'N/A'}`);
        console.log(`   📝 Idea & Summary: ${u.ai_summary || 'N/A'}`);
        if (u.tech_stack) {
            console.log(`   🛠️  Skills/Tech Wanted: ${u.tech_stack}`);
        }
        console.log('─'.repeat(60));
    });
}

listNonTechIdeas();

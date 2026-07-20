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

async function findTechFounders() {
    console.log('📡 Fetching technical founders info...');
    const { data, error } = await supabase
        .from('founders_applications')
        .select('id, name, email, whatsapp_number, user_type, ai_summary')
        .eq('user_type', 'technical_founder');

    if (error) {
        console.error('Error fetching technical founders:', error.message);
        return;
    }

    console.log('\n💻 Technical Founders found in DB:');
    data.forEach(tf => {
        console.log(`- ID: ${tf.id}`);
        console.log(`  Name: ${tf.name}`);
        console.log(`  Email: ${tf.email}`);
        console.log(`  WhatsApp: ${tf.whatsapp_number}`);
        console.log(`  Summary: ${tf.ai_summary}`);
        console.log('');
    });

    console.log('📡 Fetching Isaac Ayomide Esther info...');
    const { data: isaac, error: isaacErr } = await supabase
        .from('founders_applications')
        .select('id, name, email, whatsapp_number, user_type, ai_summary')
        .eq('email', 'isaacayomideone@gmail.com')
        .single();

    if (isaacErr) {
        console.error('Error fetching Isaac:', isaacErr.message);
        return;
    }

    console.log('👤 Isaac Info:');
    console.log(`- ID: ${isaac.id}`);
    console.log(`  Name: ${isaac.name}`);
    console.log(`  Email: ${isaac.email}`);
    console.log(`  WhatsApp: ${isaac.whatsapp_number}`);
    console.log(`  Summary: ${isaac.ai_summary}`);
}

findTechFounders();

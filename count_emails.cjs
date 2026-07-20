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

async function countEmails() {
    console.log('📡 Fetching email count from Supabase...');
    
    // Fetch all non-null emails from registrations table
    const { data: regData, error: regError } = await supabase
        .from('registrations')
        .select('email');

    // Fetch all non-null emails from founders_applications table
    const { data: foundersData, error: foundersError } = await supabase
        .from('founders_applications')
        .select('email');

    if (regError) {
        console.error('Error fetching registrations:', regError.message);
    }
    if (foundersError) {
        console.error('Error fetching founders_applications:', foundersError.message);
    }

    const regEmails = (regData || []).map(r => r.email).filter(Boolean);
    const foundersEmails = (foundersData || []).map(f => f.email).filter(Boolean);

    // Combine and find unique emails across the system
    const allEmails = [...regEmails, ...foundersEmails];
    const uniqueEmails = [...new Set(allEmails)];

    console.log('\n📊 DATABASE EMAIL COUNTS:');
    console.log(`- Registrations Table (All Attendees): ${regEmails.length} emails`);
    console.log(`- Co-founder Applications Table: ${foundersEmails.length} emails`);
    console.log(`- Unique Emails Across Both Tables: ${uniqueEmails.length} emails`);
}

countEmails();

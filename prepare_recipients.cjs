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

const db1 = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
const db2 = createClient(env.NEW_SUPABASE_URL, env.NEW_SUPABASE_ANON_KEY);

async function prepareRecipients() {
    console.log('📡 Fetching emails from all tables across both databases...');
    
    // DB 1 registrations
    let reg1 = [];
    try {
        const { data, error } = await db1.from('registrations').select('email, name');
        if (!error && data) reg1 = data;
    } catch (e) {
        console.error('Error fetching DB1 registrations:', e.message);
    }
    
    // DB 1 founders applications
    let founders1 = [];
    try {
        const { data, error } = await db1.from('founders_applications').select('email, name');
        if (!error && data) founders1 = data;
    } catch (e) {
        console.error('Error fetching DB1 founders_applications:', e.message);
    }

    // DB 2 registrations
    let reg2 = [];
    try {
        const { data, error } = await db2.from('registrations').select('email, name');
        if (!error && data) reg2 = data;
    } catch (e) {
        console.error('Error fetching DB2 registrations:', e.message);
    }

    // Combine and deduplicate by email
    const emailToNameMap = new Map();

    const addRecipient = (item) => {
        if (!item || !item.email) return;
        const email = item.email.trim().toLowerCase();
        // Basic email validation
        if (email.includes('@') && email.includes('.') && !email.includes('test') && !email.includes('example.com')) {
            const name = item.name ? item.name.trim() : 'Innovator';
            // Keep the best name we can find
            if (!emailToNameMap.has(email) || emailToNameMap.get(email) === 'Innovator') {
                emailToNameMap.set(email, name);
            }
        }
    };

    reg1.forEach(addRecipient);
    founders1.forEach(addRecipient);
    reg2.forEach(addRecipient);

    const recipients = [];
    emailToNameMap.forEach((name, email) => {
        recipients.push({ email, name });
    });

    console.log(`\n📊 Prepared ${recipients.length} unique validated recipients.`);
    
    // Save to recipients.json
    fs.writeFileSync(path.join(__dirname, 'recipients.json'), JSON.stringify(recipients, null, 2), 'utf8');
    console.log('💾 Saved deduplicated list to recipients.json.');
}

prepareRecipients();

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

async function findDuplicates() {
    console.log('📡 Fetching all emails for duplicate analysis...');
    
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

    const allEmails = [];

    reg1.forEach(r => r.email && allEmails.push(r.email.trim().toLowerCase()));
    founders1.forEach(f => f.email && allEmails.push(f.email.trim().toLowerCase()));
    reg2.forEach(r => r.email && allEmails.push(r.email.trim().toLowerCase()));

    const emailCounts = {};
    allEmails.forEach(email => {
        emailCounts[email] = (emailCounts[email] || 0) + 1;
    });

    const duplicates = [];
    let duplicateOccurrences = 0;
    
    Object.keys(emailCounts).forEach(email => {
        if (emailCounts[email] > 1) {
            duplicates.push({ email, count: emailCounts[email] });
            duplicateOccurrences += (emailCounts[email] - 1); // number of extra copies
        }
    });

    console.log('\n📊 DUPLICATE EMAIL REPORT:');
    console.log(`- Total Raw Emails Collected: ${allEmails.length}`);
    console.log(`- Total Unique Emails: ${Object.keys(emailCounts).length}`);
    console.log(`- Total Duplicate Emails (Distinct Addresses): ${duplicates.length}`);
    console.log(`- Total Duplicated Rows (Extra records to clean): ${duplicateOccurrences}`);
    
    if (duplicates.length > 0) {
        console.log('\n🔍 Top 10 Duplicate Examples:');
        duplicates.slice(0, 10).forEach((d, idx) => {
            console.log(`  ${idx + 1}. ${d.email} (Appears ${d.count} times)`);
        });
    }
}

findDuplicates();

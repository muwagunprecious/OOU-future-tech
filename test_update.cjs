
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic .env parser
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');
const env = {};
envLines.forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdate() {
    console.log(`📡 Attempting update with ANON key...`);
    // Find one record
    const { data: attendees } = await supabase.from('registrations').select('ticket_id, checked_in').limit(1);
    if (!attendees || attendees.length === 0) {
        console.error('❌ No attendees found to test update.');
        return;
    }
    
    const attendee = attendees[0];
    const newStatus = !attendee.checked_in;
    
    const { data, error } = await supabase
        .from('registrations')
        .update({ checked_in: newStatus })
        .eq('ticket_id', attendee.ticket_id)
        .select();

    if (error) {
        console.error('❌ Update failed with ANON key:', error.message);
    } else {
        console.log(`✅ Update successful! Toggled ${attendee.ticket_id} to ${newStatus}.`);
        // Revert it
        await supabase.from('registrations').update({ checked_in: attendee.checked_in }).eq('ticket_id', attendee.ticket_id);
    }
}

testUpdate();

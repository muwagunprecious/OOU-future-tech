const { createClient } = require('@supabase/supabase-js');

// Current Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Old Supabase
const oldSupabaseUrl = 'https://addtzgrmmoybmvasmxss.supabase.co';
const oldSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZHR6Z3JtbW95Ym12YXNteHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA5NjQsImV4cCI6MjA4OTIzNjk2NH0.3HxmO3dim9C3gSR7TvYNiEUvu0NgiItDIZgB1408rN4';
const oldSupabase = createClient(oldSupabaseUrl, oldSupabaseAnonKey);

async function importLegacyData() {
    console.log('🚀 Fetching legacy attendees...');
    const { data: legacyAttendees, error: fetchError } = await oldSupabase
        .from('registrations')
        .select('name, email, ticket_id, ticket_type');

    if (fetchError) {
        console.error('❌ Error fetching from old DB:', fetchError.message);
        return;
    }

    console.log(`📡 Found ${legacyAttendees.length} records in legacy database.`);

    let successCount = 0;
    let conflictCount = 0;
    let errorCount = 0;

    for (const attendee of legacyAttendees) {
        process.stdout.write(`⏳ Importing: ${attendee.email}... `);
        
        const { error: insertError } = await supabase
            .from('registrations')
            .insert([{
                ...attendee,
                // We'll try to set is_legacy if the column was somehow added,
                // otherwise it'll just ignore it if the API is configured correctly
                // or fail if it's a strict schema.
                // Since we suspect columns aren't there, we'll stick to core columns.
            }]);

        if (insertError) {
            if (insertError.code === '23505') { // Unique violation
                console.log('⏭️ Already exists.');
                conflictCount++;
            } else {
                console.log('❌ Error:', insertError.message);
                errorCount++;
            }
        } else {
            console.log('✅ Done.');
            successCount++;
        }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Success: ${successCount}`);
    console.log(`Conflicts: ${conflictCount}`);
    console.log(`Errors: ${errorCount}`);
}

importLegacyData();

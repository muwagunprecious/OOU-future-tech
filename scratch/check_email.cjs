const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://addtzgrmmoybmvasmxss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZHR6Z3JtbW95Ym12YXNteHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA5NjQsImV4cCI6MjA4OTIzNjk2NH0.3HxmO3dim9C3gSR7TvYNiEUvu0NgiItDIZgB1408rN4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const email = 'Sopemipo04@gmail.com';
    const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .ilike('email', email.trim());

    if (error) {
        console.error('Error checking database:', error);
    } else {
        console.log(`Results for ${email}:`, JSON.stringify(data, null, 2));
    }
}

check();

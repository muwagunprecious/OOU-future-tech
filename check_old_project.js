import { createClient } from '@supabase/supabase-js';

const oldUrl = 'https://addtzgrmmoybmvasmxss.supabase.co';
const oldKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZHR6Z3JtbW95Ym12YXNteHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjA5NjQsImV4cCI6MjA4OTIzNjk2NH0.3HxmO3dim9C3gSR7TvYNiEUvu0NgiItDIZgB1408rN4';
const supabase = createClient(oldUrl, oldKey);

async function check() {
    console.log('📡 Checking OLD Supabase project for "founders_connect"...');
    const { data, error } = await supabase.from('founders_connect').select('*').limit(1);
    
    if (error) {
        console.error('❌ Table check failed on OLD project:', error.message);
    } else {
        console.log('✅ Found "founders_connect" in the OLD project!');
    }
}

check();

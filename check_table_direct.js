import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvghrhwkwlydpdlenrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2hyaHdrd2x5ZHBkbGVucnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjE5ODEsImV4cCI6MjA4NzQzNzk4MX0.Bdrw5gQqcoVIwonYoMIfFno3BcnxnIfEIVumbWEnkx8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('📡 Checking table "founders_connect"...');
    const { data, error } = await supabase.from('founders_connect').select('*').limit(1);
    
    if (error) {
        console.error('❌ Table check failed:', error.message);
        console.log('Error details:', error);
    } else {
        console.log('✅ Table exists and is accessible!');
    }
}

check();

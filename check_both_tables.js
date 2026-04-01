import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvghrhwkwlydpdlenrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2hyaHdrd2x5ZHBkbGVucnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjE5ODEsImV4cCI6MjA4NzQzNzk4MX0.Bdrw5gQqcoVIwonYoMIfFno3BcnxnIfEIVumbWEnkx8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('📡 Checking connection by selecting from "registrations"...');
    const { data: regData, error: regError } = await supabase.from('registrations').select('*').limit(1);
    
    if (regError) {
        console.error('❌ registrations check failed:', regError.message);
    } else {
        console.log('✅ registrations check successful! Found:', regData.length, 'rows');
    }

    console.log('📡 Checking table "founders_connect"...');
    const { data: foundersData, error: foundersError } = await supabase.from('founders_connect').select('*').limit(1);
    
    if (foundersError) {
        console.error('❌ founders_connect check failed:', foundersError.message);
        console.log('Error code:', foundersError.code);
    } else {
        console.log('✅ founders_connect check successful! Found:', foundersData.length, 'rows');
    }
}

check();

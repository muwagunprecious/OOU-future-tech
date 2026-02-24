import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvghrhwkwlydpdlenrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2hyaHdrd2x5ZHBkbGVucnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjE5ODEsImV4cCI6MjA4NzQzNzk4MX0.Bdrw5gQqcoVIwonYoMIfFno3BcnxnIfEIVumbWEnkx8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseAndExplain() {
    console.log('🔍 Final Database Diagnostic...');

    // 1. Fetch current data
    const { data: regs, error: fetchError } = await supabase
        .from('registrations')
        .select('name, email, ticket_id');

    if (fetchError) {
        console.error('❌ Error fetching data:', fetchError.message);
        return;
    }

    console.log(`📊 Found ${regs.length} records in 'registrations' table.`);
    if (regs.length > 0) {
        console.log('📝 Sample Records:');
        regs.slice(0, 3).forEach(r => console.log(`   - ${r.name} (${r.email}) [${r.ticket_id}]`));
    }

    // 2. Explaining why deletion fails
    console.log('\n🛡️ RLS ANALYSIS:');
    console.log('The "registrations" table has RLS enabled, but NO policy currently permits DELETE operations via the Public API (anon key).');
    console.log('To fix this, you need to run one of the following in the Supabase SQL Editor:');
    console.log('\nMETHOD A (One-time wipe):');
    console.log('   DELETE FROM registrations;');
    console.log('\nMETHOD B (Allow admin deletion from site - RECOMMENDED):');
    console.log('   CREATE POLICY "Allow individual delete" ON registrations FOR DELETE USING (true);');
}

diagnoseAndExplain();

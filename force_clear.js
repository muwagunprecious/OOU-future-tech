import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvghrhwkwlydpdlenrzo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2hyaHdrd2x5ZHBkbGVucnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjE5ODEsImV4cCI6MjA4NzQzNzk4MX0.Bdrw5gQqcoVIwonYoMIfFno3BcnxnIfEIVumbWEnkx8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceClearRegistrations() {
    console.log('🚀 Starting Force Cleanup of registrations table...');

    // 1. Get initial count
    const { count: initialCount, error: countError } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('❌ Error checking initial state:', countError.message);
        return;
    }

    console.log(`📊 Current record count: ${initialCount}`);

    if (initialCount === 0) {
        console.log('✅ Table is already empty. No action needed.');
        return;
    }

    // 2. Attempt deletion
    // Using a more generic filter to ensure all records are targeted
    const { data, error: deleteError } = await supabase
        .from('registrations')
        .delete()
        .not('id', 'is', null); // This targets every record with a non-null ID

    if (deleteError) {
        console.error('❌ Deletion failed:', deleteError.message);

        // If RLS is blocking, try a different filter
        console.log('🔄 Retrying with alternative filter...');
        const { error: retryError } = await supabase
            .from('registrations')
            .delete()
            .neq('name', '___NON_EXISTENT_NAME___');

        if (retryError) {
            console.error('❌ Retry failed:', retryError.message);
            return;
        }
    }

    // 3. Verify final count
    const { count: finalCount, error: verifyError } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

    if (verifyError) {
        console.error('❌ Error verifying final state:', verifyError.message);
    } else {
        console.log(`📉 Final record count: ${finalCount}`);
        if (finalCount === 0) {
            console.log('✨ SUCCESS: All registrations have been wiped.');
        } else {
            console.error('⚠️ WARNING: some records still remain. This might be due to RLS or active connections.');
        }
    }
}

forceClearRegistrations();

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanRegistrations() {
  console.log('🚀 Starting deletion of all attendee records from registrations table...');

  // Check initial count
  const { count: initialCount } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true });

  console.log(`Initial count in registrations: ${initialCount}`);

  // Delete in batches of IDs to ensure complete deletion even with Supabase REST limits
  let remaining = initialCount || 0;
  let totalDeleted = 0;

  while (remaining > 0) {
    // Fetch a batch of IDs
    const { data: rows, error: fetchErr } = await supabase
      .from('registrations')
      .select('id')
      .limit(500);

    if (fetchErr) {
      console.error('Error fetching batch:', fetchErr.message);
      break;
    }

    if (!rows || rows.length === 0) break;

    const ids = rows.map(r => r.id);
    const { error: delErr } = await supabase
      .from('registrations')
      .delete()
      .in('id', ids);

    if (delErr) {
      console.error('Error deleting batch:', delErr.message);
      break;
    }

    totalDeleted += ids.length;
    console.log(`🗑️ Deleted batch of ${ids.length} records. Total deleted so far: ${totalDeleted}`);

    const { count: currentCount } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    remaining = currentCount || 0;
    console.log(`Remaining in registrations: ${remaining}`);
  }

  // Final verification
  const { count: finalCount } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✅ Finished cleaning registrations table!`);
  console.log(`Final count: ${finalCount} records remaining.`);
}

cleanRegistrations();

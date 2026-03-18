import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('pitches').select('id, startup_name, status');
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.table(data);
    }
}
check();

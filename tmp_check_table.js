import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
    const { count, error } = await supabase.from('pitches').select('*', { count: 'exact', head: true });
    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Count:", count);
    }
}

check();

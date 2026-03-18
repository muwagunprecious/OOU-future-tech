const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
    try {
        const { count, error } = await supabase.from('pitches').select('*', { count: 'exact', head: true });
        if (error) {
            console.log("Error:", error.message);
        } else {
            console.log("Count:", count);
        }
    } catch (e) {
        console.log("Caught Error:", e.message);
    }
}

check();

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('📡 Checking table founders_connect...');
    const { data, error } = await supabase.from('founders_connect').select('*').limit(1);
    
    if (error) {
        console.error('❌ Table check failed:', error.message);
        if (error.code === '42P01') {
            console.log('💡 HINT: The table "founders_connect" does not exist.');
        } else if (error.code === '42501') {
            console.log('💡 HINT: Permission denied (Row Level Security).');
        }
    } else {
        console.log('✅ Table exists and is accessible!');
    }
}

check();

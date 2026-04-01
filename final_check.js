import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('📡 Checking URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('📡 Checking table "founders_connect"...');
    const { data, error } = await supabase.from('founders_connect').select('*').limit(1);
    
    if (error) {
        console.error('❌ Table check failed:', error.message);
    } else {
        console.log('✅ Table "founders_connect" is found and accessible!');
    }
}

check();

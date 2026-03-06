
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const emailsToDelete = [
    'quartzandexambritefounders@gmail.com',
    'usmanjoseph2121@gmail.com',
    'ademuwagunmayokun@gmail.com',
    'professorprecious03@gmail.com',
    'ademuwagunremi60@gmail.com'
];

async function cleanup() {
    console.log('Starting cleanup...');
    for (const email of emailsToDelete) {
        const { error } = await supabase
            .from('registrations')
            .delete()
            .eq('email', email);

        if (error) {
            console.error(`Error deleting ${email}:`, error.message);
        } else {
            console.log(`Successfully deleted ${email}`);
        }
    }
    console.log('Cleanup finished.');
}

cleanup();

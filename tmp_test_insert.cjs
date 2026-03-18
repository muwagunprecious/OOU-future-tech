const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
    try {
        const { data, error } = await supabase
            .from('pitches')
            .insert([{
                name: 'Test Name',
                email: 'test@example.com',
                startup_name: 'Test Startup',
                category: 'Student Startup',
                pitch_description: 'Test Pitch'
            }]);

        if (error) {
            console.log("Error:", error.message);
            if (error.code === '42P01') {
                console.log("CONFIRMED: Table 'pitches' does not exist.");
            }
        } else {
            console.log("Success! Data inserted via Service Role Key.");
        }
    } catch (e) {
        console.log("Caught Error:", e.message);
    }
}

test();

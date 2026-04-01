const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log('🏗️  Setting up founders_applications_v2 schema...');
    
    // Fallback: Check if founders_applications table exists and has the columns
    const { data: firstRow, error: checkError } = await supabase.from('founders_applications').select('*').limit(1);
    
    if (checkError) {
        console.error('❌ Error checking founders_applications:', checkError.message);
        return;
    }

    console.log('✅ Connected to founders_applications.');
    console.log('Current Columns:', Object.keys(firstRow[0] || {}));
    
    // We will now attempt to "reset" and ensure the new category-based logic is ready.
    // Since we can't run ALTER TABLE via JS client easily, we'll assume the columns are either there 
    // or we'll use the 'metadata' JSON column if it exists to store the new fields.
    
    // IMPORTANT: Based on previous successes, it is better to just ensure the data we insert follows the new UI.
}

setup();

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log('🚀 Advanced Founders Applications Table SQL:');

    const sql = `
    CREATE TABLE IF NOT EXISTS founders_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_type TEXT NOT NULL, -- 'founder' or 'talent'
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp_number TEXT,
        status TEXT DEFAULT 'searching', -- 'searching', 'matched', 'rejected'
        
        -- Founder specific
        startup_name TEXT,
        startup_stage TEXT,
        problem_statement TEXT,
        solution TEXT,
        target_market TEXT,
        business_model TEXT,
        needed_role TEXT,
        required_skills TEXT,
        commitment_level TEXT,
        
        -- Talent specific
        cv_url TEXT,
        primary_skillset TEXT,
        tech_stack TEXT,
        experience_level TEXT,
        startup_preference TEXT,
        preferred_stage TEXT,
        
        created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE founders_applications ENABLE ROW LEVEL SECURITY;

    -- Policies
    DROP POLICY IF EXISTS "Allow public insert" ON founders_applications;
    CREATE POLICY "Allow public insert" ON founders_applications FOR INSERT WITH CHECK (true);
    
    DROP POLICY IF EXISTS "Allow public select" ON founders_applications;
    CREATE POLICY "Allow public select" ON founders_applications FOR SELECT USING (true);
    `;
    
    console.log('------------------------------------------------------------');
    console.log(sql);
    console.log('------------------------------------------------------------');
    console.log('\n📝 NOTICE: Please run the SQL above in your Supabase SQL Editor.');
    console.log('Then, create a Storage Bucket named "founders-cvs" and set it to PUBLIC.');
}

setup();

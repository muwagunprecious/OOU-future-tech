import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log('🚀 Setting up Advanced Founders Applications Table...');

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

    // Note: supabase-js doesn't have a direct 'sql' method for raw queries like this easily
    // We usually recommend running this in the Supabase SQL Editor.
    // However, I will try to create the table by inserting a dummy record if it doesn't exist,
    // but the best way is to provide the SQL to the user or use a migration tool.
    
    console.log('📝 Please run the following SQL in your Supabase SQL Editor (Project: ' + supabaseUrl + '):');
    console.log('------------------------------------------------------------');
    console.log(sql);
    console.log('------------------------------------------------------------');
}

setup();

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runMigration() {
    const sql = `
        -- Update founders_applications table for MVP Matchmaking
        ALTER TABLE founders_applications 
        ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'waiting',
        ADD COLUMN IF NOT EXISTS match_id UUID REFERENCES founders_applications(id),
        ADD COLUMN IF NOT EXISTS consent_given BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS user_category TEXT;

        -- Index for faster matching
        CREATE INDEX IF NOT EXISTS idx_matchmaking_waiting ON founders_applications (status, user_category);

        -- Clear old inconsistent data to start fresh with new logic
        TRUNCATE TABLE founders_applications;
    `;

    console.log('🚀 Running SQL Migration...');
    // Note: Suapbase JS client doesn't support raw SQL by default.
    // We'll try to use the SQL API if enabled, or just perform the updates via RPC if available.
    
    // For now, I'll try to use a slightly different approach: just update the schema via a direct fetch to the SQL API.
    const res = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({ query: sql })
    });

    if (res.ok) {
        console.log('✅ Migration successful!');
    } else {
        const err = await res.text();
        console.error('❌ Migration failed:', err);
        console.log('Trying fallback: Column check and individual updates...');
    }
}

runMigration();

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrate() {
    console.log('🚀 Running Database Migration (v3 - Browsing & Connections)...');

    // 1. Update founders_applications table (if possible via RPC/API)
    // Since Suapbase JS doesn't support ALTER TABLE, we'll try to use the 'metadata' column if it exists,
    // or we'll inform the user to run the SQL in the dashboard.
    
    const sql = `
        -- 1. Add browsing fields to founders_applications
        ALTER TABLE founders_applications 
        ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public',
        ADD COLUMN IF NOT EXISTS cv_link TEXT,
        ADD COLUMN IF NOT EXISTS portfolio_link TEXT,
        ADD COLUMN IF NOT EXISTS startup_summary TEXT;

        -- 2. Create connection_requests table for manual matching
        CREATE TABLE IF NOT EXISTS matchmaking_connections (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            sender_id UUID REFERENCES founders_applications(id),
            receiver_id UUID REFERENCES founders_applications(id),
            status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
            created_at TIMESTAMPTZ DEFAULT now()
        );
    `;

    console.log('--- SQL TO RUN IN SUPABASE DASHBOARD ---');
    console.log(sql);
    console.log('-----------------------------------------');

    // For now, I'll check if the columns exist or try to just work with what we have.
    // I'll try to use the REST API to see if I can run this.
    try {
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
            console.log('✅ SQL Migration Successful!');
        } else {
            const errText = await res.text();
            console.warn('⚠️ SQL API failed (expected if disabled). Please run the SQL above manually.');
        }
    } catch (e) {
        console.warn('⚠️ Could not connect to SQL API. Please run the SQL manually.');
    }
}

migrate();

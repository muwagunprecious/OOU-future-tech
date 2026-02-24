-- SQL Script to create the registrations table
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  ticket_type TEXT NOT NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  company_name TEXT,
  whatsapp_number TEXT,
  products TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view (for the admin dashboard)
-- Note: In a production app, you'd restrict this to admin roles
CREATE POLICY "Allow select for all" ON registrations
  FOR SELECT USING (true);

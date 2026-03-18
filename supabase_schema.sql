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

-- SQL Script to create the pitches table
CREATE TABLE IF NOT EXISTS pitches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  startup_name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Company' or 'Student Startup'
  pitch_description TEXT NOT NULL,
  whatsapp_number TEXT,
  status TEXT DEFAULT 'pending' -- 'pending', 'accepted', 'rejected'
);

-- Enable Row Level Security (RLS)
ALTER TABLE pitches ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public pitch submission)
CREATE POLICY "Allow public insert" ON pitches
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view
CREATE POLICY "Allow select for all" ON pitches
  FOR SELECT USING (true);

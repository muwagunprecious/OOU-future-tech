-- Create tech_waitlist table
CREATE TABLE IF NOT EXISTS tech_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  track TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE tech_waitlist ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists and create
DROP POLICY IF EXISTS "Allow public insert to tech_waitlist" ON tech_waitlist;
CREATE POLICY "Allow public insert to tech_waitlist" ON tech_waitlist FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select from tech_waitlist" ON tech_waitlist;
CREATE POLICY "Allow public select from tech_waitlist" ON tech_waitlist FOR SELECT USING (true);

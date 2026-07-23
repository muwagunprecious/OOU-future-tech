-- Drop existing tables/policies cleanly
DROP POLICY IF EXISTS "Allow public all" ON custom_modules;
DROP POLICY IF EXISTS "Allow public all" ON peer_submissions;
DROP POLICY IF EXISTS "Allow public all" ON manual_grades;
DROP TABLE IF EXISTS custom_modules CASCADE;
DROP TABLE IF EXISTS peer_submissions CASCADE;
DROP TABLE IF EXISTS manual_grades CASCADE;

-- Custom modules created by admin
CREATE TABLE custom_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  track TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  lessons JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE custom_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all" ON custom_modules FOR ALL USING (true);

-- Peer group submissions
CREATE TABLE peer_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort TEXT NOT NULL,
  track TEXT NOT NULL,
  module_index INTEGER DEFAULT 1,
  group_name TEXT NOT NULL,
  members JSONB DEFAULT '[]'::jsonb,
  submission_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE peer_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all" ON peer_submissions FOR ALL USING (true);

-- Admin manual grades
CREATE TABLE manual_grades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_email TEXT NOT NULL,
  student_name TEXT,
  cohort TEXT NOT NULL,
  track TEXT NOT NULL,
  module_index INTEGER NOT NULL,
  score INTEGER DEFAULT 0,
  feedback TEXT,
  graded_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE manual_grades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all" ON manual_grades FOR ALL USING (true);

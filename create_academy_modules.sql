-- Course Modules system for the Academy
-- Run this in the Supabase SQL Editor

-- 1. Modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  track TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON course_modules FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON course_modules FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON course_modules FOR DELETE USING (true);

-- 2. Lessons table (videos + notes inside each module)
CREATE TABLE IF NOT EXISTS module_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  video_url TEXT,
  notes TEXT,
  order_index INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE module_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON module_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON module_lessons FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON module_lessons FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON module_lessons FOR DELETE USING (true);

-- 3. Module releases (which modules are released to which cohorts)
CREATE TABLE IF NOT EXISTS module_releases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  cohort TEXT NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(module_id, cohort)
);

ALTER TABLE module_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON module_releases FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON module_releases FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON module_releases FOR DELETE USING (true);

-- 4. Module tasks (admin adds daily tasks for each module)
CREATE TABLE IF NOT EXISTS module_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT DEFAULT 'assignment',
  due_date DATE
);

ALTER TABLE module_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON module_tasks FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON module_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON module_tasks FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON module_tasks FOR DELETE USING (true);

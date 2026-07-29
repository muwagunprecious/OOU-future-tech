CREATE TABLE IF NOT EXISTS peer_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort TEXT NOT NULL,
  track TEXT NOT NULL,
  module_index INTEGER NOT NULL,
  group_number INTEGER NOT NULL,
  members JSONB DEFAULT '[]'::jsonb,
  is_unpaired BOOLEAN DEFAULT false,
  task_description TEXT,
  submission_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE peer_groups ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Allow public all" ON peer_groups FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

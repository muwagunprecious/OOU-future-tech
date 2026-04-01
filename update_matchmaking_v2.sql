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

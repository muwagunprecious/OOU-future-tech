-- Add status and visibility to users
ALTER TABLE matchmaking_users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'waiting' CHECK (status IN ('waiting', 'matching', 'matched'));
ALTER TABLE matchmaking_users ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private'));

-- Update matches table for magic links and decisions
ALTER TABLE matchmaking_matches ADD COLUMN IF NOT EXISTS user1_token TEXT;
ALTER TABLE matchmaking_matches ADD COLUMN IF NOT EXISTS user2_token TEXT;
ALTER TABLE matchmaking_matches ADD COLUMN IF NOT EXISTS user1_decision TEXT DEFAULT 'pending' CHECK (user1_decision IN ('pending', 'accepted', 'rejected'));
ALTER TABLE matchmaking_matches ADD COLUMN IF NOT EXISTS user2_decision TEXT DEFAULT 'pending' CHECK (user2_decision IN ('pending', 'accepted', 'rejected'));
ALTER TABLE matchmaking_matches ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ DEFAULT now() + INTERVAL '72 hours';

-- Add unique constraint to avoid double matching
-- ALTER TABLE matchmaking_matches ADD CONSTRAINT unique_match_pair UNIQUE (founder_id, technical_id);

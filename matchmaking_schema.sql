-- Core User Profile
CREATE TABLE IF NOT EXISTS matchmaking_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  whatsapp TEXT,
  user_type TEXT CHECK (user_type IN ('founder', 'technical')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Startup Profiles
CREATE TABLE IF NOT EXISTS matchmaking_startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES matchmaking_users(id) ON DELETE CASCADE,
  name TEXT,
  industry TEXT,
  stage TEXT,
  problem TEXT,
  solution TEXT,
  market TEXT,
  required_skills TEXT[], -- Array of strings
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Technical Profiles
CREATE TABLE IF NOT EXISTS matchmaking_technical_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES matchmaking_users(id) ON DELETE CASCADE,
  skills TEXT[], -- Array of strings
  experience_score INTEGER DEFAULT 0, -- 0-100
  preferred_industry TEXT,
  cv_url TEXT,
  cv_summary TEXT,
  experience_level TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Match Records
CREATE TABLE IF NOT EXISTS matchmaking_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES matchmaking_users(id),
  technical_id UUID REFERENCES matchmaking_users(id),
  score INTEGER,
  reasoning TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  founder_consent BOOLEAN DEFAULT FALSE,
  technical_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE matchmaking_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchmaking_startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchmaking_technical_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchmaking_matches ENABLE ROW LEVEL SECURITY;

-- Simple public policies for now (matching existing patterns)
CREATE POLICY "Allow public insert users" ON matchmaking_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select users" ON matchmaking_users FOR SELECT USING (true);

CREATE POLICY "Allow public insert startups" ON matchmaking_startups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select startups" ON matchmaking_startups FOR SELECT USING (true);

CREATE POLICY "Allow public insert tech" ON matchmaking_technical_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select tech" ON matchmaking_technical_profiles FOR SELECT USING (true);

CREATE POLICY "Allow public insert matches" ON matchmaking_matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select matches" ON matchmaking_matches FOR SELECT USING (true);
CREATE POLICY "Allow public update matches" ON matchmaking_matches FOR UPDATE USING (true);

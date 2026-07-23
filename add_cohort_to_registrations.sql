-- Add cohort column to registrations table
-- Each student is assigned to a specific cohort (Cohort 1-5) by the admin
-- This replaces the global localStorage-based cohort assignment

ALTER TABLE registrations ADD COLUMN IF NOT EXISTS cohort TEXT DEFAULT 'Cohort 1';

-- Create an index for fast cohort-based queries
CREATE INDEX IF NOT EXISTS idx_registrations_cohort ON registrations(cohort);

-- Create an index for fast cohort + track queries (used by peer hub, grades, etc.)
CREATE INDEX IF NOT EXISTS idx_registrations_cohort_track ON registrations(cohort, company_name);

-- Update existing admitted students to have a default cohort if null
UPDATE registrations SET cohort = 'Cohort 1' WHERE cohort IS NULL AND ticket_type LIKE 'tech_waitlist_%';

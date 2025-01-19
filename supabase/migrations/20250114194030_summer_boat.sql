/*
  # Update Hair Analysis Schema

  1. Changes
    - Add status field for tracking submission status
    - Add notes field for admin comments
    - Add indexes for better query performance
    - Update RLS policies for admin access

  2. New Fields
    - status: Tracks the submission status (new, contacted, scheduled, completed, cancelled)
    - notes: Allows admins to add notes about the submission

  3. Security
    - Only admins can update submissions
    - Anyone can insert new submissions
    - Only authenticated users can view submissions
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS hair_analysis_submissions CASCADE;

-- Create hair_analysis_submissions table
CREATE TABLE hair_analysis_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gender text NOT NULL,
  age_range jsonb NOT NULL,
  hair_loss_type text NOT NULL,
  hair_loss_duration text NOT NULL,
  previous_transplants boolean NOT NULL,
  previous_transplant_details jsonb,
  medical_conditions text[],
  medications text[],
  allergies text[],
  photos jsonb,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT hair_analysis_submissions_status_check 
    CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled'))
);

-- Create indexes
CREATE INDEX idx_hair_analysis_submissions_status 
  ON hair_analysis_submissions(status);

CREATE INDEX idx_hair_analysis_submissions_created_at 
  ON hair_analysis_submissions(created_at DESC);

CREATE INDEX idx_hair_analysis_submissions_country 
  ON hair_analysis_submissions(country);

-- Enable RLS
ALTER TABLE hair_analysis_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert submissions" ON hair_analysis_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON hair_analysis_submissions;
DROP POLICY IF EXISTS "Only admin users can update submissions" ON hair_analysis_submissions;
DROP POLICY IF EXISTS "Only admin users can delete submissions" ON hair_analysis_submissions;

-- Create RLS policies
CREATE POLICY "Anyone can insert submissions"
  ON hair_analysis_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON hair_analysis_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admin users can update submissions"
  ON hair_analysis_submissions
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "Only admin users can delete submissions"
  ON hair_analysis_submissions
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Create updated_at trigger
DROP TRIGGER IF EXISTS set_hair_analysis_submissions_updated_at 
  ON hair_analysis_submissions;

CREATE TRIGGER set_hair_analysis_submissions_updated_at
  BEFORE UPDATE ON hair_analysis_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
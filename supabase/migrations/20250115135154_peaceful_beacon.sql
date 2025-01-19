-- Create or update translation_settings table
CREATE TABLE IF NOT EXISTS translation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  openai_api_key text,
  openai_model text NOT NULL DEFAULT 'gpt-4o-mini',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT translation_settings_model_check CHECK (openai_model IN ('gpt-4', 'gpt-4o', 'gpt-4o-mini'))
);

-- Enable RLS
ALTER TABLE translation_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
  BEGIN
    DROP POLICY IF EXISTS "Translation Settings Admin Policy" ON translation_settings;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
END $$;

-- Create new policy with a unique name
CREATE POLICY "Translation Settings Admin Access"
  ON translation_settings
  FOR ALL
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

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_translation_settings_updated_at ON translation_settings;

CREATE TRIGGER update_translation_settings_updated_at
  BEFORE UPDATE ON translation_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings if not exists
INSERT INTO translation_settings (openai_model)
SELECT 'gpt-4o-mini'
WHERE NOT EXISTS (SELECT 1 FROM translation_settings);
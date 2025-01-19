-- Create translation settings table if not exists
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

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Admin users can manage translation settings" ON translation_settings;

-- Create new policy
CREATE POLICY "Translation Settings Admin Policy"
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

-- Insert default settings if not exists
INSERT INTO translation_settings (openai_model)
SELECT 'gpt-4o-mini'
WHERE NOT EXISTS (SELECT 1 FROM translation_settings);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_translation_settings_updated_at ON translation_settings;

CREATE TRIGGER update_translation_settings_updated_at
  BEFORE UPDATE ON translation_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
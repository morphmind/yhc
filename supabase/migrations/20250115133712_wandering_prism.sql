-- Drop existing tables if they exist
DROP TABLE IF EXISTS translations CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS translation_settings CASCADE;

-- Create languages table
CREATE TABLE languages (
  code text PRIMARY KEY,
  name text NOT NULL,
  flag text NOT NULL,
  direction text NOT NULL DEFAULT 'ltr',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT languages_direction_check CHECK (direction IN ('ltr', 'rtl'))
);

-- Create translations table
CREATE TABLE translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code text NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
  namespace text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (language_code, namespace, key)
);

-- Create translation settings table
CREATE TABLE translation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  openai_api_key text,
  openai_model text NOT NULL DEFAULT 'gpt-4o-mini',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT translation_settings_model_check CHECK (openai_model IN ('gpt-4', 'gpt-4o', 'gpt-4o-mini'))
);

-- Create indexes
CREATE INDEX idx_translations_language_code ON translations(language_code);
CREATE INDEX idx_translations_namespace ON translations(namespace);
CREATE INDEX idx_translations_key ON translations(key);

-- Enable RLS
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for languages table
CREATE POLICY "Languages Public Read"
  ON languages FOR SELECT
  USING (true);

CREATE POLICY "Languages Admin Modify"
  ON languages
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

-- Create policies for translations table
CREATE POLICY "Translations Public Read"
  ON translations FOR SELECT
  USING (true);

CREATE POLICY "Translations Admin Modify"
  ON translations
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

-- Create policies for translation settings table
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

-- Insert default languages
INSERT INTO languages (code, name, flag, direction, is_active) VALUES
  ('en', 'English', '🇬🇧', 'ltr', true),
  ('tr', 'Türkçe', '🇹🇷', 'ltr', true),
  ('de', 'Deutsch', '🇩🇪', 'ltr', true),
  ('ru', 'Русский', '🇷🇺', 'ltr', true),
  ('ar', 'العربية', '🇦🇪', 'rtl', true),
  ('es', 'Español', '🇪🇸', 'ltr', true),
  ('fr', 'Français', '🇫🇷', 'ltr', true)
ON CONFLICT (code) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_languages_updated_at
  BEFORE UPDATE ON languages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translation_settings_updated_at
  BEFORE UPDATE ON translation_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings if not exists
INSERT INTO translation_settings (openai_model)
SELECT 'gpt-4o-mini'
WHERE NOT EXISTS (SELECT 1 FROM translation_settings);
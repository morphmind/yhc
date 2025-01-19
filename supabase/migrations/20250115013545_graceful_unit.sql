/*
  # Add Language Management System
  
  1. New Tables
    - `languages`
      - `code` (text, primary key) - Language code (e.g., 'en', 'tr')
      - `name` (text) - Language name
      - `flag` (text) - Flag emoji
      - `direction` (text) - Text direction (ltr/rtl)
      - `is_active` (boolean) - Whether language is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `translations`
      - `id` (uuid, primary key)
      - `language_code` (text, foreign key)
      - `namespace` (text) - Translation namespace (e.g., 'common', 'home')
      - `key` (text) - Translation key
      - `value` (text) - Translated text
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `translation_settings`
      - `id` (uuid, primary key)
      - `openai_api_key` (text) - OpenAI API key for translations
      - `openai_model` (text) - OpenAI model to use
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

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
  openai_model text DEFAULT 'gpt-4',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
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
CREATE POLICY "Public read access for languages"
  ON languages FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admin users can modify languages"
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
CREATE POLICY "Public read access for translations"
  ON translations FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admin users can modify translations"
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
CREATE POLICY "Admin users can manage translation settings"
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
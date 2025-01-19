-- Drop existing policies if they exist
DO $$ BEGIN
  -- Drop policies one by one to handle cases where they don't exist
  BEGIN
    DROP POLICY IF EXISTS "Public read access for translations" ON translations;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Admin users can modify translations" ON translations;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
END $$;

-- Create new policies with unique names
DO $$ BEGIN
  -- Public read policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'translations' AND policyname = 'Translations Public Read'
  ) THEN
    CREATE POLICY "Translations Public Read"
    ON translations FOR SELECT
    USING (true);
  END IF;

  -- Admin modify policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'translations' AND policyname = 'Translations Admin Modify'
  ) THEN
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
  END IF;
END $$;

-- Insert initial translations
INSERT INTO translations (language_code, namespace, key, value)
VALUES 
  ('en', 'home.hero.badge', 'text', 'Premium Hair Transplant Center'),
  ('en', 'home.hero.title', 'highlight', 'Premium Hair Transplant'),
  ('en', 'home.hero.title', 'main', 'in Turkey with Expert Care'),
  ('en', 'home.hero.description', 'text', 'Experience world-class hair restoration with Dr. Mustafa Yakışıklı. Advanced techniques, natural results, and personalized care in the heart of Turkey.'),
  ('en', 'home.hero.cta', 'analysis', 'Get Free Hair Analysis'),
  ('en', 'home.hero.cta', 'whatsapp', 'WhatsApp Consultation')
ON CONFLICT (language_code, namespace, key) 
DO UPDATE SET value = EXCLUDED.value;
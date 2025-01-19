-- Create translations table if not exists
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code text NOT NULL REFERENCES languages(code) ON DELETE CASCADE,
  namespace text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (language_code, namespace, key)
);

-- Function to safely insert translations
CREATE OR REPLACE FUNCTION insert_translation(
  p_language_code text,
  p_namespace text,
  p_key text,
  p_value text
) RETURNS void AS $$
BEGIN
  INSERT INTO translations (language_code, namespace, key, value)
  VALUES (p_language_code, p_namespace, p_key, p_value)
  ON CONFLICT (language_code, namespace, key) 
  DO UPDATE SET value = EXCLUDED.value;
END;
$$ LANGUAGE plpgsql;

-- Insert English translations
DO $$ 
DECLARE
  namespace text;
  key text;
  value text;
BEGIN
  -- Home section translations
  PERFORM insert_translation('en', 'home.hero.badge', 'text', 'Premium Hair Transplant Center');
  PERFORM insert_translation('en', 'home.hero.title', 'highlight', 'Premium Hair Transplant');
  PERFORM insert_translation('en', 'home.hero.title', 'main', 'in Turkey with Expert Care');
  PERFORM insert_translation('en', 'home.hero.description', 'text', 'Experience world-class hair restoration with Dr. Mustafa Yakışıklı. Advanced techniques, natural results, and personalized care in the heart of Turkey.');
  PERFORM insert_translation('en', 'home.hero.cta', 'analysis', 'Get Free Hair Analysis');
  PERFORM insert_translation('en', 'home.hero.cta', 'whatsapp', 'WhatsApp Consultation');
  PERFORM insert_translation('en', 'home.hero.stats', 'operations', 'Successful Operations');
  PERFORM insert_translation('en', 'home.hero.stats', 'growth', 'Hair Growth Rate');
  PERFORM insert_translation('en', 'home.hero.stats', 'experience', 'Years Experience');
  PERFORM insert_translation('en', 'home.hero.stats', 'awards', 'Awards & Certificates');

  -- Treatment section translations
  PERFORM insert_translation('en', 'treatments', 'title', 'Treatment Options');
  PERFORM insert_translation('en', 'treatments', 'description', 'Discover our advanced hair transplant techniques for natural-looking results');
  PERFORM insert_translation('en', 'treatments.gallery', 'title', 'Success Stories');
  PERFORM insert_translation('en', 'treatments.gallery', 'description', 'Explore our collection of successful hair transplant transformations');

  -- Header section translations
  PERFORM insert_translation('en', 'header.contact', 'phone', '+90 536 034 48 66');
  PERFORM insert_translation('en', 'header.contact', 'email', 'info@yakisiklihairclinic.com');
  PERFORM insert_translation('en', 'header.contact', 'location', 'Fethiye, Turkey');
  PERFORM insert_translation('en', 'header.navigation', 'menu', 'Menu');
  PERFORM insert_translation('en', 'header.navigation.about', 'title', 'About');
  PERFORM insert_translation('en', 'header.navigation.about', 'doctor', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation('en', 'header.navigation.about', 'clinic', 'Yakışıklı Clinic');

  -- Insert Turkish translations
  -- Home section translations
  PERFORM insert_translation('tr', 'home.hero.badge', 'text', 'Premium Saç Ekimi Merkezi');
  PERFORM insert_translation('tr', 'home.hero.title', 'highlight', 'Premium Saç Ekimi');
  PERFORM insert_translation('tr', 'home.hero.title', 'main', 'Türkiye''de Uzman Bakımı');
  PERFORM insert_translation('tr', 'home.hero.description', 'text', 'Dr. Mustafa Yakışıklı ile dünya standartlarında saç restorasyonu deneyimi yaşayın. Gelişmiş teknikler, doğal sonuçlar ve Türkiye''nin kalbinde kişiselleştirilmiş bakım.');
  PERFORM insert_translation('tr', 'home.hero.cta', 'analysis', 'Ücretsiz Saç Analizi');
  PERFORM insert_translation('tr', 'home.hero.cta', 'whatsapp', 'WhatsApp Danışma');
  PERFORM insert_translation('tr', 'home.hero.stats', 'operations', 'Başarılı Operasyon');
  PERFORM insert_translation('tr', 'home.hero.stats', 'growth', 'Saç Büyüme Oranı');
  PERFORM insert_translation('tr', 'home.hero.stats', 'experience', 'Yıllık Deneyim');
  PERFORM insert_translation('tr', 'home.hero.stats', 'awards', 'Sertifika ve Ödül');

  -- Treatment section translations
  PERFORM insert_translation('tr', 'treatments', 'title', 'Tedavi Seçenekleri');
  PERFORM insert_translation('tr', 'treatments', 'description', 'Doğal görünümlü sonuçlar için gelişmiş saç ekimi tekniklerimizi keşfedin');
  PERFORM insert_translation('tr', 'treatments.gallery', 'title', 'Başarı Hikayeleri');
  PERFORM insert_translation('tr', 'treatments.gallery', 'description', 'Başarılı saç ekimi dönüşümlerimizi keşfedin');

  -- Header section translations
  PERFORM insert_translation('tr', 'header.contact', 'phone', '+90 536 034 48 66');
  PERFORM insert_translation('tr', 'header.contact', 'email', 'info@yakisiklihairclinic.com');
  PERFORM insert_translation('tr', 'header.contact', 'location', 'Fethiye, Türkiye');
  PERFORM insert_translation('tr', 'header.navigation', 'menu', 'Menü');
  PERFORM insert_translation('tr', 'header.navigation.about', 'title', 'Hakkımızda');
  PERFORM insert_translation('tr', 'header.navigation.about', 'doctor', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation('tr', 'header.navigation.about', 'clinic', 'Yakışıklı Kliniği');
END $$;
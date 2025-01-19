-- Function to safely insert translations
CREATE OR REPLACE FUNCTION insert_translation_with_namespace(
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
SELECT insert_translation_with_namespace('en', 'home.hero.badge', 'text', 'Premium Hair Transplant Center');
SELECT insert_translation_with_namespace('en', 'home.hero.title', 'highlight', 'Premium Hair Transplant');
SELECT insert_translation_with_namespace('en', 'home.hero.title', 'main', 'in Turkey with Expert Care');
SELECT insert_translation_with_namespace('en', 'home.hero.description', 'text', 'Experience world-class hair restoration with Dr. Mustafa Yakışıklı. Advanced techniques, natural results, and personalized care in the heart of Turkey.');
SELECT insert_translation_with_namespace('en', 'home.hero.cta', 'analysis', 'Get Free Hair Analysis');
SELECT insert_translation_with_namespace('en', 'home.hero.cta', 'whatsapp', 'WhatsApp Consultation');

-- Insert Turkish translations
SELECT insert_translation_with_namespace('tr', 'home.hero.badge', 'text', 'Premium Saç Ekimi Merkezi');
SELECT insert_translation_with_namespace('tr', 'home.hero.title', 'highlight', 'Premium Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'home.hero.title', 'main', 'Türkiye''de Uzman Bakımı');
SELECT insert_translation_with_namespace('tr', 'home.hero.description', 'text', 'Dr. Mustafa Yakışıklı ile dünya standartlarında saç restorasyonu deneyimi yaşayın. Gelişmiş teknikler, doğal sonuçlar ve Türkiye''nin kalbinde kişiselleştirilmiş bakım.');
SELECT insert_translation_with_namespace('tr', 'home.hero.cta', 'analysis', 'Ücretsiz Saç Analizi');
SELECT insert_translation_with_namespace('tr', 'home.hero.cta', 'whatsapp', 'WhatsApp Danışma');
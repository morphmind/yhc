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

-- Import missing translations
DO $$ 
BEGIN
  -- Missing Why Us Features
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.natural', 'title', 'Natural Results');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.natural', 'description', 'Achieve natural-looking results with our precise and artistic approach to hair restoration');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.personalized', 'title', 'Personalized Care');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.personalized', 'description', 'Customized treatment plans tailored to your unique needs and hair restoration goals');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.aftercare', 'title', 'Lifetime Aftercare');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.aftercare', 'description', 'Comprehensive post-procedure support and long-term care for lasting results');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.satisfaction', 'title', 'Patient Satisfaction');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.satisfaction', 'description', 'Thousands of satisfied patients from around the world trust our expertise');

  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.natural', 'title', 'Doğal Sonuçlar');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.natural', 'description', 'Hassas ve sanatsal yaklaşımımızla doğal görünümlü sonuçlar elde edin');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.personalized', 'title', 'Kişiselleştirilmiş Bakım');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.personalized', 'description', 'Benzersiz ihtiyaçlarınıza ve saç restorasyon hedeflerinize göre özelleştirilmiş tedavi planları');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.aftercare', 'title', 'Ömür Boyu Takip');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.aftercare', 'description', 'Kalıcı sonuçlar için kapsamlı işlem sonrası destek ve uzun vadeli bakım');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.satisfaction', 'title', 'Hasta Memnuniyeti');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.satisfaction', 'description', 'Dünyanın dört bir yanından binlerce hasta uzmanlığımıza güveniyor');

  -- Missing Service Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation', 'title', 'Hotel & Stay');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation', 'description', 'Comfortable accommodation in premium hotels');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'hotel', '5-star hotel accommodation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'breakfast', 'Breakfast included');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'location', 'City center location');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'amenities', 'Special patient amenities');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation', 'title', 'Otel & Konaklama');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation', 'description', 'Premium otellerde konforlu konaklama');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'hotel', '5 yıldızlı otel konaklaması');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'breakfast', 'Kahvaltı dahil');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'location', 'Şehir merkezi konumu');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'amenities', 'Özel hasta imkanları');

  -- Missing Treatment Options
  PERFORM insert_translation_with_namespace('en', 'treatments.options.women', 'title', 'Women Hair Transplant');
  PERFORM insert_translation_with_namespace('en', 'treatments.options.women', 'description', 'Tailored solutions for female pattern hair loss');
  PERFORM insert_translation_with_namespace('en', 'treatments.options.beard', 'title', 'Beard Transplant');
  PERFORM insert_translation_with_namespace('en', 'treatments.options.beard', 'description', 'Achieve a fuller, natural-looking beard');
  PERFORM insert_translation_with_namespace('en', 'treatments.options.eyebrow', 'title', 'Eyebrow Transplant');
  PERFORM insert_translation_with_namespace('en', 'treatments.options.eyebrow', 'description', 'Restore or enhance your eyebrows permanently');

  PERFORM insert_translation_with_namespace('tr', 'treatments.options.women', 'title', 'Kadınlarda Saç Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'treatments.options.women', 'description', 'Kadınlara özel saç dökülmesi çözümleri');
  PERFORM insert_translation_with_namespace('tr', 'treatments.options.beard', 'title', 'Sakal Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'treatments.options.beard', 'description', 'Daha dolgun ve doğal görünümlü sakal');
  PERFORM insert_translation_with_namespace('tr', 'treatments.options.eyebrow', 'title', 'Kaş Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'treatments.options.eyebrow', 'description', 'Kaşlarınızı kalıcı olarak dolgunlaştırın');

  -- Missing Hair Analysis Steps
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', 'Less than 1 year');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 years');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 years');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', 'More than 5 years');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', '1 yıldan az');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 yıl');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 yıl');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', '5 yıldan fazla');

  -- Missing Photo Types
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.front', 'title', 'Front View');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.front', 'description', 'Clear photo of your hairline');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.top', 'title', 'Top View');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.top', 'description', 'Shows crown area clearly');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.sides', 'title', 'Side Views');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.sides', 'description', 'Both left and right sides');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.back', 'title', 'Back View');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.back', 'description', 'Shows donor area');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.front', 'title', 'Ön Görünüm');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.front', 'description', 'Saç çizginizin net fotoğrafı');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.top', 'title', 'Üst Görünüm');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.top', 'description', 'Tepe bölgesini net gösterir');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.sides', 'title', 'Yan Görünümler');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.sides', 'description', 'Hem sol hem sağ taraf');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.back', 'title', 'Arka Görünüm');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.back', 'description', 'Donör alanı gösterir');

  -- Missing Form Features
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'free', '100% Free');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'secure', 'SSL data transfer');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'expert', 'Analysis from experts');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'free', '%100 Ücretsiz');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'secure', 'SSL veri transferi');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'expert', 'Uzman analizi');

END $$;
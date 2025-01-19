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
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.expertise', 'title', 'Expert Medical Team');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.expertise', 'description', 'Led by Dr. Mustafa Yakışıklı, our team combines years of experience with cutting-edge techniques');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.technology', 'title', 'Advanced Technology');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.technology', 'description', 'State-of-the-art facilities and the latest hair transplant technologies for optimal results');

  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.expertise', 'title', 'Uzman Medikal Ekip');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.expertise', 'description', 'Dr. Mustafa Yakışıklı liderliğindeki ekibimiz, yılların deneyimini en son tekniklerle birleştiriyor');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.technology', 'title', 'İleri Teknoloji');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.technology', 'description', 'En iyi sonuçlar için son teknoloji tesisler ve en yeni saç ekimi teknolojileri');

  -- Missing Service Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support', 'title', 'Patient Support');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support', 'description', 'Comprehensive care and assistance');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'support24', '24/7 medical support');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'team', 'Multilingual team');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support', 'title', 'Hasta Desteği');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support', 'description', 'Kapsamlı bakım ve yardım');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'support24', '7/24 medikal destek');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'team', 'Çok dilli ekip');

  -- Missing Treatment Descriptions
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire', 'description', 'Advanced FUE technique using sapphire blades for enhanced precision and healing');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', 'healing', 'Smoother healing process');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', 'damage', 'Minimal tissue damage');

  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire', 'description', 'Gelişmiş hassasiyet ve iyileşme için safir bıçaklar kullanan gelişmiş FUE tekniği');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', 'healing', 'Daha pürüzsüz iyileşme süreci');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', 'damage', 'Minimal doku hasarı');

  -- Missing Hair Analysis Steps
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'yes', 'Yes');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'no', 'No');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'optional', 'optional');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'optional', 'optional');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'yes', 'Evet');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'no', 'Hayır');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'optional', 'opsiyonel');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'optional', 'opsiyonel');

  -- Missing Package Features
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'placement', 'Placement');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'technique', 'Technique');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'whatsapp', 'Get Info on WhatsApp');

  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'placement', 'Yerleştirme');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'technique', 'Teknik');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'whatsapp', 'WhatsApp''tan Bilgi Al');

  -- Missing Navigation Items
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'title', 'Guide');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'natural', 'Natural Hair Transplant');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'why', 'Why should I get a hair transplant?');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'how', 'How to perform Hair Transplant Operation');

  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'title', 'Rehber');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'natural', 'Doğal Saç Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'why', 'Neden saç ekimi yaptırmalıyım?');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'how', 'Saç Ekimi Operasyonu nasıl yapılır?');

  -- Missing Form Validation Messages
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'required', 'This field is required');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'email', 'Please enter a valid email address');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'phone', 'Please enter a valid phone number');

  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'required', 'Bu alan zorunludur');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'email', 'Geçerli bir e-posta adresi girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'phone', 'Geçerli bir telefon numarası girin');

  -- Missing Success Story Labels
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'grafts', 'Grafts');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'age', 'Age');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'rating', 'Rating');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'testimonial', 'Patient Testimonial');

  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'grafts', 'Greft');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'age', 'Yaş');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'rating', 'Değerlendirme');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'testimonial', 'Hasta Yorumu');

END $$;
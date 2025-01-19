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

-- Import translations in batches
DO $$ 
DECLARE
  feature_record RECORD;
  stat_record RECORD;
  cert_record RECORD;
  i INTEGER;
BEGIN
  -- Hair Analysis Title and Description
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis', 'title', 'Free Hair Analysis Consultation');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis', 'description', 'Get a personalized hair transplant assessment from our expert medical team. We''ll analyze your condition and provide tailored recommendations for your hair restoration journey.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis', 'title', 'Ücretsiz Saç Analizi Konsültasyonu');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis', 'description', 'Uzman medikal ekibimizden kişiselleştirilmiş saç ekimi değerlendirmesi alın. Durumunuzu analiz edip saç restorasyon yolculuğunuz için özel öneriler sunacağız.');

  -- Why Us Section
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs', 'title', 'Why Choose Us?');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs', 'description', 'Experience excellence in hair transplantation with our unique advantages');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs', 'title', 'Neden Biz?');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs', 'description', 'Benzersiz avantajlarımızla saç ekiminde mükemmelliği deneyimleyin');

  -- Why Us Features - English
  FOR feature_record IN (
    SELECT 
      unnest(ARRAY['expertise', 'technology', 'natural', 'personalized', 'aftercare', 'satisfaction']) AS id,
      unnest(ARRAY[
        'Expert Medical Team',
        'Advanced Technology',
        'Natural Results',
        'Personalized Care',
        'Lifetime Aftercare',
        'Patient Satisfaction'
      ]) AS title,
      unnest(ARRAY[
        'Led by Dr. Mustafa Yakışıklı, our team combines years of experience with cutting-edge techniques',
        'State-of-the-art facilities and the latest hair transplant technologies for optimal results',
        'Achieve natural-looking results with our precise and artistic approach to hair restoration',
        'Customized treatment plans tailored to your unique needs and hair restoration goals',
        'Comprehensive post-procedure support and long-term care for lasting results',
        'Thousands of satisfied patients from around the world trust our expertise'
      ]) AS description
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.' || feature_record.id, 'title', feature_record.title);
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.features.' || feature_record.id, 'description', feature_record.description);
  END LOOP;

  -- Why Us Features - Turkish
  FOR feature_record IN (
    SELECT 
      unnest(ARRAY['expertise', 'technology', 'natural', 'personalized', 'aftercare', 'satisfaction']) AS id,
      unnest(ARRAY[
        'Uzman Medikal Ekip',
        'İleri Teknoloji',
        'Doğal Sonuçlar',
        'Kişiselleştirilmiş Bakım',
        'Ömür Boyu Takip',
        'Hasta Memnuniyeti'
      ]) AS title,
      unnest(ARRAY[
        'Dr. Mustafa Yakışıklı liderliğindeki ekibimiz, yılların deneyimini en son tekniklerle birleştiriyor',
        'En iyi sonuçlar için son teknoloji tesisler ve en yeni saç ekimi teknolojileri',
        'Hassas ve sanatsal yaklaşımımızla doğal görünümlü sonuçlar elde edin',
        'Benzersiz ihtiyaçlarınıza ve saç restorasyon hedeflerinize göre özelleştirilmiş tedavi planları',
        'Kalıcı sonuçlar için kapsamlı işlem sonrası destek ve uzun vadeli bakım',
        'Dünyanın dört bir yanından binlerce hasta uzmanlığımıza güveniyor'
      ]) AS description
  ) LOOP
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.' || feature_record.id, 'title', feature_record.title);
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.features.' || feature_record.id, 'description', feature_record.description);
  END LOOP;

  -- Clinic Features
  FOR i IN 1..4 LOOP
    -- English
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', i::text, 
      CASE i
        WHEN 1 THEN 'State-of-the-art equipment and sterile operating room environment'
        WHEN 2 THEN 'Experienced medical team and special patient care service'
        WHEN 3 THEN 'International service quality standards'
        WHEN 4 THEN '24/7 patient support and follow-up system'
      END
    );
    
    -- Turkish
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', i::text,
      CASE i
        WHEN 1 THEN 'Son teknoloji ekipmanlar ve steril ameliyathane ortamı'
        WHEN 2 THEN 'Deneyimli medikal ekip ve özel hasta bakım hizmeti'
        WHEN 3 THEN 'Uluslararası standartlarda hizmet kalitesi'
        WHEN 4 THEN '7/24 hasta destek ve takip sistemi'
      END
    );
  END LOOP;

  -- Patient Satisfaction Stats
  FOR stat_record IN (
    SELECT 
      unnest(ARRAY['rate', 'patients', 'rating']) AS id,
      unnest(ARRAY['98%', '15K+', '4.9/5']) AS value,
      unnest(ARRAY['Patient Satisfaction Rate', 'Happy Patients', 'Patient Rating']) AS en_label,
      unnest(ARRAY['Hasta Memnuniyet Oranı', 'Mutlu Hasta', 'Hasta Değerlendirmesi']) AS tr_label
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.' || stat_record.id || '.value', 'value', stat_record.value);
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.' || stat_record.id || '.label', 'label', stat_record.en_label);
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.' || stat_record.id || '.value', 'value', stat_record.value);
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.' || stat_record.id || '.label', 'label', stat_record.tr_label);
  END LOOP;

  -- Certifications
  FOR cert_record IN (
    SELECT 
      unnest(ARRAY['jci', 'iso', 'ishrs', 'tshd']) AS id,
      unnest(ARRAY['JCI Accreditation', 'ISO 9001:2015', 'ISHRS Membership', 'TSHD Membership']) AS en_text,
      unnest(ARRAY['JCI Akreditasyonu', 'ISO 9001:2015', 'ISHRS Üyeliği', 'TSHD Üyeliği']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.certifications.items', cert_record.id, cert_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications.items', cert_record.id, cert_record.tr_text);
  END LOOP;

  -- Weather Labels
  PERFORM insert_translation_with_namespace('en', 'header.weather', 'humidity', 'Humidity');
  PERFORM insert_translation_with_namespace('en', 'header.weather', 'windSpeed', 'Wind Speed');
  PERFORM insert_translation_with_namespace('tr', 'header.weather', 'humidity', 'Nem');
  PERFORM insert_translation_with_namespace('tr', 'header.weather', 'windSpeed', 'Rüzgar Hızı');

END $$;
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
BEGIN
  -- Clinic Features - English
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic', 'title', 'Our Clinic Features');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '1', 'State-of-the-art equipment and sterile operating room environment');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '2', 'Experienced medical team and special patient care service');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '3', 'International service quality standards');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '4', '24/7 patient support and follow-up system');

  -- Clinic Features - Turkish
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic', 'title', 'Kliniğimizin Özellikleri');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '1', 'Son teknoloji ekipmanlar ve steril ameliyathane ortamı');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '2', 'Deneyimli medikal ekip ve özel hasta bakım hizmeti');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '3', 'Uluslararası standartlarda hizmet kalitesi');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '4', '7/24 hasta destek ve takip sistemi');

  -- Satisfaction Stats - English
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rate', 'value', '98%');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rate', 'label', 'Patient Satisfaction Rate');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.patients', 'value', '15K+');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.patients', 'label', 'Happy Patients');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rating', 'value', '4.9/5');
  PERFORM insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rating', 'label', 'Patient Rating');

  -- Satisfaction Stats - Turkish
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rate', 'value', '98%');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rate', 'label', 'Hasta Memnuniyet Oranı');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.patients', 'value', '15K+');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.patients', 'label', 'Mutlu Hasta');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rating', 'value', '4.9/5');
  PERFORM insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rating', 'label', 'Hasta Değerlendirmesi');

  -- Treatment Process Steps - English
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '1.title', 'Consultation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '1.description', 'Detailed analysis and personalized treatment plan with our expert medical team');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '2.title', 'Arrival');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '2.description', 'VIP airport transfer and comfortable accommodation in a luxury hotel');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '3.title', 'Operation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '3.description', 'Advanced hair transplant procedure with the latest technology');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '4.title', 'Recovery');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', '4.description', 'Comprehensive aftercare and long-term follow-up support');

  -- Treatment Process Steps - Turkish
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '1.title', 'Konsültasyon');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '1.description', 'Uzman medikal ekibimizle detaylı analiz ve kişiselleştirilmiş tedavi planı');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '2.title', 'Varış');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '2.description', 'VIP havalimanı transferi ve lüks otelde konforlu konaklama');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '3.title', 'Operasyon');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '3.description', 'En son teknoloji ile gelişmiş saç ekimi prosedürü');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '4.title', 'İyileşme');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', '4.description', 'Kapsamlı bakım ve uzun vadeli takip desteği');

  -- Toast Messages - English
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'processing', 'Processing your information...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'uploading', 'Uploading your photos...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'sending', 'Sending your request...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'email', 'Sending confirmation email...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Finalizing your submission...');

  -- Toast Messages - Turkish
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'processing', 'Bilgileriniz işleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'uploading', 'Fotoğraflarınız yükleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'sending', 'İsteğiniz gönderiliyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'email', 'Onay e-postası gönderiliyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Başvurunuz tamamlanıyor...');

END $$;
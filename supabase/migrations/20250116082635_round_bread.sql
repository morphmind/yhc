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

-- Import remaining translations
DO $$ 
BEGIN
  -- Additional Package Features
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.dhi.features', 'enhancement', '2 Months Hair Enhancement Package');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'enhancement', '4 Months Hair Enhancement Package');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'surgery', 'Surgery performed by Dr. Yakışıklı');

  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.dhi.features', 'enhancement', '2 Aylık Saç Güçlendirme Paketi');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'enhancement', '4 Aylık Saç Güçlendirme Paketi');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'surgery', 'Dr. Yakışıklı''nın ameliyat kesisi');

  -- Additional Service Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', 'airport', 'Airport pickup & drop-off');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', 'clinic', 'Hotel-clinic transfers');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', 'luxury', 'Luxury vehicles');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', 'drivers', 'Professional drivers');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', 'airport', 'Havalimanı karşılama & uğurlama');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', 'clinic', 'Otel-klinik transferleri');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', 'luxury', 'Lüks araçlar');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', 'drivers', 'Profesyonel sürücüler');

  -- Additional Support Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'medical', '24/7 medical support');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'multilingual', 'Multilingual team');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'whatsapp', 'WhatsApp consultation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.support.features', 'aftercare', 'Aftercare guidance');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'medical', '7/24 medikal destek');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'multilingual', 'Çok dilli ekip');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'whatsapp', 'WhatsApp danışmanlığı');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', 'aftercare', 'Bakım rehberliği');

  -- Additional Treatment Process Steps
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.consultation', 'description', 'Detailed analysis and personalized treatment plan with our expert medical team');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.arrival', 'description', 'VIP airport transfer and comfortable accommodation in a luxury hotel');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.operation', 'description', 'Advanced hair transplant procedure with the latest technology');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.recovery', 'description', 'Comprehensive aftercare and long-term follow-up support');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.consultation', 'description', 'Uzman medikal ekibimizle detaylı analiz ve kişiselleştirilmiş tedavi planı');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.arrival', 'description', 'VIP havalimanı transferi ve lüks otelde konforlu konaklama');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.operation', 'description', 'En son teknoloji ile gelişmiş saç ekimi prosedürü');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.recovery', 'description', 'Kapsamlı bakım ve uzun vadeli takip desteği');

  -- Additional Gallery Filters
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.filters', 'density', 'By Density');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.filters', 'technique', 'By Technique');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.filters', 'age', 'By Age');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.filters', 'gender', 'By Gender');

  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'density', 'Yoğunluğa Göre');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'technique', 'Tekniğe Göre');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'age', 'Yaşa Göre');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'gender', 'Cinsiyete Göre');

  -- Additional Medical History Questions
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'bloodPressure', 'Do you have blood pressure issues?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'diabetes', 'Do you have diabetes?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'heartConditions', 'Do you have any heart conditions?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'bleeding', 'Do you have any bleeding disorders?');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'bloodPressure', 'Tansiyon probleminiz var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'diabetes', 'Diyabetiniz var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'heartConditions', 'Kalp rahatsızlığınız var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'bleeding', 'Kanama bozukluğunuz var mı?');

  -- Additional Photo Upload Instructions
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'instructions', 'Please take photos in good lighting');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'quality', 'High quality photos help us better assess your case');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'lighting', 'Ensure good lighting conditions');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'format', 'Accepted formats: JPG, PNG');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'instructions', 'Lütfen iyi aydınlatmada fotoğraf çekin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'quality', 'Yüksek kaliteli fotoğraflar durumunuzu daha iyi değerlendirmemize yardımcı olur');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'lighting', 'İyi aydınlatma koşullarını sağlayın');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'format', 'Kabul edilen formatlar: JPG, PNG');

  -- Additional Form Placeholders
  PERFORM insert_translation_with_namespace('en', 'form.placeholders', 'firstName', 'Enter your first name');
  PERFORM insert_translation_with_namespace('en', 'form.placeholders', 'lastName', 'Enter your last name');
  PERFORM insert_translation_with_namespace('en', 'form.placeholders', 'email', 'Enter your email address');
  PERFORM insert_translation_with_namespace('en', 'form.placeholders', 'phone', 'Enter your phone number');
  PERFORM insert_translation_with_namespace('en', 'form.placeholders', 'message', 'Type your message here...');

  PERFORM insert_translation_with_namespace('tr', 'form.placeholders', 'firstName', 'Adınızı girin');
  PERFORM insert_translation_with_namespace('tr', 'form.placeholders', 'lastName', 'Soyadınızı girin');
  PERFORM insert_translation_with_namespace('tr', 'form.placeholders', 'email', 'E-posta adresinizi girin');
  PERFORM insert_translation_with_namespace('tr', 'form.placeholders', 'phone', 'Telefon numaranızı girin');
  PERFORM insert_translation_with_namespace('tr', 'form.placeholders', 'message', 'Mesajınızı buraya yazın...');

END $$;
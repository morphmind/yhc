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
  -- Additional Navigation Items
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'pricing', 'Pricing Guide');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'faq', 'Frequently Asked Questions');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.guide', 'testimonials', 'Patient Testimonials');

  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'pricing', 'Fiyat Rehberi');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'faq', 'Sık Sorulan Sorular');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.guide', 'testimonials', 'Hasta Yorumları');

  -- Additional Service Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'breakfast', 'Breakfast included');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'location', 'City center location');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', 'amenities', 'Special patient amenities');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'breakfast', 'Kahvaltı dahil');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'location', 'Şehir merkezi konumu');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', 'amenities', 'Özel hasta imkanları');

  -- Additional Treatment Features
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', 'precision', 'Enhanced precision');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', 'healing', 'Faster healing');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', 'comfort', 'Increased comfort');

  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', 'precision', 'Gelişmiş hassasiyet');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', 'healing', 'Daha hızlı iyileşme');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', 'comfort', 'Arttırılmış konfor');

  -- Additional Gallery Labels
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'testimonial', 'Patient Testimonial');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'country', 'Country');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'technique', 'Technique Used');

  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'testimonial', 'Hasta Yorumu');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'country', 'Ülke');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'technique', 'Kullanılan Teknik');

  -- Additional Form Fields
  PERFORM insert_translation_with_namespace('en', 'form.fields', 'fullName', 'Full Name');
  PERFORM insert_translation_with_namespace('en', 'form.fields', 'phoneNumber', 'Phone Number');
  PERFORM insert_translation_with_namespace('en', 'form.fields', 'message', 'Message');
  PERFORM insert_translation_with_namespace('en', 'form.fields', 'subject', 'Subject');
  PERFORM insert_translation_with_namespace('en', 'form.fields', 'preferredDate', 'Preferred Date');

  PERFORM insert_translation_with_namespace('tr', 'form.fields', 'fullName', 'Ad Soyad');
  PERFORM insert_translation_with_namespace('tr', 'form.fields', 'phoneNumber', 'Telefon Numarası');
  PERFORM insert_translation_with_namespace('tr', 'form.fields', 'message', 'Mesaj');
  PERFORM insert_translation_with_namespace('tr', 'form.fields', 'subject', 'Konu');
  PERFORM insert_translation_with_namespace('tr', 'form.fields', 'preferredDate', 'Tercih Edilen Tarih');

  -- Additional Validation Messages
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'date', 'Please enter a valid date');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'number', 'Please enter a valid number');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'url', 'Please enter a valid URL');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'match', 'Passwords do not match');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'terms', 'You must accept the terms and conditions');

  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'date', 'Geçerli bir tarih girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'number', 'Geçerli bir sayı girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'url', 'Geçerli bir URL girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'match', 'Şifreler eşleşmiyor');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'terms', 'Şartları ve koşulları kabul etmelisiniz');

  -- Additional Status Messages
  PERFORM insert_translation_with_namespace('en', 'messages.status', 'processing', 'Processing your request');
  PERFORM insert_translation_with_namespace('en', 'messages.status', 'pending', 'Pending approval');
  PERFORM insert_translation_with_namespace('en', 'messages.status', 'approved', 'Approved');
  PERFORM insert_translation_with_namespace('en', 'messages.status', 'rejected', 'Rejected');
  PERFORM insert_translation_with_namespace('en', 'messages.status', 'completed', 'Completed');

  PERFORM insert_translation_with_namespace('tr', 'messages.status', 'processing', 'İsteğiniz işleniyor');
  PERFORM insert_translation_with_namespace('tr', 'messages.status', 'pending', 'Onay bekliyor');
  PERFORM insert_translation_with_namespace('tr', 'messages.status', 'approved', 'Onaylandı');
  PERFORM insert_translation_with_namespace('tr', 'messages.status', 'rejected', 'Reddedildi');
  PERFORM insert_translation_with_namespace('tr', 'messages.status', 'completed', 'Tamamlandı');

  -- Additional Button Labels
  PERFORM insert_translation_with_namespace('en', 'buttons', 'submit', 'Submit');
  PERFORM insert_translation_with_namespace('en', 'buttons', 'reset', 'Reset');
  PERFORM insert_translation_with_namespace('en', 'buttons', 'back', 'Back');
  PERFORM insert_translation_with_namespace('en', 'buttons', 'next', 'Next');
  PERFORM insert_translation_with_namespace('en', 'buttons', 'finish', 'Finish');

  PERFORM insert_translation_with_namespace('tr', 'buttons', 'submit', 'Gönder');
  PERFORM insert_translation_with_namespace('tr', 'buttons', 'reset', 'Sıfırla');
  PERFORM insert_translation_with_namespace('tr', 'buttons', 'back', 'Geri');
  PERFORM insert_translation_with_namespace('tr', 'buttons', 'next', 'İleri');
  PERFORM insert_translation_with_namespace('tr', 'buttons', 'finish', 'Bitir');

  -- Additional Meta Descriptions
  PERFORM insert_translation_with_namespace('en', 'meta.description', 'home', 'Experience world-class hair transplantation with Dr. Mustafa Yakışıklı in Turkey. Advanced techniques, natural results, and personalized care.');
  PERFORM insert_translation_with_namespace('en', 'meta.description', 'about', 'Learn about Dr. Mustafa Yakışıklı and our state-of-the-art hair transplant clinic in Fethiye, Turkey.');
  PERFORM insert_translation_with_namespace('en', 'meta.description', 'treatments', 'Discover our advanced hair transplant techniques including FUE, DHI, and Sapphire FUE for natural-looking results.');

  PERFORM insert_translation_with_namespace('tr', 'meta.description', 'home', 'Dr. Mustafa Yakışıklı ile Türkiye''de dünya standartlarında saç ekimi deneyimi. Gelişmiş teknikler, doğal sonuçlar ve kişiselleştirilmiş bakım.');
  PERFORM insert_translation_with_namespace('tr', 'meta.description', 'about', 'Dr. Mustafa Yakışıklı ve Fethiye''deki son teknoloji saç ekimi kliniğimiz hakkında bilgi edinin.');
  PERFORM insert_translation_with_namespace('tr', 'meta.description', 'treatments', 'Doğal görünümlü sonuçlar için FUE, DHI ve Safir FUE dahil gelişmiş saç ekimi tekniklerimizi keşfedin.');

END $$;
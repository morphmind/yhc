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
  -- Hair Analysis Form Fields
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'firstName', 'First name');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'firstNamePlaceholder', 'Enter your first name');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'lastName', 'Last name');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'lastNamePlaceholder', 'Enter your last name');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'email', 'Email');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'emailPlaceholder', 'Enter your email address');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'phone', 'Phone');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'phonePlaceholder', 'Enter your phone number');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'country', 'Country');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'countryPlaceholder', 'Select your country');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'privacyNotice', 'By submitting this form, you agree to receive communications regarding your hair analysis. Your data is secure and will never be shared with third parties.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'submit', 'Get My Free Analysis');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'submitting', 'Sending...');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'firstName', 'Ad');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'firstNamePlaceholder', 'Adınızı girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'lastName', 'Soyad');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'lastNamePlaceholder', 'Soyadınızı girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'email', 'E-posta');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'emailPlaceholder', 'E-posta adresinizi girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'phone', 'Telefon');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'phonePlaceholder', 'Telefon numaranızı girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'country', 'Ülke');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'countryPlaceholder', 'Ülkenizi seçin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'privacyNotice', 'Bu formu göndererek, saç analizinizle ilgili iletişim kurmayı kabul ediyorsunuz. Verileriniz güvende ve asla üçüncü taraflarla paylaşılmayacak.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'submit', 'Ücretsiz Analizi Al');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'submitting', 'Gönderiliyor...');

  -- Photo Types
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

  -- Medical History Fields
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.allergies', 'title', 'Do you have any allergies?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.allergies', 'placeholder', 'List any allergies to medications or other substances');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.conditions', 'title', 'Do you have any chronic medical conditions?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.conditions', 'placeholder', 'List any ongoing medical conditions');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.medications', 'title', 'What medications are you currently taking?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.medications', 'placeholder', 'List all current medications and supplements');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.allergies', 'title', 'Herhangi bir alerjiniz var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.allergies', 'placeholder', 'İlaç veya diğer maddelere karşı alerjilerinizi listeleyin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.conditions', 'title', 'Kronik bir hastalığınız var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.conditions', 'placeholder', 'Devam eden tıbbi durumlarınızı listeleyin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.medications', 'title', 'Şu anda hangi ilaçları kullanıyorsunuz?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.medications', 'placeholder', 'Tüm mevcut ilaçları ve takviyeleri listeleyin');

  -- Previous Transplant Details Fields
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe', 'title', 'When did you have your previous transplant?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.clinic', 'title', 'Where did you have your transplant?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.clinic', 'placeholder', 'Enter clinic name and location');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.grafts', 'title', 'How many grafts were transplanted?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.grafts', 'placeholder', 'Enter number of grafts');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.technique', 'title', 'Which technique was used?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.technique', 'placeholder', 'e.g., FUE, DHI, etc.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.results', 'title', 'How satisfied are you with the results?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.results', 'placeholder', 'Please describe your experience and results');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe', 'title', 'Önceki saç ekiminizi ne zaman yaptırdınız?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.clinic', 'title', 'Saç ekimini nerede yaptırdınız?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.clinic', 'placeholder', 'Klinik adı ve konumu girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.grafts', 'title', 'Kaç greft nakledildi?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.grafts', 'placeholder', 'Greft sayısını girin');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.technique', 'title', 'Hangi teknik kullanıldı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.technique', 'placeholder', 'örn. FUE, DHI, vb.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.results', 'title', 'Sonuçlardan ne kadar memnunsunuz?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.results', 'placeholder', 'Lütfen deneyiminizi ve sonuçları açıklayın');

  -- Hair Loss Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'none', 'No hair loss');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'light', 'Light receding hairline');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'slight-crown', 'Receding hairline + slight crown');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'strong-crown', 'Strong receding hairline + crown');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'semi-bald', 'Semi bald');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'bald', 'Bald');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'none', 'Saç dökülmesi yok');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'light', 'Hafif saç çizgisi çekilmesi');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'slight-crown', 'Saç çizgisi çekilmesi + hafif tepe açılması');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'strong-crown', 'Belirgin saç çizgisi çekilmesi + tepe açılması');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'semi-bald', 'Yarı kel');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'bald', 'Kel');

  -- Age Range Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange.options', 'range', '{min}-{max} years old');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange.options', 'above', '{min}+ years old');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange.options', 'range', '{min}-{max} yaş arası');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange.options', 'above', '{min} yaş ve üzeri');

  -- Duration Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.duration.options', 'years', 'years');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.duration.options', 'moreThan', 'More than');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration.options', 'years', 'yıl');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration.options', 'moreThan', '');

  -- Previous Transplant Timeframe Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', 'Less than 1 year');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 years');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 years');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', 'More than 5 years');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', '1 yıldan az');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 yıl');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 yıl');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', '5 yıldan fazla');

  -- Medical History Buttons
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'yes', 'Yes');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'no', 'No');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'yes', 'Evet');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'no', 'Hayır');

END $$;
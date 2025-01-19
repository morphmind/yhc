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
DECLARE
  step_record RECORD;
  feature_record RECORD;
  package_record RECORD;
  i INTEGER;
BEGIN
  -- Hair Analysis Steps
  FOR step_record IN (
    SELECT unnest(ARRAY['personal', 'ageRange', 'hairLoss', 'duration', 'previous', 'previousDetails', 'medical', 'photos', 'final']) AS id,
           unnest(ARRAY['You are', 'Your Age Range', 'Describe your hair loss', 'How long have you been suffering from hair loss?', 'Have you ever had a hair transplant?', 'Previous Hair Transplant Details', 'Medical History', 'Upload Photos', 'Get my analysis']) AS en_title,
           unnest(ARRAY['Select your gender for personalized analysis', 'Select your age range for personalized treatment options', 'Select the pattern that best matches your situation', 'This helps us understand the progression', 'Previous treatments are important for planning', 'Please provide details about your previous procedure', 'Please provide your medical information', 'For accurate assessment', 'Complete your information to receive your personalized hair analysis']) AS en_desc,
           unnest(ARRAY['Cinsiyetiniz', 'Yaş Aralığınız', 'Saç dökülmenizi tanımlayın', 'Ne kadar süredir saç dökülmesi yaşıyorsunuz?', 'Daha önce saç ekimi oldunuz mu?', 'Önceki Saç Ekimi Detayları', 'Tıbbi Geçmiş', 'Fotoğraf Yükleyin', 'Analizi al']) AS tr_title,
           unnest(ARRAY['Kişiselleştirilmiş analiz için cinsiyetinizi seçin', 'Kişiselleştirilmiş tedavi seçenekleri için yaş aralığınızı seçin', 'Durumunuza en uygun modeli seçin', 'Bu bilgi ilerlemeyi anlamamıza yardımcı olur', 'Önceki tedaviler planlama için önemlidir', 'Lütfen önceki işleminiz hakkında bilgi verin', 'Lütfen tıbbi bilgilerinizi girin', 'Doğru değerlendirme için', 'Kişiselleştirilmiş saç analizinizi almak için bilgilerinizi tamamlayın']) AS tr_desc
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.' || step_record.id, 'title', step_record.en_title);
    PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.' || step_record.id, 'description', step_record.en_desc);
    PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.' || step_record.id, 'title', step_record.tr_title);
    PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.' || step_record.id, 'description', step_record.tr_desc);
  END LOOP;

  -- Previous Transplant Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.yes', 'title', 'Yes');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.yes', 'description', 'I have had a hair transplant before');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.no', 'title', 'No');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.no', 'description', 'This will be my first hair transplant');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.yes', 'title', 'Evet');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.yes', 'description', 'Daha önce saç ekimi oldum');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.no', 'title', 'Hayır');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.no', 'description', 'Bu ilk saç ekimim olacak');

  -- Previous Transplant Details
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails', 'optional', 'optional');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails', 'optional', 'opsiyonel');

  -- Medical History
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'optional', 'optional');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'optional', 'opsiyonel');

  -- Photos Step
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'optional', 'optional');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'submitWithPhotos', 'Submit Analysis with Photos');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'submitWithoutPhotos', 'Submit Analysis');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'changePhoto', 'Change Photo');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'deletePhoto', 'Delete Photo');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'uploadButton', 'Upload Photo');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'optional', 'opsiyonel');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'submitWithPhotos', 'Fotoğraflarla Analizi Gönder');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'submitWithoutPhotos', 'Analizi Gönder');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'changePhoto', 'Fotoğrafı Değiştir');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'deletePhoto', 'Fotoğrafı Sil');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'uploadButton', 'Fotoğraf Yükle');

  -- Final Step Features
  FOR feature_record IN (
    SELECT unnest(ARRAY['free', 'secure', 'expert']) AS id,
           unnest(ARRAY['100% Free', 'SSL data transfer', 'Analysis from experts']) AS en_text,
           unnest(ARRAY['%100 Ücretsiz', 'SSL veri transferi', 'Uzman analizi']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', feature_record.id, feature_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', feature_record.id, feature_record.tr_text);
  END LOOP;

  -- Pricing Section
  FOR package_record IN (
    SELECT unnest(ARRAY['fue', 'dhi', 'vip']) AS id,
           unnest(ARRAY['FUE GOLD', 'DHI SAPPHIRE', 'VIP DHI SAPPHIRE']) AS en_title,
           unnest(ARRAY['(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts', '(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts', '(Up to 4,000 grafts) + 1000 € for mega session up to 5,500 grafts']) AS en_desc,
           unnest(ARRAY['FUE ALTIN', 'DHI SAFİR', 'VIP DHI SAFIR']) AS tr_title,
           unnest(ARRAY['(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €', '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €', '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 1000 €']) AS tr_desc
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'pricing.packages.' || package_record.id, 'title', package_record.en_title);
    PERFORM insert_translation_with_namespace('en', 'pricing.packages.' || package_record.id, 'description', package_record.en_desc);
    PERFORM insert_translation_with_namespace('tr', 'pricing.packages.' || package_record.id, 'title', package_record.tr_title);
    PERFORM insert_translation_with_namespace('tr', 'pricing.packages.' || package_record.id, 'description', package_record.tr_desc);
  END LOOP;

  -- Package Features
  FOR i IN 1..10 LOOP
    -- FUE Package Features
    IF i <= 8 THEN
      PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Consultation and Hairline Design by Dr. Yakışıklı'
          WHEN 2 THEN 'HD Microscope for Single and Multiple Graft Preparation'
          WHEN 3 THEN 'Next Day Result Check'
          WHEN 4 THEN 'Personal Friend and Interpreter'
          WHEN 5 THEN '5-Star Hotel Accommodation'
          WHEN 6 THEN 'VIP Pickup and Transfers'
          WHEN 7 THEN 'FotoFinder Trichoscale AI Donor Area Hair Analysis'
          WHEN 8 THEN 'Oxygen Therapy Treatment'
        END
      ));
      
      PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı'
          WHEN 2 THEN 'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop'
          WHEN 3 THEN 'Ertesi Gün Sonuç Kontrolü'
          WHEN 4 THEN 'Kişisel Arkadaş ve Tercüman'
          WHEN 5 THEN '5 Yıldızlı Otel Konaklaması'
          WHEN 6 THEN 'VIP Alım ve Transferler'
          WHEN 7 THEN 'FotoFinder Trichoscale AI Donör Alanı Saç Analizi'
          WHEN 8 THEN 'Oksijen Terapi Tedavisi'
        END
      ));
    END IF;

    -- DHI Package Features
    IF i <= 9 THEN
      PERFORM insert_translation_with_namespace('en', 'pricing.packages.dhi.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Consultation and Hairline Design by Dr. Yakışıklı'
          WHEN 2 THEN 'HD Microscope for Single and Multiple Graft Preparation'
          WHEN 3 THEN 'Next Day Result Check'
          WHEN 4 THEN 'Personal Friend and Interpreter'
          WHEN 5 THEN '5-Star Hotel Accommodation'
          WHEN 6 THEN 'VIP Pickup and Transfers'
          WHEN 7 THEN 'FotoFinder Trichoscale AI Donor Area Hair Analysis'
          WHEN 8 THEN 'Oxygen Therapy Treatment'
          WHEN 9 THEN '2 Months Hair Enhancement Package'
        END
      ));
      
      PERFORM insert_translation_with_namespace('tr', 'pricing.packages.dhi.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı'
          WHEN 2 THEN 'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop'
          WHEN 3 THEN 'Ertesi Gün Sonuç Kontrolü'
          WHEN 4 THEN 'Kişisel Arkadaş ve Tercüman'
          WHEN 5 THEN '5 Yıldızlı Otel Konaklaması'
          WHEN 6 THEN 'VIP Alım ve Transferler'
          WHEN 7 THEN 'FotoFinder Trichoscale AI Donör Alanı Saç Analizi'
          WHEN 8 THEN 'Oksijen Terapi Tedavisi'
          WHEN 9 THEN '2 Aylık Saç Güçlendirme Paketi'
        END
      ));
    END IF;

    -- VIP Package Features
    IF i <= 10 THEN
      PERFORM insert_translation_with_namespace('en', 'pricing.packages.vip.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Consultation and Hairline Design by Dr. Yakışıklı'
          WHEN 2 THEN 'Surgery performed by Dr. Yakışıklı'
          WHEN 3 THEN 'HD Microscope for Single and Multiple Graft Preparation'
          WHEN 4 THEN 'Next Day Result Check'
          WHEN 5 THEN 'Personal Friend and Interpreter'
          WHEN 6 THEN '5-Star Hotel Accommodation'
          WHEN 7 THEN 'VIP Pickup and Transfers'
          WHEN 8 THEN 'FotoFinder Trichoscale AI Donor Area Hair Analysis'
          WHEN 9 THEN 'Oxygen Therapy Treatment'
          WHEN 10 THEN '4 Months Hair Enhancement Package'
        END
      ));
      
      PERFORM insert_translation_with_namespace('tr', 'pricing.packages.vip.features.items', i::text, (
        CASE i
          WHEN 1 THEN 'Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı'
          WHEN 2 THEN 'Dr. Yakışıklı''nın ameliyat kesisi'
          WHEN 3 THEN 'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop'
          WHEN 4 THEN 'Ertesi Gün Sonuç Kontrolü'
          WHEN 5 THEN 'Kişisel Arkadaş ve Tercüman'
          WHEN 6 THEN '5 Yıldızlı Otel Konaklaması'
          WHEN 7 THEN 'VIP Alım ve Transferler'
          WHEN 8 THEN 'FotoFinder Trichoscale AI Donör Alanı Saç Analizi'
          WHEN 9 THEN 'Oksijen Terapi Tedavisi'
          WHEN 10 THEN '4 Aylık Saç Güçlendirme Paketi'
        END
      ));
    END IF;
  END LOOP;

  -- Package Labels
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'placement', 'Placement');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'technique', 'Technique');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.labels', 'whatsapp', 'Get Info on WhatsApp');

  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'placement', 'Yerleştirme');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'technique', 'Teknik');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.labels', 'whatsapp', 'WhatsApp''tan Bilgi Al');

  -- Package Popular Label
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.dhi', 'popular', 'Most Popular');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.dhi', 'popular', 'En popüler');

END $$;
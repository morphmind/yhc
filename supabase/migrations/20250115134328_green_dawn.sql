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

-- Import English translations for Pricing
SELECT insert_translation_with_namespace('en', 'pricing', 'badge', 'Transparent Pricing');
SELECT insert_translation_with_namespace('en', 'pricing', 'title', 'Our Packages');
SELECT insert_translation_with_namespace('en', 'pricing', 'description', 'Clear and transparent pricing for your hair transplant operation. All packages include VIP transfers and 5-star hotel accommodation.');
SELECT insert_translation_with_namespace('en', 'pricing', 'graftNote', 'The exact number of grafts will be determined by Dr. Yakışıklı during the consultation.');
SELECT insert_translation_with_namespace('en', 'pricing', 'securePayment', 'Secure payment options');

-- Import Turkish translations for Pricing
SELECT insert_translation_with_namespace('tr', 'pricing', 'badge', 'Şeffaf Fiyat Politikası');
SELECT insert_translation_with_namespace('tr', 'pricing', 'title', 'Fiyatlarımız');
SELECT insert_translation_with_namespace('tr', 'pricing', 'description', 'Saç ekimi operasyonunuz için net ve şeffaf fiyatlandırma. Tüm paketlerimiz VIP transfer ve 5 yıldızlı otel konaklaması içerir.');
SELECT insert_translation_with_namespace('tr', 'pricing', 'graftNote', 'Tam greft sayısı Dr. Yakışıklı tarafından konsültasyon sırasında belirlenecektir.');
SELECT insert_translation_with_namespace('tr', 'pricing', 'securePayment', 'Güvenli ödeme seçenekleri');

-- Import English translations for Hair Analysis
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'title', 'Error');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'requiredFields', 'Please fill in all required fields');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'submitError', 'An error occurred while submitting the form. Please try again');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'title', 'Success');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'description', 'Dear {name}, your hair analysis request has been received. Our medical team will review your case and contact you shortly via WhatsApp for a personalized consultation.');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'title', 'Sending');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'description', 'Processing your request...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'processing', 'Processing your information...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'uploading', 'Uploading your photos...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'sending', 'Sending your request...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'email', 'Sending confirmation email...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Finalizing your submission...');

-- Import Turkish translations for Hair Analysis
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'title', 'Hata');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'requiredFields', 'Lütfen tüm gerekli alanları doldurun');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'submitError', 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.success', 'title', 'Başarılı');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.success', 'description', 'Sayın {name}, saç analizi talebiniz alınmıştır. Medikal ekibimiz durumunuzu inceleyip kişisel danışmanlık için en kısa sürede WhatsApp üzerinden sizinle iletişime geçecektir.');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading', 'title', 'Gönderiliyor');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading', 'description', 'İsteğiniz işleniyor...');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'processing', 'Bilgileriniz işleniyor...');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'uploading', 'Fotoğraflarınız yükleniyor...');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'sending', 'İsteğiniz gönderiliyor...');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'email', 'Onay e-postası gönderiliyor...');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Başvurunuz tamamlanıyor...');

-- Import English translations for Packages
SELECT insert_translation_with_namespace('en', 'pricing.packages.fue', 'title', 'FUE GOLD');
SELECT insert_translation_with_namespace('en', 'pricing.packages.fue', 'description', '(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts');
SELECT insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'placement', 'Forceps');
SELECT insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'technique', 'Sapphire Blade');

SELECT insert_translation_with_namespace('en', 'pricing.packages.dhi', 'title', 'DHI SAPPHIRE');
SELECT insert_translation_with_namespace('en', 'pricing.packages.dhi', 'description', '(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts');
SELECT insert_translation_with_namespace('en', 'pricing.packages.dhi', 'popular', 'Most Popular');
SELECT insert_translation_with_namespace('en', 'pricing.packages.dhi.features', 'placement', 'DHI Implanter Pen');
SELECT insert_translation_with_namespace('en', 'pricing.packages.dhi.features', 'technique', 'Micro Sapphire Blade');

SELECT insert_translation_with_namespace('en', 'pricing.packages.vip', 'title', 'VIP DHI SAPPHIRE');
SELECT insert_translation_with_namespace('en', 'pricing.packages.vip', 'description', '(Up to 4,000 grafts) + 1000 € for mega session up to 5,500 grafts');
SELECT insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'placement', 'DHI Implanter Pen');
SELECT insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'technique', 'Micro Sapphire Blade');

-- Import Turkish translations for Packages
SELECT insert_translation_with_namespace('tr', 'pricing.packages.fue', 'title', 'FUE ALTIN');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.fue', 'description', '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'placement', 'Forseps');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'technique', 'Safir Bıçak');

SELECT insert_translation_with_namespace('tr', 'pricing.packages.dhi', 'title', 'DHI SAFİR');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.dhi', 'description', '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.dhi', 'popular', 'En popüler');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.dhi.features', 'placement', 'DHI İmplanter Kalemi');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.dhi.features', 'technique', 'Mikro Safir Bıçak');

SELECT insert_translation_with_namespace('tr', 'pricing.packages.vip', 'title', 'VIP DHI SAFIR');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.vip', 'description', '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 1000 €');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'placement', 'DHI İmplanter Kalemi');
SELECT insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'technique', 'Mikro Safir Bıçak');

-- Import Package Features
DO $$ 
BEGIN
  -- FUE Package Features
  FOR i IN 1..8 LOOP
    PERFORM insert_translation_with_namespace(
      'en',
      'pricing.packages.fue.features.items',
      i::text,
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
    );
    
    PERFORM insert_translation_with_namespace(
      'tr',
      'pricing.packages.fue.features.items',
      i::text,
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
    );
  END LOOP;

  -- DHI Package Features
  FOR i IN 1..9 LOOP
    PERFORM insert_translation_with_namespace(
      'en',
      'pricing.packages.dhi.features.items',
      i::text,
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
    );
    
    PERFORM insert_translation_with_namespace(
      'tr',
      'pricing.packages.dhi.features.items',
      i::text,
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
    );
  END LOOP;

  -- VIP Package Features
  FOR i IN 1..10 LOOP
    PERFORM insert_translation_with_namespace(
      'en',
      'pricing.packages.vip.features.items',
      i::text,
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
    );
    
    PERFORM insert_translation_with_namespace(
      'tr',
      'pricing.packages.vip.features.items',
      i::text,
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
    );
  END LOOP;
END $$;
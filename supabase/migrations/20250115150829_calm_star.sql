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

-- Import all translations from en.ts and tr.ts
DO $$ 
DECLARE
  service_record RECORD;
  tech_record RECORD;
  filter_record RECORD;
  timeframe_record RECORD;
  label_record RECORD;
  cta_record RECORD;
  i INTEGER;
BEGIN
  -- Hair Analysis Toast Messages
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'title', 'Error');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'requiredFields', 'Please fill in all required fields');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'submitError', 'An error occurred while submitting the form. Please try again');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'title', 'Hata');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'requiredFields', 'Lütfen tüm gerekli alanları doldurun');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.error', 'submitError', 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin');

  -- Success Messages
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'title', 'Success');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'description', 'Dear {name}, your hair analysis request has been received. Our medical team will review your case and contact you shortly via WhatsApp for a personalized consultation.');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.success', 'title', 'Başarılı');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.success', 'description', 'Sayın {name}, saç analizi talebiniz alınmıştır. Medikal ekibimiz durumunuzu inceleyip kişisel danışmanlık için en kısa sürede WhatsApp üzerinden sizinle iletişime geçecektir.');

  -- Loading Messages
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'title', 'Sending');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'description', 'Processing your request...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'processing', 'Processing your information...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'uploading', 'Uploading your photos...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'sending', 'Sending your request...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'email', 'Sending confirmation email...');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Finalizing your submission...');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading', 'title', 'Gönderiliyor');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading', 'description', 'İsteğiniz işleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'processing', 'Bilgileriniz işleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'uploading', 'Fotoğraflarınız yükleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'sending', 'İsteğiniz gönderiliyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'email', 'Onay e-postası gönderiliyor...');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Başvurunuz tamamlanıyor...');

  -- Doctor Messages
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'name', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'title', 'Hair transplant surgeon');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'status', 'Online');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'consultButton', 'Consult on WhatsApp');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'name', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'title', 'Saç ekimi uzmanı');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'status', 'Çevrimiçi');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'consultButton', 'WhatsApp''tan Danışın');

  -- Doctor Messages - Detailed
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'personal', 'Welcome! Understanding your gender helps us create a personalized treatment plan. Hair loss patterns and treatment approaches can vary significantly between men and women.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'ageRange', 'Your age plays a crucial role in determining the most effective hair restoration approach. Hair loss patterns and hormonal factors vary significantly across different age groups.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'hairLoss', 'Let me help you understand your hair loss pattern. Each stage requires a unique approach, and by identifying your specific pattern, we can develop a customized treatment plan that will give you the best possible results.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'duration', 'Understanding how long you''ve been experiencing hair loss is crucial for your treatment plan. The duration helps us assess the progression rate and stability of your hair loss.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'previous', 'Hereditary hair loss (androgenetic alopecia) is often the cause of hair loss');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'previousDetails', 'The details of your previous transplant help us understand your hair restoration journey and determine the best approach for achieving your desired results.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'medical', 'Your medical history is essential for ensuring a safe and successful procedure. Any allergies, conditions, or medications can impact your treatment plan and recovery.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'photos', 'Clear photos help us provide the most accurate assessment of your situation.');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'final', 'We''re almost there! Please provide your contact information so we can send you a detailed analysis of your case and discuss the best treatment options for your needs.');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'personal', 'Hoş geldiniz! Cinsiyetinizi anlamak, kişiselleştirilmiş bir tedavi planı oluşturmamıza yardımcı olur. Saç dökülme şekilleri ve tedavi yaklaşımları kadınlar ve erkekler arasında önemli farklılıklar gösterebilir.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'ageRange', 'Yaşınız, en etkili saç restorasyonu yaklaşımını belirlemede çok önemli bir rol oynar. Saç dökülme şekilleri ve hormonal faktörler farklı yaş gruplarında önemli ölçüde değişiklik gösterir.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'hairLoss', 'Saç dökülme modelinizi anlamanıza yardımcı olayım. Her aşama benzersiz bir yaklaşım gerektirir ve sizin özel modelinizi belirleyerek, en iyi sonuçları elde edebileceğiniz kişiselleştirilmiş bir tedavi planı geliştirebiliriz.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'duration', 'Saç dökülmesi sürenizi anlamak tedavi planınız için çok önemlidir. Süre, saç dökülmenizin ilerleme hızını ve stabilitesini değerlendirmemize yardımcı olur.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'previous', 'Kalıtsal saç dökülmesi (androgenetik alopesi) genellikle saç dökülmesinin nedenidir');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'previousDetails', 'Önceki saç ekimi detaylarınız, saç restorasyon yolculuğunuzu anlamamıza ve istediğiniz sonuçları elde etmek için en iyi yaklaşımı belirlememize yardımcı olur.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'medical', 'Tıbbi geçmişiniz, güvenli ve başarılı bir prosedür sağlamak için çok önemlidir. Herhangi bir alerji, durum veya ilaç tedavi planınızı ve iyileşmenizi etkileyebilir.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'photos', 'Net fotoğraflar durumunuzun en doğru şekilde değerlendirilmesine yardımcı olur.');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'final', 'Neredeyse bitti! Lütfen iletişim bilgilerinizi paylaşın ki vakınızın detaylı analizini gönderelim ve ihtiyaçlarınıza en uygun tedavi seçeneklerini görüşebilelim.');

  -- Treatment Process
  PERFORM insert_translation_with_namespace('en', 'home.experience.process', 'badge', 'Treatment Process');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process', 'title', 'Your Journey to New Hair');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process', 'description', 'Experience a seamless and comfortable hair transplant journey with our step-by-step process designed for your convenience.');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.process', 'badge', 'Tedavi Süreci');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process', 'title', 'Yeni Saçlarınıza Giden Yolculuk');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process', 'description', 'Konforunuz için tasarlanmış adım adım sürecimizle sorunsuz ve rahat bir saç ekimi deneyimi yaşayın.');

  -- Process Steps
  FOR i IN 1..4 LOOP
    -- English steps
    CASE i
      WHEN 1 THEN
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.1', 'title', 'Consultation');
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.1', 'description', 'Detailed analysis and personalized treatment plan with our expert medical team');
      WHEN 2 THEN
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.2', 'title', 'Arrival');
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.2', 'description', 'VIP airport transfer and comfortable accommodation in a luxury hotel');
      WHEN 3 THEN
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.3', 'title', 'Operation');
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.3', 'description', 'Advanced hair transplant procedure with the latest technology');
      WHEN 4 THEN
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.4', 'title', 'Recovery');
        PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps.4', 'description', 'Comprehensive aftercare and long-term follow-up support');
    END CASE;

    -- Turkish steps
    CASE i
      WHEN 1 THEN
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.1', 'title', 'Konsültasyon');
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.1', 'description', 'Uzman medikal ekibimizle detaylı analiz ve kişiselleştirilmiş tedavi planı');
      WHEN 2 THEN
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.2', 'title', 'Varış');
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.2', 'description', 'VIP havalimanı transferi ve lüks otelde konforlu konaklama');
      WHEN 3 THEN
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.3', 'title', 'Operasyon');
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.3', 'description', 'En son teknoloji ile gelişmiş saç ekimi prosedürü');
      WHEN 4 THEN
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.4', 'title', 'İyileşme');
        PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps.4', 'description', 'Kapsamlı bakım ve uzun vadeli takip desteği');
    END CASE;
  END LOOP;

  -- Services Section
  PERFORM insert_translation_with_namespace('en', 'home.experience.services', 'badge', 'Premium Services');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services', 'title', 'Exclusive Patient Services');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services', 'description', 'Enjoy premium services designed to make your hair transplant experience comfortable and stress-free.');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services', 'badge', 'Premium Hizmetler');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services', 'title', 'Özel Hasta Hizmetleri');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services', 'description', 'Saç ekimi deneyiminizi rahat ve stressiz hale getirmek için tasarlanmış premium hizmetlerimizden yararlanın.');

  -- Service Items
  FOR service_record IN (
    SELECT unnest(ARRAY['vip', 'accommodation', 'transfer', 'support']) AS id,
           unnest(ARRAY['VIP Services', 'Hotel & Stay', 'Transfer Services', 'Patient Support']) AS en_title,
           unnest(ARRAY['Experience luxury and comfort throughout your stay', 'Comfortable accommodation in premium hotels', 'Seamless transportation for your convenience', 'Comprehensive care and assistance']) AS en_desc,
           unnest(ARRAY['VIP Hizmetler', 'Otel & Konaklama', 'Transfer Hizmetleri', 'Hasta Desteği']) AS tr_title,
           unnest(ARRAY['Konaklamanız boyunca lüks ve konfor deneyimi', 'Premium otellerde konforlu konaklama', 'Konforunuz için sorunsuz ulaşım', 'Kapsamlı bakım ve yardım']) AS tr_desc
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.' || service_record.id, 'title', service_record.en_title);
    PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.' || service_record.id, 'description', service_record.en_desc);
    PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.' || service_record.id, 'title', service_record.tr_title);
    PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.' || service_record.id, 'description', service_record.tr_desc);
  END LOOP;

  -- Support Section
  PERFORM insert_translation_with_namespace('en', 'home.experience.support', 'badge', '24/7 Support');
  PERFORM insert_translation_with_namespace('en', 'home.experience.support', 'title', 'We''re Here to Help You');
  PERFORM insert_translation_with_namespace('en', 'home.experience.support', 'description', 'Get in touch with our patient support team anytime. We''re available 24/7 to answer your questions and provide assistance.');
  PERFORM insert_translation_with_namespace('en', 'home.experience.support.cta', 'whatsapp', 'Chat on WhatsApp');
  PERFORM insert_translation_with_namespace('en', 'home.experience.support.cta', 'schedule', 'Schedule Consultation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.support.cta', 'call', 'Call Now');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.support', 'badge', '7/24 Destek');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.support', 'title', 'Size Yardımcı Olmak İçin Buradayız');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.support', 'description', 'Hasta destek ekibimizle iletişime geçin. Sorularınızı yanıtlamak ve yardımcı olmak için 7/24 hizmetinizdeyiz.');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.support.cta', 'whatsapp', 'WhatsApp''tan Yazın');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.support.cta', 'schedule', 'Konsültasyon Planla');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.support.cta', 'call', 'Hemen Ara');

  -- Treatment Options
  PERFORM insert_translation_with_namespace('en', 'treatments', 'title', 'Treatment Options');
  PERFORM insert_translation_with_namespace('en', 'treatments', 'description', 'Discover our advanced hair transplant techniques for natural-looking results');
  PERFORM insert_translation_with_namespace('tr', 'treatments', 'title', 'Tedavi Seçenekleri');
  PERFORM insert_translation_with_namespace('tr', 'treatments', 'description', 'Doğal görünümlü sonuçlar için gelişmiş saç ekimi tekniklerimizi keşfedin');

  -- Treatment Types
  FOR tech_record IN (
    SELECT unnest(ARRAY['hair', 'afro', 'women', 'beard', 'eyebrow']) AS id,
           unnest(ARRAY['Hair Transplant', 'Afro Hair Transplant', 'Women Hair Transplant', 'Beard Transplant', 'Eyebrow Transplant']) AS en_title,
           unnest(ARRAY['Restore your natural hairline with our advanced hair transplant techniques', 'Specialized techniques for African hair types', 'Tailored solutions for female pattern hair loss', 'Achieve a fuller, natural-looking beard', 'Restore or enhance your eyebrows permanently']) AS en_desc,
           unnest(ARRAY['Saç Ekimi', 'Afro Saç Ekimi', 'Kadınlarda Saç Ekimi', 'Sakal Ekimi', 'Kaş Ekimi']) AS tr_title,
           unnest(ARRAY['Gelişmiş saç ekimi teknikleriyle doğal saç çizginize kavuşun', 'Afrika tipi saçlar için özel teknikler', 'Kadınlara özel saç dökülmesi çözümleri', 'Daha dolgun ve doğal görünümlü sakal', 'Kaşlarınızı kalıcı olarak dolgunlaştırın']) AS tr_desc
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'treatments.options.' || tech_record.id, 'title', tech_record.en_title);
    PERFORM insert_translation_with_namespace('en', 'treatments.options.' || tech_record.id, 'description', tech_record.en_desc);
    PERFORM insert_translation_with_namespace('tr', 'treatments.options.' || tech_record.id, 'title', tech_record.tr_title);
    PERFORM insert_translation_with_namespace('tr', 'treatments.options.' || tech_record.id, 'description', tech_record.tr_desc);
  END LOOP;

  -- Gallery Section
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery', 'title', 'Success Stories');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery', 'description', 'Explore our collection of successful hair transplant transformations');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery', 'title', 'Başarı Hikayeleri');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery', 'description', 'Başarılı saç ekimi dönüşümlerimizi keşfedin');

  -- Gallery Filters
  FOR filter_record IN (
    SELECT unnest(ARRAY['all', 'hair', 'afro', 'beard', 'eyebrow', 'women']) AS id,
           unnest(ARRAY['All Cases', 'Hair Transplant', 'Afro Hair Transplant', 'Beard Transplant', 'Eyebrow Transplant', 'Women Cases']) AS en_text,
           unnest(ARRAY['Tüm Vakalar', 'Saç Ekimi', 'Afro Saç Ekimi', 'Sakal Ekimi', 'Kaş Ekimi', 'Kadın Vakaları']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'treatments.gallery.filters', filter_record.id, filter_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.filters', filter_record.id, filter_record.tr_text);
  END LOOP;

  -- Gallery Timeframes
  FOR timeframe_record IN (
    SELECT unnest(ARRAY['month3', 'month6', 'month12', 'final']) AS id,
           unnest(ARRAY['3 Months', '6 Months', '12 Months', 'Final Result']) AS en_text,
           unnest(ARRAY['3 Ay', '6 Ay', '12 Ay', 'Final Sonuç']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'treatments.gallery.timeframes', timeframe_record.id, timeframe_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.timeframes', timeframe_record.id, timeframe_record.tr_text);
  END LOOP;

  -- Gallery Labels
  FOR label_record IN (
    SELECT unnest(ARRAY['before', 'after', 'watchStory', 'watchOnYoutube']) AS id,
           unnest(ARRAY['Before', 'After', 'Watch Story', 'Watch on YouTube']) AS en_text,
           unnest(ARRAY['Öncesi', 'Sonrası', 'Hikayeyi İzle', 'YouTube''da İzle']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', label_record.id, label_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', label_record.id, label_record.tr_text);
  END LOOP;

  -- Gallery CTA
  FOR cta_record IN (
    SELECT unnest(ARRAY['analyze', 'whatsapp', 'schedule', 'call']) AS id,
           unnest(ARRAY['Get Your Free Analysis', 'Chat on WhatsApp', 'Schedule Consultation', 'Call Now']) AS en_text,
           unnest(ARRAY['Ücretsiz Analiz Al', 'WhatsApp''tan Yazın', 'Konsültasyon Planla', 'Hemen Ara']) AS tr_text
  ) LOOP
    PERFORM insert_translation_with_namespace('en', 'treatments.gallery.cta', cta_record.id, cta_record.en_text);
    PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.cta', cta_record.id, cta_record.tr_text);
  END LOOP;

END $$;
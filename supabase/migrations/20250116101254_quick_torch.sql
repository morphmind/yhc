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

-- Import doctor page translations
DO $$ 
BEGIN
  -- Doctor Page - English
  PERFORM insert_translation_with_namespace('en', 'doctor', 'title', 'Hair Transplant Surgeon');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'name', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'description', 'With over 12 years of experience as a pioneer in hair transplantation, Dr. Mustafa Yakışıklı achieves natural and permanent results using the latest technologies and innovative techniques.');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'bio', 'Doctor Mustafa YAKIŞIKLI was born in Ankara in 1986. He completed his high school education at Bursa IŞIKLAR Military High School and his university education at Eskişehir Osmangazi Medical Faculty. After graduating from medical school, Dr. Yakışıklı specialized in Medical Aesthetics. He has furthered his expertise by attending numerous international workshops and conferences on hair transplantation, staying at the forefront of advancements in the field.');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'experience', 'Dr. Yakışıklı has extensive experience working in various esteemed hospitals and clinics, including Kırşehir Çiçekdağı State Hospital, where he served as Chief Physician for 2 years. With over 8 years of experience in hair transplantation, he has successfully performed numerous procedures, earning a reputation for excellence in patient care and outcomes. In recognition of his contributions to the medical field, Dr. Yakışıklı was awarded the 2017 Doctor of the Year by the Ministry of Health of Turkey. He is also a proud member of the European Society of Hair Restoration Surgery (ESHRS), ensuring that he remains up-to-date with the latest advancements and best practices in hair restoration.');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'interests', 'In addition to his professional achievements, Dr. Yakışıklı is proficient in English and enjoys painting and advanced programming, which reflect his diverse interests and dedication to continuous learning.');
  PERFORM insert_translation_with_namespace('en', 'doctor', 'commitment', 'Dr. Yakışıklı''s commitment to providing the highest standard of care and his extensive expertise make him a trusted name in the field of hair transplantation and medical aesthetics.');

  -- Stats - English
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'operations.value', '15K+');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'operations.label', 'Successful Operations');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'experience.value', '12+');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'experience.label', 'Years Experience');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'certificates.value', '25+');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'certificates.label', 'International Certificates');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'rating.value', '4.9/5');
  PERFORM insert_translation_with_namespace('en', 'doctor.stats', 'rating.label', 'Patient Rating');

  -- Achievements - English
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'education.title', 'Education');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'education.items', '["Eskişehir Osmangazi Medical Faculty", "Bursa IŞIKLAR Military High School", "Specialized in Medical Aesthetics"]');
  
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'awards.title', 'Awards & Recognition');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'awards.items', '["2017 Doctor of the Year - Ministry of Health of Turkey", "Member of European Society of Hair Restoration Surgery (ESHRS)", "Multiple International Workshop Certifications"]');
  
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'experience.title', 'Professional Experience');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'experience.items', '["Chief Physician - Kırşehir Çiçekdağı State Hospital (2 years)", "8+ years specialized in Hair Transplantation", "Extensive experience in various hospitals and clinics"]');
  
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'languages.title', 'Languages');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'languages.items', '["Turkish (Native)", "English (Professional)", "Medical Terminology Expert"]');
  
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'interests.title', 'Interests & Skills');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'interests.items', '["Painting", "Advanced Programming", "Continuous Medical Education"]');
  
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'research.title', 'Research & Innovation');
  PERFORM insert_translation_with_namespace('en', 'doctor.achievements', 'research.items', '["Latest Hair Transplant Techniques", "Medical Aesthetics Advancements", "Patient Care Optimization"]');

  -- CTA Section - English
  PERFORM insert_translation_with_namespace('en', 'doctor.cta', 'title', 'Ready to Start Your Hair Restoration Journey?');
  PERFORM insert_translation_with_namespace('en', 'doctor.cta', 'description', 'Book your free consultation with Dr. Yakışıklı and take the first step towards regaining your confidence with a natural-looking hairline.');
  PERFORM insert_translation_with_namespace('en', 'doctor.cta', 'consultation', 'Book Free Consultation');
  PERFORM insert_translation_with_namespace('en', 'doctor.cta', 'whatsapp', 'WhatsApp Consultation');
  PERFORM insert_translation_with_namespace('en', 'doctor.cta', 'call', 'Call Now');

  -- Doctor Page - Turkish
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'title', 'Saç Ekimi Cerrahı');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'name', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'description', '12 yılı aşkın deneyimiyle saç ekimi alanında öncü bir isim olan Dr. Mustafa Yakışıklı, en son teknolojileri ve yenilikçi teknikleri kullanarak doğal ve kalıcı sonuçlar elde etmektedir.');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'bio', 'Doktor Mustafa YAKIŞIKLI 1986 yılında Ankara''da doğdu. Lise eğitimini Bursa IŞIKLAR Askeri Lisesi''nde, üniversite eğitimini ise Eskişehir Osmangazi Tıp Fakültesi''nde tamamladı. Tıp fakültesinden mezun olduktan sonra Dr. Yakışıklı, Medikal Estetik alanında uzmanlaştı. Saç ekimi konusunda birçok uluslararası workshop ve konferansa katılarak uzmanlığını ilerletti ve alandaki gelişmelerin öncüsü oldu.');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'experience', 'Dr. Yakışıklı, Kırşehir Çiçekdağı Devlet Hastanesi dahil olmak üzere çeşitli saygın hastane ve kliniklerde görev yaptı ve burada 2 yıl Başhekim olarak görev yaptı. 8 yılı aşkın saç ekimi deneyimiyle, birçok başarılı operasyon gerçekleştirdi ve hasta bakımı ve sonuçları konusunda mükemmellik için bir üne kavuştu. Tıp alanına katkılarından dolayı, Dr. Yakışıklı 2017 yılında Türkiye Sağlık Bakanlığı tarafından Yılın Doktoru ödülüne layık görüldü. Ayrıca, saç restorasyonundaki en son gelişmeler ve en iyi uygulamalar konusunda güncel kalmasını sağlayan Avrupa Saç Restorasyonu Cerrahisi Derneği''nin (ESHRS) gururlu bir üyesidir.');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'interests', 'Profesyonel başarılarının yanı sıra, Dr. Yakışıklı İngilizce bilmekte ve resim yapmaktan ve ileri düzey programlamadan hoşlanmaktadır, bu da onun çeşitli ilgi alanlarını ve sürekli öğrenmeye olan bağlılığını yansıtmaktadır.');
  PERFORM insert_translation_with_namespace('tr', 'doctor', 'commitment', 'Dr. Yakışıklı''nın en yüksek bakım standardını sağlama konusundaki kararlılığı ve kapsamlı uzmanlığı, onu saç ekimi ve medikal estetik alanında güvenilir bir isim haline getirmektedir.');

  -- Stats - Turkish
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'operations.value', '15K+');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'operations.label', 'Başarılı Operasyon');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'experience.value', '12+');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'experience.label', 'Yıllık Deneyim');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'certificates.value', '25+');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'certificates.label', 'Uluslararası Sertifika');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'rating.value', '4.9/5');
  PERFORM insert_translation_with_namespace('tr', 'doctor.stats', 'rating.label', 'Hasta Değerlendirmesi');

  -- Achievements - Turkish
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'education.title', 'Eğitim');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'education.items', '["Eskişehir Osmangazi Tıp Fakültesi", "Bursa IŞIKLAR Askeri Lisesi", "Medikal Estetik Uzmanlığı"]');
  
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'awards.title', 'Ödüller & Tanınırlık');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'awards.items', '["2017 Yılın Doktoru - Türkiye Sağlık Bakanlığı", "Avrupa Saç Restorasyonu Cerrahisi Derneği (ESHRS) Üyesi", "Çoklu Uluslararası Workshop Sertifikaları"]');
  
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'experience.title', 'Profesyonel Deneyim');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'experience.items', '["Başhekim - Kırşehir Çiçekdağı Devlet Hastanesi (2 yıl)", "8+ yıl Saç Ekimi uzmanlığı", "Çeşitli hastane ve kliniklerde kapsamlı deneyim"]');
  
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'languages.title', 'Diller');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'languages.items', '["Türkçe (Anadil)", "İngilizce (Profesyonel)", "Tıbbi Terminoloji Uzmanı"]');
  
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'interests.title', 'İlgi Alanları & Yetenekler');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'interests.items', '["Resim", "İleri Düzey Programlama", "Sürekli Tıp Eğitimi"]');
  
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'research.title', 'Araştırma & İnovasyon');
  PERFORM insert_translation_with_namespace('tr', 'doctor.achievements', 'research.items', '["En Son Saç Ekimi Teknikleri", "Medikal Estetik Gelişmeleri", "Hasta Bakımı Optimizasyonu"]');

  -- CTA Section - Turkish
  PERFORM insert_translation_with_namespace('tr', 'doctor.cta', 'title', 'Saç Restorasyon Yolculuğunuza Başlamaya Hazır mısınız?');
  PERFORM insert_translation_with_namespace('tr', 'doctor.cta', 'description', 'Dr. Yakışıklı ile ücretsiz konsültasyonunuzu planlayın ve doğal görünümlü saç çizginizle özgüveninizi yeniden kazanma yolunda ilk adımı atın.');
  PERFORM insert_translation_with_namespace('tr', 'doctor.cta', 'consultation', 'Ücretsiz Konsültasyon');
  PERFORM insert_translation_with_namespace('tr', 'doctor.cta', 'whatsapp', 'WhatsApp Danışma');
  PERFORM insert_translation_with_namespace('tr', 'doctor.cta', 'call', 'Hemen Ara');

END $$;
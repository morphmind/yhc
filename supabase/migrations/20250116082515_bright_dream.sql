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
  -- Additional Contact Information
  PERFORM insert_translation_with_namespace('en', 'contact', 'address', 'Babataşı, Celal Bayar Cd. 81/1, 48850 Muğla/Fethiye');
  PERFORM insert_translation_with_namespace('en', 'contact', 'workingHours', 'Monday - Saturday: 09:00 - 18:00');
  PERFORM insert_translation_with_namespace('en', 'contact', 'emergency', '24/7 Emergency Support');
  PERFORM insert_translation_with_namespace('en', 'contact', 'whatsapp', 'WhatsApp Support');

  PERFORM insert_translation_with_namespace('tr', 'contact', 'address', 'Babataşı, Celal Bayar Cd. 81/1, 48850 Muğla/Fethiye');
  PERFORM insert_translation_with_namespace('tr', 'contact', 'workingHours', 'Pazartesi - Cumartesi: 09:00 - 18:00');
  PERFORM insert_translation_with_namespace('tr', 'contact', 'emergency', '7/24 Acil Destek');
  PERFORM insert_translation_with_namespace('tr', 'contact', 'whatsapp', 'WhatsApp Destek');

  -- Additional Social Media Labels
  PERFORM insert_translation_with_namespace('en', 'social', 'followUs', 'Follow Us');
  PERFORM insert_translation_with_namespace('en', 'social', 'shareOn', 'Share on {platform}');
  PERFORM insert_translation_with_namespace('en', 'social', 'youtube', 'Watch on YouTube');
  PERFORM insert_translation_with_namespace('en', 'social', 'instagram', 'Follow on Instagram');

  PERFORM insert_translation_with_namespace('tr', 'social', 'followUs', 'Bizi Takip Edin');
  PERFORM insert_translation_with_namespace('tr', 'social', 'shareOn', '{platform} üzerinde paylaş');
  PERFORM insert_translation_with_namespace('tr', 'social', 'youtube', 'YouTube''da İzle');
  PERFORM insert_translation_with_namespace('tr', 'social', 'instagram', 'Instagram''da Takip Et');

  -- Additional SEO Translations
  PERFORM insert_translation_with_namespace('en', 'seo', 'title', 'Hair Transplant Turkey - Fethiye | Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('en', 'seo', 'keywords', 'hair transplant turkey, hair transplant fethiye, dhi hair transplant, sapphire fue, hair clinic turkey');
  PERFORM insert_translation_with_namespace('en', 'seo', 'author', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('en', 'seo', 'robots', 'index, follow');

  PERFORM insert_translation_with_namespace('tr', 'seo', 'title', 'Saç Ekimi Türkiye - Fethiye | Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('tr', 'seo', 'keywords', 'saç ekimi türkiye, saç ekimi fethiye, dhi saç ekimi, safir fue, saç ekimi kliniği');
  PERFORM insert_translation_with_namespace('tr', 'seo', 'author', 'Dr. Mustafa Yakışıklı');
  PERFORM insert_translation_with_namespace('tr', 'seo', 'robots', 'index, follow');

  -- Additional Admin Panel Labels
  PERFORM insert_translation_with_namespace('en', 'admin', 'dashboard', 'Dashboard');
  PERFORM insert_translation_with_namespace('en', 'admin', 'submissions', 'Submissions');
  PERFORM insert_translation_with_namespace('en', 'admin', 'successStories', 'Success Stories');
  PERFORM insert_translation_with_namespace('en', 'admin', 'settings', 'Settings');
  PERFORM insert_translation_with_namespace('en', 'admin', 'logout', 'Logout');

  PERFORM insert_translation_with_namespace('tr', 'admin', 'dashboard', 'Kontrol Paneli');
  PERFORM insert_translation_with_namespace('tr', 'admin', 'submissions', 'Başvurular');
  PERFORM insert_translation_with_namespace('tr', 'admin', 'successStories', 'Başarı Hikayeleri');
  PERFORM insert_translation_with_namespace('tr', 'admin', 'settings', 'Ayarlar');
  PERFORM insert_translation_with_namespace('tr', 'admin', 'logout', 'Çıkış Yap');

  -- Additional Weather Translations
  PERFORM insert_translation_with_namespace('en', 'weather', 'temperature', 'Temperature');
  PERFORM insert_translation_with_namespace('en', 'weather', 'feelsLike', 'Feels like');
  PERFORM insert_translation_with_namespace('en', 'weather', 'precipitation', 'Precipitation');
  PERFORM insert_translation_with_namespace('en', 'weather', 'forecast', 'Weather Forecast');

  PERFORM insert_translation_with_namespace('tr', 'weather', 'temperature', 'Sıcaklık');
  PERFORM insert_translation_with_namespace('tr', 'weather', 'feelsLike', 'Hissedilen');
  PERFORM insert_translation_with_namespace('tr', 'weather', 'precipitation', 'Yağış');
  PERFORM insert_translation_with_namespace('tr', 'weather', 'forecast', 'Hava Durumu');

  -- Additional Privacy Policy Translations
  PERFORM insert_translation_with_namespace('en', 'privacy', 'title', 'Privacy Policy');
  PERFORM insert_translation_with_namespace('en', 'privacy', 'lastUpdated', 'Last Updated');
  PERFORM insert_translation_with_namespace('en', 'privacy', 'dataCollection', 'Data Collection');
  PERFORM insert_translation_with_namespace('en', 'privacy', 'dataUsage', 'Data Usage');
  PERFORM insert_translation_with_namespace('en', 'privacy', 'cookies', 'Cookie Policy');

  PERFORM insert_translation_with_namespace('tr', 'privacy', 'title', 'Gizlilik Politikası');
  PERFORM insert_translation_with_namespace('tr', 'privacy', 'lastUpdated', 'Son Güncelleme');
  PERFORM insert_translation_with_namespace('tr', 'privacy', 'dataCollection', 'Veri Toplama');
  PERFORM insert_translation_with_namespace('tr', 'privacy', 'dataUsage', 'Veri Kullanımı');
  PERFORM insert_translation_with_namespace('tr', 'privacy', 'cookies', 'Çerez Politikası');

  -- Additional Terms & Conditions Translations
  PERFORM insert_translation_with_namespace('en', 'terms', 'title', 'Terms & Conditions');
  PERFORM insert_translation_with_namespace('en', 'terms', 'acceptance', 'Acceptance of Terms');
  PERFORM insert_translation_with_namespace('en', 'terms', 'services', 'Services');
  PERFORM insert_translation_with_namespace('en', 'terms', 'liability', 'Liability');
  PERFORM insert_translation_with_namespace('en', 'terms', 'termination', 'Termination');

  PERFORM insert_translation_with_namespace('tr', 'terms', 'title', 'Şartlar ve Koşullar');
  PERFORM insert_translation_with_namespace('tr', 'terms', 'acceptance', 'Şartların Kabulü');
  PERFORM insert_translation_with_namespace('tr', 'terms', 'services', 'Hizmetler');
  PERFORM insert_translation_with_namespace('tr', 'terms', 'liability', 'Sorumluluk');
  PERFORM insert_translation_with_namespace('tr', 'terms', 'termination', 'Fesih');

  -- Additional Blog Translations
  PERFORM insert_translation_with_namespace('en', 'blog', 'title', 'Blog');
  PERFORM insert_translation_with_namespace('en', 'blog', 'readMore', 'Read More');
  PERFORM insert_translation_with_namespace('en', 'blog', 'categories', 'Categories');
  PERFORM insert_translation_with_namespace('en', 'blog', 'tags', 'Tags');
  PERFORM insert_translation_with_namespace('en', 'blog', 'relatedPosts', 'Related Posts');

  PERFORM insert_translation_with_namespace('tr', 'blog', 'title', 'Blog');
  PERFORM insert_translation_with_namespace('tr', 'blog', 'readMore', 'Devamını Oku');
  PERFORM insert_translation_with_namespace('tr', 'blog', 'categories', 'Kategoriler');
  PERFORM insert_translation_with_namespace('tr', 'blog', 'tags', 'Etiketler');
  PERFORM insert_translation_with_namespace('tr', 'blog', 'relatedPosts', 'İlgili Yazılar');

  -- Additional FAQ Translations
  PERFORM insert_translation_with_namespace('en', 'faq', 'title', 'Frequently Asked Questions');
  PERFORM insert_translation_with_namespace('en', 'faq', 'searchPlaceholder', 'Search questions...');
  PERFORM insert_translation_with_namespace('en', 'faq', 'noResults', 'No results found');
  PERFORM insert_translation_with_namespace('en', 'faq', 'categories', 'FAQ Categories');
  PERFORM insert_translation_with_namespace('en', 'faq', 'helpfulAnswer', 'Was this answer helpful?');

  PERFORM insert_translation_with_namespace('tr', 'faq', 'title', 'Sık Sorulan Sorular');
  PERFORM insert_translation_with_namespace('tr', 'faq', 'searchPlaceholder', 'Soru ara...');
  PERFORM insert_translation_with_namespace('tr', 'faq', 'noResults', 'Sonuç bulunamadı');
  PERFORM insert_translation_with_namespace('tr', 'faq', 'categories', 'SSS Kategorileri');
  PERFORM insert_translation_with_namespace('tr', 'faq', 'helpfulAnswer', 'Bu cevap yardımcı oldu mu?');

END $$;
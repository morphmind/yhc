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

-- Insert Turkish translations
SELECT insert_translation_with_namespace('tr', 'home.hero.badge', 'text', 'Premium Saç Ekimi Merkezi');
SELECT insert_translation_with_namespace('tr', 'home.hero.title', 'highlight', 'Premium Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'home.hero.title', 'main', 'Türkiye''de Uzman Bakımı');
SELECT insert_translation_with_namespace('tr', 'home.hero.description', 'text', 'Dr. Mustafa Yakışıklı ile dünya standartlarında saç restorasyonu deneyimi yaşayın. Gelişmiş teknikler, doğal sonuçlar ve Türkiye''nin kalbinde kişiselleştirilmiş bakım.');
SELECT insert_translation_with_namespace('tr', 'home.hero.cta', 'analysis', 'Ücretsiz Saç Analizi');
SELECT insert_translation_with_namespace('tr', 'home.hero.cta', 'whatsapp', 'WhatsApp Danışma');
SELECT insert_translation_with_namespace('tr', 'home.hero.stats', 'operations', 'Başarılı Operasyon');
SELECT insert_translation_with_namespace('tr', 'home.hero.stats', 'growth', 'Saç Büyüme Oranı');
SELECT insert_translation_with_namespace('tr', 'home.hero.stats', 'experience', 'Yıllık Deneyim');
SELECT insert_translation_with_namespace('tr', 'home.hero.stats', 'awards', 'Sertifika ve Ödül');

-- Doctor Info
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs', 'doctorTitle', 'Saç Ekimi Cerrahı');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs', 'doctorDescription', '12 yılı aşkın deneyimiyle saç ekimi alanında öncü bir isim olan Dr. Mustafa Yakışıklı, en son teknolojileri ve yenilikçi teknikleri kullanarak doğal ve kalıcı sonuçlar elde etmektedir.');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.stats', 'certificates', '25+ Uluslararası Sertifika');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.stats', 'operations', '15,000+ Başarılı Operasyon');

-- Features
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.expertise', 'title', 'Uzman Medikal Ekip');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.expertise', 'description', 'Dr. Mustafa Yakışıklı liderliğindeki ekibimiz, yılların deneyimini en son tekniklerle birleştiriyor');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.technology', 'title', 'İleri Teknoloji');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.technology', 'description', 'En iyi sonuçlar için son teknoloji tesisler ve en yeni saç ekimi teknolojileri');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.natural', 'title', 'Doğal Sonuçlar');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.natural', 'description', 'Hassas ve sanatsal yaklaşımımızla doğal görünümlü sonuçlar elde edin');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.personalized', 'title', 'Kişiselleştirilmiş Bakım');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.personalized', 'description', 'Benzersiz ihtiyaçlarınıza ve saç restorasyon hedeflerinize göre özelleştirilmiş tedavi planları');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.aftercare', 'title', 'Ömür Boyu Takip');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.aftercare', 'description', 'Kalıcı sonuçlar için kapsamlı işlem sonrası destek ve uzun vadeli bakım');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.satisfaction', 'title', 'Hasta Memnuniyeti');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.features.satisfaction', 'description', 'Dünyanın dört bir yanından binlerce hasta uzmanlığımıza güveniyor');

-- Clinic Features
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic', 'title', 'Kliniğimizin Özellikleri');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '1', 'Son teknoloji ekipmanlar ve steril ameliyathane ortamı');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '2', 'Deneyimli medikal ekip ve özel hasta bakım hizmeti');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '3', 'Uluslararası standartlarda hizmet kalitesi');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.clinic.features', '4', '7/24 hasta destek ve takip sistemi');

-- Certifications
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications', 'title', 'Sertifikalar ve Akreditasyonlar');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications.items', 'jci', 'JCI Akreditasyonu');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications.items', 'iso', 'ISO 9001:2015');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications.items', 'ishrs', 'ISHRS Üyeliği');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.certifications.items', 'tshd', 'TSHD Üyeliği');

-- Patient Satisfaction
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction', 'title', 'Hasta Memnuniyeti');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rate', 'value', '98%');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rate', 'label', 'Hasta Memnuniyet Oranı');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.patients', 'value', '15K+');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.patients', 'label', 'Mutlu Hasta');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rating', 'value', '4.9/5');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction.stats.rating', 'label', 'Hasta Değerlendirmesi');
SELECT insert_translation_with_namespace('tr', 'home.hero.whyUs.satisfaction', 'cta', 'Ücretsiz Saç Analizi Al');

-- Treatment Process
SELECT insert_translation_with_namespace('tr', 'home.experience.process', 'badge', 'Tedavi Süreci');
SELECT insert_translation_with_namespace('tr', 'home.experience.process', 'title', 'Yeni Saçlarınıza Giden Yolculuk');
SELECT insert_translation_with_namespace('tr', 'home.experience.process', 'description', 'Konforunuz için tasarlanmış adım adım sürecimizle sorunsuz ve rahat bir saç ekimi deneyimi yaşayın.');

-- Process Steps
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.1', 'title', 'Konsültasyon');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.1', 'description', 'Uzman medikal ekibimizle detaylı analiz ve kişiselleştirilmiş tedavi planı');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.2', 'title', 'Varış');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.2', 'description', 'VIP havalimanı transferi ve lüks otelde konforlu konaklama');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.3', 'title', 'Operasyon');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.3', 'description', 'En son teknoloji ile gelişmiş saç ekimi prosedürü');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.4', 'title', 'İyileşme');
SELECT insert_translation_with_namespace('tr', 'home.experience.process.steps.4', 'description', 'Kapsamlı bakım ve uzun vadeli takip desteği');

-- Services
SELECT insert_translation_with_namespace('tr', 'home.experience.services', 'badge', 'Premium Hizmetler');
SELECT insert_translation_with_namespace('tr', 'home.experience.services', 'title', 'Özel Hasta Hizmetleri');
SELECT insert_translation_with_namespace('tr', 'home.experience.services', 'description', 'Saç ekimi deneyiminizi rahat ve stressiz hale getirmek için tasarlanmış premium hizmetlerimizden yararlanın.');

-- VIP Services
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip', 'title', 'VIP Hizmetler');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip', 'description', 'Konaklamanız boyunca lüks ve konfor deneyimi');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', '1', 'Kişisel hasta koordinatörü');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', '2', 'Lüks araç transferleri');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', '3', 'Premium otel konaklaması');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', '4', 'Özel tercüman hizmeti');

-- Accommodation
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation', 'title', 'Otel & Konaklama');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation', 'description', 'Premium otellerde konforlu konaklama');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', '1', '5 yıldızlı otel konaklaması');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', '2', 'Kahvaltı dahil');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', '3', 'Şehir merkezi konumu');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.accommodation.features', '4', 'Özel hasta imkanları');

-- Transfer Services
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer', 'title', 'Transfer Hizmetleri');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer', 'description', 'Konforunuz için sorunsuz ulaşım');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', '1', 'Havalimanı karşılama & uğurlama');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', '2', 'Otel-klinik transferleri');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', '3', 'Lüks araçlar');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.transfer.features', '4', 'Profesyonel sürücüler');

-- Support Services
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support', 'title', 'Hasta Desteği');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support', 'description', 'Kapsamlı bakım ve yardım');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', '1', '7/24 medikal destek');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', '2', 'Çok dilli ekip');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', '3', 'WhatsApp danışmanlığı');
SELECT insert_translation_with_namespace('tr', 'home.experience.services.items.support.features', '4', 'Bakım rehberliği');

-- Support Section
SELECT insert_translation_with_namespace('tr', 'home.experience.support', 'badge', '7/24 Destek');
SELECT insert_translation_with_namespace('tr', 'home.experience.support', 'title', 'Size Yardımcı Olmak İçin Buradayız');
SELECT insert_translation_with_namespace('tr', 'home.experience.support', 'description', 'Hasta destek ekibimizle iletişime geçin. Sorularınızı yanıtlamak ve yardımcı olmak için 7/24 hizmetinizdeyiz.');
SELECT insert_translation_with_namespace('tr', 'home.experience.support.cta', 'whatsapp', 'WhatsApp''tan Yazın');
SELECT insert_translation_with_namespace('tr', 'home.experience.support.cta', 'schedule', 'Konsültasyon Planla');
SELECT insert_translation_with_namespace('tr', 'home.experience.support.cta', 'call', 'Hemen Ara');

-- Treatments
SELECT insert_translation_with_namespace('tr', 'treatments', 'title', 'Tedavi Seçenekleri');
SELECT insert_translation_with_namespace('tr', 'treatments', 'description', 'Doğal görünümlü sonuçlar için gelişmiş saç ekimi tekniklerimizi keşfedin');

-- Gallery
SELECT insert_translation_with_namespace('tr', 'treatments.gallery', 'title', 'Başarı Hikayeleri');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery', 'description', 'Başarılı saç ekimi dönüşümlerimizi keşfedin');

-- Gallery Filters
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'all', 'Tüm Vakalar');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'hair', 'Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'afro', 'Afro Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'beard', 'Sakal Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'eyebrow', 'Kaş Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.filters', 'women', 'Kadın Vakaları');

-- Gallery Timeframes
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.timeframes', 'month3', '3 Ay');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.timeframes', 'month6', '6 Ay');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.timeframes', 'month12', '12 Ay');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.timeframes', 'final', 'Final Sonuç');

-- Gallery Labels
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'before', 'Öncesi');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'after', 'Sonrası');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'watchStory', 'Hikayeyi İzle');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'watchOnYoutube', 'YouTube''da İzle');

-- Gallery CTA
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.cta', 'analyze', 'Ücretsiz Analiz Al');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.cta', 'whatsapp', 'WhatsApp''tan Yazın');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.cta', 'schedule', 'Konsültasyon Planla');
SELECT insert_translation_with_namespace('tr', 'treatments.gallery.cta', 'call', 'Hemen Ara');

-- Treatment Options
SELECT insert_translation_with_namespace('tr', 'treatments.options.hair', 'title', 'Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.options.hair', 'description', 'Gelişmiş saç ekimi teknikleriyle doğal saç çizginize kavuşun');
SELECT insert_translation_with_namespace('tr', 'treatments.options.afro', 'title', 'Afro Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.options.afro', 'description', 'Afrika tipi saçlar için özel teknikler');
SELECT insert_translation_with_namespace('tr', 'treatments.options.women', 'title', 'Kadınlarda Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.options.women', 'description', 'Kadınlara özel saç dökülmesi çözümleri');
SELECT insert_translation_with_namespace('tr', 'treatments.options.beard', 'title', 'Sakal Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.options.beard', 'description', 'Daha dolgun ve doğal görünümlü sakal');
SELECT insert_translation_with_namespace('tr', 'treatments.options.eyebrow', 'title', 'Kaş Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.options.eyebrow', 'description', 'Kaşlarınızı kalıcı olarak dolgunlaştırın');

-- Technologies
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.microSapphire', 'title', 'Mikro Safir');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.microSapphire', 'description', 'Minimal iz için ultra hassas kesiler');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.dhi', 'title', 'DHI Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.dhi', 'description', 'Daha yoğun sonuçlar için direkt implantasyon');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.sapphireFue', 'title', 'Safir FUE');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.sapphireFue', 'description', 'Safir bıçaklarla premium FUE tekniği');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.needleFree', 'title', 'İğnesiz Anestezi');
SELECT insert_translation_with_namespace('tr', 'treatments.technologies.needleFree', 'description', 'Gelişmiş anesteziyle ağrısız prosedür');

-- Techniques
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue', 'title', 'FUE Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue', 'description', 'Doğal sonuçlar için tek tek foliküler çıkarma kullanan saç restorasyonunda altın standart');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue.features', '1', 'Minimal invaziv prosedür');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue.features', '2', 'İz bırakmayan yöntem');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue.features', '3', 'Hızlı iyileşme süreci');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.fue.features', '4', 'Doğal görünümlü sonuçlar');

SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi', 'title', 'DHI Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi', 'description', 'Hassas yerleştirme ve daha yoğun sonuçlar için Direkt Saç Ekimi tekniği');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi.features', '1', 'Kanal açılmaz');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi.features', '2', 'Saç derisinde minimal travma');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi.features', '3', 'Daha yüksek yoğunluk mümkün');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.dhi.features', '4', 'Daha hızlı iyileşme süreci');

SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire', 'title', 'Safir FUE');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire', 'description', 'Gelişmiş hassasiyet ve iyileşme için safir bıçaklar kullanan gelişmiş FUE tekniği');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', '1', 'Daha pürüzsüz iyileşme süreci');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', '2', 'Minimal doku hasarı');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', '3', 'Daha iyi greft sağkalımı');
SELECT insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', '4', 'Daha doğal sonuçlar');

-- Treatment CTA
SELECT insert_translation_with_namespace('tr', 'treatments.cta', 'analyze', 'Saçınızı Analiz Edin');
SELECT insert_translation_with_namespace('tr', 'treatments.cta', 'learn', 'Daha Fazla Bilgi');

-- Header
SELECT insert_translation_with_namespace('tr', 'header.contact', 'phone', '+90 536 034 48 66');
SELECT insert_translation_with_namespace('tr', 'header.contact', 'email', 'info@yakisiklihairclinic.com');
SELECT insert_translation_with_namespace('tr', 'header.contact', 'location', 'Fethiye, Türkiye');

-- Weather
SELECT insert_translation_with_namespace('tr', 'header.weather', 'humidity', 'Nem');
SELECT insert_translation_with_namespace('tr', 'header.weather', 'windSpeed', 'Rüzgar Hızı');

-- Navigation
SELECT insert_translation_with_namespace('tr', 'header.navigation', 'menu', 'Menü');
SELECT insert_translation_with_namespace('tr', 'header.navigation.about', 'title', 'Hakkımızda');
SELECT insert_translation_with_namespace('tr', 'header.navigation.about', 'doctor', 'Dr. Mustafa Yakışıklı');
SELECT insert_translation_with_namespace('tr', 'header.navigation.about', 'clinic', 'Yakışıklı Kliniği');
SELECT insert_translation_with_namespace('tr', 'header.navigation.about', 'celebrities', 'Ünlü Saç Ekimleri');
SELECT insert_translation_with_namespace('tr', 'header.navigation.about', 'certificates', 'Sertifikalar & Seminerler');

-- Hair Transplant Navigation
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant', 'title', 'Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'title', 'Tedavilerimiz');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'hair', 'Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'afro', 'Afro Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'women', 'Kadınlarda Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'beard', 'Sakal Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.treatments', 'eyebrow', 'Türkiye''de Kaş Ekimi');

-- Technologies Navigation
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.technologies', 'title', 'Teknolojilerimiz');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.technologies', 'microSapphire', 'Mikro Safir');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.technologies', 'dhi', 'DHI Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.technologies', 'sapphireFue', 'Safir FUE Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.technologies', 'needleFree', 'İğnesiz Anestezi');

-- Guide Navigation
SELECT insert_translation_with_namespace('tr', 'header.navigation.guide', 'title', 'Rehber');
SELECT insert_translation_with_namespace('tr', 'header.navigation.guide', 'natural', 'Doğal Saç Ekimi');
SELECT insert_translation_with_namespace('tr', 'header.navigation.guide', 'why', 'Neden saç ekimi yaptırmalıyım?');
SELECT insert_translation_with_namespace('tr', 'header.navigation.guide', 'how', 'Saç Ekimi Operasyonu nasıl yapılır?');

-- Other Navigation Items
SELECT insert_translation_with_namespace('tr', 'header.navigation', 'beforeAfter', 'Öncesi Sonrası');
SELECT insert_translation_with_namespace('tr', 'header.navigation', 'price', 'Fiyat');
SELECT insert_translation_with_namespace('tr', 'header.navigation', 'blog', 'Blog');
SELECT insert_translation_with_namespace('tr', 'header.navigation', 'contact', 'İletişim');
SELECT insert_translation_with_namespace('tr', 'header', 'bookConsultation', 'Ücretsiz Konsültasyon');
SELECT insert_translation_with_namespace('tr', 'header', 'toggleMenu', 'Menüyü aç/kapat');
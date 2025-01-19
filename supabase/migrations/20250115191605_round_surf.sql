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
  -- Navigation
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'back', 'Back');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'next', 'Next');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'previous', 'Previous');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'forward', 'Forward');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'step', 'STEP');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'back', 'Geri');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'next', 'İleri');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'previous', 'Önceki');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'forward', 'İleri');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'step', 'ADIM');

  -- Personal Step Options
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.personal.options', 'male', 'A man');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.personal.options', 'female', 'A woman');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal.options', 'male', 'Erkek');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal.options', 'female', 'Kadın');

  -- Package Features
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'placement', 'Forceps');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'technique', 'Sapphire Blade');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'placement', 'Forseps');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'technique', 'Safir Bıçak');

  PERFORM insert_translation_with_namespace('en', 'pricing.packages.dhi.features', 'placement', 'DHI Implanter Pen');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.dhi.features', 'technique', 'Micro Sapphire Blade');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.dhi.features', 'placement', 'DHI İmplanter Kalemi');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.dhi.features', 'technique', 'Mikro Safir Bıçak');

  PERFORM insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'placement', 'DHI Implanter Pen');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.vip.features', 'technique', 'Micro Sapphire Blade');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'placement', 'DHI İmplanter Kalemi');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.vip.features', 'technique', 'Mikro Safir Bıçak');

  -- Pricing Guide
  PERFORM insert_translation_with_namespace('en', 'pricing.guide', 'title', 'Which Package Should You Choose?');
  PERFORM insert_translation_with_namespace('en', 'pricing.guide', 'description', 'Let us help you select the perfect package');
  PERFORM insert_translation_with_namespace('en', 'pricing.guide', 'content', 'We recommend carefully reviewing our packages to make the right choice. Once you''ve identified the package that best suits your needs, you''re ready to move forward.');
  PERFORM insert_translation_with_namespace('en', 'pricing.guide', 'help', 'Need help choosing a package? Contact us for a free consultation. Let''s find the perfect option for you together.');
  PERFORM insert_translation_with_namespace('en', 'pricing.guide.cta', 'analysis', 'Free Hair Analysis');
  PERFORM insert_translation_with_namespace('en', 'pricing.guide.cta', 'contact', 'Contact Us');

  PERFORM insert_translation_with_namespace('tr', 'pricing.guide', 'title', 'Hangi Paketi Seçmelisiniz?');
  PERFORM insert_translation_with_namespace('tr', 'pricing.guide', 'description', 'Size en uygun paketi seçmenize yardımcı olalım');
  PERFORM insert_translation_with_namespace('tr', 'pricing.guide', 'content', 'Doğru seçimi yapmak için paketlerimizi detaylı incelemenizi öneririz. İhtiyaçlarınıza en uygun paketi seçtiğinizde, bir sonraki adıma geçmeye hazırsınız demektir.');
  PERFORM insert_translation_with_namespace('tr', 'pricing.guide', 'help', 'Paket seçiminde yardıma mı ihtiyacınız var? Ücretsiz danışmanlık için bizimle iletişime geçin. Size en uygun seçeneği birlikte belirleyelim.');
  PERFORM insert_translation_with_namespace('tr', 'pricing.guide.cta', 'analysis', 'Ücretsiz Saç Analizi');
  PERFORM insert_translation_with_namespace('tr', 'pricing.guide.cta', 'contact', 'İletişime Geçin');

  -- Treatment Techniques
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.fue', 'title', 'FUE Hair Transplant');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.fue', 'description', 'The gold standard in hair restoration, using individual follicular extraction for natural results');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.fue', 'title', 'FUE Saç Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.fue', 'description', 'Doğal sonuçlar için tek tek foliküler çıkarma kullanan saç restorasyonunda altın standart');

  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.dhi', 'title', 'DHI Hair Transplant');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.dhi', 'description', 'Direct Hair Implantation technique for precise placement and denser results');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.dhi', 'title', 'DHI Saç Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.dhi', 'description', 'Hassas yerleştirme ve daha yoğun sonuçlar için Direkt Saç Ekimi tekniği');

  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire', 'title', 'Sapphire FUE');
  PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire', 'description', 'Advanced FUE technique using sapphire blades for enhanced precision and healing');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire', 'title', 'Safir FUE');
  PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire', 'description', 'Gelişmiş hassasiyet ve iyileşme için safir bıçaklar kullanan gelişmiş FUE tekniği');

  -- Technique Features
  FOR i IN 1..4 LOOP
    -- FUE Features
    PERFORM insert_translation_with_namespace('en', 'treatments.techniques.fue.features', i::text, 
      CASE i
        WHEN 1 THEN 'Minimally invasive procedure'
        WHEN 2 THEN 'No linear scarring'
        WHEN 3 THEN 'Quick recovery time'
        WHEN 4 THEN 'Natural-looking results'
      END
    );
    PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.fue.features', i::text,
      CASE i
        WHEN 1 THEN 'Minimal invaziv prosedür'
        WHEN 2 THEN 'İz bırakmayan yöntem'
        WHEN 3 THEN 'Hızlı iyileşme süreci'
        WHEN 4 THEN 'Doğal görünümlü sonuçlar'
      END
    );

    -- DHI Features
    PERFORM insert_translation_with_namespace('en', 'treatments.techniques.dhi.features', i::text,
      CASE i
        WHEN 1 THEN 'No canal opening'
        WHEN 2 THEN 'Minimal trauma to scalp'
        WHEN 3 THEN 'Higher density possible'
        WHEN 4 THEN 'Faster healing process'
      END
    );
    PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.dhi.features', i::text,
      CASE i
        WHEN 1 THEN 'Kanal açılmaz'
        WHEN 2 THEN 'Saç derisinde minimal travma'
        WHEN 3 THEN 'Daha yüksek yoğunluk mümkün'
        WHEN 4 THEN 'Daha hızlı iyileşme süreci'
      END
    );

    -- Sapphire Features
    PERFORM insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', i::text,
      CASE i
        WHEN 1 THEN 'Smoother healing process'
        WHEN 2 THEN 'Minimal tissue damage'
        WHEN 3 THEN 'Better graft survival'
        WHEN 4 THEN 'More natural results'
      END
    );
    PERFORM insert_translation_with_namespace('tr', 'treatments.techniques.sapphire.features', i::text,
      CASE i
        WHEN 1 THEN 'Daha pürüzsüz iyileşme süreci'
        WHEN 2 THEN 'Minimal doku hasarı'
        WHEN 3 THEN 'Daha iyi greft sağkalımı'
        WHEN 4 THEN 'Daha doğal sonuçlar'
      END
    );
  END LOOP;

  -- Final Step Features
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'free', '100% Free');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'secure', 'SSL data transfer');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'expert', 'Analysis from experts');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'free', '%100 Ücretsiz');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'secure', 'SSL veri transferi');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'expert', 'Uzman analizi');

END $$;
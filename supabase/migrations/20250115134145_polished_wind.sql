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
CREATE OR REPLACE FUNCTION insert_translation(
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

-- Function to recursively process JSON object and insert translations
CREATE OR REPLACE FUNCTION process_translations(
  p_language_code text,
  p_namespace text,
  p_data jsonb
) RETURNS void AS $$
DECLARE
  key text;
  value jsonb;
BEGIN
  FOR key, value IN SELECT * FROM jsonb_each(p_data)
  LOOP
    IF jsonb_typeof(value) = 'object' THEN
      -- Recursively process nested objects
      PERFORM process_translations(
        p_language_code,
        CASE 
          WHEN p_namespace = '' THEN key
          ELSE p_namespace || '.' || key
        END,
        value
      );
    ELSE
      -- Insert leaf node as translation
      PERFORM insert_translation(
        p_language_code,
        p_namespace,
        key,
        value::text
      );
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Import English translations
DO $$ 
BEGIN
  -- Home section
  PERFORM process_translations('en', 'home', '{
    "hero": {
      "badge": "Premium Hair Transplant Center",
      "title": {
        "highlight": "Premium Hair Transplant",
        "main": "in Turkey with Expert Care"
      },
      "description": "Experience world-class hair restoration with Dr. Mustafa Yakışıklı. Advanced techniques, natural results, and personalized care in the heart of Turkey.",
      "cta": {
        "analysis": "Get Free Hair Analysis",
        "whatsapp": "WhatsApp Consultation"
      },
      "stats": {
        "operations": "Successful Operations",
        "growth": "Hair Growth Rate",
        "experience": "Years Experience",
        "awards": "Awards & Certificates"
      }
    }
  }'::jsonb);

  -- Treatments section
  PERFORM process_translations('en', 'treatments', '{
    "title": "Treatment Options",
    "description": "Discover our advanced hair transplant techniques for natural-looking results",
    "gallery": {
      "title": "Success Stories",
      "description": "Explore our collection of successful hair transplant transformations"
    }
  }'::jsonb);

  -- Header section
  PERFORM process_translations('en', 'header', '{
    "contact": {
      "phone": "+90 536 034 48 66",
      "email": "info@yakisiklihairclinic.com",
      "location": "Fethiye, Turkey"
    },
    "navigation": {
      "menu": "Menu",
      "about": {
        "title": "About",
        "doctor": "Dr. Mustafa Yakışıklı",
        "clinic": "Yakışıklı Clinic"
      }
    }
  }'::jsonb);
END $$;

-- Import Turkish translations
DO $$ 
BEGIN
  -- Home section
  PERFORM process_translations('tr', 'home', '{
    "hero": {
      "badge": "Premium Saç Ekimi Merkezi",
      "title": {
        "highlight": "Premium Saç Ekimi",
        "main": "Türkiye''de Uzman Bakımı"
      },
      "description": "Dr. Mustafa Yakışıklı ile dünya standartlarında saç restorasyonu deneyimi yaşayın. Gelişmiş teknikler, doğal sonuçlar ve Türkiye''nin kalbinde kişiselleştirilmiş bakım.",
      "cta": {
        "analysis": "Ücretsiz Saç Analizi",
        "whatsapp": "WhatsApp Danışma"
      },
      "stats": {
        "operations": "Başarılı Operasyon",
        "growth": "Saç Büyüme Oranı",
        "experience": "Yıllık Deneyim",
        "awards": "Sertifika ve Ödül"
      }
    }
  }'::jsonb);

  -- Treatments section
  PERFORM process_translations('tr', 'treatments', '{
    "title": "Tedavi Seçenekleri",
    "description": "Doğal görünümlü sonuçlar için gelişmiş saç ekimi tekniklerimizi keşfedin",
    "gallery": {
      "title": "Başarı Hikayeleri",
      "description": "Başarılı saç ekimi dönüşümlerimizi keşfedin"
    }
  }'::jsonb);

  -- Header section
  PERFORM process_translations('tr', 'header', '{
    "contact": {
      "phone": "+90 536 034 48 66",
      "email": "info@yakisiklihairclinic.com",
      "location": "Fethiye, Türkiye"
    },
    "navigation": {
      "menu": "Menü",
      "about": {
        "title": "Hakkımızda",
        "doctor": "Dr. Mustafa Yakışıklı",
        "clinic": "Yakışıklı Kliniği"
      }
    }
  }'::jsonb);
END $$;
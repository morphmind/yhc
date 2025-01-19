-- Create languages table if not exists
CREATE TABLE IF NOT EXISTS languages (
  code text PRIMARY KEY,
  name text NOT NULL,
  flag text NOT NULL,
  direction text NOT NULL DEFAULT 'ltr',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT languages_direction_check CHECK (direction IN ('ltr', 'rtl'))
);

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

-- Insert default languages
INSERT INTO languages (code, name, flag, direction, is_active) VALUES
  ('en', 'English', '🇬🇧', 'ltr', true),
  ('tr', 'Türkçe', '🇹🇷', 'ltr', true),
  ('de', 'Deutsch', '🇩🇪', 'ltr', true),
  ('ru', 'Русский', '🇷🇺', 'ltr', true),
  ('ar', 'العربية', '🇦🇪', 'rtl', true),
  ('es', 'Español', '🇪🇸', 'ltr', true),
  ('fr', 'Français', '🇫🇷', 'ltr', true)
ON CONFLICT (code) DO NOTHING;

-- Import all translations
DO $$ 
BEGIN
  -- Import English translations
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

  -- Import Turkish translations
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

  -- Import all translations for treatments section
  PERFORM process_translations('en', 'treatments', '{
    "title": "Treatment Options",
    "description": "Discover our advanced hair transplant techniques for natural-looking results",
    "gallery": {
      "title": "Success Stories",
      "description": "Explore our collection of successful hair transplant transformations",
      "filters": {
        "all": "All Cases",
        "hair": "Hair Transplant",
        "afro": "Afro Hair Transplant",
        "beard": "Beard Transplant",
        "eyebrow": "Eyebrow Transplant",
        "women": "Women Cases"
      }
    }
  }'::jsonb);

  PERFORM process_translations('tr', 'treatments', '{
    "title": "Tedavi Seçenekleri",
    "description": "Doğal görünümlü sonuçlar için gelişmiş saç ekimi tekniklerimizi keşfedin",
    "gallery": {
      "title": "Başarı Hikayeleri",
      "description": "Başarılı saç ekimi dönüşümlerimizi keşfedin",
      "filters": {
        "all": "Tüm Vakalar",
        "hair": "Saç Ekimi",
        "afro": "Afro Saç Ekimi",
        "beard": "Sakal Ekimi",
        "eyebrow": "Kaş Ekimi",
        "women": "Kadın Vakaları"
      }
    }
  }'::jsonb);

  -- Import all translations for header section
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

  -- Import all translations for pricing section
  PERFORM process_translations('en', 'pricing', '{
    "badge": "Transparent Pricing",
    "title": "Our Packages",
    "description": "Clear and transparent pricing for your hair transplant operation. All packages include VIP transfers and 5-star hotel accommodation.",
    "graftNote": "The exact number of grafts will be determined by Dr. Yakışıklı during the consultation.",
    "securePayment": "Secure payment options",
    "packages": {
      "fue": {
        "title": "FUE GOLD",
        "description": "(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts",
        "features": {
          "placement": "Forceps",
          "technique": "Sapphire Blade"
        }
      },
      "dhi": {
        "title": "DHI SAPPHIRE",
        "description": "(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts",
        "popular": "Most Popular",
        "features": {
          "placement": "DHI Implanter Pen",
          "technique": "Micro Sapphire Blade"
        }
      }
    }
  }'::jsonb);

  PERFORM process_translations('tr', 'pricing', '{
    "badge": "Şeffaf Fiyat Politikası",
    "title": "Fiyatlarımız",
    "description": "Saç ekimi operasyonunuz için net ve şeffaf fiyatlandırma. Tüm paketlerimiz VIP transfer ve 5 yıldızlı otel konaklaması içerir.",
    "graftNote": "Tam greft sayısı Dr. Yakışıklı tarafından konsültasyon sırasında belirlenecektir.",
    "securePayment": "Güvenli ödeme seçenekleri",
    "packages": {
      "fue": {
        "title": "FUE ALTIN",
        "description": "(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €",
        "features": {
          "placement": "Forseps",
          "technique": "Safir Bıçak"
        }
      },
      "dhi": {
        "title": "DHI SAFİR",
        "description": "(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €",
        "popular": "En popüler",
        "features": {
          "placement": "DHI İmplanter Kalemi",
          "technique": "Mikro Safir Bıçak"
        }
      }
    }
  }'::jsonb);
END $$;
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

-- Import translations for pricing section
DO $$ 
BEGIN
  -- English pricing translations
  PERFORM process_translations('en', 'pricing', '{
    "badge": "Transparent Pricing",
    "title": "Our Packages",
    "description": "Clear and transparent pricing for your hair transplant operation. All packages include VIP transfers and 5-star hotel accommodation.",
    "graftNote": "The exact number of grafts will be determined by Dr. Yakışıklı during the consultation.",
    "securePayment": "Secure payment options",
    "guide": {
      "title": "Which Package Should You Choose?",
      "description": "Let us help you select the perfect package",
      "content": "We recommend carefully reviewing our packages to make the right choice. Once you have identified the package that best suits your needs, you are ready to move forward.",
      "help": "Need help choosing a package? Contact us for a free consultation. Let us find the perfect option for you together.",
      "cta": {
        "analysis": "Free Hair Analysis",
        "contact": "Contact Us"
      }
    },
    "packages": {
      "fue": {
        "title": "FUE GOLD",
        "description": "(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts",
        "features": {
          "placement": "Forceps",
          "technique": "Sapphire Blade",
          "items": [
            "Consultation and Hairline Design by Dr. Yakışıklı",
            "HD Microscope for Single and Multiple Graft Preparation",
            "Next Day Result Check",
            "Personal Friend and Interpreter",
            "5-Star Hotel Accommodation",
            "VIP Pickup and Transfers",
            "FotoFinder Trichoscale AI Donor Area Hair Analysis",
            "Oxygen Therapy Treatment"
          ]
        }
      },
      "dhi": {
        "title": "DHI SAPPHIRE",
        "description": "(Up to 4,000 grafts) + 900 € for mega session up to 5,500 grafts",
        "popular": "Most Popular",
        "features": {
          "placement": "DHI Implanter Pen",
          "technique": "Micro Sapphire Blade",
          "items": [
            "Consultation and Hairline Design by Dr. Yakışıklı",
            "HD Microscope for Single and Multiple Graft Preparation",
            "Next Day Result Check",
            "Personal Friend and Interpreter",
            "5-Star Hotel Accommodation",
            "VIP Pickup and Transfers",
            "FotoFinder Trichoscale AI Donor Area Hair Analysis",
            "Oxygen Therapy Treatment",
            "2 Months Hair Enhancement Package"
          ]
        }
      },
      "vip": {
        "title": "VIP DHI SAPPHIRE",
        "description": "(Up to 4,000 grafts) + 1000 € for mega session up to 5,500 grafts",
        "features": {
          "placement": "DHI Implanter Pen",
          "technique": "Micro Sapphire Blade",
          "items": [
            "Consultation and Hairline Design by Dr. Yakışıklı",
            "Surgery performed by Dr. Yakışıklı",
            "HD Microscope for Single and Multiple Graft Preparation",
            "Next Day Result Check",
            "Personal Friend and Interpreter",
            "5-Star Hotel Accommodation",
            "VIP Pickup and Transfers",
            "FotoFinder Trichoscale AI Donor Area Hair Analysis",
            "Oxygen Therapy Treatment",
            "4 Months Hair Enhancement Package"
          ]
        }
      },
      "labels": {
        "placement": "Placement",
        "technique": "Technique",
        "whatsapp": "Get Info on WhatsApp"
      }
    }
  }'::jsonb);

  -- Turkish pricing translations
  PERFORM process_translations('tr', 'pricing', '{
    "badge": "Şeffaf Fiyat Politikası",
    "title": "Fiyatlarımız",
    "description": "Saç ekimi operasyonunuz için net ve şeffaf fiyatlandırma. Tüm paketlerimiz VIP transfer ve 5 yıldızlı otel konaklaması içerir.",
    "graftNote": "Tam greft sayısı Dr. Yakışıklı tarafından konsültasyon sırasında belirlenecektir.",
    "securePayment": "Güvenli ödeme seçenekleri",
    "guide": {
      "title": "Hangi Paketi Seçmelisiniz?",
      "description": "Size en uygun paketi seçmenize yardımcı olalım",
      "content": "Doğru seçimi yapmak için paketlerimizi detaylı incelemenizi öneririz. İhtiyaçlarınıza en uygun paketi seçtiğinizde, bir sonraki adıma geçmeye hazırsınız demektir.",
      "help": "Paket seçiminde yardıma mı ihtiyacınız var? Ücretsiz danışmanlık için bizimle iletişime geçin. Size en uygun seçeneği birlikte belirleyelim.",
      "cta": {
        "analysis": "Ücretsiz Saç Analizi",
        "contact": "İletişime Geçin"
      }
    },
    "packages": {
      "fue": {
        "title": "FUE ALTIN",
        "description": "(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €",
        "features": {
          "placement": "Forseps",
          "technique": "Safir Bıçak",
          "items": [
            "Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı",
            "Tek ve Çoklu Greft Hazırlığı için HD Mikroskop",
            "Ertesi Gün Sonuç Kontrolü",
            "Kişisel Arkadaş ve Tercüman",
            "5 Yıldızlı Otel Konaklaması",
            "VIP Alım ve Transferler",
            "FotoFinder Trichoscale AI Donör Alanı Saç Analizi",
            "Oksijen Terapi Tedavisi"
          ]
        }
      },
      "dhi": {
        "title": "DHI SAFİR",
        "description": "(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €",
        "popular": "En popüler",
        "features": {
          "placement": "DHI İmplanter Kalemi",
          "technique": "Mikro Safir Bıçak",
          "items": [
            "Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı",
            "Tek ve Çoklu Greft Hazırlığı için HD Mikroskop",
            "Ertesi Gün Sonuç Kontrolü",
            "Kişisel Arkadaş ve Tercüman",
            "5 Yıldızlı Otel Konaklaması",
            "VIP Alım ve Transferler",
            "FotoFinder Trichoscale AI Donör Alanı Saç Analizi",
            "Oksijen Terapi Tedavisi",
            "2 Aylık Saç Güçlendirme Paketi"
          ]
        }
      },
      "vip": {
        "title": "VIP DHI SAFIR",
        "description": "(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 1000 €",
        "features": {
          "placement": "DHI İmplanter Kalemi",
          "technique": "Mikro Safir Bıçak",
          "items": [
            "Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı",
            "Dr. Yakışıklı''nın ameliyat kesisi",
            "Tek ve Çoklu Greft Hazırlığı için HD Mikroskop",
            "Ertesi Gün Sonuç Kontrolü",
            "Kişisel Arkadaş ve Tercüman",
            "5 Yıldızlı Otel Konaklaması",
            "VIP Alım ve Transferler",
            "FotoFinder Trichoscale AI Donör Alanı Saç Analizi",
            "Oksijen Terapi Tedavisi",
            "4 Aylık Saç Güçlendirme Paketi"
          ]
        }
      },
      "labels": {
        "placement": "Yerleştirme",
        "technique": "Teknik", 
        "whatsapp": "WhatsApp''tan Bilgi Al"
      }
    }
  }'::jsonb);
END $$;
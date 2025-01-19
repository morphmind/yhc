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
BEGIN
  -- Navigation
  PERFORM insert_translation_with_namespace('en', 'header.navigation.hairTransplant.techniques', 'title', 'Techniques');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.hairTransplant.techniques', 'fue', 'FUE Hair Transplant');
  PERFORM insert_translation_with_namespace('en', 'header.navigation.hairTransplant.techniques', 'dhi', 'DHI Hair Transplant');

  PERFORM insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.techniques', 'title', 'Teknikler');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.techniques', 'fue', 'FUE Saç Ekimi');
  PERFORM insert_translation_with_namespace('tr', 'header.navigation.hairTransplant.techniques', 'dhi', 'DHI Saç Ekimi');

  -- Service Features
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', 'coordinator', 'Personal patient coordinator');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', 'transfers', 'Luxury vehicle transfers');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', 'accommodation', 'Premium hotel accommodation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', 'interpreter', 'Private interpreter service');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', 'coordinator', 'Kişisel hasta koordinatörü');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', 'transfers', 'Lüks araç transferleri');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', 'accommodation', 'Premium otel konaklaması');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.services.items.vip.features', 'interpreter', 'Özel tercüman hizmeti');

  -- Package Features
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'consultation', 'Consultation and Hairline Design by Dr. Yakışıklı');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'microscope', 'HD Microscope for Single and Multiple Graft Preparation');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'checkup', 'Next Day Result Check');
  PERFORM insert_translation_with_namespace('en', 'pricing.packages.fue.features', 'interpreter', 'Personal Friend and Interpreter');

  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'consultation', 'Dr. Yakışıklı''nın Konsültasyonu ve Saç Çizgisi Tasarımı');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'microscope', 'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'checkup', 'Ertesi Gün Sonuç Kontrolü');
  PERFORM insert_translation_with_namespace('tr', 'pricing.packages.fue.features', 'interpreter', 'Kişisel Arkadaş ve Tercüman');

  -- Treatment Process
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', 'consultation', 'Consultation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', 'arrival', 'Arrival');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', 'operation', 'Operation');
  PERFORM insert_translation_with_namespace('en', 'home.experience.process.steps', 'recovery', 'Recovery');

  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', 'consultation', 'Konsültasyon');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', 'arrival', 'Varış');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', 'operation', 'Operasyon');
  PERFORM insert_translation_with_namespace('tr', 'home.experience.process.steps', 'recovery', 'İyileşme');

  -- Gallery Labels
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'timeframe', 'Timeframe');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'grafts', 'Grafts');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'age', 'Age');
  PERFORM insert_translation_with_namespace('en', 'treatments.gallery.labels', 'rating', 'Rating');

  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'timeframe', 'Süre');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'grafts', 'Greft');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'age', 'Yaş');
  PERFORM insert_translation_with_namespace('tr', 'treatments.gallery.labels', 'rating', 'Değerlendirme');

  -- Medical History
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'allergies', 'Do you have any allergies?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'conditions', 'Do you have any chronic medical conditions?');
  PERFORM insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'medications', 'What medications are you currently taking?');

  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'allergies', 'Herhangi bir alerjiniz var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'conditions', 'Kronik bir hastalığınız var mı?');
  PERFORM insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'medications', 'Şu anda hangi ilaçları kullanıyorsunuz?');

  -- Form Validation Messages
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'required', 'This field is required');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'email', 'Please enter a valid email address');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'phone', 'Please enter a valid phone number');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'minLength', 'Must be at least {min} characters');
  PERFORM insert_translation_with_namespace('en', 'form.validation', 'maxLength', 'Must be no more than {max} characters');

  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'required', 'Bu alan zorunludur');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'email', 'Geçerli bir e-posta adresi girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'phone', 'Geçerli bir telefon numarası girin');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'minLength', 'En az {min} karakter olmalıdır');
  PERFORM insert_translation_with_namespace('tr', 'form.validation', 'maxLength', 'En fazla {max} karakter olmalıdır');

  -- Success Messages
  PERFORM insert_translation_with_namespace('en', 'messages.success', 'saved', 'Successfully saved');
  PERFORM insert_translation_with_namespace('en', 'messages.success', 'updated', 'Successfully updated');
  PERFORM insert_translation_with_namespace('en', 'messages.success', 'deleted', 'Successfully deleted');
  PERFORM insert_translation_with_namespace('en', 'messages.success', 'sent', 'Successfully sent');

  PERFORM insert_translation_with_namespace('tr', 'messages.success', 'saved', 'Başarıyla kaydedildi');
  PERFORM insert_translation_with_namespace('tr', 'messages.success', 'updated', 'Başarıyla güncellendi');
  PERFORM insert_translation_with_namespace('tr', 'messages.success', 'deleted', 'Başarıyla silindi');
  PERFORM insert_translation_with_namespace('tr', 'messages.success', 'sent', 'Başarıyla gönderildi');

  -- Error Messages
  PERFORM insert_translation_with_namespace('en', 'messages.error', 'general', 'An error occurred');
  PERFORM insert_translation_with_namespace('en', 'messages.error', 'network', 'Network error occurred');
  PERFORM insert_translation_with_namespace('en', 'messages.error', 'validation', 'Validation error');
  PERFORM insert_translation_with_namespace('en', 'messages.error', 'unauthorized', 'Unauthorized access');

  PERFORM insert_translation_with_namespace('tr', 'messages.error', 'general', 'Bir hata oluştu');
  PERFORM insert_translation_with_namespace('tr', 'messages.error', 'network', 'Ağ hatası oluştu');
  PERFORM insert_translation_with_namespace('tr', 'messages.error', 'validation', 'Doğrulama hatası');
  PERFORM insert_translation_with_namespace('tr', 'messages.error', 'unauthorized', 'Yetkisiz erişim');

  -- Loading Messages
  PERFORM insert_translation_with_namespace('en', 'messages.loading', 'general', 'Loading...');
  PERFORM insert_translation_with_namespace('en', 'messages.loading', 'saving', 'Saving...');
  PERFORM insert_translation_with_namespace('en', 'messages.loading', 'updating', 'Updating...');
  PERFORM insert_translation_with_namespace('en', 'messages.loading', 'deleting', 'Deleting...');

  PERFORM insert_translation_with_namespace('tr', 'messages.loading', 'general', 'Yükleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'messages.loading', 'saving', 'Kaydediliyor...');
  PERFORM insert_translation_with_namespace('tr', 'messages.loading', 'updating', 'Güncelleniyor...');
  PERFORM insert_translation_with_namespace('tr', 'messages.loading', 'deleting', 'Siliniyor...');

  -- Common Actions
  PERFORM insert_translation_with_namespace('en', 'actions', 'save', 'Save');
  PERFORM insert_translation_with_namespace('en', 'actions', 'cancel', 'Cancel');
  PERFORM insert_translation_with_namespace('en', 'actions', 'edit', 'Edit');
  PERFORM insert_translation_with_namespace('en', 'actions', 'delete', 'Delete');
  PERFORM insert_translation_with_namespace('en', 'actions', 'confirm', 'Confirm');

  PERFORM insert_translation_with_namespace('tr', 'actions', 'save', 'Kaydet');
  PERFORM insert_translation_with_namespace('tr', 'actions', 'cancel', 'İptal');
  PERFORM insert_translation_with_namespace('tr', 'actions', 'edit', 'Düzenle');
  PERFORM insert_translation_with_namespace('tr', 'actions', 'delete', 'Sil');
  PERFORM insert_translation_with_namespace('tr', 'actions', 'confirm', 'Onayla');

END $$;
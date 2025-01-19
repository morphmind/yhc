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

-- Hair Analysis Toast Messages
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

-- Hair Analysis Main Content
SELECT insert_translation_with_namespace('tr', 'hairAnalysis', 'title', 'Ücretsiz Saç Analizi Konsültasyonu');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis', 'description', 'Uzman medikal ekibimizden kişiselleştirilmiş saç ekimi değerlendirmesi alın. Durumunuzu analiz edip saç restorasyon yolculuğunuz için özel öneriler sunacağız.');

-- Hair Analysis Navigation
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'back', 'Geri');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'next', 'İleri');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'previous', 'Önceki');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'forward', 'İleri');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.navigation', 'step', 'ADIM');

-- Personal Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal', 'title', 'Cinsiyetiniz');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal', 'description', 'Kişiselleştirilmiş analiz için cinsiyetinizi seçin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal.options', 'male', 'Erkek');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.personal.options', 'female', 'Kadın');

-- Age Range Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange', 'title', 'Yaş Aralığınız');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange', 'description', 'Kişiselleştirilmiş tedavi seçenekleri için yaş aralığınızı seçin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange.options', 'range', '{min}-{max} yaş arası');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.ageRange.options', 'above', '{min} yaş ve üzeri');

-- Hair Loss Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss', 'title', 'Saç dökülmenizi tanımlayın');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss', 'description', 'Durumunuza en uygun modeli seçin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'none', 'Saç dökülmesi yok');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'light', 'Hafif saç çizgisi çekilmesi');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'slight-crown', 'Saç çizgisi çekilmesi + hafif tepe açılması');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'strong-crown', 'Belirgin saç çizgisi çekilmesi + tepe açılması');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'semi-bald', 'Yarı kel');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.hairLoss.options', 'bald', 'Kel');

-- Duration Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration', 'title', 'Ne kadar süredir saç dökülmesi yaşıyorsunuz?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration', 'description', 'Bu bilgi ilerlemeyi anlamamıza yardımcı olur');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration.options', 'years', 'yıl');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.duration.options', 'moreThan', '');

-- Previous Transplant Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous', 'title', 'Daha önce saç ekimi oldunuz mu?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous', 'description', 'Önceki tedaviler planlama için önemlidir');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.yes', 'title', 'Evet');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.yes', 'description', 'Daha önce saç ekimi oldum');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.no', 'title', 'Hayır');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previous.options.no', 'description', 'Bu ilk saç ekimim olacak');

-- Previous Transplant Details Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails', 'title', 'Önceki Saç Ekimi Detayları');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails', 'description', 'Lütfen önceki işleminiz hakkında bilgi verin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails', 'optional', 'opsiyonel');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe', 'title', 'Önceki saç ekiminizi ne zaman yaptırdınız?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', '1 yıldan az');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 yıl');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 yıl');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', '5 yıldan fazla');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.clinic', 'title', 'Saç ekimini nerede yaptırdınız?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.clinic', 'placeholder', 'Klinik adı ve konumu girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.grafts', 'title', 'Kaç greft nakledildi?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.grafts', 'placeholder', 'Greft sayısını girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.technique', 'title', 'Hangi teknik kullanıldı?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.technique', 'placeholder', 'örn. FUE, DHI, vb.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.results', 'title', 'Sonuçlardan ne kadar memnunsunuz?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.previousDetails.results', 'placeholder', 'Lütfen deneyiminizi ve sonuçları açıklayın');

-- Medical History Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'title', 'Tıbbi Geçmiş');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'description', 'Lütfen tıbbi bilgilerinizi girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical', 'optional', 'opsiyonel');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'yes', 'Evet');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.buttons', 'no', 'Hayır');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.allergies', 'title', 'Herhangi bir alerjiniz var mı?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.allergies', 'placeholder', 'İlaç veya diğer maddelere karşı alerjilerinizi listeleyin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.conditions', 'title', 'Kronik bir hastalığınız var mı?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.conditions', 'placeholder', 'Devam eden tıbbi durumlarınızı listeleyin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.medications', 'title', 'Şu anda hangi ilaçları kullanıyorsunuz?');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.medical.medications', 'placeholder', 'Tüm mevcut ilaçları ve takviyeleri listeleyin');

-- Photos Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'title', 'Fotoğraf Yükleyin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'description', 'Doğru değerlendirme için');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'optional', 'opsiyonel');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'submitWithPhotos', 'Fotoğraflarla Analizi Gönder');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'submitWithoutPhotos', 'Analizi Gönder');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'changePhoto', 'Fotoğrafı Değiştir');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'deletePhoto', 'Fotoğrafı Sil');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.front', 'title', 'Ön Görünüm');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.front', 'description', 'Saç çizginizin net fotoğrafı');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.top', 'title', 'Üst Görünüm');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.top', 'description', 'Tepe bölgesini net gösterir');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.sides', 'title', 'Yan Görünümler');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.sides', 'description', 'Hem sol hem sağ taraf');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.back', 'title', 'Arka Görünüm');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos.types.back', 'description', 'Donör alanı gösterir');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.photos', 'uploadButton', 'Fotoğraf Yükle');

-- Final Step
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'title', 'Analizi al');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'description', 'Kişiselleştirilmiş saç analizinizi almak için bilgilerinizi tamamlayın');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'firstName', 'Ad');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'firstNamePlaceholder', 'Adınızı girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'lastName', 'Soyad');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'lastNamePlaceholder', 'Soyadınızı girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'email', 'E-posta');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'emailPlaceholder', 'E-posta adresinizi girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'phone', 'Telefon');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'phonePlaceholder', 'Telefon numaranızı girin');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'country', 'Ülke');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'countryPlaceholder', 'Ülkenizi seçin');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'free', '%100 Ücretsiz');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'secure', 'SSL veri transferi');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final.features', 'expert', 'Uzman analizi');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'privacyNotice', 'Bu formu göndererek, saç analizinizle ilgili iletişim kurmayı kabul ediyorsunuz. Verileriniz güvende ve asla üçüncü taraflarla paylaşılmayacak.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'submit', 'Ücretsiz Analizi Al');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.steps.final', 'submitting', 'Gönderiliyor...');

-- Doctor Messages
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'name', 'Dr. Mustafa Yakışıklı');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'title', 'Saç ekimi uzmanı');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'status', 'Çevrimiçi');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor', 'consultButton', 'WhatsApp''tan Danışın');

SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'personal', 'Hoş geldiniz! Cinsiyetinizi anlamak, kişiselleştirilmiş bir tedavi planı oluşturmamıza yardımcı olur. Saç dökülme şekilleri ve tedavi yaklaşımları kadınlar ve erkekler arasında önemli farklılıklar gösterebilir.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'ageRange', 'Yaşınız, en etkili saç restorasyonu yaklaşımını belirlemede çok önemli bir rol oynar. Saç dökülme şekilleri ve hormonal faktörler farklı yaş gruplarında önemli ölçüde değişiklik gösterir.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'hairLoss', 'Saç dökülme modelinizi anlamanıza yardımcı olayım. Her aşama benzersiz bir yaklaşım gerektirir ve sizin özel modelinizi belirleyerek, en iyi sonuçları elde edebileceğiniz kişiselleştirilmiş bir tedavi planı geliştirebiliriz.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'duration', 'Saç dökülmesi sürenizi anlamak tedavi planınız için çok önemlidir. Süre, saç dökülmenizin ilerleme hızını ve stabilitesini değerlendirmemize yardımcı olur.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'previous', 'Kalıtsal saç dökülmesi (androgenetik alopesi) genellikle saç dökülmesinin nedenidir');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'previousDetails', 'Önceki saç ekimi detaylarınız, saç restorasyon yolculuğunuzu anlamamıza ve istediğiniz sonuçları elde etmek için en iyi yaklaşımı belirlememize yardımcı olur.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'medical', 'Tıbbi geçmişiniz, güvenli ve başarılı bir prosedür sağlamak için çok önemlidir. Herhangi bir alerji, durum veya ilaç tedavi planınızı ve iyileşmenizi etkileyebilir.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'photos', 'Net fotoğraflar durumunuzun en doğru şekilde değerlendirilmesine yardımcı olur.');
SELECT insert_translation_with_namespace('tr', 'hairAnalysis.doctor.messages', 'final', 'Neredeyse bitti! Lütfen iletişim bilgilerinizi paylaşın ki vakınızın detaylı analizini gönderelim ve ihtiyaçlarınıza en uygun tedavi seçeneklerini görüşebilelim. Bilgileriniz güvende ve yalnızca saç ekimi konsültasyonunuz için sizinle iletişime geçmek amacıyla kullanılacaktır.');
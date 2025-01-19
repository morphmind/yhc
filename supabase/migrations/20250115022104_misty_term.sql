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

-- Insert English translations
SELECT insert_translation_with_namespace('en', 'home.hero.badge', 'text', 'Premium Hair Transplant Center');
SELECT insert_translation_with_namespace('en', 'home.hero.title', 'highlight', 'Premium Hair Transplant');
SELECT insert_translation_with_namespace('en', 'home.hero.title', 'main', 'in Turkey with Expert Care');
SELECT insert_translation_with_namespace('en', 'home.hero.description', 'text', 'Experience world-class hair restoration with Dr. Mustafa Yakışıklı. Advanced techniques, natural results, and personalized care in the heart of Turkey.');
SELECT insert_translation_with_namespace('en', 'home.hero.cta', 'analysis', 'Get Free Hair Analysis');
SELECT insert_translation_with_namespace('en', 'home.hero.cta', 'whatsapp', 'WhatsApp Consultation');
SELECT insert_translation_with_namespace('en', 'home.hero.stats', 'operations', 'Successful Operations');
SELECT insert_translation_with_namespace('en', 'home.hero.stats', 'growth', 'Hair Growth Rate');
SELECT insert_translation_with_namespace('en', 'home.hero.stats', 'experience', 'Years Experience');
SELECT insert_translation_with_namespace('en', 'home.hero.stats', 'awards', 'Awards & Certificates');

-- Doctor Info
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs', 'doctorTitle', 'Hair Transplant Surgeon');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs', 'doctorDescription', 'With over 12 years of experience as a pioneer in hair transplantation, Dr. Mustafa Yakışıklı achieves natural and permanent results using the latest technologies and innovative techniques.');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.stats', 'certificates', '25+ International Certificates');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.stats', 'operations', '15,000+ Successful Operations');

-- Features
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.expertise', 'title', 'Expert Medical Team');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.expertise', 'description', 'Led by Dr. Mustafa Yakışıklı, our team combines years of experience with cutting-edge techniques');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.technology', 'title', 'Advanced Technology');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.technology', 'description', 'State-of-the-art facilities and the latest hair transplant technologies for optimal results');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.natural', 'title', 'Natural Results');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.natural', 'description', 'Achieve natural-looking results with our precise and artistic approach to hair restoration');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.personalized', 'title', 'Personalized Care');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.personalized', 'description', 'Customized treatment plans tailored to your unique needs and hair restoration goals');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.aftercare', 'title', 'Lifetime Aftercare');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.aftercare', 'description', 'Comprehensive post-procedure support and long-term care for lasting results');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.satisfaction', 'title', 'Patient Satisfaction');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.features.satisfaction', 'description', 'Thousands of satisfied patients from around the world trust our expertise');

-- Clinic Features
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.clinic', 'title', 'Our Clinic Features');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '1', 'State-of-the-art equipment and sterile operating room environment');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '2', 'Experienced medical team and special patient care service');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '3', 'International service quality standards');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.clinic.features', '4', '24/7 patient support and follow-up system');

-- Certifications
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.certifications', 'title', 'Certifications & Accreditations');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.certifications.items', 'jci', 'JCI Accreditation');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.certifications.items', 'iso', 'ISO 9001:2015');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.certifications.items', 'ishrs', 'ISHRS Membership');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.certifications.items', 'tshd', 'TSHD Membership');

-- Patient Satisfaction
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction', 'title', 'Patient Satisfaction');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rate', 'value', '98%');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rate', 'label', 'Patient Satisfaction Rate');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.patients', 'value', '15K+');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.patients', 'label', 'Happy Patients');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rating', 'value', '4.9/5');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction.stats.rating', 'label', 'Patient Rating');
SELECT insert_translation_with_namespace('en', 'home.hero.whyUs.satisfaction', 'cta', 'Get Free Hair Analysis');

-- Treatment Process
SELECT insert_translation_with_namespace('en', 'home.experience.process', 'badge', 'Treatment Process');
SELECT insert_translation_with_namespace('en', 'home.experience.process', 'title', 'Your Journey to New Hair');
SELECT insert_translation_with_namespace('en', 'home.experience.process', 'description', 'Experience a seamless and comfortable hair transplant journey with our step-by-step process designed for your convenience.');

-- Process Steps
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.1', 'title', 'Consultation');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.1', 'description', 'Detailed analysis and personalized treatment plan with our expert medical team');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.2', 'title', 'Arrival');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.2', 'description', 'VIP airport transfer and comfortable accommodation in a luxury hotel');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.3', 'title', 'Operation');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.3', 'description', 'Advanced hair transplant procedure with the latest technology');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.4', 'title', 'Recovery');
SELECT insert_translation_with_namespace('en', 'home.experience.process.steps.4', 'description', 'Comprehensive aftercare and long-term follow-up support');

-- Services
SELECT insert_translation_with_namespace('en', 'home.experience.services', 'badge', 'Premium Services');
SELECT insert_translation_with_namespace('en', 'home.experience.services', 'title', 'Exclusive Patient Services');
SELECT insert_translation_with_namespace('en', 'home.experience.services', 'description', 'Enjoy premium services designed to make your hair transplant experience comfortable and stress-free.');

-- VIP Services
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip', 'title', 'VIP Services');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip', 'description', 'Experience luxury and comfort throughout your stay');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', '1', 'Personal patient coordinator');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', '2', 'Luxury vehicle transfers');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', '3', 'Premium hotel accommodation');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.vip.features', '4', 'Private interpreter service');

-- Accommodation
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation', 'title', 'Hotel & Stay');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation', 'description', 'Comfortable accommodation in premium hotels');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', '1', '5-star hotel accommodation');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', '2', 'Breakfast included');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', '3', 'City center location');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.accommodation.features', '4', 'Special patient amenities');

-- Transfer Services
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer', 'title', 'Transfer Services');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer', 'description', 'Seamless transportation for your convenience');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', '1', 'Airport pickup & drop-off');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', '2', 'Hotel-clinic transfers');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', '3', 'Luxury vehicles');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.transfer.features', '4', 'Professional drivers');

-- Support Services
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support', 'title', 'Patient Support');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support', 'description', 'Comprehensive care and assistance');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support.features', '1', '24/7 medical support');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support.features', '2', 'Multilingual team');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support.features', '3', 'WhatsApp consultation');
SELECT insert_translation_with_namespace('en', 'home.experience.services.items.support.features', '4', 'Aftercare guidance');

-- Support Section
SELECT insert_translation_with_namespace('en', 'home.experience.support', 'badge', '24/7 Support');
SELECT insert_translation_with_namespace('en', 'home.experience.support', 'title', 'We''re Here to Help You');
SELECT insert_translation_with_namespace('en', 'home.experience.support', 'description', 'Get in touch with our patient support team anytime. We''re available 24/7 to answer your questions and provide assistance.');
SELECT insert_translation_with_namespace('en', 'home.experience.support.cta', 'whatsapp', 'Chat on WhatsApp');
SELECT insert_translation_with_namespace('en', 'home.experience.support.cta', 'schedule', 'Schedule Consultation');
SELECT insert_translation_with_namespace('en', 'home.experience.support.cta', 'call', 'Call Now');

-- Treatments
SELECT insert_translation_with_namespace('en', 'treatments', 'title', 'Treatment Options');
SELECT insert_translation_with_namespace('en', 'treatments', 'description', 'Discover our advanced hair transplant techniques for natural-looking results');

-- Gallery
SELECT insert_translation_with_namespace('en', 'treatments.gallery', 'title', 'Success Stories');
SELECT insert_translation_with_namespace('en', 'treatments.gallery', 'description', 'Explore our collection of successful hair transplant transformations');

-- Gallery Filters
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'all', 'All Cases');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'hair', 'Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'afro', 'Afro Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'beard', 'Beard Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'eyebrow', 'Eyebrow Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.filters', 'women', 'Women Cases');

-- Gallery Timeframes
SELECT insert_translation_with_namespace('en', 'treatments.gallery.timeframes', 'month3', '3 Months');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.timeframes', 'month6', '6 Months');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.timeframes', 'month12', '12 Months');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.timeframes', 'final', 'Final Result');

-- Gallery Labels
SELECT insert_translation_with_namespace('en', 'treatments.gallery.labels', 'before', 'Before');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.labels', 'after', 'After');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.labels', 'watchStory', 'Watch Story');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.labels', 'watchOnYoutube', 'Watch on YouTube');

-- Gallery CTA
SELECT insert_translation_with_namespace('en', 'treatments.gallery.cta', 'analyze', 'Get Your Free Analysis');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.cta', 'whatsapp', 'Chat on WhatsApp');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.cta', 'schedule', 'Schedule Consultation');
SELECT insert_translation_with_namespace('en', 'treatments.gallery.cta', 'call', 'Call Now');

-- Treatment Options
SELECT insert_translation_with_namespace('en', 'treatments.options.hair', 'title', 'Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.options.hair', 'description', 'Restore your natural hairline with our advanced hair transplant techniques');
SELECT insert_translation_with_namespace('en', 'treatments.options.afro', 'title', 'Afro Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.options.afro', 'description', 'Specialized techniques for African hair types');
SELECT insert_translation_with_namespace('en', 'treatments.options.women', 'title', 'Women Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.options.women', 'description', 'Tailored solutions for female pattern hair loss');
SELECT insert_translation_with_namespace('en', 'treatments.options.beard', 'title', 'Beard Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.options.beard', 'description', 'Achieve a fuller, natural-looking beard');
SELECT insert_translation_with_namespace('en', 'treatments.options.eyebrow', 'title', 'Eyebrow Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.options.eyebrow', 'description', 'Restore or enhance your eyebrows permanently');

-- Technologies
SELECT insert_translation_with_namespace('en', 'treatments.technologies.microSapphire', 'title', 'Micro Sapphire');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.microSapphire', 'description', 'Ultra-precise incisions for minimal scarring');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.dhi', 'title', 'DHI Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.dhi', 'description', 'Direct implantation for denser results');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.sapphireFue', 'title', 'Sapphire FUE');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.sapphireFue', 'description', 'Premium FUE technique with sapphire blades');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.needleFree', 'title', 'Needle Free Anaesthesia');
SELECT insert_translation_with_namespace('en', 'treatments.technologies.needleFree', 'description', 'Painless procedure with advanced anaesthesia');

-- Techniques
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue', 'title', 'FUE Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue', 'description', 'The gold standard in hair restoration, using individual follicular extraction for natural results');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue.features', '1', 'Minimally invasive procedure');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue.features', '2', 'No linear scarring');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue.features', '3', 'Quick recovery time');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.fue.features', '4', 'Natural-looking results');

SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi', 'title', 'DHI Hair Transplant');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi', 'description', 'Direct Hair Implantation technique for precise placement and denser results');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi.features', '1', 'No canal opening');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi.features', '2', 'Minimal trauma to scalp');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi.features', '3', 'Higher density possible');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.dhi.features', '4', 'Faster healing process');

SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire', 'title', 'Sapphire FUE');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire', 'description', 'Advanced FUE technique using sapphire blades for enhanced precision and healing');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', '1', 'Smoother healing process');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', '2', 'Minimal tissue damage');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', '3', 'Better graft survival');
SELECT insert_translation_with_namespace('en', 'treatments.techniques.sapphire.features', '4', 'More natural results');

-- Treatment CTA
SELECT insert_translation_with_namespace('en', 'treatments.cta', 'analyze', 'Analyze Your Hair');
SELECT insert_translation_with_namespace('en', 'treatments.cta', 'learn', 'Learn More');

-- Header
SELECT insert_translation_with_namespace('en', 'header.contact', 'phone', '+90 536 034 48 66');
SELECT insert_translation_with_namespace('en', 'header.contact', 'email', 'info@yakisiklihairclinic.com');
SELECT insert_translation_with_namespace('en', 'header.contact', 'location', 'Fethiye, Turkey');

-- Weather
SELECT insert_translation_with_namespace('en', 'header.weather', 'humidity', 'Humidity');
SELECT insert_translation_with_namespace('en', 'header.weather', 'windSpeed', 'Wind Speed');

-- Navigation
SELECT insert_translation_with_namespace('en', 'header.navigation', 'menu', 'Menu');
SELECT insert_translation_with_namespace('en', 'header.navigation.about', 'title', 'About');
SELECT insert_translation_with_namespace('en', 'header.navigation.about', 'doctor', 'Dr. Mustafa Yakışıklı');
SELECT insert_translation_with_namespace('en', 'header.navigation.about', 'clinic', 'Yakışıklı Clinic');
SELECT insert_translation_with_namespace('en', 'header.navigation.about', 'celebrities', 'Celebrity Hair Transplants');
SELECT insert_translation_with_namespace('en', 'header.navigation.about', 'certificates', 'Certificates & Seminars');

-- Hair Transplant Navigation
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant', 'title', 'Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'title', 'Our Treatments');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'hair', 'Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'afro', 'Afro Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'women', 'Hair Transplant for Women');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'beard', 'Beard Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.treatments', 'eyebrow', 'Eyebrow Transplants in Turkey');

-- Technologies Navigation
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.technologies', 'title', 'Our Technologies');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.technologies', 'microSapphire', 'Micro Sapphire');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.technologies', 'dhi', 'DHI Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.technologies', 'sapphireFue', 'Sapphire FUE Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.hairTransplant.technologies', 'needleFree', 'Needle Free Anaesthesia');

-- Guide Navigation
SELECT insert_translation_with_namespace('en', 'header.navigation.guide', 'title', 'Guide');
SELECT insert_translation_with_namespace('en', 'header.navigation.guide', 'natural', 'Natural Hair Transplant');
SELECT insert_translation_with_namespace('en', 'header.navigation.guide', 'why', 'Why should I get a hair transplant?');
SELECT insert_translation_with_namespace('en', 'header.navigation.guide', 'how', 'How to perform Hair Transplant Operation');

-- Other Navigation Items
SELECT insert_translation_with_namespace('en', 'header.navigation', 'beforeAfter', 'Before After');
SELECT insert_translation_with_namespace('en', 'header.navigation', 'price', 'Price');
SELECT insert_translation_with_namespace('en', 'header.navigation', 'blog', 'Blog');
SELECT insert_translation_with_namespace('en', 'header.navigation', 'contact', 'Contact');
SELECT insert_translation_with_namespace('en', 'header', 'bookConsultation', 'Book Free Consultation');
SELECT insert_translation_with_namespace('en', 'header', 'toggleMenu', 'Toggle menu');
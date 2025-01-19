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
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'title', 'Error');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'requiredFields', 'Please fill in all required fields');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.error', 'submitError', 'An error occurred while submitting the form. Please try again');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'title', 'Success');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.success', 'description', 'Dear {name}, your hair analysis request has been received. Our medical team will review your case and contact you shortly via WhatsApp for a personalized consultation.');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'title', 'Sending');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading', 'description', 'Processing your request...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'processing', 'Processing your information...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'uploading', 'Uploading your photos...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'sending', 'Sending your request...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'email', 'Sending confirmation email...');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.toast.loading.steps', 'finalizing', 'Finalizing your submission...');

-- Hair Analysis Main Content
SELECT insert_translation_with_namespace('en', 'hairAnalysis', 'title', 'Free Hair Analysis Consultation');
SELECT insert_translation_with_namespace('en', 'hairAnalysis', 'description', 'Get a personalized hair transplant assessment from our expert medical team. We''ll analyze your condition and provide tailored recommendations for your hair restoration journey.');

-- Hair Analysis Navigation
SELECT insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'back', 'Back');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'next', 'Next');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'previous', 'Previous');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'forward', 'Forward');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.navigation', 'step', 'STEP');

-- Personal Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.personal', 'title', 'You are');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.personal', 'description', 'Select your gender for personalized analysis');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.personal.options', 'male', 'A man');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.personal.options', 'female', 'A woman');

-- Age Range Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange', 'title', 'Your Age Range');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange', 'description', 'Select your age range for personalized treatment options');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange.options', 'range', '{min}-{max} years old');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.ageRange.options', 'above', '{min}+ years old');

-- Hair Loss Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss', 'title', 'Describe your hair loss');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss', 'description', 'Select the pattern that best matches your situation');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'none', 'No hair loss');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'light', 'Receding hairline light');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'slight-crown', 'Receding hairline + slight crown');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'strong-crown', 'Receding hairline strong + crown');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'semi-bald', 'Semi bald');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.hairLoss.options', 'bald', 'Bald');

-- Duration Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.duration', 'title', 'How long have you been suffering from hair loss?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.duration', 'description', 'This helps us understand the progression');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.duration.options', 'years', 'years');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.duration.options', 'moreThan', 'More than');

-- Previous Transplant Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous', 'title', 'Have you ever had a hair transplant?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous', 'description', 'Previous treatments are important for planning');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous', 'doctorMessage', 'Hereditary hair loss (androgenetic alopecia) is often the cause of hair loss');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.yes', 'title', 'Yes');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.yes', 'description', 'I have had a hair transplant before');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.no', 'title', 'No');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previous.options.no', 'description', 'This will be my first hair transplant');

-- Previous Transplant Details Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails', 'title', 'Previous Hair Transplant Details');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails', 'description', 'Please provide details about your previous procedure');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails', 'optional', 'optional');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe', 'title', 'When did you have your previous transplant?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'less-than-1', 'Less than 1 year');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '1-to-3', '1 - 3 years');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', '3-to-5', '3 - 5 years');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.timeframe.options', 'more-than-5', 'More than 5 years');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.date', 'title', 'When did you have your previous transplant?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.date', 'placeholder', 'Select date');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.clinic', 'title', 'Where did you have your transplant?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.clinic', 'placeholder', 'Enter clinic name and location');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.grafts', 'title', 'How many grafts were transplanted?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.grafts', 'placeholder', 'Enter number of grafts');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.technique', 'title', 'Which technique was used?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.technique', 'placeholder', 'e.g., FUE, DHI, etc.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.results', 'title', 'How satisfied are you with the results?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.previousDetails.results', 'placeholder', 'Please describe your experience and results');

-- Medical History Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'title', 'Medical History');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'description', 'Please provide your medical information');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical', 'optional', 'optional');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'yes', 'Yes');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.buttons', 'no', 'No');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.allergies', 'title', 'Do you have any allergies?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.allergies', 'placeholder', 'List any allergies to medications or other substances');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.conditions', 'title', 'Do you have any chronic medical conditions?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.conditions', 'placeholder', 'List any ongoing medical conditions');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.medications', 'title', 'What medications are you currently taking?');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.medical.medications', 'placeholder', 'List all current medications and supplements');

-- Photos Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'title', 'Upload Photos');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'description', 'For accurate assessment');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'optional', 'optional');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'submitWithPhotos', 'Submit Analysis with Photos');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'submitWithoutPhotos', 'Submit Analysis');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'changePhoto', 'Change Photo');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'deletePhoto', 'Delete Photo');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.front', 'title', 'Front View');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.front', 'description', 'Clear photo of your hairline');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.top', 'title', 'Top View');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.top', 'description', 'Shows crown area clearly');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.sides', 'title', 'Side Views');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.sides', 'description', 'Both left and right sides');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.back', 'title', 'Back View');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos.types.back', 'description', 'Shows donor area');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.photos', 'uploadButton', 'Upload Photo');

-- Final Step
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'title', 'Get my analysis');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'description', 'Complete your information to receive your personalized hair analysis');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'firstName', 'First name');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'firstNamePlaceholder', 'Enter your first name');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'lastName', 'Last name');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'lastNamePlaceholder', 'Enter your last name');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'email', 'Email');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'emailPlaceholder', 'Enter your email address');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'phone', 'Phone');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'phonePlaceholder', 'Enter your phone number');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'country', 'Country');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'countryPlaceholder', 'Select your country');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'free', '100% Free');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'secure', 'SSL data transfer');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final.features', 'expert', 'Analysis from experts');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'privacyNotice', 'By submitting this form, you agree to receive communications regarding your hair analysis. Your data is secure and will never be shared with third parties.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'submit', 'Get My Free Analysis');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.steps.final', 'submitting', 'Sending...');

-- Doctor Messages
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'name', 'Dr. Mustafa Yakışıklı');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'title', 'Hair transplant surgeon');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'status', 'Online');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor', 'consultButton', 'Consult on WhatsApp');

SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'personal', 'Welcome! Understanding your gender helps us create a personalized treatment plan. Hair loss patterns and treatment approaches can vary significantly between men and women, affecting both the procedure technique and expected results.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'ageRange', 'Your age plays a crucial role in determining the most effective hair restoration approach. Hair loss patterns and hormonal factors vary significantly across different age groups. For younger patients, we focus on preservation and prevention alongside restoration, while for mature patients, we can implement more comprehensive solutions. This information helps us design a treatment plan that will not only address your current concerns but also anticipate and prepare for future needs.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'hairLoss', 'Let me help you understand your hair loss pattern. Each stage requires a unique approach, and by identifying your specific pattern, we can develop a customized treatment plan that will give you the best possible results. The earlier we intervene, the more options we have for restoration.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'duration', 'Understanding how long you''ve been experiencing hair loss is crucial for your treatment plan. The duration helps us assess the progression rate and stability of your hair loss, which directly influences the approach we''ll take. For recent onset, we might focus on both preservation and restoration, while longer-term cases often require more comprehensive solutions. This information is vital for predicting future patterns and designing a treatment strategy that will give you the best possible long-term results.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'previous', 'Hereditary hair loss (androgenetic alopecia) is often the cause of hair loss');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'previousDetails', 'The details of your previous transplant help us understand your hair restoration journey and determine the best approach for achieving your desired results.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'medical', 'Your medical history is essential for ensuring a safe and successful procedure. Any allergies, conditions, or medications can impact your treatment plan and recovery.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'photos', 'Clear photos help us provide the most accurate assessment of your situation.');
SELECT insert_translation_with_namespace('en', 'hairAnalysis.doctor.messages', 'final', 'We''re almost there! Please provide your contact information so we can send you a detailed analysis of your case and discuss the best treatment options for your needs. Your information is secure and will only be used to contact you regarding your hair transplant consultation.');
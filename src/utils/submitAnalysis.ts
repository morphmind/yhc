import { HairAnalysisFormData } from '@/types';
import { formatAnalysisDataForWhatsApp } from './formatAnalysisData';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';
import { telegramConfig } from '@/config/telegram';
import { toast } from '@/hooks/useToast';
import { create } from 'zustand';
import { compressImage } from './imageCompression';
import { supabase } from '@/lib/supabase';

// Initialize EmailJS with public key
try {
  emailjs.init(emailjsConfig.publicKey);
} catch (error) {
  console.error('EmailJS initialization error:', error);
}

interface SubmissionStore {
  loading: boolean;
  message: string;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  loading: false,
  message: '',
  setLoading: (loading) => set({ loading }),
  setMessage: (message) => set({ message }),
}));

const MAX_EMAIL_SIZE = 50 * 1024; // 50KB limit for EmailJS

export async function submitAnalysis(formData: HairAnalysisFormData, t: any): Promise<boolean> {
  const { setLoading, setMessage } = useSubmissionStore.getState();
  setLoading(true);
  setMessage(t.hairAnalysis.toast.loading.steps.processing);

  let photoUrls: Record<string, string> = {};

  try {
    // Process photos first if they exist
    const hasPhotos = Object.keys(formData.photos).length > 0 && Object.values(formData.photos).some(file => file instanceof File);
    
    if (hasPhotos) {
      setMessage(t.hairAnalysis.toast.loading.steps.uploading);
      
      for (const [type, file] of Object.entries(formData.photos)) {
        try {
          // Skip if not a valid File object
          if (!(file instanceof File)) continue;

          // Compress and upload photo
          const compressedFile = await compressImage(file);
          const timestamp = Date.now();
          const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `${timestamp}-${type}-${safeFileName}`;
          const filePath = `submissions/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('hair-analysis-photos')
            .upload(filePath, compressedFile);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('hair-analysis-photos')
            .getPublicUrl(filePath);

          photoUrls[type] = publicUrl;
        } catch (error) {
          console.error(`Error processing ${type} photo:`, error);
          // Continue with other photos even if one fails
        }
      }
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
      toast({
        variant: "destructive",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields,
      });
      setLoading(false);
      return false;
    }
    
    // Save to Supabase
    setMessage(t.hairAnalysis.toast.loading.steps.sending);

    // Save submission to database
    const { error: dbError } = await supabase
      .from('hair_analysis_submissions')
      .insert([{
        gender: formData.gender,
        age_range: formData.ageRange,
        hair_loss_type: formData.hairLossType,
        hair_loss_duration: formData.hairLossDuration,
        previous_transplants: formData.previousTransplants || false, // Default to false if null
        previous_transplant_details: formData.previousTransplantDetails,
        medical_conditions: formData.medicalConditions || [],
        medications: formData.medications || [],
        allergies: formData.allergies || [],
        photos: photoUrls,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        status: 'new'
      }]);

    if (dbError) throw dbError;

    // Format data for messaging
    const whatsappContent = formatAnalysisDataForWhatsApp({
      ...formData,
      photos: photoUrls,
    });

    // Send notifications
    await Promise.all([
      // Send email
      emailjsConfig.publicKey ? 
        emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, {
          to_email: 'vipkaan@gmail.com',
          message: whatsappContent,
          date: new Date().toLocaleString('tr-TR'),
          gender: formData.gender === 'male' ? 'Erkek' : 'Kadın',
          ageRange: formData.ageRange ? `${formData.ageRange.min}-${formData.ageRange.max || '+'}` : '',
          hairLossType: formData.hairLossType,
          hairLossDuration: formData.hairLossDuration,
          previousTransplants: formData.previousTransplants ? 'Evet' : 'Hayır',
          previousTransplantDetails: formData.previousTransplantDetails || '',
          medicalConditions: formData.medicalConditions?.join(', ') || '',
          medications: formData.medications?.join(', ') || '',
          allergies: formData.allergies?.join(', ') || '',
          photoCount: Object.keys(photoUrls).length
        }).catch(error => {
          console.error('EmailJS error:', error);
          // Don't fail submission if email fails
          return null;
        })
      : Promise.resolve(null),

      // Send Telegram message if configured
      telegramConfig.botToken && telegramConfig.chatId ? (
        Promise.all([
          // Send text message
          fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: telegramConfig.chatId,
              text: whatsappContent,
              parse_mode: 'HTML',
              disable_web_page_preview: true
            })
          }),
          // Send photos if they exist
          ...Object.entries(photoUrls).map(([type, url]) =>
            fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendPhoto`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                photo: url,
                caption: `${formData.firstName} ${formData.lastName} - ${type} görünüm`,
                parse_mode: 'HTML'
              })
            })
          )
        ])
      ) : Promise.resolve()
    ]).catch(error => {
      console.error('Error sending notifications:', error);
      // Don't fail submission if notifications fail
    });

    // Save data for success page
    sessionStorage.setItem('analysisFormData', JSON.stringify({
      ...formData,
      photos: photoUrls
    }));

    // Get matching stories
    const { data: stories, error: storiesError } = await supabase
      .from('success_stories')
      .select('*')
      .contains('pattern_match', [formData.hairLossType])
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(5);

    if (storiesError) throw storiesError;

    if (stories?.length > 0) {
      sessionStorage.setItem('matchingStories', JSON.stringify(stories));
    }

    toast({
      title: t.hairAnalysis.toast.success.title,
      description: t.hairAnalysis.toast.success.description.replace('{name}', formData.firstName)
    });

    return true;

  } catch (error) {
    console.error('Error submitting analysis:', error);
    toast({
      variant: "destructive",
      title: t.hairAnalysis.toast.error.title,
      description: t.hairAnalysis.toast.error.submitError
    });
    return false;
  } finally {
    setLoading(false);
  }
}
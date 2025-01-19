import { HairAnalysisFormData } from '@/types';
import { formatAnalysisDataForWhatsApp } from './formatAnalysisData';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';
import { telegramConfig } from '@/config/telegram';
import { toast } from '@/hooks/useToast';
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

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

  try {
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

    // Format data for messaging
    const whatsappContent = formatAnalysisDataForWhatsApp(formData);

    // Save to Supabase
    try {
      setMessage(t.hairAnalysis.toast.loading.steps.sending);
      
      // Convert photos to a format suitable for storage
      const photoUrls: Record<string, string> = {};
      
      // Process each photo
      for (const [type, file] of Object.entries(formData.photos)) {
        setMessage(t.hairAnalysis.toast.loading.steps.uploading);
        try {
          // Upload photo to Supabase Storage
          const fileName = `${Date.now()}-${type}-${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('hair-analysis-photos')
            .upload(`submissions/${fileName}`, file);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('hair-analysis-photos')
            .getPublicUrl(`submissions/${fileName}`);

          photoUrls[type] = publicUrl;
        } catch (error) {
          console.error(`Error uploading ${type} photo:`, error);
        }
      }

      const { error: dbError } = await supabase
        .from('hair_analysis_submissions')
        .insert([{
          gender: formData.gender,
          age_range: formData.ageRange,
          hair_loss_type: formData.hairLossType,
          hair_loss_duration: formData.hairLossDuration,
          previous_transplants: formData.previousTransplants,
          previous_transplant_details: formData.previousTransplantDetails,
          medical_conditions: formData.medicalConditions,
          medications: formData.medications,
          allergies: formData.allergies,
          photos: photoUrls,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          status: 'new'
        }]);

      if (dbError) throw dbError;
    } catch (error) {
      console.error('Error saving to database:', error);
      // Continue with other operations even if database save fails
    }

    // Show loading toast
    setMessage(t.hairAnalysis.toast.loading.steps.email);

    // Initialize EmailJS
    emailjs.init(emailjsConfig.publicKey);

    // Send email using EmailJS
    const emailResult = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      {
        to_email: 'vipkaan@gmail.com',
        message: whatsappContent
      }
    );

    if (emailResult.status !== 200) {
      throw new Error('Failed to send email');
    }

    // Send to Telegram if configured
    const { botToken, chatId } = telegramConfig;
    
    if (botToken && chatId) {
      setMessage(t.hairAnalysis.toast.loading.steps.sending);
      try {
        // Send the form data first
        const messageResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: whatsappContent,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to send message to Telegram');
        }

        // Parse response
        const messageResult = await messageResponse.json();
        if (!messageResult.ok) {
          console.error('Telegram API error:', messageResult);
          throw new Error(messageResult.description || 'Failed to send message to Telegram');
        }

        // Wait for the message to be sent
        await new Promise(resolve => setTimeout(resolve, 500));

        // Send photos if any exist
        if (Object.keys(formData.photos).length > 0) {
          const photoPromises = Object.entries(formData.photos).map(([type, file]) => {
            const photoData = new FormData();
            photoData.append('chat_id', chatId);
            photoData.append('photo', file);
            photoData.append('caption', `${type.charAt(0).toUpperCase() + type.slice(1)} view photo`);

            return fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
              method: 'POST',
              body: photoData,
            }).then(async (response) => {
              if (!response.ok) {
                const error = await response.json();
                throw new Error(`Failed to send photo: ${error.description || 'Unknown error'}`);
              }
              return response;
            });
          });

          // Send photos in parallel with error handling
          try {
            await Promise.all(photoPromises);
          } catch (error) {
            console.error('Error sending photos:', error);
            // Continue despite photo upload errors
          }
        }
      } catch (error) {
        console.error('Error sending to Telegram:', error);
        // Show warning but don't fail the submission
        toast({
          variant: "warning",
          title: "Uyarı",
          description: "Telegram'a gönderilirken hata oluştu fakat form başarıyla iletildi.",
        });
      }
    }

    setLoading(false);
    
    // Show success message
    toast({
      title: t.hairAnalysis.toast.success.title,
      description: t.hairAnalysis.toast.success.description.replace(
        '{name}',
        `${formData.firstName} ${formData.lastName}`
      ),
      duration: Infinity, // Make toast persistent until manually closed
      onClose: () => {
        toast.dismiss();
        setLoading(false); // Only remove loading overlay when toast is closed
      }
    });

    // Open WhatsApp with pre-filled message
    const whatsappNumber = '905360344866';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappContent)}`;
    window.open(whatsappUrl, '_blank');

    return true;
  } catch (error) {
    console.error('Error submitting analysis:', error);
    toast({
      variant: "destructive",
      title: t.hairAnalysis.toast.error.title,
      description: t.hairAnalysis.toast.error.submitError,
      duration: Infinity,
      onClose: () => toast.dismiss()
    });
    return false;
  }
}
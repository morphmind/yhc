import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { TranslationStore, Language, Translation, TranslationSettings } from '@/types/translations';
import { toast } from '@/hooks/useToast';

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  languages: [],
  translations: [],
  settings: null,
  loading: false,
  progress: 0,
  error: null,

  setLanguages: (languages) => set({ languages }),
  setTranslations: (translations) => set({ translations }),
  setSettings: (settings) => set({ settings }),
  setLoading: (loading) => set({ loading }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),

  fetchLanguages: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('code');

      if (error) throw error;
      set({ languages: data });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Diller yüklenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchTranslations: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('namespace, key');

      if (error) throw error;
      set({ translations: data });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çeviriler yüklenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchSettings: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('translation_settings')
        .select('*')
        .single();

      if (error) throw error;
      set({ settings: data });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ayarlar yüklenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  addLanguage: async (language) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('languages')
        .insert([language]);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Yeni dil eklendi",
      });

      await get().fetchLanguages();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Dil eklenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateLanguage: async (code, language) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('languages')
        .update(language)
        .eq('code', code);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Dil güncellendi",
      });

      await get().fetchLanguages();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Dil güncellenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteLanguage: async (code) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('languages')
        .delete()
        .eq('code', code);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Dil silindi",
      });

      await get().fetchLanguages();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Dil silinirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  addTranslation: async (translation) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('translations')
        .insert([translation]);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Yeni çeviri eklendi",
      });

      await get().fetchTranslations();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çeviri eklenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateTranslation: async (id, translation) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('translations')
        .update(translation)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Çeviri güncellendi",
      });

      await get().fetchTranslations();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çeviri güncellenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteTranslation: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('translations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Çeviri silindi",
      });

      await get().fetchTranslations();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Çeviri silinirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (settings) => {
    try {
      set({ loading: true, error: null });
      
      // Get current settings first
      const { data: currentSettings } = await supabase
        .from('translation_settings')
        .select('*')
        .single();

      // Prepare update data
      const updateData = {
        id: currentSettings?.id,
        ...settings
      };

      // Update or insert settings
      const { error } = await supabase
        .from('translation_settings')
        .upsert([updateData]);

      if (error) throw error;

      // Update local state
      set({ settings: { ...currentSettings, ...settings } });

      toast({
        title: "Başarılı",
        description: "Ayarlar güncellendi",
      });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ayarlar güncellenirken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  cloneLanguage: async (sourceCode, targetCode) => {
    try {
      set({ loading: true, error: null });
      
      // Get source translations
      const { data: sourceTranslations, error: fetchError } = await supabase
        .from('translations')
        .select('*')
        .eq('language_code', sourceCode);

      if (fetchError) throw fetchError;

      // Create new translations for target language
      const newTranslations = sourceTranslations.map(({ id, language_code, created_at, updated_at, ...rest }) => ({
        ...rest,
        language_code: targetCode
      }));

      const { error: insertError } = await supabase
        .from('translations')
        .insert(newTranslations);

      if (insertError) throw insertError;

      toast({
        title: "Başarılı",
        description: "Dil başarıyla klonlandı",
      });

      await get().fetchTranslations();
    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Dil klonlanırken bir hata oluştu",
      });
    } finally {
      set({ loading: false });
    }
  },

  translateLanguage: async (sourceCode, targetCode) => {
    try {
      let totalItems = 0, successCount = 0, errorCount = 0;
      set({ loading: true, error: null, progress: 0 });

      const settings = get().settings;
      if (!settings?.openai_api_key) {
        throw new Error('OpenAI API anahtarı ayarlanmamış');
      }

      // Get all source translations
      const { data: sourceTranslations, error: fetchError } = await supabase
        .from('translations')
        .select('*')
        .eq('language_code', sourceCode);

      if (fetchError) throw fetchError;
      if (!sourceTranslations?.length) {
        throw new Error('Kaynak dilde çeviri bulunamadı');
      }

      // Get target language name
      const targetLanguage = get().languages.find(lang => lang.code === targetCode)?.name;
      if (!targetLanguage) throw new Error('Hedef dil bulunamadı');

      // Get existing translations for target language to avoid duplicates
      const { data: existingTranslations, error: existingError } = await supabase
        .from('translations')
        .select('namespace, key')
        .eq('language_code', targetCode);

      if (existingError) throw existingError;

      // Create a map of existing translations for quick lookup
      const existingMap = new Map(
        existingTranslations?.map(t => [`${t.namespace}:${t.key}`, true]) || []
      );

      // Filter out translations that already exist in target language
      const translationsToProcess = sourceTranslations.filter(t => 
        !existingMap.has(`${t.namespace}:${t.key}`)
      );

      totalItems = translationsToProcess.length;
      if (totalItems === 0) {
        toast({
          title: "Bilgi",
          description: "Çevrilecek yeni metin bulunamadı",
        });
        return;
      }

      toast({
        title: "Bilgi",
        description: `${totalItems} yeni çeviri işlenecek`,
      });

      toast({
        title: "Bilgi",
        description: `${totalItems} yeni çeviri işlenecek`,
      });

      const translatedValues: any[] = [];
      for (const [index, translation] of translationsToProcess.entries()) {
        try {
          if (index > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          // Skip empty values
          if (!translation.value.trim()) {
            continue;
          }

          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${settings.openai_api_key}`
            },
            body: JSON.stringify({
              model: settings.openai_model,
              messages: [{
                role: 'system',
                content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain any HTML tags, variables, or special formatting. Only return the translated text, nothing else.`
              }, {
                role: 'user',
                content: translation.value
              }],
              temperature: 0.3
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Translation API error');
          }

          const data = await response.json();
          translatedValues.push({
            language_code: targetCode,
            namespace: translation.namespace,
            key: translation.key,
            value: data.choices[0].message.content.trim()
          });
          successCount++;

          // Update progress after each translation
          const progressValue = Math.round(((index + 1) / totalItems) * 100);
          set({ progress: progressValue });
        } catch (error) {
          errorCount++;
          console.error(`Error translating item ${index + 1}:`, error);
          continue; // Continue with next item even if there's an error
        }
      }

      if (translatedValues.length === 0) {
        throw new Error('No translations were completed successfully');
      }
      
      // Show summary toast
      toast({
        title: "Çeviri Özeti",
        description: `Toplam: ${totalItems}\nBaşarılı: ${successCount}\nHatalı: ${errorCount}`,
        duration: 5000
      });

      // Insert translated values in batches
      const batchSize = 50;
      for (let i = 0; i < translatedValues.length; i += batchSize) {
        const batch = translatedValues.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from('translations')
          .insert(batch);
        if (insertError) throw insertError;
      }

    } catch (error: any) {
      set({ error: error.message });
      toast({
        variant: "destructive",
        title: "Hata",
        description: error.message || "Çeviri yapılırken bir hata oluştu",
      });
      console.error('Translation error:', error);
    } finally {
      set({ loading: false, progress: 0 });
    }
  }
}));
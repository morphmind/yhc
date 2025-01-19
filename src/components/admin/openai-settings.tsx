import React from 'react';
import { useTranslationStore } from '@/stores/translationStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Key, Save } from 'lucide-react';
import { toast } from '@/hooks/useToast';

export function OpenAISettings() {
  const { settings, updateSettings, fetchSettings } = useTranslationStore();
  const [openAIKey, setOpenAIKey] = React.useState(settings?.openai_api_key || '');
  const [openAIModel, setOpenAIModel] = React.useState(settings?.openai_model || 'gpt-4o-mini');
  const [saving, setSaving] = React.useState(false);

  // Fetch settings when component mounts
  React.useEffect(() => {
    fetchSettings();
  }, []);

  // Load settings when component mounts or settings change
  React.useEffect(() => {
    if (settings) {
      setOpenAIKey(settings.openai_api_key || '');
      setOpenAIModel(settings.openai_model || 'gpt-4o-mini');
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        openai_api_key: openAIKey,
        openai_model: openAIModel
      });

      // Fetch updated settings
      await fetchSettings();

      toast({
        title: "Başarılı",
        description: "OpenAI ayarları güncellendi",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ayarlar güncellenirken bir hata oluştu",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5" />
        <h2 className="text-lg font-semibold">OpenAI Ayarları</h2>
      </div>

      {/* Settings Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>OpenAI API Anahtarı</Label>
          <div className="relative">
            <Input
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="sk-..."
              className="pr-10"
            />
            <Key className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            OpenAI API anahtarınızı buraya girin. Bu anahtar otomatik çeviri için kullanılacaktır.
          </p>
        </div>

        <div className="space-y-2">
          <Label>OpenAI Model</Label>
          <Select value={openAIModel} onValueChange={setOpenAIModel}>
            <SelectTrigger>
              <SelectValue placeholder="Model seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4 (En Kapsamlı)</SelectItem>
              <SelectItem value="gpt-4o">GPT-4 Optimized (Hızlı)</SelectItem>
              <SelectItem value="gpt-4o-mini">GPT-4 Mini (En Hızlı)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Çeviri kalitesi ve hızı arasında denge kurmak için model seçin.
          </p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </div>
  );
}
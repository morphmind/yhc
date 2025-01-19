import React from 'react';
import { useTranslationStore } from '@/stores/translationStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmationDialog } from '@/components/admin/delete-confirmation-dialog';
import { Globe, Plus, Trash2, Copy, Languages, Settings, Wand2, Edit } from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { TranslationEditor } from './translation-editor';

export function LanguageManagement() {
  const {
    languages,
    translations,
    settings,
    loading,
    progress,
    fetchLanguages,
    fetchTranslations,
    fetchSettings,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    cloneLanguage,
    translateLanguage,
    updateSettings
  } = useTranslationStore();

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [languageToDelete, setLanguageToDelete] = React.useState<string | null>(null);
  const [newLanguage, setNewLanguage] = React.useState({
    code: '',
    name: '',
    flag: '',
    direction: 'ltr' as const
  });
  const [openAIKey, setOpenAIKey] = React.useState(settings?.openai_api_key || '');
  const [openAIModel, setOpenAIModel] = React.useState(settings?.openai_model || 'gpt-4o-mini');
  const [sourceLanguage, setSourceLanguage] = React.useState('');
  const [targetLanguage, setTargetLanguage] = React.useState('');
  const [editingLanguage, setEditingLanguage] = React.useState<string | null>(null);
  const [translating, setTranslating] = React.useState(false);

  React.useEffect(() => {
    fetchLanguages();
    fetchTranslations();
    fetchSettings();
  }, []);

  const handleAddLanguage = async () => {
    if (!newLanguage.code || !newLanguage.name || !newLanguage.flag) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen tüm alanları doldurun",
      });
      return;
    }

    await addLanguage({
      ...newLanguage,
      is_active: true
    });

    setNewLanguage({
      code: '',
      name: '',
      flag: '',
      direction: 'ltr'
    });
  };

  const handleDeleteClick = (code: string) => {
    setLanguageToDelete(code);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!languageToDelete) return;
    await deleteLanguage(languageToDelete);
    setShowDeleteDialog(false);
  };

  const handleSaveSettings = async () => {
    await updateSettings({
      openai_api_key: openAIKey,
      openai_model: openAIModel
    });
  };

  const handleCloneLanguage = async () => {
    if (!sourceLanguage || !targetLanguage) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen kaynak ve hedef dili seçin",
      });
      return;
    }

    await cloneLanguage(sourceLanguage, targetLanguage);
  };

  const handleTranslateLanguage = async () => {
    if (!sourceLanguage || !targetLanguage) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Lütfen kaynak ve hedef dili seçin",
      });
      return;
    }

    if (!settings?.openai_api_key) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "OpenAI API anahtarı ayarlanmamış",
      });
      return;
    }

    setTranslating(true);
    await translateLanguage(sourceLanguage, targetLanguage);
    setTranslating(false);
  };

  // Translation Progress
  const translationProgress = loading ? (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Çeviriler işleniyor...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  ) : null;

  return (
    <div className="space-y-8">
      {/* Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Çeviri Ayarları</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>OpenAI API Anahtarı</Label>
            <Input
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="sk-..."
            />
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
          </div>
        </div>
        <Button onClick={handleSaveSettings} disabled={loading}>
          Ayarları Kaydet
        </Button>
      </div>

      {/* Add Language Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Yeni Dil Ekle</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Dil Kodu</Label>
            <Input
              value={newLanguage.code}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, code: e.target.value }))}
              placeholder="en"
            />
          </div>
          <div className="space-y-2">
            <Label>Dil Adı</Label>
            <Input
              value={newLanguage.name}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, name: e.target.value }))}
              placeholder="English"
            />
          </div>
          <div className="space-y-2">
            <Label>Bayrak Emoji</Label>
            <Input
              value={newLanguage.flag}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, flag: e.target.value }))}
              placeholder="🇬🇧"
            />
          </div>
          <div className="space-y-2">
            <Label>Yazı Yönü</Label>
            <Select
              value={newLanguage.direction}
              onValueChange={(value: 'ltr' | 'rtl') => setNewLanguage(prev => ({ ...prev, direction: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Yön seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ltr">Soldan Sağa (LTR)</SelectItem>
                <SelectItem value="rtl">Sağdan Sola (RTL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAddLanguage} disabled={loading}>
          Dil Ekle
        </Button>
      </div>

      {/* Language Operations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Dil İşlemleri</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Label>Kaynak Dil</Label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Kaynak dil seçin" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Hedef Dil</Label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Hedef dil seçin" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleCloneLanguage}
            disabled={loading || !sourceLanguage || !targetLanguage}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Dili Klonla
          </Button>
          <Button
            variant="outline"
            onClick={handleTranslateLanguage}
            disabled={loading || !sourceLanguage || !targetLanguage || !settings?.openai_api_key}
            className="gap-2"
          >
            <Wand2 className="h-4 w-4" />
            Otomatik Çevir
          </Button>
          {translationProgress}
        </div>
      </div>

      {/* Languages Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Mevcut Diller</h2>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dil Kodu</TableHead>
                <TableHead>Dil Adı</TableHead>
                <TableHead>Bayrak</TableHead>
                <TableHead>Yazı Yönü</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Çeviri Sayısı</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages.map((language) => (
                <TableRow key={language.code}>
                  <TableCell>{language.code}</TableCell>
                  <TableCell>{language.name}</TableCell>
                  <TableCell>{language.flag}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {language.direction === 'ltr' ? 'Soldan Sağa' : 'Sağdan Sola'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={language.is_active ? 'default' : 'secondary'}>
                      {language.is_active ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {translations.filter(t => t.language_code === language.code).length}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingLanguage(language.code)}
                        className="hover:bg-primary/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(language.code)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Bu dili silmek istediğinizden emin misiniz?"
        description="Bu işlem geri alınamaz. Dil ve ilgili tüm çeviriler kalıcı olarak silinecektir."
      />
      
      {/* Translation Editor */}
      {editingLanguage && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-4 z-50 bg-background border rounded-lg shadow-lg overflow-auto">
            <div className="p-6">
              <TranslationEditor
                languageCode={editingLanguage}
                onClose={() => setEditingLanguage(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
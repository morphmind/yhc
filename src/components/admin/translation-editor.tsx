import React from 'react';
import { useTranslationStore } from '@/stores/translationStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Save, Search } from 'lucide-react';

interface TranslationEditorProps {
  languageCode: string;
  onClose: () => void;
}

export function TranslationEditor({ languageCode, onClose }: TranslationEditorProps) {
  const { translations, updateTranslation } = useTranslationStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editingTranslation, setEditingTranslation] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const itemsPerPage = 10;

  // Filter translations for the selected language
  const languageTranslations = translations
    .filter(t => t.language_code === languageCode)
    .filter(t => 
      t.namespace.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Calculate pagination
  const totalPages = Math.ceil(languageTranslations.length / itemsPerPage);
  const paginatedTranslations = languageTranslations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = async (id: string) => {
    await updateTranslation(id, { value: editValue });
    setEditingTranslation(null);
    setEditValue('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <h2 className="text-lg font-semibold">Çeviri Düzenle</h2>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Translations Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Namespace</TableHead>
              <TableHead>Anahtar</TableHead>
              <TableHead>Değer</TableHead>
              <TableHead className="w-[100px]">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTranslations.map((translation) => (
              <TableRow key={translation.id}>
                <TableCell className="font-mono text-sm">
                  {translation.namespace}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {translation.key}
                </TableCell>
                <TableCell>
                  {editingTranslation === translation.id ? (
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="min-h-[100px]"
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{translation.value}</div>
                  )}
                </TableCell>
                <TableCell>
                  {editingTranslation === translation.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleSave(translation.id)}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingTranslation(translation.id);
                        setEditValue(translation.value);
                      }}
                      className="w-full"
                    >
                      Düzenle
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Toplam {languageTranslations.length} çeviri
          {searchTerm && ` (${translations.length} çeviri içinde)`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Sayfa {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
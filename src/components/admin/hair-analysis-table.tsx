import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationDialog } from '@/components/admin/delete-confirmation-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, MessageSquare, Phone, Mail, Search, Filter, Download, Upload, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { cn } from '@/lib/utils';

// Utility functions for formatting
const formatHairLossType = (type: string) => {
  const types: Record<string, string> = {
    'none': 'Saç dökülmesi yok',
    'light': 'Hafif saç çizgisi çekilmesi',
    'slight-crown': 'Saç çizgisi çekilmesi + hafif tepe açılması',
    'strong-crown': 'Belirgin saç çizgisi çekilmesi + tepe açılması',
    'semi-bald': 'Yarı kel',
    'bald': 'Kel'
  };
  return types[type] || type;
};

const formatDuration = (duration: string) => {
  const durations: Record<string, string> = {
    'less-than-1': '1 yıldan az',
    '1-to-3': '1-3 yıl',
    '3-to-5': '3-5 yıl',
    'more-than-5': '5 yıldan fazla'
  };
  return durations[duration] || duration;
};

interface HairAnalysisSubmission {
  id: string;
  gender: string;
  age_range: { min: number; max: number | null };
  hair_loss_type: string;
  hair_loss_duration: string;
  previous_transplants: boolean;
  medical_conditions: string[];
  medications: string[];
  allergies: string[];
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  notes: string | null;
  created_at: string;
  photos?: Record<string, string>;
}

interface HairAnalysisTableProps {
  submissions: HairAnalysisSubmission[];
  onEdit: (submission: HairAnalysisSubmission) => void;
  onStatusChange: (id: string, status: string) => void;
  onRefresh: () => void;
}

export function HairAnalysisTable({
  submissions,
  onEdit,
  onStatusChange,
  onRefresh
}: HairAnalysisTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [countryFilter, setCountryFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [submissionToDelete, setSubmissionToDelete] = React.useState<string | null>(null);
  const itemsPerPage = 10;
  const [exporting, setExporting] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const jsonInputRef = React.useRef<HTMLInputElement>(null);

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      `${submission.first_name} ${submission.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || submission.country === countryFilter;

    return matchesSearch && matchesStatus && matchesCountry;
  });

  // Paginate submissions
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique countries for filter
  const countries = Array.from(new Set(submissions.map(s => s.country))).sort();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'scheduled':
        return 'success';
      case 'completed':
        return 'primary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      new: 'Yeni',
      contacted: 'İletişime Geçildi',
      scheduled: 'Randevu Alındı',
      completed: 'Tamamlandı',
      cancelled: 'İptal'
    };
    return statusMap[status] || status;
  };

  const handleDeleteClick = (id: string) => {
    setSubmissionToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!submissionToDelete) return;

    try {
      const { error } = await supabase
        .from('hair_analysis_submissions')
        .delete()
        .eq('id', submissionToDelete);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Başvuru silindi",
      });

      onRefresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Başvuru silinirken bir hata oluştu",
      });
    } finally {
      setShowDeleteDialog(false);
      setSubmissionToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Ara..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-9 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl h-11" 
          />
        </div>

        <Select 
          value={statusFilter} 
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="h-11 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
            <SelectValue placeholder="Durum Filtrele" />
          </SelectTrigger>
          <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-border/50">
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="new">Yeni</SelectItem>
            <SelectItem value="contacted">İletişime Geçildi</SelectItem>
            <SelectItem value="scheduled">Randevu Alındı</SelectItem>
            <SelectItem value="completed">Tamamlandı</SelectItem>
            <SelectItem value="cancelled">İptal</SelectItem>
          </SelectContent>
        </Select>

        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="h-11 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
            <SelectValue placeholder="Ülke Filtrele" />
          </SelectTrigger>
          <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-border/50">
            <SelectItem value="all">Tüm Ülkeler</SelectItem>
            {countries.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          className="gap-2 h-11 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
          onClick={onRefresh}
        >
          <Filter className="h-4 w-4" />
          Filtreleri Temizle
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white/50 dark:bg-white/5 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-black/5 dark:hover:bg-white/5">
              <TableHead>Hasta</TableHead>
              <TableHead>İletişim</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Saç Dökülmesi</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSubmissions.map((submission) => (
              <TableRow 
                key={submission.id} 
                className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {submission.first_name} {submission.last_name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {submission.country}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{submission.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{submission.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={submission.status}
                    onValueChange={(value) => onStatusChange(submission.id, value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <Badge variant={getStatusBadgeVariant(submission.status)}>
                        {getStatusText(submission.status)}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Yeni</SelectItem>
                      <SelectItem value="contacted">İletişime Geçildi</SelectItem>
                      <SelectItem value="scheduled">Randevu Alındı</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                      <SelectItem value="cancelled">İptal</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">
                      {formatHairLossType(submission.hair_loss_type)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {submission.previous_transplants ? 'Önceki saç ekimi var' : 'İlk saç ekimi'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(submission.created_at), 'dd MMM yyyy', { locale: tr })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const whatsappText = `Merhaba ${submission.first_name} ${submission.last_name}, saç analizi başvurunuzu aldık. Size yardımcı olmak isteriz.`;
                        window.open(`https://wa.me/${submission.phone}?text=${encodeURIComponent(whatsappText)}`, '_blank');
                      }}
                      className="hover:bg-primary/10 transition-colors rounded-full"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(submission)} 
                      className="hover:bg-primary/10 transition-colors rounded-full"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(submission.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 transition-colors rounded-full"
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Toplam {filteredSubmissions.length} başvuru
          {searchTerm && ` (${submissions.length} başvuru içinde)`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-9 px-4 rounded-xl"
          >
            Önceki
          </Button>
          <div className="text-sm">
            Sayfa {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-9 px-4 rounded-xl"
          >
            Sonraki
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Bu başvuruyu silmek istediğinizden emin misiniz?"
        description="Bu işlem geri alınamaz. Başvuru ve ilgili tüm veriler kalıcı olarak silinecektir."
      />
    </div>
  );
}
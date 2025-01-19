import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  MessageSquare,
  Clock,
  History,
  Stethoscope,
  Image as ImageIcon,
  FileText,
  Save
} from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { supabase } from '@/lib/supabase';

interface HairAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: any;
  onSuccess?: () => void;
}

export function HairAnalysisDialog({
  open,
  onOpenChange,
  submission,
  onSuccess
}: HairAnalysisDialogProps) {
  const [notes, setNotes] = React.useState(submission?.notes || '');
  const [saving, setSaving] = React.useState(false);

  const handleSaveNotes = async () => {
    if (!submission) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('hair_analysis_submissions')
        .update({ notes })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: "Başarılı",
        description: "Notlar kaydedildi",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Notlar kaydedilirken bir hata oluştu",
      });
    } finally {
      setSaving(false);
    }
  };

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

  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            {submission.first_name} {submission.last_name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Genel Bilgiler</TabsTrigger>
            <TabsTrigger value="medical">Medikal Bilgiler</TabsTrigger>
            <TabsTrigger value="photos">Fotoğraflar</TabsTrigger>
            <TabsTrigger value="notes">Notlar</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-6">
            {/* Contact Information */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">İletişim Bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{submission.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(submission.created_at), 'dd MMMM yyyy', { locale: tr })}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    const whatsappText = `Merhaba ${submission.first_name} ${submission.last_name}, saç analizi başvurunuzu aldık. Size yardımcı olmak isteriz.`;
                    window.open(`https://wa.me/${submission.phone}?text=${encodeURIComponent(whatsappText)}`, '_blank');
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp'tan Yaz
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open(`tel:${submission.phone}`, '_blank')}
                >
                  <Phone className="h-4 w-4" />
                  Ara
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open(`mailto:${submission.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4" />
                  E-posta Gönder
                </Button>
              </div>
            </div>

            {/* Hair Loss Information */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Saç Dökülmesi Bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Cinsiyet</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.gender === 'male' ? 'Erkek' : 'Kadın'}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Yaş Aralığı</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {submission.age_range.max 
                        ? `${submission.age_range.min}-${submission.age_range.max} yaş`
                        : `${submission.age_range.min}+ yaş`
                      }
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Saç Dökülme Tipi</div>
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span>{formatHairLossType(submission.hair_loss_type)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Dökülme Süresi</div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDuration(submission.hair_loss_duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Medical Tab */}
          <TabsContent value="medical" className="mt-4 space-y-6">
            {/* Previous Transplant */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Önceki Saç Ekimi</h3>
              <div>
                <Badge variant={submission.previous_transplants ? "default" : "secondary"}>
                  {submission.previous_transplants ? 'Önceki saç ekimi var' : 'İlk saç ekimi'}
                </Badge>
              </div>
              {submission.previous_transplants && submission.previous_transplant_details && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Ne zaman:</span>{' '}
                    {formatDuration(submission.previous_transplant_details.timeframe)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Klinik:</span>{' '}
                    {submission.previous_transplant_details.clinic || 'Belirtilmedi'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Greft Sayısı:</span>{' '}
                    {submission.previous_transplant_details.grafts || 'Belirtilmedi'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Kullanılan Teknik:</span>{' '}
                    {submission.previous_transplant_details.technique || 'Belirtilmedi'}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Memnuniyet:</span>{' '}
                    {submission.previous_transplant_details.results || 'Belirtilmedi'}
                  </div>
                </div>
              )}
            </div>

            {/* Medical History */}
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Medikal Geçmiş</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Kronik Hastalıklar</div>
                  {submission.medical_conditions?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {submission.medical_conditions.map((condition: string, index: number) => (
                        <li key={index} className="text-sm">{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Belirtilmedi</p>
                  )}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">İlaçlar</div>
                  {submission.medications?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {submission.medications.map((medication: string, index: number) => (
                        <li key={index} className="text-sm">{medication}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Belirtilmedi</p>
                  )}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Alerjiler</div>
                  {submission.allergies?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {submission.allergies.map((allergy: string, index: number) => (
                        <li key={index} className="text-sm">{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Belirtilmedi</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {submission.photos && Object.entries(submission.photos).map(([type, url]) => (
                <div key={type} className="space-y-2">
                  <h4 className="font-medium capitalize">{type} Görünüm</h4>
                  <img
                    src={url as string}
                    alt={`${type} view`}
                    className="w-full aspect-square object-cover rounded-lg border"
                  />
                </div>
              ))}
              {(!submission.photos || Object.keys(submission.photos).length === 0) && (
                <div className="col-span-2 flex flex-col items-center justify-center p-8 border rounded-lg">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Fotoğraf yüklenmemiş</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notlar
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleSaveNotes}
                  disabled={saving}
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Hasta ile ilgili notlarınızı buraya ekleyin..."
                className="min-h-[200px]"
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/useToast';
import { countries } from '@/config/countries';
import { cn } from '@/lib/utils';
import { 
  Send, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Loader2 
} from 'lucide-react';

export function ContactSection() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gerekli alanları doğrulayın
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'country', 'message'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

      if (missingFields.length > 0) {
        throw new Error('Lütfen tüm gerekli alanları doldurun');
      }

      // TODO: Form gönderim mantığını uygulayın
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simüle edilmiş gecikme

      toast({
        title: t.contact.form.success,
        description: 'En kısa sürede size geri döneceğiz.',
      });

      // Formu temizleyin
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t.contact.form.error,
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="form" className="relative py-24 overflow-hidden">
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Form Kartı */}
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.08)]">
            <div className="p-6 sm:p-8 md:p-12">
              {/* Form Başlığı */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-4">
                  {t.contact.form.title}
                </h2>
                <p className="text-lg text-foreground/60 dark:text-white/60">
                  {t.contact.form.description}
                </p>
              </div>

              {/* İletişim Formu */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* İsim Alanları */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.firstName.label}</Label>
                    <Input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder={t.contact.form.fields.firstName.placeholder}
                      className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.lastName.label}</Label>
                    <Input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder={t.contact.form.fields.lastName.placeholder}
                      className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* İletişim Alanları */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.email.label}</Label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t.contact.form.fields.email.placeholder}
                      className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.phone.label}</Label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder={t.contact.form.fields.phone.placeholder}
                      className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* Ülke & Konu */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.country.label}</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
                        <SelectValue placeholder={t.contact.form.fields.country.placeholder} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px]">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <span className="text-base">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-medium">{t.contact.form.fields.subject.label}</Label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder={t.contact.form.fields.subject.placeholder}
                      className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* Mesaj */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">{t.contact.form.fields.message.label}</Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t.contact.form.fields.message.placeholder}
                    className="min-h-[150px] bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl resize-none"
                  />
                </div>

                {/* Gönderme Butonu */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                    <Shield className="w-4 h-4" />
                    <span>{t.contact.form.secure}</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full sm:w-auto h-12 px-8 text-base gap-2",
                      "text-white dark:text-primary bg-primary dark:bg-white rounded-full",
                      "shadow-lg hover:shadow-xl transition-all duration-300",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "disabled:opacity-70 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {loading ? 'Sending...' : t.contact.form.submit}
                  </Button>
                </div>
              </form>

              {/* Hızlı İletişim Seçenekleri */}
              <div className="mt-12 pt-12 border-t border-border/50">
                <div className="grid gap-6 sm:grid-cols-3">
                  {/* WhatsApp */}
                  <Button
                    variant="outline"
                    className="h-auto py-6 gap-4 flex-col items-center rounded-xl bg-white/50 dark:bg-white/5"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <MessageCircle className="w-6 h-6 text-green-500" />
                    <div className="text-center">
                      <div className="font-medium mb-1">WhatsApp</div>
                      <div className="text-sm text-muted-foreground">{t.contact.info.items.phone.available}</div>
                    </div>
                  </Button>

                  {/* Telefon */}
                  <Button
                    variant="outline"
                    className="h-auto py-6 gap-4 flex-col items-center rounded-xl bg-white/50 dark:bg-white/5"
                    onClick={() => window.open('tel:+905360344866', '_blank')}
                  >
                    <Phone className="w-6 h-6 text-blue-500" />
                    <div className="text-center">
                      <div className="font-medium mb-1">Call Us</div>
                      <div className="text-sm text-muted-foreground">{t.contact.info.items.phone.value}</div>
                    </div>
                  </Button>

                  {/* Email */}
                  <Button
                    variant="outline"
                    className="h-auto py-6 gap-4 flex-col items-center rounded-xl bg-white/50 dark:bg-white/5"
                    onClick={() => window.open('mailto:info@yakisiklihairclinic.com', '_blank')}
                  >
                    <Mail className="w-6 h-6 text-purple-500" />
                    <div className="text-center">
                      <div className="font-medium mb-1">Email Us</div>
                      <div className="text-sm text-muted-foreground">{t.contact.info.items.email.value}</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

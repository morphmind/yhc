import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Phone, 
  Calendar, 
  Clock, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Star 
} from 'lucide-react';

interface HeroSectionProps {
  onWhatsAppClick: () => void;
  onCallClick: () => void;
  onScheduleClick: () => void;
}

export function HeroSection({ onWhatsAppClick, onCallClick, onScheduleClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  return (
    <div id="info" className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0">
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Rozet */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Clock className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.contact.hero.badge}
            </span>
          </div>

          {/* Başlık */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.15] tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              {t.contact.hero.title.highlight}
            </span>
            <span className="block mt-2 text-foreground dark:text-white">
              {t.contact.hero.title.main}
            </span>
          </h1>

          {/* Açıklama */}
          <p className="text-lg sm:text-xl text-foreground/60 dark:text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t.contact.hero.description}
          </p>

          {/* İletişim Bilgisi Kartları */}
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto mb-8">
            {/* Telefon Kartı */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-2">
                <Phone className="w-6 h-6 text-emerald-500" />
                <div className="text-sm font-medium">{t.contact.info.items.phone.title}</div>
                <div className="text-sm text-foreground/60 dark:text-white/60">{t.contact.info.items.phone.value}</div>
                <div className="text-xs text-emerald-500">{t.contact.info.items.phone.available}</div>
              </div>
            </div>

            {/* Email Kartı */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" />
                <div className="text-sm font-medium">{t.contact.info.items.email.title}</div>
                <div className="text-sm text-foreground/60 dark:text-white/60">{t.contact.info.items.email.value}</div>
                <div className="text-xs text-blue-500">{t.contact.info.items.email.available}</div>
              </div>
            </div>

            {/* Konum Kartı */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6 group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-2">
                <MapPin className="w-6 h-6 text-purple-500" />
                <div className="text-sm font-medium">{t.contact.info.items.location.title}</div>
                <div className="text-sm text-foreground/60 dark:text-white/60 text-center">{t.contact.info.items.location.value}</div>
                <div className="text-xs text-purple-500">{t.contact.info.items.location.available}</div>
              </div>
            </div>
          </div>

          {/* CTA Düğmeleri */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onWhatsAppClick}
              onMouseEnter={() => setHoveredButton('whatsapp')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <MessageCircle className="w-4 h-4" />
              {t.contact.hero.cta.whatsapp}
              {hoveredButton === 'whatsapp' && (
                <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onScheduleClick}
              onMouseEnter={() => setHoveredButton('schedule')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Calendar className="w-4 h-4" />
              {t.contact.hero.cta.schedule}
              {hoveredButton === 'schedule' && (
                <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onCallClick}
              onMouseEnter={() => setHoveredButton('call')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <Phone className="w-4 h-4" />
              {t.contact.hero.cta.call}
              {hoveredButton === 'call' && (
                <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

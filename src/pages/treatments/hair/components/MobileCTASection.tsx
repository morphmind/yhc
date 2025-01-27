import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageCircle, Phone, Shield } from 'lucide-react';

interface MobileCTASectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
}

export function MobileCTASection({ onAnalysisClick, onWhatsAppClick, onCallClick }: MobileCTASectionProps) {
  const { t } = useTranslation();

  return (
    <div className="relative py-12 lg:hidden overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] transition-all duration-300 hover:scale-[1.02]">
              <Shield className="w-3.5 h-3.5 text-primary dark:text-white" />
              <span className="text-xs font-medium text-foreground/80 dark:text-white/80">
                {t.hairTransplant.cta.badge}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground dark:text-white">
                {t.hairTransplant.cta.title}
              </h3>
              <p className="text-sm text-foreground/60 dark:text-white/60">
                {t.hairTransplant.cta.description}
              </p>
            </div>

            {/* Main CTA Button */}
            <Button
              className="w-full h-12 gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={onAnalysisClick}
            >
              <ArrowRight className="w-4 h-4" />
              {t.hairTransplant.cta.buttons.analysis}
            </Button>

            {/* Secondary Actions */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                {t.hairTransplant.cta.buttons.whatsapp}
              </Button>
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onCallClick}
              >
                <Phone className="w-4 h-4" />
                {t.hairTransplant.cta.buttons.call}
              </Button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-foreground/60 dark:text-white/60">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.hairTransplant.cta.secureNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
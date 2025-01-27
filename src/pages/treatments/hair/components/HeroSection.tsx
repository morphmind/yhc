import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle,
  Shield,
  Star
} from 'lucide-react';

interface HeroSectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
}

export function HeroSection({ onAnalysisClick, onWhatsAppClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);

  const stats = [
    {
      value: t.hairTransplant.hero.stats.experience.value,
      label: t.hairTransplant.hero.stats.experience.label,
      icon: Clock,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
    {
      value: t.hairTransplant.hero.stats.operations.value,
      label: t.hairTransplant.hero.stats.operations.label,
      icon: CheckCircle,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-500'
    },
    {
      value: t.hairTransplant.hero.stats.satisfaction.value,
      label: t.hairTransplant.hero.stats.satisfaction.label,
      icon: Star,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    {
      value: t.hairTransplant.hero.stats.guarantee.value,
      label: t.hairTransplant.hero.stats.guarantee.label,
      icon: Shield,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500'
    }
  ];

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-[84px] md:pt-[88px] lg:pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div className="relative space-y-4 sm:space-y-6">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] transition-all duration-300 hover:scale-[1.02] relative">
              <Sparkles className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.hairTransplant.hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-[1.2] tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                {t.hairTransplant.hero.title.highlight}
              </span>
              <br />
              <span className="text-foreground dark:text-white">
                {t.hairTransplant.hero.title.main}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-xl">
              {t.hairTransplant.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onAnalysisClick}
              >
                <ArrowRight className="w-4 h-4" />
                {t.hairTransplant.cta.buttons.analysis}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                {t.hairTransplant.cta.buttons.whatsapp}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-6 sm:mt-8 lg:mt-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl transform rotate-3 blur-sm" />
            <img
              src="https://glokalizm.com/yakisikli/img/hair-transplant/hero.jpg"
              alt="Hair Transplant"
              className="relative w-full aspect-[4/3] object-cover rounded-2xl sm:rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-12 relative z-[1]">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                "h-[80px] sm:h-[100px]", // Reduced height on mobile
                hoveredStat === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-3 sm:p-4 flex items-center h-full">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}
                  >
                      <stat.icon className={cn(
                        "w-3 h-3 sm:w-4 sm:h-4 transition-colors",
                        hoveredStat === index ? stat.iconColor : "text-primary dark:text-white"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="text-sm sm:text-lg font-bold text-primary dark:text-white leading-none mb-0.5">
                        {stat.value}
                      </div>
                      <p className="text-[9px] sm:text-xs text-muted-foreground leading-tight line-clamp-2">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-foreground/60 dark:text-white/60">
        <div className="relative w-5 sm:w-6 h-8 sm:h-10 rounded-full border border-primary/20 dark:border-white/20 overflow-hidden">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-primary dark:bg-white animate-scroll-down" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 dark:to-black/5" />
        </div>
        <span className="text-[8px] sm:text-xs font-medium opacity-80">{t.hairTransplant.hero.scrollText}</span>
      </div>
    </div>
  );
}
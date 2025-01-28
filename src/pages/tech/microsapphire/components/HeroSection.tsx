import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  MessageCircle,
  Clock,
  Shield,
  Star,
  Microscope,
  Ruler, // Added Ruler
} from 'lucide-react';

interface HeroSectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
}

export function HeroSection({ onAnalysisClick, onWhatsAppClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  // Handle scroll animation
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    {
      value: t.microsapphire.hero.stats.precision.value,
      label: t.microsapphire.hero.stats.precision.label,
      icon: Ruler, // Now defined
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500',
    },
    {
      value: t.microsapphire.hero.stats.healing.value,
      label: t.microsapphire.hero.stats.healing.label,
      icon: Clock,
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500',
    },
    {
      value: t.microsapphire.hero.stats.success.value,
      label: t.microsapphire.hero.stats.success.label,
      icon: Star,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500',
    },
    {
      value: t.microsapphire.hero.stats.density.value,
      label: t.microsapphire.hero.stats.density.label,
      icon: Shield,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]">
        <div className="absolute inset-0">
          {/* Glowing Lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse delay-75" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse delay-150" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="relative space-y-6">
            {/* Tech Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]">
              <Microscope className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t.microsapphire.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {t.microsapphire.hero.title.highlight}
              </span>
              <span className="block mt-2 text-white text-[0.85em]">
                {t.microsapphire.hero.title.main}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
              {t.microsapphire.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-0"
                onClick={onAnalysisClick}
              >
                <ArrowRight className="w-5 h-5" />
                {t.microsapphire.cta.buttons.analysis}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-base gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={onWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                {t.microsapphire.cta.buttons.whatsapp}
              </Button>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="relative mt-8 sm:mt-10 lg:mt-0">
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl animate-pulse" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <img
                  src="https://glokalizm.com/yakisikli/img/tech/micro-sapphire-dhi-choi-pen.png"
                  alt="Micro Sapphire DHI Technology"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Tech Specs Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-white">Micro Sapphire DHI</h3>
                      <p className="text-sm text-gray-300">Ultra-precise incisions with sapphire crystal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 relative">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-300",
                  "bg-white/5 backdrop-blur-md",
                  "border border-white/10",
                  "p-4 h-[100px]",
                  hoveredStat === index ? "scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "hover:scale-[1.01]"
                )}
              >
                <div className="flex items-center h-full">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-br",
                        stat.gradient
                      )}
                    >
                      <stat.icon
                        className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredStat === index ? "text-white" : stat.iconColor
                        )}
                      />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-white/10 relative">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
          </div>
          <span className="text-xs text-gray-400">{t.microsapphire.hero.scrollText}</span>
        </div>
      </div>
    </div>
  );
}

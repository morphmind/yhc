import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, CheckCircle, Sprout, Play, ChevronRight, Star, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { SuccessStoriesSlider } from '@/components/sections/SuccessStoriesSlider';

export function HeroSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = React.useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const platforms = [
    {
      id: 'google',
      name: 'Google',
      logo: 'https://glokalizm.com/yakisikli/img/reviews/google.svg',
      iconColor: 'text-[#4285F4] dark:text-[#8AB4F8]',
      iconBg: 'bg-[#4285F4]/10 dark:bg-[#4285F4]/20',
      rating: '4.9',
      reviews: '350+',
      link: 'https://g.page/r/yakisiklihairclinic/review',
      badge: {
        text: 'Verified',
        color: 'text-[#4285F4] dark:text-[#8AB4F8]',
        bg: 'bg-[#4285F4]/10 dark:bg-[#4285F4]/20'
      }
    },
    {
      id: 'trustpilot',
      name: 'Trustpilot',
      logo: 'https://glokalizm.com/yakisikli/img/reviews/trustpilot.svg',
      iconColor: 'text-[#00B67A] dark:text-[#00D696]',
      iconBg: 'bg-[#00B67A]/10 dark:bg-[#00B67A]/20',
      rating: '4.8',
      reviews: '280+',
      link: 'https://www.trustpilot.com/review/yakisiklihairclinic.com',
      badge: {
        text: 'Excellent',
        color: 'text-[#00B67A] dark:text-[#00D696]',
        bg: 'bg-[#00B67A]/10 dark:bg-[#00B67A]/20'
      }
    },
    {
      id: 'whatclinic',
      name: 'WhatClinic',
      logo: 'https://glokalizm.com/yakisikli/img/reviews/whatclinic.png',
      iconColor: 'text-[#7E3AF2] dark:text-[#9F6FFF]',
      iconBg: 'bg-[#7E3AF2]/10 dark:bg-[#7E3AF2]/20',
      rating: '4.9',
      reviews: '200+',
      link: 'https://www.whatclinic.com/cosmetic-plastic-surgery/turkey/fethiye/yakisikli-hair-clinic',
      badge: {
        text: 'Top Rated',
        color: 'text-[#7E3AF2] dark:text-[#9F6FFF]',
        bg: 'bg-[#7E3AF2]/10 dark:bg-[#7E3AF2]/20'
      }
    },
    {
      id: 'realself',
      name: 'RealSelf',
      logo: 'https://glokalizm.com/yakisikli/img/reviews/realself.png',
      iconColor: 'text-[#FF5722] dark:text-[#FF7A50]',
      iconBg: 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20',
      rating: '4.8',
      reviews: '150+',
      link: 'https://www.realself.com/dr/mustafa-yakisikli-fethiye-turkey',
      badge: {
        text: 'Worth It',
        color: 'text-[#FF5722] dark:text-[#FF7A50]',
        bg: 'bg-[#FF5722]/10 dark:bg-[#FF5722]/20'
      }
    },
    {
      id: 'provenexpert',
      name: 'ProvenExpert',
      logo: 'https://glokalizm.com/yakisikli/img/reviews/provenexpert.png',
      iconColor: 'text-[#E53E3E] dark:text-[#FC8181]',
      iconBg: 'bg-[#E53E3E]/10 dark:bg-[#E53E3E]/20',
      rating: '4.9',
      reviews: '220+',
      link: 'https://www.provenexpert.com/yakisikli-hair-clinic',
      badge: {
        text: 'Certified',
        color: 'text-[#E53E3E] dark:text-[#FC8181]',
        bg: 'bg-[#E53E3E]/10 dark:bg-[#E53E3E]/20'
      }
    }
  ];

  const stats = [
    {
      label: t.home.hero.stats.operations,
      value: '15K+',
      icon: CheckCircle,
      gradient: 'from-emerald-500/20 to-green-500/20 dark:from-emerald-500/30 dark:to-green-500/30',
      iconColor: 'text-emerald-500 dark:text-emerald-400',
    },
    {
      label: t.home.hero.stats.growth,
      value: '99%',
      icon: Sprout,
      gradient: 'from-blue-500/20 to-indigo-500/20 dark:from-blue-500/30 dark:to-indigo-500/30',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      label: t.home.hero.stats.experience,
      value: '12+',
      icon: Calendar,
      gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30',
      iconColor: 'text-purple-500 dark:text-purple-400',
    },
    {
      label: t.home.hero.stats.awards,
      value: '25+',
      icon: Award,
      gradient: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/30 dark:to-orange-500/30',
      iconColor: 'text-amber-500 dark:text-amber-400',
    },
  ];

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]"></div>

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[128px] animate-pulse dark:from-primary/20 dark:to-secondary/20"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-[96px] animate-pulse dark:from-secondary/20 dark:to-primary/20"></div>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="container relative z-[5] px-4 md:px-6 pt-32 md:pt-24 lg:pt-20">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="relative">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-6 relative z-[15] group transition-all duration-300 hover:scale-[1.02]">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80 whitespace-nowrap">
                  {t.home.hero.badge || 'Premium Saç Ekimi Merkezi'}
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-[10%] -right-[10%] w-[250px] h-[250px] bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              
              {/* Main Heading */}
              <h1 className="block font-bold text-4xl sm:text-5xl md:text-6xl !leading-[1.1] tracking-tight relative z-[5] mb-2">
                <span className={cn(
                  "bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent",
                  "font-[750]",
                  "dark:brightness-125"
                )}>
                  {t.home.hero.title.highlight}
                </span>
                <span className="block mt-2 sm:mt-3">
                  <span className="text-foreground dark:text-white">
                    {t.home.hero.title.main}
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground dark:text-white/70 leading-relaxed max-w-xl relative z-[5]">
                {t.home.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 relative z-[5]">
                <Link to="/hair-analysis">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto relative group overflow-hidden",
                      "bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90",
                      "dark:from-white dark:via-white dark:to-white/95 dark:hover:from-white/90 dark:hover:via-white/90 dark:hover:to-white/85",
                      "text-white dark:text-primary",
                      "h-11 sm:h-12 text-sm sm:text-base px-6 sm:px-8",
                      "rounded-full transition-all duration-300",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                      "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.home.hero.cta.analysis}
                      <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </span>
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto relative group",
                    "h-11 sm:h-12 text-sm sm:text-base px-6 sm:px-8",
                    "rounded-full transition-all duration-300",
                    "bg-white/80 dark:bg-white/10 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "text-foreground dark:text-white",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "hover:bg-white/90 dark:hover:bg-white/20",
                    "hover:scale-[1.02] active:scale-[0.98]"
                  )}
                  onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                >
                  <span className="flex items-center justify-center gap-2">
                    {t.home.hero.cta.whatsapp}
                    <div className="w-5 h-5 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center">
                      <Play className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="relative lg:pl-8 hidden lg:block">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-2xl transform rotate-1 blur-lg"></div>
              
              {/* Success Stories Slider */}
              <div className="relative bg-white/90 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-black/[0.08] dark:border-white/[0.08] shadow-lg overflow-hidden">
                <SuccessStoriesSlider />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-xl p-4 transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredStat === index ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      <stat.icon className={cn(
                        "w-5 h-5 transition-colors",
                        hoveredStat === index ? stat.iconColor : "text-primary dark:text-white"
                      )} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary dark:text-white">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {platforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  onMouseEnter={() => setHoveredPlatform(platform.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-xl transition-all duration-300",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    hoveredPlatform === platform.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]",
                    "p-4"
                  )}>
                    {/* Platform Icon & Name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        platform.iconBg,
                        platform.iconColor
                      )}>
                        <img 
                          src={platform.logo} 
                          alt={platform.name}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-foreground dark:text-white truncate">
                            {platform.name}
                          </h3>
                        </div>
                        <div className={cn(
                          "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
                          platform.badge.bg,
                          platform.badge.color
                        )}>
                          {platform.badge.text}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const rating = parseFloat(platform.rating);
                              const isHalf = i === Math.floor(rating) && rating % 1 !== 0;
                              const isFilled = i < Math.floor(rating);

                              return (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3.5 h-3.5",
                                    "transition-colors",
                                    isFilled
                                      ? "text-yellow-400 fill-yellow-400"
                                      : isHalf
                                      ? "text-yellow-400 fill-yellow-400/50"
                                      : "text-gray-300 dark:text-gray-600"
                                  )}
                                />
                              );
                            })}
                          </div>
                          <span className={cn(
                            "text-sm font-semibold",
                            platform.iconColor
                          )}>
                            {platform.rating}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Users className={cn(
                            "w-3.5 h-3.5",
                            platform.iconColor
                          )} />
                          <span className="text-xs text-muted-foreground">
                            {platform.reviews} verified reviews
                          </span>
                        </div>

                        {/* Bottom Highlight */}
                        <div className={cn(
                          "absolute bottom-0 left-0 w-full h-0.5",
                          "bg-gradient-to-r from-transparent",
                          "via-current to-transparent",
                          "transform scale-x-0 group-hover:scale-x-100",
                          "transition-transform duration-500",
                          platform.iconColor
                        )}></div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
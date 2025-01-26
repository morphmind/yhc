// src/components/sections/HeroSection.tsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Calendar, CheckCircle, Sprout, Play, ChevronRight, Star, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)

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
  ]

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
      <div className="container relative z-[5] px-4 md:px-6 pt-40 md:pt-28 lg:pt-32">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-4">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-6 sm:mb-8 relative z-[15] group transition-all duration-300 hover:scale-[1.02] mt-4 sm:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-white"></span>
                <span className="badge-text whitespace-nowrap">
                  {t.home.hero.badge || 'Premium Saç Ekimi Merkezi'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="block font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[1.2] tracking-tight relative z-[5]">
                <span className="text-primary dark:text-white">
                  {t.home.hero.title.highlight}
                </span>
                <span className="block mt-2 sm:mt-3 lg:mt-4">
                  <span className="text-foreground dark:text-white">
                    {t.home.hero.title.main}
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground dark:text-white/70 leading-relaxed max-w-3xl relative z-[5]">
                {t.home.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid gap-3 sm:gap-4 w-full sm:inline-flex relative z-[5]">
                <Link to="/hair-analysis">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto relative group overflow-hidden",
                      "bg-primary dark:bg-white text-white dark:text-primary",
                      "h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10",
                      "rounded-full transition-all duration-300",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                      "hover:translate-y-[-1px]",
                      "hover:bg-primary/90 dark:hover:bg-white/90",
                      "active:translate-y-[1px]",
                      "active:shadow-none"
                    )}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t.home.hero.cta.analysis}
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto relative group",
                    "h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10",
                    "rounded-full transition-all duration-300",
                    "bg-white/80 dark:bg-white/10 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "text-foreground dark:text-white",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "hover:translate-y-[-1px]",
                    "hover:bg-white/90 dark:hover:bg-white/20",
                    "active:translate-y-[1px]",
                    "active:shadow-none"
                  )}
                  onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                >
                  <span className="flex items-center justify-center gap-2">
                    {t.home.hero.cta.whatsapp}
                    <Play className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="grid gap-4 mt-8 lg:mt-0 relative">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative"
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div className={cn(
                      "relative p-5 rounded-2xl transition-all duration-300 group",
                      "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      hoveredStat === index ? "scale-[1.02]" : "hover:scale-[1.01]",
                      hoveredStat === index ? "shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : ""
                    )}>
                      <div className="flex items-center gap-x-5">
                        <div className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                          "bg-white dark:bg-white/10",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                          hoveredStat === index ? stat.iconColor : "text-primary dark:text-white"
                        )}>
                          <stat.icon className="w-5 h-5 transition-colors" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary dark:text-white">
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
            </div>

            {/* Mobile Stats */}
            <div className="mt-8 grid grid-cols-2 gap-2 lg:hidden">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "relative overflow-hidden rounded-xl p-3 transition-all duration-300",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "hover:scale-[1.02]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                        stat.iconColor
                      )}
                    >
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg sm:text-xl font-bold text-primary dark:text-white leading-none mb-0.5">
                        {stat.value}
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground dark:text-white/60 font-medium leading-tight line-clamp-2">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
  )
}

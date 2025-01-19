import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Calendar, CheckCircle, Sprout, Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    {
      label: t.home.hero.stats.operations,
      value: '15K+',
      icon: CheckCircle,
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      label: t.home.hero.stats.growth,
      value: '99%',
      icon: Sprout,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-500',
    },
    {
      label: t.home.hero.stats.experience,
      value: '12+',
      icon: Calendar,
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-500',
    },
    {
      label: t.home.hero.stats.awards,
      value: '25+',
      icon: Award,
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-500',
    },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[128px] animate-pulse dark:from-primary/20 dark:to-secondary/20" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-[96px] animate-pulse dark:from-secondary/20 dark:to-primary/20" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-[5] px-4 md:px-6 pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-4">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 relative z-[15] group transition-all duration-300 hover:scale-[1.02]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-white" />
                <span className="badge-text whitespace-nowrap">
                  {t.home.hero.badge || 'Premium Saç Ekimi Merkezi'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="block font-bold text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-6xl xl:text-7xl !leading-[1.2] tracking-tight relative z-[5]">
                <span className="text-primary dark:text-white">
                  {t.home.hero.title.highlight}
                </span>
                <span className="block mt-2 lg:mt-4">
                  <span className="text-foreground dark:text-white">
                    {t.home.hero.title.main}
                  </span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground dark:text-white/70 leading-relaxed max-w-3xl relative z-[5]">
                {t.home.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 md:mt-10 lg:mt-12 grid gap-4 w-full sm:inline-flex relative z-[5]">
                <Link to="/hair-analysis">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto relative group overflow-hidden",
                      "bg-primary dark:bg-white text-white dark:text-primary",
                      "h-12 sm:h-14 text-base sm:text-lg px-8 sm:px-10",
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
                    "h-12 sm:h-14 text-base sm:text-lg px-8 sm:px-10",
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
                    <div
                      className={cn(
                        "relative p-5 rounded-2xl transition-all duration-300 group",
                        "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                        "border border-black/[0.08] dark:border-white/[0.08]",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                        hoveredStat === index ? "scale-[1.02]" : "hover:scale-[1.01]",
                        hoveredStat === index ? "shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : ""
                      )}
                    >
                      <div className="flex items-center gap-x-5">
                        <div
                          className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                            "bg-white dark:bg-white/10",
                            "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                            hoveredStat === index ? stat.iconColor : "text-primary"
                          )}
                        >
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary dark:text-white">
                            {stat.value}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground dark:text-white/60">
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
            <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "relative overflow-hidden rounded-xl p-5 text-center transition-all duration-300",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "hover:scale-[1.02]"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      stat.iconColor
                    )}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-primary dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-white/60 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

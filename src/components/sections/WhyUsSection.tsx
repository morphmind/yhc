import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import {
  Award,
  Scroll,
  HeartHandshake,
  Medal,
  Star,
  Users,
  UserCheck,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function WhyUsSection() {
  const { t } = useTranslation()
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null)

  // Örnek stat verisi (varsayılan). Siz projede bunu prop veya context vb. ile alıyor olabilirsiniz.
  const stats = [
    {
      label: 'Happy Patients',
      value: '10K+',
      icon: Users,
      iconColor: '', // ekstra tailwind class eklemek isterseniz
    },
    {
      label: 'Success Rate',
      value: '98%',
      icon: Star,
      iconColor: '',
    },
    {
      label: 'Global Certificates',
      value: '5',
      icon: Check,
      iconColor: '',
    },
  ]

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[250px] h-[250px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* Mobile Doctor Profile Card */}
        <div className="lg:hidden mb-12">
          <div className="relative overflow-hidden rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]">
                  <img
                    src="https://glokalizm.com/yakisikli/img/doctorprofile.png"
                    alt="Dr. Mustafa Yakışıklı"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-black shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-white absolute inset-0 m-auto animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate text-foreground dark:text-white">
                  Dr. Mustafa Yakışıklı
                </h3>
                <p className="text-sm text-foreground/60 dark:text-white/60">
                  {t.home.hero.whyUs.doctorTitle}
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed mb-6">
              {t.home.hero.whyUs.doctorDescription}
            </p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-foreground/80 dark:text-white/80">
                <Award className="w-4 h-4 text-primary dark:text-white" />
                <span className="font-medium text-xs">
                  {t.home.hero.whyUs.stats.certificates}
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80 dark:text-white/80">
                <Users className="w-4 h-4 text-primary dark:text-white" />
                <span className="font-medium text-xs">
                  {t.home.hero.whyUs.stats.operations}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Doctor Section */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl transform rotate-3 blur-sm" />
              <img
                src="https://glokalizm.com/yakisikli/img/doctorprofile.png"
                alt="Dr. Mustafa Yakışıklı"
                className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] transition-all duration-300 hover:scale-[1.02]">
                <Medal className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                  {t.home.hero.whyUs.doctorTitle}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white">
                Dr. Mustafa Yakışıklı
              </h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.home.hero.whyUs.doctorDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-foreground/80 dark:text-white/80">
                  <Award className="w-5 h-5 text-primary dark:text-white" />
                  <span className="text-sm font-medium whitespace-nowrap tracking-tight">
                    {t.home.hero.whyUs.stats.certificates}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-foreground/80 dark:text-white/80">
                  <Users className="w-5 h-5 text-primary dark:text-white" />
                  <span className="text-sm font-medium whitespace-nowrap tracking-tight">
                    {t.home.hero.whyUs.stats.operations}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Features & Certifications */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          {/* Clinic Features */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                <Star className="w-6 h-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-white">
                {t.home.hero.whyUs.clinic.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {t.home.hero.whyUs.clinic.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary dark:text-white text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-foreground/60 dark:text-white/60 leading-relaxed">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                <Scroll className="w-6 h-6 text-primary dark:text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-white">
                {t.home.hero.whyUs.certifications.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* JCI Accreditation */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)]">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary dark:text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground dark:text-white">
                    {t.home.hero.whyUs.certifications.items.jci}
                  </p>
                  <p className="text-xs text-foreground/60 dark:text-white/60 mt-0.5">
                    Joint Commission International
                  </p>
                </div>
              </div>

              {/* ISO Certification */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)]">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary dark:text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground dark:text-white">
                    {t.home.hero.whyUs.certifications.items.iso}
                  </p>
                  <p className="text-xs text-foreground/60 dark:text-white/60 mt-0.5">
                    Quality Management System
                  </p>
                </div>
              </div>

              {/* ISHRS Membership */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)]">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary dark:text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground dark:text-white">
                    {t.home.hero.whyUs.certifications.items.ishrs}
                  </p>
                  <p className="text-xs text-foreground/60 dark:text-white/60 mt-0.5">
                    International Society of Hair Restoration Surgery
                  </p>
                </div>
              </div>

              {/* TSHD Membership */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)]">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary dark:text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground dark:text-white">
                    {t.home.hero.whyUs.certifications.items.tshd}
                  </p>
                  <p className="text-xs text-foreground/60 dark:text-white/60 mt-0.5">
                    Turkish Society of Hair Restoration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Satisfaction Section */}
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <HeartHandshake className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                {t.home.hero.whyUs.satisfaction.title}
              </span>
            </div>
          </div>

          {/* Stats Grid (Desktop) */}
          <div className="grid grid-cols-3 gap-3 mb-8 hidden lg:grid">
            {/* Satisfaction Rate */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] text-center transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mx-auto mb-3">
                <Star className="w-5 h-5 text-primary dark:text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-1">
                {t.home.hero.whyUs.satisfaction.stats.rate.value}
              </div>
              <p className="text-sm text-foreground/60 dark:text-white/60">
                {t.home.hero.whyUs.satisfaction.stats.rate.label}
              </p>
            </div>

            {/* Happy Patients */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] text-center transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-primary dark:text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-1">
                {t.home.hero.whyUs.satisfaction.stats.patients.value}
              </div>
              <p className="text-sm text-foreground/60 dark:text-white/60">
                {t.home.hero.whyUs.satisfaction.stats.patients.label}
              </p>
            </div>

            {/* Rating */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] text-center transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mx-auto mb-3">
                <Star className="w-5 h-5 text-primary dark:text-white fill-primary dark:fill-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-1">
                {t.home.hero.whyUs.satisfaction.stats.rating.value}
              </div>
              <p className="text-sm text-foreground/60 dark:text-white/60">
                {t.home.hero.whyUs.satisfaction.stats.rating.label}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 text-base text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => window.open('/hair-analysis', '_blank')}
            >
              {t.home.hero.whyUs.satisfaction.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* 
        Mobile Stats (lg:hidden)
        ------------------------------------------------------
        Aşağıdaki blok, stat verilerini mobile ekranda göstermek için.
        Hata almamanız için "div/p" etiketlerini doğru kapattık.
      */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              'relative overflow-hidden rounded-xl p-4 transition-all duration-300',
              'bg-white/80 dark:bg-white/5 backdrop-blur-md',
              'border border-black/[0.08] dark:border-white/[0.08]',
              'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
              'hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]',
              'hover:scale-[1.02]'
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                  'bg-white dark:bg-white/10',
                  'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                  stat.iconColor
                )}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-primary dark:text-white leading-none mb-2">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

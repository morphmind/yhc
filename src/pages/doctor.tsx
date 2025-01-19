import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  GraduationCap, 
  Award, 
  Stethoscope, 
  Languages, 
  Palette, 
  Code,
  MessageCircle,
  Calendar,
  Phone,
  ChevronRight,
  Star,
  Users,
  Clock,
  Medal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import { useCurrency } from '@/hooks/useCurrency';

export default function DoctorPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);

  const stats = [
    {
      value: t.doctor.stats.operations.value,
      label: t.doctor.stats.operations.label,
      icon: Users,
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      value: t.doctor.stats.experience.value,
      label: t.doctor.stats.experience.label,
      icon: Clock,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-blue-500',
    },
    {
      value: t.doctor.stats.certificates.value,
      label: t.doctor.stats.certificates.label,
      icon: Medal,
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-500',
    },
    {
      value: t.doctor.stats.rating.value,
      label: t.doctor.stats.rating.label,
      icon: Star,
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-500',
    },
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: t.doctor.achievements.education.title,
      items: t.doctor.achievements.education.items
    },
    {
      icon: Award,
      title: t.doctor.achievements.awards.title,
      items: t.doctor.achievements.awards.items
    },
    {
      icon: Stethoscope,
      title: t.doctor.achievements.experience.title,
      items: t.doctor.achievements.experience.items
    },
    {
      icon: Languages,
      title: t.doctor.achievements.languages.title,
      items: t.doctor.achievements.languages.items
    },
    {
      icon: Palette,
      title: t.doctor.achievements.interests.title,
      items: t.doctor.achievements.interests.items
    },
    {
      icon: Code,
      title: t.doctor.achievements.research.title,
      items: t.doctor.achievements.research.items
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          {/* Modern Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

          {/* Animated Gradient Spheres */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
            <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
          </div>

          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                <Stethoscope className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.doctor.title}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1.2] tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  {t.doctor.name}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {t.doctor.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => window.location.href = '/hair-analysis'}
                >
                  <Calendar className="w-4 h-4" />
                  {t.doctor.cta.consultation}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.doctor.cta.whatsapp}
                </Button>
              </div>
            </div>

            {/* Doctor Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl transform rotate-3 blur-sm" />
              <img
                src="https://glokalizm.com/yakisikli/img/dryakisikli/dryakisikli.jpeg"
                alt="Dr. Mustafa Yakışıklı"
                className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container relative z-10 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                hoveredStat === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      <stat.icon className={cn(
                        "w-6 h-6 transition-colors",
                        hoveredStat === index ? stat.iconColor : "text-primary dark:text-white"
                      )} />
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
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="py-24 relative">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.doctor.bio}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.doctor.experience}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.doctor.interests}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.doctor.commitment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="py-24 bg-gradient-to-b from-background via-background/95 to-background relative">
        <div className="container relative z-10">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="group relative"
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
                )}>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <achievement.icon className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white">
                        {achievement.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {achievement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative">
        <div className="container relative z-10">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
                  {t.doctor.cta.title}
                </h3>
                <p className="text-lg text-foreground/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                  {t.doctor.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.location.href = '/hair-analysis'}
                  >
                    <Calendar className="w-4 h-4" />
                    {t.doctor.cta.consultation}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.doctor.cta.whatsapp}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('tel:+905360344866', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.doctor.cta.call}
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
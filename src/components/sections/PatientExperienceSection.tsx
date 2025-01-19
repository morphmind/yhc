import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Plane, 
  Hotel, 
  Crown, 
  HeartHandshake,
  Clock,
  Stethoscope,
  Syringe,
  Bed,
  MessageCircle,
  Phone,
  Calendar,
  ChevronRight,
  Car,
  UserCheck,
  HeadsetIcon,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PatientExperienceSection() {
  const { t } = useTranslation();
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);
  const [hoveredService, setHoveredService] = React.useState<string | null>(null);
  
  const treatmentSteps = [
    {
      icon: Stethoscope,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      icon: Plane,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    },
    {
      icon: Syringe,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      icon: Bed,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    }
  ];

  const services = [
    {
      id: 'vip',
      icon: Crown,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      id: 'accommodation',
      icon: Hotel,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    },
    {
      id: 'transfer',
      icon: Car,
      gradient: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/10'
    },
    {
      id: 'support',
      icon: HeadsetIcon,
      gradient: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
      bgColor: 'bg-secondary/5',
      borderColor: 'border-secondary/10'
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-16">
          {/* Treatment Process */}
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                <Clock className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.home.experience.process.badge}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.home.experience.process.title}</h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.home.experience.process.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {treatmentSteps.map((step, index) => {
                const stepData = t.home.experience.process.steps[index];
                return (
                <div 
                  key={index}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    hoveredStep === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                  )}>
                    {/* Mobile Layout */}
                    <div className="flex items-start gap-4 p-4 lg:hidden">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center",
                          "bg-white dark:bg-white/10",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                        )}>
                          <step.icon className="w-6 h-6 text-primary dark:text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-foreground dark:text-white">{stepData.title}</h3>
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                            "bg-white dark:bg-white/10",
                            "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                          )}>
                            {index + 1}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {stepData.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className="hidden lg:block p-6">
                      {/* Step Number */}
                      <div className="absolute top-4 right-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          "bg-white dark:bg-white/10",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                          "font-semibold text-sm",
                          "text-primary dark:text-white"
                        )}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="mb-4">
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center",
                          "bg-white dark:bg-white/10",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                        )}>
                          <step.icon className="w-7 h-7 text-primary dark:text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col h-[calc(100%-80px)]">
                        <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                          {stepData.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed flex-1">
                          {stepData.description}
                        </p>
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                <Sparkles className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.home.experience.services.badge}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.home.experience.services.title}</h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.home.experience.services.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl p-6 h-full transition-all duration-300",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    hoveredService === service.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                  )}>
                    {/* Mobile Layout */}
                    <div className="flex lg:hidden items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <service.icon className="w-6 h-6 text-primary dark:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                          {t.home.experience.services.items[service.id].title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">
                          {t.home.experience.services.items[service.id].description}
                        </p>
                        <ul className="space-y-2">
                          {t.home.experience.services.items[service.id].features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                              <span className="text-foreground/60 dark:text-white/60">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <service.icon className="w-7 h-7 text-primary dark:text-white" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {t.home.experience.services.items[service.id].title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {t.home.experience.services.items[service.id].description}
                        </p>
                        <ul className="space-y-2.5">
                          {t.home.experience.services.items[service.id].features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2.5 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                              <span className="text-foreground/60 dark:text-white/60">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                  <HeartHandshake className="w-4 h-4 text-primary dark:text-white" />
                  <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.home.experience.support.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
                  {t.home.experience.support.title}
                </h3>
                <p className="text-lg text-foreground/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                  {t.home.experience.support.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.home.experience.support.cta.whatsapp}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <Calendar className="w-4 h-4" />
                    {t.home.experience.support.cta.schedule}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('tel:+905360344866', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.home.experience.support.cta.call}
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
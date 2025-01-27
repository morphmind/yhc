import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  Play, 
  MapPin, 
  Sparkles, 
  Microscope, 
  Award, 
  Coffee, 
  Hotel, 
  Plane, 
  Car, 
  Train, 
  ParkingMeter as Parking, 
  Stethoscope, 
  Bed, 
  Crown, 
  Shield, 
  Syringe, 
  Laptop, 
  HeartPulse, 
  Microscope as Microscope2, 
  MonitorSmartphone, 
  Ruler, 
  Thermometer, 
  Wifi, 
  Tv, 
  Phone, 
  Bell, 
  Sofa, 
  Coffee as Coffee2, 
  Briefcase, 
  UserRound, 
  Clock, 
  Mail 
} from 'lucide-react';

export default function ClinicPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);
  const [hoveredFacility, setHoveredFacility] = React.useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);
  const [hoveredCert, setHoveredCert] = React.useState<string | null>(null);

  // Update meta tags
  React.useEffect(() => {
    document.title = t.clinic.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.clinic.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.clinic.meta.keywords);
  }, [t.clinic.meta]);

  // Stats data
  const stats = [
    {
      value: t.clinic.hero.stats.area.value,
      label: t.clinic.hero.stats.area.label,
      icon: Ruler,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
    {
      value: t.clinic.hero.stats.rooms.value,
      label: t.clinic.hero.stats.rooms.label,
      icon: Stethoscope,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-500'
    },
    {
      value: t.clinic.hero.stats.capacity.value,
      label: t.clinic.hero.stats.capacity.label,
      icon: HeartPulse,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    {
      value: t.clinic.hero.stats.staff.value,
      label: t.clinic.hero.stats.staff.label,
      icon: UserRound,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500'
    }
  ];

  // Features data
  const features = [
    {
      id: 'equipment',
      icon: Microscope,
      iconColor: 'text-emerald-500',
      data: t.clinic.features.items.equipment
    },
    {
      id: 'sterile',
      icon: Shield,
      iconColor: 'text-blue-500',
      data: t.clinic.features.items.sterile
    },
    {
      id: 'comfort',
      icon: Crown,
      iconColor: 'text-purple-500',
      data: t.clinic.features.items.comfort
    },
    {
      id: 'technology',
      icon: MonitorSmartphone,
      iconColor: 'text-amber-500',
      data: t.clinic.features.items.technology
    }
  ];

  // Facilities data
  const facilities = [
    {
      id: 'operatingRoom',
      icon: Syringe,
      iconColor: 'text-emerald-500',
      data: t.clinic.facilities.items.operatingRoom
    },
    {
      id: 'consultation',
      icon: Laptop,
      iconColor: 'text-blue-500',
      data: t.clinic.facilities.items.consultation
    },
    {
      id: 'recovery',
      icon: Bed,
      iconColor: 'text-purple-500',
      data: t.clinic.facilities.items.recovery
    },
    {
      id: 'vip',
      icon: Crown,
      iconColor: 'text-amber-500',
      data: t.clinic.facilities.items.vip
    }
  ];

  // Technologies data
  const technologies = [
    {
      id: 'analysis',
      icon: Microscope,
      iconColor: 'text-emerald-500',
      data: t.clinic.technology.items.analysis
    },
    {
      id: 'microscopes',
      icon: Microscope2,
      iconColor: 'text-blue-500',
      data: t.clinic.technology.items.microscopes
    },
    {
      id: 'implanter',
      icon: Syringe,
      iconColor: 'text-purple-500',
      data: t.clinic.technology.items.implanter
    },
    {
      id: 'monitoring',
      icon: MonitorSmartphone,
      iconColor: 'text-amber-500',
      data: t.clinic.technology.items.monitoring
    }
  ];

  // Transportation data
  const transportation = [
    {
      id: 'airport',
      icon: Plane,
      data: t.clinic.location.transportation.options.airport
    },
    {
      id: 'public',
      icon: Train,
      data: t.clinic.location.transportation.options.public
    },
    {
      id: 'parking',
      icon: Parking,
      data: t.clinic.location.transportation.options.parking
    }
  ];

  // Certifications data
  const certifications = [
    {
      id: 'jci',
      icon: Award,
      iconColor: 'text-emerald-500',
      data: t.clinic.certifications.items.jci
    },
    {
      id: 'iso',
      icon: Shield,
      iconColor: 'text-blue-500',
      data: t.clinic.certifications.items.iso
    },
    {
      id: 'health',
      icon: Stethoscope,
      iconColor: 'text-purple-500',
      data: t.clinic.certifications.items.health
    },
    {
      id: 'tshd',
      icon: Award,
      iconColor: 'text-amber-500',
      data: t.clinic.certifications.items.tshd
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      {/* Hero Section */}
      <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0">
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
            <div className="relative space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-4 sm:mb-6 transition-all duration-300 hover:scale-[1.02] relative">
                <Building2 className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.hero.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1.2] tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  {t.clinic.hero.title.highlight}
                </span>
                <br />
                <span className="text-foreground dark:text-white">
                  {t.clinic.hero.title.main}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-xl">
                {t.clinic.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => window.open('/virtual-tour', '_blank')}
                >
                  <Play className="w-4 h-4" />
                  {t.clinic.hero.virtualTour}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-11 sm:h-12 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base gap-1.5 sm:gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => window.open('https://maps.app.goo.gl/fVb8V5hj7R3UDdPR8', '_blank')}
                >
                  <MapPin className="w-4 h-4" />
                  {t.clinic.hero.location}
                </Button>
              </div>
            </div>

            {/* Clinic Image */}
            <div className="relative mt-4 sm:mt-6 lg:mt-0 z-[1]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl transform rotate-3 blur-sm" />
              <img
                src="https://glokalizm.com/yakisikli/img/clinic/clinic-exterior.jpg"
                alt="Yakışıklı Hair Clinic"
                className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6 lg:mt-8 mb-0 relative z-[1]">
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
                  <div className="p-3 flex items-center">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <stat.icon className={cn(
                          "w-4 h-4 transition-colors",
                          hoveredStat === index ? stat.iconColor : "text-primary dark:text-white"
                        )} />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="text-base sm:text-lg font-bold text-primary dark:text-white leading-none mb-0.5">
                          {stat.value}
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight line-clamp-2">
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
      </div>

      {/* Features Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <Sparkles className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.features.title}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.clinic.features.title}</h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.clinic.features.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group relative"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredFeature === feature.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  <div className="p-6 space-y-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      <feature.icon className={cn(
                        "w-6 h-6 transition-colors",
                        hoveredFeature === feature.id ? feature.iconColor : "text-primary dark:text-white"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                        {feature.data.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {feature.data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <Building2 className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.facilities.title}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.clinic.facilities.title}</h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.clinic.facilities.description}
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="group relative"
                onMouseEnter={() => setHoveredFacility(facility.id)}
                onMouseLeave={() => setHoveredFacility(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredFacility === facility.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <facility.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredFacility === facility.id ? facility.iconColor : "text-primary dark:text-white"
                        )} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {facility.data.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {facility.data.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {facility.data.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                          <span className="text-sm text-foreground/60 dark:text-white/60">{feature}</span>
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

      {/* Technology Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <Microscope className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.technology.title}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.clinic.technology.title}</h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.clinic.technology.description}
            </p>
          </div>

          {/* Technology Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="group relative"
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredTech === tech.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  <div className="p-6 space-y-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      <tech.icon className={cn(
                        "w-6 h-6 transition-colors",
                        hoveredTech === tech.id ? tech.iconColor : "text-primary dark:text-white"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                        {tech.data.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {tech.data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255, 255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <MapPin className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.location.title}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.clinic.location.title}</h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.clinic.location.description}
            </p>
          </div>

          {/* Map and Transportation */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Map */}
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.7459742056745!2d29.126231076680706!3d36.63533942935868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c041f7b8c9c8a5%3A0x9f8d8b8d8b8d8b8d!2sYak%C4%B1%C5%9F%C4%B1kl%C4%B1%20Hair%20Clinic!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>

            {/* Transportation Options */}
            <div className="space-y-6">
              <div className="grid gap-4">
                {transportation.map((option) => (
                  <div
                    key={option.id}
                    className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <option.icon className="w-5 h-5 text-primary dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground dark:text-white">
                          {option.data.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {option.data.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nearby Amenities */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] p-4">
                  <div className="flex items-center gap-3">
                    <Hotel className="w-5 h-5 text-primary dark:text-white" />
                    <span className="text-sm text-foreground/60 dark:text-white/60">{t.clinic.location.nearby.hotels}</span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] p-4">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-primary dark:text-white" />
                    <span className="text-sm text-foreground/60 dark:text-white/60">{t.clinic.location.nearby.restaurants}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <Award className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.clinic.certifications.title}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.clinic.certifications.title}</h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.clinic.certifications.description}
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative"
                onMouseEnter={() => setHoveredCert(cert.id)}
                onMouseLeave={() => setHoveredCert(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredCert === cert.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  <div className="p-6 space-y-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      <cert.icon className={cn(
                        "w-6 h-6 transition-colors",
                        hoveredCert === cert.id ? cert.iconColor : "text-primary dark:text-white"
                      )} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                        {cert.data.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {cert.data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container relative z-10">
          {/* Contact Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
              <div className="p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground dark:text-white">
                      {t.clinic.contact.title}
                    </h3>
                    <p className="text-foreground/60 dark:text-white/60">
                      {t.clinic.contact.description}
                    </p>
                    <div className="space-y-4">
                      <a href={`tel:${t.clinic.contact.info.phone}`} className="flex items-center gap-3 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">
                        <Phone className="w-5 h-5" />
                        <span>{t.clinic.contact.info.phone}</span>
                      </a>
                      <a href={`mailto:${t.clinic.contact.info.email}`} className="flex items-center gap-3 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                        <span>{t.clinic.contact.info.email}</span>
                      </a>
                      <div className="flex items-center gap-3 text-foreground/60 dark:text-white/60">
                        <Clock className="w-5 h-5" />
                        <span>{t.clinic.contact.info.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={t.clinic.contact.form.name}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder={t.clinic.contact.form.email}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={t.clinic.contact.form.phone}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder={t.clinic.contact.form.message}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white dark:text-primary dark:bg-white dark:hover:bg-white/90"
                    >
                      {t.clinic.contact.form.submit}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Microscope, 
  Gem, 
  ChevronRight,
  Sparkles, 
  Syringe,
  Scissors,
  CircleDot,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TreatmentsSection() {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const treatments = [
    {
      id: 'hair',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/hair-transplant'
    },
    {
      id: 'afro',
      icon: UserCheck,
      image: 'https://glokalizm.com/yakisikli/img/treatments/afro-hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/afro-hair-transplant'
    },
    {
      id: 'women',
      icon: UserCheck,
      image: 'https://glokalizm.com/yakisikli/img/treatments/women-hair-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/women-hair-transplant'
    },
    {
      id: 'beard',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/beard-transpant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/beard-transplant'
    },
    {
      id: 'eyebrow',
      icon: Scissors,
      image: 'https://glokalizm.com/yakisikli/img/treatments/eyebrown-transplant.png',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconGradient: 'from-primary to-primary/80',
      path: '/treatments/eyebrow-transplant'
    }
  ];

  const technologies = [
    {
      id: 'microSapphire',
      icon: Gem,
      image: 'https://glokalizm.com/yakisikli/img/technologies/micro-sapphire.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/micro-sapphire'
    },
    {
      id: 'dhi',
      icon: Microscope,
      image: 'https://glokalizm.com/yakisikli/img/technologies/dhi.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/dhi'
    },
    {
      id: 'sapphireFue',
      icon: Sparkles,
      image: 'https://glokalizm.com/yakisikli/img/technologies/sapphire-fue.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/sapphire-fue'
    },
    {
      id: 'needleFree',
      icon: Syringe,
      image: 'https://glokalizm.com/yakisikli/img/technologies/needle-free.jpg',
      gradient: 'from-secondary/10 via-secondary/5 to-transparent',
      iconGradient: 'from-secondary to-secondary/80',
      path: '/technologies/needle-free'
    }
  ];

  const navData = t.header.navigation.hairTransplant;

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_0%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_100%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_0%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-16">
          {/* Treatments Section */}
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                <CircleDot className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{navData.treatments.title}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{navData.treatments.title}</h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.treatments.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {treatments.map((item) => {
                const itemData = navData.treatments[item.id as keyof typeof navData.treatments];
                const optionData = t.treatments.options[item.id as keyof typeof t.treatments.options];
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className="group relative block"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-2xl transition-all duration-500",
                      "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      hoveredItem === item.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                    )}>
                      {/* Image with Gradient Overlay */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-t z-10 transition-opacity duration-500",
                          item.gradient,
                          hoveredItem === item.id ? "opacity-30" : "opacity-60"
                        )} />
                        <img
                          src={item.image}
                          alt={itemData}
                          className={cn(
                            "w-full h-full object-cover transition-transform duration-1000",
                            hoveredItem === item.id ? "scale-110" : "scale-100"
                          )}
                        />
                      </div>
                      
                      {/* Title Bar */}
                      <div className="p-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium text-foreground dark:text-white truncate flex-1 mr-3">
                            {optionData?.title}
                          </h3>
                          <ChevronRight className={cn(
                            "w-5 h-5 text-foreground/60 dark:text-white/60 transition-transform flex-shrink-0",
                            hoveredItem === item.id ? "translate-x-1" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                <Sparkles className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{navData.technologies.title}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{navData.technologies.title}</h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.treatments.techniques.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((item) => {
                const itemData = navData.technologies[item.id as keyof typeof navData.technologies];
                const techData = t.treatments.technologies[item.id as keyof typeof t.treatments.technologies];
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className="group relative block"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-2xl transition-all duration-500",
                      "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      hoveredItem === item.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                    )}>
                      <div className="p-5">
                        {/* Icon and Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            "bg-white dark:bg-white/10",
                            "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                          )}>
                            <item.icon className="w-5 h-5 text-primary dark:text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-medium text-foreground dark:text-white">
                              {techData?.title}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-foreground/60 dark:text-white/60 mb-3 line-clamp-2">
                          {techData?.description}
                        </p>
                        
                        {/* Learn More Link */}
                        <div className="flex items-center text-sm text-primary dark:text-white font-medium">
                          <span>{t.treatments.cta.learn}</span>
                          <ArrowRight className={cn(
                            "w-4 h-4 ml-1 transition-transform",
                            hoveredItem === item.id ? "translate-x-1" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
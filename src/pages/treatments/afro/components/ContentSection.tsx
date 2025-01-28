import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Microscope, 
  Shield, 
  Heart, 
  CheckCircle,
  Sparkles,
  Syringe,
  ArrowRight
} from 'lucide-react';

export function ContentSection() {
  const { t } = useTranslation();
  const [hoveredDifference, setHoveredDifference] = React.useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);
  const [hoveredTechnique, setHoveredTechnique] = React.useState<string | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = React.useState<number | null>(null);

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* Understanding Afro Hair Section */}
        <div id="overview" className="max-w-3xl mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.afroHairTransplant.overview.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.afroHairTransplant.overview.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.afroHairTransplant.overview.description}
          </p>
        </div>

        {/* Differences Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {t.afroHairTransplant.overview.differences.items.map((difference, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredDifference(index)}
              onMouseLeave={() => setHoveredDifference(null)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                hoveredDifference === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br",
                    index === 0 ? "from-emerald-500/20 to-green-500/20" :
                    index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                    index === 2 ? "from-purple-500/20 to-pink-500/20" :
                    "from-amber-500/20 to-orange-500/20"
                  )}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {difference.title}
                    </h3>
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {difference.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
            {t.afroHairTransplant.overview.process.title}
          </h3>
        </div>

        {/* Process Steps */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {t.afroHairTransplant.overview.process.steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
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
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br",
                    index === 0 ? "from-emerald-500/20 to-green-500/20" :
                    index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                    index === 2 ? "from-purple-500/20 to-pink-500/20" :
                    "from-amber-500/20 to-orange-500/20"
                  )}>
                    {index === 0 ? <Microscope className="w-6 h-6 text-white" /> :
                     index === 1 ? <Shield className="w-6 h-6 text-white" /> :
                     index === 2 ? <Heart className="w-6 h-6 text-white" /> :
                     <CheckCircle className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Techniques Section */}
        <div id="techniques" className="max-w-3xl mx-auto text-center mb-24 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Microscope className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.afroHairTransplant.techniques.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.afroHairTransplant.techniques.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.afroHairTransplant.techniques.description}
          </p>
        </div>

        {/* Techniques Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-24">
          {Object.entries(t.afroHairTransplant.techniques.items).map(([key, technique]) => (
            <div
              key={key}
              className="group relative"
              onMouseEnter={() => setHoveredTechnique(key)}
              onMouseLeave={() => setHoveredTechnique(null)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                hoveredTechnique === key ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      "bg-white dark:bg-white/10",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                    )}>
                      {key === 'fue' ? (
                        <Microscope className="w-6 h-6 text-primary dark:text-white" />
                      ) : (
                        <Syringe className="w-6 h-6 text-primary dark:text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white">
                        {technique.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {technique.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {technique.features.map((feature, index) => (
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

        {/* Benefits Section */}
        <div id="benefits" className="max-w-3xl mx-auto text-center mb-24 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Heart className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.afroHairTransplant.benefits.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.afroHairTransplant.benefits.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
            {t.afroHairTransplant.benefits.description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.afroHairTransplant.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                hoveredBenefit === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br",
                    index === 0 ? "from-emerald-500/20 to-green-500/20" :
                    index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                    index === 2 ? "from-purple-500/20 to-pink-500/20" :
                    "from-amber-500/20 to-orange-500/20"
                  )}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recovery Section */}
        <div id="recovery" className="max-w-3xl mx-auto text-center mb-12 pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Shield className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.afroHairTransplant.recovery.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.afroHairTransplant.recovery.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
            {t.afroHairTransplant.recovery.description}
          </p>
        </div>

        {/* Recovery Timeline */}
        <div className="relative px-4 sm:px-0 mb-24">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {t.afroHairTransplant.recovery.timeline.map((period, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden lg:block">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary/20 dark:bg-primary/40 animate-ping" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/40 dark:bg-primary/60" />
                  </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
                  {/* Left Side - Day */}
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-300 p-6 text-center lg:text-right",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "lg:translate-x-4 group-hover:translate-x-0 transition-transform"
                  )}>
                    <div className="relative">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-2">
                        {period.day}
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mx-auto lg:ml-auto lg:mr-0" />
                    </div>
                  </div>

                  {/* Right Side - Description */}
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-300 p-6",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "lg:-translate-x-4 group-hover:translate-x-0 transition-transform"
                  )}>
                    <div className="relative">
                      <p className="text-base text-foreground/80 dark:text-white/80 leading-relaxed">
                        {period.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
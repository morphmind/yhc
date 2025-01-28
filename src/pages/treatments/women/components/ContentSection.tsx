import React from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'
import {
  Microscope,
  Shield,
  Heart,
  CheckCircle,
  Sparkles,
  Syringe,
} from 'lucide-react'

export function ContentSection() {
  const { t } = useTranslation()

  const [hoveredCause, setHoveredCause] = React.useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null)
  const [hoveredTechnique, setHoveredTechnique] = React.useState<string | null>(null)
  const [hoveredBenefit, setHoveredBenefit] = React.useState<number | null>(null)

  return (
    <div className="relative py-24 overflow-hidden" id="content">
      {/* --- Background Pattern --- */}
      <div className="absolute inset-0">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* --- Understanding Female Hair Loss Section --- */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10  backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.womenHairTransplant.overview.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.womenHairTransplant.overview.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.womenHairTransplant.overview.description}
          </p>
        </div>

        {/* --- Common Causes Grid --- */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {t.womenHairTransplant.overview.causes.items.map(
            (cause: any, index: number) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCause(index)}
                onMouseLeave={() => setHoveredCause(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl h-full transition-all duration-300',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    hoveredCause === index
                      ? 'scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : 'hover:scale-[1.01]'
                  )}
                >
                  <div className="p-6 space-y-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center',
                        'bg-gradient-to-br',
                        index === 0
                          ? 'from-emerald-500/20 to-green-500/20'
                          : index === 1
                          ? 'from-blue-500/20 to-indigo-500/20'
                          : index === 2
                          ? 'from-purple-500/20 to-pink-500/20'
                          : 'from-amber-500/20 to-orange-500/20'
                      )}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                        {cause.title}
                      </h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {cause.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* --- Process Section --- */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
            {t.womenHairTransplant.overview.process.title}
          </h3>
        </div>

        {/* --- Process Steps --- */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {t.womenHairTransplant.overview.process.steps.map(
            (step: any, index: number) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl h-full transition-all duration-300',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    hoveredStep === index
                      ? 'scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : 'hover:scale-[1.01]'
                  )}
                >

                  <div className="relative p-6 pt-8 space-y-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center',
                        'bg-gradient-to-br',
                        index === 0
                          ? 'from-emerald-500/20 to-green-500/20'
                          : index === 1
                          ? 'from-blue-500/20 to-indigo-500/20'
                          : index === 2
                          ? 'from-purple-500/20 to-pink-500/20'
                          : 'from-amber-500/20 to-orange-500/20'
                      )}
                    >
                      {index === 0 ? (
                        <Microscope className="w-6 h-6 text-white" />
                      ) : index === 1 ? (
                        <Shield className="w-6 h-6 text-white" />
                      ) : index === 2 ? (
                        <Heart className="w-6 h-6 text-white" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>

                    <div className="relative">
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
            )
          )}
        </div>

        {/* --- Techniques Section --- */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Microscope className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.womenHairTransplant.techniques.title}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.womenHairTransplant.techniques.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.womenHairTransplant.techniques.description}
          </p>
        </div>

        {/* --- Techniques Grid --- */}
        <div className="grid gap-6 md:grid-cols-2 mb-24">
          {Object.entries(t.womenHairTransplant.techniques.items).map(
            ([key, technique]: [string, any]) => (
              <div
                key={key}
                className="group relative"
                onMouseEnter={() => setHoveredTechnique(key)}
                onMouseLeave={() => setHoveredTechnique(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl h-full transition-all duration-300',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    hoveredTechnique === key
                      ? 'scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : 'hover:scale-[1.01]'
                  )}
                >
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center',
                          'bg-white dark:bg-white/10',
                          'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]'
                        )}
                      >
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
                      {technique.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                          <span className="text-sm text-foreground/60 dark:text-white/60">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* --- Benefits Section --- */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Heart className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.womenHairTransplant.benefits.title}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.womenHairTransplant.benefits.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.womenHairTransplant.benefits.description}
          </p>
        </div>

        {/* --- Benefits Grid --- */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.womenHairTransplant.benefits.items.map(
            (benefit: any, index: number) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl h-full transition-all duration-300',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    hoveredBenefit === index
                      ? 'scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : 'hover:scale-[1.01]'
                  )}
                >
                  <div className="p-6 space-y-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center',
                        'bg-gradient-to-br',
                        index === 0
                          ? 'from-emerald-500/20 to-green-500/20'
                          : index === 1
                          ? 'from-blue-500/20 to-indigo-500/20'
                          : index === 2
                          ? 'from-purple-500/20 to-pink-500/20'
                          : 'from-amber-500/20 to-orange-500/20'
                      )}
                    >
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
            )
          )}
        </div>
      </div>
    </div>
  )
}
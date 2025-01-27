import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { CheckCircle, Heart, Shield, Microscope, Syringe } from 'lucide-react';

interface TabContentProps {
  activeTab: string;
}

export function TabContent({ activeTab }: TabContentProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
              {t.hairTransplant.overview.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.hairTransplant.overview.description}
            </p>
          </div>

          {/* Process Title */}
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
              {t.hairTransplant.overview.process.title}
            </h3>
          </div>

          {/* Process Steps */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.hairTransplant.overview.process.steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
                )}>
                  <div className="p-6 pt-8 text-center space-y-4">
                    {/* Step Icon */}
                    <div className={cn(
                      "w-12 h-12 mx-auto rounded-2xl flex items-center justify-center",
                      "bg-gradient-to-br",
                      index === 0 ? "from-emerald-500/20 to-green-500/20" :
                      index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                      index === 2 ? "from-purple-500/20 to-pink-500/20" :
                      "from-amber-500/20 to-orange-500/20"
                    )}>
                      {index === 0 ? <Microscope className="w-6 h-6 text-emerald-500" /> :
                       index === 1 ? <Shield className="w-6 h-6 text-blue-500" /> :
                       index === 2 ? <Heart className="w-6 h-6 text-purple-500" /> :
                       <CheckCircle className="w-6 h-6 text-amber-500" />}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-semibold text-foreground dark:text-white">
                        {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-base text-foreground/60 dark:text-white/60 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom Highlight */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 opacity-50" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      {t.hairTransplant.overview.safety.title}
                    </h3>
                  </div>
                  <p className="text-base text-foreground/80 dark:text-white/80 leading-relaxed">
                    {t.hairTransplant.overview.safety.description}
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 opacity-50" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                      <Microscope className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      {t.hairTransplant.overview.technology.title}
                    </h3>
                  </div>
                  <p className="text-base text-foreground/80 dark:text-white/80 leading-relaxed">
                    {t.hairTransplant.overview.technology.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Techniques Tab */}
      {activeTab === 'techniques' && (
        <div className="space-y-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
              {t.hairTransplant.techniques.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
              {t.hairTransplant.techniques.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(t.hairTransplant.techniques.items).map(([key, technique]) => (
              <div
                key={key}
                className="group relative"
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
                )}>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        {key === 'sapphireFue' ? (
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
        </div>
      )}

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
              {t.hairTransplant.benefits.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.hairTransplant.benefits.description}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Benefits Grid */}
            <div className="space-y-4">
                {t.hairTransplant.benefits.items.map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-2xl transition-all duration-300",
                      "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                      "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
                    )}>
                      <div className="p-6 flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          "bg-gradient-to-br",
                          index === 0 ? "from-emerald-500/20 to-green-500/20" :
                          index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                          index === 2 ? "from-purple-500/20 to-pink-500/20" :
                          "from-amber-500/20 to-orange-500/20",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                        )}>
                          <Heart className={cn(
                            "w-5 h-5",
                            index === 0 ? "text-emerald-500" :
                            index === 1 ? "text-blue-500" :
                            index === 2 ? "text-purple-500" :
                            "text-amber-500"
                          )} />
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

            {/* Eligibility Section */}
            <div className="relative h-full">
              {/* Content */}
              <div className="relative space-y-8 p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
                <div>
                  <h3 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                    {t.hairTransplant.eligibility.title}
                  </h3>
                  <p className="text-lg text-foreground/60 dark:text-white/60">
                    {t.hairTransplant.eligibility.description}
                  </p>
                </div>

                <div className="grid gap-4">
                  {t.hairTransplant.eligibility.criteria.map((criterion, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4 transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          "bg-gradient-to-br",
                          index === 0 ? "from-emerald-500/20 to-green-500/20" :
                          index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                          index === 2 ? "from-purple-500/20 to-pink-500/20" :
                          index === 3 ? "from-amber-500/20 to-orange-500/20" :
                          "from-rose-500/20 to-pink-500/20"
                        )}>
                          <CheckCircle className={cn(
                            "w-5 h-5",
                            index === 0 ? "text-emerald-500" :
                            index === 1 ? "text-blue-500" :
                            index === 2 ? "text-purple-500" :
                            index === 3 ? "text-amber-500" :
                            "text-rose-500"
                          )} />
                        </div>
                        <span className="text-base text-foreground/80 dark:text-white/80">
                          {criterion}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recovery Tab */}
      {activeTab === 'recovery' && (
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
              {t.hairTransplant.recovery.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.hairTransplant.recovery.description}
            </p>
          </div>

          {/* Recovery Timeline */}
          <div className="relative px-4 sm:px-0">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {t.hairTransplant.recovery.timeline.map((period, index) => (
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
      )}
    </div>
  );
}
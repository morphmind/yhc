import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Microscope, Shield, Heart, CheckCircle } from 'lucide-react';

export function MobileOverviewContent() {
  const { t } = useTranslation();

  return (
    <div className="lg:hidden space-y-6">
      {/* Main Description */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent opacity-50" />
        <div className="relative">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
            {t.hairTransplant.overview.title}
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 dark:text-white/80 leading-relaxed">
            {t.hairTransplant.overview.description}
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="space-y-4">
        {t.hairTransplant.overview.process.steps.map((step, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4"
          >
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                "bg-gradient-to-br",
                index === 0 ? "from-emerald-500/20 to-green-500/20" :
                index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                index === 2 ? "from-purple-500/20 to-pink-500/20" :
                "from-amber-500/20 to-orange-500/20"
              )}>
                <span className="text-lg font-bold text-primary dark:text-white">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 dark:text-white/60">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Cards */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20 opacity-50" />
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                {t.hairTransplant.overview.safety.title}
              </h3>
              <p className="text-sm text-foreground/80 dark:text-white/80">
                {t.hairTransplant.overview.safety.description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 opacity-50" />
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Microscope className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                {t.hairTransplant.overview.technology.title}
              </h3>
              <p className="text-sm text-foreground/80 dark:text-white/80">
                {t.hairTransplant.overview.technology.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
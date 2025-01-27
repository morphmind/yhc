import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Clock, Shield } from 'lucide-react';

export function MobileRecoveryContent() {
  const { t } = useTranslation();
  const [expandedDay, setExpandedDay] = React.useState<string | null>(null);

  return (
    <div className="lg:hidden space-y-6">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent opacity-50" />
        <div className="relative">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
            {t.hairTransplant.recovery.title}
          </h2>
          <p className="text-base text-foreground/80 dark:text-white/80 leading-relaxed">
            {t.hairTransplant.recovery.description}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {t.hairTransplant.recovery.timeline.map((period, index) => (
          <div
            key={period.day}
            className={cn(
              "relative overflow-hidden rounded-xl transition-all duration-300",
              "bg-white/80 dark:bg-white/5 backdrop-blur-md",
              "border border-black/[0.08] dark:border-white/[0.08]",
              "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
              expandedDay === period.day ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
            )}
          >
            {/* Header */}
            <button
              onClick={() => setExpandedDay(expandedDay === period.day ? null : period.day)}
              className="w-full p-4 flex items-center gap-4"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br",
                index === 0 ? "from-emerald-500/20 to-green-500/20" :
                index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                index === 2 ? "from-purple-500/20 to-pink-500/20" :
                index === 3 ? "from-amber-500/20 to-orange-500/20" :
                "from-rose-500/20 to-pink-500/20"
              )}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-foreground dark:text-white">
                  {period.day}
                </h3>
                <p className="text-sm text-foreground/60 dark:text-white/60 line-clamp-2">
                  {period.description}
                </p>
              </div>
            </button>

            {/* Expanded Content */}
            <div className={cn(
              "grid transition-all duration-300",
              expandedDay === period.day ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}>
              <div className="overflow-hidden">
                <div className="p-4 pt-0 space-y-4">
                  {/* Recovery Tips */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
                    <Shield className={cn(
                      "w-5 h-5",
                      index === 0 ? "text-emerald-500" :
                      index === 1 ? "text-blue-500" :
                      index === 2 ? "text-purple-500" :
                      index === 3 ? "text-amber-500" :
                      "text-rose-500"
                    )} />
                    <span className="text-sm text-foreground/80 dark:text-white/80">
                      {period.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
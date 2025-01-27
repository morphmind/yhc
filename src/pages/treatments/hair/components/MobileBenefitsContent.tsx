import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Heart, CheckCircle } from 'lucide-react';

export function MobileBenefitsContent() {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = React.useState<'benefits' | 'eligibility'>('benefits');

  return (
    <div className="lg:hidden space-y-6">
      {/* Section Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setExpandedSection('benefits')}
          className={cn(
            "relative p-4 rounded-xl transition-all duration-300",
            "bg-white/80 dark:bg-white/5 backdrop-blur-md",
            "border border-black/[0.08] dark:border-white/[0.08]",
            expandedSection === 'benefits' ? "shadow-lg scale-[1.02]" : "hover:scale-[1.01]"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <Heart className={cn(
              "w-6 h-6 transition-colors",
              expandedSection === 'benefits' ? "text-purple-500" : "text-foreground/60 dark:text-white/60"
            )} />
            <span className="text-sm font-medium text-foreground dark:text-white">
              {t.hairTransplant.benefits.title}
            </span>
          </div>
          {expandedSection === 'benefits' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          )}
        </button>

        <button
          onClick={() => setExpandedSection('eligibility')}
          className={cn(
            "relative p-4 rounded-xl transition-all duration-300",
            "bg-white/80 dark:bg-white/5 backdrop-blur-md",
            "border border-black/[0.08] dark:border-white/[0.08]",
            expandedSection === 'eligibility' ? "shadow-lg scale-[1.02]" : "hover:scale-[1.01]"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className={cn(
              "w-6 h-6 transition-colors",
              expandedSection === 'eligibility' ? "text-emerald-500" : "text-foreground/60 dark:text-white/60"
            )} />
            <span className="text-sm font-medium text-foreground dark:text-white">
              {t.hairTransplant.eligibility.title}
            </span>
          </div>
          {expandedSection === 'eligibility' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          )}
        </button>
      </div>

      {/* Benefits Content */}
      {expandedSection === 'benefits' && (
        <div className="space-y-4">
          {t.hairTransplant.benefits.items.map((benefit, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4"
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  "bg-gradient-to-br",
                  index === 0 ? "from-emerald-500/20 to-green-500/20" :
                  index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                  index === 2 ? "from-purple-500/20 to-pink-500/20" :
                  "from-amber-500/20 to-orange-500/20"
                )}>
                  <Heart className={cn(
                    "w-5 h-5 text-white",
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
          ))}
        </div>
      )}

      {/* Eligibility Content */}
      {expandedSection === 'eligibility' && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4">
            <p className="text-base text-foreground/80 dark:text-white/80 leading-relaxed">
              {t.hairTransplant.eligibility.description}
            </p>
          </div>

          {t.hairTransplant.eligibility.criteria.map((criterion, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4"
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
                    "w-5 h-5 text-white",
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
      )}
    </div>
  );
}
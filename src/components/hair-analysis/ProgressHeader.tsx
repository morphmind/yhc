import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  onBack: () => void;
  onNext?: () => void;
  title: string;
  description: string;
}

export const ProgressHeader = React.forwardRef<HTMLDivElement, ProgressHeaderProps>(({
  currentStep,
  totalSteps,
  progress,
  onBack,
  onNext,
  title,
  description,
}, ref) => {
  const { t } = useTranslation();

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      {/* Progress Navigation */}
      <div className="w-full mb-8">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-2">
          {/* Back Button */}
          <button
            onClick={onBack}
            className={`group relative flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            <div className="absolute inset-0 -m-2 rounded-full bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowLeft className="w-4 h-4 relative transition-transform group-hover:-translate-x-0.5" />
            <span className="relative">{t.hairAnalysis.navigation.back}</span>
          </button>

          {/* Step Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-primary scale-125'
                    : index < currentStep
                    ? 'bg-primary/40'
                    : 'bg-border'
                }`}
              >
                {index === currentStep && (
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            className={`group relative flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${
              currentStep === totalSteps - 1 ? 'invisible' : ''
            }`}
          >
            <div className="absolute inset-0 -m-2 rounded-full bg-primary/5 dark:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">{t.hairAnalysis.navigation.next}</span>
            <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-0.5 bg-border dark:bg-border/50"
          />
          <div 
            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 blur-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Title and Description */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl !leading-[1.2] font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent dark:from-primary dark:via-secondary dark:to-secondary mb-3 sm:mb-4 dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
          {title}
        </h2>
        <p className="text-muted-foreground dark:text-white/80 text-base leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
});

ProgressHeader.displayName = 'ProgressHeader';
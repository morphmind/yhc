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

export function ProgressHeader({
  currentStep,
  totalSteps,
  progress,
  onBack,
  onNext,
  title,
  description,
}: ProgressHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-20">
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
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl !leading-[1.2] font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6 leading-[1.3] sm:leading-[1.4]">
          {title}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
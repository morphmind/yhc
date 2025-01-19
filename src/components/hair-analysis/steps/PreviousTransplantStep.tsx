import React from 'react';
import { History, AlertCircle } from 'lucide-react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PreviousTransplantStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

export function PreviousTransplantStep({ formData, setFormData, onNext }: PreviousTransplantStepProps) {
  const { t } = useTranslation();
  const [hoveredOption, setHoveredOption] = React.useState<boolean | null>(null);

  const handleSelect = (value: boolean) => {
    setFormData({ ...formData, previousTransplants: value });
    if (value) {
      onNext(); // Go to Previous Transplant Details
    } else {
      onNext();
      onNext(); // Skip Previous Transplant Details and go to Medical History
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Yes Option */}
      <div
        onClick={() => handleSelect(true)}
        onMouseEnter={() => setHoveredOption(true)}
        onMouseLeave={() => setHoveredOption(null)}
        className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 ${
          formData.previousTransplants === true
            ? 'ring-2 ring-primary shadow-lg bg-primary/5 dark:bg-primary/10'
            : 'bg-background hover:bg-accent border border-border'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
          hoveredOption === true ? 'opacity-10' : ''
        } ${
          formData.previousTransplants === true
            ? 'from-primary/20 to-secondary/20'
            : 'from-primary/10 to-secondary/10'
        }`} />

        <div className="relative">
          {/* Icon and Selection Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              formData.previousTransplants === true || hoveredOption === true
                ? 'bg-primary/10 dark:bg-primary/20'
                : 'bg-white dark:bg-white/10'
            }`}>
              <History className={`w-6 h-6 transition-colors ${
                formData.previousTransplants === true
                  ? 'text-primary dark:text-white'
                  : 'text-muted-foreground'
              }`} />
            </div>
            <div className={`w-3 h-3 rounded-full transition-colors ${
              formData.previousTransplants === true
                ? 'bg-primary shadow-glow'
                : 'bg-border'
            }`} />
          </div>

          {/* Content */}
          <h3 className={`text-2xl font-bold mb-2 transition-colors ${
            formData.previousTransplants === true
              ? 'text-primary dark:text-white'
              : 'text-foreground'
          }`}>
            {t.hairAnalysis.steps.previous.options.yes.title}
          </h3>
          <p className="text-muted-foreground">
            {t.hairAnalysis.steps.previous.options.yes.description}
          </p>
        </div>

        {/* Bottom Highlight Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Selection Animation */}
        {formData.previousTransplants === true && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 w-8 h-8">
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
      
      {/* No Option */}
      <div
        onClick={() => handleSelect(false)}
        onMouseEnter={() => setHoveredOption(false)}
        onMouseLeave={() => setHoveredOption(null)}
        className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 ${
          formData.previousTransplants === false
            ? 'ring-2 ring-primary shadow-lg bg-primary/5 dark:bg-primary/10'
            : 'bg-background hover:bg-accent border border-border'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
          hoveredOption === false ? 'opacity-10' : ''
        } ${
          formData.previousTransplants === false
            ? 'from-primary/20 to-secondary/20'
            : 'from-primary/10 to-secondary/10'
        }`} />

        <div className="relative">
          {/* Icon and Selection Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              formData.previousTransplants === false || hoveredOption === false
                ? 'bg-primary/10 dark:bg-primary/20'
                : 'bg-white dark:bg-white/10'
            }`}>
              <AlertCircle className={`w-6 h-6 transition-colors ${
                formData.previousTransplants === false
                  ? 'text-primary dark:text-white'
                  : 'text-muted-foreground'
              }`} />
            </div>
            <div className={`w-3 h-3 rounded-full transition-colors ${
              formData.previousTransplants === false
                ? 'bg-primary shadow-glow'
                : 'bg-border'
            }`} />
          </div>

          {/* Content */}
          <h3 className={`text-2xl font-bold mb-2 transition-colors ${
            formData.previousTransplants === false
              ? 'text-primary dark:text-white'
              : 'text-foreground'
          }`}>
            {t.hairAnalysis.steps.previous.options.no.title}
          </h3>
          <p className="text-muted-foreground">
            {t.hairAnalysis.steps.previous.options.no.description}
          </p>
        </div>

        {/* Bottom Highlight Effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Selection Animation */}
        {formData.previousTransplants === false && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 w-8 h-8">
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping" />
              <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
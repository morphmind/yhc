import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Clock } from 'lucide-react';

interface DurationStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

const options = [
  { id: 'less-than-1', min: 0, max: 1 },
  { id: '1-to-3', min: 1, max: 3 },
  { id: '3-to-5', min: 3, max: 5 },
  { id: 'more-than-5', min: 5, max: null },
] as const;

export function DurationStep({ formData, setFormData, onNext }: DurationStepProps) {
  const { t } = useTranslation();
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

  const handleSelect = (id: string) => {
    setFormData({ ...formData, hairLossDuration: id as any });
    onNext();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleSelect(option.id)}
          onMouseEnter={() => setHoveredOption(option.id)}
          onMouseLeave={() => setHoveredOption(null)}
          className={`group relative overflow-hidden rounded-xl p-8 transition-all duration-300 ${
            formData.hairLossDuration === option.id
              ? 'ring-2 ring-primary shadow-lg bg-primary/5 dark:bg-primary/10'
              : 'bg-background hover:bg-accent border border-border'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
          
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
            hoveredOption === option.id ? 'opacity-10' : ''
          } ${
            formData.hairLossDuration === option.id
              ? 'from-primary/20 to-secondary/20'
              : 'from-primary/10 to-secondary/10'
          }`} />

          <div className="relative">
            {/* Icon and Selection Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                formData.hairLossDuration === option.id || hoveredOption === option.id
                  ? 'bg-primary/10 dark:bg-primary/20'
                  : 'bg-white dark:bg-white/10'
              }`}>
                <Clock className={`w-6 h-6 transition-colors ${
                  formData.hairLossDuration === option.id
                    ? 'text-primary dark:text-white'
                    : 'text-muted-foreground'
                }`} />
              </div>
              <div className={`w-3 h-3 rounded-full transition-colors ${
                formData.hairLossDuration === option.id
                  ? 'bg-primary shadow-glow'
                  : 'bg-border'
              }`} />
            </div>

            {/* Duration Display */}
            <h3 className={`text-2xl font-bold mb-2 transition-colors ${
              formData.hairLossDuration === option.id
                ? 'text-primary dark:text-white'
                : 'text-foreground'
            }`}>
              {option.max 
                ? `${option.min} - ${option.max} ${t.hairAnalysis.steps.duration.options.years}`
                : `${option.min}+ ${t.hairAnalysis.steps.duration.options.years}`}
            </h3>
          </div>

          {/* Bottom Highlight Effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

          {/* Selection Animation */}
          {formData.hairLossDuration === option.id && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 right-2 w-8 h-8">
                <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
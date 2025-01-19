import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Calendar } from 'lucide-react';

interface AgeRangeStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

const ageRanges = [
  { min: 20, max: 30 },
  { min: 30, max: 40 },
  { min: 40, max: 50 },
  { min: 50, max: 60 },
  { min: 60, max: null }, // 60+
];

export function AgeRangeStep({ formData, setFormData, onNext }: AgeRangeStepProps) {
  const { t } = useTranslation();
  const [hoveredRange, setHoveredRange] = React.useState<number | null>(null);

  const handleSelect = (min: number, max: number | null) => {
    setFormData({ ...formData, ageRange: { min, max } });
    onNext();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ageRanges.map(({ min, max }, index) => (
        <button
          key={`${min}-${max}`}
          onClick={() => handleSelect(min, max)}
          onMouseEnter={() => setHoveredRange(index)}
          onMouseLeave={() => setHoveredRange(null)}
          className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
            formData.ageRange?.min === min
              ? 'ring-2 ring-primary shadow-lg bg-primary/5 dark:bg-primary/10'
              : 'bg-background hover:bg-accent border border-border'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
          
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
            hoveredRange === index ? 'opacity-10' : ''
          } ${
            formData.ageRange?.min === min
              ? 'from-primary/20 to-secondary/20'
              : 'from-primary/10 to-secondary/10'
          }`} />

          <div className="relative">
            {/* Icon and Selection Indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                formData.ageRange?.min === min || hoveredRange === index
                  ? 'bg-primary/10 dark:bg-primary/20'
                  : 'bg-white dark:bg-white/10'
              }`}>
                <Calendar className={`w-5 h-5 transition-colors ${
                  formData.ageRange?.min === min
                    ? 'text-primary dark:text-white'
                    : 'text-muted-foreground'
                }`} />
              </div>
              <div className={`w-3 h-3 rounded-full transition-colors ${
                formData.ageRange?.min === min
                  ? 'bg-primary shadow-glow'
                  : 'bg-border'
              }`} />
            </div>

            {/* Age Range Display */}
            <h3 className={`text-2xl font-bold mb-2 transition-colors ${
              formData.ageRange?.min === min
                ? 'text-primary dark:text-white'
                : 'text-foreground'
            }`}>
              {max ? `${min}-${max}` : `${min}+`}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {t.hairAnalysis.steps.ageRange.options[
                max ? 'range' : 'above'
              ].replace('{min}', min.toString()).replace('{max}', max?.toString() || '')}
            </p>
          </div>

          {/* Bottom Highlight Effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </button>
      ))}
    </div>
  );
}
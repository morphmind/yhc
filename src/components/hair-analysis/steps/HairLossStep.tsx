import React, { useState } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';

interface HairLossStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  gender: 'male' | 'female';
  onNext: () => void;
}

export const maleOptions = [
  { 
    id: 'none', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/no-hair-loss.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/no-hair-loss-1.svg'
    }
  },
  { 
    id: 'light', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-light.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-light-1.svg'
    }
  },
  { 
    id: 'slight-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'strong-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'semi-bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/semi-bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/semi-bald-1.svg'
    }
  },
  { 
    id: 'bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/men/bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/men/bald-1.svg'
    }
  }
];

export const femaleOptions = [
  { 
    id: 'none', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/no-hair-loss.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/no-hair-loss-1.svg'
    }
  },
  { 
    id: 'light', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-light.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-light-1.svg'
    }
  },
  { 
    id: 'slight-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'strong-crown', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/receding-hairline-strong-crown-1.svg'
    }
  },
  { 
    id: 'semi-bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/semi-bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/semi-bald-1.svg'
    }
  },
  { 
    id: 'bald', 
    images: {
      default: 'https://glokalizm.com/yakisikli/img/hairloss/women/bald.svg',
      hover: 'https://glokalizm.com/yakisikli/img/hairloss/women/bald-1.svg'
    }
  }
];

export function HairLossStep({ formData, setFormData, gender, onNext }: HairLossStepProps) {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'central' | 'top'>('central');
  const options = gender === 'female' ? femaleOptions : maleOptions;
  
  const handleSelect = (id: string) => {
    setFormData({ ...formData, hairLossType: id as any });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* View Toggle for Mobile */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-lg border border-border/50 shadow-sm">
        <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
          Central perspective
        </span>
        <div className="flex items-center gap-3">
          <Switch
            id="view-toggle"
            checked={viewType === 'top'}
            onCheckedChange={(checked) => setViewType(checked ? 'top' : 'central')}
          />
          <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
            Top view
          </span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`group relative bg-white dark:bg-white/5 backdrop-blur-md rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
              formData.hairLossType === option.id 
                ? 'ring-2 ring-primary shadow-lg' 
                : 'border border-border/50'
            }`}
          >
            {/* Title Bar */}
            <h3 className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background via-background/95 to-transparent py-4 px-2 text-center">
              <span className="text-sm font-semibold text-foreground dark:text-white">
                {t.hairAnalysis.steps.hairLoss.options[option.id as keyof typeof t.hairAnalysis.steps.hairLoss.options]}
              </span>
            </h3>

            {/* Image Container */}
            <div className="relative pt-[60px] pb-4 px-4">
              <img
                src={viewType === 'top' ? option.images.hover : (hoveredId === option.id ? option.images.hover : option.images.default)}
                alt={t.hairAnalysis.steps.hairLoss.options[option.id as keyof typeof t.hairAnalysis.steps.hairLoss.options]}
                className="w-full h-[160px] object-contain transition-all duration-300"
              />

              {/* Selection Indicator */}
              {formData.hairLossType === option.id && (
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-xl pointer-events-none">
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
              )}

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 ${
                hoveredId === option.id ? 'opacity-100' : ''
              }`} />
            </div>

            {/* Bottom Highlight */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
        ))}
      </div>
    </div>
  );
}
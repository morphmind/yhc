import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Clock, Building2, Ruler } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PreviousTransplantDetailsStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface TransplantDetails {
  timeframe: string;
  clinic: string;
  grafts: string;
  technique: string;
  results: string;
}

export function PreviousTransplantDetailsStep({
  formData,
  setFormData,
  onNext,
}: PreviousTransplantDetailsStepProps) {
  const { t } = useTranslation();
  const [details, setDetails] = React.useState<TransplantDetails>({
    timeframe: '',
    clinic: '',
    grafts: '',
    technique: '',
    results: '',
  });
  const [hoveredTimeframe, setHoveredTimeframe] = React.useState<string | null>(null);

  const options = [
    { id: 'less-than-1' },
    { id: '1-to-3' },
    { id: '3-to-5' },
    { id: 'more-than-5' },
  ];

  const handleTimeframeSelect = (id: string) => {
    setDetails({ ...details, timeframe: id });
    
    // Only scroll if there are additional details to show
    if (id) {
      setTimeout(() => {
        document.querySelector('#additional-details')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      previousTransplantDetails: JSON.stringify(details),
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Timeframe Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold">
            {t.hairAnalysis.steps.previousDetails.timeframe.title}
          </Label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleTimeframeSelect(option.id)}
              onMouseEnter={() => setHoveredTimeframe(option.id)}
              onMouseLeave={() => setHoveredTimeframe(null)}
              className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                details.timeframe === option.id
                  ? 'ring-2 ring-primary shadow-lg bg-primary/5 dark:bg-primary/10'
                  : 'bg-background hover:bg-accent border border-border'
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
              
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
                hoveredTimeframe === option.id ? 'opacity-10' : ''
              } ${
                details.timeframe === option.id
                  ? 'from-primary/20 to-secondary/20'
                  : 'from-primary/10 to-secondary/10'
              }`} />

              <div className="relative">
                {/* Icon and Selection Indicator */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    details.timeframe === option.id || hoveredTimeframe === option.id
                      ? 'bg-primary/10 dark:bg-primary/20'
                      : 'bg-white dark:bg-white/10'
                  }`}>
                    <Clock className={`w-5 h-5 transition-colors ${
                      details.timeframe === option.id
                        ? 'text-primary dark:text-white'
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className={`w-3 h-3 rounded-full transition-colors ${
                    details.timeframe === option.id
                      ? 'bg-primary shadow-glow'
                      : 'bg-border'
                  }`} />
                </div>

                {/* Timeframe Text */}
                <h3 className={`text-xl font-bold transition-colors ${
                  details.timeframe === option.id
                    ? 'text-primary dark:text-white'
                    : 'text-foreground'
                }`}>
                  {t.hairAnalysis.steps.previousDetails.timeframe.options[option.id as keyof typeof t.hairAnalysis.steps.previousDetails.timeframe.options]}
                </h3>
              </div>

              {/* Bottom Highlight Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div id="additional-details" className="space-y-8">
        {/* Clinic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">
              {t.hairAnalysis.steps.previousDetails.clinic.title}
            </Label>
            <span className="text-sm text-muted-foreground ml-2">
              ({t.hairAnalysis.steps.previousDetails.optional})
            </span>
          </div>
          <Input
            value={details.clinic}
            onChange={(e) => setDetails({ ...details, clinic: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.clinic.placeholder}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50"
          />
        </div>

        {/* Number of Grafts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            <Label className="text-lg font-semibold">
              {t.hairAnalysis.steps.previousDetails.grafts.title}
            </Label>
            <span className="text-sm text-muted-foreground ml-2">
              ({t.hairAnalysis.steps.previousDetails.optional})
            </span>
          </div>
          <Input
            type="number"
            value={details.grafts}
            onChange={(e) => setDetails({ ...details, grafts: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.grafts.placeholder}
            className="max-w-xs bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50"
          />
        </div>

        {/* Technique Used */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {t.hairAnalysis.steps.previousDetails.technique.title}
          </Label>
          <span className="text-sm text-muted-foreground ml-2">
            ({t.hairAnalysis.steps.previousDetails.optional})
          </span>
          <Input
            value={details.technique}
            onChange={(e) => setDetails({ ...details, technique: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.technique.placeholder}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50"
          />
        </div>

        {/* Results and Satisfaction */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {t.hairAnalysis.steps.previousDetails.results.title}
          </Label>
          <span className="text-sm text-muted-foreground ml-2">
            ({t.hairAnalysis.steps.previousDetails.optional})
          </span>
          <Textarea
            value={details.results}
            onChange={(e) => setDetails({ ...details, results: e.target.value })}
            placeholder={t.hairAnalysis.steps.previousDetails.results.placeholder}
            className="min-h-[100px] bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.hairAnalysis.navigation.next}
        </Button>
      </div>
    </div>
  );
}
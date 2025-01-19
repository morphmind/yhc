import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Lock, Shield, UserCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/useToast';
import { countries } from '@/config/countries';

interface FinalStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onSubmit: () => void;
}

export function FinalStep({ formData, setFormData, onSubmit }: FinalStepProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = React.useState('+90'); // Default to Turkey
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);
  
  // Find country by phone code and update country selection
  React.useEffect(() => {
    const country = countries.find(c => c.phoneCode === selectedPhoneCode);
    if (country) {
      setFormData(prev => ({ ...prev, country: country.code }));
    }
  }, [selectedPhoneCode, setFormData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
      toast({
        variant: "error",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-8">
        {/* Name Fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-base font-medium">{t.hairAnalysis.steps.final.firstName}</Label>
            <Input
              required
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.firstNamePlaceholder}
              className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base font-medium">{t.hairAnalysis.steps.final.lastName}</Label>
            <Input
              required
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.lastNamePlaceholder}
              className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.email}</Label>
          <Input
            required
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.hairAnalysis.steps.final.emailPlaceholder}
            className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.phone}</Label>
          <div className="flex gap-2">
            <Select
              defaultValue="+90"
              value={selectedPhoneCode}
              onValueChange={(value) => setSelectedPhoneCode(value)}
            >
              <SelectTrigger className="w-[120px] h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{countries.find(c => c.phoneCode === selectedPhoneCode)?.flag}</span>
                    <span className="text-sm">{selectedPhoneCode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {countries.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.phoneCode}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="text-sm">{country.phoneCode}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              required
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, phone: phoneNumber });
              }}
              placeholder={t.hairAnalysis.steps.final.phonePlaceholder}
              className="flex-1 h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.country}</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
              <SelectValue placeholder={t.hairAnalysis.steps.final.countryPlaceholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[280px]">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Check, label: t.hairAnalysis.steps.final.features.free, id: 'free' },
            { icon: Lock, label: t.hairAnalysis.steps.final.features.secure, id: 'secure' },
            { icon: UserCheck, label: t.hairAnalysis.steps.final.features.expert, id: 'expert' }
          ].map((feature) => (
            <div
              key={feature.id}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                hoveredFeature === feature.id
                  ? 'scale-[1.02] shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  hoveredFeature === feature.id
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'bg-white dark:bg-white/10'
                }`}>
                  <feature.icon className={`w-5 h-5 transition-colors ${
                    hoveredFeature === feature.id
                      ? 'text-primary dark:text-white'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-white">
                    {feature.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm p-4 border border-border/50">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {t.hairAnalysis.steps.final.privacyNotice}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.hairAnalysis.steps.final.submitting : t.hairAnalysis.steps.final.submit}
        </Button>
      </div>
    </div>
  );
}
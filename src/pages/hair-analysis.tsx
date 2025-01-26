import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Moon, Sun, Facebook, Youtube, MessageCircle, ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { LocaleContext } from '@/contexts/LocaleContext';
import { locales } from '@/config/locales';
import { toast } from '@/hooks/useToast';
import { useTheme } from '@/hooks/useTheme';
import { submitAnalysis } from '@/utils/submitAnalysis';
import { ProgressHeader } from '@/components/hair-analysis/ProgressHeader';
import { DoctorFeedback } from '@/components/hair-analysis/DoctorFeedback';
import { PersonalInfoStep } from '@/components/hair-analysis/steps/PersonalInfoStep';
import { AgeRangeStep } from '@/components/hair-analysis/steps/AgeRangeStep';
import { HairLossStep } from '@/components/hair-analysis/steps/HairLossStep';
import { DurationStep } from '@/components/hair-analysis/steps/DurationStep';
import { PreviousTransplantStep } from '@/components/hair-analysis/steps/PreviousTransplantStep';
import { PreviousTransplantDetailsStep } from '@/components/hair-analysis/steps/PreviousTransplantDetailsStep';
import { MedicalHistoryStep } from '@/components/hair-analysis/steps/MedicalHistoryStep';
import { PhotosStep } from '@/components/hair-analysis/steps/PhotosStep';
import { FinalStep } from '@/components/hair-analysis/steps/FinalStep';
import { stepProgress, doctorInfo, stepIds } from '@/components/hair-analysis/constants';
import { Button } from '@/components/ui/button';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { useSubmissionStore } from '@/utils/submitAnalysis';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SuccessStoriesModal } from '@/components/ui/success-stories-modal';
import { useNavigate } from 'react-router-dom';

// Load saved form data from localStorage if exists
const getSavedFormData = (): HairAnalysisFormData => {
  try {
    const saved = localStorage.getItem('hairAnalysisFormData');
    return saved ? JSON.parse(saved) : initialFormData;
  } catch (error) {
    console.error('Error loading saved form data:', error);
    return initialFormData;
  }
};

const steps = [
  { id: stepIds.personal },
  { id: stepIds.ageRange },
  { id: stepIds.hairLoss },
  { id: stepIds.duration },
  { id: stepIds.previous },
  { id: stepIds.previousDetails },
  { id: stepIds.medical },
  { id: stepIds.photos },
  { id: stepIds.final },
];

const initialFormData: HairAnalysisFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: null,
  ageRange: { min: 18, max: 60 }, // Added ageRange with default values
  gender: '' as 'male' | 'female' | 'other',
  country: '',
  hairLossType: '',
  hairLossDuration: '',
  hairLossStability: '',
  familyHistory: false,
  medicalConditions: [],
  medications: [],
  allergies: [],
  previousTransplants: null,
  previousTransplantDetails: '',
  preferredTechnique: '',
  budgetRange: '',
  timeframe: '',
  photos: {}, // Record<string, string>
};

export default function HairAnalysis() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HairAnalysisFormData>(getSavedFormData());
  const { currentLocale, setCurrentLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { loading, message } = useSubmissionStore();
  const formRef = React.useRef<HTMLFormElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const [showSuccessStories, setShowSuccessStories] = useState(false);
  const [matchingStories, setMatchingStories] = useState<any[]>([]);
  const [selectedPattern, setSelectedPattern] = useState('');

  // Listen for success stories event
  React.useEffect(() => {
    const handleSuccessStories = (e: CustomEvent<{ stories: any[], pattern: string }>) => {
      setMatchingStories(e.detail.stories);
      setSelectedPattern(e.detail.pattern);
      setShowSuccessStories(true);
    };

    window.addEventListener('showSuccessStories', handleSuccessStories as EventListener);
    return () => {
      window.removeEventListener('showSuccessStories', handleSuccessStories as EventListener);
    };
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('hairAnalysisFormData', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [formData]);

  const getStepConfig = (stepId: string) => {
    const config = t.hairAnalysis.steps[stepId as keyof typeof t.hairAnalysis.steps];
    if (!config) {
      console.warn(`Missing translation for step: ${stepId}`);
      return { title: '', description: '' };
    }
    return config;
  };

  // Clear form data when analysis is submitted successfully
  const handleSubmitSuccess = async () => {
    try {
      const success = await submitAnalysis(formData, t);
      if (success) {
        localStorage.removeItem('hairAnalysisFormData');
        setFormData(initialFormData);
        // Use replace to prevent back navigation to form
        navigate('/hair-analysis/success', { state: { fromSubmission: true }, replace: true });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.submitError
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Save form data to localStorage
      localStorage.setItem('hairAnalysisFormData', JSON.stringify(formData));
      setTimeout(() => {
        // Check if form content is taller than viewport
        if (formRef.current && progressRef.current) {
          const formHeight = formRef.current.scrollHeight;
          const viewportHeight = window.innerHeight;
          const progressTop = progressRef.current.offsetTop;

          if (formHeight > viewportHeight) {
            // Scroll to progress bar with offset
            window.scrollTo({
              top: progressTop - 20,
              behavior: 'smooth'
            });
          } else {
            // If content fits viewport, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 100); // Small delay to ensure DOM is updated
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // If we're on the Previous Transplant Details step and user didn't have previous transplants
      // Skip the Previous Transplant Details step when going back
      if (currentStep === 6 && !formData.previousTransplants) {
        setCurrentStep(4); // Go back to Previous Transplant step
      } else {
        setCurrentStep(prev => prev - 1);
      }
      // Save form data to localStorage
      localStorage.setItem('hairAnalysisFormData', JSON.stringify(formData));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getCurrentStepMessage = () => {
    const stepId = steps[currentStep].id;
    const messages = t.hairAnalysis.doctor.messages;
    const message = messages[stepId as keyof typeof messages];

    // If we're on the Previous Transplant Details step and no message exists,
    // use the previous transplant message
    if (stepId === 'previousDetails' && !message) {
      return messages.previousDetails;
    }

    // If we're on the Medical History step and no message exists,
    // use the medical message
    if (stepId === 'medical' && !message) {
      return messages.medical;
    }

    return message || '';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <AgeRangeStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <HairLossStep
            formData={formData}
            setFormData={setFormData}
            gender={formData.gender as 'male' | 'female'}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <DurationStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return <PreviousTransplantStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 5:
        return <PreviousTransplantDetailsStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 6:
        return <MedicalHistoryStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 7:
        return (
          <PhotosStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 8:
        return (
          <FinalStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmitSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative">
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        message={message}
        submitterName={formData.firstName ? `${formData.firstName} ${formData.lastName}` : undefined}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/50 py-6 z-10">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:block mb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <img
                  src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png"
                  alt="Yakisikli Hair Clinic"
                  className="h-16 w-auto transition-transform hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-6">
                <a href="tel:+905360344866" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.header.contact.phone}</span>
                </a>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com/yakisiklihairclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://facebook.com/yakisiklihairclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="https://youtube.com/yakisiklihairclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:info@yakisiklihairclinic.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/902122427171"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-px bg-border" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-8 h-8 hover:bg-black/5 dark:hover:bg-white/5"
                    onClick={toggleTheme}
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
                    <Moon className="h-4 w-4 rotate-90 scale-0 transition-all absolute dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                  <div className="h-4 w-px bg-border" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-2">
                      <span className="text-lg">{currentLocale.flag}</span>
                      <span className="text-sm font-medium">{currentLocale.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    {locales.map((locale) => (
                      <DropdownMenuItem
                        key={locale.code}
                        onClick={() => setCurrentLocale(locale)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-base">{locale.flag}</span>
                        <span className="text-sm">{locale.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden space-y-4 relative z-20">
            <div className="flex items-center justify-between">
              <img
                src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png"
                alt="Yakisikli Hair Clinic"
                className="h-10 w-auto"
              />
              <div className="flex items-center gap-3">
                <a href="tel:+905360344866" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  onClick={toggleTheme}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all absolute text-primary dark:-rotate-90 dark:scale-0" />
                  <Moon className="h-4 w-4 rotate-90 scale-0 transition-all absolute text-primary dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <span className="text-lg">{currentLocale.flag}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    {locales.map((locale) => (
                      <DropdownMenuItem
                        key={locale.code}
                        onClick={() => setCurrentLocale(locale)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="text-base">{locale.flag}</span>
                        <span className="text-sm">{locale.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <a href="https://instagram.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a href="https://facebook.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-4 w-4 text-primary" />
              </a>
              <a href="https://youtube.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Youtube className="h-4 w-4 text-primary" />
              </a>
              <a href="https://wa.me/902122427171" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mt-12 md:mt-6 pb-6 relative z-10">
        {currentStep === 0 && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl !leading-[1.2] font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent dark:from-primary dark:via-secondary dark:to-secondary mb-3 dark:drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              {t.hairAnalysis.title}
            </h1>
            <p className="text-base text-muted-foreground dark:text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.hairAnalysis.description}
            </p>
          </>
        )}
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 sm:py-10">
        <ProgressHeader
          ref={progressRef}
          currentStep={currentStep}
          totalSteps={steps.length}
          progress={stepProgress[steps[currentStep].id as keyof typeof stepProgress]}
          onBack={handlePrevious}
          onNext={handleNext}
          title={getStepConfig(steps[currentStep].id).title}
          description={getStepConfig(steps[currentStep].id).description}
        />

        <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-4 sm:space-y-6 mb-8">
            {renderStep()}
          </div>

          <DoctorFeedback
            message={getCurrentStepMessage()}
            doctorInfo={doctorInfo}
          />
        </form>
      </div>

      {/* Success Stories Modal */}
      <SuccessStoriesModal
        isOpen={showSuccessStories}
        onClose={() => setShowSuccessStories(false)}
        stories={matchingStories}
        pattern={selectedPattern}
      />
    </div>
  );
}

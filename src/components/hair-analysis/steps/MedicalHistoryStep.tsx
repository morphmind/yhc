import React from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { AlertTriangle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MedicalHistoryStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface MedicalQuestion {
  id: string;
  title: string;
  answer: boolean | null;
  details?: string;
}

export function MedicalHistoryStep({ formData, setFormData, onNext }: MedicalHistoryStepProps) {
  const { t } = useTranslation();
  const [questions, setQuestions] = React.useState<MedicalQuestion[]>([
    { id: 'allergies', title: t.hairAnalysis.steps.medical.allergies.title, answer: null },
    { id: 'conditions', title: t.hairAnalysis.steps.medical.conditions.title, answer: null },
    { id: 'medications', title: t.hairAnalysis.steps.medical.medications.title, answer: null },
  ]);
  const [hoveredQuestion, setHoveredQuestion] = React.useState<string | null>(null);

  const handleAnswer = (id: string, answer: boolean) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, answer, details: answer ? q.details : '' } : q
    ));
    
    if (answer) {
      setTimeout(() => {
        document.querySelector(`#${id}-details`)?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  };

  const handleDetails = (id: string, details: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, details } : q
    ));
  };

  const handleSubmit = () => {
    setFormData({
      ...formData,
      medicalConditions: [questions.find(q => q.id === 'conditions')?.details || ''],
      medications: [questions.find(q => q.id === 'medications')?.details || ''],
      allergies: [questions.find(q => q.id === 'allergies')?.details || ''],
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div 
          key={question.id}
          onMouseEnter={() => setHoveredQuestion(question.id)}
          onMouseLeave={() => setHoveredQuestion(null)}
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
            question.answer !== null
              ? 'bg-white/80 dark:bg-white/5'
              : 'bg-background'
          } backdrop-blur-md p-6 sm:p-8 border border-border/50 ${
            hoveredQuestion === question.id
              ? 'shadow-lg scale-[1.02]'
              : 'hover:shadow-md hover:scale-[1.01]'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />
          
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
            hoveredQuestion === question.id ? 'opacity-10' : ''
          } ${
            question.answer === true
              ? 'from-green-500/20 to-emerald-500/20'
              : question.answer === false
              ? 'from-red-500/20 to-pink-500/20'
              : 'from-primary/20 to-secondary/20'
          }`} />

          <div className="relative">
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${
                  question.answer === true
                    ? 'text-green-500'
                    : question.answer === false
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`} />
                <h3 className="text-lg font-semibold text-foreground dark:text-white">
                  {question.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  ({t.hairAnalysis.steps.medical.optional})
                </span>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  type="button"
                  variant={question.answer === true ? "default" : "outline"}
                  className={`flex-1 sm:w-24 group ${
                    question.answer === true
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : ''
                  }`}
                  onClick={() => handleAnswer(question.id, true)}
                >
                  <Check className={`w-4 h-4 mr-2 transition-transform group-hover:scale-110 ${
                    question.answer === true ? '' : 'text-green-500'
                  }`} />
                  {t.hairAnalysis.steps.medical.buttons.yes}
                </Button>
                <Button
                  type="button"
                  variant={question.answer === false ? "default" : "outline"}
                  className={`flex-1 sm:w-24 group ${
                    question.answer === false
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : ''
                  }`}
                  onClick={() => handleAnswer(question.id, false)}
                >
                  <X className={`w-4 h-4 mr-2 transition-transform group-hover:scale-110 ${
                    question.answer === false ? '' : 'text-red-500'
                  }`} />
                  {t.hairAnalysis.steps.medical.buttons.no}
                </Button>
              </div>
            </div>

            {/* Details Textarea */}
            {question.answer && (
              <div className="mt-4 space-y-2">
                <Textarea
                  id={`${question.id}-details`}
                  value={question.details || ''}
                  onChange={(e) => handleDetails(question.id, e.target.value)}
                  placeholder={t.hairAnalysis.steps.medical[question.id as keyof typeof t.hairAnalysis.steps.medical].placeholder}
                  className="min-h-[100px] bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50"
                />
              </div>
            )}
          </div>
        </div>
      ))}

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
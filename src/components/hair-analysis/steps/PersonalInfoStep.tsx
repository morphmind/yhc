import React, { useEffect } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PersonalInfoStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

export function PersonalInfoStep({ formData, setFormData, onNext }: PersonalInfoStepProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Male Option */}
      <div 
        onClick={() => {
          setFormData({ ...formData, gender: 'male' });
          onNext();
        }}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
          formData.gender === 'male' 
            ? 'ring-2 ring-primary shadow-xl' 
            : 'hover:shadow-lg'
        }`}
      >
        {/* Background Image */}
        <img 
          src="https://glokalizm.com/yakisikli/img/men-hair-loss.png"
          alt="Male pattern hair loss"
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">
                {t.hairAnalysis.steps.personal.options.male}
              </h3>
              {/* Selection Indicator */}
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                formData.gender === 'male'
                  ? 'bg-primary border-primary shadow-glow'
                  : 'border-white/50'
              }`} />
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent" />
          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
      </div>
      
      {/* Female Option */}
      <div
        onClick={() => {
          setFormData({ ...formData, gender: 'female' });
          onNext();
        }}
        className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
          formData.gender === 'female'
            ? 'ring-2 ring-primary shadow-xl'
            : 'hover:shadow-lg'
        }`}
      >
        {/* Background Image */}
        <img
          src="https://glokalizm.com/yakisikli/img/women-hair-loss.png"
          alt="Female pattern hair loss"
          className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">
                {t.hairAnalysis.steps.personal.options.female}
              </h3>
              {/* Selection Indicator */}
              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                formData.gender === 'female'
                  ? 'bg-primary border-primary shadow-glow'
                  : 'border-white/50'
              }`} />
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent" />
          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}
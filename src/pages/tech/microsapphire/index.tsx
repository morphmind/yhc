import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { ContentSection } from './components/ContentSection';
import { CTASection } from './components/CTASection';

export default function MicroSapphirePage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();

  // Update meta tags
  React.useEffect(() => {
    document.title = t.microsapphire.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.microsapphire.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.microsapphire.meta.keywords);
  }, [t.microsapphire.meta]);

  const handleAnalysisClick = () => window.location.href = '/hair-analysis';
  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      <HeroSection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <ContentSection />

      <CTASection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
      />
    </div>
  );
}
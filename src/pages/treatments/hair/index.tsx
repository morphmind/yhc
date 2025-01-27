import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { MobileContentNavigation } from './components/MobileContentNavigation';
import { TabNavigation } from './components/TabNavigation';
import { TabContent } from './components/TabContent';
import { MobileOverviewContent } from './components/MobileOverviewContent';
import { MobileTechniquesContent } from './components/MobileTechniquesContent';
import { MobileBenefitsContent } from './components/MobileBenefitsContent';
import { MobileRecoveryContent } from './components/MobileRecoveryContent';
import { HeroSection } from './components/HeroSection';
import { MobileCTASection } from './components/MobileCTASection';
import { DesktopCTASection } from './components/DesktopCTASection';

export default function HairTransplantPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [activeTab, setActiveTab] = React.useState('overview');

  // Update meta tags
  React.useEffect(() => {
    document.title = t.hairTransplant.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.hairTransplant.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.hairTransplant.meta.keywords);
  }, [t.hairTransplant.meta]);

  const handleAnalysisClick = () => window.location.href = '/hair-analysis';
  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      <HeroSection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      {/* Content Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="lg:hidden">
            <MobileContentNavigation
              activeSection={activeTab}
              onSectionChange={setActiveTab}
            />
          </div>
          <div className="hidden lg:block">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content */}
          <div className="lg:hidden">
            {activeTab === 'overview' && <MobileOverviewContent />}
            {activeTab === 'techniques' && <MobileTechniquesContent />}
            {activeTab === 'benefits' && <MobileBenefitsContent />}
            {activeTab === 'recovery' && <MobileRecoveryContent />}
          </div>
          <div className="hidden lg:block">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="lg:hidden">
        <MobileCTASection onAnalysisClick={handleAnalysisClick} onWhatsAppClick={handleWhatsAppClick} onCallClick={handleCallClick} />
      </div>
      <div className="hidden lg:block">
        <DesktopCTASection onAnalysisClick={handleAnalysisClick} onWhatsAppClick={handleWhatsAppClick} onCallClick={handleCallClick} />
      </div>
    </div>
  );
}
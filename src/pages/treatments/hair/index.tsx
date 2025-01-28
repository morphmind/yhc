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
import { Stethoscope, Microscope, Heart, Shield } from 'lucide-react';

export default function HairTransplantPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [activeSection, setActiveSection] = React.useState('overview');

  // Navigation sections
  const navigationSections = React.useMemo(() => [
    { id: 'overview', icon: Stethoscope, label: t.hairTransplant.overview.title },
    { id: 'techniques', icon: Microscope, label: t.hairTransplant.techniques.title },
    { id: 'benefits', icon: Heart, label: t.hairTransplant.benefits.title },
    { id: 'recovery', icon: Shield, label: t.hairTransplant.recovery.title }
  ], [t.hairTransplant]);

  // Get all sections
  const sections = ['overview', 'techniques', 'benefits', 'recovery'];

  // Intersection Observer for sections
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update if section is more than 50% visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -80px 0px' // Account for header
      }
    );

    // Observe sections
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    sectionElements.forEach(section => observer.observe(section!));

    return () => {
      sectionElements.forEach(section => observer.unobserve(section!));
    };
  }, [sections]);

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 88; // Header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
          {/* Hide scroll text on mobile */}
          <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-foreground/60 dark:text-white/60">
            {t.hairTransplant.hero.scrollText}
          </div>
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
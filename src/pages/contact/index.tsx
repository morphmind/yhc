import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { ContactSection } from './components/ContactSection';
import { MapSection } from './components/MapSection';
import { FixedNavigation } from './components/FixedNavigation';
import { DesktopPageNavigation } from '@/components/layout/DesktopPageNavigation';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [activeSection, setActiveSection] = React.useState('info');

  // Navigation sections
  const navigationSections = React.useMemo(() => [
    { id: 'info', icon: Phone, label: t.contact.hero.navigation.info },
    { id: 'form', icon: MessageCircle, label: t.contact.hero.navigation.form },
    { id: 'map', icon: MapPin, label: t.contact.hero.navigation.map }
  ], [t.contact.hero.navigation]);

  // Get all sections
  const sections = ['info', 'form', 'map'];

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
        rootMargin: '-80px 0px -80px 0px' // Account for header and bottom nav
      }
    );

    // Observe sections
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    sectionElements.forEach(section => observer.observe(section!));

    return () => {
      sectionElements.forEach(section => observer.unobserve(section!));
    };
  }, [sections]);

  // Calculate header height for offset
  const headerHeight = React.useMemo(() => {
    // 72px for mobile, 88px for desktop
    return window.innerWidth >= 768 ? 88 : 72;
  }, []);

  // Calculate bottom navigation height for mobile
  const bottomNavHeight = React.useMemo(() => {
    // 80px for mobile bottom nav
    return window.innerWidth >= 1024 ? 0 : 80;
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = headerHeight + 24; // Add some padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Update active section when clicking navigation
  const handleSectionClick = (sectionId: string) => {
    // First update active section
    setActiveSection(sectionId);

    // Then scroll to section
    handleSectionChange(sectionId);

    // Re-check active section after scroll animation completes
    setTimeout(() => {
      setActiveSection(sectionId);
    }, 1000);
  };

  // Update meta tags
  React.useEffect(() => {
    document.title = t.contact.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.contact.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.contact.meta.keywords);
  }, [t.contact.meta]);

  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');
  const handleScheduleClick = () => window.location.href = '/hair-analysis';

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
        style={{ paddingBottom: bottomNavHeight }} // Dynamic padding for mobile navigation
      />
      
      <HeroSection 
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
        onScheduleClick={handleScheduleClick}
      />

      <ContactSection />

      <MapSection />

      <FixedNavigation
        sections={navigationSections}
        activeSection={activeSection} 
        onSectionChange={handleSectionClick} 
      />

      <DesktopPageNavigation
        sections={navigationSections}
        activeSection={activeSection}
        onSectionChange={handleSectionClick}
        position="left"
      />
    </div>
  );
}
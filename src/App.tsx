import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import AdminPanel from './pages/admin/panel';
import AnalysisSuccess from './pages/hair-analysis/success';
import MicroSapphirePage from './pages/tech/microsapphire';
import EyebrowTransplantPage from './pages/treatments/eyebrow';
import BeardTransplantPage from './pages/treatments/beard';
import HairTransplantPage from './pages/treatments/hair';
import AfroHairTransplantPage from './pages/treatments/afro';
import WomenHairTransplantPage from './pages/treatments/women';
import ContactPage from './pages/contact';
import DoctorPage from './pages/doctor';
import ClinicPage from './pages/clinic';
import Header from './components/layout/Header';
import HairAnalysis from './pages/hair-analysis';
import { LocaleProvider } from './contexts/LocaleContext';
import { Currency } from './types';
import { useCurrency } from './hooks/useCurrency';
import { HeroSection } from './components/sections/HeroSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { TreatmentsSection } from './components/sections/TreatmentsSection';
import { PriceCalculator } from './components/sections/PriceCalculator';
import { PatientExperienceSection } from './components/sections/PatientExperienceSection';
import { GallerySection } from './components/sections/GallerySection';
import { SectionDivider } from './components/ui/section-divider';
import { Toaster } from './components/ui/toaster';
import { useTheme } from './hooks/useTheme';
import { LocaleContext } from './contexts/LocaleContext';
import { getLocalizedSEO, updateMetaTags } from './utils/seo';
import { DesktopPageNavigation } from './components/layout/DesktopPageNavigation';
import { Star, Sparkles, ImagePlus, Calculator, HeartHandshake } from 'lucide-react';

function App() {
  const { selectedCurrency, updateCurrency } = useCurrency();
  const { theme } = useTheme();
  const { currentLocale } = useContext(LocaleContext);
  const [activeSection, setActiveSection] = React.useState('hero');

  // Navigation sections
  const navigationSections = React.useMemo(() => [
    { id: 'hero', icon: Star, label: 'Overview' },
    { id: 'why-us', icon: Sparkles, label: 'Why Us' },
    { id: 'treatments', icon: HeartHandshake, label: 'Treatments' },
    { id: 'gallery', icon: ImagePlus, label: 'Gallery' },
    { id: 'pricing', icon: Calculator, label: 'Pricing' },
    { id: 'experience', icon: HeartHandshake, label: 'Experience' }
  ], []);

  // Get all sections
  const sections = ['hero', 'why-us', 'treatments', 'gallery', 'pricing', 'experience'];

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

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Update meta tags when language changes
  useEffect(() => {
    const seoConfig = getLocalizedSEO(currentLocale);
    updateMetaTags(seoConfig);
  }, [currentLocale]);

  return (
    <LocaleProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/hair-analysis" element={<HairAnalysis />} />
            <Route path="/hair-analysis/success" element={<AnalysisSuccess />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/technologies/micro-sapphire" element={<MicroSapphirePage />} />
            <Route path="/treatments/hair" element={<HairTransplantPage />} />
            <Route path="/treatments/eyebrow" element={<EyebrowTransplantPage />} />
            <Route path="/treatments/beard" element={<BeardTransplantPage />} />
            <Route path="/treatments/afro" element={<AfroHairTransplantPage />} />
            <Route path="/treatments/women" element={<WomenHairTransplantPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dr-mustafa-yakisikli" element={<DoctorPage />} />
            <Route path="/clinic" element={<ClinicPage />} />
            <Route path="/admin/panel" element={<AdminPanel />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={
              <div className="min-h-screen bg-background relative">
                <Header
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={updateCurrency}
                />
                <div id="hero">
                  <HeroSection />
                </div>
                <SectionDivider pattern="waves" />
                <div id="why-us">
                  <WhyUsSection />
                </div>
                <SectionDivider pattern="dots" />
                <div id="treatments">
                  <TreatmentsSection />
                </div>
                <SectionDivider pattern="waves" />
                <div id="gallery">
                  <GallerySection />
                </div>
                <SectionDivider pattern="waves" />
                <div id="pricing">
                  <PriceCalculator />
                </div>
                <SectionDivider pattern="waves" />
                <div id="experience">
                  <PatientExperienceSection />
                </div>
                <DesktopPageNavigation
                  sections={navigationSections}
                  activeSection={activeSection}
                  onSectionChange={handleSectionChange}
                  position="left"
                />
              </div>
            } />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </LocaleProvider>
  );
}

export default App;
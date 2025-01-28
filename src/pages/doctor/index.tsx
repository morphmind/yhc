import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { DesktopPageNavigation } from '@/components/layout/DesktopPageNavigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Award,
  Stethoscope,
  Code,
  MessageCircle,
  Calendar,
  Phone,
} from 'lucide-react';

export default function DoctorPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [activeSection, setActiveSection] = React.useState('bio');

  // Navigasyon bölümleri
  const navigationSections = React.useMemo(() => [
    { id: 'bio', icon: Stethoscope, label: t.doctor.title },
    { id: 'education', icon: GraduationCap, label: t.doctor.achievements.education.title },
    { id: 'experience', icon: Award, label: t.doctor.achievements.experience.title },
    { id: 'research', icon: Code, label: t.doctor.achievements.research.title },
  ], [t.doctor]);

  // Tüm bölümler
  const sections = ['bio', 'education', 'experience', 'research'];

  // Intersection Observer ile bölümlerin görünürlüğünü izleme
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Sadece bölüm %50'den fazla görünürse güncelle
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -80px 0px' // Header yüksekliğini hesaba kat
      }
    );

    // Bölümleri gözlemle
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    sectionElements.forEach(section => observer.observe(section!));

    return () => {
      sectionElements.forEach(section => observer.unobserve(section!));
    };
  }, [sections]);

  // Bölüm değişikliğini ele alma
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 88; // Header yüksekliği
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Meta etiketlerini güncelleme
  React.useEffect(() => {
    document.title = t.doctor.meta?.title || t.doctor.title;
  }, [t.doctor]);

  // CTA butonlarının işlevleri
  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');
  const handleScheduleClick = () => window.location.href = '/hair-analysis';

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />

      <DesktopPageNavigation
        sections={navigationSections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        position="left"
      />

      {/* Bio Bölümü */}
      <section id="bio" className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Metin İçeriği */}
            <div className="relative space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold !leading-[1.2] tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  {t.doctor.name}
                </span>
                <span className="block mt-2 text-foreground dark:text-white text-[0.85em]">
                  {t.doctor.title}
                </span>
              </h1>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.doctor.description}
              </p>
              <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
                {t.doctor.bio}
              </p>
            </div>

            {/* Doktor Görseli */}
            <div className="relative mt-8 sm:mt-10 lg:mt-0 z-[1]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-3xl transform rotate-3 blur-sm" />
              <img
                src="https://glokalizm.com/yakisikli/img/dryakisikli/dryakisikli.jpeg"
                alt="Dr. Mustafa Yakışıklı"
                className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eğitim Bölümü */}
      <section id="education" className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{t.doctor.achievements.education.title}</h2>
            <div className="space-y-6">
              {JSON.parse(t.doctor.achievements.education.items).map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary dark:text-white" />
                  </div>
                  <p className="text-lg text-foreground/80 dark:text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deneyim Bölümü */}
      <section id="experience" className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{t.doctor.achievements.experience.title}</h2>
            <div className="space-y-6">
              {JSON.parse(t.doctor.achievements.experience.items).map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary dark:text-white" />
                  </div>
                  <p className="text-lg text-foreground/80 dark:text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Araştırma Bölümü */}
      <section id="research" className="relative py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{t.doctor.achievements.research.title}</h2>
            <div className="space-y-6">
              {JSON.parse(t.doctor.achievements.research.items).map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-primary dark:text-white" />
                  </div>
                  <p className="text-lg text-foreground/80 dark:text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="relative py-24 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-8 sm:p-12">
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative text-center space-y-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white">
                  {t.doctor.cta.title}
                </h3>
                <p className="text-lg text-foreground/60 dark:text-white/60 max-w-2xl mx-auto">
                  {t.doctor.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-10 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={handleScheduleClick}
                  >
                    <Calendar className="w-4 h-4" />
                    {t.doctor.cta.consultation}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.doctor.cta.whatsapp}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={handleCallClick}
                  >
                    <Phone className="w-4 h-4" />
                    {t.doctor.cta.call}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

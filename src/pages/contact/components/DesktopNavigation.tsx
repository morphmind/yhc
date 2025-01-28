import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

interface DesktopNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DesktopNavigation({ activeSection, onSectionChange }: DesktopNavigationProps) {
  const { t } = useTranslation();

  // Bölüm ID'lerinin DOM'daki ID'lerle tam olarak eşleştiğinden emin olun
  const sections = [
    { id: 'contact-info', icon: Phone, label: t.contact.hero.navigation.info },
    { id: 'contact-form', icon: MessageCircle, label: t.contact.hero.navigation.form },
    { id: 'contact-map', icon: MapPin, label: t.contact.hero.navigation.map }
  ];

  const handleSectionClick = (sectionId: string) => {
    // 'contact-' ön ekini kaldırarak temel bölüm ID'sini elde edin
    const baseSectionId = sectionId.replace('contact-', '');

    // Aktif bölümü güncelleyin
    onSectionChange(baseSectionId);

    // Bölüme kaydırma yapın
    const element = document.getElementById(baseSectionId);
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

  return (
    <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
      {/* Navigasyon Kartı */}
      <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.12)] p-3">
        <div className="flex flex-col gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "group relative w-48 p-3 rounded-xl transition-all duration-300",
                "hover:bg-black/5 dark:hover:bg-white/5",
                activeSection === section.id.replace('contact-', '') && "bg-primary/10 dark:bg-white/10"
              )}
            >
              {/* Aktif Göstergesi */}
              {activeSection === section.id.replace('contact-', '') && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary dark:bg-white rounded-r-full" />
              )}

              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  "bg-white dark:bg-white/10",
                  "shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.08)]",
                  "transition-all duration-300",
                  "group-hover:scale-110"
                )}>
                  <section.icon className={cn(
                    "w-5 h-5 transition-colors",
                    activeSection === section.id.replace('contact-', '') ? "text-primary dark:text-white" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "font-medium transition-colors",
                  activeSection === section.id.replace('contact-', '') ? "text-primary dark:text-white" : "text-muted-foreground"
                )}>
                  {section.label}
                </span>
              </div>

              {/* Alt Vurgulama */}
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-px",
                "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
                "transform scale-x-0 group-hover:scale-x-100",
                "transition-transform duration-500"
              )} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

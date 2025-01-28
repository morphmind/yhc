import React from 'react';
import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react'; // Doğru ikon tipi

interface NavigationSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>; // Genel ikon türü
  label: string;
}

interface DesktopPageNavigationProps {
  sections: NavigationSection[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  position?: 'left' | 'right';
}

export function DesktopPageNavigation({
  sections,
  activeSection,
  onSectionChange,
  position = 'left',
}: DesktopPageNavigationProps) {
  const handleSectionClick = (sectionId: string) => {
    // Aktif bölümü güncelle
    onSectionChange(sectionId);

    // Bölüme kaydırma yap
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

  return (
    <div className={cn(
      "hidden lg:block fixed z-50",
      "top-[50vh] -translate-y-1/2",
      position === 'left' ? "left-0" : "right-0",
      "pointer-events-none"
    )}>
      {/* Navigasyon Konteyneri */}
      <div className={cn(
        "relative flex flex-col gap-3",
        "p-2 rounded-r-2xl",
        "bg-white/30 dark:bg-black/30",
        "backdrop-blur-lg",
        "border border-black/[0.08] dark:border-white/[0.08]",
        position === 'left' ? "border-l-0" : "border-r-0",
        "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_24px_-4px_rgba(255,255,255,0.1)]",
        "transition-transform duration-500",
        "pointer-events-auto",
        "hover:bg-white/50 dark:hover:bg-black/50"
      )}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={cn(
              "group relative",
              "w-10 h-10",
              "flex items-center gap-3",
              "rounded-xl",
              "transition-all duration-300",
              "hover:bg-black/5 dark:hover:bg-white/5",
              activeSection === section.id && "bg-primary/10 dark:bg-white/10"
            )}
          >
            {/* Aktif Göstergesi */}
            {activeSection === section.id && (
              <div className={cn(
                "absolute w-1 h-6",
                "bg-gradient-to-b from-primary via-primary to-primary/50",
                "dark:from-white dark:via-white dark:to-white/50",
                "rounded-full",
                position === 'left' ? "left-0" : "right-0",
                "transition-all duration-300",
                "animate-pulse"
              )} />
            )}

            {/* İkon Konteyneri */}
            <div className={cn(
              "w-10 h-10 rounded-xl flex-shrink-0",
              "flex items-center justify-center",
              "transition-all duration-300",
              activeSection === section.id && "bg-primary/10 dark:bg-white/10"
            )}>
              <section.icon className={cn(
                "w-4 h-4",
                "transition-colors duration-300",
                activeSection === section.id
                  ? "text-primary dark:text-white"
                  : "text-muted-foreground"
              )} />
            </div>

            {/* Tooltip */}
            <div className={cn(
              "absolute left-full ml-2 px-3 py-1.5",
              "bg-white/90 dark:bg-black/90 backdrop-blur-md",
              "border border-black/[0.08] dark:border-white/[0.08]",
              "rounded-lg shadow-lg",
              "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
              "transition-all duration-300",
              "whitespace-nowrap text-sm",
              "z-50",
              "pointer-events-none"
            )}>
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-l border-t border-black/[0.08] dark:border-white/[0.08]" />
              {section.label}
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
  );
}

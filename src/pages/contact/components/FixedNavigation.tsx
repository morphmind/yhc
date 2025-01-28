import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

interface FixedNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function FixedNavigation({ activeSection, onSectionChange }: FixedNavigationProps) {
  const { t } = useTranslation();

  const sections = [
    { id: 'info', icon: Phone, label: t.contact.hero.navigation.info },
    { id: 'form', icon: MessageCircle, label: t.contact.hero.navigation.form },
    { id: 'map', icon: MapPin, label: t.contact.hero.navigation.map }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent -top-12" />
      
      {/* Navigation Bar */}
      <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-black/[0.08] dark:border-white/[0.08] px-4 py-2">
        <div className="flex items-center justify-around">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                "hover:bg-black/5 dark:hover:bg-white/5",
                activeSection === section.id && "text-primary dark:text-white"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                "transition-all duration-300",
                activeSection === section.id ? "bg-primary/10 dark:bg-white/10" : "bg-transparent"
              )}>
                <section.icon className={cn(
                  "w-5 h-5 transition-colors",
                  activeSection === section.id ? "text-primary dark:text-white" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium transition-colors",
                activeSection === section.id ? "text-primary dark:text-white" : "text-muted-foreground"
              )}>
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
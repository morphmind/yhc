import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Stethoscope, Microscope, Heart, Shield, ChevronRight } from 'lucide-react';

interface MobileContentNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function MobileContentNavigation({ activeSection, onSectionChange }: MobileContentNavigationProps) {
  const { t } = useTranslation();

  const sections = [
    { 
      id: 'overview', 
      icon: Stethoscope, 
      label: t.hairTransplant.overview.title,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
    { 
      id: 'techniques', 
      icon: Microscope, 
      label: t.hairTransplant.techniques.title,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-500'
    },
    { 
      id: 'benefits', 
      icon: Heart, 
      label: t.hairTransplant.benefits.title,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    { 
      id: 'recovery', 
      icon: Shield, 
      label: t.hairTransplant.recovery.title,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500'
    }
  ];

  return (
    <div className="lg:hidden space-y-2 mb-6">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "w-full group relative overflow-hidden rounded-xl transition-all duration-300",
            "bg-white/80 dark:bg-white/5 backdrop-blur-md",
            "border border-black/[0.08] dark:border-white/[0.08]",
            "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
            activeSection === section.id ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
          )}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br",
                section.gradient,
                "transition-colors"
              )}>
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-base text-foreground dark:text-white">
                {section.label}
              </span>
            </div>
            <ChevronRight className={cn(
              "w-5 h-5 text-foreground/60 dark:text-white/60 transition-transform",
              activeSection === section.id ? "rotate-90" : "group-hover:translate-x-1"
            )} />
          </div>

          {/* Active Indicator */}
          {activeSection === section.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          )}
        </button>
      ))}
    </div>
  );
}
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Stethoscope, Microscope, Heart, Shield } from 'lucide-react';

interface MobileTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const gradients = {
  overview: 'from-emerald-500/20 to-green-500/20',
  techniques: 'from-blue-500/20 to-indigo-500/20',
  benefits: 'from-purple-500/20 to-pink-500/20',
  recovery: 'from-amber-500/20 to-orange-500/20'
};

export function MobileTabNavigation({ activeTab, onTabChange }: MobileTabNavigationProps) {
  const { t } = useTranslation();

  const tabs = [
    { id: 'overview', icon: Stethoscope, label: t.hairTransplant.overview.title },
    { id: 'techniques', icon: Microscope, label: t.hairTransplant.techniques.title },
    { id: 'benefits', icon: Heart, label: t.hairTransplant.benefits.title },
    { id: 'recovery', icon: Shield, label: t.hairTransplant.recovery.title }
  ];

  return (
    <div className="lg:hidden sticky top-[72px] z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 -mx-4 px-4 mb-8">
      <div className="flex overflow-x-auto gap-2 py-3 no-scrollbar">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-shrink-0 h-12 gap-2 rounded-xl px-4",
              "border border-black/[0.08] dark:border-white/[0.08]",
              "transition-all duration-300",
              activeTab === tab.id ? cn(
                "bg-gradient-to-br",
                gradients[tab.id as keyof typeof gradients],
                "text-white border-transparent",
                "shadow-lg"
              ) : "hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center",
              "bg-white/20 dark:bg-white/10",
              "transition-colors"
            )}>
              <tab.icon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium whitespace-nowrap">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Stethoscope, Microscope, Heart, Shield, ChevronRight } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const gradients = {
  overview: 'from-emerald-500/20 to-green-500/20',
  techniques: 'from-blue-500/20 to-indigo-500/20',
  benefits: 'from-purple-500/20 to-pink-500/20',
  recovery: 'from-amber-500/20 to-orange-500/20'
};

const iconColors = {
  overview: 'text-emerald-500',
  techniques: 'text-blue-500',
  benefits: 'text-purple-500',
  recovery: 'text-amber-500'
};

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { t } = useTranslation();
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const tabs = [
    { id: 'overview', icon: Stethoscope, label: t.hairTransplant.overview.title },
    { id: 'techniques', icon: Microscope, label: t.hairTransplant.techniques.title },
    { id: 'benefits', icon: Heart, label: t.hairTransplant.benefits.title },
    { id: 'recovery', icon: Shield, label: t.hairTransplant.recovery.title }
  ];

  return (
    <div className="mb-12">
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden">
        <div className="relative">
          {/* Current Tab Button */}
          <Button
            variant="outline"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={cn(
              "w-full h-14 px-6 gap-3 rounded-2xl",
              "bg-white/80 dark:bg-white/5 backdrop-blur-md",
              "border border-black/[0.08] dark:border-white/[0.08]",
              "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
              "transition-all duration-300",
              showMobileMenu ? "rounded-b-none" : ""
            )}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {tabs.find(tab => tab.id === activeTab)?.icon && (
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center",
                    "bg-gradient-to-br",
                    gradients[activeTab as keyof typeof gradients],
                  )}>
                    {React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, {
                      className: "w-4 h-4 text-white"
                    })}
                  </div>
                )}
                <span className="font-medium text-base">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </span>
              </div>
              <ChevronRight className={cn(
                "w-5 h-5 transition-transform",
                showMobileMenu ? "rotate-90" : ""
              )} />
            </div>
          </Button>

          {/* Mobile Menu */}
          <div className={cn(
            "absolute left-0 right-0 z-50 overflow-hidden transition-all duration-300",
            "bg-white/80 dark:bg-white/5 backdrop-blur-md",
            "border-x border-b border-black/[0.08] dark:border-white/[0.08]",
            "rounded-b-2xl shadow-lg",
            showMobileMenu ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className="p-2">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => {
                    onTabChange(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={cn(
                    "w-full h-12 justify-start gap-3 rounded-xl mb-1 last:mb-0",
                    activeTab === tab.id ? "bg-primary/10 dark:bg-primary/20" : ""
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center",
                    "bg-gradient-to-br",
                    gradients[tab.id as keyof typeof gradients],
                  )}>
                    <tab.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-medium">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden lg:flex justify-center gap-3">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "relative h-12 gap-3 px-6 rounded-full group",
              "bg-white/80 dark:bg-white/5 backdrop-blur-md",
              "border border-black/[0.08] dark:border-white/[0.08]",
              "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
              "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
              "transition-all duration-300 hover:scale-[1.02]",
              activeTab === tab.id ? cn(
                "bg-gradient-to-br",
                gradients[tab.id as keyof typeof gradients],
                "dark:bg-none dark:bg-white border-transparent",
                "text-white dark:text-primary"
              ) : ""
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center",
                "bg-white/20 dark:bg-white/10",
                "transition-colors",
                activeTab === tab.id ? "shadow-glow" : ""
              )}>
                <tab.icon className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  activeTab === tab.id
                    ? "text-white dark:text-primary"
                    : hoveredTab === tab.id
                    ? iconColors[tab.id as keyof typeof iconColors]
                    : "text-primary dark:text-white"
                )} />
              </div>
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight className={cn(
                  "w-4 h-4 ml-1 transition-transform",
                  "text-white dark:text-primary",
                  "group-hover:translate-x-0.5"
                )} />
              )}
            </div>

            {/* Bottom Highlight */}
            <div className={cn(
              "absolute bottom-0 left-0 w-full h-0.5",
              "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
              "transform scale-x-0 group-hover:scale-x-100",
              "transition-transform duration-500"
            )} />
          </Button>
        ))}
      </div>
    </div>
  );
}
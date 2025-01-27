import React, { useContext, useState } from 'react';
import { Globe, Menu, Moon, Sun, ChevronDown, Phone, Mail, MapPin, Coins, Instagram, Facebook, Youtube, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '@/contexts/LocaleContext';
import { locales } from '../../config/locales';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

function getNavigationItems(t: any) {
  return [
    { 
      id: 'about',
      href: '#',
      label: t.header.navigation.about.title,
      children: [
        { id: 'doctor', href: '/dr-mustafa-yakisikli', label: t.header.navigation.about.doctor },
        { id: 'clinic', href: '/clinic', label: t.header.navigation.about.clinic },
      ]
    },
    {
      id: 'hair-transplant',
      href: '#',
      label: t.header.navigation.hairTransplant.title,
      children: [
        {
          id: 'treatments',
          href: '#',
          label: t.header.navigation.hairTransplant.treatments.title,
          children: [
            { id: 'hair', href: '/treatments/hair', label: t.header.navigation.hairTransplant.treatments.hair },
            { id: 'afro', href: '/treatments/afro', label: t.header.navigation.hairTransplant.treatments.afro },
            { id: 'women', href: '#', label: t.header.navigation.hairTransplant.treatments.women },
            { id: 'beard', href: '#', label: t.header.navigation.hairTransplant.treatments.beard },
            { id: 'eyebrow', href: '#', label: t.header.navigation.hairTransplant.treatments.eyebrow },
          ]
        },
        {
          id: 'technologies',
          href: '#',
          label: t.header.navigation.hairTransplant.technologies.title,
          children: [
            { id: 'micro-sapphire', href: '#', label: t.header.navigation.hairTransplant.technologies.microSapphire },
            { id: 'dhi', href: '#', label: t.header.navigation.hairTransplant.technologies.dhi },
            { id: 'sapphire-fue', href: '#', label: t.header.navigation.hairTransplant.technologies.sapphireFue },
            { id: 'needle-free', href: '#', label: t.header.navigation.hairTransplant.technologies.needleFree },
          ]
        },
        {
          id: 'techniques',
          href: '#',
          label: t.header.navigation.hairTransplant.techniques.title,
          children: [
            { id: 'fue', href: '#', label: t.header.navigation.hairTransplant.techniques.fue },
            { id: 'dhi-tech', href: '#', label: t.header.navigation.hairTransplant.techniques.dhi },
          ]
        }
      ]
    },
    {
      id: 'guide',
      href: '#',
      label: t.header.navigation.guide.title,
      children: [
        { id: 'natural', href: '#', label: t.header.navigation.guide.natural },
        { id: 'why', href: '#', label: t.header.navigation.guide.why },
        { id: 'how', href: '#', label: t.header.navigation.guide.how },
      ]
    },
    { id: 'before-after', href: '/before-after', label: t.header.navigation.beforeAfter },
    { id: 'price', href: '/price', label: t.header.navigation.price },
    { id: 'contact', href: '/contact', label: t.header.navigation.contact },
  ];
}

export default function Header({ selectedCurrency, onCurrencyChange }: HeaderProps) {
  const { currentLocale, setCurrentLocale } = useContext(LocaleContext);
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { weather, error } = useWeather();
  const navigationItems = React.useMemo(() => getNavigationItems(t), [t]);
  const availableCurrencies = React.useMemo(() => 
    Array.from(new Set(locales.map(locale => locale.currency.code)))
      .map(code => locales.find(locale => locale.currency.code === code)?.currency)
      .filter((currency): currency is NonNullable<typeof currency> => currency != null),
    []
  );
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 will-change-transform">
      {/* Top Bar */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] md:block hidden">
        <div className="container mx-auto px-4">
          <div className="h-10 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="tel:+902122427171" 
                className="flex items-center gap-2 text-sm font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{t.header.contact.phone}</span>
              </a>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=36.63533942935868,29.128419837434883&destination_place_id=ChIJXXXXXXXXXXXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>{t.header.contact.location}</span>
              </a>

              {!error && weather && (
                <div className="relative group inline-flex">
                  <span className="flex items-center gap-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium cursor-help transition-colors">
                    <span>{weather.icon}</span>
                    <span>{weather.temp}°C</span>
                  </span>
                   
                  {/* Weather Details Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md text-foreground dark:text-white p-3 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.08)] text-xs whitespace-nowrap border border-black/[0.08] dark:border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{weather.icon}</span>
                        <div className="space-y-0.5">
                          <p className="font-medium">{weather.condition}</p>
                          <div className="flex items-center gap-3 text-foreground/60 dark:text-white/60">
                            <span className="flex items-center gap-1">
                              <span>💧</span> {weather.humidity}%
                            </span>
                            <span className="flex items-center gap-1">
                              <span>💨</span> {weather.windSpeed}m/s
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span className="flex items-center gap-1.5">
                        <span className="text-base">{currentLocale.flag}</span>
                        <span>{currentLocale.name}</span>
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/[0.08] dark:border-white/[0.08]">
                  {locales.map((locale) => (
                    <DropdownMenuItem
                      key={locale.code}
                      onClick={() => {
                        setCurrentLocale(locale); 
                        // Update currency when language changes
                        onCurrencyChange(locale.currency);
                      }}
                      className="cursor-pointer flex items-center justify-between px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{locale.flag}</span>
                        <span>{locale.name}</span>
                      </div>
                      <span className="text-foreground/60 dark:text-white/60 text-sm">{locale.currency.symbol}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="h-4 w-px bg-black/[0.08] dark:bg-white/[0.08]" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    <Coins className="h-4 w-4" />
                    <span className="flex items-center gap-1.5">
                      <span>{selectedCurrency?.code || currentLocale.currency.code}</span>
                      <span className="text-foreground/60 dark:text-white/60">{selectedCurrency?.symbol || currentLocale.currency.symbol}</span>
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[140px] bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/[0.08] dark:border-white/[0.08]">
                  {availableCurrencies.map((currency) => (
                    <DropdownMenuItem
                      key={currency.code}
                      onClick={() => onCurrencyChange(currency)}
                      className="flex items-center justify-between px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span>{currency.code}</span>
                      <span className="text-foreground/60 dark:text-white/60">{currency.symbol}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="h-4 w-px bg-black/[0.08] dark:bg-white/[0.08]" />
              
              <Button
                variant="ghost"
                size="icon"
                className="relative w-8 h-8 text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                onClick={toggleTheme}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
                <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Bar */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] relative">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between font-display">
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <img 
              src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png" 
              alt="Yakisikli Hair Clinic"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative group/menu">
                <div className="relative">
                  <a
                    href={item.href}
                    className={cn(
                      "text-sm font-medium tracking-tight",
                      "text-foreground/80 dark:text-white/80",
                      "hover:text-foreground dark:hover:text-white",
                      "transition-all duration-300",
                      "flex items-center gap-1.5",
                      "py-2 px-1",
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
                      "after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent",
                      "after:scale-x-0 hover:after:scale-x-100",
                      "after:transition-transform after:duration-300",
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={cn(
                        "h-4 w-4 opacity-50 transition-transform duration-300",
                        "group-hover/menu:rotate-180"
                      )} />
                    )}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 z-50">
                      <div className="relative bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-[0_16px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_32px_rgba(255,255,255,0.12)] border border-black/[0.08] dark:border-white/[0.08] p-3 min-w-[280px]">
                        {/* Arrow */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/90 dark:bg-black/90 border-l border-t border-black/[0.08] dark:border-white/[0.08]" />
                        {item.children.map((child) => (
                          <div key={child.id} className="relative group/submenu">
                            <a
                              href={child.href}
                              className={cn(
                                "block px-4 py-2.5 text-sm font-medium",
                                "text-foreground/80 dark:text-white/80",
                                "hover:text-foreground dark:hover:text-white",
                                "rounded-xl transition-all duration-300",
                                "hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent",
                                "dark:hover:from-white/10 dark:hover:to-transparent",
                                "flex items-center justify-between"
                              )}
                            >
                              <span>{child.label}</span>
                              {child.children && (
                                <ChevronDown className={cn(
                                  "h-4 w-4 opacity-50 -rotate-90",
                                  "transition-transform duration-300",
                                  "group-hover/submenu:rotate-0"
                                )} />
                              )}
                            </a>
                            {child.children && (
                              <div className="absolute left-full top-0 ml-3 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-300">
                                <div className="relative bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-[0_16px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_32px_rgba(255,255,255,0.12)] border border-black/[0.08] dark:border-white/[0.08] p-3 min-w-[280px]">
                                  {/* Arrow */}
                                  <div className="absolute top-4 -left-2 w-4 h-4 rotate-45 bg-white/90 dark:bg-black/90 border-l border-b border-black/[0.08] dark:border-white/[0.08]" />
                                  {child.children.map((subChild) => (
                                    <a
                                      key={subChild.id}
                                      href={subChild.href}
                                      className={cn(
                                        "block px-4 py-2.5 text-sm",
                                        "text-foreground/60 dark:text-white/60",
                                        "hover:text-foreground dark:hover:text-white",
                                        "rounded-xl transition-all duration-300",
                                        "hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent",
                                        "dark:hover:from-white/10 dark:hover:to-transparent"
                                      )}
                                    >
                                      {subChild.label}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Free Consultation Button */}
            <Link
              to="/hair-analysis"
              className="hidden md:inline-flex group relative isolate"
            >
              <div className={cn(
                "relative flex items-center gap-3",
                "h-12 px-7 text-sm font-medium",
                "text-white dark:text-primary",
                "bg-gradient-to-br from-primary via-primary to-primary/90",
                "dark:from-white dark:via-white dark:to-white/95",
                "rounded-full",
                "shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1),inset_0_-1px_2px_rgba(0,0,0,0.1)]",
                "dark:shadow-[0_2px_8px_-4px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(255,255,255,0.1)]",
                "transition-all duration-500",
                "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.1)]",
                "dark:hover:shadow-[0_12px_32px_-8px_rgba(255,255,255,0.2),0_4px_8px_-2px_rgba(255,255,255,0.1)]",
                "hover:scale-[1.02] active:scale-[0.98]",
                "overflow-hidden",
                "before:absolute before:inset-0",
                "before:bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.4)_5%,rgba(255,255,255,0.2)_15%,rgba(255,255,255,0)_30%)]",
                "before:opacity-0 before:transition-opacity before:duration-500",
                "hover:before:opacity-100",
                "after:absolute after:inset-0",
                "after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
                "after:-translate-x-full after:animate-[shine_3s_ease-in-out_infinite]",
                "group-hover:after:animate-none group-hover:after:translate-x-0",
                "group-hover:bg-gradient-to-br group-hover:from-primary/90 group-hover:via-primary group-hover:to-primary",
                "dark:group-hover:from-white/95 dark:group-hover:via-white dark:group-hover:to-white"
              )}>
                <span className="relative z-10">{t.header.bookConsultation}</span>
                <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-white dark:text-primary transition-all duration-500 group-hover:scale-110" />
                </div>
              </div>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-black/5 dark:hover:bg-white/5">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex flex-col h-full">
                  <SheetTitle className="text-lg font-semibold mb-4">
                    {t.header.navigation.menu}
                  </SheetTitle>
                  
                  <nav className="flex-1 flex flex-col space-y-6">
                  {navigationItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <button
                          onClick={() => {
                            const element = document.getElementById(`submenu-${item.id}`);
                            if (element) {
                              element.classList.toggle('hidden');
                              element.parentElement?.classList.toggle('submenu-open');
                            }
                          }}
                          className={cn(
                            "w-full text-left text-lg font-medium",
                            "text-foreground/80 dark:text-white/80",
                            "transition-colors hover:text-foreground dark:hover:text-white",
                            "relative pl-4",
                            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                            "before:w-2 before:h-2 before:rounded-full",
                            "before:bg-black/[0.08] dark:before:bg-white/[0.08]",
                            "hover:before:bg-primary dark:hover:before:bg-white",
                            "before:transition-colors",
                            "flex items-center justify-between"
                          )}
                        >
                          <span>{item.label}</span>
                          {item.children && <ChevronDown className="w-4 h-4 opacity-50 transition-transform duration-300" />}
                        </button>
                        
                        {item.children && (
                          <div id={`submenu-${item.id}`} className="hidden ml-4 space-y-2 transition-all duration-300">
                            {item.children.map((child) => (
                              <div key={child.id} className="space-y-2">
                                <a
                                  href={child.href}
                                  className={cn(
                                    "block text-base font-medium",
                                    "text-foreground/60 dark:text-white/60",
                                    "hover:text-foreground dark:hover:text-white",
                                    "transition-colors pl-4 relative",
                                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                                    "before:w-1.5 before:h-1.5 before:rounded-full",
                                    "before:bg-black/[0.08] dark:before:bg-white/[0.08]",
                                    "hover:before:bg-primary/50 dark:hover:before:bg-white/50",
                                    "before:transition-colors",
                                    "flex items-center justify-between"
                                  )}
                                >
                                  <span>{child.label}</span>
                                  {child.children && <ChevronDown className="w-4 h-4 opacity-50 -rotate-90" />}
                                </a>
                                {child.children && (
                                  <div className="ml-4 space-y-2 transition-all duration-300">
                                    {child.children.map((subChild) => (
                                      <a
                                        key={subChild.id}
                                        href={subChild.href}
                                        className={cn(
                                          "block text-sm font-normal",
                                          "text-foreground/50 dark:text-white/50",
                                          "hover:text-foreground dark:hover:text-white",
                                          "transition-colors pl-4 relative",
                                          "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                                          "before:w-1 before:h-1 before:rounded-full",
                                          "before:bg-black/[0.08] dark:before:bg-white/[0.08]",
                                          "hover:before:bg-primary/50 dark:hover:before:bg-white/50",
                                          "before:transition-colors"
                                        )}
                                      >
                                        {subChild.label}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                  ))}
                  </nav>
                  
                  {/* Mobile Menu Footer */}
                  <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6 mt-6 space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative w-8 h-8 hover:bg-black/5 dark:hover:bg-white/5"
                        onClick={toggleTheme}
                      >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
                        <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </div>
                    
                    {/* Contact Links */}
                    <div className="space-y-4">
                      <a href="tel:+902122427171" className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors">
                        <Phone className="h-4 w-4" />
                        <span>{t.header.contact.phone}</span>
                      </a>
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=36.63533942935868,29.128419837434883&destination_place_id=ChIJXXXXXXXXXXXXXXXXXXX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>{t.header.contact.location}</span>
                      </a>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                      <a href="https://instagram.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a href="https://facebook.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a href="https://youtube.com/yakisiklihairclinic" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <Youtube className="h-4 w-4" />
                      </a>
                      <a href="https://wa.me/902122427171" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
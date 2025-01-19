import React, { useContext, useState } from 'react';
import { Globe, Menu, Moon, Sun, ChevronDown, Phone, Mail, MapPin, Coins, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '@/contexts/LocaleContext';
import { locales } from '../../config/locales';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/useTranslation';

function getNavigationItems(t: any) {
  return [
    { 
      href: '/about',
      label: t.header.navigation.about.title,
      children: [
        { href: '/about/dr-mustafa-yakisikli', label: t.header.navigation.about.doctor },
        { href: '/about/yakisikli-clinic', label: t.header.navigation.about.clinic },
        { href: '/about/celebrity-hair-transplants', label: t.header.navigation.about.celebrities },
        { href: '/about/certificates-seminars', label: t.header.navigation.about.certificates },
      ]
    },
    {
      href: '/hair-transplant',
      label: t.header.navigation.hairTransplant.title,
      children: [
        {
          href: '/treatments',
          label: t.header.navigation.hairTransplant.treatments.title,
          children: [
            { href: '/treatments/hair-transplant', label: t.header.navigation.hairTransplant.treatments.hair },
            { href: '/treatments/afro-hair-transplant', label: t.header.navigation.hairTransplant.treatments.afro },
            { href: '/treatments/women-hair-transplant', label: t.header.navigation.hairTransplant.treatments.women },
            { href: '/treatments/beard-transplant', label: t.header.navigation.hairTransplant.treatments.beard },
            { href: '/treatments/eyebrow-transplant', label: t.header.navigation.hairTransplant.treatments.eyebrow },
          ]
        },
        {
          href: '/technologies',
          label: t.header.navigation.hairTransplant.technologies.title,
          children: [
            { href: '/technologies/micro-sapphire', label: t.header.navigation.hairTransplant.technologies.microSapphire },
            { href: '/technologies/dhi', label: t.header.navigation.hairTransplant.technologies.dhi },
            { href: '/technologies/sapphire-fue', label: t.header.navigation.hairTransplant.technologies.sapphireFue },
            { href: '/technologies/needle-free', label: t.header.navigation.hairTransplant.technologies.needleFree },
          ]
        },
        {
          href: '/techniques',
          label: t.header.navigation.hairTransplant.techniques.title,
          children: [
            { href: '/techniques/fue', label: t.header.navigation.hairTransplant.techniques.fue },
            { href: '/techniques/dhi', label: t.header.navigation.hairTransplant.techniques.dhi },
          ]
        }
      ]
    },
    {
      href: '/guide',
      label: t.header.navigation.guide.title,
      children: [
        { href: '/guide/natural-hair-transplant', label: t.header.navigation.guide.natural },
        { href: '/guide/why-hair-transplant', label: t.header.navigation.guide.why },
        { href: '/guide/how-to-perform', label: t.header.navigation.guide.how },
      ]
    },
    { href: '/before-after', label: t.header.navigation.beforeAfter },
    { href: '/price', label: t.header.navigation.price },
    { href: '/blog', label: t.header.navigation.blog },
    { href: '/contact', label: t.header.navigation.contact },
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
        {/* Mobile Top Bar */}
        <div className="h-12 border-b border-black/[0.08] dark:border-white/[0.08] md:hidden">
          <div className="container mx-auto px-4 h-full">
            <div className="flex items-center justify-between h-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-black/5 dark:hover:bg-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currentLocale.flag}</span>
                      <span className="text-sm">{currentLocale.currency.code}</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] bg-white/80 dark:bg-black/80 backdrop-blur-md border-black/[0.08] dark:border-white/[0.08]">
                  {locales.map((locale) => (
                    <DropdownMenuItem
                      key={locale.code}
                      onClick={() => {
                        setCurrentLocale(locale);
                        onCurrencyChange(locale.currency);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{locale.flag}</span>
                        <span>{locale.name}</span>
                      </div>
                      <span className="text-foreground/60 dark:text-white/60">{locale.currency.symbol}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/hair-analysis"
                className="h-8 px-4 text-xs font-medium text-white dark:text-primary bg-primary dark:bg-white rounded-full flex items-center justify-center transition-all hover:bg-primary/90 dark:hover:bg-white/90"
              >
                {t.header.bookConsultation}
              </Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between font-display">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://yakisiklihairclinic.com/wp-content/uploads/2023/03/yakisikli-logo-2.png" 
              alt="Yakisikli Hair Clinic"
              className="h-12 w-auto transition-transform hover:scale-105"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <div key={item.href} className="relative group">
                <div className="relative">
                  <a
                    href={item.href}
                    className="text-sm font-medium tracking-tight text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-4 w-4 opacity-50" />}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.08)] border border-black/[0.08] dark:border-white/[0.08] p-2 min-w-[240px]">
                        {item.children.map((child) => (
                          <div key={child.href} className="relative group/child">
                            <a
                              href={child.href}
                              className="block px-4 py-2 text-sm font-medium text-foreground/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white rounded-md transition-colors"
                            >
                              {child.label}
                              {child.children && <ChevronDown className="h-4 w-4 opacity-50 -rotate-90" />}
                            </a>
                            {child.children && (
                              <div className="absolute left-full top-0 ml-2 pt-0 opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible transition-all duration-200">
                                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.08)] border border-black/[0.08] dark:border-white/[0.08] p-2 min-w-[240px]">
                                  {child.children.map((subChild) => (
                                    <a
                                      key={subChild.href}
                                      href={subChild.href}
                                      className="block py-1.5 px-3 text-sm font-normal text-foreground/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white rounded-md transition-colors"
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
              className="hidden md:inline-flex group relative items-center justify-center h-11 px-6 text-sm font-medium text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative">{t.header.bookConsultation}</span>
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
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 dark:text-white/80 transition-colors hover:text-foreground dark:hover:text-white relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-black/[0.08] dark:before:bg-white/[0.08] hover:before:bg-primary dark:hover:before:bg-white before:transition-colors"
                    >
                      {item.label}
                    </a>
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
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import { 
  Star,
  Syringe,
  Microscope,
  Crown,
  Check,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Shield,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Package {
  id: 'fue' | 'dhi' | 'vip';
  title: string;
  price: number;
  popular?: boolean;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  features: {
    placement: string;
    technique: string;
    items: string[];
  };
}

const packages: Package[] = [
  { 
    id: 'fue',
    title: 'FUE ALTIN',
    price: 2300,
    icon: Microscope,
    gradient: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €',
    features: {
      placement: 'Forseps',
      technique: 'Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi'
      ]
    }
  },
  { 
    id: 'dhi',
    title: 'DHI SAFİR',
    price: 2990,
    popular: true,
    icon: Syringe,
    gradient: 'from-secondary/10 to-secondary/5',
    iconColor: 'text-secondary',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 900 €',
    features: {
      placement: 'DHI İmplanter Kalemi',
      technique: 'Mikro Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi',
        '2 Aylık Saç Güçlendirme Paketi'
      ]
    }
  },
  { 
    id: 'vip',
    title: 'VIP DHI SAFIR',
    price: 5000,
    icon: Crown, 
    gradient: 'from-amber-500/10 to-yellow-500/10',
    iconColor: 'text-amber-500',
    description: '(4.000 grefte kadar) + 5.500 grefte kadar megaseans için 1000 €',
    features: {
      placement: 'DHI İmplanter Kalemi',
      technique: 'Mikro Safir Bıçak',
      items: [
        'Dr. Yakışıklı\'nın Konsültasyonu ve Saç Çizgisi Tasarımı',
        'Dr. Yakışıklı\'nın ameliyat kesisi',
        'Tek ve Çoklu Greft Hazırlığı için HD Mikroskop',
        'Ertesi Gün Sonuç Kontrolü',
        'Kişisel Arkadaş ve Tercüman',
        '5 Yıldızlı Otel Konaklaması',
        'VIP Alım ve Transferler',
        'FotoFinder Trichoscale AI Donör Alanı Saç Analizi',
        'Oksijen Terapi Tedavisi',
        '4 Aylık Saç Güçlendirme Paketi'
      ]
    }
  }
];

export function PriceCalculator() {
  const { t } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const [hoveredPackage, setHoveredPackage] = React.useState<string | null>(null);
  
  // Reorder packages to put popular one in the middle
  const orderedPackages = packages;

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.pricing.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.pricing.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.pricing.description}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="relative grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Reorder packages to put DHI in the middle */}
          {[
            packages.find(p => p.id === 'fue'),
            packages.find(p => p.id === 'dhi'),
            packages.find(p => p.id === 'vip')
          ].map((pkg) => {
            if (!pkg) return null;
            const packageData = t.pricing.packages[pkg.id];
            return (
              <div
                key={pkg.id}
                className={cn(
                  "group relative transition-all duration-300",
                  pkg.popular ? "lg:z-20" : "lg:z-10",
                  hoveredPackage === pkg.id ? "lg:scale-105" : ""
                )}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-300 h-full flex flex-col",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  pkg.popular ? "lg:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:lg:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "",
                  hoveredPackage === pkg.id ? "shadow-[0_16px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_32px_rgba(255,255,255,0.15)]" : ""
                )}>
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-secondary/20 blur-lg" />
                        <div className="relative flex items-center">
                          <div className="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                          <div className="relative px-4 py-1.5 bg-secondary text-white shadow-lg">
                            <div className="flex items-center gap-2">
                              <Star className="w-3.5 h-3.5 fill-white" />
                              <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{packageData.popular}</span>
                              <Star className="w-3.5 h-3.5 fill-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="relative p-6 sm:p-8 border-b border-black/[0.08] dark:border-white/[0.08] mt-4">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    </div>

                    {/* Mobile Header Layout */}
                    <div className="flex flex-col sm:block">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mx-0 sm:mb-8",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <pkg.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-white" />
                      </div>
                      
                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-2xl font-bold text-foreground dark:text-white mb-2">{packageData.title}</h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed max-w-xs mx-auto sm:max-w-none sm:mx-0">{packageData.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start mt-6 sm:mt-8">
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-3xl sm:text-4xl font-bold",
                          pkg.popular ? "text-secondary" : "text-foreground dark:text-white"
                        )}>
                          {selectedCurrency?.symbol || '€'}{pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 flex-1 flex flex-col">
                    {/* Technique Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)] transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                            <Syringe className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground dark:text-white mb-1">{t.pricing.packages.labels.placement}</div>
                            <div className="text-sm text-foreground/60 dark:text-white/60">{packageData.features.placement}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)] transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                            <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground dark:text-white mb-1">{t.pricing.packages.labels.technique}</div>
                            <div className="text-sm text-foreground/60 dark:text-white/60">{packageData.features.technique}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-4 flex-1">
                      {packageData.features.items.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary dark:text-white" />
                          </div>
                          <span className="text-sm text-foreground/60 dark:text-white/60">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="space-y-4 mt-auto pt-6">
                      <Button
                        className={cn(
                          "w-full gap-3 h-12 sm:h-14 text-base font-medium rounded-full",
                          "text-white dark:text-primary",
                          "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                          "transition-all duration-300",
                          "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          pkg.popular 
                            ? "bg-secondary dark:bg-white hover:bg-secondary/90 dark:hover:bg-white/90" 
                            : "bg-primary dark:bg-white hover:bg-primary/90 dark:hover:bg-white/90"
                        )}
                        onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t.pricing.packages.labels.whatsapp}
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-foreground/60 dark:text-white/60">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{t.pricing.securePayment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graft Count Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)]">
            <Microscope className="w-4 h-4 text-primary dark:text-white" />
            <p className="text-sm text-foreground/60 dark:text-white/60">{t.pricing.graftNote}</p>
          </div>
        </div>

        {/* Package Selection Guide */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
                  <Shield className="w-4 h-4 text-primary dark:text-white" />
                  <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.pricing.guide.description}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
                  {t.pricing.guide.title}
                </h3>
                <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                  <p className="text-base sm:text-lg text-foreground/60 dark:text-white/60">
                    {t.pricing.guide.content}
                  </p>
                  <p className="text-base sm:text-lg text-foreground/60 dark:text-white/60">
                    {t.pricing.guide.help}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.location.href = '/hair-analysis'}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.pricing.guide.cta.analysis}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <ChevronRight className="w-4 h-4" />
                    {t.pricing.guide.cta.contact}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
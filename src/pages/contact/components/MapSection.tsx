import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  MapPin,
  Navigation,
  Car,
  Plane,
  Bus,
  ParkingCircle,
  ArrowRight
} from 'lucide-react';

export function MapSection() {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);

  const transportFeatures = [
    { 
      id: 'airport',
      icon: Plane,
      text: t.contact.map.transport.airport,
      gradient: 'from-blue-500/20 to-indigo-500/20'
    },
    { 
      id: 'taxi',
      icon: Car,
      text: t.contact.map.transport.taxi,
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      id: 'shuttle',
      icon: Bus,
      text: t.contact.map.transport.shuttle,
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  return (
    <div id="map" className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <MapPin className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                {t.contact.map.title}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-4">
              {t.contact.map.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60">
              {t.contact.map.description}
            </p>
          </div>

          {/* Map Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.08)]">
            {/* Map */}
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.7459742056745!2d29.126231076680706!3d36.63533942935868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c041f7b8c9c8a5%3A0x9f8d8b8d8b8d8b8d!2sYak%C4%B1%C5%9F%C4%B1kl%C4%B1%20Hair%20Clinic!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-2xl"
              />
            </div>

            {/* Info Section */}
            <div className="p-6 sm:p-8">
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Address & Directions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary dark:text-white flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">{t.contact.info.items.location.title}</h3>
                      <p className="text-sm text-foreground/60 dark:text-white/60">
                        {t.contact.info.items.location.value}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2 h-11 rounded-xl bg-white/50 dark:bg-white/5"
                    onClick={() => window.open('https://maps.app.goo.gl/fVb8V5hj7R3UDdPR8', '_blank')}
                  >
                    <Navigation className="w-4 h-4" />
                    {t.contact.map.directions}
                  </Button>
                </div>

                {/* Transportation Options */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2 mb-4">
                    <Car className="w-5 h-5" />
                    {t.contact.map.transport.title}
                  </h3>

                  <div className="grid gap-3">
                    {transportFeatures.map(feature => (
                      <div
                        key={feature.id}
                        className="group relative"
                        onMouseEnter={() => setHoveredFeature(feature.id)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className={cn(
                          "relative overflow-hidden rounded-xl p-4 transition-all duration-300",
                          "bg-white/90 dark:bg-white/5 backdrop-blur-sm",
                          "border border-black/[0.08] dark:border-white/[0.08]",
                          hoveredFeature === feature.id ? "scale-[1.02] shadow-lg" : ""
                        )}>
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                            feature.gradient
                          )} />
                          <div className="relative flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              "bg-gradient-to-br",
                              feature.gradient
                            )}>
                              <feature.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm text-foreground dark:text-white/80 font-medium">
                              {feature.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Parking Info */}
                  <div className="flex items-center gap-2 text-sm text-foreground/80 dark:text-white/60 mt-4 font-medium">
                    <ParkingCircle className="w-4 h-4" />
                    <span>{t.contact.map.parking}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { MessageCircle, Star, Quote, ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';

interface SuccessStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: any[];
  pattern: string;
}

export function SuccessStoriesModal({ isOpen, onClose, stories, pattern }: SuccessStoriesModalProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const currentStory = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    setSliderPosition(50);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setSliderPosition(50);
  };

  const handleSliderMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  if (!stories.length) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
          <DialogHeader className="p-6 border-b border-border/50">
            <DialogTitle className="text-2xl font-bold">
              {t.treatments.gallery.title}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {/* Before/After Slider */}
            <div 
              ref={sliderRef}
              className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize mb-6"
              onMouseMove={handleSliderMove}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <img
                  src={currentStory.beforeImage}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* After Image */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentStory.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <ArrowLeft className="w-3 h-3 text-primary" />
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                  {t.treatments.gallery.labels.before}
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                  {t.treatments.gallery.labels.after}
                </div>
              </div>
            </div>

            {/* Story Details */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">
                    {t.treatments.gallery.timeframes[currentStory.timeframe as keyof typeof t.treatments.gallery.timeframes]}
                  </div>
                  <div className="text-lg font-semibold">
                    {currentStory.grafts} Grafts
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Age</div>
                  <div className="text-lg font-semibold">{currentStory.age} Years</div>
                </div>
                <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                  <div className="text-sm text-muted-foreground mb-1">Rating</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: currentStory.testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-6 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-primary/20 dark:text-white/20 flex-shrink-0" />
                  <div>
                    <p className="text-base text-foreground/80 dark:text-white/80 italic mb-4">
                      "{currentStory.testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currentStory.testimonial.name}</span>
                        <span className="text-muted-foreground">{currentStory.testimonial.country}</span>
                      </div>
                      {currentStory.testimonial.videoId && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setActiveVideo(currentStory.testimonial.videoId)}
                        >
                          <Play className="w-4 h-4" />
                          {t.treatments.gallery.labels.watchStory}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {stories.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentIndex
                        ? "bg-primary scale-125"
                        : "bg-primary/20"
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.location.href = '/hair-analysis'}
              >
                {t.treatments.gallery.cta.analyze}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.open('https://wa.me/905360344866', '_blank')}
              >
                <MessageCircle className="w-4 h-4" />
                {t.treatments.gallery.cta.whatsapp}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <VideoModal
        videoId={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        onExternalClick={() => {
          window.open(`https://www.youtube.com/watch?v=${activeVideo}`, '_blank');
          setActiveVideo(null);
        }}
        translations={{
          watchOnYoutube: t.treatments.gallery.labels.watchOnYoutube,
          cta: {
            whatsapp: t.treatments.gallery.cta.whatsapp,
            schedule: t.treatments.gallery.cta.schedule,
            call: t.treatments.gallery.cta.call
          }
        }}
      />
    </>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Star, Play, MessageCircle } from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';
import { supabase } from '@/lib/supabase';

const AUTO_SLIDE_INTERVAL = 7000; // 7 seconds

interface SuccessStory {
  id: string;
  type: string;
  before_image: string;
  after_image: string;
  timeframe: string;
  grafts: number;
  age: number;
  video_id: string | null;
  patient_name: string;
  patient_country: string;
  rating: number;
  testimonial: string;
}

export function SuccessStoriesSlider() {
  const { t } = useTranslation();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; position: number } | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchStories();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stories.length > 1) {
      timerRef.current = setInterval(() => {
        if (!isDragging) {
          handleNext();
        }
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isDragging, stories.length]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!stories?.length) return;
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    setSliderPosition(50);
  };

  const handlePrevious = () => {
    if (!stories?.length) return;
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setSliderPosition(50);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setDragStart({
      x: clientX,
      position: sliderPosition
    });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStart || !sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = sliderRef.current.getBoundingClientRect();
    const deltaX = clientX - dragStart.x;
    const deltaPercent = (deltaX / rect.width) * 100;
    const newPosition = Math.max(0, Math.min(100, dragStart.position + deltaPercent));
    setSliderPosition(newPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);
      const handleGlobalEnd = handleDragEnd;

      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove);
      document.addEventListener('touchend', handleGlobalEnd);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalEnd);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalEnd);
      };
    }
  }, [isDragging]);

  if (loading || !stories.length) return null;

  const currentStory = stories[currentIndex];

  return (
    <div className="relative">
      {/* Main Slider Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)] border border-black/[0.08] dark:border-white/[0.08]">
        {/* Slider Content */}
        <div
          ref={sliderRef}
          className="absolute inset-0 cursor-ew-resize"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img
              src={currentStory.before_image}
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
              src={currentStory.after_image}
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white/90 cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "w-11 h-11 rounded-full",
              "bg-white/90 backdrop-blur-md",
              "shadow-[0_0_0_2px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.4)]",
              "flex items-center justify-center",
              "transition-all duration-300",
              isDragging ? "scale-110" : "hover:scale-105"
            )}>
              <div className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4 text-primary/80" />
                <ArrowRight className="w-4 h-4 text-primary/80" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10">
              {t.treatments.gallery.labels.before}
            </div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10">
              {t.treatments.gallery.labels.after}
            </div>
          </div>

          {/* Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex items-center justify-between text-white">
              <div>
                <div className="text-sm font-medium">
                  {t.treatments.gallery.timeframes[currentStory.timeframe as keyof typeof t.treatments.gallery.timeframes]}
                </div>
                <div className="text-xs text-white/80 mt-0.5">
                  {currentStory.grafts} Grafts • Age {currentStory.age}
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: currentStory.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Testimonial */}
      <div className="mt-4 space-y-4">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { handlePrevious(); if (timerRef.current) clearInterval(timerRef.current); }}
            className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            {stories.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-primary scale-110"
                    : "bg-primary/20"
                )}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { handleNext(); if (timerRef.current) clearInterval(timerRef.current); }}
            className="w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Testimonial */}
        <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="font-medium text-sm text-foreground dark:text-white">{currentStory.patient_name}</span>
                <span className="text-xs text-muted-foreground">{currentStory.patient_country}</span>
              </div>
            </div>
            {currentStory.video_id && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setActiveVideo(currentStory.video_id)}
              >
                <Play className="w-3.5 h-3.5" />
                <span className="text-xs">
                  {t.treatments.gallery.labels.watchStory}
                </span>
              </Button>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground/60 dark:text-white/60 italic line-clamp-2">
            "{currentStory.testimonial}"
          </p>
        </div>
      </div>

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
    </div>
  );
}
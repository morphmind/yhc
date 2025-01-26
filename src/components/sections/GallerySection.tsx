import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { LocaleContext } from '@/contexts/LocaleContext';
import { supabase } from '@/lib/supabase';
import { VideoModal } from '@/components/ui/video-modal';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  MessageCircle,
  Star,
  Quote,
  ArrowRight,
  ArrowLeft,
  Play,
  Sparkles,
  Filter,
  RefreshCw
} from 'lucide-react';

interface DragState {
  startX: number;
  startPosition: number;
}

export function GallerySection() {
  const { t } = useTranslation();
  const { currentLocale } = useContext(LocaleContext);
  const [cases, setCases] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({});
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const sliderRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const dragStateRef = useRef<DragState | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel('success_stories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'success_stories',
          filter: 'status=eq.published'
        },
        (payload) => {
          console.log('Realtime change received:', payload);
          switch (payload.eventType) {
            case 'INSERT':
              setCases(prev => [payload.new, ...prev]);
              break;
            case 'UPDATE':
              setCases(prev => prev.map(story => 
                story.id === payload.new.id ? payload.new : story
              ));
              break;
            case 'DELETE':
              setCases(prev => prev.filter(story => story.id !== payload.old.id));
              break;
            default:
              fetchStories();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published') 
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to fetch success stories');
      }

      const transformedData = data?.map(story => ({
        id: story.id,
        type: story.type,
        beforeImage: story.before_image,
        afterImage: story.after_image,
        timeframe: story.timeframe,
        grafts: story.grafts,
        age: story.age,
        testimonial: {
          videoId: story.video_id,
          name: story.patient_name,
          country: story.patient_country,
          rating: story.rating,
          text: story.testimonial
        }
      })) || [];

      setCases(transformedData);

    } catch (err: any) {
      console.error('Error fetching stories:', err);
      setError(err.message || 'Failed to load success stories');
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [currentLocale.code]);

  const filters = [
    { id: 'all', icon: Sparkles },
    { id: 'hair', icon: ChevronRight },
    { id: 'afro', icon: ChevronRight },
    { id: 'women', icon: ChevronRight },
    { id: 'beard', icon: ChevronRight },
    { id: 'eyebrow', icon: ChevronRight },
  ];

  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(c => c.type === activeFilter);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    const newPositions: Record<number, number> = {};
    paginatedCases.forEach(story => {
      if (!(story.id in sliderPositions)) {
        newPositions[story.id] = 50;
      }
    });
    if (Object.keys(newPositions).length > 0) {
      setSliderPositions(prev => ({ ...prev, ...newPositions }));
    }
  }, [paginatedCases, sliderPositions]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, caseId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const sliderRef = sliderRefs.current[caseId];
    if (!sliderRef) return;

    const rect = sliderRef.getBoundingClientRect();
    const currentPosition = sliderPositions[caseId] ?? 50;

    dragStateRef.current = {
      startX: clientX,
      startPosition: currentPosition
    };
    
    setDraggingId(caseId);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent, caseId: number) => {
    if (draggingId !== caseId || !dragStateRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    const sliderRef = sliderRefs.current[caseId];
    if (!sliderRef) return;

    const rect = sliderRef.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStateRef.current.startX;
    const deltaPercent = (deltaX / rect.width) * 100;
    const newPosition = Math.max(0, Math.min(100, dragStateRef.current.startPosition + deltaPercent));

    setSliderPositions(prev => ({
      ...prev,
      [caseId]: newPosition
    }));
  };

  const handleDragEnd = (caseId: number) => {
    if (draggingId !== caseId) return;
    
    dragStateRef.current = null;
    setDraggingId(null);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (draggingId !== null) {
        handleDragMove(e, draggingId);
      }
    };

    const handleGlobalEnd = () => {
      if (draggingId !== null) {
        handleDragEnd(draggingId);
      }
    };

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
  }, [draggingId]);

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_0%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_100%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_0%,rgba(74,86,226,0.2),transparent_50%)]" />

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Star className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.treatments.gallery.title}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">{t.treatments.gallery.title}</h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.treatments.gallery.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              className={cn(
                "h-10 gap-2 rounded-full",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                "hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                "transition-all duration-300",
                activeFilter === filter.id ? "bg-primary dark:bg-white text-white dark:text-primary border-transparent" : ""
              )}
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon className="w-4 h-4" />
              {t.treatments.gallery.filters[filter.id as keyof typeof t.treatments.gallery.filters]}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-primary dark:border-white border-t-transparent animate-spin" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg animate-pulse" />
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <div className="text-center text-red-500 dark:text-red-400 font-medium">
              <p>{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchStories()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Henüz başarı hikayesi eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {paginatedCases.map((item) => (
              <div
                key={item.id}
                className="group relative"
                onMouseEnter={() => setHoveredCase(item.id)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-500",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredCase === item.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  {/* Before/After Slider */}
                  <div 
                    ref={el => sliderRefs.current[item.id] = el}
                    className="relative aspect-[4/3]"
                    onMouseDown={e => handleDragStart(e, item.id)}
                    onTouchStart={e => handleDragStart(e, item.id)}
                    style={{ touchAction: 'none', overflow: 'hidden' }}
                  >
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.beforeImage}
                        alt="Before"
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>

                    {/* After Image */}
                    <div 
                      data-after-image
                      className="absolute inset-0 overflow-hidden transition-none"
                      style={{ clipPath: `inset(0 ${100 - (sliderPositions[item.id] ?? 50)}% 0 0)` }}
                    >
                      <img
                        src={item.afterImage}
                        alt="After"
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable="false" 
                      />
                    </div>

                    {/* Slider Handle */}
                    <div 
                      data-slider-handle
                      className="absolute top-0 bottom-0 w-[2px] bg-white z-10 transition-none cursor-ew-resize"
                      style={{ left: `${sliderPositions[item.id] ?? 50}%` }}
                    >
                      <div className={cn(
                        "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                        "w-12 h-12 rounded-full",
                        "bg-white/90 backdrop-blur-sm",
                        "shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.2)]",
                        "flex items-center justify-center",
                        "transition-all duration-300",
                        draggingId === item.id ? "scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : ""
                      )}>
                        <div className="flex items-center gap-1">
                          <ArrowLeft className="w-4 h-4 text-primary" />
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                        {t.treatments.gallery.labels.before}
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                        {t.treatments.gallery.labels.after}
                      </div>
                    </div>

                    {/* Info Overlay */}
                    <div className={cn(
                      "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent",
                      "transition-opacity duration-300",
                      hoveredCase === item.id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <div className="text-sm font-medium mb-1">
                            {t.treatments.gallery.timeframes[item.timeframe as keyof typeof t.treatments.gallery.timeframes]}
                          </div>
                          <div className="text-xs text-white/80">
                            {item.grafts} Grafts • Age {item.age}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="p-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <div className="flex items-start gap-3">
                      <Quote className="w-8 h-8 text-primary/20 dark:text-white/20" />
                      <div>
                        <p className="text-sm text-foreground/60 dark:text-white/60 italic mb-2">
                          "{item.testimonial.text}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground dark:text-white">{item.testimonial.name}</span>
                            <span className="text-sm text-foreground/60 dark:text-white/60">{item.testimonial.country}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-2 hover:bg-black/5 dark:hover:bg-white/5"
                            onClick={() => setActiveVideo(item.testimonial.videoId)}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span className="text-xs">{t.treatments.gallery.labels.watchStory}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-8 h-8 rounded-full",
                    currentPage === page ? "bg-primary dark:bg-white text-white dark:text-primary" : "hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-primary/90 dark:hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => window.location.href = '/hair-analysis'}
          >
            {t.treatments.gallery.cta.analyze}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => window.open('https://wa.me/905360344866', '_blank')}
          >
            <MessageCircle className="w-4 h-4" />
            {t.treatments.gallery.cta.whatsapp}
          </Button>
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
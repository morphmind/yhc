import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  ChevronRight,
  Shield,
  Lock,
  UserCheck
} from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function AnalysisSuccess() {
  // Hooks must be called in the same order on every render
  const { t } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const navigate = useNavigate();
  const location = useLocation();
  
  // All refs must be declared before any conditional logic
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);
  const shouldRedirect = React.useRef(false);
  const hasScrolled = React.useRef(false);

  const [formData, setFormData] = React.useState<any>(null);
  const [matchingStories, setMatchingStories] = React.useState<any[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; position: number } | null>(null);
  const [showExitDialog, setShowExitDialog] = React.useState(false);
  
  // Memoized callbacks
  const handleNext = React.useCallback(() => {
    if (!matchingStories?.length) return;
    setCurrentStoryIndex((prev) => (prev + 1) % matchingStories.length);
    setSliderPosition(50);
  }, [matchingStories?.length]);

  const handlePrevious = React.useCallback(() => {
    if (!matchingStories?.length) return;
    setCurrentStoryIndex((prev) => (prev - 1 + matchingStories.length) % matchingStories.length);
    setSliderPosition(50);
  }, [matchingStories?.length]);

  const handleDragStart = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setDragStart({
      x: clientX,
      position: sliderPosition
    });
  }, [sliderPosition]);

  const handleDragMove = React.useCallback((e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDragging || !dragStart || !sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = sliderRef.current.getBoundingClientRect();
    const deltaX = clientX - dragStart.x;
    const deltaPercent = (deltaX / rect.width) * 100;
    const newPosition = Math.max(0, Math.min(100, dragStart.position + deltaPercent));
    setSliderPosition(newPosition);
  }, [isDragging, dragStart]);

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const scrollToResults = React.useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Load data on mount
  React.useEffect(() => {
    try {
      const savedFormData = sessionStorage.getItem('analysisFormData');
      const savedStories = sessionStorage.getItem('matchingStories');

      // If no saved data and not coming from form submission, redirect to analysis page
      if (!savedFormData && !location.state?.fromSubmission) {
        shouldRedirect.current = true;
        setIsLoading(false);
        return;
      }

      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        sessionStorage.removeItem('analysisFormData');
      }

      if (savedStories) {
        const parsedStories = JSON.parse(savedStories);
        setMatchingStories(parsedStories);
        sessionStorage.removeItem('matchingStories');
      }
    } catch (error) {
      console.error('Error loading form data:', error);
      shouldRedirect.current = true;
    } finally {
      setIsLoading(false);
    }
  }, [location.state?.fromSubmission]);

  // Redirect if needed
  React.useEffect(() => {
    if (shouldRedirect.current) {
      navigate('/hair-analysis');
    }
  }, [navigate]);

  // Handle drag events
  React.useEffect(() => {
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
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Handle exit intent
  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasScrolled.current && matchingStories.length > 0 && !localStorage.getItem('hideExitDialog')) {
        setShowExitDialog(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [matchingStories.length]);

  // Track scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        hasScrolled.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStory = matchingStories?.[currentStoryIndex];

  // Eğer yükleniyorsa, yükleme spinner'ını göster
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Show loading or redirect if no form data
  if (!formData || shouldRedirect.current) {
    return null;
  }

  const handleSliderMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="lg"
          className="h-12 gap-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="w-4 h-4 text-foreground dark:text-white" />
          {t.hairAnalysis.success.backToSite}
        </Button>
      </div>

      {/* Success Message Section */}
      <div className="relative min-h-screen flex items-center justify-center py-12">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          {/* Modern Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />

          {/* Animated Gradient Spheres */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
            <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
          </div>

          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 bg-green-500/20 dark:bg-green-500/40 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-white dark:bg-black rounded-full border border-green-500/20 dark:border-green-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold mb-4">
              {t.hairAnalysis.success.title.replace('{name}', formData.firstName)}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.hairAnalysis.success.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.open('https://wa.me/905360344866', '_blank')}
              >
                <MessageCircle className="w-4 h-4" />
                {t.hairAnalysis.success.cta.whatsapp}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.open('tel:+905360344866', '_blank')}
              >
                <Phone className="w-4 h-4" />
                {t.hairAnalysis.success.cta.call}
              </Button>
            </div>
            {matchingStories.length > 0 && (
              <div className="flex flex-col items-center gap-4 mt-12">
                {/* Scroll Text */}
                <div className="relative group" onClick={scrollToResults}>
                  {/* Pulsing Background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Main Button */}
                  <Button
                    size="lg"
                    className="relative h-14 px-8 gap-3 text-base font-medium text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Star className="w-5 h-5" />
                    {t.hairAnalysis.success.viewResults}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Scroll Indicator */}
                <div className="relative w-6 h-10 rounded-full border-2 border-primary/20 dark:border-white/20 overflow-hidden mt-4">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary dark:bg-white animate-scroll-down" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exit Intent Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="max-w-2xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border-0">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-center gap-6">
              {/* Success Icon with Animation */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-full animate-ping" />
                <div className="relative w-full h-full bg-white dark:bg-black rounded-full border border-primary/20 dark:border-primary/40 flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-2">
                  {t.hairAnalysis.success.similarCases.title}
                </h2>
                <p className="text-base text-muted-foreground dark:text-white/60">
                  {t.hairAnalysis.success.similarCases.description}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-primary dark:text-white mb-1">98%</div>
              <p className="text-sm text-muted-foreground">Hasta Memnuniyeti</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-primary dark:text-white mb-1">15K+</div>
              <p className="text-sm text-muted-foreground">Başarılı Operasyon</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 text-center">
              <div className="text-2xl font-bold text-primary dark:text-white mb-1">4.9/5</div>
              <p className="text-sm text-muted-foreground">Hasta Puanı</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <Button
              size="lg"
              className="w-full h-14 gap-3 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base font-medium"
              onClick={() => {
                setShowExitDialog(false);
                scrollToResults();
                localStorage.setItem('hideExitDialog', 'true');
              }}
            >
              <Star className="w-5 h-5" />
              {t.hairAnalysis.success.viewResults}
              <ChevronRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 gap-2 text-base font-medium rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                setShowExitDialog(false);
                localStorage.setItem('hideExitDialog', 'true');
              }}
            >
              Şimdilik Geç
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Verileriniz güvende ve gizli tutulur</span>
          </div>
          
          {/* Additional Trust Badges */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary/60 dark:text-white/60" />
              <span className="text-xs text-muted-foreground">SSL Korumalı</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-primary/60 dark:text-white/60" />
              <span className="text-xs text-muted-foreground">KVKK Uyumlu</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Similar Cases Section */}
      {matchingStories.length > 0 && (
        <div ref={resultsRef} className="relative min-h-screen py-24 bg-gradient-to-b from-background via-background/95 to-background">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {t.hairAnalysis.success.similarCases.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.hairAnalysis.success.similarCases.description}
                </p>
              </div>

              {/* Before/After Slider */}
              <div className="relative flex items-center gap-8 mb-12">
                {/* Previous Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "h-14 px-6 rounded-full",
                      "bg-white/90 dark:bg-white/90 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-300",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "group"
                    )}
                    onClick={handlePrevious}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-sm font-medium text-primary">
                        {t.hairAnalysis.navigation.previous}
                      </span>
                    </div>
                  </Button>
                </div>

                <div
                  ref={sliderRef}
                  className="relative flex-1 aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize"
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img
                      src={currentStory?.before_image}
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
                      src={currentStory?.after_image}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                  >
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                      "w-12 h-12 rounded-full",
                      "bg-white/95 dark:bg-white/95 backdrop-blur-md",
                      "shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.2)]",
                      "flex items-center justify-center gap-1",
                      "transition-all duration-300",
                      isDragging ? "scale-110 shadow-[0_0_0_6px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.3)]" : ""
                    )}>
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4 text-primary animate-pulse" />
                        <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                      Öncesi
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                      Sonrası
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "h-14 px-6 rounded-full",
                      "bg-white/90 dark:bg-white/90 backdrop-blur-md",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-300",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "group"
                    )}
                    onClick={handleNext}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {t.hairAnalysis.navigation.next}
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Button>
                </div>
              </div>

              {/* Story Details */}
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      {t.hairAnalysis.success.similarCases.stats.timeframe}
                    </div>
                    <div className="text-lg font-semibold">
                      {currentStory?.grafts} Greft
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      {t.hairAnalysis.success.similarCases.stats.age}
                    </div>
                    <div className="text-lg font-semibold">
                      {currentStory?.age} Yaş
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      {t.hairAnalysis.success.similarCases.stats.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: currentStory?.rating || 0 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-8 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-base text-foreground/80 dark:text-white/80 italic mb-4">
                        "{currentStory?.testimonial}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{currentStory?.patient_name}</span>
                          <span className="text-muted-foreground">{currentStory?.patient_country}</span>
                        </div>
                        {currentStory?.video_id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2"
                            onClick={() => setActiveVideo(currentStory.video_id)}
                          >
                            <Play className="w-4 h-4" />
                            Hikayeyi İzle
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-2">
                    {matchingStories.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-3 h-3 rounded-full transition-all",
                          index === currentStoryIndex
                            ? "bg-primary scale-125"
                            : "bg-primary/20"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {t.hairAnalysis.success.cta.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {t.hairAnalysis.success.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.hairAnalysis.success.cta.whatsapp}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => window.open('tel:+905360344866', '_blank')}
                  >
                    <Phone className="w-4 h-4" />
                    {t.hairAnalysis.success.cta.call}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
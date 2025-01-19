import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle2, Send, Upload, Mail } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message: string;
  submitterName?: string;
}

export function LoadingOverlay({ isVisible, message, submitterName }: LoadingOverlayProps) {
  if (!isVisible) return null;

  // Get appropriate icon based on message content
  const getIcon = () => {
    if (message.toLowerCase().includes('upload')) return Upload;
    if (message.toLowerCase().includes('send')) return Send;
    if (message.toLowerCase().includes('email')) return Mail;
    return CheckCircle2;
  };

  const Icon = getIcon();

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-md",
        "transition-all duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-6">
        <div className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white/80 dark:bg-black/80",
          "border border-border/50",
          "shadow-[0_32px_64px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_rgba(255,255,255,0.08)]",
          "backdrop-blur-xl",
          "transition-all duration-500",
          "animate-in fade-in-0 zoom-in-95",
          "p-8"
        )}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-50" />
          
          {/* Animated Gradient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent animate-gradient" />
            <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
          </div>

          <div className="relative flex flex-col items-center text-center space-y-6">
            {/* Icon Container */}
            <div className="relative">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20 animate-[ping_2s_ease-in-out_infinite]" />
              
              {/* Inner Circle */}
              <div className="relative w-20 h-20 rounded-full bg-white dark:bg-black border border-border/50 shadow-lg flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary animate-pulse" />
              </div>

              {/* Loading Indicator */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              {submitterName && (
                <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  {submitterName}
                </h2>
              )}
              <p className="text-lg text-foreground/80 dark:text-white/80 leading-relaxed max-w-sm mx-auto">
                {message}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
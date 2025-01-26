import React from 'react';
import { CheckCheck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface DoctorFeedbackProps {
  message: string;
  doctorInfo: {
    name: string;
    title: string;
    image: string;
  };
}

export function DoctorFeedback({ message, doctorInfo }: DoctorFeedbackProps) {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  // Refs for controlling the typing animation
  const messageRef = React.useRef<string>('');
  const charIndexRef = React.useRef<number>(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    charIndexRef.current = 0;
    setIsTyping(false);
  }, []);

  // Typing animation function
  const typeText = React.useCallback(() => {
    setIsTyping(true);
    setDisplayText('');
    charIndexRef.current = 0;

    timerRef.current = setInterval(() => {
      const currentMessage = messageRef.current;
      const currentIndex = charIndexRef.current;

      if (!currentMessage || currentIndex >= currentMessage.length) {
        cleanup();
      } else {
        setDisplayText(prev => prev + currentMessage[currentIndex]);
        charIndexRef.current++;
      }
    }, 30);
  }, [cleanup]);

  // Effect to handle message changes
  React.useEffect(() => {
    cleanup();
    const sanitizedMessage = (typeof message === 'string') ? message.trim() : '';
    messageRef.current = sanitizedMessage;

    if (sanitizedMessage) {
      typeText();
    } else {
      setDisplayText('');
    }

    return cleanup;
  }, [message, cleanup, typeText]);

  return (
    <div className="bg-background/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
      {/* Doctor Profile Header */}
      <div className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-border">
        <div className="relative w-fit mx-auto sm:mx-0">
          <img
            src={doctorInfo.image}
            alt={doctorInfo.name}
            className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-primary/20 dark:ring-white/20"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background">
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute inset-0 m-auto animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left space-y-1.5">
            <h4 className="font-semibold text-foreground dark:text-white text-lg">{doctorInfo.name}</h4>
            <p className="text-sm text-muted-foreground dark:text-white/60">{doctorInfo.title}</p>
          </div>
          <Button
            variant="secondary"
            size="sm" 
            className={cn( 
              "text-xs gap-1.5 w-[200px] sm:w-auto mx-auto sm:mx-0",
              "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]",
              "dark:bg-[#25D366]/20 dark:text-white dark:hover:bg-[#25D366]/30",
              "border border-[#25D366]/20 dark:border-[#25D366]/30",
              "shadow-[0_2px_8px_rgba(37,211,102,0.1)] dark:shadow-[0_2px_8px_rgba(37,211,102,0.2)]",
              "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            )}
            onClick={() => window.open('https://wa.me/905360344866', '_blank')}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t.hairAnalysis.doctor.consultButton}
          </Button>
        </div>
      </div>

      {/* Message Bubble */}
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-white/10 dark:to-white/5 rounded-2xl p-4 max-w-[90%] mr-auto">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-foreground dark:text-white text-base leading-relaxed min-h-[1.5em] whitespace-pre-line">
                  {displayText}
                  {isTyping && <span className="inline-block ml-1 animate-pulse">|</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1 opacity-75">
              <span className="text-xs text-muted-foreground dark:text-white/60">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <CheckCheck className="h-4 w-4 text-primary dark:text-white/60" />
            </div>
            {/* Message tail */}
            <div className="absolute top-0 left-0 w-4 h-4 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-white/10 dark:to-white/5 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
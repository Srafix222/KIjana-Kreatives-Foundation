import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../data/content';

interface StatBandProps {
  className?: string;
  autoCount?: boolean;
}

export const StatBand: React.FC<StatBandProps> = ({ className = '', autoCount = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize counts
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    STATS.forEach((s) => {
      // If autoCount is false, immediately show final targets
      initial[s.key] = autoCount ? 0 : s.target;
    });
    return initial;
  });

  useEffect(() => {
    if (!autoCount) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const fullCounts: { [key: string]: number } = {};
      STATS.forEach((s) => { fullCounts[s.key] = s.target; });
      setCounts(fullCounts);
      hasTriggeredRef.current = true;
      return;
    }

    const startAnimation = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      const startTime = performance.now();
      const duration = 2000; // 2 seconds smooth count-up

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / duration);
        // Smooth quartic ease-out curve: 1 - (1 - t)^4
        const easeOut = 1 - Math.pow(1 - rawProgress, 4);

        const nextCounts: { [key: string]: number } = {};
        STATS.forEach((stat) => {
          if (rawProgress >= 1) {
            nextCounts[stat.key] = stat.target;
          } else {
            nextCounts[stat.key] = Math.round(stat.target * easeOut);
          }
        });

        setCounts(nextCounts);

        if (rawProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        }
      };

      animationFrameRef.current = requestAnimationFrame(step);
    };

    const targetEl = containerRef.current;
    if (!targetEl) return;

    // 1. Intersection Observer Trigger
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            startAnimation();
            if (observer && targetEl) {
              observer.unobserve(targetEl);
            }
          }
        },
        { 
          threshold: 0.05,
          rootMargin: '100px 0px 100px 0px'
        }
      );
      observer.observe(targetEl);
    }

    // 2. Immediate Viewport Check
    const checkVisibility = () => {
      if (hasTriggeredRef.current || !targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight + 100 && rect.bottom >= -100) {
        startAnimation();
      }
    };

    checkVisibility();

    // 3. Fallback Scroll Listener
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // 4. Safety Fallback: Ensure numbers are never left at 0 if user rolled quickly
    const fallbackTimer = setTimeout(() => {
      checkVisibility();
    }, 600);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      clearTimeout(fallbackTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [autoCount]);

  return (
    <div 
      ref={containerRef}
      id="stat-impact-band"
      className={`bg-gradient-to-r from-[#1D4FD8] via-[#2563EB] to-[#1E40AF] text-white py-14 sm:py-16 px-6 relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => {
            const currentNum = counts[stat.key] ?? stat.target;
            const formattedNumber = currentNum.toLocaleString('en-US');

            return (
              <div 
                key={stat.key} 
                className={`flex flex-col items-center text-center px-3 sm:px-4 relative ${
                  idx < STATS.length - 1 ? 'lg:border-r lg:border-white/15' : ''
                }`}
              >
                <div 
                  className={`min-h-[56px] font-['Poppins'] font-bold text-[38px] sm:text-[44px] lg:text-[50px] leading-none tracking-tight flex items-baseline justify-center tabular-nums ${
                    stat.accent ? 'text-[#F59E0B] drop-shadow-sm' : 'text-white'
                  }`}
                >
                  <span>{formattedNumber}</span>
                  <span className="text-[28px] sm:text-[34px] lg:text-[38px] font-semibold ml-0.5">
                    {stat.suffix}
                  </span>
                </div>

                <p className="font-['Inter'] text-[13px] sm:text-[14.5px] font-medium text-white/90 mt-2 max-w-[160px] leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



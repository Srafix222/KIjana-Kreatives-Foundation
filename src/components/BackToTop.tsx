import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackToTopProps {
  currentPage?: string;
  className?: string;
  showProgress?: boolean;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  currentPage,
  className = '',
  showProgress = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Check scroll position relative to the hero section
  const evaluateVisibility = useCallback(() => {
    // 1. Calculate overall page scroll progress (0 to 100)
    const docElement = document.documentElement;
    const totalScrollableHeight = docElement.scrollHeight - window.innerHeight;
    
    if (totalScrollableHeight > 0) {
      const currentProgress = (window.scrollY / totalScrollableHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
    } else {
      setScrollProgress(0);
    }

    // 2. Identify the active hero element for current page
    const heroElement = document.querySelector<HTMLElement>(
      '[data-hero="true"], #home-hero, #page-hero, main > section:first-of-type, main section:first-of-type'
    );

    if (heroElement) {
      const rect = heroElement.getBoundingClientRect();
      // When the bottom of the hero is scrolled past or at top of viewport (offset by 20px)
      const isPast = rect.bottom <= 40;
      setIsVisible(isPast);
    } else {
      // Fallback threshold if no hero section is identified
      setIsVisible(window.scrollY > 380);
    }
  }, []);

  // Listen to window scroll & resize
  useEffect(() => {
    // Initial evaluation
    evaluateVisibility();

    const handleScrollOrResize = () => {
      evaluateVisibility();
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [evaluateVisibility, currentPage]);

  // Also setup IntersectionObserver on the hero element if present for instant reactive boundary triggers
  useEffect(() => {
    const heroElement = document.querySelector<HTMLElement>(
      '[data-hero="true"], #home-hero, #page-hero, main > section:first-of-type, main section:first-of-type'
    );

    if (!heroElement || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is intersecting, user is still in hero -> not visible
        // When hero is not intersecting and boundingClientRect is above viewport top -> visible
        if (entry.isIntersecting) {
          setIsVisible(false);
        } else if (entry.boundingClientRect.top < 0) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  // Reset visibility when route changes
  useEffect(() => {
    setIsVisible(false);
    // Give DOM a tick to paint new page hero before re-evaluating
    const timer = setTimeout(() => {
      evaluateVisibility();
    }, 120);
    return () => clearTimeout(timer);
  }, [currentPage, evaluateVisibility]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress dimensions
  const circleRadius = 20;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 ${className}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Optional Tooltip label on desktop hover */}
          <div
            className={`absolute bottom-full right-0 mb-2.5 px-3 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-['Poppins'] font-semibold tracking-wide shadow-md border border-slate-700/60 pointer-events-none whitespace-nowrap transition-all duration-200 hidden sm:block ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            <span>Back to top</span>
            {/* Tooltip caret */}
            <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-[#0F172A]" />
          </div>

          <button
            type="button"
            id="back-to-top-button"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0F172A] text-white border border-slate-700/70 shadow-lg shadow-black/25 hover:bg-[#1E293B] hover:border-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/15 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]"
          >
            {/* Subtle Circular Progress Indicator */}
            {showProgress && (
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                {/* Background track */}
                <circle
                  cx="24"
                  cy="24"
                  r={circleRadius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="2.5"
                />
                {/* Active progress stroke */}
                <circle
                  cx="24"
                  cy="24"
                  r={circleRadius}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-100 ease-out"
                />
              </svg>
            )}

            {/* Central Arrow Icon with micro-bounce on hover */}
            <ArrowUp 
              className="w-5 h-5 text-white group-hover:-translate-y-0.5 group-hover:text-amber-400 transition-all duration-200" 
              strokeWidth={2.4}
            />

            <span className="sr-only">Scroll back to top</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

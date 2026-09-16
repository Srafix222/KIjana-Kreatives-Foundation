import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Story, PageId } from '../types';
import { STORIES } from '../data/content';
import { ImagePlaceholder } from './ImagePlaceholder';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Award,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  RotateCcw
} from 'lucide-react';
import { TestimonialCardSkeleton } from './Skeleton';

interface TestimonialsCarouselProps {
  stories?: Story[];
  onNavigate?: (page: PageId) => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  isLoading?: boolean;
}

const AUTOPLAY_INTERVAL = 8000; // 8 seconds per testimonial

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  stories = STORIES,
  onNavigate,
  title = "From Tuition-Free Training to Paid Creative Careers",
  subtitle = "Behind every metric in our audit reports are real young Kenyans who gained access to professional equipment, industry mentorship, and verified portfolios.",
  badge = "Alumni Voices & Outgrowth",
  className = "",
  isLoading: externalLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isFilterTransitioning, setIsFilterTransitioning] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Initial simulated hydration for smooth perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterSelect = (catId: string) => {
    if (catId === selectedFilter) return;
    setIsFilterTransitioning(true);
    setSelectedFilter(catId);
    setTimeout(() => {
      setIsFilterTransitioning(false);
    }, 280);
  };

  const handleManualRefresh = () => {
    setIsFilterTransitioning(true);
    setTimeout(() => {
      setIsFilterTransitioning(false);
    }, 380);
  };

  // Filter categories
  const categories = [
    { id: 'all', label: 'All Alumni', count: stories.length },
    { id: 'film-photo', label: 'Film & Photography', count: stories.filter(s => s.field.includes('Film') || s.field.includes('Photography')).length },
    { id: 'design-product', label: 'Design & UI/UX', count: stories.filter(s => s.field.includes('Design') || s.field.includes('UI/UX')).length },
    { id: 'animation-sound', label: 'Animation & Sound', count: stories.filter(s => s.field.includes('Animation') || s.field.includes('Sound')).length },
  ];

  const filteredStories = stories.filter((story) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'film-photo') return story.field.includes('Film') || story.field.includes('Photography');
    if (selectedFilter === 'design-product') return story.field.includes('Design') || story.field.includes('UI/UX');
    if (selectedFilter === 'animation-sound') return story.field.includes('Animation') || story.field.includes('Sound');
    return true;
  });

  const total = filteredStories.length;
  const showSkeleton = externalLoading ?? (isInitialLoading || isFilterTransitioning);

  // Reset index if filtered list length shrinks
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  const currentStory = filteredStories[currentIndex] || filteredStories[0] || stories[0];

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleGoTo = (index: number) => {
    if (index === currentIndex || total <= 1) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, total, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  if (!currentStory) return null;

  return (
    <section
      id="testimonials-carousel"
      aria-roledescription="carousel"
      aria-label="Alumni Success Stories"
      className={`relative w-full py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E8EDF4] ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5FF] border border-[#2563EB]/20 text-[#2563EB] text-xs font-['Poppins'] font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{badge}</span>
            </div>
            <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[38px] text-[#0F172A] leading-[1.15] tracking-[-0.025em]">
              {title}
            </h2>
            <p className="font-['Inter'] text-[15.5px] sm:text-[17px] text-[#475569] mt-3 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Quick Stats / Action Links */}
          <div className="flex items-center gap-3 shrink-0">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('stories')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] font-['Poppins'] font-semibold text-xs border border-[#E8EDF4] shadow-xs transition-all cursor-pointer"
              >
                <span>All 12+ Alumni Journeys</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterSelect(cat.id)}
                className={`px-4 py-2 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedFilter === cat.id
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white text-[#475569] border border-[#E8EDF4] hover:border-[#2563EB] hover:text-[#2563EB]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] tabular-nums ${
                  selectedFilter === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#64748B]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={showSkeleton}
            title="Reload alumni story showcase"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8EDF4] text-xs font-['Poppins'] font-medium text-[#475569] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${showSkeleton ? 'animate-spin text-[#2563EB]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Main Testimonial Showcase Card */}
        <div
          className="relative bg-white rounded-[28px] md:rounded-[32px] border border-[#E8EDF4] shadow-[0_12px_44px_rgba(15,23,42,0.05)] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-busy={showSkeleton}
        >
          {/* Subtle Top Progress Bar for Autoplay */}
          {!showSkeleton && isPlaying && !isHovered && total > 1 && (
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-100 z-20">
              <motion.div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#F59E0B]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
              />
            </div>
          )}

          {showSkeleton ? (
            <TestimonialCardSkeleton />
          ) : (
            <div className="p-6 sm:p-10 md:p-14 animate-kkf-rise">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStory.slug}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                
                {/* Left Column: Student Image, Badges & Capstone Highlight */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                  <div className="relative w-full max-w-[360px] aspect-square sm:aspect-[4/4.2] rounded-[24px] overflow-hidden border-2 border-[#E8EDF4] shadow-md bg-slate-100 group">
                    <ImagePlaceholder
                      src={currentStory.avatar}
                      fallbackText={currentStory.avatarPlaceholderText}
                      alt={currentStory.name}
                      aspectRatio="1:1"
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay for metadata chip legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent pointer-events-none" />

                    {/* Top verified badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#0F172A] text-[11px] font-['Poppins'] font-bold shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Verified KKF Alumnus</span>
                    </div>

                    {/* Bottom Metadata inside Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 font-['Poppins'] font-semibold">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{currentStory.county}</span>
                      </div>
                      <p className="font-['Poppins'] font-bold text-base text-white truncate">
                        {currentStory.name}
                      </p>
                    </div>
                  </div>

                  {/* Capstone Achievement Card */}
                  {currentStory.highlightWork && (
                    <div className="w-full max-w-[360px] mt-4 p-4 rounded-[18px] bg-[#EFF5FF] border border-[#2563EB]/20 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-['Poppins'] font-bold text-[#0F172A] block uppercase tracking-wider text-[10.5px]">
                          Graduation Capstone Highlight
                        </span>
                        <p className="text-[#334155] font-['Inter'] mt-0.5 leading-snug">
                          {currentStory.highlightWork}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: The Quote, Role, Story details & Navigation */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  
                  {/* Discipline Chip & Published date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-['Poppins'] font-semibold text-xs">
                      <Briefcase className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{currentStory.field}</span>
                    </span>

                    <span className="text-xs text-[#64748B] font-mono">
                      Graduation Cohort · {currentStory.county}
                    </span>
                  </div>

                  {/* Decorative Quote Icon & The Quote text */}
                  <div className="space-y-4">
                    <Quote className="w-12 h-12 text-[#2563EB]/20 -mb-2" />
                    <blockquote className="font-['Inter'] text-[18px] sm:text-[21px] md:text-[23px] text-[#0F172A] font-medium leading-[1.60] tracking-[-0.015em]">
                      {currentStory.quote}
                    </blockquote>
                  </div>

                  {/* Graduate Identification & Current Placement */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="font-['Poppins'] font-bold text-[22px] sm:text-[26px] text-[#0F172A] leading-tight">
                      {currentStory.name}
                    </h3>
                    <p className="font-['Poppins'] text-sm sm:text-[15px] font-semibold text-[#2563EB] mt-1 flex items-center gap-1.5">
                      <span>{currentStory.role}</span>
                    </p>
                    {currentStory.bio && (
                      <p className="font-['Inter'] text-xs sm:text-[13.5px] text-[#64748B] mt-2 leading-relaxed">
                        {currentStory.bio}
                      </p>
                    )}
                  </div>

                  {/* Direct Action Buttons for this student's pathway */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    {onNavigate && (
                      <>
                        <button
                          type="button"
                          onClick={() => onNavigate('programs')}
                          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4FD8] active:scale-95 text-white font-['Poppins'] font-semibold text-xs shadow-sm hover:shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <span>Explore {currentStory.field.split('&')[0].trim()} Syllabus</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigate('get-involved')}
                          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all cursor-pointer"
                        >
                          Apply for Free Training
                        </button>
                      </>
                    )}
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        )}

          {/* Carousel Controls Footer Bar */}
          <div className="bg-[#F8FAFC] border-t border-[#E8EDF4] px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Slide Index Counter & Autoplay Control */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] bg-white px-3 py-1 rounded-lg border border-[#E8EDF4]">
                {showSkeleton ? '-- / --' : `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
              </span>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={showSkeleton}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-['Poppins'] font-semibold text-[#475569] hover:text-[#0F172A] bg-white border border-[#E8EDF4] hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40"
                title={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Pagination Thumbnails / Dots */}
            <div className="flex items-center gap-1.5 max-w-full overflow-x-auto py-1">
              {filteredStories.map((story, idx) => (
                <button
                  key={story.slug}
                  type="button"
                  onClick={() => handleGoTo(idx)}
                  disabled={showSkeleton}
                  className={`group relative py-1.5 px-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-2 disabled:pointer-events-none ${
                    idx === currentIndex && !showSkeleton
                      ? 'bg-white shadow-xs border border-[#2563EB]/40'
                      : 'hover:bg-white/60 border border-transparent'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${story.name}`}
                  aria-current={idx === currentIndex ? 'true' : 'false'}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentIndex && !showSkeleton
                        ? 'bg-[#2563EB] scale-110'
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}
                  />
                  <span className={`text-[11px] font-['Poppins'] font-medium hidden md:inline truncate max-w-[90px] ${
                    idx === currentIndex && !showSkeleton ? 'text-[#0F172A] font-semibold' : 'text-[#64748B]'
                  }`}>
                    {story.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Previous & Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={total <= 1 || showSkeleton}
                className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 active:scale-95 text-[#0F172A] hover:text-[#2563EB] border border-[#E8EDF4] hover:border-[#2563EB]/40 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={total <= 1 || showSkeleton}
                className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 active:scale-95 text-[#0F172A] hover:text-[#2563EB] border border-[#E8EDF4] hover:border-[#2563EB]/40 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

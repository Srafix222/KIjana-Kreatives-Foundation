import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  dark?: boolean;
}

/**
 * Base atomic Skeleton component with high-performance CSS shimmer highlight
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  dark = false,
}) => {
  const variantStyles = {
    text: 'h-4 rounded-sm',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
    circular: 'rounded-full',
  };

  const shimmerClass = dark ? 'skeleton-shimmer-dark' : 'skeleton-shimmer';

  return (
    <div
      aria-hidden="true"
      className={`${shimmerClass} ${variantStyles[variant]} ${className}`}
    />
  );
};

interface ProgramCardSkeletonProps {
  dark?: boolean;
}

/**
 * High-fidelity Skeleton for Program Cards (exact layout match for ProgramsPage & HomePage)
 */
export const ProgramCardSkeleton: React.FC<ProgramCardSkeletonProps> = ({ dark = false }) => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading program details"
      className={`${
        dark
          ? 'bg-[#16223A] border-white/10'
          : 'bg-white border-[#E8EDF4]'
      } rounded-[26px] overflow-hidden border shadow-sm flex flex-col justify-between`}
    >
      {/* 1. Header Image Skeleton */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Skeleton dark={dark} variant="rectangular" className="w-full h-full" />
        
        {/* Category Badge Placeholder */}
        <div className="absolute top-3 left-3">
          <Skeleton
            dark={dark}
            variant="rounded"
            className={`w-24 h-6 ${dark ? 'bg-white/10' : 'bg-white/80'} rounded-[100px]`}
          />
        </div>

        {/* Duration Badge Placeholder */}
        <div className="absolute top-3 right-3">
          <Skeleton
            dark={dark}
            variant="rounded"
            className={`w-20 h-6 ${dark ? 'bg-white/10' : 'bg-white/80'} rounded-[100px]`}
          />
        </div>
      </div>

      {/* 2. Body Details Skeleton */}
      <div className="p-7 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata chips (level · location · cost) */}
          <div className="flex items-center gap-2 mb-3">
            <Skeleton dark={dark} className="w-16 h-3 rounded-md" />
            <span className={dark ? 'text-white/20' : 'text-slate-300'}>·</span>
            <Skeleton dark={dark} className="w-20 h-3 rounded-md" />
            <span className={dark ? 'text-white/20' : 'text-slate-300'}>·</span>
            <Skeleton dark={dark} className="w-24 h-3 rounded-md" />
          </div>

          {/* Program Title */}
          <div className="space-y-2 mb-3">
            <Skeleton dark={dark} className="w-4/5 h-6 rounded-lg" />
            <Skeleton dark={dark} className="w-1/2 h-6 rounded-lg" />
          </div>

          {/* Description Lines */}
          <div className="space-y-2 mb-5">
            <Skeleton dark={dark} className="w-full h-3.5 rounded-sm" />
            <Skeleton dark={dark} className="w-11/12 h-3.5 rounded-sm" />
            <Skeleton dark={dark} className="w-4/5 h-3.5 rounded-sm" />
          </div>

          {/* Schedule / Eligibility Specs Box */}
          <div
            className={`p-3.5 rounded-[14px] mb-6 space-y-2.5 ${
              dark
                ? 'bg-white/[0.04] border border-white/5'
                : 'bg-[#F8FAFC] border border-[#E8EDF4]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Skeleton dark={dark} className="w-16 h-3 rounded-sm" />
              <Skeleton dark={dark} className="w-32 h-3 rounded-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton dark={dark} className="w-16 h-3 rounded-sm" />
              <Skeleton dark={dark} className="w-44 h-3 rounded-sm" />
            </div>
          </div>
        </div>

        {/* 3. Footer Action Skeleton */}
        <div
          className={`pt-4 border-t flex items-center justify-between gap-3 ${
            dark ? 'border-white/10' : 'border-[#E8EDF4]'
          }`}
        >
          <Skeleton dark={dark} className="w-28 h-4 rounded-md" />
          <Skeleton dark={dark} className="w-24 h-9 rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};

interface ProgramsListSkeletonProps {
  count?: number;
  dark?: boolean;
}

/**
 * Grid of Program Skeletons
 */
export const ProgramsListSkeleton: React.FC<ProgramsListSkeletonProps> = ({
  count = 6,
  dark = false,
}) => {
  return (
    <div
      role="status"
      aria-label="Loading programs catalogue"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <ProgramCardSkeleton key={idx} dark={dark} />
      ))}
      <span className="sr-only">Loading programs catalog...</span>
    </div>
  );
};

interface TestimonialCardSkeletonProps {
  className?: string;
}

/**
 * High-fidelity Skeleton for the Main Testimonials Carousel Slide
 */
export const TestimonialCardSkeleton: React.FC<TestimonialCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading testimonial showcase"
      className={`p-6 sm:p-10 md:p-14 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column: Media / Avatar Image & Capstone Box */}
        <div className="lg:col-span-5 flex flex-col items-center sm:items-start w-full">
          {/* Main Visual Skeleton */}
          <div className="relative w-full max-w-[360px] aspect-square sm:aspect-[4/4.2] rounded-[24px] overflow-hidden border-2 border-[#E8EDF4] bg-slate-100 shadow-sm">
            <Skeleton variant="rectangular" className="w-full h-full" />

            {/* Verified Alumni Chip */}
            <div className="absolute top-4 left-4">
              <Skeleton className="w-28 h-7 rounded-[100px] bg-white/90" />
            </div>

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <Skeleton className="w-3/4 h-5 rounded-md bg-white/80" />
            </div>
          </div>

          {/* Capstone Project Showcase Box Skeleton */}
          <div className="w-full max-w-[360px] mt-4 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E8EDF4]">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="w-28 h-3 rounded-md" />
              <Skeleton className="w-16 h-3 rounded-md" />
            </div>
            <Skeleton className="w-5/6 h-4 rounded-md mb-1.5" />
            <Skeleton className="w-full h-3 rounded-sm" />
          </div>
        </div>

        {/* Right Column: Quote, Author, Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Track Chip & Cohort Year */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Skeleton className="w-32 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>

          {/* Quote Icon Skeleton */}
          <Skeleton className="w-10 h-10 rounded-xl mb-4" />

          {/* Multi-line Testimonial Quote */}
          <div className="space-y-3 mb-6">
            <Skeleton className="w-full h-6 rounded-lg" />
            <Skeleton className="w-[96%] h-6 rounded-lg" />
            <Skeleton className="w-[88%] h-6 rounded-lg" />
            <Skeleton className="w-[65%] h-6 rounded-lg" />
          </div>

          {/* Author Name, Role & Location */}
          <div className="pt-6 border-t border-[#E8EDF4] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="w-48 h-6 rounded-lg" />
                <Skeleton className="w-64 h-4 rounded-md" />
              </div>
              <Skeleton className="w-32 h-4 rounded-md" />
            </div>

            {/* Bio summary snippet */}
            <div className="mt-4 p-3.5 rounded-[12px] bg-[#F8FAFC] border border-[#E8EDF4] space-y-2">
              <Skeleton className="w-full h-3.5 rounded-sm" />
              <Skeleton className="w-4/5 h-3.5 rounded-sm" />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="w-36 h-10 rounded-xl" />
            <Skeleton className="w-32 h-10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsCarouselSkeletonProps {
  className?: string;
  badge?: string;
  title?: string;
}

/**
 * Complete Testimonials Carousel Section Skeleton
 */
export const TestimonialsCarouselSkeleton: React.FC<TestimonialsCarouselSkeletonProps> = ({
  className = '',
}) => {
  return (
    <section
      role="status"
      aria-label="Loading impact testimonials"
      className={`py-16 sm:py-24 border-y border-[#E8EDF4] bg-[#F8FAFC] ${className}`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[720px] space-y-3">
            <Skeleton className="w-36 h-6 rounded-full" />
            <Skeleton className="w-3/4 sm:w-4/5 h-9 sm:h-11 rounded-xl" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-5/6 h-4 rounded-md" />
          </div>
          <Skeleton className="w-44 h-10 rounded-xl shrink-0" />
        </div>

        {/* Filter Pills Skeleton */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Skeleton className="w-28 h-9 rounded-[100px]" />
          <Skeleton className="w-36 h-9 rounded-[100px]" />
          <Skeleton className="w-36 h-9 rounded-[100px]" />
          <Skeleton className="w-40 h-9 rounded-[100px]" />
        </div>

        {/* Main Card Container */}
        <div className="relative bg-white rounded-[28px] md:rounded-[32px] border border-[#E8EDF4] shadow-[0_12px_44px_rgba(15,23,42,0.05)] overflow-hidden">
          <TestimonialCardSkeleton />

          {/* Bottom Controls Bar Skeleton */}
          <div className="px-6 sm:px-10 py-4 bg-[#F8FAFC] border-t border-[#E8EDF4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-20 h-4 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-8 h-2.5 rounded-full" />
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading alumni testimonials...</span>
    </section>
  );
};

interface StoriesGridSkeletonProps {
  count?: number;
}

/**
 * Skeleton for Stories & Journeys Grid Cards (StoriesPage)
 */
export const StoriesGridSkeleton: React.FC<StoriesGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div
      role="status"
      aria-label="Loading student journeys"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm flex flex-col justify-between"
        >
          <div>
            <Skeleton className="w-8 h-8 rounded-lg mb-4" />
            <div className="space-y-2 mb-6">
              <Skeleton className="w-full h-4 rounded-sm" />
              <Skeleton className="w-11/12 h-4 rounded-sm" />
              <Skeleton className="w-4/5 h-4 rounded-sm" />
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8EDF4] flex items-center gap-4">
            <Skeleton variant="circular" className="w-[52px] h-[52px] shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="w-3/4 h-4 rounded-md" />
              <Skeleton className="w-1/2 h-3.5 rounded-md" />
              <Skeleton className="w-2/3 h-3 rounded-md" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading alumni journeys...</span>
    </div>
  );
};

interface ImpactMetricsSkeletonProps {
  count?: number;
}

/**
 * Skeleton for Impact Audited Metrics Cards (ImpactPage)
 */
export const ImpactMetricsSkeleton: React.FC<ImpactMetricsSkeletonProps> = ({ count = 4 }) => {
  return (
    <div
      role="status"
      aria-label="Loading verified impact metrics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-[24px] p-7 border border-[#E8EDF4] shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-4 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
          <Skeleton className="w-28 h-10 rounded-lg" />
          <Skeleton className="w-3/4 h-5 rounded-md" />
          <Skeleton className="w-full h-3.5 rounded-sm" />
        </div>
      ))}
      <span className="sr-only">Loading impact metrics...</span>
    </div>
  );
};

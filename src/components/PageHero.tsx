import React from 'react';
import { BreadcrumbItem, PageId } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: React.ReactNode;
  badgeColor?: 'amber' | 'blue' | 'emerald';
  breadcrumbs?: BreadcrumbItem[];
  onNavigate?: (page: PageId, programSlug?: string) => void;
  onBack?: () => void;
  backLabel?: string;
  showBackButton?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  description,
  imageSrc,
  imageAlt = 'Kijana Kreatives Foundation creative apprentices and studio sessions',
  imagePosition = 'object-center',
  children,
  badgeColor = 'amber',
  breadcrumbs,
  onNavigate,
  onBack,
  backLabel,
  showBackButton = true,
}) => {
  const badgeColors = {
    amber: 'text-[#F59E0B]',
    blue: 'text-[#60A5FA]',
    emerald: 'text-[#34D399]',
  };

  // Contextual back resolution
  const handleBackClick = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (onNavigate) {
      // Check if breadcrumbs has a parent step
      if (breadcrumbs && breadcrumbs.length > 1) {
        const parent = breadcrumbs[breadcrumbs.length - 2];
        if (parent?.page) {
          onNavigate(parent.page, parent.slug);
          return;
        }
      }
      onNavigate('home');
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  };

  // Determine intuitive label if not explicitly provided
  let resolvedBackLabel = backLabel;
  if (!resolvedBackLabel) {
    if (breadcrumbs && breadcrumbs.length > 1) {
      const parent = breadcrumbs[breadcrumbs.length - 2];
      resolvedBackLabel = parent?.label ? `Back to ${parent.label}` : 'Back';
    } else {
      resolvedBackLabel = 'Back to Home';
    }
  }

  return (
    <section 
      id="page-hero"
      data-hero="true"
      className="relative bg-[#0B1329] text-white pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 overflow-hidden border-b border-slate-800/60"
    >
      {/* 1. Ambient Brand Lighting & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-Right Royal Blue Glow */}
        <div className="absolute -top-24 -right-24 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full bg-blue-600/18 blur-[100px] sm:blur-[120px]" />
        
        {/* Ambient Amber Glow */}
        <div className="absolute -bottom-24 left-[10%] sm:left-[25%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-amber-500/10 blur-[90px] sm:blur-[110px]" />

        {/* Micro Grid Overlay for Subtle Depth */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* 2. Contextual Imagery with High Clarity and Directional Scrim */}
      {imageSrc && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
          aria-hidden="true"
        >
          {/* Background image - crisp, authentic documentary color, high visibility */}
          <img
            src={imageSrc}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${imagePosition} opacity-80 sm:opacity-85 md:opacity-90 contrast-[1.05] brightness-[0.96] transition-opacity duration-700`}
          />

          {/* Directional Horizontal Scrim: Solid contrast on left for typography, opening up to vibrant photography on right */}
          <div 
            className="absolute inset-0 hidden sm:block"
            style={{
              background: 'linear-gradient(90deg, #0B1329 0%, rgba(11,19,41,0.92) 34%, rgba(11,19,41,0.60) 62%, rgba(11,19,41,0.22) 86%, rgba(11,19,41,0.10) 100%)',
            }}
          />

          {/* Mobile Scrim: Softened vertical gradient ensuring text legibility without burying the image */}
          <div 
            className="absolute inset-0 sm:hidden bg-gradient-to-t from-[#0B1329] via-[#0B1329]/75 to-[#0B1329]/35" 
          />

          {/* Top & Bottom Vignette for seamless navigation & section boundary blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1329]/75 via-transparent to-[#0B1329] pointer-events-none" />
        </div>
      )}

      {/* 3. Foreground Typography & Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 animate-kkf-rise">
        {/* Contextual Navigation Bar (Back Button & Breadcrumbs) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          {showBackButton && (
            <button
              type="button"
              onClick={handleBackClick}
              id="page-hero-back-button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[100px] bg-white/[0.08] hover:bg-white/[0.18] text-white border border-white/15 backdrop-blur-md transition-all text-xs font-['Poppins'] font-semibold cursor-pointer active:scale-95 shadow-xs group"
              title={resolvedBackLabel}
              aria-label={resolvedBackLabel}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{resolvedBackLabel}</span>
            </button>
          )}

          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs 
              items={breadcrumbs} 
              onNavigate={onNavigate} 
              variant="dark"
              className="px-3 py-1.5 rounded-[100px] bg-white/[0.06] backdrop-blur-md border border-white/10"
            />
          )}
        </div>

        <div className="max-w-[820px]">
          {/* Eyebrow */}
          <span className={`font-['Poppins'] font-semibold text-xs sm:text-[12.5px] tracking-[0.16em] uppercase block mb-3 sm:mb-4 ${badgeColors[badgeColor]}`}>
            {badge}
          </span>

          {/* Heading */}
          <h1 className="font-['Poppins'] font-bold text-[30px] xs:text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6 text-white drop-shadow-xs">
            {title}
          </h1>

          {/* Description */}
          <p className="font-['Inter'] text-base sm:text-[18px] md:text-[20px] text-slate-200/90 leading-[1.65] font-normal max-w-[680px]">
            {description}
          </p>

          {/* Optional Action Cluster (e.g. pathway buttons on Get Involved) */}
          {children && (
            <div className="mt-6 sm:mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { BreadcrumbItem, PageId } from '../types';
import { Breadcrumbs } from './Breadcrumbs';

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
}) => {
  const badgeColors = {
    amber: 'text-[#F59E0B]',
    blue: 'text-[#60A5FA]',
    emerald: 'text-[#34D399]',
  };

  return (
    <section className="relative bg-[#0B1329] text-white pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 md:pb-24 overflow-hidden border-b border-slate-800/60">
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

      {/* 2. Contextual Imagery on Right Side (Option 3 for Storytelling Pages) */}
      {imageSrc && (
        <div 
          className="absolute right-0 top-0 bottom-0 w-full sm:w-[65%] md:w-[52%] lg:w-[46%] pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          {/* Background image */}
          <img
            src={imageSrc}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover ${imagePosition} opacity-20 sm:opacity-25 lg:opacity-30 mix-blend-luminosity brightness-90 contrast-110`}
          />

          {/* Dissolve gradients ensuring 100% text readability */}
          {/* Left-edge smooth fade into the deep navy canvas */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-48 md:w-64 bg-gradient-to-r from-[#0B1329] via-[#0B1329]/80 to-transparent" />
          
          {/* Full overlay tone mapping */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1329] via-[#0B1329]/50 to-[#0B1329]/80" />
          <div className="absolute inset-0 bg-blue-950/25 mix-blend-multiply" />
        </div>
      )}

      {/* 3. Foreground Typography & Content */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 animate-kkf-rise">
        {/* Breadcrumb Navigation Trail */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <Breadcrumbs 
              items={breadcrumbs} 
              onNavigate={onNavigate} 
              variant="dark"
              className="px-3 py-1.5 rounded-[100px] bg-white/[0.06] backdrop-blur-md border border-white/10"
            />
          </div>
        )}

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

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { ChevronDown, ArrowRight, Sparkles, Heart, Palette, Film, Box, Headphones, Layout, Cpu } from 'lucide-react';
import { KKFIconMark } from './BrandLogo';
import { MobileMenu } from './MobileMenu';

interface NavProps {
  currentPage: PageId;
  onNavigate: (page: PageId, programSlug?: string) => void;
}

export const Nav: React.FC<NavProps> = ({ currentPage, onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const backdropOpacity = Math.min(1, scrollY / 140);

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setProgramsOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setProgramsOpen(false);
    }, 200);
  };

  const handleLinkClick = (page: PageId, programSlug?: string) => {
    setProgramsOpen(false);
    setMobileMenuOpen(false);
    onNavigate(page, programSlug);
  };

  return (
    <>
      <header 
        id="main-navigation"
        className="fixed top-0 left-0 w-full h-[72px] md:h-[80px] z-[200] transition-all duration-300"
        style={{
          backgroundColor: backdropOpacity > 0.05 
            ? `rgba(15, 23, 42, ${Math.max(0.85, backdropOpacity)})` 
            : 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid rgba(255, 255, 255, ${Math.max(0.08, backdropOpacity * 0.15)})`,
          boxShadow: backdropOpacity > 0.3 ? '0 10px 30px -10px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Lockup */}
          <button
            id="nav-brand-logo"
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl shrink-0"
            aria-label="Kijana Kreatives Foundation Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] bg-white flex items-center justify-center p-1 shadow-md shadow-black/30 group-hover:scale-105 transition-transform">
              <KKFIconMark className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1 leading-none">
                <span className="font-['Poppins'] font-bold text-[17px] sm:text-[18px] text-[#2563EB] tracking-tight">
                  Kijana
                </span>
                <span className="font-['Poppins'] font-bold text-[15px] sm:text-[16px] text-white tracking-tight">
                  Kreatives
                </span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-widest text-slate-400 uppercase mt-0.5 font-['Poppins']">
                Foundation
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
            <button
              id="nav-link-home"
              type="button"
              onClick={() => handleLinkClick('home')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'home' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              type="button"
              onClick={() => handleLinkClick('about')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'about' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              About
            </button>

            {/* Programs Mega-Menu Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-link-programs-toggle"
                type="button"
                onClick={() => handleLinkClick('programs')}
                className={`font-['Inter'] font-medium text-[14px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentPage === 'programs' 
                    ? 'text-amber-400 font-semibold' 
                    : 'text-white/85 hover:text-white'
                }`}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                <span>Programs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${programsOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {/* 740px Mega-Menu Panel */}
              {programsOpen && (
                <div 
                  id="programs-mega-menu"
                  className="absolute top-full -left-28 xl:-left-36 w-[740px] bg-white rounded-[22px] p-7 shadow-[0_24px_60px_rgba(15,23,42,0.24)] border border-[#E8EDF4] grid grid-cols-3 gap-6 z-50 text-left animate-kkf-rise"
                >
                  {/* Col 1: Creative Academy */}
                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[12px] uppercase tracking-wider text-[#2563EB] mb-3 pb-2 border-b border-[#E8EDF4] flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Creative Academy</span>
                    </h3>
                    <ul className="space-y-1">
                      {[
                        { name: 'Graphic Design', slug: 'graphic-design' },
                        { name: 'Photography & Video', slug: 'photography-videography' },
                        { name: 'Animation & Motion', slug: 'animation-motion-graphics' },
                        { name: 'Music Production', slug: 'music-production' },
                      ].map((item) => (
                        <li key={item.slug}>
                          <button
                            type="button"
                            onClick={() => handleLinkClick('programs', item.slug)}
                            className="text-[13.5px] text-[#334155] hover:text-[#2563EB] hover:bg-blue-50/90 px-2.5 py-1.5 rounded-[10px] -mx-2.5 transition-all text-left flex items-center justify-between w-[calc(100%+20px)] group/item cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#2563EB]" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 2: Digital Academy */}
                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[12px] uppercase tracking-wider text-[#2563EB] mb-3 pb-2 border-b border-[#E8EDF4] flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Digital Academy</span>
                    </h3>
                    <ul className="space-y-1">
                      {[
                        { name: 'Web & UI/UX Design', slug: 'web-ui-ux-design' },
                        { name: 'AI for Creatives', slug: 'ai-for-creatives' },
                        { name: 'Digital Marketing', slug: 'digital-marketing' },
                        { name: 'Creative Business', slug: 'creative-business' },
                      ].map((item) => (
                        <li key={item.slug}>
                          <button
                            type="button"
                            onClick={() => handleLinkClick('programs', item.slug)}
                            className="text-[13.5px] text-[#334155] hover:text-[#2563EB] hover:bg-blue-50/90 px-2.5 py-1.5 rounded-[10px] -mx-2.5 transition-all text-left flex items-center justify-between w-[calc(100%+20px)] group/item cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#2563EB]" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: Opportunities */}
                  <div className="bg-[#EFF5FF]/80 -m-2 p-5 rounded-[16px] border border-[#2563EB]/15 flex flex-col justify-between">
                    <div>
                      <h3 className="font-['Poppins'] font-bold text-[12px] uppercase tracking-wider text-[#F59E0B] mb-3 pb-2 border-b border-[#F59E0B]/25 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Opportunities</span>
                      </h3>
                      <ul className="space-y-1">
                        {[
                          { name: 'Mentorship Track', slug: 'mentorship-track' },
                          { name: 'Internship Placement', slug: 'internship-placement' },
                          { name: 'Creative Challenges', slug: 'creative-challenges' },
                          { name: 'Scholarships', slug: 'scholarships' },
                        ].map((item) => (
                          <li key={item.slug}>
                            <button
                              type="button"
                              onClick={() => handleLinkClick('programs', item.slug)}
                              className="text-[13.5px] font-medium text-[#0F172A] hover:text-[#D97706] hover:bg-amber-100/60 px-2 py-1.5 rounded-[8px] -mx-2 transition-all text-left flex items-center justify-between w-[calc(100%+16px)] group/item cursor-pointer"
                            >
                              <span>{item.name}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('programs')}
                      className="mt-3 pt-2.5 border-t border-[#2563EB]/20 text-[12.5px] font-semibold text-[#2563EB] hover:text-[#1D4FD8] flex items-center justify-between w-full transition-colors cursor-pointer"
                    >
                      <span>Explore all 12 tracks</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-link-impact"
              type="button"
              onClick={() => handleLinkClick('impact')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'impact' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              Impact
            </button>

            <button
              id="nav-link-stories"
              type="button"
              onClick={() => handleLinkClick('stories')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'stories' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              Stories
            </button>

            <button
              id="nav-link-get-involved"
              type="button"
              onClick={() => handleLinkClick('get-involved')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'get-involved' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              Get Involved
            </button>

            <button
              id="nav-link-resources"
              type="button"
              onClick={() => handleLinkClick('resources')}
              className={`font-['Inter'] font-medium text-[14px] transition-colors py-1 cursor-pointer ${
                currentPage === 'resources' 
                  ? 'text-amber-400 font-semibold' 
                  : 'text-white/85 hover:text-white'
              }`}
            >
              Resources
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Donate Action Button */}
            <button
              id="nav-btn-donate"
              type="button"
              onClick={() => handleLinkClick('donate')}
              className="bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[13px] sm:text-[14px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-[12px] transition-all transform active:scale-95 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0F172A]" />
              <span>Donate</span>
            </button>

            {/* Modern Morphing Animated Hamburger Button (< 1024px) */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] p-[1px] bg-gradient-to-br from-[#3B82F6]/70 via-slate-700/50 to-[#F59E0B]/70 hover:from-[#60A5FA] hover:to-[#FBBF24] active:scale-95 transition-all cursor-pointer relative group shadow-md shadow-slate-950/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <div className="w-full h-full bg-[#0B1329] group-hover:bg-[#0F1B38] rounded-[13px] flex items-center justify-center transition-colors">
                <div className="w-5 h-5 relative flex items-center justify-center">
                  {/* Top Bar (Blue in hamburger, Blue 45° diagonal in close) */}
                  <span 
                    className={`absolute w-[19px] h-[2px] rounded-full transition-all duration-300 ease-out transform origin-center drop-shadow-[0_0_3px_rgba(56,189,248,0.45)] ${
                      mobileMenuOpen 
                        ? 'translate-y-0 rotate-45 bg-[#38BDF8]' 
                        : '-translate-y-[6px] rotate-0 bg-[#38BDF8] group-hover:bg-[#60A5FA]'
                    }`} 
                  />
                  {/* Middle Bar (Vibrant Orange in hamburger, disappears in close) */}
                  <span 
                    className={`absolute w-[19px] h-[2px] rounded-full transition-all duration-200 ease-out transform origin-center drop-shadow-[0_0_3px_rgba(245,158,11,0.5)] bg-[#F59E0B] group-hover:bg-[#FBBF24] ${
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-100'
                    }`} 
                  />
                  {/* Bottom Bar (Blue in hamburger, Vibrant Orange -45° diagonal in close) */}
                  <span 
                    className={`absolute w-[19px] h-[2px] rounded-full transition-all duration-300 ease-out transform origin-center drop-shadow-[0_0_3px_rgba(245,158,11,0.45)] ${
                      mobileMenuOpen 
                        ? 'translate-y-0 -rotate-45 bg-[#F59E0B]' 
                        : 'translate-y-[6px] rotate-0 bg-[#38BDF8] group-hover:bg-[#60A5FA]'
                    }`} 
                  />
                </div>
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* Modern Responsive Mobile / Tablet Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        activePage={currentPage}
        onNavigate={handleLinkClick}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { ChevronDown, ArrowRight, X, Sparkles, Heart } from 'lucide-react';
import { KKFIconMark } from './BrandLogo';

interface NavProps {
  currentPage: PageId;
  onNavigate: (page: PageId, programSlug?: string) => void;
}

export const Nav: React.FC<NavProps> = ({ currentPage, onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1000 : true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      const wide = window.innerWidth >= 1000;
      setIsWide(wide);
      if (wide) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backdropOpacity = Math.min(1, scrollY / 160);

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
    <header 
      id="main-navigation"
      className="fixed top-0 left-0 w-full h-[84px] z-[200] transition-colors duration-200"
      style={{
        backgroundColor: `rgba(15, 23, 42, ${backdropOpacity})`,
        backdropFilter: backdropOpacity > 0.05 ? 'blur(12px)' : 'none',
        borderBottom: `1px solid rgba(255, 255, 255, ${backdropOpacity * 0.1})`,
      }}
    >
      <div className="max-w-[1240px] h-full mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <button
          id="nav-brand-logo"
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
          aria-label="Kijana Kreatives Foundation Home"
        >
          <div className="w-[44px] h-[44px] rounded-[13px] bg-white flex items-center justify-center p-1 shadow-md shadow-black/25 group-hover:scale-105 transition-transform">
            <KKFIconMark className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 leading-none">
              <span className="font-['Poppins'] font-bold text-[18px] text-[#2563EB] tracking-tight">
                Kijana
              </span>
              <span className="font-['Poppins'] font-bold text-[16px] text-white tracking-tight">
                Kreatives
              </span>
            </div>
            <span className="text-[9.5px] font-semibold tracking-widest text-slate-400 uppercase mt-0.5 font-['Poppins']">
              Foundation
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        {isWide ? (
          <nav className="flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
            <button
              id="nav-link-home"
              type="button"
              onClick={() => handleLinkClick('home')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'home' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-about"
              type="button"
              onClick={() => handleLinkClick('about')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'about' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              About
            </button>

            {/* Programs Mega-Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-link-programs-toggle"
                type="button"
                onClick={() => handleLinkClick('programs')}
                className={`font-['Inter'] font-medium text-[14.5px] flex items-center gap-1.5 transition-colors ${
                  currentPage === 'programs' 
                    ? 'text-white font-semibold' 
                    : 'text-white/80 hover:text-white'
                }`}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                <span>Programs</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${programsOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {/* 740px Mega-Menu Panel */}
              {programsOpen && (
                <div 
                  id="programs-mega-menu"
                  className="absolute top-full -left-44 w-[740px] bg-white rounded-[20px] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.22)] border border-[#E8EDF4] grid grid-cols-3 gap-8 z-50 text-left animate-kkf-rise"
                >
                  {/* Col 1: Creative Academy */}
                  <div>
                    <h3 className="font-['Poppins'] font-semibold text-[13px] uppercase tracking-wider text-[#2563EB] mb-4 pb-2 border-b border-[#E8EDF4]">
                      Creative Academy
                    </h3>
                    <ul className="space-y-1.5">
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
                            className="text-[14px] text-[#334155] hover:text-[#2563EB] hover:bg-blue-50/90 px-2.5 py-1.5 rounded-[10px] -mx-2.5 transition-all text-left flex items-center justify-between w-[calc(100%+20px)] group/item cursor-pointer"
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
                    <h3 className="font-['Poppins'] font-semibold text-[13px] uppercase tracking-wider text-[#2563EB] mb-4 pb-2 border-b border-[#E8EDF4]">
                      Digital Academy
                    </h3>
                    <ul className="space-y-1.5">
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
                            className="text-[14px] text-[#334155] hover:text-[#2563EB] hover:bg-blue-50/90 px-2.5 py-1.5 rounded-[10px] -mx-2.5 transition-all text-left flex items-center justify-between w-[calc(100%+20px)] group/item cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#2563EB]" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: Opportunities */}
                  <div className="bg-[#EFF5FF]/60 -m-3 p-5 rounded-[16px] border border-[#2563EB]/15">
                    <h3 className="font-['Poppins'] font-semibold text-[13px] uppercase tracking-wider text-[#F59E0B] mb-4 pb-2 border-b border-[#F59E0B]/20 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      Opportunities
                    </h3>
                    <ul className="space-y-1.5">
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
                            className="text-[14px] font-medium text-[#0F172A] hover:text-[#D97706] hover:bg-amber-100/60 px-2.5 py-1.5 rounded-[10px] -mx-2.5 transition-all text-left flex items-center justify-between w-[calc(100%+20px)] group/item cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all text-[#F59E0B]" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('programs')}
                      className="mt-4 pt-3 border-t border-[#2563EB]/20 text-[13px] font-semibold text-[#2563EB] hover:text-[#1D4FD8] hover:bg-blue-100/50 px-2.5 py-1.5 rounded-[8px] flex items-center justify-between w-full transition-colors cursor-pointer"
                    >
                      <span>Explore all 12 tracks</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-link-impact"
              type="button"
              onClick={() => handleLinkClick('impact')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'impact' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Impact
            </button>

            <button
              id="nav-link-stories"
              type="button"
              onClick={() => handleLinkClick('stories')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'stories' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Stories
            </button>

            <button
              id="nav-link-get-involved"
              type="button"
              onClick={() => handleLinkClick('get-involved')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'get-involved' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Get Involved
            </button>

            <button
              id="nav-link-resources"
              type="button"
              onClick={() => handleLinkClick('resources')}
              className={`font-['Inter'] font-medium text-[14.5px] transition-colors ${
                currentPage === 'resources' 
                  ? 'text-white font-semibold' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Resources
            </button>

            {/* Donate Action Button */}
            <button
              id="nav-btn-donate"
              type="button"
              onClick={() => handleLinkClick('donate')}
              className="bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-semibold text-[14px] px-6 py-2.5 rounded-[12px] transition-all transform active:scale-95 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer ml-2"
            >
              <Heart className="w-4 h-4 fill-[#0F172A]" />
              <span>Donate</span>
            </button>
          </nav>
        ) : (
          /* Mobile Nav Bar (<1000px) */
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick('donate')}
              className="bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-semibold text-[13.5px] px-4 py-2 rounded-[10px] transition-all active:scale-95 shadow-sm"
            >
              Donate
            </button>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[46px] h-[46px] rounded-[11px] border border-white/20 flex flex-col items-center justify-center gap-[5px] bg-white/5 hover:bg-blue-600/30 hover:border-blue-400/60 transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <>
                  <span className="w-[18px] h-[2px] bg-white rounded-full"></span>
                  <span className="w-[18px] h-[2px] bg-white rounded-full"></span>
                  <span className="w-[18px] h-[2px] bg-white rounded-full"></span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer Panel (<1000px) */}
      {!isWide && mobileMenuOpen && (
        <div 
          id="mobile-navigation-panel"
          className="fixed top-[84px] left-0 w-full h-[calc(100vh-84px)] bg-[#0F172A] border-t border-white/10 z-[190] overflow-y-auto px-6 py-8 flex flex-col justify-between animate-kkf-rise"
        >
          <div className="flex flex-col space-y-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'programs', label: 'Programs' },
              { id: 'impact', label: 'Impact' },
              { id: 'stories', label: 'Stories' },
              { id: 'get-involved', label: 'Get Involved' },
              { id: 'resources', label: 'Resources' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id as PageId)}
                className={`w-full text-left py-4 text-[24px] font-['Poppins'] font-semibold border-b border-white/[0.08] flex items-center justify-between transition-colors ${
                  currentPage === link.id ? 'text-amber-400' : 'text-white/90 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-white/40" />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6">
            <button
              type="button"
              onClick={() => handleLinkClick('donate')}
              className="w-full bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[18px] py-4 rounded-[14px] shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-[#0F172A]" />
              <span>Donate to KKF</span>
            </button>
            <p className="text-center text-slate-400 text-xs mt-3">
              Empowering Kenya&apos;s next generation of creative innovators.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

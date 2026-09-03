import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND } from '../data/content';
import { WhatsAppIcon } from './SocialIcons';
import { 
  Sparkles, 
  Search, 
  Heart, 
  ChevronRight, 
  ChevronDown, 
  Compass, 
  Users, 
  Layers, 
  GraduationCap, 
  BookOpen, 
  ArrowRight,
  Palette,
  Film,
  Box,
  Headphones,
  Layout,
  Cpu,
  Mail,
  MapPin
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  activePage: PageId;
  onNavigate: (page: PageId, subTopic?: string) => void;
  onOpenSearch: () => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activePage,
  onNavigate,
  onOpenSearch,
  onClose
}) => {
  const [programsExpanded, setProgramsExpanded] = useState(false);

  if (!isOpen) return null;

  const whatsappCleanNumber = BRAND.whatsapp.replace(/[^0-9]/g, '');

  const creativeTracks = [
    { title: 'Graphic & Brand Identity', slug: 'graphic-design', icon: Palette, color: 'text-amber-500 bg-amber-50' },
    { title: 'Cinematography & Film', slug: 'photography-videography', icon: Film, color: 'text-blue-500 bg-blue-50' },
    { title: '3D Animation & VFX', slug: '3d-animation', icon: Box, color: 'text-purple-500 bg-purple-50' },
    { title: 'Audio & Music Production', slug: 'audio-production', icon: Headphones, color: 'text-emerald-500 bg-emerald-50' },
    { title: 'UI/UX & Product Design', slug: 'ui-ux-design', icon: Layout, color: 'text-indigo-500 bg-indigo-50' },
    { title: 'AI & Creative Technology', slug: 'creative-technology-ai', icon: Cpu, color: 'text-rose-500 bg-rose-50' },
  ];

  return (
    <div 
      id="mobile-navigation-drawer"
      className="lg:hidden fixed inset-x-0 top-[72px] md:top-[80px] bottom-0 z-[190] bg-slate-950/60 backdrop-blur-sm animate-fadeIn flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-white backdrop-blur-2xl border-l border-slate-200 shadow-2xl h-full max-h-[calc(100dvh-72px)] md:max-h-[calc(100dvh-80px)] overflow-y-auto flex flex-col justify-between p-4 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3.5">
          
          {/* Live Cohort Admissions Status Card */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="font-bold text-xs font-['Poppins'] flex items-center gap-1.5">
                  <span>Cohort 2026 Open</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-300 font-['Inter']">Nairobi Studio Apprenticeships</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onNavigate('get-involved');
                onClose();
              }}
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs font-['Poppins'] transition-all shadow-xs cursor-pointer"
            >
              Apply
            </button>
          </div>

          {/* Quick Spotlight Search Bar */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-500 border border-slate-200/80 transition-all text-xs font-['Inter'] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search tracks, mentors, stories...</span>
            </div>
            <span className="text-[10px] bg-white text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
              ⌘K
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1 font-['Poppins'] text-sm">
            
            {/* Home */}
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activePage === 'home' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'home' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <span>Home</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Creative Programs with Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-100">
              <button 
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 transition-all cursor-pointer ${
                  activePage === 'programs' ? 'bg-blue-50/70 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setProgramsExpanded(!programsExpanded)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'programs' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div>Creative Programs</div>
                    <span className="text-[10.5px] text-slate-400 font-normal font-['Inter']">6 Studio Tracks</span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${programsExpanded ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {programsExpanded && (
                <div className="bg-slate-50/90 p-2 space-y-1 border-t border-slate-100">
                  {creativeTracks.map((prog, idx) => {
                    const Icon = prog.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          onNavigate('programs', prog.slug);
                          onClose();
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left hover:bg-white text-xs font-['Inter'] text-slate-700 transition-colors"
                      >
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${prog.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium flex-1 truncate">{prog.title}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('programs');
                      onClose();
                    }}
                    className="w-full text-center py-2 text-xs text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
                  >
                    <span>View All 6 Tracks</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              type="button"
              onClick={() => {
                onNavigate('about');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activePage === 'about' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'about' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Users className="w-4 h-4" />
                </div>
                <span>About Foundation</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Stories & Impact */}
            <button
              type="button"
              onClick={() => {
                onNavigate('stories');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activePage === 'stories' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'stories' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Stories & Impact</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Insights & Events */}
            <button
              type="button"
              onClick={() => {
                onNavigate('resources');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activePage === 'resources' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'resources' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Insights & Events</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Get Involved */}
            <button
              type="button"
              onClick={() => {
                onNavigate('get-involved');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activePage === 'get-involved' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'get-involved' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span>Get Involved</span>
                  <span className="block text-[10px] text-slate-400 font-normal">Cohorts · Mentors · Donors</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

          </nav>
        </div>

        {/* Bottom Direct CTA Strip */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <button
            type="button"
            onClick={() => {
              onNavigate('donate');
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 active:scale-[0.98] text-white font-['Poppins'] font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current text-rose-300" />
            <span>Donate to Foundation</span>
          </button>

          <a 
            href={`https://wa.me/${whatsappCleanNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100 text-slate-700 font-['Poppins'] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            <span>Admissions Desk: {BRAND.whatsapp}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { BRAND } from '../data/content';
import { WhatsAppIcon } from './SocialIcons';
import { 
  Handshake, 
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
  CheckCircle2,
  ExternalLink,
  Mail
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  activePage: PageId;
  onNavigate: (page: PageId, subTopic?: string) => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activePage,
  onNavigate,
  onClose
}) => {
  const [programsExpanded, setProgramsExpanded] = useState(false);

  // Lock page scrolling behind the mobile drawer when opened
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappCleanNumber = BRAND.whatsapp.replace(/[^0-9]/g, '');

  const creativeTracks = [
    { 
      title: 'Graphic & Brand Identity', 
      slug: 'graphic-design', 
      desc: 'Typography, Logo Systems & Packaging',
      icon: Palette, 
      color: 'text-amber-600 bg-amber-50 border-amber-200/60',
      badge: 'Brand & Print',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { 
      title: 'Cinematography & Film', 
      slug: 'photography-videography', 
      desc: 'Directing, 4K Lighting & DaVinci',
      icon: Film, 
      color: 'text-blue-600 bg-blue-50 border-blue-200/60',
      badge: 'Camera & Edit',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      title: '3D Animation & VFX', 
      slug: '3d-animation', 
      desc: 'Blender, Rigging & Unreal Engine',
      icon: Box, 
      color: 'text-purple-600 bg-purple-50 border-purple-200/60',
      badge: 'Blender & Maya',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    { 
      title: 'Audio & Music Production', 
      slug: 'audio-production', 
      desc: 'Tracking, Logic Pro & Sound Design',
      icon: Headphones, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60',
      badge: 'Sound Lab',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    { 
      title: 'UI/UX & Product Design', 
      slug: 'ui-ux-design', 
      desc: 'Design Systems, Research & Figma',
      icon: Layout, 
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
      badge: 'Figma Lab',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    { 
      title: 'AI & Creative Technology', 
      slug: 'creative-technology-ai', 
      desc: 'Creative Coding, Workflows & GenAI',
      icon: Cpu, 
      color: 'text-rose-600 bg-rose-50 border-rose-200/60',
      badge: 'GenAI & Tech',
      badgeColor: 'bg-rose-100 text-rose-800'
    },
  ];

  return (
    <div 
      id="mobile-navigation-drawer"
      className="lg:hidden fixed inset-x-0 top-[72px] md:top-[80px] bottom-0 z-[190] bg-slate-950/60 backdrop-blur-md animate-fadeIn flex justify-end transition-all"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="w-full sm:max-w-md bg-white border-l border-slate-200 shadow-2xl h-full max-h-[calc(100dvh-72px)] md:max-h-[calc(100dvh-80px)] overflow-y-auto flex flex-col justify-between p-4 sm:p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3.5">
          
          {/* 1. Live Cohort Status Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-4 rounded-2xl border border-slate-800 shadow-lg">
            {/* Ambient background glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/15 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold font-['Poppins'] tracking-wider uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Admissions Open</span>
                </div>
                
                <h4 className="font-bold text-sm font-['Poppins'] text-white tracking-tight flex items-center gap-1.5">
                  <span>Cohort 2026 Admissions</span>
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </h4>
                
                <p className="text-[11px] text-slate-300 font-['Inter'] leading-relaxed">
                  Nairobi Studio Apprenticeships · 12-week hands-on tracks with industry mentors.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onNavigate('get-involved');
                  onClose();
                }}
                className="shrink-0 mt-0.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs font-['Poppins'] transition-all shadow-md shadow-amber-500/25 cursor-pointer flex items-center gap-1"
              >
                <span>Apply</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 font-['Poppins'] text-sm" aria-label="Mobile Navigation Menu">
            
            {/* Home */}
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
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

            {/* Creative Programs with Interactive Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-white">
              <button 
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2.5 transition-all cursor-pointer ${
                  activePage === 'programs' ? 'bg-blue-50/80 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => setProgramsExpanded(!programsExpanded)}
                aria-expanded={programsExpanded}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'programs' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span>Creative Programs</span>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full font-['Inter']">
                        6 Tracks
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-normal font-['Inter']">
                      Tap to view all disciplines
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${programsExpanded ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {/* 6 Disciplines Accordion View with Dedicated Badges and Icons */}
              {programsExpanded && (
                <div className="bg-slate-50/90 p-2 space-y-1.5 border-t border-slate-100">
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
                        className="w-full flex items-center justify-between p-2 rounded-xl text-left bg-white hover:bg-blue-50/70 border border-slate-200/70 text-xs font-['Inter'] text-slate-800 transition-all group cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${prog.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                              {prog.title}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {prog.desc}
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ml-2 ${prog.badgeColor}`}>
                          {prog.badge}
                        </span>
                      </button>
                    );
                  })}
                  
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('programs');
                      onClose();
                    }}
                    className="w-full text-center py-2 text-xs text-blue-600 font-semibold hover:text-blue-700 hover:underline flex items-center justify-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Explore Full Curriculum & Studios</span>
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activePage === 'stories' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'stories' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Stories & Alumni</span>
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activePage === 'resources' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'resources' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Insights & Hub</span>
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activePage === 'get-involved' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'get-involved' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Handshake className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span>Get Involved</span>
                  <span className="block text-[10px] text-slate-400 font-normal">Mentors · Volunteers · Partners</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Contact & Studio Hub */}
            <button
              type="button"
              onClick={() => {
                onNavigate('contact');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activePage === 'contact' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activePage === 'contact' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span>Contact Hub</span>
                  <span className="block text-[10px] text-slate-400 font-normal">Nairobi Studio · Directions · Inquiries</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

          </nav>
        </div>

        {/* 4. Dedicated Bottom CTA Cluster */}
        <div className="pt-3.5 border-t border-slate-200/90 space-y-2.5">
          {/* Prominent Full-Width Gradient Donate Button */}
          <button
            type="button"
            onClick={() => {
              onNavigate('donate');
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#1D4FD8] to-[#F59E0B] hover:opacity-95 active:scale-[0.98] text-white font-['Poppins'] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/25 cursor-pointer transition-all"
          >
            <Heart className="w-4 h-4 fill-current text-rose-300 shrink-0" />
            <span>Support Young Creatives · Donate</span>
          </button>

          {/* Official WhatsApp Admissions Desk Quick-Link */}
          <a 
            href={`https://wa.me/${whatsappCleanNumber}?text=Hello%20KKF%20Admissions%20Desk,%20I%20would%20like%20to%20inquire%20about%20the%202026%20Creative%20Cohort.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-950 font-['Poppins'] font-medium text-xs flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <span>Admissions Desk</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-emerald-700/90 font-['Inter']">
                  WhatsApp: {BRAND.whatsapp}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Chat</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};

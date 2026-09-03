import React, { useState, useEffect, useRef } from 'react';
import { PageId, Program, Post, EventItem } from '../../types';
import { PROGRAMS, POSTS, EVENTS } from '../../data/content';
import { 
  Search, 
  X, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  Calendar, 
  Layers, 
  Sparkles,
  Heart,
  Users
} from 'lucide-react';

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, programSlug?: string) => void;
  onOpenProgram: (program: Program) => void;
  onOpenPost: (post: Post) => void;
  onOpenEvent: (event: EventItem) => void;
}

export const SpotlightSearchModal: React.FC<SpotlightSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProgram,
  onOpenPost,
  onOpenEvent,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Global Esc key
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

  const normalizedQuery = query.toLowerCase().trim();

  const sitePages = [
    { title: 'Home', page: 'home' as PageId, desc: 'Overview, creative training, mission and cohorts' },
    { title: 'About Foundation', page: 'about' as PageId, desc: 'Our story, values, team and milestones in Nairobi' },
    { title: 'Programs & Pathways', page: 'programs' as PageId, desc: 'Creative, Digital, and Business academies' },
    { title: 'Impact & Results', page: 'impact' as PageId, desc: 'Graduation stats, county reach, verified outcomes' },
    { title: 'Success Stories', page: 'stories' as PageId, desc: 'Real Kenyan creative alumni testimonials' },
    { title: 'Get Involved', page: 'get-involved' as PageId, desc: 'Youth admissions, mentor applications, partnerships' },
    { title: 'Resources & Hub', page: 'resources' as PageId, desc: 'Industry insights, masterclasses, event calendar' },
    { title: 'Donate & Support', page: 'donate' as PageId, desc: 'Support youth equipment, M-Pesa, card, wire' },
    { title: 'Contact Us', page: 'contact' as PageId, desc: 'Studio visit, email, phone, WhatsApp admissions' },
  ];

  const matchedPages = normalizedQuery 
    ? sitePages.filter(p => p.title.toLowerCase().includes(normalizedQuery) || p.desc.toLowerCase().includes(normalizedQuery))
    : [];

  const matchedPrograms = normalizedQuery
    ? PROGRAMS.filter(p => 
        p.title.toLowerCase().includes(normalizedQuery) || 
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery)
      )
    : PROGRAMS.slice(0, 4);

  const matchedEvents = normalizedQuery
    ? EVENTS.filter(e => 
        e.title.toLowerCase().includes(normalizedQuery) || 
        e.description.toLowerCase().includes(normalizedQuery) ||
        e.kind.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedPosts = normalizedQuery
    ? POSTS.filter(p => 
        p.title.toLowerCase().includes(normalizedQuery) || 
        p.excerpt.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults = matchedPages.length + matchedPrograms.length + matchedEvents.length + matchedPosts.length;

  return (
    <div 
      className="fixed inset-0 z-[300] bg-slate-950/70 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-12 overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight Search"
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto sm:my-8 transition-all flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, articles, events, admissions..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-['Inter']"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-['Poppins'] font-semibold text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-left">
          
          {/* Main Pages */}
          {matchedPages.length > 0 && (
            <div>
              <div className="text-[11px] font-['Poppins'] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Pages
              </div>
              <div className="space-y-1">
                {matchedPages.map((pg) => (
                  <button
                    key={pg.page}
                    type="button"
                    onClick={() => {
                      onNavigate(pg.page);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/80 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-[#2563EB] flex items-center justify-center shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-['Poppins'] font-semibold text-sm text-slate-900 group-hover:text-[#2563EB]">
                          {pg.title}
                        </div>
                        <div className="text-xs text-slate-500 font-['Inter'] truncate max-w-[260px] sm:max-w-md">
                          {pg.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Programs */}
          {matchedPrograms.length > 0 && (
            <div>
              <div className="text-[11px] font-['Poppins'] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                {normalizedQuery ? 'Programs Matching Search' : 'Popular Program Tracks'}
              </div>
              <div className="space-y-1">
                {matchedPrograms.map((prog) => (
                  <button
                    key={prog.slug}
                    type="button"
                    onClick={() => {
                      onOpenProgram(prog);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50/80 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-['Poppins'] font-semibold text-sm text-slate-900 group-hover:text-amber-800 flex items-center gap-2">
                          <span>{prog.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                            {prog.duration}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-['Inter'] truncate max-w-[260px] sm:max-w-md">
                          {prog.description}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-['Poppins'] font-semibold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      View Track →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {matchedEvents.length > 0 && (
            <div>
              <div className="text-[11px] font-['Poppins'] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Calendar & Events
              </div>
              <div className="space-y-1">
                {matchedEvents.map((evt) => (
                  <button
                    key={evt.slug}
                    type="button"
                    onClick={() => {
                      onOpenEvent(evt);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100/60 text-indigo-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-['Poppins'] font-semibold text-sm text-slate-900 group-hover:text-indigo-600">
                          {evt.title}
                        </div>
                        <div className="text-xs text-slate-500 font-['Inter']">
                          {evt.dateLabel} · {evt.location}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-700 font-medium">
                      Register →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {matchedPosts.length > 0 && (
            <div>
              <div className="text-[11px] font-['Poppins'] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Articles & Dispatch
              </div>
              <div className="space-y-1">
                {matchedPosts.map((post) => (
                  <button
                    key={post.slug}
                    type="button"
                    onClick={() => {
                      onOpenPost(post);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/60 text-emerald-700 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-['Poppins'] font-semibold text-sm text-slate-900 group-hover:text-emerald-700">
                          {post.title}
                        </div>
                        <div className="text-xs text-slate-500 font-['Inter'] truncate max-w-[260px] sm:max-w-md">
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-700 font-medium">
                      Read →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalizedQuery && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-['Poppins'] font-medium mb-1">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs font-['Inter'] text-slate-400">
                Try searching for &quot;design&quot;, &quot;film&quot;, &quot;admissions&quot;, &quot;mentor&quot;, or &quot;donate&quot;.
              </p>
            </div>
          )}

        </div>

        {/* Quick Footer Suggestions */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11.5px] text-slate-500 gap-2">
          <div className="flex items-center gap-3">
            <span>Quick:</span>
            <button
              type="button"
              onClick={() => {
                onNavigate('get-involved');
                onClose();
              }}
              className="font-medium text-[#2563EB] hover:underline"
            >
              Admissions 2026
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                onNavigate('donate');
                onClose();
              }}
              className="font-medium text-amber-700 hover:underline"
            >
              Donate
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                onNavigate('contact');
                onClose();
              }}
              className="font-medium text-slate-700 hover:underline"
            >
              Contact
            </button>
          </div>
          <div className="hidden sm:block text-slate-400 font-mono text-[10.5px]">
            Navigation: Click to jump
          </div>
        </div>

      </div>
    </div>
  );
};

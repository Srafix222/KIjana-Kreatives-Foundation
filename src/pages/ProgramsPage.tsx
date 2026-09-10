import React, { useState } from 'react';
import { PageId, Program, ProgramCategory, BreadcrumbItem } from '../types';
import { PROGRAMS } from '../data/content';
import { APP_ASSETS } from '../data/assets';
import { PageHero } from '../components/PageHero';
import { GOOGLE_FORMS } from '../data/forms';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ArrowRight, Check, Sparkles, Filter, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageId, programSlug?: string) => void;
  onOpenProgram: (program: Program) => void;
  initialProgramSlug?: string;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onOpenProgram,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Creative', 'Digital', 'Business', 'Opportunities'];

  const filteredPrograms = selectedCategory === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === selectedCategory);

  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: 'Creative Programs', 
      page: selectedCategory !== 'All' ? 'programs' : undefined,
      active: selectedCategory === 'All'
    },
    ...(selectedCategory !== 'All' ? [{ label: `${selectedCategory} Tracks`, active: true }] : []),
  ];

  const handleBreadcrumbNavigate = (page: PageId, programSlug?: string) => {
    if (page === 'programs' && selectedCategory !== 'All') {
      setSelectedCategory('All');
    } else {
      onNavigate(page, programSlug);
    }
  };

  return (
    <div id="programs-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Contextual Production Imagery) */}
      <PageHero
        badge="Programs & Pathways"
        badgeColor="amber"
        title="Pick the craft. We'll help you get paid for it."
        description="Every program is project-based, mentor-supported and ends with work you can show a client or an employer."
        imageSrc={APP_ASSETS.cameraFilmSet}
        imageAlt="Cinema camera and studio lighting rig at Kijana Kreatives Foundation"
        imagePosition="object-center"
        breadcrumbs={breadcrumbItems}
        onNavigate={handleBreadcrumbNavigate}
      />

      {/* 2. PROGRAM CATALOGUE & CATEGORY FILTER */}
      <section className="py-14 sm:py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          
          {/* Category Filter Chips */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-[#E8EDF4]">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-[100px] font-['Poppins'] font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0F172A] text-white shadow-md'
                      : 'bg-white text-[#475569] border border-[#DDE5EF] hover:border-[#2563EB] hover:bg-blue-50/50 hover:text-[#2563EB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#64748B] font-mono">
              Showing {filteredPrograms.length} {filteredPrograms.length === 1 ? 'track' : 'tracks'}
            </span>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.slug}
                className="bg-white rounded-[26px] overflow-hidden border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div className="relative h-[200px] w-full overflow-hidden">
                  <ImagePlaceholder
                    src={prog.image}
                    fallbackText={prog.imagePlaceholderText}
                    alt={prog.title}
                    aspectRatio="auto"
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-[100px] bg-white/90 backdrop-blur-xs text-xs font-['Poppins'] font-semibold text-[#2563EB] shadow-xs">
                    {prog.category}
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-[100px] bg-[#0F172A]/80 backdrop-blur-xs text-xs font-['Poppins'] font-semibold text-white">
                    {prog.duration}
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono mb-2">
                      <span>{prog.level}</span>
                      <span>·</span>
                      <span>{prog.location}</span>
                      <span>·</span>
                      <span className="text-emerald-600 font-semibold">{prog.cost}</span>
                    </div>

                    <h3 className="font-['Poppins'] font-bold text-[21px] text-[#0F172A] tracking-tight mb-2.5 group-hover:text-[#2563EB] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    <div className="text-xs text-[#64748B] mb-6 space-y-1 bg-[#F8FAFC] p-3 rounded-[12px] border border-[#E8EDF4]">
                      <div><strong className="text-[#334155]">Schedule:</strong> {prog.schedule}</div>
                      <div><strong className="text-[#334155]">Eligibility:</strong> {prog.eligibility}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8EDF4] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenProgram(prog)}
                      className="font-['Poppins'] font-semibold text-xs text-[#2563EB] hover:text-[#1D4FD8] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Curriculum & Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={GOOGLE_FORMS.youth.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-[10px] bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-['Poppins'] font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className={`text-[11px] font-['Poppins'] font-semibold px-2 py-1 rounded-full ${
                        prog.status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {prog.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. HOW A COHORT WORKS */}
      <section className="py-20 md:py-28 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#F8FAFC] rounded-[30px] p-8 md:p-14 border border-[#E8EDF4] card-glow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block">
                How a cohort works
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                Structured Studio Cohorts
              </h2>
              <p className="font-['Inter'] text-[17px] text-[#475569] leading-relaxed">
                Every track operates as an in-person, 12-week studio cohort. You train on equipment provided by the foundation, work on real briefs, and receive feedback directly from working Kenyan directors.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  '100% project-based briefs modeled after real commercial studio client work',
                  'Dedicated 1-on-1 weekly mentorship with senior creatives practicing in Kenya',
                  'Free studio equipment and high-speed fiber internet access',
                  'Graduation portfolio showcase attended by agency creative directors',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#334155]">
                    <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={GOOGLE_FORMS.youth.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for Next Cohort</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('get-involved')}
                  className="px-6 py-4 rounded-[14px] bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F172A] font-['Poppins'] font-semibold text-[15px] transition-colors cursor-pointer"
                >
                  Application Guidelines
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-[24px] overflow-hidden shadow-lg border border-[#E8EDF4] card-glow">
              <ImagePlaceholder
                src={APP_ASSETS.documentaryPhoto}
                fallbackText="hero/academy-classroom.jpg: Creative learning environment in Nairobi (4:3)"
                alt="Creative Academy practical documentary session"
                aspectRatio="4:3"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

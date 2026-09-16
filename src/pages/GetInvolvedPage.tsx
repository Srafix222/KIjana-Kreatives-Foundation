import React, { useState, useEffect } from 'react';
import { PageId, BreadcrumbItem } from '../types';
import { GOOGLE_FORMS } from '../data/forms';
import { APP_ASSETS } from '../data/assets';
import { PageHero } from '../components/PageHero';
import { FAQSection } from '../components/FAQSection';
import { 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Heart, 
  Compass,
  Award,
  ShieldCheck, 
  ExternalLink,
  FileText,
  Clock,
  Check,
  Calendar,
  MessageSquare,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
  onBack?: () => void;
  initialTab?: 'youth' | 'mentor' | 'volunteer' | 'partner';
  initialProgramSlug?: string;
  onOpenApplication?: (type: 'youth' | 'mentor' | 'volunteer' | 'partner', trackSlug?: string) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  onBack,
  initialTab = 'youth',
  initialProgramSlug,
  onOpenApplication,
}) => {
  const [activeTab, setActiveTab] = useState<'youth' | 'mentor' | 'volunteer' | 'partner'>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialProgramSlug) {
      setActiveTab('youth');
    }
  }, [initialProgramSlug]);

  const activeForm = GOOGLE_FORMS[activeTab];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeForm.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const pathwayNames: Record<string, string> = {
    youth: 'Youth Application',
    mentor: 'Become a Mentor',
    volunteer: 'Volunteer Time',
    partner: 'Partner With Us',
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Get Involved', page: 'get-involved' },
    { label: pathwayNames[activeTab] || 'Pathways', active: true },
  ];

  return (
    <div id="get-involved-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Ambient Lighting & Action Cluster) */}
      <PageHero
        badge="Get Involved · Cohort 2026"
        badgeColor="amber"
        title={<>Four pathways in. <span className="text-[#F59E0B]">Pick yours.</span></>}
        description="Whether you are starting out as an emerging creator, giving industry hours as a mentor, volunteering at our studios, or building commercial programs with us, apply directly through our official admissions and registration portal."
        imageSrc={APP_ASSETS.mentorGuidance}
        imageAlt="Industry mentor reviewing work with young Kenyan creative apprentice in Nairobi studio"
        breadcrumbs={breadcrumbItems}
        onNavigate={onNavigate}
        onBack={onBack}
      >
        {/* Quick-Jump Pathway Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('youth');
              document.getElementById('application-forms')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-[100px] bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-[13px] font-['Poppins'] font-semibold text-white transition-colors cursor-pointer"
          >
            Youth Application →
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('mentor');
              document.getElementById('application-forms')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-[100px] bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-[13px] font-['Poppins'] font-semibold text-white transition-colors cursor-pointer"
          >
            Become a Mentor →
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('volunteer');
              document.getElementById('application-forms')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-[100px] bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-[13px] font-['Poppins'] font-semibold text-white transition-colors cursor-pointer"
          >
            Studio Volunteer →
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('partner');
              document.getElementById('application-forms')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-[100px] bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-[13px] font-['Poppins'] font-semibold text-white transition-colors cursor-pointer"
          >
            Partner Proposal →
          </button>
        </div>
      </PageHero>

      {/* 2. THE KKF ECOSYSTEM STANDARD (Replacing repetitive role cards with substantive context) */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#F8FAFC] border-b border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          
          <div className="max-w-[700px] mb-14">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Our Commitments
            </span>
            <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[40px] text-[#0F172A] leading-[1.12] tracking-[-0.025em] mb-4">
              The KKF Ecosystem Standard
            </h2>
            <p className="font-['Inter'] text-[16px] text-[#475569] leading-relaxed">
              Every young creator, mentor, and partner who joins our community steps into an environment built for authentic creative growth, dignity, and commercial readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: 100% Tuition-Free */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] card-glow flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-6 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-['Poppins'] font-semibold text-[11px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                  EQUIPMENT & ACCESS
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                  100% Tuition-Free
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  Accepted young creators pay KES 0 in tuition. Dedicated high-performance iMac/PC workstations, cameras, sound booths, drawing tablets, and licensed software suites are fully provided.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <span className="inline-flex items-center gap-1.5 text-xs font-['Poppins'] font-semibold text-[#2563EB]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Zero Equipment Fees</span>
                </span>
              </div>
            </div>

            {/* Card 2: Live Industry Briefs */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] card-glow-orange flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#D97706] mb-6 shadow-xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="font-['Poppins'] font-semibold text-[11px] tracking-[0.16em] text-[#D97706] uppercase block mb-2">
                  PRODUCTION PRACTICE
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-3 group-hover:text-[#D97706] transition-colors">
                  Real Client Capstones
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  No hypothetical textbook drills. Cohorts tackle live production briefs for Kenyan brands, cultural initiatives, and non-profits, graduating with verified commercial client portfolios.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <span className="inline-flex items-center gap-1.5 text-xs font-['Poppins'] font-semibold text-[#D97706]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Commercial Portfolios</span>
                </span>
              </div>
            </div>

            {/* Card 3: Weekly 1-on-1 Critiques */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] card-glow flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-6 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <span className="font-['Poppins'] font-semibold text-[11px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                  INDUSTRY GUIDANCE
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                  Weekly 1-on-1 Mentorship
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  Learn alongside active creative directors, senior animators, film producers, and tech leads. Regular 1-on-1 portfolio audits, technical masterclasses, and career coaching elevate your craft.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <span className="inline-flex items-center gap-1.5 text-xs font-['Poppins'] font-semibold text-[#2563EB]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Active Industry Leads</span>
                </span>
              </div>
            </div>

            {/* Card 4: Commercial Pathways */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] card-glow-orange flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#D97706] mb-6 shadow-xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="font-['Poppins'] font-semibold text-[11px] tracking-[0.16em] text-[#D97706] uppercase block mb-2">
                  ECONOMIC OUTCOMES
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-3 group-hover:text-[#D97706] transition-colors">
                  Paid Creative Pathways
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  We bridge creators directly into the creative economy through 20+ agency partnerships, studio apprenticeships, freelance gigs, and grant opportunities across Kenya.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <span className="inline-flex items-center gap-1.5 text-xs font-['Poppins'] font-semibold text-[#D97706]">
                  <Check className="w-3.5 h-3.5" />
                  <span>20+ Agency Partners</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. APPLICATION & ADMISSIONS HUB (Clean, direct, zero redundant fields) */}
      <section id="application-forms" className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-[700px] mx-auto mb-8 sm:mb-10">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Application & Proposal Portal
            </span>
            <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em] mb-4">
              Apply Online
            </h2>
            <p className="font-['Inter'] text-[15.5px] sm:text-[16px] text-[#64748B] leading-relaxed">
              All cohort applications, mentor registrations, volunteer signups, and partnership proposals are submitted online. For youth applicants, one application covers all 6 programs from our Programs page. Applications are reviewed on a rolling basis.
            </p>
          </div>

          {/* Form Track Switcher Tabs */}
          <div className="flex justify-start sm:justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x overscroll-x-contain">
            <div className="inline-flex p-1.5 rounded-[100px] bg-[#F1F5F9] border border-[#E2E8F0] gap-1 shrink-0">
              {[
                { id: 'youth', label: 'Youth Cohorts', badge: '16–30 yrs' },
                { id: 'mentor', label: 'Mentor Network', badge: 'Industry' },
                { id: 'volunteer', label: 'Volunteers', badge: 'Events & Studio' },
                { id: 'partner', label: 'Partnerships', badge: 'Organisations' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 sm:px-6 py-2.5 rounded-[100px] font-['Poppins'] font-semibold text-xs sm:text-[13px] transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap touch-manipulation active:scale-95 ${
                    activeTab === tab.id
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Application Card */}
          <div className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#E2E8F0] shadow-sm card-glow">
            
            {/* Header / Track Banner */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
              <div className="space-y-3 max-w-[700px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#2563EB] text-[11px] font-['Poppins'] font-semibold tracking-wider uppercase">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{activeForm.category}</span>
                </div>
                
                <h3 className="font-['Poppins'] font-bold text-[26px] sm:text-[32px] text-[#0F172A] leading-[1.15]">
                  {activeForm.title}
                </h3>
                
                <p className="font-['Poppins'] font-medium text-[15px] text-[#2563EB]">
                  {activeForm.tagline}
                </p>
                
                <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed pt-1">
                  {activeForm.description}
                </p>
              </div>

              {/* Status pill */}
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-['Poppins'] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Applications Open · 2026</span>
                </div>
              </div>
            </div>

            {/* Meta Attributes Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-[#E2E8F0]">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-['Poppins'] font-semibold text-[11.5px] uppercase tracking-wider text-[#64748B]">
                    Eligibility
                  </span>
                  <span className="font-['Inter'] text-[13.5px] text-[#0F172A] font-medium leading-snug">
                    {activeForm.eligibility}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-['Poppins'] font-semibold text-[11.5px] uppercase tracking-wider text-[#64748B]">
                    Time to Complete
                  </span>
                  <span className="font-['Inter'] text-[13.5px] text-[#0F172A] font-medium leading-snug">
                    {activeForm.timeToComplete}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-['Poppins'] font-semibold text-[11.5px] uppercase tracking-wider text-[#64748B]">
                    Review Cycle
                  </span>
                  <span className="font-['Inter'] text-[13.5px] text-[#0F172A] font-medium leading-snug">
                    {activeForm.reviewTime}
                  </span>
                </div>
              </div>
            </div>

            {/* When Youth Tab: Direct cross-link to Programs page for full curriculum, tools, and syllabi */}
            {activeTab === 'youth' && (
              <div className="my-8 p-5 sm:p-6 rounded-[22px] bg-white border border-[#E2E8F0] shadow-xs card-glow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A]">
                      Exploring program tracks and detailed syllabi?
                    </h4>
                    <p className="font-['Inter'] text-xs sm:text-[13.5px] text-[#64748B] mt-0.5 leading-relaxed">
                      All detailed course descriptions, weekly curricula, prerequisites, and studio schedules are on our Programs page.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="px-4 py-2.5 rounded-[12px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>View Programs Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 2-Column Guidance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
              
              {/* Column 1: Checklist */}
              <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E8EDF4] card-glow">
                <h4 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                  <span>What You&apos;ll Need to Prepare</span>
                </h4>
                <ul className="space-y-3">
                  {activeForm.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-['Inter'] text-[13.5px] text-[#475569]">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Key Benefits */}
              <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-[#E8EDF4] card-glow-orange">
                <h4 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D97706]" />
                  <span>What You Receive</span>
                </h4>
                <ul className="space-y-3">
                  {activeForm.keyBenefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-['Inter'] text-[13.5px] text-[#475569]">
                      <span className="w-5 h-5 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#D97706]" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Launch Box & Direct Action */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[24px] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl dark-card-glow-orange">
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-['Poppins'] font-semibold text-[#F59E0B] uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Official Application Portal</span>
                  </div>
                  <h4 className="font-['Poppins'] font-bold text-[20px] sm:text-[22px] text-white">
                    Ready to submit your application?
                  </h4>
                  <p className="font-['Inter'] text-xs sm:text-[13.5px] text-white/75 max-w-lg">
                    The application form opens directly in a new window. You can safely complete and submit your application on any device.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                  {onOpenApplication ? (
                    <button
                      type="button"
                      onClick={() => onOpenApplication(activeTab, initialProgramSlug)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] active:scale-95 text-[#0F172A] font-['Poppins'] font-bold text-[15px] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
                    >
                      <span>{activeForm.actionText}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  ) : (
                    <a
                      href={activeForm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[15px] shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
                    >
                      <span>{activeForm.actionText}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title="Copy direct application link"
                    className="w-full sm:w-auto px-4 py-3.5 rounded-[14px] bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 text-xs font-['Poppins'] font-semibold transition-colors cursor-pointer text-center"
                  >
                    {copiedLink ? 'Link Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Rolling Admissions Workflow (4 Steps) */}
          <div className="mt-16 pt-12 border-t border-[#E8EDF4]">
            <div className="text-center max-w-[600px] mx-auto mb-10">
              <span className="font-['Poppins'] font-semibold text-[12px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                HOW IT WORKS
              </span>
              <h3 className="font-['Poppins'] font-bold text-[24px] sm:text-[28px] text-[#0F172A]">
                Our 4-Step Rolling Admissions Flow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Submit Application',
                  desc: 'Complete the online application form with your track preference, contact details, and creative ambitions.',
                },
                {
                  step: '02',
                  title: 'Review Within 5 Days',
                  desc: 'Our admissions committee assesses motivation, commitment, and track fit on a rolling weekly basis.',
                },
                {
                  step: '03',
                  title: 'Discovery Chat',
                  desc: 'A brief 15-minute informal conversation (in-person at The Foundry or via video call) to align goals.',
                },
                {
                  step: '04',
                  title: 'Studio Onboarding',
                  desc: 'Selected candidates are confirmed, assigned studio workstations, and matched with mentors.',
                },
              ].map((item) => (
                <div key={item.step} className="p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E8EDF4] card-glow">
                  <span className="font-['Poppins'] font-bold text-[24px] text-[#2563EB] block mb-2">
                    {item.step}
                  </span>
                  <h4 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A] mb-2">
                    {item.title}
                  </h4>
                  <p className="font-['Inter'] text-[13.5px] text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions / Admissions Help Desk */}
          <div className="mt-12 p-6 sm:p-8 rounded-[24px] bg-[#EFF6FF] border border-[#BFDBFE] card-glow flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A]">
                  Have questions before submitting your application?
                </h4>
                <p className="font-['Inter'] text-xs sm:text-[14px] text-[#475569] leading-relaxed">
                  Our admissions coordinators are happy to assist with track selection or technical questions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-center">
              <a
                href="mailto:admissions@kijanakreatives.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F172A] font-['Poppins'] font-semibold text-xs sm:text-[13px] transition-colors"
              >
                <span>Email Admissions</span>
              </a>
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-xs sm:text-[13px] transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Admissions</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ADMISSIONS & GET INVOLVED FAQ */}
      <FAQSection
        onNavigate={onNavigate}
        title="Admissions & Application FAQs"
        subtitle="Common questions regarding cohort eligibility, studio hours, equipment provision, and mentor matching."
      />

      {/* 5. CLOSING CTA: SUPPORT A CREATIVE INSTEAD */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white text-center">
        <div className="max-w-[1240px] mx-auto px-6 max-w-[700px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] leading-[1.10] tracking-[-0.03em] mb-6">
            Support a creative instead.
          </h2>
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10">
            Funding equipment, studio software, and mentorship stipends is the fastest way to open a tuition-free place in our upcoming cohort.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('donate')}
            className="px-9 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[16px] transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-[#0F172A]" />
            <span>Donate to KKF</span>
          </button>
        </div>
      </section>

    </div>
  );
};

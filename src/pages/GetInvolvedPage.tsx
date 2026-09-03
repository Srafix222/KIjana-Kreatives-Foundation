import React, { useState, useEffect } from 'react';
import { PageId, YouthApplication, MentorApplication, VolunteerApplication, PartnerEnquiry } from '../types';
import { PROGRAMS, KENYA_COUNTIES } from '../data/content';
import { GOOGLE_FORMS } from '../data/forms';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Heart, 
  Handshake, 
  Sparkles, 
  ShieldCheck, 
  UserCheck,
  AlertCircle,
  ExternalLink,
  FileText
} from 'lucide-react';
import { sanitizeText, isValidEmail, isValidPhone, isRateLimited } from '../utils/security';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
  initialTab?: 'youth' | 'mentor' | 'volunteer' | 'partner';
  initialProgramSlug?: string;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  initialTab = 'youth',
  initialProgramSlug,
}) => {
  const [activeTab, setActiveTab] = useState<'youth' | 'mentor' | 'volunteer' | 'partner'>(initialTab);
  const [formError, setFormError] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  // Youth Form State
  const [youthForm, setYouthForm] = useState<YouthApplication>({
    fullName: '',
    email: '',
    phone: '',
    age: 19,
    county: 'Nairobi',
    educationLevel: 'Secondary',
    creativeInterests: '',
    skillLevel: 'Beginner',
    portfolioUrl: '',
    programPreference: initialProgramSlug || 'graphic-design',
    motivation: '',
    referralSource: 'Social media',
    consent: false,
    guardianName: '',
    guardianPhone: '',
    guardianConsent: false,
  });

  // Mentor Form State
  const [mentorForm, setMentorForm] = useState<MentorApplication>({
    name: '',
    email: '',
    phone: '',
    profession: '',
    organization: '',
    creativeField: '',
    yearsExperience: 5,
    skills: '',
    profileUrl: '',
    availability: '1–2 hours a month',
    motivation: '',
  });

  // Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState<VolunteerApplication>({
    name: '',
    email: '',
    phone: '',
    county: 'Nairobi',
    availability: 'Weekends & Events',
    interests: ['Cohort support'],
    motivation: '',
  });

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState<PartnerEnquiry>({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    interest: 'Fund a cohort',
    message: '',
  });

  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    if (initialProgramSlug) {
      setYouthForm((prev) => ({ ...prev, programPreference: initialProgramSlug }));
      setActiveTab('youth');
    }
  }, [initialProgramSlug]);

  const handleYouthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (honeypot) {
      setSubmissionSuccess({ referenceId: 'KKF-Y-2026-9999', type: 'Youth Cohort Application' });
      return;
    }

    if (isRateLimited('youth_submit', 2500)) {
      setFormError('Please wait a moment before resubmitting.');
      return;
    }

    const cleanName = sanitizeText(youthForm.fullName, 100);
    const cleanEmail = sanitizeText(youthForm.email, 120);
    const cleanPhone = sanitizeText(youthForm.phone, 30);

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      setFormError('Please provide a valid phone number.');
      return;
    }

    if (!youthForm.consent) {
      setFormError('Please agree to the data processing consent checkbox to submit.');
      return;
    }

    if (Number(youthForm.age) < 18 && (!youthForm.guardianName || !youthForm.guardianPhone || !youthForm.guardianConsent)) {
      setFormError('Applicants under 18 years must provide parent/guardian details and consent.');
      return;
    }

    const ref = `KKF-Y-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccess({ referenceId: ref, type: 'Youth Cohort Application' });
  };

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (honeypot) {
      setSubmissionSuccess({ referenceId: 'KKF-M-2026-9999', type: 'Mentor Network Application' });
      return;
    }

    if (isRateLimited('mentor_submit', 2500)) {
      setFormError('Please wait a moment before resubmitting.');
      return;
    }

    const cleanEmail = sanitizeText(mentorForm.email, 120);
    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const ref = `KKF-M-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccess({ referenceId: ref, type: 'Mentor Network Application' });
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (honeypot) {
      setSubmissionSuccess({ referenceId: 'KKF-V-2026-9999', type: 'Volunteer Registration' });
      return;
    }

    if (isRateLimited('volunteer_submit', 2500)) {
      setFormError('Please wait a moment before resubmitting.');
      return;
    }

    const cleanEmail = sanitizeText(volunteerForm.email, 120);
    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const ref = `KKF-V-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccess({ referenceId: ref, type: 'Volunteer Registration' });
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (honeypot) {
      setSubmissionSuccess({ referenceId: 'KKF-P-2026-9999', type: 'Partnership Inquiry' });
      return;
    }

    if (isRateLimited('partner_submit', 2500)) {
      setFormError('Please wait a moment before resubmitting.');
      return;
    }

    const cleanEmail = sanitizeText(partnerForm.email, 120);
    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const ref = `KKF-P-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccess({ referenceId: ref, type: 'Partnership Inquiry' });
  };

  return (
    <div id="get-involved-page" className="w-full">
      
      {/* 1. HERO */}
      <section className="bg-dark-textured text-white pt-[170px] pb-[100px] md:pt-[190px] md:pb-[120px] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 animate-kkf-rise">
          <div className="max-w-[800px]">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-4">
              Get Involved
            </span>
            <h1 className="font-['Poppins'] font-bold text-[36px] sm:text-[50px] lg:text-[60px] leading-[1.08] tracking-[-0.03em] mb-6">
              Four ways in. Pick yours.
            </h1>
            <p className="font-['Inter'] text-[18px] sm:text-[20px] text-white/85 leading-[1.65] font-normal max-w-[680px]">
              Whether you are starting out, giving time or building programs with us, there is a way to take part.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ROUTE CARDS */}
      <section className="py-20 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Youth */}
            <div 
              onClick={() => { 
                setActiveTab('youth'); 
                setSubmissionSuccess(null); 
              }}
              className={`rounded-[26px] p-8 border card-glow flex flex-col justify-between group cursor-pointer ${
                activeTab === 'youth' 
                  ? 'bg-white border-[#2563EB] shadow-lg ring-2 ring-[#2563EB]/20 -translate-y-1' 
                  : 'bg-white border-[#E8EDF4]'
              }`}
            >
              <div>
                <span className="font-['Poppins'] font-semibold text-[12px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                  YOUTH
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                  Join a program
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  Apply to a Creative or Digital Academy cohort. No prior formal training required.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <a
                  href={GOOGLE_FORMS.youth.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between w-full text-xs font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#1D4FD8] transition-colors"
                >
                  <span>Apply</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Mentors */}
            <div 
              onClick={() => { 
                setActiveTab('mentor'); 
                setSubmissionSuccess(null); 
              }}
              className={`rounded-[26px] p-8 border card-glow flex flex-col justify-between group cursor-pointer ${
                activeTab === 'mentor' 
                  ? 'bg-white border-[#2563EB] shadow-lg ring-2 ring-[#2563EB]/20 -translate-y-1' 
                  : 'bg-white border-[#E8EDF4]'
              }`}
            >
              <div>
                <span className="font-['Poppins'] font-semibold text-[12px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                  MENTORS
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                  Share your skills
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  Give a few hours a month to a young creative working in your field.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <a
                  href={GOOGLE_FORMS.mentor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between w-full text-xs font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#1D4FD8] transition-colors"
                >
                  <span>Become a Mentor</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Volunteers */}
            <div 
              onClick={() => { 
                setActiveTab('volunteer'); 
                setSubmissionSuccess(null); 
              }}
              className={`rounded-[26px] p-8 border card-glow-orange flex flex-col justify-between group cursor-pointer ${
                activeTab === 'volunteer' 
                  ? 'bg-white border-[#F59E0B] shadow-lg ring-2 ring-[#F59E0B]/20 -translate-y-1' 
                  : 'bg-white border-[#E8EDF4]'
              }`}
            >
              <div>
                <span className="font-['Poppins'] font-semibold text-[12px] tracking-[0.16em] text-[#D97706] uppercase block mb-3">
                  VOLUNTEERS
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-2 group-hover:text-[#D97706] transition-colors">
                  Give your time
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                  Help run cohorts, events, showcases and community workshops.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4]">
                <a
                  href={GOOGLE_FORMS.volunteer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between w-full text-xs font-['Poppins'] font-semibold text-[#D97706] hover:text-[#B45309] transition-colors"
                >
                  <span>Volunteer</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Partners (Dark Card) */}
            <div 
              onClick={() => { 
                setActiveTab('partner'); 
                setSubmissionSuccess(null); 
              }}
              className={`rounded-[26px] p-8 border dark-card-glow-orange flex flex-col justify-between text-white group cursor-pointer ${
                activeTab === 'partner' 
                  ? 'bg-[#0F172A] border-amber-400 shadow-xl ring-2 ring-amber-400/30 -translate-y-1' 
                  : 'bg-[#16223A] border-white/10'
              }`}
            >
              <div>
                <span className="font-['Poppins'] font-semibold text-[12px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-3">
                  PARTNERS
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-white mb-2 group-hover:text-amber-300 transition-colors">
                  Create opportunities
                </h3>
                <p className="font-['Inter'] text-[14.5px] text-white/70 leading-relaxed">
                  Build programs, placements or funded challenges with measurable impact.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href={GOOGLE_FORMS.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-between w-full text-xs font-['Poppins'] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Become a Partner</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. APPLICATION TABS & FORM ENGINE */}
      <section id="application-forms" className="py-20 md:py-28 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[940px] mx-auto px-6">
          
          <div className="text-center max-w-[600px] mx-auto mb-8">
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[42px] text-[#0F172A] leading-[1.10] tracking-[-0.025em] mb-3">
              Apply
            </h2>
            <p className="font-['Inter'] text-[16px] text-[#64748B]">
              Applications are reviewed on a rolling basis. Cohorts run year-round.
            </p>
          </div>

          {/* Direct Google Forms Action Card */}
          <div className="mb-10 bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF] border border-[#BFDBFE] rounded-[20px] p-5 sm:p-6 card-glow flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Poppins'] font-bold text-[15px] text-[#0F172A]">
                  Official Google Form Application
                </h4>
                <p className="font-['Inter'] text-xs sm:text-[13px] text-[#475569]">
                  Directly complete and submit via the Google Forms portal.
                </p>
              </div>
            </div>
            <a
              href={GOOGLE_FORMS[activeTab].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-xs sm:text-[13px] shadow-sm hover:shadow transition-all shrink-0"
            >
              <span>{GOOGLE_FORMS[activeTab].shortAction}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Form Switcher Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-[100px] bg-[#F1F5F9] border border-[#E2E8F0] gap-1">
              {[
                { id: 'youth', label: 'Youth application' },
                { id: 'mentor', label: 'Mentor application' },
                { id: 'volunteer', label: 'Volunteer' },
                { id: 'partner', label: 'Partner enquiry' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSubmissionSuccess(null);
                  }}
                  className={`px-5 py-2.5 rounded-[100px] font-['Poppins'] font-semibold text-xs sm:text-[13px] transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Success Banner */}
          {submissionSuccess ? (
            <div className="bg-[#F8FAFC] rounded-[28px] p-8 md:p-12 border border-emerald-200 text-center space-y-5 animate-kkf-rise">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-['Poppins'] font-bold text-2xl md:text-3xl text-[#0F172A]">
                Application Received!
              </h3>
              <p className="font-['Inter'] text-[15.5px] text-[#475569] max-w-lg mx-auto leading-relaxed">
                Thank you for applying for the <strong>{submissionSuccess.type}</strong>. Our admissions and mentorship committee will review your submission and contact you via email/phone within 5 working days.
              </p>
              <div className="p-4 rounded-[16px] bg-white border border-[#E8EDF4] max-w-md mx-auto text-left text-xs font-['Inter'] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Reference Code:</span>
                  <span className="font-mono font-bold text-[#2563EB]">{submissionSuccess.referenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Status:</span>
                  <span className="font-semibold text-emerald-600">Queued for Rolling Review</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionSuccess(null)}
                className="mt-4 px-6 py-2.5 rounded-[12px] bg-[#0F172A] text-white text-xs font-['Poppins'] font-semibold hover:bg-[#2563EB] transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="bg-[#F8FAFC] rounded-[28px] p-8 md:p-12 border border-[#E8EDF4] shadow-sm card-glow font-['Inter']">
              
              {/* Common Error Banner */}
              {formError && (
                <div className="mb-6 p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Honeypot field for bot protection across tabs */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="get_involved_hp"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* TAB 1: YOUTH APPLICATION */}
              {activeTab === 'youth' && (
                <form onSubmit={handleYouthSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={youthForm.fullName}
                        onChange={(e) => setYouthForm({ ...youthForm, fullName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={youthForm.email}
                        onChange={(e) => setYouthForm({ ...youthForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Phone (M-Pesa) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={youthForm.phone}
                        onChange={(e) => setYouthForm({ ...youthForm, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="14"
                        max="35"
                        value={youthForm.age}
                        onChange={(e) => setYouthForm({ ...youthForm, age: Number(e.target.value) })}
                        placeholder="18"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        County <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={youthForm.county}
                        onChange={(e) => setYouthForm({ ...youthForm, county: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        {KENYA_COUNTIES.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Under 18 Guardian Consent Module */}
                  {Number(youthForm.age) < 18 && (
                    <div className="p-5 rounded-[18px] bg-amber-500/10 border border-amber-500/30 space-y-4 animate-kkf-rise">
                      <div className="flex items-center gap-2 text-amber-800 font-['Poppins'] font-semibold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Guardian Consent Required (Applicant Under 18)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-amber-900 mb-1">
                            Parent / Guardian Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={youthForm.guardianName || ''}
                            onChange={(e) => setYouthForm({ ...youthForm, guardianName: e.target.value })}
                            placeholder="e.g. Mary Wanjiku"
                            className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-amber-200 text-sm focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-amber-900 mb-1">
                            Parent / Guardian Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={youthForm.guardianPhone || ''}
                            onChange={(e) => setYouthForm({ ...youthForm, guardianPhone: e.target.value })}
                            placeholder="+254 712 345 678"
                            className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-amber-200 text-sm focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <label className="flex items-start gap-2.5 text-xs text-amber-950 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          required
                          checked={youthForm.guardianConsent || false}
                          onChange={(e) => setYouthForm({ ...youthForm, guardianConsent: e.target.checked })}
                          className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span>I confirm that my parent or legal guardian has granted consent for my participation in KKF programs.</span>
                      </label>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Education Level
                      </label>
                      <select
                        value={youthForm.educationLevel}
                        onChange={(e) => setYouthForm({ ...youthForm, educationLevel: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="Secondary">Secondary</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Program Preference <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={youthForm.programPreference}
                        onChange={(e) => setYouthForm({ ...youthForm, programPreference: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        {PROGRAMS.map((p) => (
                          <option key={p.slug} value={p.slug}>{p.title} ({p.category})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Current Skill Level
                      </label>
                      <select
                        value={youthForm.skillLevel}
                        onChange={(e) => setYouthForm({ ...youthForm, skillLevel: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="Beginner">Beginner (No prior training)</option>
                        <option value="Some experience">Some experience (Self-taught / Hobby)</option>
                        <option value="Intermediate">Intermediate (Practicing / Small briefs)</option>
                        <option value="Advanced">Advanced (Seeking placement)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Portfolio / Social Link <span className="text-[#94A3B8] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={youthForm.portfolioUrl || ''}
                        onChange={(e) => setYouthForm({ ...youthForm, portfolioUrl: e.target.value })}
                        placeholder="https://behance.net/you or instagram"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                      Why do you want to join KKF? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={youthForm.motivation}
                      onChange={(e) => setYouthForm({ ...youthForm, motivation: e.target.value })}
                      placeholder="Tell us about your creative goals and what you hope to build (a few sentences is enough)..."
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Creative Interests
                      </label>
                      <input
                        type="text"
                        value={youthForm.creativeInterests}
                        onChange={(e) => setYouthForm({ ...youthForm, creativeInterests: e.target.value })}
                        placeholder="e.g. photography, animation, music"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        How did you hear about KKF?
                      </label>
                      <select
                        value={youthForm.referralSource}
                        onChange={(e) => setYouthForm({ ...youthForm, referralSource: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="Social media">Social media</option>
                        <option value="A friend">A friend</option>
                        <option value="School">School / Community</option>
                        <option value="An event">An event</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-xs text-[#475569] cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      required
                      checked={youthForm.consent}
                      onChange={(e) => setYouthForm({ ...youthForm, consent: e.target.checked })}
                      className="mt-0.5 rounded text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span>
                      I consent to KKF storing this information for the purpose of processing my application in accordance with the Kenya Data Protection Act 2019.
                    </span>
                  </label>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-9 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MENTOR APPLICATION */}
              {activeTab === 'mentor' && (
                <form onSubmit={handleMentorSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={mentorForm.name}
                        onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={mentorForm.email}
                        onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={mentorForm.phone}
                        onChange={(e) => setMentorForm({ ...mentorForm, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Profession <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={mentorForm.profession}
                        onChange={(e) => setMentorForm({ ...mentorForm, profession: e.target.value })}
                        placeholder="e.g. Art Director, Cinematographer"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Organization / Studio
                      </label>
                      <input
                        type="text"
                        value={mentorForm.organization}
                        onChange={(e) => setMentorForm({ ...mentorForm, organization: e.target.value })}
                        placeholder="Where you work"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Creative Field
                      </label>
                      <input
                        type="text"
                        value={mentorForm.creativeField}
                        onChange={(e) => setMentorForm({ ...mentorForm, creativeField: e.target.value })}
                        placeholder="e.g. Film, Design, Music, UI/UX"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={mentorForm.yearsExperience}
                        onChange={(e) => setMentorForm({ ...mentorForm, yearsExperience: Number(e.target.value) })}
                        placeholder="5"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Availability
                      </label>
                      <select
                        value={mentorForm.availability}
                        onChange={(e) => setMentorForm({ ...mentorForm, availability: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="1–2 hours a month">1–2 hours a month</option>
                        <option value="3–5 hours a month">3–5 hours a month</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Project-based">Project-based</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Skills you can teach
                      </label>
                      <input
                        type="text"
                        value={mentorForm.skills}
                        onChange={(e) => setMentorForm({ ...mentorForm, skills: e.target.value })}
                        placeholder="e.g. After Effects, Client Pitching, Lighting"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        LinkedIn or Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={mentorForm.profileUrl || ''}
                        onChange={(e) => setMentorForm({ ...mentorForm, profileUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                      Why do you want to mentor with KKF?
                    </label>
                    <textarea
                      rows={3}
                      value={mentorForm.motivation}
                      onChange={(e) => setMentorForm({ ...mentorForm, motivation: e.target.value })}
                      placeholder="Share a brief note on what excites you about mentoring emerging creators..."
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-9 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Mentor Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: VOLUNTEER APPLICATION */}
              {activeTab === 'volunteer' && (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        County of Residence
                      </label>
                      <select
                        value={volunteerForm.county}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, county: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        {KENYA_COUNTIES.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                      How would you like to help?
                    </label>
                    <textarea
                      rows={3}
                      value={volunteerForm.motivation}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, motivation: e.target.value })}
                      placeholder="e.g. event coordination, cohort operations, video production, workshop logistics..."
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-9 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Volunteer Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: PARTNER ENQUIRY */}
              {activeTab === 'partner' && (
                <form onSubmit={handlePartnerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Organization / Foundation Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.organization}
                        onChange={(e) => setPartnerForm({ ...partnerForm, organization: e.target.value })}
                        placeholder="Company or Foundation"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Lead Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.contactName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={partnerForm.email}
                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                        placeholder="partnership@organization.com"
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                        Partnership Model
                      </label>
                      <select
                        value={partnerForm.interest}
                        onChange={(e) => setPartnerForm({ ...partnerForm, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="Fund a cohort">Fund a full cohort</option>
                        <option value="Fund a challenge">Sponsor a Creative Challenge</option>
                        <option value="Equipment library">Donate Studio Equipment</option>
                        <option value="Placements">Provide Studio Placements / Internships</option>
                        <option value="Other">Other Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13.5px] font-medium text-[#475569] mb-2">
                      Message / Partnership Concept
                    </label>
                    <textarea
                      rows={4}
                      value={partnerForm.message}
                      onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                      placeholder="Tell us about your organization's goals and how you'd like to support Kenyan youth..."
                      className="w-full px-4 py-3 rounded-[12px] bg-white border border-[#DDE5EF] text-[15px] focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-9 py-4 rounded-[14px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Partnership Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>
      </section>

      {/* 4. CLOSING CTA: SUPPORT A CREATIVE INSTEAD */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white text-center">
        <div className="max-w-[1240px] mx-auto px-6 max-w-[700px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] leading-[1.10] tracking-[-0.03em] mb-6">
            Support a creative instead.
          </h2>
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10">
            Funding equipment, training and mentorship is the fastest way to open a place in a cohort.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('donate')}
            className="px-9 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[16px] transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 mx-auto"
          >
            <Heart className="w-4 h-4 fill-[#0F172A]" />
            <span>Donate</span>
          </button>
        </div>
      </section>

    </div>
  );
};

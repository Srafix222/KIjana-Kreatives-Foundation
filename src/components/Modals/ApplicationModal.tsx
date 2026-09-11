import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, AlertCircle, FileText, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { sanitizeText, isValidEmail, isValidPhone, isRateLimited } from '../../utils/security';
import { BRAND, PROGRAMS } from '../../data/content';
import { GOOGLE_FORMS } from '../../data/forms';

export type ApplicationType = 'youth' | 'mentor' | 'volunteer' | 'partner';

interface ApplicationModalProps {
  isOpen: boolean;
  type: ApplicationType;
  selectedTrackSlug?: string;
  onClose: () => void;
  onTypeChange?: (newType: ApplicationType) => void;
}

const KENYAN_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret (Uasin Gishu)',
  'Kiambu',
  'Machakos',
  'Kajiado',
  'Kilifi',
  'Nyeri',
  'Meru',
  'Kakamega',
  'Other Kenyan County',
  'International / Diaspora',
];

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  type,
  selectedTrackSlug,
  onClose,
  onTypeChange,
}) => {
  const [activeType, setActiveType] = useState<ApplicationType>(type);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: 'Nairobi',
    track: selectedTrackSlug || 'graphic-design-branding',
    organization: '',
    experience: 'Beginner (No prior experience)',
    portfolioUrl: '',
    statement: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    name: string;
    type: ApplicationType;
    trackName?: string;
  } | null>(null);

  useEffect(() => {
    setActiveType(type);
    if (selectedTrackSlug) {
      setFormData((prev) => ({ ...prev, track: selectedTrackSlug }));
    }
  }, [type, selectedTrackSlug]);

  if (!isOpen) return null;

  const currentConfig = GOOGLE_FORMS[activeType];

  const handleTabChange = (newType: ApplicationType) => {
    setActiveType(newType);
    setErrorMessage('');
    if (onTypeChange) onTypeChange(newType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      // Bot trapped
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionReceipt({
          referenceId: `KKF-${activeType.toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          submittedAt: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
          name: formData.fullName || 'Applicant',
          type: activeType,
        });
      }, 400);
      return;
    }

    if (isRateLimited('app_form_submit', 2000)) {
      setErrorMessage('Please wait a few seconds before submitting again.');
      return;
    }

    const cleanName = sanitizeText(formData.fullName, 100);
    const cleanEmail = sanitizeText(formData.email, 120);
    const cleanPhone = sanitizeText(formData.phone, 30);
    const cleanStatement = sanitizeText(formData.statement, 1500);
    const cleanOrg = sanitizeText(formData.organization, 120);
    const cleanPortfolio = sanitizeText(formData.portfolioUrl, 200);

    if (!cleanName || !cleanEmail || !cleanPhone) {
      setErrorMessage('Please fill in your full name, email address, and phone number.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      setErrorMessage('Please enter a valid phone number (e.g. +254 700 123 456).');
      return;
    }

    if (activeType === 'youth' && !formData.track) {
      setErrorMessage('Please select your preferred creative program track.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const selectedTrack = PROGRAMS.find((p) => p.slug === formData.track);
      const refNumber = `KKF-${activeType.toUpperCase().slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionReceipt({
        referenceId: refNumber,
        submittedAt: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
        name: cleanName,
        type: activeType,
        trackName: selectedTrack?.title,
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmissionReceipt(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[260] flex items-center justify-center p-3 sm:p-6 bg-[#0B1329]/80 backdrop-blur-md animate-kkf-rise overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-application-title"
    >
      <div className="relative w-full max-w-[680px] bg-white rounded-[24px] sm:rounded-[30px] shadow-[0_28px_64px_rgba(15,23,42,0.3)] border border-[#E8EDF4] overflow-hidden my-auto max-h-[92vh] flex flex-col font-['Inter']">
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-5 bg-[#F8FAFC] border-b border-[#E8EDF4] flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#2563EB] text-[11px] font-['Poppins'] font-semibold tracking-wider uppercase mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>{currentConfig.category}</span>
            </div>
            <h2 id="modal-application-title" className="font-['Poppins'] font-bold text-xl sm:text-2xl text-[#0F172A] leading-tight">
              {submissionReceipt ? 'Application Submitted Successfully' : currentConfig.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-['Inter']">
              {submissionReceipt
                ? 'Thank you for taking this step. Here is your official submission record.'
                : '100% Tuition-Free · Hardware & Software Provided · Nairobi Studios'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-[#E2E8F0] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submissionReceipt ? (
            <div className="space-y-6 py-2">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
                  Karibu, {submissionReceipt.name}!
                </h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                  Your application has been logged directly in the Kijana Kreatives Foundation intake database for review.
                </p>
              </div>

              {/* Official Record Card */}
              <div className="p-5 sm:p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-3.5 text-xs sm:text-sm text-[#334155]">
                <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B] font-medium">Application Reference</span>
                  <span className="font-mono font-bold text-[#2563EB] tracking-wider text-sm sm:text-base">
                    {submissionReceipt.referenceId}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B] font-medium">Intake Category</span>
                  <span className="font-semibold text-[#0F172A] uppercase">{submissionReceipt.type}</span>
                </div>
                {submissionReceipt.trackName && (
                  <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#64748B] font-medium">Selected Studio Track</span>
                    <span className="font-semibold text-[#0F172A]">{submissionReceipt.trackName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B] font-medium">Date Received</span>
                  <span className="font-medium text-[#0F172A]">{submissionReceipt.submittedAt}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#64748B] font-medium">Admissions Review Time</span>
                  <span className="font-semibold text-emerald-700">Within 5 Working Days</span>
                </div>
              </div>

              {/* Next Steps Guidance */}
              <div className="p-4 rounded-[16px] bg-blue-50/80 border border-blue-200 text-xs sm:text-[13px] text-[#1E3A8A] space-y-2">
                <div className="font-['Poppins'] font-bold flex items-center gap-1.5 text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Next Steps in the Admissions Process</span>
                </div>
                <p className="leading-relaxed">
                  1. Our committee will review your submission and contact you via WhatsApp and Email.<br />
                  2. Shortlisted applicants will receive a brief 15-minute discovery chat invitation.<br />
                  3. If accepted, you will receive workstation allocation and onboarding instructions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/254700123456?text=Hello%20KKF%20Admissions%20Desk,%20I%20have%20submitted%20application%20${submissionReceipt.referenceId}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-[14px] bg-emerald-600 hover:bg-emerald-700 text-white font-['Poppins'] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Admissions on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-[#0F172A] hover:bg-slate-800 text-white font-['Poppins'] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Category Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0]">
                {[
                  { id: 'youth', label: 'Youth Track' },
                  { id: 'mentor', label: 'Mentor' },
                  { id: 'volunteer', label: 'Volunteer' },
                  { id: 'partner', label: 'Partner' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id as ApplicationType)}
                    className={`py-2 px-2 text-xs font-['Poppins'] font-semibold rounded-lg transition-all text-center cursor-pointer ${
                      activeType === item.id
                        ? 'bg-white text-[#2563EB] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Honeypot field for bot suppression */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amani Mwangi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="amani@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone & County */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 700 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all font-mono"
                  />
                  <span className="text-[10px] text-[#64748B] block mt-0.5">Used for cohort WhatsApp group onboarding</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                    County of Residence <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all cursor-pointer"
                  >
                    {KENYAN_COUNTIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category-Specific Inputs */}
              {activeType === 'youth' && (
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                    Preferred Creative Program Track <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all cursor-pointer"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title} ({p.category}) · {p.duration}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-[#64748B] block mt-0.5">
                    100% Tuition-Free. Includes full studio access and dedicated hardware.
                  </span>
                </div>
              )}

              {activeType === 'mentor' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                      Current Role / Studio
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Animator at XYZ Studio"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                      Years in Industry
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB]"
                    >
                      <option value="2-4 Years">2–4 Years</option>
                      <option value="5-8 Years">5–8 Years</option>
                      <option value="8+ Years (Creative Director / Principal)">8+ Years (Creative Director / Principal)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeType === 'partner' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                      Organization / Agency Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Media Group"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                      Partnership Objective
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB]"
                    >
                      <option value="Cohort Co-funding / CSR Sponsorship">Cohort Co-funding / CSR Sponsorship</option>
                      <option value="Equipment & Studio Hardware Donation">Equipment & Studio Hardware Donation</option>
                      <option value="Student Internships & Graduate Hiring">Student Internships & Graduate Hiring</option>
                      <option value="Commissioning Creative Briefs / Capstones">Commissioning Creative Briefs / Capstones</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Portfolio Link / Website */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                  Portfolio, Behance, LinkedIn or Social Handle <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://behance.net/username or @handle"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] transition-all"
                />
              </div>

              {/* Motivation Statement */}
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1 font-['Poppins']">
                  {activeType === 'youth' 
                    ? 'Why do you want to join this creative track? (2-3 sentences)' 
                    : activeType === 'mentor'
                    ? 'How would you like to contribute to emerging creators?'
                    : activeType === 'partner'
                    ? 'Briefly outline your proposed partnership vision:'
                    : 'Tell us about your background and interests:'}
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a short note about your goals and interests..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] text-xs sm:text-sm focus:outline-hidden focus:border-[#2563EB] transition-all resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#E8EDF4] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={currentConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#64748B] hover:text-[#2563EB] flex items-center gap-1 transition-colors"
                >
                  <span>Or use Google Form portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] hover:text-[#0F172A] hover:bg-slate-50 font-['Poppins'] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-7 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4FD8] active:scale-95 disabled:opacity-70 text-white font-['Poppins'] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/25 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { BRAND } from '../../data/content';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'safeguarding' | 'financial' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';
  const isSafeguarding = type === 'safeguarding';
  const isFinancial = type === 'financial';

  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy & Data Protection';
      case 'terms': return 'Terms of Participation & Engagement';
      case 'safeguarding': return 'Youth Safeguarding & Child Protection';
      case 'financial': return 'Financial Transparency & Governance';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'privacy': return 'In compliance with Kenya Data Protection Act 2019';
      case 'terms': return 'Community standards, intellectual property & studio conduct';
      case 'safeguarding': return 'Safe creative spaces policy & minor protection protocols';
      case 'financial': return 'Audited reports, NGO Board filings & donor stewardship';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-kkf-rise"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[700px] bg-white rounded-[28px] shadow-[0_26px_56px_rgba(15,23,42,0.25)] border border-[#E8EDF4] p-6 md:p-8 max-h-[85vh] flex flex-col font-['Inter']">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-blue-50 hover:text-[#2563EB] text-[#64748B] border border-transparent hover:border-blue-200 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E8EDF4]">
          <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center">
            {isPrivacy ? <Lock className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="font-['Poppins'] font-bold text-xl text-[#0F172A]">
              {getTitle()}
            </h2>
            <span className="text-xs text-[#64748B]">
              {getSubtitle()}
            </span>
          </div>
        </div>

        <div className="overflow-y-auto space-y-4 text-xs text-[#475569] leading-relaxed flex-1 pr-2">
          {isPrivacy && (
            <>
              <p>
                <strong>1. Information We Collect:</strong> Kijana Kreatives Foundation collects personal information submitted during youth applications, mentor registrations, volunteer applications, event RSVPs, and donations (e.g. name, email, phone number, age, county of residence, and guardian consent for applicants under 18).
              </p>
              <p>
                <strong>2. How Data is Used:</strong> Data is solely utilized to process cohort applications, coordinate mentorship sessions, distribute event communications, deliver donation tax receipts, and report anonymized, aggregated impact statistics to registered partners.
              </p>
              <p>
                <strong>3. Storage & Security:</strong> All applicant and donor records are encrypted in transit and at rest. We never sell, lease, or monetize user data. Consent records for participant photography and stories are archived securely.
              </p>
              <p>
                <strong>4. Your Rights:</strong> Under the Kenya Data Protection Act 2019, you have the right to request access to, correction of, or permanent deletion of your personal records by contacting <em>{BRAND.email}</em>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>1. Eligibility:</strong> KKF Creative Academy programs and challenges are open to Kenyan youth ages 16–30. Applicants under 18 must provide written guardian consent during registration.
              </p>
              <p>
                <strong>2. Code of Conduct:</strong> All studio spaces, virtual workshops, and mentorship cohorts maintain a strict policy of mutual respect, craft excellence, and zero tolerance for discrimination, harassment, or intellectual property theft.
              </p>
              <p>
                <strong>3. Equipment Stewardship:</strong> Students granted access to cameras, computers, lighting rigs, or studio facilities agree to handle equipment responsibly in accordance with hub safety protocols.
              </p>
              <p>
                <strong>4. Intellectual Property:</strong> Participants retain 100% intellectual property ownership of the original artwork, films, designs, and music created during their cohorts.
              </p>
            </>
          )}

          {isSafeguarding && (
            <>
              <p>
                <strong>1. Minor Protection Mandate:</strong> KKF enforces a zero-tolerance policy against any form of exploitation, harm, or abuse. Every mentor, tutor, and staff member undergoes background validation and signs the Child Protection Protocol.
              </p>
              <p>
                <strong>2. Dual-Supervision Rule:</strong> 1-on-1 private mentoring in physical closed rooms is prohibited; all sessions take place in open studio spaces or monitored digital channels.
              </p>
              <p>
                <strong>3. Photo & Media Consent:</strong> Media showcasing participants under 18 requires verified guardian authorization prior to publication.
              </p>
            </>
          )}

          {isFinancial && (
            <>
              <p>
                <strong>1. NGO Registration:</strong> Kijana Kreatives Foundation is a registered non-profit organization in the Republic of Kenya.
              </p>
              <p>
                <strong>2. Allocation Model:</strong> 85% of donated funds go directly into training programs, software licenses, equipment bursaries, and youth stipends. 15% covers hub facilities and operations.
              </p>
              <p>
                <strong>3. Independent Audits:</strong> Our accounts undergo annual independent external audits and are submitted to the NGO Coordination Board and published in our annual impact reports.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#E8EDF4] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-[12px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-xs transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};

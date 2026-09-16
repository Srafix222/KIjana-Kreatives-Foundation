import React from 'react';
import { Program } from '../../types';
import { X, Calendar, Clock, MapPin, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { Breadcrumbs } from '../Breadcrumbs';
import { GOOGLE_FORMS } from '../../data/forms';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onApply: (programSlug: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onApply,
}) => {
  if (!program) return null;

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm overflow-y-auto animate-kkf-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-program-title"
    >
      <div className="relative w-full max-w-[760px] bg-white rounded-[28px] shadow-[0_26px_56px_rgba(15,23,42,0.25)] border border-[#E8EDF4] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header with Image */}
        <div className="relative h-60 w-full shrink-0">
          <ImagePlaceholder
            src={program.image}
            fallbackText={program.imagePlaceholderText}
            alt={program.title}
            aspectRatio="auto"
            className="w-full h-full"
            darkTheme={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="mb-2">
              <Breadcrumbs
                items={[
                  { label: 'Creative Programs', page: 'programs' },
                  { label: `${program.category} Tracks` },
                  { label: program.title, active: true },
                ]}
                onNavigate={() => onClose()}
                variant="dark"
                showHomeIcon={false}
                showJsonLd={false}
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-[100px] bg-[#2563EB] text-white text-xs font-['Poppins'] font-semibold uppercase tracking-wider">
                {program.category}
              </span>
              <span className={`px-3 py-1 rounded-[100px] text-xs font-['Poppins'] font-semibold ${
                program.status === 'Open' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {program.status === 'Open' ? 'Applications Open' : program.status}
              </span>
            </div>
            <h2 id="modal-program-title" className="font-['Poppins'] font-bold text-2xl md:text-3xl text-white tracking-tight">
              {program.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 font-['Inter']">
          
          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E8EDF4]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Duration</span>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{program.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Cost</span>
                <span className="text-[13.5px] font-semibold text-emerald-700">{program.cost || 'Tuition-Free'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Schedule</span>
                <span className="text-[13px] font-semibold text-[#0F172A]">{program.schedule || 'Flexible Studio Hours'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Location</span>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{program.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Skill Level</span>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{program.level}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <div>
                <span className="text-[11px] text-[#64748B] block font-medium">Next Cohort</span>
                <span className="text-[13.5px] font-semibold text-[#0F172A]">{program.cohort}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-['Poppins'] font-bold text-lg text-[#0F172A] mb-2">
              About This Program
            </h3>
            <p className="text-[#475569] text-[15.5px] leading-relaxed">
              {program.description} Every cohort is built around live creative briefs, hands-on production in our studios, and weekly critique sessions with senior East African industry professionals.
            </p>
          </div>

          {/* Key Competencies & Skills */}
          {program.skills && (
            <div>
              <h3 className="font-['Poppins'] font-bold text-base text-[#0F172A] mb-3">
                Skills & Industry Tools You Will Master
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-[100px] bg-[#EFF5FF] text-[#2563EB] font-['Poppins'] font-medium text-xs border border-[#2563EB]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          {program.curriculum && (
            <div>
              <h3 className="font-['Poppins'] font-bold text-base text-[#0F172A] mb-3">
                Curriculum Breakdown
              </h3>
              <ul className="space-y-2.5">
                {program.curriculum.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14.5px] text-[#334155]">
                    <CheckCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites */}
          {program.prerequisites && (
            <div className="p-4 rounded-[14px] bg-[#F8FAFC] border-l-4 border-[#F59E0B]">
              <span className="font-['Poppins'] font-semibold text-xs text-[#0F172A] uppercase tracking-wider block mb-1">
                Prerequisites & Eligibility
              </span>
              <p className="text-xs text-[#64748B]">
                {program.prerequisites} Open to young Kenyan creatives ages 16–30.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-[#E8EDF4] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#64748B]">
            Rolling admission · Next cohort starts <strong className="text-[#0F172A]">{program.cohort}</strong>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onApply(program.slug)}
              className="w-full sm:w-auto px-7 py-3 rounded-[13px] bg-[#2563EB] hover:bg-[#1D4FD8] active:scale-95 text-white font-['Poppins'] font-semibold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for this Track</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PageId, Report, BreadcrumbItem } from '../types';
import { OUTCOMES, KENYA_COUNTIES, REPORTS } from '../data/content';
import { APP_ASSETS } from '../data/assets';
import { PageHero } from '../components/PageHero';
import { StatBand } from '../components/StatBand';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ArrowRight, MapPin, FileText, Download, CheckCircle2, TrendingUp, Users, Heart } from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenReport: (report: Report) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate, onOpenReport }) => {
  const [selectedCounty, setSelectedCounty] = useState<string>('Nairobi');

  const activeCounties = KENYA_COUNTIES.filter((c) => c.active);
  const currentCountyData = activeCounties.find((c) => c.name === selectedCounty) || activeCounties[0];

  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: 'Impact & Reports', 
      page: selectedCounty !== 'Nairobi' ? 'impact' : undefined,
      active: selectedCounty === 'Nairobi'
    },
    ...(selectedCounty !== 'Nairobi' ? [{ label: `${selectedCounty} County`, active: true }] : []),
  ];

  const handleBreadcrumbNavigate = (page: PageId) => {
    if (page === 'impact' && selectedCounty !== 'Nairobi') {
      setSelectedCounty('Nairobi');
    } else {
      onNavigate(page);
    }
  };

  return (
    <div id="impact-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Contextual Showcase Imagery) */}
      <PageHero
        badge="Impact & Results"
        badgeColor="amber"
        title="What the work has added up to."
        description="Figures below represent verified program outcomes. Every metric is tied to an audited student, mentor, and placement record."
        imageSrc={APP_ASSETS.academyShowcase}
        imageAlt="Kijana Kreatives Foundation showcase and graduation outcomes"
        imagePosition="object-center"
        breadcrumbs={breadcrumbItems}
        onNavigate={handleBreadcrumbNavigate}
      />

      {/* 2. ANIMATED STAT BAND */}
      <StatBand />

      {/* 3. WHERE WE WORK (Nairobi + 10 County Chips + Interactive Map Explorer) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block">
                Geographic Reach
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                Where we work
              </h2>
              <p className="font-['Inter'] text-[17px] text-[#475569] leading-relaxed">
                Programs currently run out of Nairobi with satellite cohorts and challenge participation across ten counties.
              </p>

              {/* 10 County Chips */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider block mb-3 font-['Poppins']">
                  Active County Hubs
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCounties.map((county) => (
                    <button
                      key={county.name}
                      type="button"
                      onClick={() => setSelectedCounty(county.name)}
                      className={`px-4 py-2 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer ${
                        selectedCounty === county.name
                          ? 'bg-[#2563EB] text-white shadow-md'
                          : 'bg-[#F8FAFC] text-[#334155] border border-[#E8EDF4] hover:border-[#2563EB] hover:bg-blue-50/60 hover:text-[#2563EB]'
                      }`}
                    >
                      {county.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* County Data Box */}
              <div className="p-5 rounded-[20px] bg-[#EFF5FF] border border-[#2563EB]/20 card-glow flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#64748B] block">Selected County</span>
                  <span className="font-['Poppins'] font-bold text-lg text-[#0F172A]">{currentCountyData.name} County</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#64748B] block">Youth Trained</span>
                  <span className="font-['Poppins'] font-bold text-lg text-[#2563EB]">{currentCountyData.participants || 45}+ Creatives</span>
                </div>
              </div>
            </div>

            {/* Right: Map Vector Illustration */}
            <div className="lg:col-span-6 bg-[#F8FAFC] rounded-[28px] p-8 border border-[#E8EDF4] card-glow flex flex-col items-center justify-center">
              <div className="w-full max-w-[440px] aspect-[4/3] rounded-[20px] overflow-hidden bg-white border border-[#E8EDF4] p-6 flex flex-col justify-between shadow-sm card-glow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#2563EB]" />
                    <span className="font-['Poppins'] font-bold text-sm text-[#0F172A]">Kenya Regional Grid</span>
                  </div>
                  <span className="text-xs font-mono bg-[#EFF5FF] text-[#2563EB] px-2.5 py-1 rounded-full font-semibold">10 Counties Active</span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E8EDF4] card-glow">
                    <span className="text-[11px] text-[#64748B] block">Main Facility</span>
                    <span className="font-semibold text-xs text-[#0F172A]">Nairobi Studio Hub</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E8EDF4] card-glow">
                    <span className="text-[11px] text-[#64748B] block">Satellite Pods</span>
                    <span className="font-semibold text-xs text-[#0F172A]">Mombasa &amp; Kisumu</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#64748B] text-center font-mono">
                  Asset: about/kenya-counties-map.svg (Highlighted in #2563EB)
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUTCOMES */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Audited Metrics
            </span>
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Long-term Outcomes
            </h2>
            <p className="font-['Inter'] text-[16.5px] text-[#64748B] mt-3">
              Measuring long-term creative agency, financial stability, and community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((outcome, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-[26px] p-8 border border-[#E8EDF4] flex flex-col justify-between group ${
                  outcome.accent ? 'card-glow-orange' : 'card-glow'
                }`}
              >
                <div>
                  <span className={`font-['Poppins'] font-bold text-[38px] sm:text-[42px] block mb-3 leading-none tabular-nums transition-transform group-hover:scale-105 ${
                    outcome.accent ? 'text-[#F59E0B]' : 'text-[#2563EB]'
                  }`}>
                    {outcome.value}
                  </span>
                  <h3 className="font-['Poppins'] font-bold text-[19px] text-[#0F172A] group-hover:text-slate-900 mb-2 leading-snug">
                    {outcome.title}
                  </h3>
                  <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ANNUAL REPORTS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[940px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                Transparency &amp; Governance
              </span>
              <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[38px] text-[#0F172A] tracking-tight">
                Annual Reports &amp; Filings
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="font-['Poppins'] font-semibold text-[#2563EB] text-sm hover:text-[#F59E0B] transition-colors cursor-pointer"
            >
              All Resources →
            </button>
          </div>

          <div className="space-y-4">
            {REPORTS.map((report) => (
              <div
                key={report.year}
                className="p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E8EDF4] card-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[16.5px] text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-xs text-[#64748B] font-['Inter'] mt-1">
                      {report.summary}
                    </p>
                    <span className="text-[11px] font-mono text-[#94A3B8] block mt-1">
                      {report.period} · {report.fileSize}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenReport(report)}
                  className="px-5 py-2.5 rounded-[10px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-blue-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View / Download</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white text-center">
        <div className="max-w-[1240px] mx-auto px-6 max-w-[700px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] leading-[1.10] tracking-[-0.03em] mb-6">
            Help us reach the next cohort.
          </h2>
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10">
            Every contribution funds equipment, studio time and mentorship for an aspiring Kenyan creator.
          </p>

          <button
            type="button"
            onClick={() => onNavigate('donate')}
            className="px-9 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[16px] transition-all shadow-lg shadow-amber-500/20"
          >
            Donate Today
          </button>
        </div>
      </section>

    </div>
  );
};

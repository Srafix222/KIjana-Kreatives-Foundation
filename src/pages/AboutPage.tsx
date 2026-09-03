import React from 'react';
import { PageId } from '../types';
import { VALUES, WHY_WE_EXIST, TIMELINE, TEAM_MEMBERS } from '../data/content';
import { APP_ASSETS } from '../data/assets';
import { PageHero } from '../components/PageHero';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ArrowRight, Heart, Users, Target, Sparkles, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Contextual Imagery & Brand Glows) */}
      <PageHero
        badge="About KKF"
        badgeColor="amber"
        title="A foundation built around young Kenyan talent."
        description="We work with young people who already have ability, and give them the training, mentorship and opportunities to turn it into work."
        imageSrc={APP_ASSETS.creativeWorkshop}
        imageAlt="Young Kenyan creators in a collaborative workshop at KKF Nairobi studio"
        imagePosition="object-center"
      />

      {/* 2. OUR STORY */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block">
                Our Story
              </span>
              <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[42px] text-[#0F172A] leading-[1.12] tracking-[-0.025em]">
                It started with a group of young creatives and borrowed equipment.
              </h2>
              <p className="font-['Inter'] text-[17px] text-[#475569] leading-[1.72]">
                In Nairobi and across Kenya, high youth unemployment exists alongside a fast-growing digital and commercial media sector. Yet most young creators cannot afford licensed design suites, cinema cameras, or structured portfolio feedback.
              </p>
              <p className="font-['Inter'] text-[17px] text-[#0F172A] font-semibold leading-[1.72]">
                Kijana Kreatives Foundation provides free studio access, structured project cohorts, and direct mentorship from working agency directors.
              </p>
              <p className="font-['Inter'] text-[15.5px] text-[#64748B] leading-relaxed">
                Since our founding in Nairobi in 2021, we have built physical studio access points and satellite learning pods that have served over 1,000 emerging designers, photographers, animators, and media technologists.
              </p>
            </div>

            <div className="lg:col-span-6 rounded-[28px] overflow-hidden shadow-xl border border-[#E8EDF4]">
              <ImagePlaceholder
                src={APP_ASSETS.creativeWorkshop}
                fallbackText="about/workshop.jpg — Design workshop, several people at tables (3:4)"
                alt="KKF Foundation founders and students in Nairobi"
                aspectRatio="4:3"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY WE EXIST */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Why We Exist
            </h2>
            <p className="font-['Inter'] text-[16.5px] text-[#64748B] mt-2">
              Three commitments that anchor everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_WE_EXIST.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[26px] p-8 md:p-10 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between"
              >
                <div>
                  <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-['Poppins'] font-bold text-[22px] text-[#0F172A] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-['Inter'] text-[15.5px] text-[#475569] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Guiding Principles
            </span>
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-[24px] p-8 border border-[#E8EDF4] card-glow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center font-['Poppins'] font-bold text-sm mb-5">
                    0{idx + 1}
                  </div>
                  <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] mb-2.5">
                    {val.title}
                  </h3>
                  <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed">
                    {val.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP */}
      <section className="py-20 md:py-28 bg-[#F8FAFC] border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Leadership
            </h2>
            <p className="font-['Inter'] text-[16px] text-[#64748B] mt-2">
              The team and board guiding KKF&apos;s educational programs, operations and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.order}
                className="bg-white rounded-[26px] overflow-hidden border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between"
              >
                <div className="h-[280px] w-full overflow-hidden">
                  <ImagePlaceholder
                    src={member.portrait}
                    fallbackText={member.placeholderText}
                    alt={member.name}
                    aspectRatio="3:4"
                    className="w-full h-full"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-['Poppins'] font-bold text-[18px] text-[#0F172A] leading-tight">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#2563EB] font-['Poppins'] block mt-1 mb-3">
                    {member.role}
                  </span>
                  <p className="text-xs text-[#64748B] font-['Inter'] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TIMELINE */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[940px] mx-auto px-6">
          
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Our Journey
            </span>
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Milestones
            </h2>
          </div>

          <div className="space-y-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[24px] bg-[#F8FAFC] border border-[#E8EDF4] flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                  item.accent ? 'card-glow-orange' : 'card-glow'
                }`}
              >
                <div className="sm:w-28 shrink-0">
                  <span className={`font-['Poppins'] font-bold text-[36px] leading-none ${
                    item.accent ? 'text-[#F59E0B]' : 'text-[#2563EB]'
                  }`}>
                    {item.year}
                  </span>
                </div>
                <div className="flex-1 font-['Inter'] text-[16px] text-[#334155] leading-relaxed">
                  {item.milestone}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white text-center">
        <div className="max-w-[1240px] mx-auto px-6 max-w-[740px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[48px] leading-[1.10] tracking-[-0.03em] mb-6">
            Build the Next Generation of Creative Craft
          </h2>
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10">
            Join a cohort, share your skills as a mentor, or help fund equipment for young Kenyan creators.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('programs')}
              className="px-8 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-lg shadow-blue-600/30"
            >
              Explore Programs
            </button>
            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className="px-8 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[15.5px] transition-all"
            >
              Support Our Mission
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

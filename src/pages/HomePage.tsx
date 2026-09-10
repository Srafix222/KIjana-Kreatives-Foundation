import React, { useState } from 'react';
import { PageId, Program, EventItem, Post } from '../types';
import { 
  IMPACT_CARDS, 
  JOURNEY_STEPS, 
  PROGRAMS, 
  WHY_WE_EXIST, 
  STORIES, 
  FEATURED_CREATOR, 
  EVENTS, 
  PARTNERS, 
  POSTS 
} from '../data/content';
import { APP_ASSETS } from '../data/assets';
import { GOOGLE_FORMS } from '../data/forms';
import { PartnerBrandLogo } from '../components/PartnerLogos';
import { StatBand } from '../components/StatBand';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { FAQSection } from '../components/FAQSection';
import { sanitizeText, isValidEmail, isRateLimited } from '../utils/security';
import { 
  ArrowRight, 
  Check, 
  Play, 
  Calendar, 
  MapPin, 
  Heart, 
  Sparkles, 
  Users, 
  Compass, 
  Lightbulb, 
  TrendingUp, 
  Award,
  CheckCircle2,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, programSlug?: string) => void;
  onOpenProgram: (program: Program) => void;
  onOpenEvent: (event: EventItem) => void;
  onOpenPost: (post: Post) => void;
  onOpenVideo: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenProgram,
  onOpenEvent,
  onOpenPost,
  onOpenVideo,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterHoneypot, setNewsletterHoneypot] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    // Honeypot check
    if (newsletterHoneypot) {
      setNewsletterSuccess(true);
      return;
    }

    if (isRateLimited('homepage_newsletter', 2500)) {
      setNewsletterError('Please wait a moment before trying again.');
      return;
    }

    const cleanEmail = sanitizeText(newsletterEmail, 120);
    if (!isValidEmail(cleanEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const featuredPrograms = PROGRAMS.filter((p) => p.featured).slice(0, 6);
  const homeStories = STORIES.slice(0, 3);

  return (
    <div id="home-page" className="w-full">
      
      {/* 1. HERO SECTION */}
      <section 
        id="home-hero"
        className="relative bg-[#0F172A] text-white pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 md:pb-32 overflow-hidden"
      >
        {/* Background Full-bleed Image with Left-to-Right Dark Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImagePlaceholder
            src={APP_ASSETS.heroBanner}
            fallbackText="hero/home-hero-studio.jpg: Young Kenyan creatives in a studio, cameras, laptops, tablets (16:9)"
            alt="Young Kenyan creatives working in KKF studio, A Product Of Srafix Ink Design"
            aspectRatio="auto"
            className="w-full h-full object-cover object-center lg:object-[center_35%] opacity-85 transition-opacity duration-700"
            darkTheme={true}
            priority={true}
          />
          {/* Directional Horizontal Scrim: High-contrast dark on the left for text, opening up to reveal vibrant image on the right */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, #0F172A 0%, rgba(15,23,42,0.92) 35%, rgba(15,23,42,0.62) 65%, rgba(15,23,42,0.18) 100%)',
            }}
          />
          {/* Top and Bottom Vignette for navigation & seamless section overlap */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/70 pointer-events-none" 
          />
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 animate-kkf-rise">
          <div className="max-w-[760px]">
            
            {/* Eyebrow Rule */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <span className="w-8 sm:w-10 h-[2px] bg-[#F59E0B] rounded-full" />
              <span className="font-['Poppins'] font-semibold text-xs sm:text-[13px] tracking-[0.16em] text-[#F59E0B] uppercase">
                Kijana Kreatives Foundation
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-['Poppins'] font-bold text-[32px] xs:text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px] leading-[1.06] tracking-[-0.03em] text-white mb-5 sm:mb-6 text-balance">
              Your Talent Can Build Your{' '}
              <span className="text-[#F59E0B] underline decoration-[#F59E0B]/40 decoration-4 underline-offset-8">
                Future.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-['Inter'] text-base sm:text-[18px] md:text-[20px] text-white/85 leading-[1.6] font-normal mb-8 sm:mb-10 max-w-[620px]">
              We equip young people with creative and digital skills, mentorship and opportunities to turn their ideas into careers.
            </p>

            {/* CTAs (3) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('programs')}
                className="px-7 py-3.5 sm:py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-sm sm:text-[15.5px] transition-all transform active:scale-95 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('donate')}
                className="px-7 py-3.5 sm:py-4 rounded-[14px] bg-white/[0.08] hover:bg-amber-500/20 border border-white/28 hover:border-amber-400 text-white font-['Poppins'] font-semibold text-sm sm:text-[15.5px] transition-all text-center cursor-pointer"
              >
                Support Our Mission
              </button>

              <button
                type="button"
                onClick={onOpenVideo}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-4 text-white/90 hover:text-[#F59E0B] font-['Poppins'] font-semibold text-sm sm:text-[15px] transition-colors group cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-[#F59E0B] group-hover:text-[#0F172A] text-white flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story →</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING IMPACT CARDS (Responsive Overlap) */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6 -mt-8 sm:-mt-14 md:-mt-20 lg:-mt-24 mb-12 sm:mb-16 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {IMPACT_CARDS.map((card) => (
            <div
              key={card.no}
              className={`bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-8 shadow-[0_18px_44px_rgba(15,23,42,0.12)] border border-[#E8EDF4] flex flex-col justify-between group ${
                card.accent ? 'card-glow-orange' : 'card-glow'
              }`}
            >
              <div>
                <span className={`font-['Poppins'] font-bold text-[32px] block mb-3 leading-none transition-transform group-hover:scale-105 ${
                  card.accent ? 'text-[#F59E0B]' : 'text-[#2563EB]'
                }`}>
                  {card.no}
                </span>
                <h2 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] tracking-tight mb-2 group-hover:text-slate-900 transition-colors">
                  {card.title}
                </h2>
                <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed">
                  {card.body}
                </p>
              </div>

              <div className={`pt-6 mt-4 border-t border-[#E8EDF4]/80 flex items-center gap-1.5 text-xs font-semibold ${
                card.accent ? 'text-[#F59E0B]' : 'text-[#2563EB]'
              }`}>
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION (Mosaic + Who We Are) */}
      <section id="home-about" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Asymmetric Photo Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-[22px] overflow-hidden shadow-md card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.graphicDesignDoc}
                    fallbackText="about/workshop.jpg: Design workshop, several people at tables (3:4)"
                    alt="Creative graphic design review workshop in Nairobi"
                    aspectRatio="3:4"
                    className="w-full h-full"
                  />
                </div>
                {/* Blue 2021 Founded Tile */}
                <div className="bg-[#2563EB] text-white p-7 rounded-[22px] shadow-md flex flex-col justify-center card-glow-orange">
                  <span className="font-['Poppins'] font-bold text-[36px] leading-none mb-2 text-[#F59E0B]">
                    2021
                  </span>
                  <p className="font-['Poppins'] font-semibold text-[15px] leading-snug">
                    Founded in Nairobi, Kenya
                  </p>
                  <p className="text-xs text-white/80 mt-1 font-['Inter']">
                    Democratising creative craft for East African youth.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-[22px] overflow-hidden shadow-md card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.photographyStreetDoc}
                    fallbackText="about/camera-on-set.jpg: Camera on set, crew in background (1:1)"
                    alt="Young photographers on Nairobi street"
                    aspectRatio="1:1"
                    className="w-full h-full"
                  />
                </div>
                <div className="rounded-[22px] overflow-hidden shadow-md card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.animationDoc}
                    fallbackText="about/mentor-student.jpg: Mentor and student, over-the-shoulder (3:4)"
                    alt="Mentor and animator reviewing timeline in Nairobi"
                    aspectRatio="3:4"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Right: Who We Are Text */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                  Who We Are
                </span>
                <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[40px] text-[#0F172A] leading-[1.12] tracking-[-0.025em] text-balance">
                  Practical studio training for Kenyan creative talent.
                </h2>
              </div>

              <p className="font-['Inter'] text-[17px] text-[#475569] leading-[1.72]">
                Across Kenya, high youth unemployment exists alongside an expanding creative economy that struggles to find work-ready talent. Most young creators cannot access production-grade cameras, editing workstations, or direct critique from practicing directors.
              </p>

              <p className="font-['Inter'] text-[18px] text-[#0F172A] font-semibold leading-[1.6]">
                Kijana Kreatives Foundation provides that production floor.
              </p>

              <p className="font-['Inter'] text-[15.5px] text-[#64748B] leading-relaxed">
                Through our structured Creative and Digital Academies, we provide full access to professional studios, workstations, and high-standard industry mentorship without charging tuition fees.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#F59E0B] text-[16px] inline-flex items-center gap-2 transition-colors cursor-pointer group"
                >
                  <span>About Our Mission</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. JOURNEY SECTION (01 Discover, 02 Learn, 03 Create, 04 Launch) */}
      <section id="home-journey" className="py-20 md:py-28 bg-white border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em] mb-4">
              From Talent to Opportunity
            </h2>
            <p className="font-['Inter'] text-[17px] text-[#64748B] leading-relaxed">
              Every KKF journey follows four stages, from first spark to first paid work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.no}
                className={`relative bg-[#F8FAFC] rounded-[24px] p-8 border border-[#E8EDF4] flex flex-col justify-between group ${
                  step.accentColor === 'amber' ? 'card-glow-orange' : 'card-glow'
                }`}
              >
                <div>
                  <span className={`font-['Poppins'] font-bold text-[48px] block mb-4 leading-none transition-transform group-hover:scale-105 ${
                    step.accentColor === 'amber' ? 'text-[#F59E0B]' : 'text-[#2563EB]'
                  }`}>
                    {step.no}
                  </span>
                  <h3 className="font-['Poppins'] font-bold text-[14px] tracking-[0.16em] uppercase text-[#0F172A] mb-3">
                    {step.step}
                  </h3>
                  <p className="font-['Inter'] text-[15.5px] text-[#475569] leading-relaxed">
                    {step.body}
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t border-[#E8EDF4] flex items-center gap-2 text-xs font-mono font-medium ${
                  step.accentColor === 'amber' ? 'text-[#F59E0B]' : 'text-[#2563EB]'
                }`}>
                  <span>Stage {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. PROGRAMS DARK BAND (Six pathways into the creative economy) */}
      <section id="home-programs" className="py-20 md:py-28 bg-dark-textured text-white">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                What We Do
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-white leading-[1.10] tracking-[-0.025em]">
                Six pathways into the creative economy
              </h2>
              <p className="font-['Inter'] text-[16.5px] text-white/70 mt-3 max-w-[600px]">
                Tuition-free cohorts equipping young Kenyans with production skills, real client briefs, and direct access to creative directors.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('programs')}
              className="px-6 py-3.5 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-sm transition-all whitespace-nowrap self-start md:self-auto flex items-center gap-2"
            >
              <span>View All Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((prog) => (
              <div
                key={prog.slug}
                className="bg-[#16223A] rounded-[26px] overflow-hidden border border-white/10 dark-card-glow flex flex-col justify-between group"
              >
                <div className="relative h-[200px] w-full overflow-hidden">
                  <ImagePlaceholder
                    src={prog.image}
                    fallbackText={prog.imagePlaceholderText}
                    alt={prog.title}
                    aspectRatio="auto"
                    className="w-full h-full"
                    darkTheme={true}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-[100px] bg-black/60 backdrop-blur-xs text-xs font-['Poppins'] font-medium text-amber-400 border border-white/10">
                    {prog.duration}
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-['Poppins'] font-semibold uppercase tracking-wider text-[#2563EB] block mb-1">
                      {prog.category} Academy
                    </span>
                    <h3 className="font-['Poppins'] font-bold text-[21px] text-white tracking-tight mb-2.5">
                      {prog.title}
                    </h3>
                    <p className="font-['Inter'] text-[14.5px] text-white/65 leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onOpenProgram(prog)}
                      className="font-['Poppins'] font-semibold text-[14px] text-amber-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[12px] text-slate-400 font-mono">
                      {prog.cohort}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FEATURED PROGRAM (KKF Creative Academy: Practical Studio Training) */}
      <section id="home-featured-program" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-white rounded-[30px] p-8 md:p-14 border border-[#E8EDF4] shadow-md card-glow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Tall Academy Image */}
            <div className="lg:col-span-5 rounded-[24px] overflow-hidden shadow-lg card-glow">
              <ImagePlaceholder
                src={APP_ASSETS.academyShowcase}
                fallbackText="hero/academy-classroom.jpg: Wide classroom shot, full room, work in progress (4:5)"
                alt="KKF Creative Academy Studio in Nairobi"
                aspectRatio="4:5"
                className="w-full h-full"
              />
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                  KKF Creative Academy
                </span>
                <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                  Practical Studio Training
                </h2>
              </div>

              <p className="font-['Inter'] text-[17px] text-[#475569] leading-relaxed">
                A structured 12-week production environment where young creators work on commercial briefs with equipment provided and weekly critique from working directors.
              </p>

              {/* 4 Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  '100% Tuition-Free',
                  'Equipment Provided',
                  'Client Capstone Briefs',
                  'Agency Introductions',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#E8EDF4] card-glow">
                    <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="font-['Poppins'] font-semibold text-[14.5px] text-[#0F172A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('get-involved')}
                  className="px-8 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Join the Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="px-6 py-4 rounded-[14px] border border-[#DDE5EF] hover:bg-blue-50/70 hover:border-blue-300 hover:text-[#2563EB] text-[#0F172A] font-['Poppins'] font-semibold text-[15px] transition-all cursor-pointer"
                >
                  Browse Tracks
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. IMPACT STATS COUNT-UP BAND */}
      <StatBand />

      {/* 8. WHY WE EXIST */}
      <section id="home-why" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Why We Exist
            </h2>
            <p className="font-['Inter'] text-[16.5px] text-[#64748B] mt-3">
              Three pillars that guide every cohort, brief, and partnership we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_WE_EXIST.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[26px] p-8 md:p-10 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div>
                  <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] group-hover:text-[#1D4FD8] uppercase block mb-3 transition-colors">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-['Poppins'] font-bold text-[22px] text-[#0F172A] group-hover:text-[#2563EB] mb-3 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-['Inter'] text-[15.5px] text-[#475569] leading-relaxed">
                    {item.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8EDF4] flex items-center gap-2 text-xs font-semibold text-[#F59E0B]">
                  <span>Pillar {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. COMMUNITY (Dark section + 3 pills + 2x2 photo grid) */}
      <section id="home-community" className="py-20 md:py-28 bg-dark-textured text-white">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text & Pills */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] text-white leading-[1.10] tracking-[-0.025em]">
                You Don&apos;t Have to Create Alone.
              </h2>
              <p className="font-['Inter'] text-[17px] text-white/70 leading-relaxed">
                KKF brings young creatives together to learn, collaborate, share ideas and build meaningful relationships.
              </p>

              {/* Studio Resource Tags */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                <span className="px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 text-white font-['Poppins'] font-medium text-xs tracking-wide">
                  Daily Peer Critiques
                </span>
                <span className="px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 text-amber-300 font-['Poppins'] font-medium text-xs tracking-wide">
                  Shared Studio Desks
                </span>
                <span className="px-4 py-1.5 rounded-[8px] bg-white/10 border border-white/15 text-blue-300 font-['Poppins'] font-medium text-xs tracking-wide">
                  Production Sprints
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('get-involved')}
                  className="px-7 py-3.5 rounded-[13px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-semibold text-sm transition-all shadow-md"
                >
                  Join Our Community
                </button>
              </div>
            </div>

            {/* Right: Staggered 2x2 Photo Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-[22px] overflow-hidden shadow-lg border border-white/10 dark-card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.musicProductionDoc}
                    fallbackText="community/workshop.jpg: Music production in studio (1:1)"
                    alt="Young music producer working in Nairobi studio"
                    aspectRatio="1:1"
                    className="w-full h-full"
                    darkTheme={true}
                  />
                </div>
                <div className="rounded-[22px] overflow-hidden shadow-lg border border-white/10 dark-card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.photographyStreetDoc}
                    fallbackText="community/film-shoot.jpg: Street photography training (4:3)"
                    alt="Photography trainees on Nairobi street"
                    aspectRatio="4:3"
                    className="w-full h-full"
                    darkTheme={true}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-[22px] overflow-hidden shadow-lg border border-white/10 dark-card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.webUiUxDoc}
                    fallbackText="community/group-discussion.jpg: UI/UX prototyping session (4:3)"
                    alt="UI/UX team reviewing mobile prototype"
                    aspectRatio="4:3"
                    className="w-full h-full"
                    darkTheme={true}
                  />
                </div>
                <div className="rounded-[22px] overflow-hidden shadow-lg border border-white/10 dark-card-glow">
                  <ImagePlaceholder
                    src={APP_ASSETS.aiCreativesDoc}
                    fallbackText="community/mentorship.jpg: AI creative lab workshop (1:1)"
                    alt="Creatives experimenting with AI tools in practical lab"
                    aspectRatio="1:1"
                    className="w-full h-full"
                    darkTheme={true}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. SUCCESS STORIES (3 Quote cards) */}
      <section id="home-stories" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                Stories
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                Real People. Real Creative Journeys.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('stories')}
              className="font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#F59E0B] text-[15px] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Read More Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeStories.map((story) => (
              <div
                key={story.slug}
                className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div>
                  <p className="font-['Inter'] text-[17px] text-[#0F172A] group-hover:text-slate-900 leading-[1.65] mb-6 italic transition-colors">
                    {story.quote}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E8EDF4] flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border-2 border-[#2563EB]/30 group-hover:border-[#2563EB] transition-colors">
                    <ImagePlaceholder
                      src={story.avatar}
                      fallbackText={story.avatarPlaceholderText}
                      alt={story.name}
                      aspectRatio="1:1"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[16px] text-[#0F172A] group-hover:text-[#2563EB] leading-tight transition-colors">
                      {story.name}
                    </h3>
                    <p className="text-xs text-[#64748B] font-['Inter'] mt-0.5">
                      {story.field} · {story.county}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. CREATIVE OF THE MONTH */}
      <section id="home-creator-spotlight" className="py-20 md:py-24 bg-white border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#F8FAFC] rounded-[30px] p-8 md:p-14 border border-[#E8EDF4] card-glow grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Portrait */}
            <div className="lg:col-span-5 rounded-[24px] overflow-hidden shadow-md">
              <ImagePlaceholder
                src={FEATURED_CREATOR.image}
                fallbackText={FEATURED_CREATOR.imagePlaceholderText}
                alt={FEATURED_CREATOR.name}
                aspectRatio="4:5"
                className="w-full h-full"
              />
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-3">
                  Creative of the Month
                </span>
                <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[42px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                  {FEATURED_CREATOR.name}
                </h2>
                <span className="font-['Poppins'] text-sm font-semibold text-[#2563EB] block mt-1">
                  {FEATURED_CREATOR.role} · {FEATURED_CREATOR.county}
                </span>
              </div>

              <p className="font-['Inter'] text-[16px] text-[#475569] leading-relaxed">
                {FEATURED_CREATOR.bio}
              </p>

              <blockquote className="p-4 rounded-[16px] bg-white border-l-4 border-[#F59E0B] text-sm text-[#334155] italic">
                {FEATURED_CREATOR.quote}
              </blockquote>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E8EDF4]">
                {FEATURED_CREATOR.stats.map((st, idx) => (
                  <div key={idx}>
                    <span className="font-['Poppins'] font-bold text-xl text-[#0F172A] block">{st.val}</span>
                    <span className="text-[11px] text-[#64748B] font-['Inter']">{st.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('stories')}
                  className="font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#F59E0B] text-[15px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Meet More Creators →</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. WHAT'S COMING UP (3 Events) */}
      <section id="home-events" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                Calendar
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                What&apos;s Coming Up
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#F59E0B] text-[15px] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((evt) => (
              <div
                key={evt.slug}
                className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-[100px] bg-[#EFF5FF] text-[#2563EB] font-['Poppins'] font-semibold text-xs uppercase tracking-wider">
                      {evt.kind}
                    </span>
                    <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {evt.dateLabel}
                    </span>
                  </div>

                  <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] group-hover:text-[#2563EB] tracking-tight mb-2 transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{evt.location}</span>
                  </div>

                  <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EDF4]">
                  <button
                    type="button"
                    onClick={() => onOpenEvent(evt)}
                    className="w-full py-2.5 rounded-[12px] bg-[#F8FAFC] hover:bg-[#2563EB] hover:text-white border border-[#E8EDF4] hover:border-[#2563EB] text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. PARTNERS (Building Together + 6 Greyscale Slots) */}
      <section id="home-partners" className="py-20 md:py-24 bg-white border-y border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[38px] text-[#0F172A] leading-[1.12] tracking-[-0.025em] mb-3">
              Building Together
            </h2>
            <p className="font-['Inter'] text-[16px] text-[#64748B] leading-relaxed">
              Meaningful change happens when organizations, communities and individuals work together.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-8 sm:gap-10 lg:gap-12 py-4">
            {PARTNERS.map((partner) => (
              <a
                key={partner.order}
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit official website: ${partner.name}`}
                className="flex items-center justify-center p-3 sm:p-4 hover:opacity-85 transition-all duration-300 hover:scale-105 no-underline group"
              >
                <PartnerBrandLogo 
                  partnerId={partner.logo} 
                  className="h-12 sm:h-14 md:h-16 lg:h-16 max-h-16 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-transform duration-300" 
                />
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 14. GET INVOLVED (4 Cards: Mentor, Volunteer, Partner, Support a Creative) */}
      <section id="home-get-involved" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Four Ways In
            </span>
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Get Involved
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Become a Mentor */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] group-hover:text-[#1D4FD8] uppercase block mb-3 transition-colors">
                  BECOME A MENTOR
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] group-hover:text-[#2563EB] mb-2 transition-colors">
                  Share your skills
                </h3>
                <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed">
                  Share your skills and experience with the next generation.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4] flex items-center justify-between">
                <a
                  href={GOOGLE_FORMS.mentor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Poppins'] font-semibold text-xs text-[#2563EB] hover:text-[#1D4FD8] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Become a Mentor</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Volunteer */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow-orange flex flex-col justify-between group">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#D97706] group-hover:text-[#B45309] uppercase block mb-3 transition-colors">
                  VOLUNTEER
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] group-hover:text-[#D97706] mb-2 transition-colors">
                  Give your time
                </h3>
                <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed">
                  Help us create opportunities for young people across our hubs.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4] flex items-center justify-between">
                <a
                  href={GOOGLE_FORMS.volunteer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Poppins'] font-semibold text-xs text-[#D97706] hover:text-[#B45309] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Volunteer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Partner With Us */}
            <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] group-hover:text-[#1D4FD8] uppercase block mb-3 transition-colors">
                  PARTNER WITH US
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] group-hover:text-[#2563EB] mb-2 transition-colors">
                  Create opportunities
                </h3>
                <p className="font-['Inter'] text-[15px] text-[#475569] leading-relaxed">
                  Build programs that create measurable impact and career pipelines.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8EDF4] flex items-center justify-between">
                <a
                  href={GOOGLE_FORMS.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Poppins'] font-semibold text-xs text-[#2563EB] hover:text-[#1D4FD8] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Become a Partner</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Support a Creative (Dark Card) */}
            <div className="bg-[#16223A] rounded-[26px] p-8 border border-white/10 shadow-md dark-card-glow-orange flex flex-col justify-between text-white group">
              <div>
                <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-3">
                  SUPPORT A CREATIVE
                </span>
                <h3 className="font-['Poppins'] font-bold text-[20px] text-white group-hover:text-amber-300 mb-2 transition-colors">
                  Fund their future
                </h3>
                <p className="font-['Inter'] text-[15px] text-white/70 leading-relaxed">
                  Help fund equipment, training and opportunities for youth.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onNavigate('donate')}
                  className="font-['Poppins'] font-semibold text-xs text-amber-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Donate →</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 15. DONATION CTA (Dark full-width band) */}
      <section id="home-donation-cta" className="py-20 md:py-28 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center max-w-[820px]">
          <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-[-0.03em] mb-6">
            A Young Creator Needs More Than{' '}
            <span className="text-[#F59E0B]">Talent.</span>
          </h2>
          
          <p className="font-['Inter'] text-[17.5px] text-white/80 leading-relaxed mb-10 max-w-[680px] mx-auto">
            Your support can provide access to training, mentorship, equipment and opportunities that can change the direction of a young person&apos;s life.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('donate')}
              className="px-9 py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[16px] transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-[#0F172A]" />
              <span>Donate Today</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('get-involved')}
              className="px-8 py-4 rounded-[14px] bg-white/[0.08] hover:bg-amber-500/20 border border-white/28 hover:border-amber-400 text-white font-['Poppins'] font-semibold text-[15.5px] transition-all cursor-pointer"
            >
              Sponsor a Program
            </button>
          </div>
        </div>
      </section>

      {/* 16. BLOG (Ideas, Stories & Inspiration) */}
      <section id="home-blog" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
                Insights
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
                Ideas, Stories & Inspiration
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="font-['Poppins'] font-semibold text-[#2563EB] hover:text-[#F59E0B] text-[15px] inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POSTS.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-[26px] overflow-hidden border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <ImagePlaceholder
                    src={post.image}
                    fallbackText={post.imagePlaceholderText}
                    alt={post.title}
                    aspectRatio="auto"
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-[100px] bg-white/90 backdrop-blur-xs text-xs font-['Poppins'] font-semibold text-[#2563EB]">
                    {post.category}
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs text-[#64748B] font-mono block mb-2">
                      {post.date}
                    </span>
                    <h3 className="font-['Poppins'] font-bold text-[19px] text-[#0F172A] tracking-tight mb-2.5 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8EDF4]">
                    <button
                      type="button"
                      onClick={() => onOpenPost(post)}
                      className="font-['Poppins'] font-semibold text-xs text-[#2563EB] hover:text-[#1D4FD8] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read More →</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 17. FREQUENTLY ASKED QUESTIONS (SEO & Rich Snippets) */}
      <FAQSection 
        onNavigate={onNavigate}
        title="Frequently Asked Questions"
        subtitle="Learn about tuition-free creative tracks, admissions eligibility, studio equipment access at The Foundry in Nairobi, and career outcomes."
        limit={6}
      />

      {/* 18. NEWSLETTER (Grey band: Stay Connected) */}
      <section id="home-newsletter" className="py-16 md:py-20 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#F8FAFC] rounded-[28px] p-8 md:p-12 border border-[#E8EDF4] card-glow flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[540px]">
              <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[34px] text-[#0F172A] tracking-tight mb-2">
                Stay Connected
              </h2>
              <p className="font-['Inter'] text-[15.5px] text-[#64748B]">
                Get stories, opportunities, events and creative resources from KKF delivered to your inbox once a month.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-[480px]">
              {newsletterSuccess ? (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-semibold font-['Inter']">
                    Thank you! You are now subscribed to KKF creative dispatch.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                    {/* Hidden Honeypot Field */}
                    <input
                      type="text"
                      name="website_token_validation"
                      value={newsletterHoneypot}
                      onChange={(e) => setNewsletterHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError('');
                      }}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3.5 rounded-[12px] bg-white border border-[#DDE5EF] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#2563EB] text-sm"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-[12px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-sm transition-all shrink-0 cursor-pointer shadow-sm"
                    >
                      Subscribe
                    </button>
                  </form>
                  {newsletterError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-['Inter']">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{newsletterError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

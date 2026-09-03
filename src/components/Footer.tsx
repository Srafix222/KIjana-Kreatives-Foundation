import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND } from '../data/content';
import { sanitizeText, isValidEmail, isRateLimited } from '../utils/security';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  HeartHandshake,
  Compass,
  Layers
} from 'lucide-react';
import { 
  WhatsAppIcon, 
  InstagramIcon, 
  TikTokIcon, 
  YouTubeIcon, 
  LinkedInIcon, 
  FacebookIcon 
} from './SocialIcons';
import { KKFIconMark } from './BrandLogo';

interface FooterProps {
  currentPage?: PageId;
  onNavigate: (page: PageId, programSlug?: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'safeguarding' | 'financial') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms, onOpenLegal }) => {
  const [email, setEmail] = useState('');

  const [honeypot, setHoneypot] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check: bots will fill this invisible field
    if (honeypot) {
      setSubscribed(true);
      return;
    }

    if (isRateLimited('newsletter_submit', 2000)) {
      setError('Please wait a moment before trying again.');
      return;
    }

    const cleanEmail = sanitizeText(email, 120);
    if (!isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
  };

  const whatsappCleanNumber = BRAND.whatsapp.replace(/[^0-9]/g, '');

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon, handle: '@kijanakreatives', color: 'hover:text-[#E1306C] hover:border-[#E1306C]/40' },
    { name: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon, handle: '@kijanakreatives', color: 'hover:text-[#25F4EE] hover:border-[#25F4EE]/40' },
    { name: 'YouTube', href: 'https://youtube.com', icon: YouTubeIcon, handle: 'KKF Studios', color: 'hover:text-[#FF0000] hover:border-[#FF0000]/40' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon, handle: 'Kijana Kreatives', color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40' },
    { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon, handle: 'Kijana Kreatives', color: 'hover:text-[#1877F2] hover:border-[#1877F2]/40' },
  ];

  return (
    <footer 
      id="main-footer"
      className="relative bg-[#070D1B] text-white pt-16 pb-12 overflow-hidden border-t border-slate-800/80 selection:bg-blue-600 selection:text-white"
    >
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">

        {/* Top Split: Brand Card & Dispatch Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-slate-800/80">
          
          {/* Brand Bio Card */}
          <div className="lg:col-span-5 bg-[#0F172A] rounded-[24px] p-8 border border-slate-800 flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[52px] h-[52px] rounded-[16px] bg-white flex items-center justify-center p-1.5 shadow-xl border border-white/20">
                  <KKFIconMark className="w-full h-full" />
                </div>
                <div>
                  <span className="font-['Poppins'] font-bold text-[22px] tracking-tight text-white block leading-tight">
                    {BRAND.fullName}
                  </span>
                  <span className="font-['Poppins'] text-amber-400 font-semibold text-xs tracking-wider uppercase">
                    {BRAND.tagline}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-[15px] leading-relaxed mb-8 font-['Inter']">
                {BRAND.descriptor} Founded {BRAND.founded}. Transforming creative passion into world-class digital craft and sustainable, dignified livelihoods for youth across East Africa.
              </p>
            </div>

            {/* Social Channels with Active Handles */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3 font-['Poppins']">
                Social Ecosystem
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`h-10 px-3 rounded-[12px] border border-slate-800 bg-slate-900 hover:bg-blue-600/20 hover:border-blue-500/50 text-slate-300 hover:text-white flex items-center gap-2 transition-all duration-200 shadow-xs group ${s.color}`}
                      aria-label={`Follow on ${s.name}`}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 shrink-0" />
                      <span className="text-xs font-semibold font-['Inter'] hidden sm:inline text-slate-400 group-hover:text-white">
                        {s.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Newsletter Box with Modern Interactive Field */}
          <div className="lg:col-span-7 bg-[#0F172A] rounded-[24px] p-8 sm:p-10 border border-slate-800 flex flex-col justify-between relative">
            <div className="relative z-10">
              <span className="text-xs font-['Poppins'] font-semibold tracking-wider uppercase text-blue-400 block mb-2">
                Monthly Creative Dispatch
              </span>
              <h3 className="font-['Poppins'] font-bold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                Never Miss a Grant Call or Creative Brief
              </h3>
              <p className="text-slate-300 text-[15px] leading-relaxed mb-8 font-['Inter'] max-w-xl">
                Get handpicked studio residencies, open production grants, industry job boards, and masterclass invitations delivered directly to your inbox every month. No spam, unsubscribe anytime.
              </p>
            </div>

            <div className="relative z-10">
              {subscribed ? (
                <div className="flex items-center gap-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 p-5 rounded-[18px] animate-kkf-rise">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-['Poppins'] text-white">Welcome to the KKF Community!</p>
                    <p className="text-xs text-emerald-300/90 mt-0.5 font-['Inter']">
                      You are confirmed. Look out for our upcoming monthly edition of creative briefs and news.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  {/* Honeypot field for bot detection */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-2 rounded-[18px] border border-slate-700/80 shadow-inner">
                    <input
                      type="email"
                      required
                      maxLength={120}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-1 px-4 py-3.5 rounded-[12px] bg-transparent text-white placeholder:text-slate-500 focus:outline-hidden text-[15px] font-['Inter']"
                      aria-label="Email address for newsletter"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3.5 rounded-[14px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:scale-[0.98] text-white font-['Poppins'] font-bold text-sm transition-all shadow-md shadow-blue-600/30 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>Get Updates</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                  {error && <p className="text-rose-400 text-xs font-semibold pl-2">{error}</p>}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Navigation & Direct WhatsApp Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-slate-800/80">
          
          {/* Explore */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Compass className="w-4 h-4 text-blue-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase">
                Explore KKF
              </h4>
            </div>
            <ul className="space-y-3 font-['Inter'] text-[14.5px]">
              {[
                { name: 'About Foundation', page: 'about' },
                { name: 'Creative Programs', page: 'programs' },
                { name: 'Impact & Reports', page: 'impact' },
                { name: 'Alumni Stories & Video', page: 'stories' },
                { name: 'Events & Masterclasses', page: 'resources' },
                { name: 'Insights & Blog', page: 'resources' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page as PageId)}
                    className="text-slate-400 hover:text-white hover:translate-x-1.5 transition-all text-left block cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative Tracks */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase">
                Creative Tracks
              </h4>
            </div>
            <ul className="space-y-3 font-['Inter'] text-[14.5px]">
              {[
                { name: 'Graphic & Brand Design', slug: 'graphic-design' },
                { name: 'Cinematography & Film', slug: 'photography-videography' },
                { name: '3D Animation & Motion', slug: 'animation-motion-graphics' },
                { name: 'Sound & Music Production', slug: 'music-production' },
                { name: 'Web & Product UI/UX', slug: 'web-ui-ux-design' },
                { name: 'Generative AI for Creatives', slug: 'ai-for-creatives' },
              ].map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate('programs', p.slug)}
                    className="text-slate-400 hover:text-white hover:translate-x-1.5 transition-all text-left block cursor-pointer"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase">
                Get Involved
              </h4>
            </div>
            <ul className="space-y-3 font-['Inter'] text-[14.5px]">
              {[
                { name: 'Join a Cohort', page: 'get-involved' },
                { name: 'Become a Mentor', page: 'get-involved' },
                { name: 'Studio Volunteer', page: 'get-involved' },
                { name: 'Institutional Partner', page: 'get-involved' },
                { name: 'Donate Funds', page: 'donate' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page as PageId)}
                    className="text-slate-400 hover:text-white hover:translate-x-1.5 transition-all text-left block cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Direct WhatsApp Card */}
          <div className="lg:col-span-4">
            <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest text-slate-400 uppercase mb-6">
              Studio & Direct Contact
            </h4>
            
            <div className="space-y-3 font-['Inter'] text-[14px]">
              
              {/* WhatsApp Active Quick Contact Card */}
              <a 
                href={`https://wa.me/${whatsappCleanNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between p-3.5 rounded-[14px] bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[10px] bg-slate-800 text-[#25D366] flex items-center justify-center shrink-0 border border-slate-700/80">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Admissions WhatsApp
                    </span>
                    <span className="text-[13px] text-slate-200 font-medium">
                      {BRAND.whatsapp}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-white text-xs font-medium">
                  <span>Chat</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* Email Card */}
              <a 
                href={`mailto:${BRAND.email}`} 
                className="flex items-center gap-3.5 p-3 rounded-[14px] bg-slate-900/60 hover:bg-blue-600/15 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-[10px] bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700/80 group-hover:border-amber-400/40">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">General Inquiries</span>
                  <span className="text-[13.5px] truncate block text-slate-200 group-hover:text-white font-medium">{BRAND.email}</span>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href={`tel:${BRAND.phone}`} 
                className="flex items-center gap-3.5 p-3 rounded-[14px] bg-slate-900/60 hover:bg-amber-500/15 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-[10px] bg-slate-800 text-blue-400 flex items-center justify-center shrink-0 border border-slate-700/80 group-hover:border-blue-400/40">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Telephone Line</span>
                  <span className="text-[13.5px] block text-slate-200 group-hover:text-white font-medium">{BRAND.phone}</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-start gap-3.5 p-3 text-slate-400 rounded-[14px] bg-slate-900/30 border border-slate-800/50">
                <div className="w-8 h-8 rounded-[10px] bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700/80 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">HQ & Creative Hub</span>
                  <span className="text-[13px] text-slate-300 leading-snug">{BRAND.location}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Legal & Operational Status Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-slate-400 font-['Inter']">
          <p>© 2026 Kijana Kreatives Foundation · Registered Non-Profit Organization, Kenya</p>
          
          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => {
                if (onOpenLegal) onOpenLegal('privacy');
                else onOpenPrivacy?.();
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => {
                if (onOpenLegal) onOpenLegal('terms');
                else onOpenTerms?.();
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => {
                if (onOpenLegal) onOpenLegal('safeguarding');
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Safeguarding
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact & Studio
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};



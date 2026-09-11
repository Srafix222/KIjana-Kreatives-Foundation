import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND } from '../data/content';
import { sanitizeText, isValidEmail, isRateLimited } from '../utils/security';
import { 
  ArrowRight, 
  ArrowUp,
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  HeartHandshake,
  Compass,
  Layers,
  ChevronRight
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
  onOpenLegal?: (type: 'privacy' | 'terms' | 'safeguarding' | 'financial' | 'security') => void;
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/kijanakreatives', 
      icon: InstagramIcon, 
      handle: '@kijanakreatives', 
      color: 'hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:shadow-[0_0_16px_rgba(225,48,108,0.25)] hover:bg-[#E1306C]/10' 
    },
    { 
      name: 'TikTok', 
      href: 'https://tiktok.com/@kijanakreatives', 
      icon: TikTokIcon, 
      handle: '@kijanakreatives', 
      color: 'hover:text-[#25F4EE] hover:border-[#25F4EE]/50 hover:shadow-[0_0_16px_rgba(37,244,238,0.25)] hover:bg-[#25F4EE]/10' 
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@kijanakreatives', 
      icon: YouTubeIcon, 
      handle: 'KKF Studios', 
      color: 'hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:shadow-[0_0_16px_rgba(255,0,0,0.25)] hover:bg-[#FF0000]/10' 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/kijanakreatives', 
      icon: LinkedInIcon, 
      handle: 'Kijana Kreatives', 
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:shadow-[0_0_16px_rgba(10,102,194,0.25)] hover:bg-[#0A66C2]/10' 
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/kijanakreatives', 
      icon: FacebookIcon, 
      handle: 'Kijana Kreatives', 
      color: 'hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:shadow-[0_0_16px_rgba(24,119,242,0.25)] hover:bg-[#1877F2]/10' 
    },
  ];

  return (
    <footer 
      id="main-footer"
      className="relative bg-[#070D1B] text-white pt-14 pb-10 overflow-hidden border-t border-slate-800/80 selection:bg-blue-600 selection:text-white"
    >
      {/* Effect 1: Ambient Radial Top Border Glow */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-48 bg-gradient-to-b from-blue-500/20 via-amber-500/10 to-transparent blur-3xl opacity-80" 
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/4 w-96 h-32 bg-blue-600/15 blur-2xl rounded-full" 
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-1/4 w-80 h-28 bg-amber-500/10 blur-2xl rounded-full" 
      />

      {/* Effect 2: Subtle Creative Mesh / Noise Dotted Texture */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px]" 
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Unified Single Footer Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Brand Identity, Mission & Integrated Newsletter (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center p-1.5 shadow-md border border-white/20 shrink-0">
                  <KKFIconMark className="w-full h-full" />
                </div>
                <div>
                  <span className="font-['Poppins'] font-bold text-xl tracking-tight text-white block leading-tight">
                    {BRAND.fullName}
                  </span>
                  <span className="font-['Poppins'] text-amber-400 font-semibold text-[11px] tracking-wider uppercase">
                    {BRAND.tagline}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed font-['Inter']">
                {BRAND.descriptor} Founded {BRAND.founded}. Empowering youth across East Africa with world-class digital craft, mentorship, and creative livelihoods.
              </p>
            </div>

            {/* Newsletter Dispatch - Sleek Inline Box */}
            <div className="p-4 rounded-[16px] bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-['Poppins'] font-semibold text-blue-400 uppercase tracking-wider">
                  Creative Dispatch
                </span>
                <span className="text-[10px] text-slate-500 font-['Inter']">Monthly · No spam</span>
              </div>
              <p className="text-xs text-slate-300 font-['Inter'] leading-relaxed">
                Receive open grant calls, creative briefs, and masterclass invitations.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-2.5 rounded-[10px] text-xs font-['Inter'] animate-kkf-rise">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscribed! Look out for our upcoming dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5">
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
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 bg-[#070D1B] p-1.5 sm:p-1 rounded-[12px] border border-slate-700/80 focus-within:border-blue-500 transition-colors">
                    <input
                      type="email"
                      required
                      maxLength={120}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="flex-1 px-3 py-2 bg-transparent text-white placeholder:text-slate-500 focus:outline-hidden text-xs font-['Inter']"
                      aria-label="Email address for monthly dispatch"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2.5 sm:py-2 rounded-[10px] bg-blue-600 hover:bg-blue-500 text-white font-['Poppins'] font-semibold text-xs transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {error && <p className="text-rose-400 text-[11px] font-medium pl-1">{error}</p>}
                </form>
              )}
            </div>

            {/* Social Links Icons */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5 font-['Poppins']">
                Follow KKF Community
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-[10px] border border-slate-800 bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-white flex items-center justify-center transition-all group ${s.color}`}
                      title={`${s.name} (${s.handle})`}
                      aria-label={`Follow on ${s.name}`}
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation - Explore (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Compass className="w-4 h-4 text-blue-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase text-slate-300">
                Explore
              </h4>
            </div>
            <ul className="space-y-2 font-['Inter'] text-sm">
              {[
                { name: 'About Foundation', page: 'about' },
                { name: 'Creative Programs', page: 'programs' },
                { name: 'Impact & Reports', page: 'impact' },
                { name: 'Alumni Stories', page: 'stories' },
                { name: 'Events & Masterclasses', page: 'resources' },
                { name: 'Creative Insights', page: 'resources' },
                { name: 'Donate & Support', page: 'donate' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page as PageId)}
                    className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-all duration-200 text-left cursor-pointer text-[13.5px] py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 scale-0 -translate-x-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Creative Tracks & Pathways (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase text-slate-300">
                Creative Tracks
              </h4>
            </div>
            <ul className="space-y-2 font-['Inter'] text-sm">
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
                    className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-all duration-200 text-left cursor-pointer text-[13.5px] py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-0 scale-0 -translate-x-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {p.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Studio Info (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <h4 className="font-['Poppins'] text-[12px] font-bold tracking-widest uppercase text-slate-300">
                Studio & Contact
              </h4>
            </div>

            {/* Direct WhatsApp Quick Chat */}
            <a 
              href={`https://wa.me/${whatsappCleanNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 rounded-[12px] bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[8px] bg-slate-800 text-[#25D366] flex items-center justify-center shrink-0 border border-slate-700">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                    Admissions WhatsApp
                  </span>
                  <span className="text-xs text-slate-200 font-medium font-mono">
                    {BRAND.whatsapp}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-400 group-hover:text-white text-[11px] font-medium">
                <span>Chat</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* Email */}
            <a 
              href={`mailto:${BRAND.email}`} 
              className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300 hover:text-white transition-all group"
            >
              <div className="w-7 h-7 rounded-[8px] bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-slate-700">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Email</span>
                <span className="text-xs truncate block text-slate-200 group-hover:text-white font-medium">{BRAND.email}</span>
              </div>
            </a>

            {/* Phone */}
            <a 
              href={`tel:${BRAND.phone}`} 
              className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300 hover:text-white transition-all group"
            >
              <div className="w-7 h-7 rounded-[8px] bg-slate-800 text-blue-400 flex items-center justify-center shrink-0 border border-slate-700">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Telephone</span>
                <span className="text-xs block text-slate-200 group-hover:text-white font-medium">{BRAND.phone}</span>
              </div>
            </a>

            {/* Hub Location */}
            <div className="flex items-start gap-2.5 p-2.5 rounded-[12px] bg-slate-900/30 border border-slate-800/50 text-slate-400">
              <div className="w-7 h-7 rounded-[8px] bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Nairobi Creative Hub</span>
                <span className="text-xs text-slate-300 leading-snug">{BRAND.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar with Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-['Inter']">
          <p className="text-center md:text-left">© 2026 Kijana Kreatives Foundation · Registered Non-Profit Organization, Kenya</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
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
              onClick={() => {
                if (onOpenLegal) onOpenLegal('security');
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Security</span>
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact & Studio
            </button>

            {/* Effect 6: Smooth Return Back to Top Button */}
            <span className="text-slate-700 hidden sm:inline">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-blue-600 border border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer text-[11.5px]"
              title="Return to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};



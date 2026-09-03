import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  Building,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import { PageHero } from '../components/PageHero';
import { BRAND } from '../data/content';
import { sanitizeText, isValidEmail, isValidPhone, isRateLimited } from '../utils/security';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (isRateLimited('contact_form_submit', 2500)) {
      setErrorMessage('Please wait a moment before sending another message.');
      return;
    }

    const cleanName = sanitizeText(formData.name, 100);
    const cleanEmail = sanitizeText(formData.email, 120);
    const cleanPhone = sanitizeText(formData.phone, 30);
    const cleanMessage = sanitizeText(formData.message, 2000);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (cleanPhone && !isValidPhone(cleanPhone)) {
      setErrorMessage('Please enter a valid phone number (e.g. +254 700 000 000).');
      return;
    }

    setErrorMessage('');
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Welcoming Ambient Glows) */}
      <PageHero
        badge="Get in Touch"
        badgeColor="amber"
        title="Say hello."
        description="Whether you have a question about a cohort, an idea for a partnership, or want to drop by the space in Nairobi, we would love to hear from you."
      />

      {/* 2. CONTACT CHANNELS & FORM */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow space-y-6">
                <div>
                  <h3 className="font-['Poppins'] font-bold text-[22px] text-[#0F172A] mb-1">
                    Direct Channels
                  </h3>
                  <p className="text-xs text-[#64748B] font-['Inter']">
                    Our community team is available Monday to Friday.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#64748B] font-medium block">Write to us</span>
                      <a href={`mailto:${BRAND.email}`} className="font-semibold text-sm text-[#0F172A] hover:text-[#2563EB] transition-colors font-['Poppins']">
                        {BRAND.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                      <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-700 font-semibold block font-['Poppins']">WhatsApp Direct Chat</span>
                      <a 
                        href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-sm text-[#0F172A] hover:text-[#25D366] transition-colors font-['Poppins'] inline-flex items-center gap-1.5"
                      >
                        {BRAND.whatsapp}
                        <ExternalLink className="w-3 h-3 text-[#64748B]" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#64748B] font-medium block">Call our Desk</span>
                      <a href={`tel:${BRAND.phone}`} className="font-semibold text-sm text-[#0F172A] hover:text-[#2563EB] transition-colors font-['Poppins']">
                        {BRAND.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#64748B] font-medium block">Studio Location</span>
                      <p className="font-semibold text-sm text-[#0F172A] font-['Poppins']">
                        Nairobi, Kenya
                      </p>
                      <span className="text-xs text-[#64748B]">
                        Creative Hub &amp; Learning Laboratory
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-[#64748B] font-medium block">Hours</span>
                      <p className="text-xs text-[#0F172A] font-medium">
                        Mon – Fri: 8:30 AM – 5:30 PM EAT
                      </p>
                      <span className="text-xs text-[#64748B]">
                        Saturdays: Cohort Project Labs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Routing Banner */}
              <div className="bg-[#16223A] text-white rounded-[24px] p-6 border border-white/10 dark-card-glow space-y-3">
                <span className="text-[11px] font-['Poppins'] font-bold text-amber-400 uppercase tracking-wider">
                  Looking to apply or partner?
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-['Inter']">
                  For program admission or corporate partnership proposals, please use our dedicated forms for faster processing.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('get-involved')}
                  className="text-xs font-['Poppins'] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to Get Involved Forms →</span>
                </button>
              </div>

            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[28px] p-8 md:p-12 border border-[#E8EDF4] shadow-sm card-glow">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-kkf-rise font-['Inter']">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || 'friend'}</strong>. Our team has received your message and will respond within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-[12px] bg-[#0F172A] text-white text-xs font-['Poppins'] font-semibold hover:bg-[#2563EB] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-['Inter']">
                  {/* Invisible Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="contact_bot_check"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[24px] text-[#0F172A] mb-1">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Fill out the form below and our community team will get back to you promptly.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => {
                          setErrorMessage('');
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        placeholder="e.g. Grace Achieng"
                        className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => {
                          setErrorMessage('');
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        maxLength={30}
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setErrorMessage('');
                          setFormData({ ...formData, phone: e.target.value });
                        }}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#475569] mb-2">
                        Subject / Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Cohort Admissions">Cohort Admissions</option>
                        <option value="Mentorship Inquiry">Mentorship Inquiry</option>
                        <option value="Media & Press">Media &amp; Press</option>
                        <option value="Visit the Studio">Studio Visit Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      maxLength={2000}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setErrorMessage('');
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      placeholder="How can we help you today?"
                      className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-9 py-4 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4FD8] active:scale-[0.98] text-white font-['Poppins'] font-semibold text-[15.5px] transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

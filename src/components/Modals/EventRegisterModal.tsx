import React, { useState } from 'react';
import { EventItem } from '../../types';
import { X, Calendar, MapPin, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { sanitizeText, isValidEmail, isValidPhone, isRateLimited } from '../../utils/security';

interface EventRegisterModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interests: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (isRateLimited('event_reg_submit', 2000)) {
      setErrorMessage('Please wait a moment before registering again.');
      return;
    }

    const cleanName = sanitizeText(formData.fullName, 100);
    const cleanEmail = sanitizeText(formData.email, 120);
    const cleanPhone = sanitizeText(formData.phone, 30);
    const cleanInterests = sanitizeText(formData.interests, 200);

    if (!cleanName || !cleanEmail) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (cleanPhone && !isValidPhone(cleanPhone)) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setFormData({
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      interests: cleanInterests,
    });
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-kkf-rise"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[560px] bg-white rounded-[28px] shadow-[0_26px_56px_rgba(15,23,42,0.25)] border border-[#E8EDF4] p-6 md:p-8">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-blue-50 hover:text-[#2563EB] text-[#64748B] border border-transparent hover:border-blue-200 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
              Registration Confirmed!
            </h3>
            <p className="text-[#475569] text-sm max-w-md mx-auto leading-relaxed">
              We have reserved your spot for <strong>{event.title}</strong> ({event.dateLabel}). A confirmation and calendar invite have been sent to <strong>{formData.email || 'your email'}</strong>.
            </p>
            <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#E8EDF4] text-xs text-[#64748B] text-left">
              <div className="font-semibold text-[#0F172A] mb-1">Ticket Reference: KKF-EVT-2026-{(Math.random()*9000 + 1000).toFixed(0)}</div>
              <div>Location: {event.location}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-[12px] bg-[#2563EB] text-white font-['Poppins'] font-semibold text-sm hover:bg-[#1D4FD8]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-block px-3 py-1 rounded-[100px] bg-[#EFF5FF] text-[#2563EB] font-['Poppins'] font-semibold text-xs mb-3 uppercase tracking-wider">
              {event.kind}
            </div>
            <h2 className="font-['Poppins'] font-bold text-2xl text-[#0F172A] mb-2 tracking-tight">
              Register: {event.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs text-[#64748B] mb-5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                {event.dateLabel}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                {event.location}
              </span>
            </div>

            <p className="text-sm text-[#475569] mb-5 leading-relaxed">
              {event.description} Participation is free for young Kenyan creatives thanks to our generous donors and partner organizations.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot protection */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="event_reg_hp"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setErrorMessage('');
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                  placeholder="e.g. Victor Omondi"
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">Email *</label>
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
                    placeholder="victor@example.com"
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    maxLength={30}
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setErrorMessage('');
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    placeholder="+254 712 345 678"
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#475569] mb-1">Creative Craft or Interests</label>
                <input
                  type="text"
                  maxLength={200}
                  value={formData.interests}
                  onChange={(e) => {
                    setErrorMessage('');
                    setFormData({ ...formData, interests: e.target.value });
                  }}
                  placeholder="e.g. Photography, Motion Design"
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-[13px] bg-[#2563EB] hover:bg-[#1D4FD8] active:scale-[0.98] text-white font-['Poppins'] font-semibold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>Complete Free Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};


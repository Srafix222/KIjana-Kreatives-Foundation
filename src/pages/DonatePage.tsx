import React, { useState } from 'react';
import { PageId, DonationReceipt } from '../types';
import { DONATION_TIERS } from '../data/content';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  HelpCircle, 
  Lock, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { sanitizeText, sanitizeAmount, isValidEmail, isValidPhone, isRateLimited } from '../utils/security';

interface DonatePageProps {
  onNavigate: (page: PageId) => void;
  onDonationSuccess: (receipt: DonationReceipt) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({
  onNavigate,
  onDonationSuccess,
}) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [selectedTier, setSelectedTier] = useState<number>(50); // Default to $50 tier
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank' | 'paypal'>('mpesa');

  // Form states
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Exchange rate: 1 USD = 130 KES
  const EXCHANGE_RATE = 130;

  const getAmountValue = () => {
    if (customAmount && Number(customAmount) > 0) {
      return sanitizeAmount(customAmount, 1, 10000000);
    }
    const tier = DONATION_TIERS.find((t) => t.amountUsd === selectedTier);
    if (!tier) return 50;
    return currency === 'KES' ? tier.amountKes : tier.amountUsd;
  };

  const currentAmount = getAmountValue();

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot spam check
    if (honeypot) {
      setProcessing(true);
      setTimeout(() => setProcessing(false), 800);
      return;
    }

    if (isRateLimited('donate_submit', 3000)) {
      setErrorMessage('Please wait a moment before trying again.');
      return;
    }

    const cleanEmail = sanitizeText(donorEmail, 120);
    const cleanName = sanitizeText(donorName, 100);

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address for receipt delivery.');
      return;
    }

    if (paymentMethod === 'mpesa') {
      const cleanPhone = mpesaPhone.trim();
      if (!cleanPhone || !isValidPhone(cleanPhone)) {
        setErrorMessage('Please provide a valid Safaricom M-Pesa phone number.');
        return;
      }
    }

    if (paymentMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 13 || cleanCard.length > 19) {
        setErrorMessage('Please enter a valid card number.');
        return;
      }
      if (!cardExpiry || !cardCvc) {
        setErrorMessage('Please complete all card details (MM/YY and CVC).');
        return;
      }
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const receiptId = `KKF-REC-${Math.floor(100000 + Math.random() * 900000)}`;
      const tierObj = DONATION_TIERS.find((t) => (currency === 'KES' ? t.amountKes : t.amountUsd) === currentAmount);

      const receipt: DonationReceipt = {
        receiptNumber: receiptId,
        donorName: cleanName || 'Kind Supporter',
        donorEmail: cleanEmail,
        amount: currentAmount,
        currency: currency,
        frequency: frequency,
        paymentMethod: paymentMethod === 'mpesa' ? 'M-Pesa Express' : paymentMethod === 'card' ? 'Credit Card' : 'Bank Transfer',
        date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
        impactSummary: tierObj ? tierObj.impact : `General fund support for KKF creative empowerment cohorts and workshops.`,
      };

      onDonationSuccess(receipt);
    }, 1200);
  };

  return (
    <div id="donate-page" className="w-full">
      
      {/* 1. HERO */}
      <section className="bg-dark-textured text-white pt-[170px] pb-[100px] md:pt-[190px] md:pb-[120px] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 animate-kkf-rise">
          <div className="max-w-[800px]">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-4">
              Direct Giving
            </span>
            <h1 className="font-['Poppins'] font-bold text-[36px] sm:text-[50px] lg:text-[60px] leading-[1.08] tracking-[-0.03em] mb-6">
              Fuel the Next Cohort
            </h1>
            <p className="font-['Inter'] text-[18px] sm:text-[20px] text-white/85 leading-[1.65] font-normal max-w-[680px]">
              100% of public donations go directly into equipment, materials, studio access and mentorship for young Kenyan creatives.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DONATION ENGINE & TIERS */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1140px] mx-auto px-6">
          
          <div className="bg-white rounded-[32px] p-6 sm:p-10 md:p-14 border border-[#E8EDF4] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Tiers & Impact Selection */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Frequency and Currency Switchers */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8EDF4]">
                {/* Frequency */}
                <div className="inline-flex p-1 rounded-[100px] bg-[#F1F5F9] border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`px-5 py-2 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer ${
                      frequency === 'once' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#475569]'
                    }`}
                  >
                    Give Once
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`px-5 py-2 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      frequency === 'monthly' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#475569]'
                    }`}
                  >
                    <span>Monthly</span>
                    <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-full font-bold">2X Impact</span>
                  </button>
                </div>

                {/* Currency */}
                <div className="inline-flex p-1 rounded-[100px] bg-[#F1F5F9] border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => { setCurrency('KES'); setCustomAmount(''); }}
                    className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold transition-all cursor-pointer ${
                      currency === 'KES' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#475569]'
                    }`}
                  >
                    KES (KSh)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCurrency('USD'); setCustomAmount(''); }}
                    className={`px-4 py-1.5 rounded-[100px] text-xs font-mono font-bold transition-all cursor-pointer ${
                      currency === 'USD' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#475569]'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="space-y-4">
                <span className="text-xs font-['Poppins'] font-semibold text-[#0F172A] uppercase tracking-wider block">
                  Select a Giving Tier
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DONATION_TIERS.map((tier) => {
                    const isSelected = selectedTier === tier.amountUsd && !customAmount;
                    const amountDisplay = currency === 'KES' 
                      ? `KES ${tier.amountKes.toLocaleString()}` 
                      : `$${tier.amountUsd}`;

                    return (
                      <div
                        key={tier.amountUsd}
                        onClick={() => {
                          setSelectedTier(tier.amountUsd);
                          setCustomAmount('');
                        }}
                        className={`rounded-[22px] p-5 border cursor-pointer card-glow flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#EFF5FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md -translate-y-0.5'
                            : 'bg-white border-[#E8EDF4]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
                            {amountDisplay}
                          </span>
                          <span className="text-[11px] font-['Poppins'] font-semibold text-[#2563EB] bg-white px-2.5 py-1 rounded-full border border-[#DDE5EF]">
                            {tier.label}
                          </span>
                        </div>

                        <p className="font-['Inter'] text-xs text-[#475569] leading-relaxed">
                          {tier.impact}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="pt-2">
                  <label className="block text-xs font-['Poppins'] font-semibold text-[#475569] mb-2">
                    Or Enter Custom Amount ({currency}):
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-[#64748B]">
                      {currency === 'KES' ? 'KSh' : '$'}
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder={currency === 'KES' ? 'e.g. 5000' : 'e.g. 75'}
                      className="w-full pl-14 pr-4 py-3 rounded-[14px] bg-[#F8FAFC] border border-[#DDE5EF] text-base font-semibold focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>

              {/* Transparency Badge */}
              <div className="p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E8EDF4] flex items-center gap-3 text-xs text-[#475569]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  All contributions are processed securely and audited annually. An instant PDF receipt is generated upon confirmation.
                </span>
              </div>

            </div>

            {/* Right Column: Checkout & Payment Method Form */}
            <div className="lg:col-span-5 bg-[#F8FAFC] rounded-[26px] p-6 sm:p-8 border border-[#E8EDF4] card-glow flex flex-col justify-between">
              
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                {/* Honeypot field for bot protection */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="donation_hp"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <span className="text-xs font-['Poppins'] font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                    Donation Summary
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="font-['Poppins'] font-bold text-3xl text-[#0F172A]">
                      {currency === 'KES' ? `KES ${currentAmount.toLocaleString()}` : `$${currentAmount}`}
                    </span>
                    <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF5FF] px-2.5 py-1 rounded-full">
                      {frequency === 'monthly' ? 'Monthly Partner' : 'One-Time'}
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Payment Method Switcher */}
                <div className="space-y-2">
                  <label className="block text-xs font-['Poppins'] font-semibold text-[#475569]">
                    Choose Payment Gateway
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('mpesa');
                      }}
                      className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer ${
                        paymentMethod === 'mpesa'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] font-bold block">M-Pesa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('card');
                      }}
                      className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] font-bold block">Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('bank');
                      }}
                      className={`p-3 rounded-[12px] border text-center transition-all cursor-pointer ${
                        paymentMethod === 'bank'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[11px] font-bold block">Bank Wire</span>
                    </button>
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-[#475569] mb-1 font-medium">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      value={donorName}
                      onChange={(e) => {
                        setErrorMessage('');
                        setDonorName(e.target.value);
                      }}
                      placeholder="e.g. David Mwangi"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#475569] mb-1 font-medium">
                      Email for PDF Receipt <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      value={donorEmail}
                      onChange={(e) => {
                        setErrorMessage('');
                        setDonorEmail(e.target.value);
                      }}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  {/* M-Pesa phone field */}
                  {paymentMethod === 'mpesa' && (
                    <div className="p-4 rounded-[14px] bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs text-emerald-900 font-semibold">
                        <span>Lipa na M-Pesa Online</span>
                        <span className="font-mono text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Paybill 247247</span>
                      </div>
                      <label className="block text-[11px] text-emerald-950 font-medium">
                        M-Pesa Safaricom Mobile Number:
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={30}
                        autoComplete="tel"
                        value={mpesaPhone}
                        onChange={(e) => {
                          setErrorMessage('');
                          setMpesaPhone(e.target.value);
                        }}
                        placeholder="07XX XXX XXX or 2547XXXXXXXX"
                        className="w-full px-3 py-2 rounded-[8px] bg-white border border-emerald-300 text-sm focus:outline-hidden"
                      />
                      <span className="text-[10px] text-emerald-800 block">
                        An STK PIN prompt will be triggered on your phone to complete payment.
                      </span>
                    </div>
                  )}

                  {/* Card fields */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-2 pt-1">
                      <div>
                        <label className="block text-xs text-[#475569] mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          autoComplete="cc-number"
                          value={cardNumber}
                          onChange={(e) => {
                            setErrorMessage('');
                            setCardNumber(e.target.value);
                          }}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full px-3.5 py-2 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          maxLength={7}
                          autoComplete="cc-exp"
                          value={cardExpiry}
                          onChange={(e) => {
                            setErrorMessage('');
                            setCardExpiry(e.target.value);
                          }}
                          placeholder="MM/YY"
                          className="px-3.5 py-2 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                        />
                        <input
                          type="text"
                          required
                          maxLength={4}
                          autoComplete="cc-csc"
                          value={cardCvc}
                          onChange={(e) => {
                            setErrorMessage('');
                            setCardCvc(e.target.value);
                          }}
                          placeholder="CVC"
                          className="px-3.5 py-2 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Bank info */}
                  {paymentMethod === 'bank' && (
                    <div className="p-3.5 rounded-[12px] bg-white border border-[#DDE5EF] text-xs space-y-1 font-['Inter']">
                      <div className="font-bold text-[#0F172A]">Co-operative Bank of Kenya</div>
                      <div className="text-[#64748B]">Account: Kijana Kreatives Foundation</div>
                      <div className="text-[#64748B]">Acc No: 01129482910300</div>
                      <div className="text-[#64748B]">Branch: Nairobi City Center (011)</div>
                      <div className="text-[#64748B]">Swift: KCBLKENA</div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[15.5px] transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{processing ? 'Processing Contribution...' : `Confirm & Donate ${currency === 'KES' ? `KES ${currentAmount.toLocaleString()}` : `$${currentAmount}`}`}</span>
                </button>
              </form>

            </div>

          </div>

        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[840px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[36px] text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How does KKF allocate donated funds?',
                a: '100% of public gifts support program delivery — specifically purchasing high-speed creator laptops, camera rigs, studio licenses, and subsidizing transport and meals for low-income participants.',
              },
              {
                q: 'Can I donate physical equipment or studio space?',
                a: 'Yes! We regularly accept working drawing tablets, cameras, microphones, studio lighting, and audio interfaces. You can indicate this in our Partner Enquiry form under Get Involved.',
              },
              {
                q: 'Will I receive an official donation receipt?',
                a: 'Yes, an automated PDF receipt with an audited reference ID is issued instantly upon donation confirmation, suitable for tax filing and employer matching records.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E8EDF4] card-glow">
                <h3 className="font-['Poppins'] font-bold text-[17px] text-[#0F172A] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                  <span>{faq.q}</span>
                </h3>
                <p className="font-['Inter'] text-sm text-[#475569] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

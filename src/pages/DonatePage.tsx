import React, { useState } from 'react';
import { PageId, DonationReceipt } from '../types';
import { DONATION_TIERS, BANKING_DETAILS, CHEQUE_DETAILS, BRAND } from '../data/content';
import { PageHero } from '../components/PageHero';
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
  AlertCircle,
  FileText,
  Globe,
  Copy,
  Check,
  Mail,
  MapPin,
  ExternalLink,
  Info
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
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank' | 'cheque' | 'paypal'>('mpesa');
  const [selectedBankAccount, setSelectedBankAccount] = useState<'kes' | 'usd' | 'gbp_eur'>('kes');

  // Form states
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [wireReference, setWireReference] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [chequeBank, setChequeBank] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Exchange rate: 1 USD = 130 KES
  const EXCHANGE_RATE = 130;

  const copyToClipboard = (text: string, fieldId: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

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

      let methodLabel = 'M-Pesa Express';
      if (paymentMethod === 'card') {
        methodLabel = 'Credit / Debit Card (Global)';
      } else if (paymentMethod === 'bank') {
        const acct = BANKING_DETAILS.accounts.find(a => a.id === selectedBankAccount);
        methodLabel = `Bank Wire Transfer (${acct ? acct.currency.split(' ')[0] : 'SWIFT'})`;
      } else if (paymentMethod === 'cheque') {
        methodLabel = chequeNumber ? `Cheque / Draft (#${chequeNumber})` : "Cheque / Banker's Draft";
      } else if (paymentMethod === 'paypal') {
        methodLabel = 'PayPal Global Transfer';
      }

      const receipt: DonationReceipt = {
        receiptNumber: receiptId,
        donorName: cleanName || 'Kind Supporter',
        donorEmail: cleanEmail,
        amount: currentAmount,
        currency: currency,
        frequency: frequency,
        paymentMethod: methodLabel,
        date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
        impactSummary: tierObj 
          ? tierObj.impact 
          : `General fund contribution for KKF creative youth training, equipment, and studio access.`,
      };

      onDonationSuccess(receipt);
    }, 1200);
  };

  return (
    <div id="donate-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Warm Giving Glows) */}
      <PageHero
        badge="Direct Giving"
        badgeColor="amber"
        title="Fuel the Next Cohort"
        description="100% of public donations go directly into equipment, materials, studio access and mentorship for young Kenyan creatives."
      />

      {/* 2. DONATION ENGINE & TIERS */}
      <section className="py-14 sm:py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
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
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-['Poppins'] font-semibold text-[#475569]">
                      Choose Payment Method
                    </label>
                    <span className="text-[11px] text-[#2563EB] font-medium flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Global & Local Options</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('mpesa');
                      }}
                      className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'mpesa'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <Smartphone className="w-4 h-4" />
                        <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                          paymentMethod === 'mpesa' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                        }`}>Kenya</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold block">M-Pesa</span>
                        <span className={`text-[10px] block ${paymentMethod === 'mpesa' ? 'text-blue-100' : 'text-[#64748B]'}`}>
                          STK push instant
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('card');
                      }}
                      className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'card'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <CreditCard className="w-4 h-4" />
                        <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                          paymentMethod === 'card' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563EB]'
                        }`}>Global</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Card</span>
                        <span className={`text-[10px] block ${paymentMethod === 'card' ? 'text-blue-100' : 'text-[#64748B]'}`}>
                          Visa, MC, Amex
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('bank');
                      }}
                      className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'bank'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <Building2 className="w-4 h-4" />
                        <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                          paymentMethod === 'bank' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-700'
                        }`}>SWIFT</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Bank Wire</span>
                        <span className={`text-[10px] block ${paymentMethod === 'bank' ? 'text-blue-100' : 'text-[#64748B]'}`}>
                          Direct transfer
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('cheque');
                      }}
                      className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'cheque'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <FileText className="w-4 h-4" />
                        <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                          paymentMethod === 'cheque' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
                        }`}>Drafts</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Cheque</span>
                        <span className={`text-[10px] block ${paymentMethod === 'cheque' ? 'text-blue-100' : 'text-[#64748B]'}`}>
                          Mail or deposit
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setPaymentMethod('paypal');
                      }}
                      className={`p-3 rounded-[12px] border text-left transition-all cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1 ${
                        paymentMethod === 'paypal'
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-white text-[#0F172A] border-[#DDE5EF] hover:border-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <Globe className="w-4 h-4" />
                        <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                          paymentMethod === 'paypal' ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-700'
                        }`}>Digital</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold block">PayPal</span>
                        <span className={`text-[10px] block ${paymentMethod === 'paypal' ? 'text-blue-100' : 'text-[#64748B]'}`}>
                          Worldwide
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Method Specific Content Boxes */}
                {/* 1. M-PESA */}
                {paymentMethod === 'mpesa' && (
                  <div className="p-4 rounded-[14px] bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
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
                      An STK PIN prompt will be sent to your phone to authorize this donation.
                    </span>
                  </div>
                )}

                {/* 2. CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-2.5 p-4 rounded-[14px] bg-white border border-[#DDE5EF]">
                    <div className="flex items-center justify-between text-xs text-[#0F172A] font-semibold pb-1 border-b border-[#E8EDF4]">
                      <span>Debit or Credit Card</span>
                      <span className="text-[10px] font-mono text-[#64748B]">3D-Secure 256-bit</span>
                    </div>
                    <div>
                      <label className="block text-xs text-[#475569] mb-1 font-medium">Card Number</label>
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
                        className="w-full px-3.5 py-2 rounded-[10px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-[#475569] mb-1 font-medium">Expiration</label>
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
                          className="w-full px-3.5 py-2 rounded-[10px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#475569] mb-1 font-medium">CVC / CVV</label>
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
                          className="w-full px-3.5 py-2 rounded-[10px] bg-[#F8FAFC] border border-[#DDE5EF] text-sm focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. BANK WIRE */}
                {paymentMethod === 'bank' && (
                  <div className="p-4 rounded-[16px] bg-white border border-[#DDE5EF] space-y-3 font-['Inter']">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8EDF4]">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#2563EB]" />
                        <span className="font-['Poppins'] font-bold text-xs text-[#0F172A]">Direct Bank Wire Transfer</span>
                      </div>
                      <span className="text-[10px] font-mono bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded font-semibold">SWIFT / EFT</span>
                    </div>

                    {/* Account Currency Switcher */}
                    <div className="grid grid-cols-3 gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E8EDF4]">
                      {BANKING_DETAILS.accounts.map((acct) => (
                        <button
                          key={acct.id}
                          type="button"
                          onClick={() => setSelectedBankAccount(acct.id as any)}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold text-center transition-all cursor-pointer ${
                            selectedBankAccount === acct.id
                              ? 'bg-white text-[#2563EB] shadow-xs'
                              : 'text-[#64748B] hover:text-[#0F172A]'
                          }`}
                        >
                          {acct.currency.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Active Bank Account Details */}
                    {(() => {
                      const activeAcct = BANKING_DETAILS.accounts.find(a => a.id === selectedBankAccount) || BANKING_DETAILS.accounts[0];
                      return (
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#E8EDF4] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#64748B]">Beneficiary:</span>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-[#0F172A]">{BANKING_DETAILS.beneficiary}</span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(BANKING_DETAILS.beneficiary, 'beneficiary')}
                                  className="text-[#2563EB] hover:text-blue-700 p-0.5 cursor-pointer"
                                  title="Copy beneficiary"
                                >
                                  {copiedField === 'beneficiary' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#64748B]">Bank:</span>
                              <span className="font-semibold text-[#0F172A]">{BANKING_DETAILS.bankName}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#64748B]">Branch:</span>
                              <span className="font-medium text-[#0F172A]">{BANKING_DETAILS.branch}</span>
                            </div>

                            <div className="flex items-center justify-between bg-blue-50/60 p-1.5 rounded-md">
                              <span className="text-[11px] font-medium text-[#2563EB]">Account No:</span>
                              <div className="flex items-center gap-1">
                                <span className="font-mono font-bold text-[#0F172A] text-xs">{activeAcct.accountNumber}</span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(activeAcct.accountNumber, 'accNumber')}
                                  className="text-[#2563EB] hover:text-blue-700 p-0.5 cursor-pointer"
                                  title="Copy account number"
                                >
                                  {copiedField === 'accNumber' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#64748B]">SWIFT / BIC:</span>
                              <div className="flex items-center gap-1">
                                <span className="font-mono font-semibold text-[#0F172A] text-xs">{BANKING_DETAILS.swiftCode}</span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(BANKING_DETAILS.swiftCode, 'swift')}
                                  className="text-[#2563EB] hover:text-blue-700 p-0.5 cursor-pointer"
                                  title="Copy SWIFT"
                                >
                                  {copiedField === 'swift' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-1.5 text-[10.5px] text-[#64748B] bg-slate-50 p-2 rounded-lg">
                            <Info className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                            <span>
                              {BANKING_DETAILS.referenceNote}
                            </span>
                          </div>

                          <div>
                            <label className="block text-[11px] text-[#475569] mb-1 font-medium">
                              Wire Reference / Transaction Number (Optional)
                            </label>
                            <input
                              type="text"
                              maxLength={60}
                              value={wireReference}
                              onChange={(e) => setWireReference(e.target.value)}
                              placeholder="e.g. FT260904819"
                              className="w-full px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#DDE5EF] text-xs focus:outline-hidden font-mono"
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 4. CHEQUE / DRAFT */}
                {paymentMethod === 'cheque' && (
                  <div className="p-4 rounded-[16px] bg-white border border-[#DDE5EF] space-y-3 font-['Inter']">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8EDF4]">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="font-['Poppins'] font-bold text-xs text-[#0F172A]">Cheque & Banker's Draft</span>
                      </div>
                      <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold">Local & Global</span>
                    </div>

                    <div className="p-3 rounded-[12px] bg-purple-50/50 border border-purple-100 text-xs space-y-2">
                      <div>
                        <span className="text-[11px] text-purple-900 block font-medium">Make Cheques Payable to:</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <strong className="text-[#0F172A] font-semibold text-xs">{CHEQUE_DETAILS.payableTo}</strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(CHEQUE_DETAILS.payableTo, 'chequePayable')}
                            className="text-[#2563EB] hover:text-blue-700 p-0.5 cursor-pointer text-[11px] flex items-center gap-1 font-sans"
                          >
                            {copiedField === 'chequePayable' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span className="text-[10px]">Copy</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-purple-200/50 text-[11px] text-purple-950">
                        <span><strong>Crossing Instruction:</strong> {CHEQUE_DETAILS.instructions}</span>
                        <div className="text-[10px] text-purple-800 mt-0.5">
                          Acceptable currencies: {CHEQUE_DETAILS.acceptableCurrencies}.
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] text-[#475569]">
                      <div className="flex items-start gap-2 bg-[#F8FAFC] p-2 rounded-lg border border-[#E8EDF4]">
                        <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#0F172A] block">Physical / Courier Delivery:</strong>
                          <span>{CHEQUE_DETAILS.courierAddress}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-[#F8FAFC] p-2 rounded-lg border border-[#E8EDF4]">
                        <Mail className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#0F172A] block">Postal Delivery (Registered Mail):</strong>
                          <span>{CHEQUE_DETAILS.postalAddress}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-[#F8FAFC] p-2 rounded-lg border border-[#E8EDF4]">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#0F172A] block">Over-the-Counter Bank Deposit:</strong>
                          <span>{CHEQUE_DETAILS.depositOption}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[11px] text-[#475569] mb-1 font-medium">Cheque / Draft Number</label>
                        <input
                          type="text"
                          maxLength={30}
                          value={chequeNumber}
                          onChange={(e) => setChequeNumber(e.target.value)}
                          placeholder="e.g. CHK-004819"
                          className="w-full px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#DDE5EF] text-xs focus:outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#475569] mb-1 font-medium">Issuing Bank Name</label>
                        <input
                          type="text"
                          maxLength={50}
                          value={chequeBank}
                          onChange={(e) => setChequeBank(e.target.value)}
                          placeholder="e.g. Barclays / Chase"
                          className="w-full px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#DDE5EF] text-xs focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. PAYPAL */}
                {paymentMethod === 'paypal' && (
                  <div className="p-4 rounded-[16px] bg-white border border-[#DDE5EF] space-y-3 font-['Inter']">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8EDF4]">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-sky-600" />
                        <span className="font-['Poppins'] font-bold text-xs text-[#0F172A]">PayPal Global Giving</span>
                      </div>
                      <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-semibold">Instant Global</span>
                    </div>

                    <div className="p-3 rounded-[12px] bg-sky-50/60 border border-sky-100 text-xs space-y-2">
                      <span className="text-[11px] text-sky-900 block font-medium">Official PayPal Recipient Account:</span>
                      <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-sky-200">
                        <span className="font-mono font-bold text-[#0F172A] text-xs">giving@kijanakreatives.org</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('giving@kijanakreatives.org', 'paypalEmail')}
                          className="text-[#2563EB] hover:text-blue-700 p-0.5 cursor-pointer text-[11px] flex items-center gap-1"
                        >
                          {copiedField === 'paypalEmail' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span className="text-[10px]">Copy</span>
                        </button>
                      </div>
                      <p className="text-[10.5px] text-sky-950 leading-relaxed">
                        Supports worldwide PayPal balances and international credit/debit cards in all major currencies.
                      </p>
                    </div>

                    <div className="pt-1">
                      <a
                        href="https://www.paypal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline font-medium"
                      >
                        <span>Open PayPal website in a new window</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Donor Details */}
                <div className="space-y-3 pt-1">
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
                      placeholder="e.g. David Mwangi or Global Supporter"
                      className="w-full px-3.5 py-2.5 rounded-[10px] bg-white border border-[#DDE5EF] text-sm focus:outline-hidden focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#475569] mb-1 font-medium">
                      Email for PDF Tax Receipt <span className="text-red-500">*</span>
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
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-[14px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-[15.5px] transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {processing 
                      ? 'Processing Contribution...' 
                      : paymentMethod === 'bank'
                      ? `Confirm Wire & Generate Receipt (${currency === 'KES' ? `KES ${currentAmount.toLocaleString()}` : `$${currentAmount}`})`
                      : paymentMethod === 'cheque'
                      ? `Register Cheque & Generate Receipt Voucher`
                      : `Confirm & Donate ${currency === 'KES' ? `KES ${currentAmount.toLocaleString()}` : `$${currentAmount}`}`}
                  </span>
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
            <p className="text-[#64748B] text-sm mt-2">
              Everything you need to know about giving locally and internationally to KKF.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I donate internationally from outside Kenya in USD, EUR, or GBP?',
                a: 'Yes! Donors from any part of the world can contribute via major Credit/Debit Cards, direct SWIFT Bank Wire Transfer into our foreign currency accounts (USD, GBP, EUR), PayPal, or International Banker\'s Drafts.',
              },
              {
                q: 'How do I donate via Cheque or Banker\'s Draft?',
                a: 'Please write your cheque or banker\'s draft payable to "Kijana Kreatives Foundation" and mark it "Account Payee Only". Cheques are accepted in KES, USD, GBP, and EUR. You may deposit directly at any Co-operative Bank branch countrywide, send via registered mail, or hand-deliver to our Nairobi creative hub.',
              },
              {
                q: 'How does KKF allocate donated funds?',
                a: '100% of public gifts support creative youth program delivery — specifically purchasing high-speed laptops, camera rigs, studio software licenses, and subsidizing transit and meals for low-income participants in Kenya.',
              },
              {
                q: 'Can I donate physical equipment or studio gear?',
                a: 'Yes! We regularly accept working drawing tablets, DSLR/mirrorless cameras, microphones, studio lighting, and audio interfaces. You can register equipment gifts through our Partner Enquiry form under Get Involved.',
              },
              {
                q: 'Will I receive an official tax and donation receipt?',
                a: 'Yes. An official PDF donation receipt with an audited voucher number is issued instantly upon donation confirmation, suitable for individual and corporate tax filings and employer gift matching.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E8EDF4] card-glow">
                <h3 className="font-['Poppins'] font-bold text-[17px] text-[#0F172A] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2563EB] shrink-0" />
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

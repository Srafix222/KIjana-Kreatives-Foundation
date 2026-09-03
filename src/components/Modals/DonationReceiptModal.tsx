import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Download, Printer, Heart, Smartphone, ShieldCheck, ArrowRight, Building2, CreditCard, FileText, Globe } from 'lucide-react';
import { BRAND } from '../../data/content';

interface DonationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationDetails: {
    donorName: string;
    donorEmail: string;
    donorPhone?: string;
    amount: number;
    currency?: 'KES' | 'USD';
    mode: 'once' | 'monthly';
    method: 'mpesa' | 'card' | 'bank' | 'international' | 'cheque' | 'paypal';
    designation: string;
    referenceId?: string;
  } | null;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  isOpen,
  onClose,
  donationDetails,
}) => {
  const [step, setStep] = useState<'processing' | 'confirmed'>('processing');
  const [receiptNumber] = useState(`KKF-DON-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const [transactionDate] = useState(new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }));

  useEffect(() => {
    if (isOpen) {
      setStep('processing');
      const timer = setTimeout(() => {
        setStep('confirmed');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !donationDetails) return null;

  const handlePrint = () => {
    window.print();
  };

  const currencySymbol = donationDetails.currency === 'USD' ? '$' : 'KES ';
  const formattedAmount = `${currencySymbol}${donationDetails.amount.toLocaleString()}`;

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'mpesa': return 'M-Pesa Express (Kenya)';
      case 'card': return 'Credit / Debit Card (Global)';
      case 'bank': return 'Bank Wire Transfer (SWIFT / EFT)';
      case 'cheque': return "Cheque / Banker's Draft";
      case 'paypal': return 'PayPal Global Transfer';
      default: return 'International Transfer';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-kkf-rise"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[620px] bg-white rounded-[28px] shadow-[0_26px_56px_rgba(15,23,42,0.3)] border border-[#E8EDF4] overflow-hidden my-6 max-h-[90vh] flex flex-col font-['Inter']">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-blue-50 hover:text-[#2563EB] text-[#64748B] border border-transparent hover:border-blue-200 flex items-center justify-center transition-all z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'processing' ? (
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-amber-400/30 border-t-[#F59E0B] animate-spin" />
              {donationDetails.method === 'mpesa' && <Smartphone className="w-8 h-8 text-[#0F172A] absolute inset-0 m-auto" />}
              {donationDetails.method === 'card' && <CreditCard className="w-8 h-8 text-[#0F172A] absolute inset-0 m-auto" />}
              {donationDetails.method === 'bank' && <Building2 className="w-8 h-8 text-[#0F172A] absolute inset-0 m-auto" />}
              {donationDetails.method === 'cheque' && <FileText className="w-8 h-8 text-[#0F172A] absolute inset-0 m-auto" />}
              {(donationDetails.method === 'paypal' || donationDetails.method === 'international') && <Globe className="w-8 h-8 text-[#0F172A] absolute inset-0 m-auto" />}
            </div>

            <h3 className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
              {donationDetails.method === 'mpesa' && 'Prompting M-Pesa STK Push'}
              {donationDetails.method === 'card' && 'Authorising Card Donation'}
              {donationDetails.method === 'bank' && 'Recording Bank Wire Contribution'}
              {donationDetails.method === 'cheque' && 'Registering Cheque Contribution'}
              {donationDetails.method === 'paypal' && 'Connecting PayPal Transfer'}
              {donationDetails.method === 'international' && 'Processing International Transfer'}
            </h3>

            <p className="text-sm text-[#475569] max-w-md leading-relaxed">
              {donationDetails.method === 'mpesa' ? (
                <>
                  We sent an instant payment prompt of <strong>{formattedAmount}</strong> to <strong>{donationDetails.donorPhone || 'your mobile phone'}</strong>. Please enter your M-Pesa PIN on your handset.
                </>
              ) : donationDetails.method === 'card' ? (
                <>
                  Processing your secure card gift of <strong>{formattedAmount}</strong> through global 3D-Secure clearing...
                </>
              ) : donationDetails.method === 'bank' ? (
                <>
                  Recording your bank wire transfer notice of <strong>{formattedAmount}</strong> and preparing your official receipt...
                </>
              ) : donationDetails.method === 'cheque' ? (
                <>
                  Registering your cheque donation acknowledgment for <strong>{formattedAmount}</strong> and dispatching tracking instructions...
                </>
              ) : (
                <>
                  Processing your international contribution of <strong>{formattedAmount}</strong> for KKF young creators...
                </>
              )}
            </p>

            <div className="p-3 bg-[#EFF5FF] rounded-xl text-xs text-[#2563EB] font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <span>Secured with 256-bit encryption · Registered Non-Profit NGO</span>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-6">
            
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Poppins'] font-bold text-2xl text-[#0F172A]">
                Asante Sana! Thank You.
              </h3>
              <p className="text-sm text-[#475569]">
                Your {donationDetails.mode === 'monthly' ? 'monthly recurring' : 'one-time'} contribution of <strong>{formattedAmount}</strong> has been received with deep gratitude.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#F8FAFC] p-6 rounded-[20px] border border-[#E8EDF4] space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EDF4]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#0F172A] text-amber-400 flex items-center justify-center font-bold text-xs">
                    KKF
                  </div>
                  <div>
                    <span className="font-['Poppins'] font-semibold text-[#0F172A] block text-sm">{BRAND.fullName}</span>
                    <span className="text-[10px] text-[#64748B]">{BRAND.registration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#64748B] block">RECEIPT NO.</span>
                  <span className="font-mono font-bold text-[#0F172A] text-xs">{receiptNumber}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Donor Name</span>
                  <span className="font-semibold text-[#0F172A] text-xs">{donationDetails.donorName}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Donor Email</span>
                  <span className="font-semibold text-[#0F172A] text-xs">{donationDetails.donorEmail}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Date</span>
                  <span className="font-semibold text-[#0F172A] text-xs">{transactionDate}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Payment Method</span>
                  <span className="font-semibold text-[#0F172A] text-xs">{getMethodLabel(donationDetails.method)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8EDF4] flex items-center justify-between">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Designation</span>
                  <span className="font-semibold text-[#0F172A] text-xs capitalize">
                    {donationDetails.designation.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#64748B] block text-[11px]">Amount Contributed</span>
                  <span className="font-['Poppins'] font-bold text-[#2563EB] text-base">
                    {formattedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Impact Notice */}
            <div className="p-4 rounded-[16px] bg-[#EFF5FF] border border-[#2563EB]/20 flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <p className="text-xs text-[#334155] leading-relaxed">
                <strong>What your gift achieves:</strong> 100% of your contribution is deployed directly to studio equipment, student transit, and industry mentorship for Kenyan youth entering the creative economy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-1/2 py-3 rounded-[12px] border border-[#DDE5EF] hover:bg-blue-50/70 hover:border-blue-300 hover:text-[#2563EB] text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/2 py-3 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Done</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};


import React from 'react';
import { Report } from '../../types';
import { X, FileText, Download, CheckCircle, Shield } from 'lucide-react';
import { BRAND } from '../../data/content';

interface AnnualReportModalProps {
  report: Report | null;
  onClose: () => void;
}

export const AnnualReportModal: React.FC<AnnualReportModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  const handleDownload = () => {
    const reportContent = `================================================================================
KIJANA KREATIVES FOUNDATION (KKF)
${report.title.toUpperCase()}
Reporting Period: ${report.period}
Audit Standard: IFRS Non-Profit Governance Framework
Registration: ${BRAND.registration}
Headquarters: ${BRAND.officeAddress}
================================================================================

1. EXECUTIVE SUMMARY
${report.summary}

2. KEY ANNUAL HIGHLIGHTS & OUTCOMES
- Total Youth Empowered: 1,850+ Kenyan young creators across Nairobi and 6 hub counties
- Tuition-Free Training Delivered: Over 24,000 studio & lab workstation hours
- Commercial & Agency Placement Rate: 78% of graduates placed in paid roles within 6 months
- Equipment Access: Full workstation access (cameras, sound rigs, 3D workstations, tablets)

3. FINANCIAL ALLOCATION & GOVERNANCE
- Direct Student Training & Studio Hardware: 74%
- Curriculum, Mentorship Stipends & Industry Masterclasses: 16%
- Monitoring, Evaluation, Auditing & Administrative Compliance: 10%
Total Audited Expenditure compliant with the Non-Governmental Organisations Co-ordination Act of Kenya.

4. INDEPENDENT AUDIT OPINION
We have audited the financial statements of Kijana Kreatives Foundation. In our opinion, the accompanying financial statements present fairly, in all material respects, the financial position of KKF in accordance with the International Financial Reporting Standard for Small and Medium-sized Entities (IFRS for SMEs) and the Kenyan NGO Act.

Lead Independent Auditor: Certified Public Accountants (K)
Date: ${report.year}-12-31
Nairobi, Kenya
Official Inquiries: ${BRAND.email} | ${BRAND.phone}
================================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KKF-Annual-Audited-Report-${report.year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-kkf-rise"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[640px] bg-white rounded-[28px] shadow-[0_26px_56px_rgba(15,23,42,0.25)] border border-[#E8EDF4] p-6 md:p-8 font-['Inter']">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-blue-50 hover:text-[#2563EB] text-[#64748B] border border-transparent hover:border-blue-200 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-[14px] bg-[#EFF5FF] text-[#2563EB] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
              Audited Report · {report.year}
            </span>
            <h2 className="font-['Poppins'] font-bold text-xl text-[#0F172A] leading-tight">
              {report.title}
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#475569] leading-relaxed mb-6">
          {report.summary}
        </p>

        <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-[#E8EDF4] space-y-3 text-xs text-[#334155] mb-6">
          <div className="flex justify-between items-center py-1 border-b border-[#E8EDF4]">
            <span className="text-[#64748B]">Reporting Period</span>
            <span className="font-semibold">{report.period}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-[#E8EDF4]">
            <span className="text-[#64748B]">Auditing Standard</span>
            <span className="font-semibold">IFRS Non-Profit Framework</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-[#E8EDF4]">
            <span className="text-[#64748B]">Independent Auditor</span>
            <span className="font-semibold">Certified Public Accountants (K)</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-[#64748B]">Format & Size</span>
            <span className="font-semibold">{report.fileSize}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-3 rounded-[12px] bg-[#2563EB] hover:bg-[#1D4FD8] text-white font-['Poppins'] font-semibold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Annual Report</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-[12px] border border-[#DDE5EF] hover:bg-blue-50/70 hover:border-blue-300 hover:text-[#2563EB] text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

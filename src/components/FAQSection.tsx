import React, { useState } from 'react';
import { KKF_FAQS, FAQItem } from '../seo/faqData';
import { ChevronDown, HelpCircle, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface FAQSectionProps {
  onNavigate?: (page: PageId) => void;
  title?: string;
  subtitle?: string;
  limit?: number;
  showCategoryFilter?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onNavigate,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our tuition-free creative tracks, admissions eligibility, studio equipment access, and career mentorship in Nairobi.",
  limit,
  showCategoryFilter = true,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(['tuition-free', 'eligibility-criteria']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Admissions & Eligibility', 'Curriculum & Tracks', 'Equipment & Facilities', 'Careers & Outcomes', 'Partnerships & Giving'];

  const filteredFAQs = KKF_FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).slice(0, limit || KKF_FAQS.length);

  return (
    <section 
      id="frequently-asked-questions" 
      aria-label="Frequently Asked Questions" 
      className="py-16 sm:py-24 bg-white border-t border-[#E8EDF4]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header Block with Semantic Schema Breadcrumb */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="font-['Poppins'] font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-[#2563EB]">
              Admissions & Studio Guide
            </span>
          </div>
          
          <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[38px] md:text-[44px] text-[#0F172A] leading-[1.12] tracking-[-0.02em] mb-4">
            {title}
          </h2>
          
          <p className="font-['Inter'] text-[15px] sm:text-[17px] text-[#475569] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        {showCategoryFilter && (
          <div className="max-w-[840px] mx-auto mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions about fees, gear, locations, schedules, or eligibility..."
                className="w-full pl-11 pr-4 py-3 rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8] font-['Inter'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-['Poppins'] font-semibold text-[#64748B] hover:text-[#0F172A] px-2 py-1 bg-slate-200 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="max-w-[840px] mx-auto space-y-3.5">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-[20px] bg-[#F8FAFC] border border-dashed border-[#CBD5E1]">
              <p className="font-['Poppins'] font-semibold text-[16px] text-[#0F172A] mb-2">
                No questions found matching "{searchQuery}"
              </p>
              <p className="font-['Inter'] text-[14px] text-[#64748B] mb-5">
                Have a specific question not covered here? Speak with our admissions counselors directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-[10px] bg-[#2563EB] text-white font-['Poppins'] font-semibold text-xs"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`rounded-[18px] border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-[#F8FAFC] border-[#2563EB]/40 shadow-sm' 
                      : 'bg-[#FAFAFA] hover:bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-['Poppins'] font-semibold tracking-wider uppercase text-[#2563EB]">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="font-['Poppins'] font-bold text-[16px] sm:text-[17.5px] text-[#0F172A] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#2563EB] text-white rotate-180' : 'bg-slate-200 text-[#475569]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-${faq.id}`}
                      className="px-5 sm:px-6 pb-5 pt-1 text-[#334155] font-['Inter'] text-[14.5px] sm:text-[15.5px] leading-relaxed border-t border-[#E8EDF4]"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Admissions Banner */}
        <div className="max-w-[840px] mx-auto mt-12 p-6 sm:p-8 rounded-[22px] bg-[#0F172A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-['Poppins'] font-bold text-[18px] text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageSquare className="w-4 h-4 text-[#F59E0B]" />
              Still have a question?
            </h4>
            <p className="font-['Inter'] text-[13.5px] text-slate-300">
              Our team at The Foundry Arts Hub in Nairobi is ready to guide your creative journey.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#0F172A] font-['Poppins'] font-semibold text-xs sm:text-[13px] transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            )}
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('get-involved')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-xs sm:text-[13px] transition-colors cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

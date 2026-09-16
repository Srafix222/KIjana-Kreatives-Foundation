import React, { useState, useEffect } from 'react';
import { Post } from '../../types';
import { X, Calendar, Clock, Share2, Tag, Check, BookOpen, User } from 'lucide-react';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { Breadcrumbs } from '../Breadcrumbs';

interface ArticleReaderModalProps {
  post: Post | null;
  onClose: () => void;
}

interface ParsedSection {
  type: 'heading' | 'paragraph' | 'numbered-section' | 'lead';
  number?: string;
  title?: string;
  content: string;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Robust parser for blog content blocks
  const parseArticleBody = (rawBody: string): ParsedSection[] => {
    const sections: ParsedSection[] = [];
    const rawBlocks = rawBody.split(/\n\n+/);

    rawBlocks.forEach((block) => {
      const trimmed = block.trim();
      if (!trimmed) return;

      // Check if block has ### heading
      if (trimmed.startsWith('### ')) {
        const lines = trimmed.split('\n');
        const firstLine = lines[0].replace('### ', '').trim();
        const remainingContent = lines.slice(1).join('\n').trim();

        // Check if heading has a number prefix like "1. Title" or "01. Title"
        const numberMatch = firstLine.match(/^(\d+)[\.\s]+(.+)$/);
        if (numberMatch) {
          sections.push({
            type: 'numbered-section',
            number: numberMatch[1].padStart(2, '0'),
            title: numberMatch[2],
            content: remainingContent,
          });
        } else {
          sections.push({
            type: 'heading',
            title: firstLine,
            content: remainingContent,
          });
        }
      } else {
        sections.push({
          type: 'paragraph',
          content: trimmed,
        });
      }
    });

    return sections;
  };

  const parsedSections = parseArticleBody(post.body);

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#0F172A]/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[820px] bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_32px_72px_rgba(15,23,42,0.35)] border border-[#E2E8F0] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-kkf-rise"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Cover */}
        <div className="relative h-60 sm:h-72 md:h-80 w-full shrink-0 overflow-hidden bg-[#0F172A]">
          <ImagePlaceholder
            src={post.image}
            fallbackText={post.imagePlaceholderText}
            alt={post.title}
            aspectRatio="auto"
            className="w-full h-full object-cover scale-105"
            darkTheme={true}
          />
          
          {/* Refined gradient overlay for superior text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-10">
            <div className="mb-2.5">
              <Breadcrumbs
                items={[
                  { label: 'Resources & Hub', page: 'resources' },
                  { label: `${post.category} Articles` },
                  { label: post.title, active: true },
                ]}
                onNavigate={() => onClose()}
                variant="dark"
                showHomeIcon={false}
                showJsonLd={false}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-['Poppins'] font-semibold tracking-wider uppercase shadow-sm">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-[11.5px] font-['Inter'] font-medium">
                <Clock className="w-3 h-3 text-[#38BDF8]" />
                {post.readingMinutes || 4} min read
              </span>
            </div>

            <h2 className="font-['Poppins'] font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-[1.25] text-balance">
              {post.title}
            </h2>
          </div>

          {/* Frosted Floating Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#0F172A]/70 hover:bg-[#2563EB] text-white/90 hover:text-white flex items-center justify-center transition-all shadow-md backdrop-blur-md border border-white/15 hover:border-blue-400/50 z-20 cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body Container with Sleek Scrolling */}
        <div className="overflow-y-auto flex-1 font-['Inter'] scrollbar-thin px-6 sm:px-8 md:px-12 py-6 sm:py-8 space-y-7 text-[#334155]">
          
          {/* Metadata & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0] text-xs text-[#64748B]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5 font-medium text-[#475569]">
                <User className="w-3.5 h-3.5 text-[#2563EB]" />
                {post.author || 'KKF Editorial'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                {post.date}
              </span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] hover:bg-blue-50 hover:text-[#2563EB] border border-transparent hover:border-blue-200 text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          {/* Lead Excerpt Block */}
          {post.excerpt && (
            <div className="bg-gradient-to-r from-[#EFF6FF] to-[#F8FAFC] border-l-4 border-[#2563EB] rounded-r-[16px] p-4 sm:p-5">
              <p className="text-[16px] sm:text-[17px] text-[#1E293B] font-medium leading-relaxed italic">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>
          )}

          {/* Article Structured Content */}
          <div className="space-y-6">
            {parsedSections.map((section, idx) => {
              if (section.type === 'numbered-section') {
                return (
                  <div 
                    key={idx}
                    className="p-5 sm:p-6 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <span className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-['Poppins'] font-bold text-xs tracking-wider shrink-0 shadow-xs">
                        {section.number}
                      </span>
                      <h3 className="font-['Poppins'] font-bold text-[18px] sm:text-[19px] text-[#0F172A] tracking-tight">
                        {section.title}
                      </h3>
                    </div>
                    {section.content && (
                      <div className="space-y-3 pl-0 sm:pl-[44px]">
                        {section.content.split(/\n\n+/).map((para, pIdx) => (
                          <p key={pIdx} className="font-['Inter'] text-[15px] sm:text-[15.5px] text-[#475569] leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (section.type === 'heading') {
                return (
                  <div key={idx} className="pt-3 pb-1 border-t border-[#F1F5F9] first:border-t-0">
                    <h3 className="font-['Poppins'] font-bold text-[20px] sm:text-[21px] text-[#0F172A] tracking-tight mb-3">
                      {section.title}
                    </h3>
                    {section.content && (
                      <div className="space-y-3.5">
                        {section.content.split(/\n\n+/).map((para, pIdx) => (
                          <p key={pIdx} className="font-['Inter'] text-[15.5px] sm:text-[16px] text-[#475569] leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={idx} className="space-y-3.5">
                  {section.content.split(/\n\n+/).map((para, pIdx) => (
                    <p key={pIdx} className="font-['Inter'] text-[15.5px] sm:text-[16px] text-[#334155] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* End of article badge */}
          <div className="pt-6 pb-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] font-medium">
              <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Published by Kijana Kreatives Foundation</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="shrink-0 border-t border-[#E8EDF4] bg-[#F8FAFC] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="font-['Poppins'] font-semibold text-xs sm:text-sm text-[#0F172A]">
              Kijana Kreatives Foundation Editorial
            </p>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Empowering youth across Kenya with creative craft & digital tools.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-[12px] bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-['Poppins'] font-semibold transition-all shadow-sm cursor-pointer"
            >
              Close Reader
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


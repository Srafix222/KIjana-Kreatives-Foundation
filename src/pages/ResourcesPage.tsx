import React, { useState } from 'react';
import { PageId, Post, EventItem, Report } from '../types';
import { POSTS, EVENTS, REPORTS } from '../data/content';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { ArrowRight, Calendar, MapPin, Download, Tag, FileText, CheckCircle2, Clock } from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPost: (post: Post) => void;
  onOpenEvent: (event: EventItem) => void;
  onOpenReport: (report: Report) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onNavigate,
  onOpenPost,
  onOpenEvent,
  onOpenReport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const categories = ['All', 'Creative Careers', 'AI', 'Youth'];

  const filteredPosts = selectedCategory === 'All'
    ? POSTS
    : POSTS.filter((p) => p.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div id="resources-page" className="w-full">
      
      {/* 1. HERO */}
      <section className="bg-dark-textured text-white pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-20 md:pb-24 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10 animate-kkf-rise">
          <div className="max-w-[800px]">
            <span className="font-['Poppins'] font-semibold text-xs sm:text-[12.5px] tracking-[0.16em] text-[#F59E0B] uppercase block mb-3 sm:mb-4">
              Resources &amp; Hub
            </span>
            <h1 className="font-['Poppins'] font-bold text-[30px] xs:text-[36px] sm:text-[48px] md:text-[54px] lg:text-[60px] leading-[1.1] tracking-[-0.03em] mb-4 sm:mb-6">
              Ideas, Stories &amp; Inspiration
            </h1>
            <p className="font-['Inter'] text-base sm:text-[18px] md:text-[20px] text-white/85 leading-[1.65] font-normal max-w-[680px]">
              Writing from the programs, plus what&apos;s coming up on the calendar.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BLOG & ARTICLES */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
                Articles
              </span>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[40px] text-[#0F172A] tracking-tight">
                From the blog
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-[100px] text-xs font-['Poppins'] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-white text-[#475569] border border-[#DDE5EF] hover:border-[#2563EB] hover:bg-blue-50/60 hover:text-[#2563EB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-[26px] overflow-hidden border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <ImagePlaceholder
                    src={post.image}
                    fallbackText={post.imagePlaceholderText}
                    alt={post.title}
                    aspectRatio="auto"
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-[100px] bg-white/90 backdrop-blur-xs text-xs font-['Poppins'] font-semibold text-[#2563EB]">
                    {post.category}
                  </div>
                </div>

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] font-mono mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readingMinutes || 4} min read</span>
                    </div>

                    <h3 className="font-['Poppins'] font-bold text-[19px] text-[#0F172A] tracking-tight mb-2.5 group-hover:text-[#2563EB] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8EDF4]">
                    <button
                      type="button"
                      onClick={() => onOpenPost(post)}
                      className="font-['Poppins'] font-semibold text-xs text-[#2563EB] hover:text-[#1D4FD8] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Story →</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. EVENTS */}
      <section className="py-20 md:py-28 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-3">
              Upcoming Events
            </span>
            <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[44px] text-[#0F172A] leading-[1.10] tracking-[-0.025em]">
              Events &amp; Showcases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((evt) => (
              <div
                key={evt.slug}
                className="bg-[#F8FAFC] rounded-[26px] p-8 border border-[#E8EDF4] shadow-sm card-glow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-[100px] bg-[#EFF5FF] text-[#2563EB] font-['Poppins'] font-semibold text-xs uppercase tracking-wider">
                      {evt.kind}
                    </span>
                    <span className="text-xs font-mono text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {evt.dateLabel}
                    </span>
                  </div>

                  <h3 className="font-['Poppins'] font-bold text-[20px] text-[#0F172A] group-hover:text-[#2563EB] tracking-tight mb-2 transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{evt.location}</span>
                  </div>

                  <p className="font-['Inter'] text-[14.5px] text-[#475569] leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8EDF4]">
                  <button
                    type="button"
                    onClick={() => onOpenEvent(evt)}
                    className="w-full py-2.5 rounded-[12px] bg-white hover:bg-blue-50 hover:text-[#2563EB] border border-[#DDE5EF] hover:border-blue-300 text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Register / RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. ANNUAL REPORTS ARCHIVE */}
      <section className="py-20 md:py-24 bg-[#F8FAFC] border-t border-[#E8EDF4]">
        <div className="max-w-[940px] mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <span className="font-['Poppins'] font-semibold text-[12.5px] tracking-[0.16em] text-[#2563EB] uppercase block mb-2">
              Public Filings
            </span>
            <h2 className="font-['Poppins'] font-bold text-[30px] sm:text-[38px] text-[#0F172A] tracking-tight">
              Annual Reports Archive
            </h2>
          </div>

          <div className="space-y-4">
            {REPORTS.map((report) => (
              <div
                key={report.year}
                className="p-6 rounded-[20px] bg-white border border-[#E8EDF4] card-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#EFF5FF] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Poppins'] font-bold text-[16.5px] text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-xs text-[#64748B] font-['Inter'] mt-1">
                      {report.summary}
                    </p>
                    <span className="text-[11px] font-mono text-[#94A3B8] block mt-1">
                      {report.period} · {report.fileSize}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenReport(report)}
                  className="px-5 py-2.5 rounded-[10px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-['Poppins'] font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-blue-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER BLOCK */}
      <section className="py-20 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#16223A] text-white rounded-[28px] p-8 md:p-14 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[540px]">
              <h2 className="font-['Poppins'] font-bold text-[28px] sm:text-[36px] text-white tracking-tight mb-2">
                Stay Connected
              </h2>
              <p className="font-['Inter'] text-[15.5px] text-white/70">
                Get stories, opportunities, events and creative resources from KKF delivered to your inbox once a month.
              </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-[480px]">
              {newsletterSuccess ? (
                <div className="flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 p-4 rounded-[14px]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs font-semibold font-['Inter']">
                    Thank you! You are now subscribed to the monthly KKF creative bulletin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3.5 rounded-[12px] bg-white/[0.06] border border-white/20 text-white placeholder:text-white/40 focus:outline-hidden focus:border-amber-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#FFB52E] text-[#0F172A] font-['Poppins'] font-bold text-sm transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    Subscribe
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

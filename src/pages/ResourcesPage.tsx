import React, { useState } from 'react';
import { PageId, Post, EventItem, Report, BreadcrumbItem } from '../types';
import { POSTS, EVENTS, REPORTS } from '../data/content';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { PageHero } from '../components/PageHero';
import { IMAGE_CATALOG, ImageCatalogItem } from '../image-catalog';
import { sanitizeText, isValidEmail, isRateLimited } from '../utils/security';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Download,
  Tag,
  FileText,
  CheckCircle2,
  Clock,
  Camera,
  Copy,
  Check,
  Search,
  Folder,
  ExternalLink,
  Layers,
  Sparkles,
  X,
  AlertCircle
} from 'lucide-react';

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
  const [newsletterHoneypot, setNewsletterHoneypot] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Image Catalog State
  const [catalogFilter, setCatalogFilter] = useState<string>('All');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [inspectItem, setInspectItem] = useState<ImageCatalogItem | null>(null);

  const categories = ['All', 'Creative Careers', 'AI', 'Youth'];
  const catalogFilterOptions = ['All', 'Creative Academy Track', 'Field Documentation', 'Leadership', 'Studio Environment', 'Stories & Alumni'];

  const filteredPosts = selectedCategory === 'All'
    ? POSTS
    : POSTS.filter((p) => p.category === selectedCategory);

  const filteredCatalog = IMAGE_CATALOG.filter((item) => {
    const matchesCategory = catalogFilter === 'All' || item.category === catalogFilter;
    const matchesSearch =
      !catalogSearch ||
      item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      (item.discipline && item.discipline.toLowerCase().includes(catalogSearch.toLowerCase())) ||
      item.filename.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  const handleDownloadCatalogJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(IMAGE_CATALOG, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "kkf_image_catalog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    if (newsletterHoneypot) {
      setNewsletterSuccess(true);
      return;
    }

    if (isRateLimited('resources_newsletter', 2500)) {
      setNewsletterError('Please wait a moment before trying again.');
      return;
    }

    const cleanEmail = sanitizeText(newsletterEmail, 120);
    if (!isValidEmail(cleanEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: 'Resources & Hub', 
      page: selectedCategory !== 'All' ? 'resources' : undefined,
      active: selectedCategory === 'All'
    },
    ...(selectedCategory !== 'All' ? [{ label: `${selectedCategory} Articles`, active: true }] : []),
  ];

  const handleBreadcrumbNavigate = (page: PageId) => {
    if (page === 'resources' && selectedCategory !== 'All') {
      setSelectedCategory('All');
    } else {
      onNavigate(page);
    }
  };

  return (
    <div id="resources-page" className="w-full">
      
      {/* 1. HERO (Option 3: Modern Editorial Canvas with Ambient Glows & Micro-Grid) */}
      <PageHero
        badge="Resources & Hub"
        badgeColor="amber"
        title="Ideas, Stories & Inspiration"
        description="Writing from the programs, plus what's coming up on the calendar."
        breadcrumbs={breadcrumbItems}
        onNavigate={handleBreadcrumbNavigate}
      />

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

      {/* 4.5 IMAGE CATALOG & DOCUMENTARY PHOTO ARCHIVE */}
      <section id="image-catalog-section" className="py-20 md:py-28 bg-[#F1F5F9] border-t border-[#E2E8F0]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[100px] bg-amber-500/10 text-amber-600 font-['Poppins'] font-semibold text-xs uppercase tracking-wider">
                  <Folder className="w-3.5 h-3.5" /> Media Folder &amp; Image Archive
                </span>
                <span className="text-xs font-mono text-[#64748B]">
                  {IMAGE_CATALOG.length} Curated Assets
                </span>
              </div>
              <h2 className="font-['Poppins'] font-bold text-[32px] sm:text-[40px] text-[#0F172A] tracking-tight">
                Documentary Photo Catalog
              </h2>
              <p className="font-['Inter'] text-[15px] text-[#475569] max-w-[680px] mt-2">
                Every image link, asset path, and rich documentary description cataloged in one dedicated folder. Filter by track, copy links, or download the full registry.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleDownloadCatalogJson}
                className="px-4 py-2.5 rounded-[12px] bg-white border border-[#CBD5E1] hover:border-[#2563EB] hover:text-[#2563EB] text-[#0F172A] font-['Poppins'] font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Export JSON Catalog</span>
              </button>
            </div>
          </div>

          {/* Controls: Search & Filters */}
          <div className="bg-white rounded-[20px] p-4 border border-[#E2E8F0] shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                placeholder="Search images by title, discipline, or description..."
                className="w-full pl-9 pr-4 py-2.5 text-xs font-['Inter'] rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-hidden focus:border-[#2563EB] text-[#0F172A]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {catalogFilterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCatalogFilter(opt)}
                  className={`px-3 py-1.5 rounded-[100px] text-xs font-['Poppins'] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    catalogFilter === opt
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[22px] border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setInspectItem(item)}>
                    <img
                      src={item.link}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[100px] bg-white/90 backdrop-blur-xs text-[11px] font-['Poppins'] font-semibold text-[#0F172A] shadow-xs">
                      {item.discipline || item.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-[6px] bg-black/60 text-white font-mono text-[10px]">
                      {item.aspectRatio}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-['Poppins'] font-bold text-[17px] text-[#0F172A] leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    
                    <div className="text-[11px] font-mono text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-[6px] truncate mb-3 select-all">
                      {item.relativePath}
                    </div>

                    <p className="font-['Inter'] text-[13px] text-[#475569] leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>

                    {item.usedIn && item.usedIn.length > 0 && (
                      <div className="pt-3 border-t border-[#F1F5F9] mb-2">
                        <span className="text-[10.5px] uppercase font-['Poppins'] font-semibold text-[#94A3B8] block mb-1.5">
                          Active In:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.usedIn.slice(0, 2).map((u, idx) => (
                            <span key={idx} className="text-[10.5px] font-mono text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded-[4px] truncate max-w-full">
                              {u}
                            </span>
                          ))}
                          {item.usedIn.length > 2 && (
                            <span className="text-[10.5px] font-mono text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded-[4px]">
                              +{item.usedIn.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.relativePath, `link-${item.id}`)}
                    className="flex-1 py-2 px-2.5 rounded-[8px] bg-[#F8FAFC] hover:bg-[#EEF2F6] text-[#0F172A] text-xs font-['Poppins'] font-medium flex items-center justify-center gap-1.5 border border-[#E2E8F0] transition-colors cursor-pointer"
                  >
                    {copiedKey === `link-${item.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.description, `desc-${item.id}`)}
                    className="flex-1 py-2 px-2.5 rounded-[8px] bg-[#F8FAFC] hover:bg-[#EEF2F6] text-[#0F172A] text-xs font-['Poppins'] font-medium flex items-center justify-center gap-1.5 border border-[#E2E8F0] transition-colors cursor-pointer"
                  >
                    {copiedKey === `desc-${item.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Desc Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                        <span>Description</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectItem(item)}
                    aria-label="Inspect image"
                    className="p-2 rounded-[8px] bg-blue-50 text-[#2563EB] hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCatalog.length === 0 && (
            <div className="bg-white rounded-[20px] p-12 text-center border border-[#E2E8F0]">
              <Search className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
              <p className="font-['Poppins'] font-semibold text-[#0F172A] text-base mb-1">
                No matching images found
              </p>
              <p className="font-['Inter'] text-xs text-[#64748B]">
                Try adjusting your search query or switching the category filter.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Inspect Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[26px] max-w-[720px] w-full max-h-[90vh] overflow-y-auto border border-[#E2E8F0] shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-[#2563EB] uppercase tracking-wider block">
                  {inspectItem.category} {inspectItem.discipline ? `· ${inspectItem.discipline}` : ''}
                </span>
                <h3 className="font-['Poppins'] font-bold text-[22px] text-[#0F172A] mt-0.5">
                  {inspectItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectItem(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-[16px] overflow-hidden bg-slate-100 mb-6 border border-[#E2E8F0]">
              <img
                src={inspectItem.link}
                alt={inspectItem.alt}
                className="w-full max-h-[400px] object-contain mx-auto"
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-[#0F172A] uppercase tracking-wider block mb-1">
                  Full Documentary Description
                </span>
                <p className="font-['Inter'] text-sm text-[#334155] leading-relaxed bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E2E8F0]">
                  {inspectItem.description}
                </p>
              </div>

              <div>
                <span className="text-xs font-['Poppins'] font-semibold text-[#0F172A] uppercase tracking-wider block mb-1">
                  File Path &amp; Asset Link
                </span>
                <div className="flex items-center justify-between gap-2 bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E8F0] font-mono text-xs text-[#0F172A]">
                  <span className="truncate select-all">{inspectItem.relativePath}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(inspectItem.relativePath, 'modal-path')}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-xs font-['Poppins'] font-medium text-[#2563EB] border border-[#CBD5E1] shrink-0 cursor-pointer"
                  >
                    {copiedKey === 'modal-path' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {inspectItem.promptArchitecture && (
                <div>
                  <span className="text-xs font-['Poppins'] font-semibold text-[#0F172A] uppercase tracking-wider block mb-1">
                    Authentic Prompt Architecture
                  </span>
                  <p className="font-mono text-xs text-[#475569] bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E8F0] leading-relaxed">
                    {inspectItem.promptArchitecture}
                  </p>
                </div>
              )}

              {inspectItem.usedIn && inspectItem.usedIn.length > 0 && (
                <div>
                  <span className="text-xs font-['Poppins'] font-semibold text-[#0F172A] uppercase tracking-wider block mb-1.5">
                    Usage Locations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectItem.usedIn.map((loc, idx) => (
                      <span key={idx} className="text-xs font-mono bg-blue-50 text-[#1D4FD8] px-2.5 py-1 rounded-[6px] border border-blue-100">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 pt-5 border-t border-[#E2E8F0] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleCopy(inspectItem.description, 'modal-desc')}
                className="px-4 py-2.5 rounded-[10px] bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-['Poppins'] font-semibold transition-colors cursor-pointer"
              >
                {copiedKey === 'modal-desc' ? 'Description Copied!' : 'Copy Full Description'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. NEWSLETTER BLOCK */}
      <section className="py-20 bg-white border-t border-[#E8EDF4]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-[#16223A] text-white rounded-[28px] p-8 md:p-14 border border-white/10 dark-card-glow-orange flex flex-col lg:flex-row items-center justify-between gap-8">
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
                <div className="space-y-2">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    {/* Hidden Honeypot Field */}
                    <input
                      type="text"
                      name="user_verification_auth"
                      value={newsletterHoneypot}
                      onChange={(e) => setNewsletterHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError('');
                      }}
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
                  {newsletterError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-300 font-['Inter']">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                      <span>{newsletterError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

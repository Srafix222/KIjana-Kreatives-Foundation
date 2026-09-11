import React from 'react';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
import { PageId, BreadcrumbItem } from '../types';

export interface BreadcrumbBarProps {
  currentPage: PageId;
  items: BreadcrumbItem[];
  onNavigate: (page: PageId, programSlug?: string) => void;
  onBack?: () => void;
  onItemClick?: (item: BreadcrumbItem) => void;
  metaBadge?: string;
  className?: string;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  currentPage,
  items,
  onNavigate,
  onBack,
  onItemClick,
  metaBadge,
  className = '',
}) => {
  // Only display on interior pages (non-home)
  if (currentPage === 'home' || !items || items.length === 0) {
    return null;
  }

  // Ensure "Home" is the starting root item
  const fullTrail: BreadcrumbItem[] = items[0]?.page === 'home' || items[0]?.label.toLowerCase() === 'home'
    ? items
    : [{ label: 'Home', page: 'home' }, ...items];

  // Schema.org JSON-LD BreadcrumbList
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullTrail.map((item, index) => {
      let itemUrl = 'https://kijanakreatives.org/';
      if (item.page && item.page !== 'home') {
        itemUrl = `https://kijanakreatives.org/${item.page}`;
        if (item.slug) {
          itemUrl += `?program=${encodeURIComponent(item.slug)}`;
        }
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: itemUrl,
      };
    }),
  };

  const handleCrumbClick = (item: BreadcrumbItem) => {
    if (onItemClick) {
      onItemClick(item);
      return;
    }
    if (item.page) {
      onNavigate(item.page, item.slug);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />

      <nav
        id="interior-breadcrumb-bar"
        aria-label="Breadcrumb Navigation"
        className={`fixed top-[72px] md:top-[80px] left-0 w-full z-[190] bg-[#0A1128]/95 sm:bg-[#0B1329]/95 backdrop-blur-md border-b border-white/[0.08] shadow-xs transition-all duration-300 ${className}`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-10 sm:h-11 flex items-center justify-between text-xs">
          
          {/* Left section: Back button & Breadcrumb Trail */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1 min-w-0 pr-2">
            {/* Quick Back Trigger */}
            {onBack && (
              <>
                <button
                  type="button"
                  id="breadcrumb-bar-back-button"
                  onClick={onBack}
                  aria-label="Go back to previous page"
                  title="Go back"
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 active:scale-95 transition-all shrink-0 font-['Poppins'] font-medium text-[11px] sm:text-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden xs:inline sm:inline">Back</span>
                </button>
                <div className="w-px h-3.5 bg-white/15 shrink-0" aria-hidden="true" />
              </>
            )}

            {/* Breadcrumbs List */}
            <ol className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-slate-300 font-['Inter']">
              {fullTrail.map((item, index) => {
                const isLast = index === fullTrail.length - 1;
                const isHome = index === 0;

                return (
                  <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="font-semibold text-amber-400 truncate max-w-[180px] sm:max-w-[280px] md:max-w-none inline-block font-['Poppins'] text-[11.5px] sm:text-xs tracking-tight"
                        title={item.label}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCrumbClick(item)}
                        className="inline-flex items-center gap-1 py-0.5 text-slate-300 hover:text-white hover:underline decoration-amber-400/50 underline-offset-4 transition-colors cursor-pointer text-[11.5px] sm:text-xs shrink-0 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
                        title={`Go to ${item.label}`}
                      >
                        {isHome && (
                          <Home className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
                        )}
                        <span className={isHome ? 'hidden sm:inline' : ''}>{item.label}</span>
                      </button>
                    )}

                    {!isLast && (
                      <ChevronRight
                        className="w-3 h-3 text-slate-500 shrink-0 opacity-80"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right section: Contextual badge / category metadata */}
          {metaBadge && (
            <div className="hidden md:flex items-center gap-2 shrink-0 pl-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-['Poppins'] font-medium bg-white/[0.06] text-slate-300 border border-white/10 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                {metaBadge}
              </span>
            </div>
          )}

        </div>
      </nav>
    </>
  );
};

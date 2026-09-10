import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { PageId, BreadcrumbItem } from '../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: PageId, programSlug?: string) => void;
  variant?: 'dark' | 'light';
  className?: string;
  showJsonLd?: boolean;
  showHomeIcon?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  variant = 'dark',
  className = '',
  showJsonLd = true,
  showHomeIcon = true,
}) => {
  if (!items || items.length === 0) return null;

  // Build full trail starting with Home if not already included
  const fullTrail: BreadcrumbItem[] = items[0]?.page === 'home' || items[0]?.label.toLowerCase() === 'home'
    ? items
    : [{ label: 'Home', page: 'home' }, ...items];

  // Colors based on theme variant
  const isDark = variant === 'dark';
  
  const containerClasses = isDark
    ? 'text-slate-300'
    : 'text-slate-600';

  const linkClasses = isDark
    ? 'text-slate-300 hover:text-white hover:underline decoration-amber-400/50 underline-offset-4 transition-colors'
    : 'text-slate-600 hover:text-[#2563EB] hover:underline decoration-blue-500/50 underline-offset-4 transition-colors';

  const separatorClasses = isDark
    ? 'text-slate-500'
    : 'text-slate-400';

  const activeClasses = isDark
    ? 'text-amber-300 font-semibold'
    : 'text-[#0F172A] font-semibold';

  // Structured Data (JSON-LD BreadcrumbList) for SEO
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

  return (
    <>
      {showJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
      )}

      <nav
        aria-label="Breadcrumb"
        className={`inline-flex items-center ${containerClasses} ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[11.5px] sm:text-xs font-['Inter'] leading-none">
          {fullTrail.map((item, index) => {
            const isLast = index === fullTrail.length - 1;
            const isHome = index === 0;

            return (
              <li key={index} className="inline-flex items-center gap-1 sm:gap-1.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className={`${activeClasses} truncate max-w-[200px] sm:max-w-[320px] md:max-w-none inline-block`}
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.page && onNavigate) {
                        onNavigate(item.page, item.slug);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 py-0.5 rounded cursor-pointer ${linkClasses}`}
                    title={`Go to ${item.label}`}
                  >
                    {isHome && showHomeIcon && (
                      <Home className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </button>
                )}

                {!isLast && (
                  <ChevronRight
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${separatorClasses} shrink-0 opacity-70`}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

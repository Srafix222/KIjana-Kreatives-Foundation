import React, { useEffect } from 'react';
import { PageId } from '../types';
import { SEO_PAGE_CONFIG, buildPageJsonLd } from '../seo/seoConfig';

interface SEOHeadProps {
  currentPage: PageId;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPage }) => {
  useEffect(() => {
    const config = SEO_PAGE_CONFIG[currentPage] || SEO_PAGE_CONFIG.home;

    // 1. Update Title
    document.title = config.title;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to create or update link tag (like canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Search Meta Tags
    setMetaTag('name', 'description', config.metaDescription);
    setMetaTag('name', 'keywords', config.keywords);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setLinkTag('canonical', config.canonical);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', config.ogTitle);
    setMetaTag('property', 'og:description', config.ogDescription);
    setMetaTag('property', 'og:url', config.canonical);
    setMetaTag('property', 'og:type', config.ogType);
    setMetaTag('property', 'og:image', config.ogImage);
    setMetaTag('property', 'og:image:alt', `${config.title} - Kijana Kreatives Foundation`);
    setMetaTag('property', 'og:site_name', 'Kijana Kreatives Foundation');
    setMetaTag('property', 'og:locale', 'en_KE');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.ogTitle);
    setMetaTag('name', 'twitter:description', config.ogDescription);
    setMetaTag('name', 'twitter:image', config.ogImage);
    setMetaTag('name', 'twitter:site', '@kijanakreatives');
    setMetaTag('name', 'twitter:creator', '@kijanakreatives');

    // 5. Inject / Update Dynamic JSON-LD Structured Data
    const scriptId = 'kkf-jsonld-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(buildPageJsonLd(currentPage));
  }, [currentPage]);

  return null;
};

import React, { useState, useEffect } from 'react';
import { PageId, Program, EventItem, Post, Report, Story, DonationReceipt } from './types';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { 
  HomePage, 
  AboutPage, 
  ProgramsPage, 
  ImpactPage, 
  StoriesPage, 
  GetInvolvedPage, 
  ResourcesPage, 
  DonatePage, 
  ContactPage 
} from './pages';

// Modals
import { ProgramDetailModal } from './components/Modals/ProgramDetailModal';
import { EventRegisterModal } from './components/Modals/EventRegisterModal';
import { ArticleReaderModal } from './components/Modals/ArticleReaderModal';
import { StoryVideoModal } from './components/Modals/StoryVideoModal';
import { DonationReceiptModal } from './components/Modals/DonationReceiptModal';
import { AnnualReportModal } from './components/Modals/AnnualReportModal';
import { LegalModal } from './components/Modals/LegalModal';

const VALID_PAGES: PageId[] = [
  'home', 
  'about', 
  'programs', 
  'impact', 
  'stories', 
  'get-involved', 
  'resources', 
  'donate', 
  'contact'
];

function parseInitialRoute(): { page: PageId; programSlug?: string; tab?: 'youth' | 'mentor' | 'volunteer' | 'partner' } {
  try {
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (VALID_PAGES.includes(path as PageId)) {
      return { page: path as PageId };
    }

    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page')?.toLowerCase();
    const programParam = params.get('program') || undefined;
    const tabParam = params.get('tab') as 'youth' | 'mentor' | 'volunteer' | 'partner' | undefined;

    if (pageParam && VALID_PAGES.includes(pageParam as PageId)) {
      return { page: pageParam as PageId, programSlug: programParam, tab: tabParam };
    }

    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (VALID_PAGES.includes(hash as PageId)) {
      return { page: hash as PageId };
    }
  } catch {
    // Fallback for isolated contexts
  }

  return { page: 'home' };
}

export default function App() {
  const initialRoute = parseInitialRoute();
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [selectedProgramSlug, setSelectedProgramSlug] = useState<string | undefined>(initialRoute.programSlug);
  const [selectedInvolvedTab, setSelectedInvolvedTab] = useState<'youth' | 'mentor' | 'volunteer' | 'partner'>(initialRoute.tab || 'youth');

  // Modal States
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<DonationReceipt | null>(null);
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | 'safeguarding' | 'financial' | 'security' | null>(null);

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page && VALID_PAGES.includes(event.state.page)) {
        setCurrentPage(event.state.page);
        if (event.state.programSlug) setSelectedProgramSlug(event.state.programSlug);
        if (event.state.tab) setSelectedInvolvedTab(event.state.tab);
      } else {
        const route = parseInitialRoute();
        setCurrentPage(route.page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Smooth scroll to top on page change and sync URL
  const handleNavigate = (page: PageId, programSlug?: string, tab?: 'youth' | 'mentor' | 'volunteer' | 'partner') => {
    setCurrentPage(page);
    if (programSlug) setSelectedProgramSlug(programSlug);
    if (tab) setSelectedInvolvedTab(tab);

    try {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page, programSlug, tab }, '', targetPath);
      }
    } catch {
      // Gracefully handle iframe security restrictions if history.pushState is sandboxed
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyToProgram = (programOrSlug: Program | string) => {
    setActiveProgram(null);
    const slug = typeof programOrSlug === 'string' ? programOrSlug : programOrSlug.slug;
    setSelectedProgramSlug(slug);
    setSelectedInvolvedTab('youth');
    handleNavigate('get-involved', slug, 'youth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      {/* Dynamic SEO Meta Tags, Canonical & JSON-LD Schemas */}
      <SEOHead currentPage={currentPage} />

      {/* 1. Global Navigation */}
      <Nav 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
      />

      {/* 2. Main Page Content Routing */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProgram={(p) => setActiveProgram(p)}
            onOpenVideo={() => setIsVideoModalOpen(true)}
            onOpenEvent={(e) => setActiveEvent(e)}
            onOpenPost={(p) => setActivePost(p)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onOpenProgram={(p) => setActiveProgram(p)}
            initialProgramSlug={selectedProgramSlug}
          />
        )}

        {currentPage === 'impact' && (
          <ImpactPage
            onNavigate={handleNavigate}
            onOpenReport={(r) => setActiveReport(r)}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'get-involved' && (
          <GetInvolvedPage
            onNavigate={handleNavigate}
            initialTab={selectedInvolvedTab}
            initialProgramSlug={selectedProgramSlug}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onOpenPost={(p) => setActivePost(p)}
            onOpenEvent={(e) => setActiveEvent(e)}
            onOpenReport={(r) => setActiveReport(r)}
          />
        )}

        {currentPage === 'donate' && (
          <DonatePage
            onNavigate={handleNavigate}
            onDonationSuccess={(receipt) => setActiveReceipt(receipt)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setActiveLegal(type)}
      />

      {/* 4. Global Modals */}
      {activeProgram && (
        <ProgramDetailModal
          program={activeProgram}
          onClose={() => setActiveProgram(null)}
          onApply={handleApplyToProgram}
        />
      )}

      {activeEvent && (
        <EventRegisterModal
          event={activeEvent}
          onClose={() => setActiveEvent(null)}
        />
      )}

      {activePost && (
        <ArticleReaderModal
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      )}

      <StoryVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {activeReport && (
        <AnnualReportModal
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}

      {activeReceipt && (
        <DonationReceiptModal
          isOpen={activeReceipt !== null}
          onClose={() => setActiveReceipt(null)}
          donationDetails={{
            donorName: activeReceipt.donorName,
            donorEmail: activeReceipt.donorEmail,
            amount: activeReceipt.amount,
            currency: activeReceipt.currency,
            mode: activeReceipt.frequency,
            method: activeReceipt.paymentMethod.toLowerCase().includes('mpesa') 
              ? 'mpesa' 
              : activeReceipt.paymentMethod.toLowerCase().includes('card')
              ? 'card'
              : activeReceipt.paymentMethod.toLowerCase().includes('bank')
              ? 'bank'
              : activeReceipt.paymentMethod.toLowerCase().includes('cheque') || activeReceipt.paymentMethod.toLowerCase().includes('check')
              ? 'cheque'
              : activeReceipt.paymentMethod.toLowerCase().includes('paypal')
              ? 'paypal'
              : 'international',
            designation: activeReceipt.impactSummary || 'General Creative Fund',
            referenceId: activeReceipt.receiptNumber,
          }}
        />
      )}

      {activeLegal && (
        <LegalModal
          type={activeLegal}
          onClose={() => setActiveLegal(null)}
        />
      )}
    </div>
  );
}

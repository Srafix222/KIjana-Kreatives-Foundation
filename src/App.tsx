import React, { useState, useEffect } from 'react';
import { PageId, Program, EventItem, Post, Report, Story, DonationReceipt, BreadcrumbItem } from './types';
import { Nav } from './components/Nav';
import { BreadcrumbBar } from './components/BreadcrumbBar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { SEOHead } from './components/SEOHead';
import { PROGRAMS } from './data/content';
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
import { ApplicationModal, ApplicationType } from './components/Modals/ApplicationModal';

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
  const [navigationHistory, setNavigationHistory] = useState<PageId[]>([initialRoute.page]);
  const [selectedProgramSlug, setSelectedProgramSlug] = useState<string | undefined>(initialRoute.programSlug);
  const [selectedInvolvedTab, setSelectedInvolvedTab] = useState<'youth' | 'mentor' | 'volunteer' | 'partner'>(initialRoute.tab || 'youth');
  const [programsCategory, setProgramsCategory] = useState<string>('All');
  const [resourcesCategory, setResourcesCategory] = useState<string>('All');

  // Modal States
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<DonationReceipt | null>(null);
  const [activeLegal, setActiveLegal] = useState<'privacy' | 'terms' | 'safeguarding' | 'financial' | 'security' | null>(null);
  const [activeApplication, setActiveApplication] = useState<{
    isOpen: boolean;
    type: ApplicationType;
    trackSlug?: string;
  }>({
    isOpen: false,
    type: 'youth',
  });

  const handleOpenApplication = (type: ApplicationType = 'youth', trackSlug?: string) => {
    setActiveApplication({ isOpen: true, type, trackSlug });
  };

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
    if (page !== currentPage) {
      setNavigationHistory((prev) => [...prev, page]);
    }
    setCurrentPage(page);
    if (programSlug) {
      setSelectedProgramSlug(programSlug);
      const foundProg = PROGRAMS.find((p) => p.slug === programSlug);
      if (foundProg) {
        setProgramsCategory(foundProg.category);
      }
    }
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

  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const updated = [...navigationHistory];
      updated.pop(); // Remove current page
      const previous = updated[updated.length - 1] || 'home';
      setNavigationHistory(updated);
      handleNavigate(previous);
    } else if (currentPage !== 'home') {
      handleNavigate('home');
    } else {
      try {
        window.history.back();
      } catch {
        // Fallback
      }
    }
  };

  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    if (item.page === 'programs') {
      setProgramsCategory('All');
      setActiveProgram(null);
      setSelectedProgramSlug(undefined);
      handleNavigate('programs');
      return;
    }
    if (item.page === 'resources') {
      setResourcesCategory('All');
      setActivePost(null);
      setActiveReport(null);
      setActiveEvent(null);
      handleNavigate('resources');
      return;
    }
    if (item.page) {
      handleNavigate(item.page, item.slug, item.tab);
    }
  };

  // Build real-time path breadcrumbs for interior pages
  const getBreadcrumbData = (): { items: BreadcrumbItem[]; metaBadge?: string } => {
    switch (currentPage) {
      case 'programs': {
        const items: BreadcrumbItem[] = [
          { label: 'Home', page: 'home' },
          { 
            label: 'Programs', 
            page: 'programs', 
            active: programsCategory === 'All' && !activeProgram 
          },
        ];
        if (programsCategory !== 'All') {
          items.push({
            label: `${programsCategory} Tracks`,
            page: 'programs',
            active: !activeProgram,
          });
        }
        if (activeProgram) {
          items.push({
            label: activeProgram.title,
            active: true,
          });
        }
        const metaBadge = activeProgram 
          ? activeProgram.category 
          : programsCategory !== 'All' 
            ? `${programsCategory} Pathway` 
            : '7 Specialized Tracks';
        return { items, metaBadge };
      }

      case 'stories': {
        const items: BreadcrumbItem[] = [
          { label: 'Home', page: 'home' },
          { label: 'Alumni Stories', page: 'stories', active: true },
        ];
        return { items, metaBadge: '320+ Creative Alumni' };
      }

      case 'resources': {
        const items: BreadcrumbItem[] = [
          { label: 'Home', page: 'home' },
          { 
            label: 'Resources & Hub', 
            page: 'resources', 
            active: resourcesCategory === 'All' && !activePost && !activeReport && !activeEvent 
          },
        ];
        if (resourcesCategory !== 'All') {
          items.push({
            label: `${resourcesCategory} Articles`,
            page: 'resources',
            active: !activePost && !activeReport && !activeEvent,
          });
        }
        if (activePost) {
          items.push({
            label: activePost.title,
            active: true,
          });
        } else if (activeReport) {
          items.push({
            label: activeReport.title,
            active: true,
          });
        } else if (activeEvent) {
          items.push({
            label: activeEvent.title,
            active: true,
          });
        }
        const metaBadge = activePost 
          ? activePost.category 
          : activeReport 
            ? 'Annual Report' 
            : activeEvent 
              ? 'Event' 
              : resourcesCategory !== 'All' 
                ? `${resourcesCategory}` 
                : 'Toolkits & Insights';
        return { items, metaBadge };
      }

      case 'about': {
        return {
          items: [
            { label: 'Home', page: 'home' },
            { label: 'About Foundation', page: 'about', active: true },
          ],
          metaBadge: 'Mission & Vision',
        };
      }

      case 'impact': {
        return {
          items: [
            { label: 'Home', page: 'home' },
            { label: 'Impact & Accountability', page: 'impact', active: !activeReport },
            ...(activeReport ? [{ label: activeReport.title, active: true }] : []),
          ],
          metaBadge: 'Audited Transparency',
        };
      }

      case 'get-involved': {
        const tabLabels: Record<string, string> = {
          youth: 'Youth Application',
          mentor: 'Industry Mentorship',
          volunteer: 'Volunteer Community',
          partner: 'Institutional Partnership',
        };
        return {
          items: [
            { label: 'Home', page: 'home' },
            { label: 'Get Involved', page: 'get-involved' },
            { label: tabLabels[selectedInvolvedTab] || 'Opportunities', active: true },
          ],
          metaBadge: `${selectedInvolvedTab.toUpperCase()} Pathway`,
        };
      }

      case 'donate': {
        return {
          items: [
            { label: 'Home', page: 'home' },
            { label: 'Donate & Support', page: 'donate', active: true },
          ],
          metaBadge: '100% Direct Program Impact',
        };
      }

      case 'contact': {
        return {
          items: [
            { label: 'Home', page: 'home' },
            { label: 'Contact & Hub', page: 'contact', active: true },
          ],
          metaBadge: 'Nairobi Studio HQ',
        };
      }

      default:
        return { items: [] };
    }
  };

  const breadcrumbData = getBreadcrumbData();

  const handleApplyToProgram = (programOrSlug: Program | string) => {
    setActiveProgram(null);
    const slug = typeof programOrSlug === 'string' ? programOrSlug : programOrSlug.slug;
    setSelectedProgramSlug(slug);
    setSelectedInvolvedTab('youth');
    handleNavigate('get-involved', slug, 'youth');
    handleOpenApplication('youth', slug);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      {/* Dynamic SEO Meta Tags, Canonical & JSON-LD Schemas */}
      <SEOHead currentPage={currentPage} />

      {/* 1. Global Navigation */}
      <Nav 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onBack={handleBack}
      />

      {/* 2. Breadcrumb Navigation Bar Under Main Navigation (Interior Pages) */}
      {currentPage !== 'home' && (
        <BreadcrumbBar
          currentPage={currentPage}
          items={breadcrumbData.items}
          metaBadge={breadcrumbData.metaBadge}
          onNavigate={handleNavigate}
          onBack={handleBack}
          onItemClick={handleBreadcrumbClick}
        />
      )}

      {/* 3. Main Page Content Routing */}
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
          <AboutPage onNavigate={handleNavigate} onBack={handleBack} />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onBack={handleBack}
            onOpenProgram={(p) => setActiveProgram(p)}
            initialProgramSlug={selectedProgramSlug}
            selectedCategory={programsCategory}
            onCategoryChange={setProgramsCategory}
          />
        )}

        {currentPage === 'impact' && (
          <ImpactPage
            onNavigate={handleNavigate}
            onBack={handleBack}
            onOpenReport={(r) => setActiveReport(r)}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesPage onNavigate={handleNavigate} onBack={handleBack} />
        )}

        {currentPage === 'get-involved' && (
          <GetInvolvedPage
            onNavigate={handleNavigate}
            onBack={handleBack}
            initialTab={selectedInvolvedTab}
            initialProgramSlug={selectedProgramSlug}
            onOpenApplication={handleOpenApplication}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onBack={handleBack}
            onOpenPost={(p) => setActivePost(p)}
            onOpenEvent={(e) => setActiveEvent(e)}
            onOpenReport={(r) => setActiveReport(r)}
            selectedCategory={resourcesCategory}
            onCategoryChange={setResourcesCategory}
          />
        )}

        {currentPage === 'donate' && (
          <DonatePage
            onNavigate={handleNavigate}
            onBack={handleBack}
            onDonationSuccess={(receipt) => setActiveReceipt(receipt)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onBack={handleBack} />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setActiveLegal(type)}
      />

      {/* Floating Back to Top Navigation Control */}
      <BackToTop currentPage={currentPage} />

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

      <ApplicationModal
        isOpen={activeApplication.isOpen}
        type={activeApplication.type}
        selectedTrackSlug={activeApplication.trackSlug}
        onClose={() => setActiveApplication((prev) => ({ ...prev, isOpen: false }))}
        onTypeChange={(newType) => setActiveApplication((prev) => ({ ...prev, type: newType }))}
      />
    </div>
  );
}

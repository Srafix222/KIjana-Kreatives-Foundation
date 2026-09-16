// Application and registration configuration for Kijana Kreatives Foundation (KKF)
// Direct intake portal links for cohorts, mentorship, volunteers, and partnerships.

export interface GoogleFormConfig {
  id: 'youth' | 'mentor' | 'volunteer' | 'partner';
  title: string;
  category: string;
  tagline: string;
  url: string;
  description: string;
  actionText: string;
  shortAction: string;
  eligibility: string;
  timeToComplete: string;
  reviewTime: string;
  checklist: string[];
  keyBenefits: string[];
}

export const GOOGLE_FORMS: Record<'youth' | 'mentor' | 'volunteer' | 'partner', GoogleFormConfig> = {
  youth: {
    id: 'youth',
    title: 'Youth Creative Cohort Application',
    category: 'YOUTH APPLICANTS',
    tagline: 'Single unified application for all 6 studio tracks across our Academies',
    url: 'https://forms.google.com',
    description: 'Apply for our upcoming 12-week intensive studio cohorts. One unified application covers all creative and digital tracks across our academies. Full studio access, workstations, and equipment are 100% tuition-free.',
    actionText: 'Complete Application Form',
    shortAction: 'Apply for Programs',
    eligibility: 'Young Kenyans aged 16–30 · No prior formal degree or experience required',
    timeToComplete: 'Takes ~5–8 minutes',
    reviewTime: 'Rolling admissions · Applications reviewed within 5 working days',
    checklist: [
      'Basic contact details and active WhatsApp number (for cohort communication & updates)',
      'County of residence (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, or any Kenyan county)',
      'Preferred program track from the Programs page (Design, Film, Animation, Sound, UI/UX, or AI)',
      'Short statement explaining your creative interests and career ambitions',
      'Optional link to social handle, portfolio, or past creative work (not mandatory)',
    ],
    keyBenefits: [
      '100% Tuition-Free with all studio hardware & software provided',
      'Weekly 1-on-1 critiques with active industry creative directors',
      'Real commercial client capstones and production briefs',
      'Direct agency introductions, internships, and paid creative pathways',
    ],
  },
  mentor: {
    id: 'mentor',
    title: 'Industry Mentor Network Application',
    category: 'CREATIVE MENTORS',
    tagline: 'Guide the next generation of Kenyan creative and digital leaders',
    url: 'https://forms.google.com',
    description: 'Share your real-world expertise with emerging talent. Whether giving 2 hours a month in 1-on-1 critiques, conducting a masterclass, or reviewing portfolio capstones, your guidance transforms careers.',
    actionText: 'Complete Mentor Registration',
    shortAction: 'Become a Mentor',
    eligibility: 'Practicing creatives, agency leads & technologists with 2+ years industry experience',
    timeToComplete: 'Takes ~4–6 minutes',
    reviewTime: 'Reviewed weekly by our mentorship and admissions committee',
    checklist: [
      'Current professional role, agency, studio, or freelance practice',
      'Creative discipline (Visual Design, Film, Sound, 3D, Product, AI, or Strategy)',
      'Preferred mentorship commitment (1–2 hrs/month or masterclass sessions)',
      'LinkedIn profile, agency site, or portfolio link',
    ],
    keyBenefits: [
      'Direct impact shaping high-potential Kenyan emerging creators',
      'Early access to top graduating cohort talent for hiring and internships',
      'Invitation to KKF Creative Festival and industry showcase jury',
      'Recognition across KKF annual reports and creative community platforms',
    ],
  },
  volunteer: {
    id: 'volunteer',
    title: 'Studio & Events Volunteer Registration',
    category: 'COMMUNITY VOLUNTEERS',
    tagline: 'Support studio operations, live events, showcases, and workshops',
    url: 'https://forms.google.com',
    description: 'Help make our community and events run smoothly. Volunteers support studio logistics, event management, media production, technical setups, and community engagement across Kenya.',
    actionText: 'Complete Volunteer Registration',
    shortAction: 'Register as Volunteer',
    eligibility: 'Passionate individuals committed to youth empowerment & creative arts',
    timeToComplete: 'Takes ~3–5 minutes',
    reviewTime: 'Reviewed continuously on a rolling event basis',
    checklist: [
      'Full name, location, and primary contact phone number',
      'Areas of interest (event production, studio logistics, photo/video crew, community outreach)',
      'General availability (weekdays, weekends, or specific festival dates)',
      'Any previous experience or special technical skills (optional)',
    ],
    keyBenefits: [
      'Hands-on experience in creative production and event staging',
      'Full access to KKF creative community, networking, and workshops',
      'Official KKF volunteer certificate of service and professional recommendation',
      'Transport and meal stipends provided for event-day shifts',
    ],
  },
  partner: {
    id: 'partner',
    title: 'Institutional & Corporate Partner Proposal',
    category: 'STRATEGIC PARTNERS',
    tagline: 'Co-fund cohorts, sponsor creative briefs, or donate studio equipment',
    url: 'https://forms.google.com',
    description: 'Partner with KKF to build sustainable talent pipelines. We collaborate with creative agencies, tech corporations, foundations, and cultural organizations to scale access for Kenyan youth.',
    actionText: 'Submit Partner Proposal',
    shortAction: 'Partner With Us',
    eligibility: 'Agencies, companies, NGOs, cultural funds & hardware manufacturers',
    timeToComplete: 'Takes ~5–7 minutes',
    reviewTime: 'Leadership review within 3 business days',
    checklist: [
      'Organization name, website, and industry focus',
      'Lead point of contact, role, and corporate email address',
      'Partnership focus (cohort sponsorship, challenge funding, hardware donations, or student internships)',
      'Estimated timeframe and collaboration scale',
    ],
    keyBenefits: [
      'Audited impact reporting and CSR ESG governance alignment',
      'Commission bespoke student capstone briefs tailored to your brand',
      'Direct pipeline of vetted junior designers, animators, and developers',
      'Co-branding across cohort graduation showcases and festival exhibitions',
    ],
  },
};

export type PageId = 
  | 'home'
  | 'about'
  | 'programs'
  | 'impact'
  | 'stories'
  | 'get-involved'
  | 'resources'
  | 'donate'
  | 'contact';

export type ProgramCategory = 'Creative' | 'Digital' | 'Business' | 'Opportunities';
export type ProgramStatus = 'Open' | 'Waitlist' | 'Closed' | 'By referral';

export interface Program {
  slug: string;
  title: string;
  category: ProgramCategory;
  description: string;
  duration: string;
  level: string;
  location: string;
  cohort: string;
  status: ProgramStatus;
  image: string;
  imagePlaceholderText: string;
  featured: boolean;
  order: number;
  cost?: string;
  schedule?: string;
  eligibility?: string;
  curriculum?: string[];
  skills?: string[];
  prerequisites?: string;
}

export interface Story {
  slug: string;
  name: string;
  county: string;
  field: string;
  quote: string;
  avatar: string;
  avatarPlaceholderText: string;
  featured: boolean;
  role?: string;
  bio?: string;
  highlightWork?: string;
  consentOnFile: boolean;
  publishedAt: string;
}

export type EventKind = 'Training' | 'Challenge' | 'Festival' | 'Workshop' | 'Showcase';

export interface EventItem {
  slug: string;
  title: string;
  kind: EventKind;
  dateLabel: string;
  startsAt: string;
  location: string;
  description: string;
  registrationUrl?: string;
  capacity?: number;
  featured?: boolean;
}

export interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  image: string;
  imagePlaceholderText: string;
  author?: string;
  readingMinutes?: number;
}

export interface Stat {
  key: string;
  target: number;
  suffix: string;
  label: string;
  accent?: boolean;
}

export interface Outcome {
  value: string;
  title: string;
  description: string;
  accent?: boolean;
}

export interface TimelineEntry {
  year: string;
  milestone: string;
  accent?: boolean;
}

export interface ValueItem {
  title: string;
  body: string;
  accent?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  portrait: string;
  placeholderText: string;
  bio?: string;
  order: number;
}

export interface Partner {
  name: string;
  type: string;
  logo: string;
  order: number;
}

export interface DonationTier {
  amount: number;
  currency: 'KES';
  description: string;
  amountUsd?: number;
  amountKes?: number;
  label?: string;
  impact?: string;
  accent?: boolean;
}

export interface DonationReceipt {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: 'KES' | 'USD';
  frequency: 'once' | 'monthly';
  paymentMethod: string;
  date: string;
  impactSummary: string;
}

export interface Report {
  year: string;
  title: string;
  summary: string;
  period: string;
  fileSize: string;
}

export type GiveMode = 'once' | 'monthly';
export type Designation = 'creative-training' | 'equipment' | 'scholarships' | 'mentorship' | 'general';
export type PaymentMethod = 'mpesa' | 'card' | 'bank' | 'international';

export interface YouthApplication {
  fullName: string;
  email: string;
  phone: string;
  age: number | '';
  county: string;
  educationLevel: 'Secondary' | 'Certificate' | 'Diploma' | 'Undergraduate' | 'Other';
  creativeInterests: string;
  skillLevel: 'Beginner' | 'Some experience' | 'Intermediate' | 'Advanced';
  portfolioUrl?: string;
  programPreference: string;
  motivation: string;
  referralSource: 'Social media' | 'A friend' | 'School' | 'An event' | 'Other';
  consent: boolean;
  guardianName?: string;
  guardianPhone?: string;
  guardianConsent?: boolean;
}

export interface MentorApplication {
  name: string;
  email: string;
  phone: string;
  profession: string;
  organization: string;
  creativeField: string;
  yearsExperience: number | '';
  skills: string;
  profileUrl?: string;
  availability: '1–2 hours a month' | '3–5 hours a month' | 'Weekly' | 'Project-based';
  motivation: string;
}

export interface VolunteerApplication {
  name: string;
  email: string;
  phone: string;
  county: string;
  availability: string;
  interests: string[];
  motivation: string;
}

export interface PartnerEnquiry {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

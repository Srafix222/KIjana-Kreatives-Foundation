// Google Forms configuration for Kijana Kreatives Foundation (KKF)
// Replace these URLs with your specific live Google Forms links anytime.

export interface GoogleFormConfig {
  id: 'youth' | 'mentor' | 'volunteer' | 'partner';
  title: string;
  category: string;
  url: string;
  description: string;
  actionText: string;
  shortAction: string;
}

export const GOOGLE_FORMS: Record<'youth' | 'mentor' | 'volunteer' | 'partner', GoogleFormConfig> = {
  youth: {
    id: 'youth',
    title: 'Join a program',
    category: 'YOUTH',
    url: 'https://forms.google.com',
    description: 'Apply to a Creative or Digital Academy cohort. No prior formal training required.',
    actionText: 'Open Youth Application (Google Form)',
    shortAction: 'Apply on Google Form',
  },
  mentor: {
    id: 'mentor',
    title: 'Share your skills',
    category: 'MENTORS',
    url: 'https://forms.google.com',
    description: 'Give a few hours a month to a young creative working in your field.',
    actionText: 'Open Mentor Registration (Google Form)',
    shortAction: 'Become a Mentor',
  },
  volunteer: {
    id: 'volunteer',
    title: 'Give your time',
    category: 'VOLUNTEERS',
    url: 'https://forms.google.com',
    description: 'Help run cohorts, events, showcases and community workshops.',
    actionText: 'Open Volunteer Form (Google Form)',
    shortAction: 'Volunteer on Google Form',
  },
  partner: {
    id: 'partner',
    title: 'Create opportunities',
    category: 'PARTNERS',
    url: 'https://forms.google.com',
    description: 'Build programs, placements or funded challenges with measurable impact.',
    actionText: 'Open Partner Proposal (Google Form)',
    shortAction: 'Partner with Us',
  },
};

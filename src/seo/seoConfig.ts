import { PageId } from '../types';
import { KKF_FAQS } from './faqData';

export interface PageMetadata {
  title: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogImage: string;
  breadcrumbName: string;
}

export const BASE_URL = 'https://kijanakreatives.org';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/images/kkf_hero_documentary_1788763400589.jpg`;

export const SEO_PAGE_CONFIG: Record<PageId, PageMetadata> = {
  home: {
    title: 'Kijana Kreatives Foundation | Practical Creative & Digital Training in Kenya',
    metaDescription: 'Tuition-free, project-based creative and digital skills training, camera gear access, and career mentorship for young Kenyan creators in Nairobi.',
    keywords: 'Kijana Kreatives Foundation, KKF Kenya, creative academy Nairobi, free digital skills training Kenya, creative youth empowerment Kenya, graphic design courses Nairobi, photography training Kenya, animation bootcamp Kenya, music production Kenya, UI UX design courses Nairobi',
    canonical: `${BASE_URL}/`,
    ogTitle: 'Kijana Kreatives Foundation | Empowering Kenya’s Next Creative Generation',
    ogDescription: 'Tuition-free studio tracks in design, photography, animation, music, and web UI/UX for young Kenyans in Nairobi. 1,240+ creators trained with 84% career placement.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Home'
  },
  about: {
    title: 'About Us & Our Mission in Nairobi | Kijana Kreatives Foundation',
    metaDescription: 'Discover the story, leadership team, values, and community milestones of Kijana Kreatives Foundation (KKF), registered Kenyan creative education NGO.',
    keywords: 'about Kijana Kreatives, KKF leadership, Ian Nyatindo, creative education NGO Kenya, Nairobi youth nonprofit, creative development East Africa',
    canonical: `${BASE_URL}/about`,
    ogTitle: 'About Kijana Kreatives Foundation | Our Story, Leadership & Values',
    ogDescription: 'Founded in 2021 in Nairobi, KKF breaks down economic barriers to creative careers for underprivileged young Kenyan talents.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'About Us'
  },
  programs: {
    title: 'Creative Academy Programs & Studio Tracks | Kijana Kreatives Foundation',
    metaDescription: 'Explore 6 intensive 12-week studio tracks: Graphic Design, Photography & Film, Animation, Sound Engineering, Web & UI/UX, and AI for Creatives.',
    keywords: 'creative training Nairobi, graphic design course Kenya, photography workshops Nairobi, sound engineering Kenya, UI UX bootcamp Nairobi, animation school Kenya',
    canonical: `${BASE_URL}/programs`,
    ogTitle: 'Creative Academy Studio Tracks | Kijana Kreatives Foundation',
    ogDescription: 'Hands-on, portfolio-driven 12-week curriculum with free access to cinema gear, workstations, and 1-on-1 industry mentors.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Programs & Tracks'
  },
  impact: {
    title: 'Impact, Regional Reach & Alumni Outcomes | Kijana Kreatives Foundation',
    metaDescription: 'See the numbers behind KKF: 1,240+ young Kenyans trained across 10 active counties, 84% career placement rate, and audited impact reviews.',
    keywords: 'KKF impact report, creative youth employment Kenya, Nairobi arts statistics, Kenyan NGO impact, youth skills outcomes Kenya',
    canonical: `${BASE_URL}/impact`,
    ogTitle: 'Audited Impact & Outcomes | Kijana Kreatives Foundation',
    ogDescription: 'From Nairobi to coastal and western satellite hubs: 1,240+ youths trained, 240+ hours per cohort, and verified employment pathways.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Impact & Reports'
  },
  stories: {
    title: 'Creator Spotlights & Alumni Stories | Kijana Kreatives Foundation',
    metaDescription: 'Read authentic case studies of emerging Kenyan directors, visual designers, animators, and music producers who launched careers through KKF.',
    keywords: 'Kenyan creative stories, Nairobi artist spotlights, KKF alumni, creative success stories Kenya, emerging Kenyan filmmakers',
    canonical: `${BASE_URL}/stories`,
    ogTitle: 'Alumni Spotlights & Creative Journeys | Kijana Kreatives',
    ogDescription: 'Real voices, genuine journeys: how young Kenyan talents turned curiosity into sustainable creative livelihoods.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Alumni Stories'
  },
  'get-involved': {
    title: 'Apply for Creative Training, Mentor or Partner | Kijana Kreatives Foundation',
    metaDescription: 'Apply for our upcoming Creative Academy cohort in Nairobi, become an industry mentor, volunteer studio time, or sponsor a creative fellowship.',
    keywords: 'apply creative academy Kenya, creative mentorship Nairobi, volunteer creative NGO, hire Kenyan designers, sponsor creative student Kenya',
    canonical: `${BASE_URL}/get-involved`,
    ogTitle: 'Join the KKF Creative Community | Admissions & Partnerships',
    ogDescription: 'Four pathways in: apply as an emerging creator, share expertise as a mentor, volunteer in our studios, or partner as an agency.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Get Involved'
  },
  resources: {
    title: 'Creative Guides, Articles & Documentary Archive | Kijana Kreatives Foundation',
    metaDescription: 'Free creative industry guides, portfolio toolkits, annual reports, and documentary image archive for young African creatives and educators.',
    keywords: 'creative resources Kenya, design portfolio guide Nairobi, freelance creative pricing Kenya, nonprofit annual report Kenya, KKF image catalog',
    canonical: `${BASE_URL}/resources`,
    ogTitle: 'Guides, Reports & Learning Resources | Kijana Kreatives Foundation',
    ogDescription: 'Actionable industry toolkits, financial reports, and the official KKF documentary photojournalism catalog.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Resources & Archive'
  },
  donate: {
    title: 'Donate & Support Tuition-Free Creative Education in Kenya | KKF',
    metaDescription: 'Empower Kenyan creative youth. Donate via M-PESA Paybill (522522), Co-operative Bank of Kenya, or SWIFT wire. 100% transparent reporting.',
    keywords: 'donate to creative education Kenya, M-Pesa NGO donations, youth empowerment donation Nairobi, donate to Kenyan arts, Co-op bank charity donation',
    canonical: `${BASE_URL}/donate`,
    ogTitle: 'Support a Young Creative | Donate to Kijana Kreatives Foundation',
    ogDescription: 'Fund equipment, software licenses, and mentorship stipends. Every shilling directly creates classroom seats for talented Kenyan youths.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Donate & Support'
  },
  contact: {
    title: 'Contact Kijana Kreatives Foundation | The Foundry Arts Hub, Nairobi',
    metaDescription: 'Get in touch with Kijana Kreatives Foundation. Visit our studio at The Foundry on Ngong Road, Nairobi, email admissions, or call our team.',
    keywords: 'contact Kijana Kreatives, The Foundry Ngong Road, creative studio Nairobi address, KKF email phone, creative NGO Nairobi contact',
    canonical: `${BASE_URL}/contact`,
    ogTitle: 'Contact Our Nairobi Creative Studio | Kijana Kreatives Foundation',
    ogDescription: 'Visit us along Ngong Road, Nairobi, or reach our admissions, mentorship, and partnerships coordinators directly.',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    breadcrumbName: 'Contact Us'
  }
};

/**
 * Generates Schema.org JSON-LD for the Organization / NGO
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['NGO', 'EducationalOrganization'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Kijana Kreatives Foundation',
    alternateName: ['KKF', 'Kijana Kreatives', 'Kijana Kreatives Kenya'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/favicon.svg`,
      width: 512,
      height: 512
    },
    image: DEFAULT_OG_IMAGE,
    description: 'Tuition-free, project-based creative and digital skills training, camera gear access, and career mentorship for young Kenyan creators in Nairobi.',
    foundingDate: '2021',
    founder: {
      '@type': 'Person',
      name: 'Ian Nyatindo',
      jobTitle: 'Executive Director'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Foundry Arts Hub, Ngong Road',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      postalCode: '00100',
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2921,
      longitude: 36.8219
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+254700123456',
        contactType: 'admissions',
        email: 'admissions@kijanakreatives.org',
        availableLanguage: ['English', 'Swahili'],
        areaServed: 'KE'
      },
      {
        '@type': 'ContactPoint',
        email: 'partnerships@kijanakreatives.org',
        contactType: 'partnerships',
        availableLanguage: ['English', 'Swahili']
      }
    ],
    nonprofitStatus: 'NonprofitOrganization',
    sameAs: [
      'https://twitter.com/kijanakreatives',
      'https://instagram.com/kijanakreatives',
      'https://linkedin.com/company/kijana-kreatives-foundation',
      'https://youtube.com/@kijanakreatives'
    ]
  };
}

/**
 * Generates Schema.org JSON-LD for WebSite with Sitelinks Search Box
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Kijana Kreatives Foundation',
    alternateName: 'KKF',
    description: 'Practical creative and digital skills training for Kenyan youth.',
    inLanguage: 'en-KE',
    publisher: {
      '@id': `${BASE_URL}/#organization`
    }
  };
}

/**
 * Generates Schema.org BreadcrumbList for rich snippets in Google SERP
 */
export function getBreadcrumbSchema(page: PageId) {
  const current = SEO_PAGE_CONFIG[page];
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${BASE_URL}/`
    }
  ];

  if (page !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: current.breadcrumbName,
      item: current.canonical
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * Generates Schema.org Course and EducationalOccupationalProgram for Academy tracks
 */
export function getCoursesSchema() {
  const tracks = [
    {
      name: 'Graphic Design & Visual Identity Track',
      description: '12-week tuition-free studio track covering typography, branding identity, packaging design, and client pitch presentations.',
      teaches: 'Typography, Adobe Illustrator, Photoshop, Layout Composition, Brand Systems'
    },
    {
      name: 'Photography & Documentary Videography Track',
      description: 'Hands-on camera handling, natural lighting, documentary storytelling, and video editing using industry-standard gear in Nairobi.',
      teaches: 'DSLR/Cinema camera rigging, Studio lighting, DaVinci Resolve, Documentary editing'
    },
    {
      name: 'Animation & Motion Graphics Track',
      description: '2D & 3D character animation, keyframing, motion design for social media, and digital illustration workflows.',
      teaches: 'Blender, Adobe After Effects, 2D Rigging, 3D Viewport Modeling, Motion Typography'
    },
    {
      name: 'Music Production & Sound Engineering Track',
      description: 'Audio recording, mixing, beat production, podcast engineering, and acoustic capture inside a community studio setup.',
      teaches: 'FL Studio, Logic Pro, Audio Interfaces, Microphone placement, Vocal processing'
    },
    {
      name: 'Web & UI/UX Product Design Track',
      description: 'User experience research, wireframing, interactive prototyping in Figma, and modern frontend web development.',
      teaches: 'Figma, Design Systems, Mobile App UX, HTML/CSS/Tailwind, User Testing'
    },
    {
      name: 'AI Tools & Generative Workflows for Creatives',
      description: 'Integrating ethical generative AI tools into creative pipelines without losing personal creative identity or artistic voice.',
      teaches: 'Prompt Engineering for Creatives, Generative Workflows, Visual Ideation, Ethical AI'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kijana Kreatives Creative Academy Tracks',
    description: 'Tuition-free creative training tracks offered in Nairobi, Kenya.',
    itemListElement: tracks.map((track, idx) => ({
      '@type': 'Course',
      position: idx + 1,
      name: track.name,
      description: track.description,
      teaches: track.teaches,
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      isAccessibleForFree: true,
      inLanguage: 'en-KE',
      courseWorkload: 'PT240H',
      occupationalCredentialAwarded: 'Certificate of Completion & Portfolio Review',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'In-person Studio',
        courseWorkload: '12 Weeks (20 hours/week)',
        location: {
          '@type': 'Place',
          name: 'The Foundry Arts Hub',
          address: 'Ngong Road, Nairobi, Kenya'
        }
      }
    }))
  };
}

/**
 * Generates Schema.org FAQPage for Google People Also Ask & Rich Snippets
 */
export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: KKF_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Builds the composite JSON-LD Graph for a specific page
 */
export function buildPageJsonLd(page: PageId): object {
  const graph: object[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getBreadcrumbSchema(page)
  ];

  if (page === 'home' || page === 'get-involved' || page === 'contact') {
    graph.push(getFAQSchema());
  }

  if (page === 'programs' || page === 'home') {
    graph.push(getCoursesSchema());
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

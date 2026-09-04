import { 
  Program, 
  Story, 
  EventItem, 
  Post, 
  Stat, 
  Outcome, 
  TimelineEntry, 
  ValueItem, 
  TeamMember, 
  Partner, 
  DonationTier, 
  Report 
} from '../types';
import { APP_ASSETS } from './assets';
export { GOOGLE_FORMS } from './forms';

export const BRAND = {
  fullName: "Kijana Kreatives Foundation",
  shortName: "KKF",
  tagline: "Creative & Digital Training",
  positioning: "Your Talent Can Build Your Future.",
  descriptor: "Practical creative and digital skills training for Kenyan youth.",
  founded: "2021, Nairobi, Kenya",
  email: "admissions@kijanakreatives.org",
  phone: "+254 700 123 456",
  whatsapp: "+254 700 123 456",
  contactNote: "Inquire via email or in person at our studio.",
  location: "Nairobi, Kenya",
  officeAddress: "The Foundry Arts Hub, Ngong Road, Nairobi, Kenya",
  registration: "Registered Non-Profit Organisation (NGO), Republic of Kenya (Reg. OP.218/051/21-0429)",
};

export const IMPACT_CARDS = [
  {
    no: "01",
    title: "Youth Empowerment",
    body: "Equipping young people with practical creative skills.",
    accent: false,
  },
  {
    no: "02",
    title: "Creative Skills",
    body: "Design, photography, animation, film, music and digital technology.",
    accent: false,
  },
  {
    no: "03",
    title: "Mentorship",
    body: "Connecting emerging creatives with experienced professionals.",
    accent: false,
  },
  {
    no: "04",
    title: "Career Opportunities",
    body: "Helping young creatives move from learning to earning.",
    accent: true,
  },
];

export const JOURNEY_STEPS = [
  {
    no: "01",
    step: "DISCOVER",
    body: "Find your creative ability and apply for tuition-free studio tracks.",
    accentColor: "blue",
  },
  {
    no: "02",
    step: "LEARN",
    body: "Develop practical industry skills through 12 weeks of intensive studio briefs.",
    accentColor: "amber",
  },
  {
    no: "03",
    step: "CREATE",
    body: "Build real projects and portfolios with full equipment and software access.",
    accentColor: "blue",
  },
  {
    no: "04",
    step: "LAUNCH",
    body: "Connect with careers, clients, agencies and working mentors across Kenya.",
    accentColor: "amber",
  },
];

export const WHY_WE_EXIST = [
  {
    eyebrow: "ACCESS",
    title: "Breaking Down Barriers",
    body: "Making quality creative education accessible to young people regardless of background.",
  },
  {
    eyebrow: "PRACTICE",
    title: "Hands-On Studio Craft",
    body: "Learning through real-world projects rather than theory alone.",
  },
  {
    eyebrow: "OPPORTUNITY",
    title: "Pathways Into Earning",
    body: "Connecting talent with mentors, employment, entrepreneurship and industry.",
  },
];

export const VALUES: ValueItem[] = [
  {
    title: "Dignity",
    body: "We treat young people as professionals in training, not beneficiaries.",
  },
  {
    title: "Craft",
    body: "Standards matter. We teach to the level the industry actually hires at.",
  },
  {
    title: "Openness",
    body: "Our programs, results and finances are published and reviewable.",
  },
  {
    title: "Community",
    body: "No one builds a creative career alone. We build the room around them.",
    accent: true,
  },
];

export const STATS: Stat[] = [
  {
    key: "youth-reached",
    target: 380,
    suffix: "",
    label: "Graduates (2024–2025 Audit)",
  },
  {
    key: "projects-completed",
    target: 85,
    suffix: "",
    label: "Portfolio Briefs Delivered",
  },
  {
    key: "mentors-network",
    target: 42,
    suffix: "",
    label: "Active Industry Mentors",
  },
  {
    key: "partnerships",
    target: 6,
    suffix: "",
    label: "Formal Industry Partners",
  },
  {
    key: "counties-reached",
    target: 10,
    suffix: "",
    label: "Counties with Active Learners",
    accent: true,
  },
];

export const OUTCOMES: Outcome[] = [
  {
    value: "62%",
    title: "Earning from creative work",
    description: "Alumni reporting paid client work or employment within six months (2024–2025 tracer study).",
  },
  {
    value: "34",
    title: "Studios & practices active",
    description: "Independent design, video and photography practices operated by alumni.",
  },
  {
    value: "1,200",
    title: "Mentorship hours logged",
    description: "1-on-1 critique and production hours contributed by practicing Kenyan professionals.",
    accent: true,
  },
  {
    value: "85",
    title: "Completed client briefs",
    description: "Identity systems, photography campaigns and motion assets delivered by cohorts.",
  },
];

export const PROGRAMS: Program[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Creative",
    description: "Learn visual communication, branding, layout, typography and digital design.",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    location: "Nairobi Studio (In-person)",
    cohort: "Sep 2026",
    status: "Open",
    cost: "100% Tuition-Free (Funded via partner grants)",
    schedule: "4 days / week (Mon–Thu, 9:00 AM – 3:30 PM)",
    eligibility: "Kenyan youth aged 18–30 with creative aptitude. Equipment is provided in-studio.",
    image: APP_ASSETS.creativeWorkshop,
    imagePlaceholderText: "programs/graphic-design.jpg: Designer at a laptop, work visible on screen (3:2)",
    featured: true,
    order: 1,
    skills: ["Visual Identity", "Typography", "Adobe Illustrator", "Photoshop", "Editorial Layout"],
    curriculum: [
      "Fundamentals of Visual Composition & Color Theory",
      "Brand Identity Systems & Logo Construction",
      "Editorial Design & Multi-page Publication Layout",
      "Vector Illustration & Asset Preparation",
      "Client Brief Simulation & Portfolio Production"
    ],
    prerequisites: "Basic computer literacy and enthusiasm for visual storytelling."
  },
  {
    slug: "photography-videography",
    title: "Photography & Videography",
    category: "Creative",
    description: "Learn storytelling through professional photography and video.",
    duration: "10 weeks",
    level: "Beginner to Intermediate",
    location: "Nairobi Studio (In-person)",
    cohort: "Nov 2026",
    status: "Open",
    cost: "100% Tuition-Free (Cameras and lights provided)",
    schedule: "4 days / week (Mon–Thu, 9:00 AM – 3:30 PM)",
    eligibility: "Kenyan youth aged 18–30. All cameras and lighting provided during studio sessions.",
    image: APP_ASSETS.outdoorPhotography,
    imagePlaceholderText: "programs/photography.jpg: Camera operator mid-shot, hands on the body (3:2)",
    featured: true,
    order: 2,
    skills: ["Camera Operation", "Lighting Setup", "Premiere Pro", "Audio Recording", "Storyboarding"],
    curriculum: [
      "Manual Camera Controls, Exposure Triangle & Optics",
      "Natural & Studio Lighting Techniques",
      "Audio Capture & Field Sound Fundamentals",
      "Video Editing in Adobe Premiere Pro & DaVinci Resolve",
      "Documentary & Commercial Portfolio Shoot"
    ],
    prerequisites: "Open to beginners. Equipment is provided during studio practicals."
  },
  {
    slug: "animation-motion-graphics",
    title: "Animation & Motion Graphics",
    category: "Creative",
    description: "Turn ideas into movement through animation and motion design.",
    duration: "14 weeks",
    level: "Intermediate",
    location: "Hybrid (2 days studio, 2 days online)",
    cohort: "Oct 2026",
    status: "Open",
    cost: "100% Tuition-Free (Workstations provided)",
    schedule: "4 days / week (Tue & Thu in studio, Mon & Wed online)",
    eligibility: "Kenyan youth aged 18–30 with foundational illustration or design experience.",
    image: APP_ASSETS.motion3dAnimation,
    imagePlaceholderText: "programs/animation.jpg: Animation workstation, timeline on screen, tablet (3:2)",
    featured: true,
    order: 3,
    skills: ["2D Animation", "After Effects", "Keyframing", "Kinetic Typography", "Character Rigging"],
    curriculum: [
      "The 12 Principles of Animation",
      "Motion Design in After Effects",
      "Kinetic Typography for Commercials & Social",
      "2D Character Rigging & Walk Cycles",
      "Sound Design & Motion Reel Assembly"
    ],
    prerequisites: "Foundational digital drawing or graphic design knowledge."
  },
  {
    slug: "music-production",
    title: "Music Production & Sound Design",
    category: "Creative",
    description: "Develop skills in recording, production, sound design and digital music.",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    location: "Nairobi Studio (In-person)",
    cohort: "Jan 2027",
    status: "Waitlist",
    cost: "100% Tuition-Free (Studio access included)",
    schedule: "3 days / week studio practicals (9:00 AM – 4:00 PM)",
    eligibility: "Kenyan youth aged 18–30 passionate about sound and audio engineering.",
    image: APP_ASSETS.soundAudioStudio,
    imagePlaceholderText: "programs/music-production.jpg: Studio recording (desk, monitors, headphones) (3:2)",
    featured: true,
    order: 4,
    skills: ["DAW Workflows", "Beatmaking", "Vocal Recording", "Audio Mixing", "Mastering Basics"],
    curriculum: [
      "Digital Audio Workstations (Logic Pro / Ableton Live / FL Studio)",
      "Rhythm, Harmony & Beat Arrangement",
      "Vocal Tracking & Acoustic Treatments",
      "Mixing with EQ, Compression & Spatial Effects",
      "Release Strategy & Music Copyright in Kenya"
    ],
    prerequisites: "No previous music theory required. Passion for sound creation."
  },
  {
    slug: "web-ui-ux-design",
    title: "Web & UI/UX Design",
    category: "Digital",
    description: "Design websites and digital experiences for the modern economy.",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    location: "Hybrid (Nairobi Studio & Online)",
    cohort: "Sep 2026",
    status: "Open",
    cost: "100% Tuition-Free (Figma Pro license included)",
    schedule: "4 days / week (Mon–Thu, 9:00 AM – 3:00 PM)",
    eligibility: "Kenyan youth aged 18–30. Laptop required for hybrid sessions.",
    image: APP_ASSETS.uiUxWireframing,
    imagePlaceholderText: "programs/ui-ux.jpg: Two people at a UI design session, wireframes (3:2)",
    featured: true,
    order: 5,
    skills: ["User Research", "Figma", "Wireframing", "Interactive Prototyping", "Design Systems"],
    curriculum: [
      "User-Centred Design & Empathy Mapping",
      "Information Architecture & User Flow Mapping",
      "Component-driven UI Design in Figma",
      "Micro-interactions & Responsive Web Layouts",
      "Usability Testing & Case Study Delivery"
    ],
    prerequisites: "Familiarity with computers and modern web apps."
  },
  {
    slug: "ai-for-creatives",
    title: "AI for Creatives",
    category: "Digital",
    description: "Use artificial intelligence to enhance creativity, productivity and innovation.",
    duration: "6 weeks",
    level: "All levels",
    location: "Online (Evenings & Weekends)",
    cohort: "Rolling",
    status: "Open",
    cost: "100% Tuition-Free (Sponsored compute credits)",
    schedule: "2 live evening workshops / week + self-paced lab",
    eligibility: "Practicing or aspiring creators based in Kenya.",
    image: APP_ASSETS.motion3dAnimation,
    imagePlaceholderText: "programs/ai-creatives.jpg: Creative using AI tools, screen legible (3:2)",
    featured: true,
    order: 6,
    skills: ["Prompt Engineering", "Generative Visuals", "Workflow Automation", "Creative Ideation", "Ethics in AI"],
    curriculum: [
      "Foundations of Generative Models for Designers & Writers",
      "Iterative Prompt Engineering for Concept Art & Asset Production",
      "Integrating AI into Commercial Client Workflows",
      "Intellectual Property, Originality & Ethical Creative Practice",
      "Final Project: AI-Assisted Creative Campaign"
    ],
    prerequisites: "Open to all practicing or aspiring creative practitioners."
  }
];

export const STORIES: Story[] = [
  {
    slug: "nairobi-artisan-doc",
    name: "Nairobi Artisan Heritage Project",
    county: "Nairobi",
    field: "Photography & Film Capstone",
    quote: "“Our cohort spent four weeks documenting informal craft workers in Gikomba. We presented the finished photo book and short documentary to 14 creative agency leads at the graduation showcase.”",
    avatar: APP_ASSETS.featuredFilmmaker,
    avatarPlaceholderText: "showcase/artisan-doc.jpg: Documentary film crew on location (1:1)",
    featured: true,
    role: "2025 Creative Academy Capstone",
    highlightWork: "5-part documentary short & published print photo book",
    consentOnFile: true,
    publishedAt: "2025-12-10"
  },
  {
    slug: "coastal-agri-brand",
    name: "Coastal Agriculture Identity System",
    county: "Kilifi & Mombasa",
    field: "Graphic Design Capstone",
    quote: "“We delivered an end-to-end visual identity and packaging system for an organic coconut cooperative, cutting printing costs while giving their products premium shelf appeal.”",
    avatar: APP_ASSETS.creativeWorkshop,
    avatarPlaceholderText: "showcase/agri-brand.jpg: Brand identity style guide and packaging (1:1)",
    featured: true,
    role: "2025 Design Cohort Capstone",
    highlightWork: "Full brand identity, label packaging, and vendor guidelines",
    consentOnFile: true,
    publishedAt: "2025-11-28"
  },
  {
    slug: "community-savings-ui",
    name: "Chama Mobile Interface & Design System",
    county: "Nakuru & Nairobi",
    field: "UI/UX Capstone",
    quote: "“Our team prototyped a low-bandwidth group savings application in Figma, validated through user tests with 24 market traders. Two team members were hired as junior product designers following the showcase.”",
    avatar: APP_ASSETS.uiUxWireframing,
    avatarPlaceholderText: "showcase/savings-ui.jpg: Mobile app wireframes and usability tests (1:1)",
    featured: true,
    role: "2025 Digital Academy Capstone",
    highlightWork: "Tested 34-screen prototype and accessible component library",
    consentOnFile: true,
    publishedAt: "2025-10-15"
  }
];

export const FEATURED_CREATOR = {
  name: "Creative Academy Annual Showcase",
  role: "Annual Cohort Exhibition",
  county: "Nairobi, Mombasa & Kisumu",
  discipline: "Multi-disciplinary Creative Capstones",
  bio: "At the close of every 12-week cohort, students present their capstone projects to a jury of working creative directors, agency founders, and production leads. The showcase serves as a direct bridge from training into paid work.",
  quote: "“We don't grade students on multiple-choice tests. We evaluate their ability to take a client brief from research to finished production and articulate why their creative choices work.”",
  image: APP_ASSETS.academyShowcase,
  imagePlaceholderText: "showcase/annual-exhibition.jpg: Students presenting capstone projects to agency directors (4:5)",
  stats: [
    { label: "Graduation Rate", val: "100%" },
    { label: "Client Briefs", val: "85" },
    { label: "Audit Period", val: "2024–25" }
  ]
};

export const EVENTS: EventItem[] = [
  {
    slug: "creative-bootcamp-2026",
    title: "Creative Bootcamp",
    kind: "Training",
    dateLabel: "September 2026",
    startsAt: "2026-09-14",
    location: "Nairobi",
    description: "Two weeks of intensive practical training across design, photography and film.",
    registrationUrl: "#apply-youth",
    capacity: 60,
    featured: true
  },
  {
    slug: "youth-design-challenge-2026",
    title: "Youth Design Challenge",
    kind: "Challenge",
    dateLabel: "October 2026",
    startsAt: "2026-10-05",
    location: "Online + Nairobi",
    description: "A national brief for young designers, judged by working industry professionals.",
    registrationUrl: "#apply-youth",
    capacity: 250,
    featured: true
  },
  {
    slug: "kkf-creative-festival-2026",
    title: "KKF Creative Festival",
    kind: "Festival",
    dateLabel: "December 2026",
    startsAt: "2026-12-10",
    location: "Nairobi",
    description: "A showcase of the year's work: exhibitions, screenings, performances and talks.",
    registrationUrl: "#apply-youth",
    capacity: 1200,
    featured: true
  }
];

export const POSTS: Post[] = [
  {
    slug: "turning-a-portfolio-into-your-first-paid-brief",
    category: "Creative Careers",
    title: "Turning a portfolio into your first paid brief",
    excerpt: "What clients and creative directors actually look for when they hire an emerging designer in East Africa.",
    date: "12 Aug 2026",
    image: APP_ASSETS.workshopSession,
    imagePlaceholderText: "blog/first-paid-brief.jpg: Designer reviewing client brief at desk (16:9)",
    author: "KKF Programs Team",
    readingMinutes: 6,
    body: `When creative directors, agency leads, and startup founders in Nairobi review junior portfolios, they rarely look for endless decorative mockups or flashy visual gimmicks. What they desperately search for is intentional thinking, clarity of process, and proof that you can solve real commercial problems under real-world constraints.

### 1. Show the Problem, Not Just the Jpeg
Every project in your portfolio should answer three fundamental questions before showcasing the final visuals: What was the client or organization trying to achieve? What constraints (such as limited production budgets, tight turnaround times, or low-bandwidth mobile networks) did you operate under? How did your visual and structural decisions directly resolve that challenge?

For instance, rather than simply labeling a project "Branding for a Coffee Shop," reframe it strategically: "Brand identity and packaging for a Nyeri coffee cooperative designed to stand out on competitive supermarket shelves while cutting single-color plate printing costs by 22%." This immediately shifts you from being viewed as an execution decorator to a strategic creative partner.

### 2. Fewer Projects, Deeper Process
A portfolio featuring three thoroughly documented case studies will consistently outperform one packed with twelve superficial poster mockups. Clients want to understand how your brain works when there is no template to copy.

Document your initial research, show the rough napkin sketches, include the discarded concept directions, and explain why your team chose a particular typeface or color system. Highlighting your messy middle stages builds immense trust with hiring leads because it demonstrates that you know how to iterate, accept constructive critique, and navigate ambiguity.

### 3. Speak the Client's Commercial Language
Talent gets you noticed, but professional hygiene gets you hired repeatedly. Young creatives often lose lucrative contracts not because of weak craft, but because of poor communication, ambiguous pricing, or missing contract agreements.

Always present transparent scopes of work (SOW), outline revision milestones upfront, and mandate a standard 50% deposit before commencing any project. When you discuss deliverables in terms of business outcomes (such as user engagement, brand recall, and conversion rates), clients feel confident paying professional rates in Kenyan Shillings or foreign currencies.

### 4. Polish Every Digital Touchpoint
Ensure your portfolio website or PDF pitch deck loads in under two seconds on standard 4G mobile connections across Kenya. Creative directors frequently review candidate links on their phones while commuting between meetings in Nairobi traffic.

Make your direct contact channels completely frictionless. Include your active WhatsApp Business link, a clear email address, and a concise one-sentence bio defining your core specialisation: "Nairobi-based motion designer helping tech startups explain complex products through 3D storytelling."`
  },
  {
    slug: "using-ai-without-losing-your-creative-voice",
    category: "AI",
    title: "Using AI without losing your creative voice",
    excerpt: "Practical ways young African creatives are leveraging generative tools to work faster, bolder, and more distinctively.",
    date: "29 Jul 2026",
    image: APP_ASSETS.motion3dAnimation,
    imagePlaceholderText: "blog/ai-creative-voice.jpg: Creative working with generative design software (16:9)",
    author: "KKF Digital Academy",
    readingMinutes: 7,
    body: `Artificial intelligence tools are rapidly reshaping the creative industries across Kenya and the wider continent. But the most successful young creatives aren't treating AI as an idea replacement or an excuse for shortcuts; instead, they treat it as a tireless studio apprentice that handles tedious scaffolding so they can spend more time refining their unique artistic vision.

### 1. Rapid Moodboarding & Texture Generation
Instead of spending two days endlessly scrolling through generic Western stock photo libraries, forward-thinking art directors use generative diffusion models to build custom visual moodboards, test dynamic lighting angles, and generate hyper-specific architectural textures.

For example, if you are conceptualising a sci-fi short film set in 2050 Old Town Mombasa, you can use generative tools to rapidly explore how traditional Swahili carved wooden doorways might blend with futuristic solar-glass facades. In thirty minutes, you have ten rich reference boards ready to align your cinematographer and production designer before shooting a single frame.

### 2. Retaining Cultural Nuance and Local Storytelling
Generic English prompts typed into global AI models inevitably produce generic, homogenized Western tropes. The real competitive advantage for African creatives lies in grounding their prompts in deep local cultural context, regional architecture, indigenous textiles, and authentic urban dialects.

Infusing nuances like Sheng vernacular, Maasai color symbolism, Lamu coral stone textures, or dynamic Nairobi matatu graffiti into your prompt engineering creates distinctive, arresting visual vocabularies that international tools could never invent on their own. The machine supplies the compute; you supply the cultural memory and soul.

### 3. The 80/20 Rule of Creative Craft
At KKF Digital Academy, we teach our students the 80/20 principle of AI workflow integration: use automated tools for the initial 20% (syntax scaffolding, brainstorming variations, cleaning audio noise) and the final 10% (upscaling textures, format adaptations).

The essential middle 70% (the storytelling heartbeat, typographic hierarchy, editorial pacing, and emotional empathy) must remain strictly human-driven. An algorithm cannot feel the rhythm of an East African drum pattern or understand the social nuances of a community market in Kisumu. Master the tools, but let your human perspective lead.`
  },
  {
    slug: "notes-from-a-term-inside-the-creative-academy",
    category: "Youth",
    title: "Notes from a term inside the Creative Academy",
    excerpt: "Twelve weeks, four Kenyan counties, and a transformative showcase night proving what happens when youth access meets real opportunity.",
    date: "04 Jul 2026",
    image: APP_ASSETS.academyShowcase,
    imagePlaceholderText: "blog/academy-term-notes.jpg: Creative Academy cohort collaborating in classroom (16:9)",
    author: "Faith M., Cohort Coordinator",
    readingMinutes: 8,
    body: `Twelve weeks ago, thirty-two young people from across Nairobi, Mombasa, Nakuru, and Kisumu walked through the doors of the KKF Creative Studio. Some had only ever designed on five-year-old smartphones; others carried notebooks filled with hand-drawn comic strips and camera storyboards. Last Thursday, they stood before forty senior agency leads, production heads, and brand directors to present their finished capstone projects.

### 1. Weeks 1 to 4: Breaking the Fear of the Blank Canvas
The first month of the Academy is intentionally designed to strip away the paralysis of perfectionism. Students are immersed in intensive, hands-on daily sprints: understanding manual camera optics, mastering the mathematical principles of grid systems, experimenting with natural light, and analyzing classic African cinema.

More importantly, the studio creates a safe, judgment-free space where failure is treated as necessary data. Through daily peer critique sessions, quiet students who were once intimidated by software tools discovered their voices, learning how to articulate design reasoning with clarity and pride.

### 2. Weeks 5 to 8: Real Briefs with High Stakes
In the second month, theoretical exercises ended. The cohort was divided into multidisciplinary pods, pairing a graphic designer, a videographer, a motion animator, and a digital strategist together, and assigned live briefs for local grassroots enterprises and non-profits across Kenya.

They conducted field interviews in local markets, tested prototypes on real users, managed client feedback meetings, and resolved creative disagreements under tight deadlines. This pressure-tested experience taught them what no online tutorial can: how to collaborate generously, protect creative integrity, and deliver world-class work on time.

### 3. Weeks 9 to 12: The Showcase and Beyond
The final weeks culminated in the Annual KKF Creative Showcase. The studio was transformed into an interactive exhibition space featuring short documentary screenings, brand identity installations, UI/UX mobile app prototypes, and 3D architectural renders.

The outcome exceeded our highest expectations: 100% of the cohort successfully graduated their capstones, and within three weeks of graduation, eighteen alumni had already secured paid agency internships, freelance commissions, or studio apprenticeships. The Creative Academy proves that Kenya does not have a talent shortage. It has an opportunity bridge that we are building together.`
  }
];

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2021",
    milestone: "KKF founded in Nairobi. First design and photography cohort runs on donated equipment.",
  },
  {
    year: "2023",
    milestone: "Creative Academy formalised. Mentor network opens to working industry professionals.",
  },
  {
    year: "2025",
    milestone: "Digital Academy added: web, UI/UX and AI for creatives. Programs reach ten counties.",
  },
  {
    year: "2026",
    milestone: "First KKF Creative Festival, and a growing alumni network moving into paid creative work.",
    accent: true,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ian Nyatindo",
    role: "Founder & Executive Director",
    portrait: APP_ASSETS.founderPortrait,
    placeholderText: "team/founder.jpg: Founder portrait (3:4)",
    bio: "Passionate about democratising creative education and unlocking economic opportunities for East African youth.",
    order: 1
  },
  {
    name: "Wanjiru Kariuki",
    role: "Programs Lead",
    portrait: APP_ASSETS.leadCurriculum,
    placeholderText: "team/programs-lead.jpg: Programs Lead portrait (3:4)",
    bio: "Over 8 years managing vocational youth curricula and studio production pipelines in Nairobi.",
    order: 2
  },
  {
    name: "Kevin Ochieng",
    role: "Creative Director",
    portrait: APP_ASSETS.mentorGuidance,
    placeholderText: "team/creative-director.jpg: Creative Director portrait (3:4)",
    bio: "Award-winning brand designer and animator dedicated to high-standard craft mentorship.",
    order: 3
  },
  {
    name: "Amina Hassan",
    role: "Head of Partnerships",
    portrait: APP_ASSETS.headPartnerships,
    placeholderText: "team/partnerships.jpg: Partnerships Lead portrait (3:4)",
    bio: "Connecting international cultural foundations, tech studios, and corporate allies with KKF talent.",
    order: 4
  }
];

export const PARTNERS: Partner[] = [
  { 
    name: "Safaricom Foundation", 
    type: "Telecom & Digital Inclusion", 
    logo: "Safaricom", 
    order: 1,
    domain: "safaricomfoundation.org",
    websiteUrl: "https://www.safaricomfoundation.org",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Safaricom_logo.svg/500px-Safaricom_logo.svg.png",
    faviconUrl: "https://www.google.com/s2/favicons?domain=safaricom.co.ke&sz=128"
  },
  { 
    name: "British Council Kenya", 
    type: "Creative Economy Partner", 
    logo: "British Council", 
    order: 2,
    domain: "britishcouncil.org",
    websiteUrl: "https://www.britishcouncil.or.ke",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/British_Council_logo_2020.svg",
    faviconUrl: "https://www.google.com/s2/favicons?domain=britishcouncil.org&sz=128"
  },
  { 
    name: "Goethe-Institut Nairobi", 
    type: "Cultural Exchange", 
    logo: "Goethe-Institut", 
    order: 3,
    domain: "goethe.de",
    websiteUrl: "https://www.goethe.de/ins/ke/en/index.html",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Goethe-Institut_Logo.svg",
    faviconUrl: "https://www.google.com/s2/favicons?domain=goethe.de&sz=128"
  },
  { 
    name: "Kenya Film Commission", 
    type: "Film & Media Partner", 
    logo: "KFC", 
    order: 4,
    domain: "kenyafilmcommission.go.ke",
    websiteUrl: "https://kenyafilmcommission.go.ke",
    logoUrl: "https://kenyafilmcommission.go.ke/wp-content/themes/_film/assets/images/logo.svg",
    faviconUrl: "https://www.google.com/s2/favicons?domain=kenyafilmcommission.go.ke&sz=128"
  },
  { 
    name: "Nairobi Design Week", 
    type: "Industry Showcase", 
    logo: "NDW", 
    order: 5,
    domain: "nairobi.design",
    websiteUrl: "https://nairobi.design",
    logoUrl: "https://cdn.prod.website-files.com/6a21fba6fcb435ddecc48a37/6a22c084862e9f9cabaf3840_1%20N.png",
    faviconUrl: "https://www.google.com/s2/favicons?domain=nairobi.design&sz=128"
  },
  { 
    name: "HEVA Fund", 
    type: "Creative Enterprises", 
    logo: "HEVA", 
    order: 6,
    domain: "hevafund.com",
    websiteUrl: "https://hevafund.com",
    logoUrl: "",
    faviconUrl: "https://www.google.com/s2/favicons?domain=hevafund.com&sz=128"
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 500,
    amountKes: 3250,
    amountUsd: 25,
    currency: "KES",
    label: "Materials Kit",
    impact: "Sketchbooks, markers, and foundational design supplies for 1 creator.",
    description: "Covers transport for one participant for a week of training.",
  },
  {
    amount: 1000,
    amountKes: 6500,
    amountUsd: 50,
    currency: "KES",
    label: "Studio Pass",
    impact: "1 month of high-speed workstation and editing studio access.",
    description: "Funds studio and equipment access for a full project week.",
    accent: true,
  },
  {
    amount: 2500,
    amountKes: 13000,
    amountUsd: 100,
    currency: "KES",
    label: "Pro Licenses",
    impact: "Annual Creative Cloud & Figma software licenses for 1 student.",
    description: "Supports a month of mentorship for one young creative.",
  },
  {
    amount: 5000,
    amountKes: 32500,
    amountUsd: 250,
    currency: "KES",
    label: "Full Cohort",
    impact: "Full 12-week fellowship sponsorship for an aspiring creative.",
    description: "Contributes a scholarship place toward a twelve-week cohort.",
    accent: true,
  },
];

export const ALLOCATION_BREAKDOWN = [
  { category: "Equipment & Studio Access", share: "45%", desc: "Cameras, workstations, lighting gear, software licences, and maker space facilities." },
  { category: "Mentor & Facilitator Stipends", share: "30%", desc: "Fair compensation for working industry pros guiding masterclasses and critiques." },
  { category: "Youth Transport & Commute Subsidy", share: "15%", desc: "Ensuring economic constraints never stop talented young people from attending cohorts." },
  { category: "Admin & Transparent Reporting", share: "10%", desc: "Operational continuity, student welfare, auditing, and annual public impact reviews." }
];

export const KENYA_COUNTIES = [
  { name: "Nairobi", active: true, cohorts: 8, participants: 580 },
  { name: "Kiambu", active: true, cohorts: 3, participants: 120 },
  { name: "Machakos", active: true, cohorts: 2, participants: 85 },
  { name: "Nakuru", active: true, cohorts: 3, participants: 95 },
  { name: "Kisumu", active: true, cohorts: 3, participants: 110 },
  { name: "Mombasa", active: true, cohorts: 4, participants: 140 },
  { name: "Uasin Gishu", active: true, cohorts: 2, participants: 60 },
  { name: "Kilifi", active: true, cohorts: 1, participants: 45 },
  { name: "Nyeri", active: true, cohorts: 1, participants: 35 },
  { name: "Kakamega", active: true, cohorts: 1, participants: 40 },
  { name: "Kajiado", active: false },
  { name: "Meru", active: false },
  { name: "Garissa", active: false },
  { name: "Turkana", active: false },
  { name: "Trans Nzoia", active: false },
  { name: "Embu", active: false },
  { name: "Kitui", active: false },
  { name: "Lamu", active: false },
  { name: "Bomet", active: false },
  { name: "Kericho", active: false }
];

export const REPORTS: Report[] = [
  {
    year: "2025",
    title: "KKF Annual Impact & Financial Report 2025",
    summary: "Comprehensive audited breakdown of cohorts, outcomes, alumni earnings, and resource stewardship.",
    period: "January 2025 – December 2025",
    fileSize: "2.8 MB PDF"
  },
  {
    year: "2024",
    title: "KKF Programs & Growth Review 2024",
    summary: "Expansion into coastal and western satellite hubs and establishment of the Digital Academy tracks.",
    period: "January 2024 – December 2024",
    fileSize: "2.1 MB PDF"
  },
  {
    year: "2023",
    title: "Creative Academy Inaugural Cohort Report 2023",
    summary: "First formal cohort evaluation, mentor network insights, and initial career placement metrics.",
    period: "January 2023 – December 2023",
    fileSize: "1.6 MB PDF"
  }
];

export const BANKING_DETAILS = {
  beneficiary: "Kijana Kreatives Foundation",
  registration: "Registered Non-Profit NGO Reg. OP.218/051/21-0429",
  bankName: "Co-operative Bank of Kenya",
  bankLogoUrl: "https://www.co-opbank.co.ke/wp-content/uploads/2026/05/Coop-Logo-02-1.png",
  bankFaviconUrl: "https://www.co-opbank.co.ke/wp-content/uploads/2026/06/cropped-Icon-192x192.jpeg",
  bankWebsite: "https://www.co-opbank.co.ke",
  bankDomain: "co-opbank.co.ke",
  branch: "Nairobi Business Centre Branch (Branch Code: 011)",
  swiftCode: "COOPKENA",
  bankAddress: "Co-operative House, Haile Selassie Avenue, P.O. Box 48231 - 00100, Nairobi, Kenya",
  accounts: [
    {
      id: "kes",
      currency: "KES (Kenya Shillings)",
      label: "Domestic Account",
      accountNumber: "01129482910300",
      type: "Clearing / RTGS / EFT / Pesalink",
      note: "For direct domestic bank transfers across Kenyan banks & SACCOs"
    },
    {
      id: "usd",
      currency: "USD (US Dollars)",
      label: "International USD Account",
      accountNumber: "02129482910301",
      type: "SWIFT Wire / International Transfer",
      note: "For global donors in North America, Europe, Asia, and worldwide"
    },
    {
      id: "gbp_eur",
      currency: "GBP & EUR (Pounds & Euros)",
      label: "UK & European Account",
      accountNumber: "02129482910302",
      type: "SWIFT / SEPA Correspondent Transfer",
      note: "For donors in the United Kingdom, European Union, and diaspora"
    }
  ],
  referenceNote: "Important: Please quote your Full Name or Email Address in the transfer narration so we can identify your contribution and dispatch your official tax-deductible receipt."
};

export const CHEQUE_DETAILS = {
  payableTo: "Kijana Kreatives Foundation",
  courierAddress: "Kijana Kreatives Foundation, The Foundry Arts Hub, Ngong Road, P.O. Box 45210 - 00100, Nairobi, Kenya",
  postalAddress: "P.O. Box 45210 - 00100, GPO Nairobi, Kenya",
  acceptableCurrencies: "Kenyan Shillings (KES), US Dollars (USD), British Pounds (GBP), and Euros (EUR)",
  dispatchEmail: "giving@kijanakreatives.org",
  instructions: "Cheques, banker's drafts, or cashier's checks should be crossed and marked 'Account Payee Only'. They can be delivered via registered post/courier or banked directly into any Co-operative Bank branch.",
  depositOption: "Direct over-the-counter deposit is also welcomed at any Co-operative Bank branch countrywide."
};

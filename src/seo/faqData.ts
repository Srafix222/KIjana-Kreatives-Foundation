export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions & Eligibility' | 'Curriculum & Tracks' | 'Equipment & Facilities' | 'Careers & Outcomes' | 'Partnerships & Giving';
}

export const KKF_FAQS: FAQItem[] = [
  {
    id: 'tuition-free',
    question: 'Is training at Kijana Kreatives Foundation completely tuition-free?',
    answer: 'Yes. All Creative Academy cohort programs at Kijana Kreatives Foundation are 100% tuition-free for selected Kenyan youth. Programs are fully funded through philanthropic grants, studio partnerships, and individual donor contributions, ensuring financial background is never a barrier to world-class creative education.',
    category: 'Admissions & Eligibility'
  },
  {
    id: 'eligibility-criteria',
    question: 'Who is eligible to apply for KKF Creative Academy programs in Nairobi?',
    answer: 'Our programs are primarily designed for young Kenyans aged 18 to 28 from Nairobi and neighboring counties who demonstrate genuine creative curiosity, dedication, and readiness to commit to an intensive 12-week studio schedule. No prior formal degree is required—we evaluate passion, creative thinking, and dedication.',
    category: 'Admissions & Eligibility'
  },
  {
    id: 'equipment-provided',
    question: 'Do I need to own my own laptop or camera to participate?',
    answer: 'No. At our physical studio space—The Foundry Arts Hub on Ngong Road, Nairobi—we provide dedicated workstations equipped with industry-standard digital creative software, high-spec computers, DSLR & cinema cameras, drawing tablets, audio interfaces, and studio lighting gear for trainees during all workshop hours.',
    category: 'Equipment & Facilities'
  },
  {
    id: 'available-tracks',
    question: 'What creative and digital disciplines can I study at Kijana Kreatives?',
    answer: 'We offer six specialized studio tracks: 1) Graphic Design & Brand Identity, 2) Photography & Documentary Videography, 3) Animation & Motion Graphics, 4) Music Production & Sound Engineering, 5) Web & UI/UX Product Design, and 6) AI Tools for Creatives. Each track emphasizes real client briefs and portfolio building.',
    category: 'Curriculum & Tracks'
  },
  {
    id: 'program-duration',
    question: 'How long does a cohort run and what is the schedule?',
    answer: 'Each core cohort runs for 12 intensive weeks, comprising 240+ hands-on studio hours. Trainees attend practical studio workshops 3 to 4 days per week, accompanied by weekly 1-on-1 industry mentor sessions, weekend masterclasses, and an end-of-term public portfolio showcase.',
    category: 'Curriculum & Tracks'
  },
  {
    id: 'career-outcomes',
    question: 'What career support does KKF provide after graduation?',
    answer: 'Over 84% of our graduates transition into paid creative roles within 6 months of cohort completion. We provide direct apprenticeship placement with agency partners, freelance client matching, portfolio reviews with creative directors, and 6 months of post-graduation studio access.',
    category: 'Careers & Outcomes'
  },
  {
    id: 'location-studio',
    question: 'Where is Kijana Kreatives Foundation located in Nairobi?',
    answer: 'Our main creative hub is located at The Foundry Arts Hub, along Ngong Road in Nairobi, Kenya. We are easily accessible via public transit from Nairobi CBD, Kibera, Dagoretti, Kilimani, and surrounding neighborhoods.',
    category: 'Equipment & Facilities'
  },
  {
    id: 'industry-mentors',
    question: 'How can working creative professionals get involved as mentors?',
    answer: 'Practicing art directors, cinematographers, sound designers, and tech leaders can volunteer 2 to 4 hours per month to mentor our trainees. Mentors conduct portfolio critiques, host guest masterclasses, and provide industry career guidance. Inquiries can be submitted via our Get Involved portal.',
    category: 'Partnerships & Giving'
  },
  {
    id: 'agency-partnerships',
    question: 'How can creative agencies and companies hire KKF graduates or partner?',
    answer: 'Agencies and production studios can collaborate with KKF through student apprenticeship programs, sponsored creative challenges, equipment donations, or hiring directly from our vetted talent directory. Reach our partnerships team at partnerships@kijanakreatives.org.',
    category: 'Partnerships & Giving'
  },
  {
    id: 'donations-transparency',
    question: 'How can I support KKF financially and is it tax-deductible in Kenya?',
    answer: 'KKF accepts contributions via M-PESA Paybill (522522, Account: 1294829103), domestic direct bank transfer via Co-operative Bank of Kenya, and international SWIFT wire transfers. Kijana Kreatives Foundation is a legally registered NGO in the Republic of Kenya (Reg. OP.218/051/21-0429), maintaining 100% audited annual financial reporting.',
    category: 'Partnerships & Giving'
  }
];

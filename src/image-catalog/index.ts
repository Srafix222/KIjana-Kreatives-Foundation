// ============================================================================
// KIJANA KREATIVES FOUNDATION (KKF) - IMAGE CATALOG & DOCUMENTARY ARCHIVE
// ============================================================================
// Consistent documentary photography system capturing authentic creative
// learning activities in Nairobi, Kenya. Follows the KKF photographic DNA:
// candid, available light, lived-in spaces, realistic skin texture, unposed.
// ============================================================================

// Primary Documentary Assets
import heroBannerImg from '../assets/images/kkf_hero_documentary_1788763400589.jpg';
import featuredFilmmakerImg from '../assets/images/filmmaker_spotlight_1788763433234.jpg';
import creativeWorkshopImg from '../assets/images/workshop_overview_doc_1788763553237.jpg';
import founderPortraitImg from '../assets/images/director_portrait_doc_1788763585221.jpg';
import academyShowcaseImg from '../assets/images/showcase_documentary_1788763415110.jpg';
import cameraFilmSetImg from '../assets/images/cinema_rigging_doc_1788763448366.jpg';
import mentorGuidanceImg from '../assets/images/mentor_guidance_doc_1788763466076.jpg';
import workshopSessionImg from '../assets/images/design_thinking_doc_1788763480003.jpg';
import outdoorPhotographyImg from '../assets/images/field_photo_practice_1788763494255.jpg';
import soundAudioStudioImg from '../assets/images/audio_booth_space_1788763508180.jpg';
import motion3dAnimationImg from '../assets/images/motion_3d_workspace_1788763523066.jpg';
import uiUxWireframingImg from '../assets/images/uiux_wireframe_doc_1788763539885.jpg';
import leadCurriculumImg from '../assets/images/curriculum_lead_doc_1788763599419.jpg';
import headPartnershipsImg from '../assets/images/partnerships_doc_1788763613248.jpg';
import brandBannerImg from '../assets/images/community_brand_doc_1788763567813.jpg';
import documentaryPhotoImg from '../assets/images/kkf_documentary_photo_1788756617210.jpg';
import graphicDesignDocImg from '../assets/images/graphic_design_documentary_1788756858263.jpg';
import photographyStreetDocImg from '../assets/images/photography_street_documentary_1788756875138.jpg';
import animationDocImg from '../assets/images/animation_motion_documentary_1788756891423.jpg';
import musicProductionDocImg from '../assets/images/music_production_documentary_1788756909923.jpg';
import webUiUxDocImg from '../assets/images/web_uiux_documentary_1788756936260.jpg';
import aiCreativesDocImg from '../assets/images/ai_creatives_documentary_1788756951074.jpg';

export interface ImageCatalogItem {
  id: string;
  title: string;
  category: string;
  discipline?: string;
  filename: string;
  relativePath: string;
  link: string; // The imported module URL/reference
  alt: string;
  aspectRatio: string;
  description: string;
  promptArchitecture?: string;
  usedIn: string[];
}

export const KKF_PHOTOGRAPHY_DNA = {
  mission: "KKF photography should document, not advertise.",
  principles: [
    "Human > polished",
    "Authentic > perfect",
    "Documentary > cinematic",
    "Natural > heavily graded",
    "Lived-in > staged",
    "Real moments > posed moments"
  ],
  standardStyleBlock: `Visual style: authentic documentary photography for a Kenyan youth creative foundation. Candid photojournalistic image captured during a real activity in Nairobi, Kenya. Natural available light, realistic exposure, soft natural shadows, neutral-to-slightly-muted color, accurate African skin tones, visible natural skin texture, realistic hair and clothing, ordinary lived-in environments, genuine human interaction, imperfect but intentional framing, realistic camera perspective, subtle depth of field, natural lens characteristics, documentary editorial photography, unposed moment, human and believable. The photograph should feel like it was captured spontaneously by a photographer documenting a real nonprofit program for an annual report or photo essay.`
};

export const IMAGE_CATALOG: ImageCatalogItem[] = [
  // 1. Academy Track: Graphic Design
  {
    id: "graphic-design-documentary",
    title: "Graphic Design Studio Review",
    category: "Creative Academy Track",
    discipline: "Graphic Design",
    filename: "graphic_design_documentary_1788756858263.jpg",
    relativePath: "src/assets/images/graphic_design_documentary_1788756858263.jpg",
    link: graphicDesignDocImg,
    alt: "Four young Kenyan creatives reviewing printed graphic design work around a shared table in Nairobi",
    aspectRatio: "3:2",
    description: "Four young Kenyan creatives working together around a shared table during a practical graphic design workshop in Nairobi. They are reviewing printed posters, branding concepts, and layout studies. One participant sketches thumbnail layouts in a notebook while another points at a laptop screen discussing typography and composition. Printed color swatches, paper samples, pens, rulers, notebooks, and test prints are scattered naturally across the table under available window light.",
    promptArchitecture: "Four young Kenyan creatives working together around a shared table during a practical graphic design workshop in Nairobi. Reviewing printed posters, branding concepts, and layout studies with natural available light.",
    usedIn: [
      "ProgramsPage - Graphic Design Track Card",
      "HomePage - Foundation Story Asymmetric Mosaic",
      "AboutPage - Creative Learning Spotlight Card",
      "ResourcesPage - 'Turning a portfolio into your first paid brief' Article Card"
    ]
  },

  // 2. Academy Track: Photography & Videography
  {
    id: "photography-street-documentary",
    title: "Street Photography & Composition Practical",
    category: "Creative Academy Track",
    discipline: "Photography & Videography",
    filename: "photography_street_documentary_1788756875138.jpg",
    relativePath: "src/assets/images/photography_street_documentary_1788756875138.jpg",
    link: photographyStreetDocImg,
    alt: "Young Kenyan photographer framing a shot on a Nairobi street while trainees observe and discuss composition",
    aspectRatio: "3:2",
    description: "A young Kenyan photographer conducting a practical photography exercise on an ordinary Nairobi neighborhood street. They are holding a DSLR camera and actively framing a subject across the street while two other young trainees stand nearby observing the camera position and discussing composition. Realistic street textures, storefronts, and natural daylight frame the unposed moment.",
    promptArchitecture: "A young Kenyan photographer conducting a practical photography exercise on an ordinary Nairobi neighborhood street with two trainees observing camera position.",
    usedIn: [
      "ProgramsPage - Photography & Videography Track Card",
      "HomePage - Creative Practice Mosaic Tile",
      "HomePage - Community Showcase Gallery Grid"
    ]
  },

  // 3. Academy Track: Animation & Motion Graphics
  {
    id: "animation-motion-documentary",
    title: "Animation & Motion Graphics",
    category: "Creative Academy Track",
    discipline: "Animation & Motion Graphics",
    filename: "animation_motion_documentary_1788756891423.jpg",
    relativePath: "src/assets/images/animation_motion_documentary_1788756891423.jpg",
    link: animationDocImg,
    alt: "Young Kenyan animator working at desktop computer while mentor reviews animation timeline beside them",
    aspectRatio: "3:2",
    description: "A young Kenyan animator working at a desktop computer inside a modest digital creative lab in Nairobi. A mentor or fellow trainee stands beside them reviewing an animation timeline and discussing keyframes. Drawing tablet, stylus, keyboard, headphones, notebooks, and cables rest naturally on the desk, with sketches pinned behind them.",
    promptArchitecture: "A young Kenyan animator working at a desktop computer inside a modest digital creative lab in Nairobi. A mentor reviews an animation timeline and keyframes.",
    usedIn: [
      "ProgramsPage - Animation & Motion Graphics Track Card",
      "HomePage - Foundation Story Asymmetric Mosaic"
    ]
  },

  // 4. Academy Track: Music Production
  {
    id: "music-production-documentary",
    title: "Music Production & Sound Engineering",
    category: "Creative Academy Track",
    discipline: "Music Production",
    filename: "music_production_documentary_1788756909923.jpg",
    relativePath: "src/assets/images/music_production_documentary_1788756909923.jpg",
    link: musicProductionDocImg,
    alt: "Young Kenyan music producer working in modest home-style recording studio with headphones and MIDI keyboard",
    aspectRatio: "3:2",
    description: "A young Kenyan music producer working inside a modest community recording studio in Nairobi. Wearing studio headphones with one ear slightly uncovered, they adjust controls on an audio interface beside a MIDI keyboard, small studio monitors, microphone, XLR cables, and handwritten lyric sheets in practical, warm indoor lighting.",
    promptArchitecture: "A young Kenyan music producer working inside a modest community recording studio in Nairobi with headphones, MIDI keyboard, and audio interface.",
    usedIn: [
      "ProgramsPage - Music Production & Sound Design Track Card",
      "HomePage - Community Showcase Gallery Grid"
    ]
  },

  // 5. Academy Track: Web & UI/UX Design
  {
    id: "web-uiux-documentary",
    title: "Web & UI/UX Product Prototyping",
    category: "Creative Academy Track",
    discipline: "Web / UI / UX Design",
    filename: "web_uiux_documentary_1788756936260.jpg",
    relativePath: "src/assets/images/web_uiux_documentary_1788756936260.jpg",
    link: webUiUxDocImg,
    alt: "Small team of young Kenyan creatives reviewing website prototype on laptop and discussing interface components",
    aspectRatio: "3:2",
    description: "Three young Kenyan creatives collaborating around a laptop during a web and UI/UX design workshop in Nairobi. One person points toward an interface prototype on the screen while another compares it with hand-drawn wireframes on paper and a third takes notes in a lived-in workshop setting.",
    promptArchitecture: "Three young Kenyan creatives collaborating around a laptop during a web and UI/UX design workshop in Nairobi with paper wireframes and sticky notes.",
    usedIn: [
      "ProgramsPage - Web & UI/UX Design Track Card",
      "HomePage - Community Showcase Gallery Grid",
      "ResourcesPage - 'Notes from a term inside the Creative Academy' Article Card"
    ]
  },

  // 6. Academy Track: AI for Creatives
  {
    id: "ai-creatives-documentary",
    title: "AI Tools & Generative Workflows Lab",
    category: "Creative Academy Track",
    discipline: "AI for Creatives",
    filename: "ai_creatives_documentary_1788756951074.jpg",
    relativePath: "src/assets/images/ai_creatives_documentary_1788756951074.jpg",
    link: aiCreativesDocImg,
    alt: "Young Kenyan creatives experimenting with AI tools on laptops during practical workshop in Nairobi",
    aspectRatio: "3:2",
    description: "A small group of young Kenyan creatives participating in a practical AI workshop in Nairobi. They sit around ordinary desks using laptops to experiment with creative AI tools, comparing prompted visuals with hand-drawn concept sketches on paper without futuristic gimmicks.",
    promptArchitecture: "A small group of young Kenyan creatives participating in a practical AI workshop in Nairobi, comparing prompted visual outputs with hand-drawn concept sketches.",
    usedIn: [
      "ProgramsPage - AI for Creatives Track Card",
      "HomePage - Community Showcase Gallery Grid",
      "ResourcesPage - 'Using AI without losing your creative voice' Article Card"
    ]
  },

  // 7. Field Documentation: DSLR Field Practical
  {
    id: "kkf-documentary-field-practical",
    title: "DSLR Camera Settings & Documentary Practical",
    category: "Field Documentation",
    discipline: "Film & Photojournalism",
    filename: "kkf_documentary_photo_1788756617210.jpg",
    relativePath: "src/assets/images/kkf_documentary_photo_1788756617210.jpg",
    link: documentaryPhotoImg,
    alt: "Three young Kenyan photography trainees and mentor gathered around DSLR camera on Nairobi street",
    aspectRatio: "4:3",
    description: "Three young Kenyan photography trainees and a mentor standing together on an ordinary Nairobi neighborhood street during a practical photography lesson. They are gathered closely around a DSLR camera, reviewing the camera settings and playback screen in an unexpected, spontaneous moment.",
    promptArchitecture: "Three young Kenyan photography trainees and a mentor standing together on an ordinary Nairobi neighborhood street during a practical photography lesson.",
    usedIn: [
      "ProgramsPage - Creative Academy Showcase Card"
    ]
  },

  // 8. Main Hero Banner
  {
    id: "kkf-hero-documentary",
    title: "Creative Academy Main Workshop Atmosphere",
    category: "Hero Banner",
    filename: "kkf_hero_documentary_1788763400589.jpg",
    relativePath: "src/assets/images/kkf_hero_documentary_1788763400589.jpg",
    link: heroBannerImg,
    alt: "Young Kenyan creators collaborating across multidisciplinary creative stations in Nairobi",
    aspectRatio: "16:9",
    description: "Wide documentary photograph showing a real creative learning workshop in Nairobi, Kenya. Several young Kenyan creatives are spread naturally throughout a modest multidisciplinary studio, working on graphic design, photography, video, and digital design. Natural available window light illuminates realistic desks, cables, sketchbooks, and monitors with intentional negative space.",
    promptArchitecture: "Wide horizontal documentary photograph showing a real creative learning workshop in Nairobi, Kenya with young creatives engaged at desks under natural daylight.",
    usedIn: [
      "HomePage - Main Hero Canvas Background"
    ]
  },

  // 9. Showcase & Exhibition Night
  {
    id: "academy-showcase",
    title: "Creative Academy Showcase & Exhibition Night",
    category: "Impact & Community",
    filename: "showcase_documentary_1788763415110.jpg",
    relativePath: "src/assets/images/showcase_documentary_1788763415110.jpg",
    link: academyShowcaseImg,
    alt: "Students presenting completed creative projects to visitors and mentors at showcase evening",
    aspectRatio: "16:9",
    description: "A real end-of-cohort creative showcase in Nairobi, Kenya. Young Kenyan students are presenting their completed creative projects to a small group of visitors and mentors. Attendees examine printed design work and watch video presentations while students explain their concepts in genuine, unposed discussions.",
    promptArchitecture: "A real end-of-cohort creative showcase in Nairobi, Kenya. Young Kenyan students presenting completed creative projects with printed posters and laptop presentations.",
    usedIn: [
      "ImpactPage - Hero Showcase Banner",
      "HomePage - Featured Track Spotlight"
    ]
  },

  // 10. Alumni Spotlight: Emerging Filmmaker
  {
    id: "featured-filmmaker",
    title: "Alumni Spotlight: Emerging Kenyan Filmmaker",
    category: "Stories & Alumni",
    discipline: "Directing & Cinematography",
    filename: "filmmaker_spotlight_1788763433234.jpg",
    relativePath: "src/assets/images/filmmaker_spotlight_1788763433234.jpg",
    link: featuredFilmmakerImg,
    alt: "Young Kenyan filmmaker operating cinema camera setup on location in Nairobi",
    aspectRatio: "16:9",
    description: "A young Kenyan filmmaker working independently during a real production in Nairobi. Operating a professional yet believable cinema camera setup on location, checking the monitor and adjusting the rig with tripod legs, cables, and gear bags arranged naturally around them in full concentration.",
    promptArchitecture: "A young Kenyan filmmaker working independently during a real production in Nairobi, operating a cinema camera rig on location in natural concentration.",
    usedIn: [
      "StoriesPage - Hero Featured Story",
      "HomePage - Graduate Spotlight"
    ]
  },

  // 11. Cinema Rigging & Production
  {
    id: "camera-film-set",
    title: "Cinema Rigging & Sound Stage Practical",
    category: "Media Production",
    discipline: "Film & Camera Operations",
    filename: "cinema_rigging_doc_1788763448366.jpg",
    relativePath: "src/assets/images/cinema_rigging_doc_1788763448366.jpg",
    link: cameraFilmSetImg,
    alt: "Production camera on tripod with trainees adjusting rig and monitoring audio",
    aspectRatio: "16:9",
    description: "A production camera mounted on a tripod during a practical filmmaking class in a modest Nairobi creative studio. A young Kenyan trainee adjusts the camera rig while another trainee checks an external monitor, with boom microphones, light stands, and cables visible in an active training environment.",
    promptArchitecture: "A production camera mounted on a tripod during a practical filmmaking class in a modest Nairobi creative studio, with trainees adjusting rig and checking monitor.",
    usedIn: [
      "ProgramsPage - Hero Header Media",
      "StoryVideoModal - Video Poster Teaser"
    ]
  },

  // 12. Mentorship Guidance
  {
    id: "mentor-guidance",
    title: "One-on-One Industry Mentor Guidance",
    category: "Mentorship",
    discipline: "Portfolio Mentorship",
    filename: "mentor_guidance_doc_1788763466076.jpg",
    relativePath: "src/assets/images/mentor_guidance_doc_1788763466076.jpg",
    link: mentorGuidanceImg,
    alt: "Kenyan creative mentor pointing at computer screen reviewing portfolio with student",
    aspectRatio: "3:4",
    description: "A Kenyan creative mentor sitting beside a young student at a computer in a modest Nairobi workspace. The mentor leans toward the screen and points at a specific part of a graphic design portfolio while the student listens and takes notes, captured quietly from an observational documentary angle.",
    promptArchitecture: "A Kenyan creative mentor sitting beside a young student at a computer in a modest Nairobi workspace, leaning toward the screen pointing at portfolio work.",
    usedIn: [
      "AboutPage - Team Section",
      "GetInvolvedPage - Mentorship Section"
    ]
  },

  // 13. Design Thinking & Group Collaboration Lab
  {
    id: "workshop-session",
    title: "Design Thinking & Group Collaboration Lab",
    category: "Workshops",
    discipline: "Design Thinking",
    filename: "design_thinking_doc_1788763480003.jpg",
    relativePath: "src/assets/images/design_thinking_doc_1788763480003.jpg",
    link: workshopSessionImg,
    alt: "Young Kenyan creatives collaborating around tables with sticky notes and sketches",
    aspectRatio: "4:3",
    description: "A group of young Kenyan creatives participating in a collaborative design-thinking workshop in Nairobi. They sit around ordinary work tables covered with notebooks, sticky notes, sketches, laptops, markers, and printed research material in an active, imperfect, and genuinely used space.",
    promptArchitecture: "A group of young Kenyan creatives participating in a collaborative design-thinking workshop in Nairobi around tables covered with notebooks and sticky notes.",
    usedIn: [
      "AboutPage - Historical Milestone Media"
    ]
  },

  // 14. Outdoor Photography Field Practice
  {
    id: "outdoor-photography",
    title: "Natural Light Field Photography Practice",
    category: "Photography",
    discipline: "Field Camera Handling",
    filename: "field_photo_practice_1788763494255.jpg",
    relativePath: "src/assets/images/field_photo_practice_1788763494255.jpg",
    link: outdoorPhotographyImg,
    alt: "Trainee photographer practicing focus and shutter speed handling outdoors in daylight",
    aspectRatio: "4:3",
    description: "A young Kenyan photography trainee practicing camera handling outdoors in Nairobi during daylight. Standing naturally while adjusting the focus ring and camera settings on a DSLR with a standard zoom lens, concentrating quietly on composition under realistic natural light.",
    promptArchitecture: "A young Kenyan photography trainee practicing camera handling outdoors in Nairobi during daylight, adjusting focus ring and camera controls.",
    usedIn: [
      "ProgramsPage - Photography Curriculum Detail"
    ]
  },

  // 15. Audio Booth Space
  {
    id: "sound-audio-studio",
    title: "Acoustic Audio Booth & Mixing Console",
    category: "Audio & Music",
    discipline: "Sound Engineering",
    filename: "audio_booth_space_1788763508180.jpg",
    relativePath: "src/assets/images/audio_booth_space_1788763508180.jpg",
    link: soundAudioStudioImg,
    alt: "Modest community recording studio setup with audio interface, monitors, and headphones",
    aspectRatio: "16:9",
    description: "A realistic modest audio production workspace in Nairobi, Kenya. Shows a practical music and voice recording setup with a computer, small audio interface, mixing controls, studio headphones, two reference monitors, microphone, and acoustic panels arranged functionally with no luxury pretense.",
    promptArchitecture: "A realistic modest audio production workspace in Nairobi, Kenya with computer, audio interface, studio headphones, reference monitors, and microphone.",
    usedIn: [
      "ProgramsPage - Audio Track Syllabus"
    ]
  },

  // 16. Motion & 3D Animation Workspace
  {
    id: "motion-3d-animation",
    title: "Motion Design & 3D Keyframe Workspace",
    category: "Animation",
    discipline: "3D & Motion Graphics",
    filename: "motion_3d_workspace_1788763523066.jpg",
    relativePath: "src/assets/images/motion_3d_workspace_1788763523066.jpg",
    link: motion3dAnimationImg,
    alt: "Animation workstation showing 3D viewport, timeline keyframes, and stylus on desk",
    aspectRatio: "16:9",
    description: "A realistic animation workstation inside a modest Nairobi digital creative lab. A computer monitor displays a believable 3D viewport with timeline and keyframe controls. A drawing tablet, stylus, keyboard, headphones, and cables sit naturally on the desk during an ordinary training session.",
    promptArchitecture: "A realistic animation workstation inside a modest Nairobi digital creative lab displaying a believable 3D viewport with timeline and keyframe controls.",
    usedIn: [
      "ProgramsPage - Animation Syllabus Detail"
    ]
  },

  // 17. User Journey Mapping & Wireframe Testing
  {
    id: "ui-ux-wireframing",
    title: "User Journey Mapping & Wireframe Testing",
    category: "Product Design",
    discipline: "UI / UX Research",
    filename: "uiux_wireframe_doc_1788763539885.jpg",
    relativePath: "src/assets/images/uiux_wireframe_doc_1788763539885.jpg",
    link: uiUxWireframingImg,
    alt: "Trainees reviewing user journey sketches, sticky notes, and mobile prototype on table",
    aspectRatio: "16:9",
    description: "Young Kenyan UX design trainees collaborating around a table during a practical product design session in Nairobi. Paper wireframes, sticky notes, user journey sketches, smartphones, and notebooks are spread naturally as participants discuss real design ergonomics.",
    promptArchitecture: "Young Kenyan UX design trainees collaborating around a table during a practical product design session in Nairobi with paper wireframes and smartphone prototype.",
    usedIn: [
      "ProgramsPage - UI/UX Syllabus Detail"
    ]
  },

  // 18. Creative Workshop Studio Overview
  {
    id: "creative-workshop",
    title: "Creative Workshop Studio Overview",
    category: "Studio Environment",
    filename: "workshop_overview_doc_1788763553237.jpg",
    relativePath: "src/assets/images/workshop_overview_doc_1788763553237.jpg",
    link: creativeWorkshopImg,
    alt: "Lived-in creative training studio in Nairobi with young creatives at work tables",
    aspectRatio: "4:3",
    description: "A natural documentary photograph of a modest creative training studio in Nairobi, Kenya. Several young creatives are working quietly and collaboratively at different tables with laptops, monitors, sketchbooks, cameras, and creative tools under natural daylight.",
    promptArchitecture: "A natural documentary photograph of a modest creative training studio in Nairobi, Kenya with young creatives working at tables under daylight.",
    usedIn: [
      "AboutPage - Hero Header Media"
    ]
  },

  // 19. Community Brand Overview
  {
    id: "kkf-brand-banner",
    title: "KKF Community Brand Overview",
    category: "Branding & Community",
    filename: "community_brand_doc_1788763567813.jpg",
    relativePath: "src/assets/images/community_brand_doc_1788763567813.jpg",
    link: brandBannerImg,
    alt: "Young Kenyan creatives collaborating in a multidisciplinary creative workshop",
    aspectRatio: "16:9",
    description: "A candid documentary photograph showing a diverse group of young Kenyan creatives collaborating during a multidisciplinary creative workshop in Nairobi. Natural, lively, and realistic atmosphere communicating community and creative possibility.",
    promptArchitecture: "A candid documentary photograph showing a diverse group of young Kenyan creatives collaborating during a multidisciplinary creative workshop in Nairobi.",
    usedIn: [
      "Archive & Brand Repository"
    ]
  },

  // 20. Environmental Portrait: Executive Director
  {
    id: "founder-portrait",
    title: "Leadership: Ian Nyatindo (Executive Director)",
    category: "Leadership",
    discipline: "Executive Leadership",
    filename: "director_portrait_doc_1788763585221.jpg",
    relativePath: "src/assets/images/director_portrait_doc_1788763585221.jpg",
    link: founderPortraitImg,
    alt: "Environmental portrait of Ian Nyatindo, Executive Director, inside creative workspace",
    aspectRatio: "1:1",
    description: "Natural environmental portrait of Kenyan nonprofit creative-education leader inside a real creative workspace in Nairobi. The subject is dressed casually and professionally, standing near a working studio with laptops, printed work, and natural window light, reflecting approachable leadership.",
    promptArchitecture: "Natural environmental portrait of a Kenyan nonprofit creative-education leader inside a real creative workspace in Nairobi with calm, approachable expression.",
    usedIn: [
      "AboutPage - Leadership Team (Ian Nyatindo)"
    ]
  },

  // 21. Environmental Portrait: Lead Curriculum Director
  {
    id: "lead-curriculum",
    title: "Leadership: Achieng Omondi (Lead Curriculum)",
    category: "Leadership",
    discipline: "Pedagogy & Curriculum",
    filename: "curriculum_lead_doc_1788763599419.jpg",
    relativePath: "src/assets/images/curriculum_lead_doc_1788763599419.jpg",
    link: leadCurriculumImg,
    alt: "Environmental portrait of Achieng Omondi, Lead Curriculum Director, reviewing learning notes",
    aspectRatio: "1:1",
    description: "Natural environmental portrait of a Kenyan woman working as a creative education and curriculum leader inside a modest Nairobi creative learning environment. She is reviewing curriculum notes and student work with natural window light and an authentic, engaged expression.",
    promptArchitecture: "Natural environmental portrait of a Kenyan woman working as a creative education leader inside a modest Nairobi creative learning environment reviewing notes.",
    usedIn: [
      "AboutPage - Leadership Team (Achieng Omondi)"
    ]
  },

  // 22. Environmental Portrait: Head of Partnerships & Placements
  {
    id: "head-partnerships",
    title: "Leadership: Brian Mwangi (Head of Partnerships)",
    category: "Leadership",
    discipline: "Industry Linkages & Placements",
    filename: "partnerships_doc_1788763613248.jpg",
    relativePath: "src/assets/images/partnerships_doc_1788763613248.jpg",
    link: headPartnershipsImg,
    alt: "Environmental portrait of Brian Mwangi, Head of Partnerships, inside studio workspace",
    aspectRatio: "1:1",
    description: "Natural environmental portrait of a Kenyan man working in partnerships and creative industry development inside a real Nairobi creative workspace. Casually reviewing documents with active studio workspace details in the background under natural available light.",
    promptArchitecture: "Natural environmental portrait of a Kenyan man working in partnerships and creative industry development inside a real Nairobi creative workspace.",
    usedIn: [
      "AboutPage - Leadership Team (Brian Mwangi)"
    ]
  }
];

export default IMAGE_CATALOG;

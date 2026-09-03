# Kijana Kreatives Foundation (KKF), Website PRD

**Version:** 1.0 · September 2026
**Purpose of this document:** a complete build brief for an AI web builder or developer to reproduce and extend the KKF marketing site. It specifies every page, section, content string, interaction and asset requirement. A companion `architecture.md` covers the technical structure.

---

## 1. Product summary

KKF is a Kenyan non-profit (founded 2021, Nairobi) that equips young people with creative and digital skills, mentorship and pathways into paid creative work. The website is a marketing and conversion site: it explains the mission, showcases programs and outcomes, and drives four conversions, apply to a program, become a mentor/volunteer, partner, donate.

**Positioning line:** "Your Talent Can Build Your Future."

**Tone:** direct, warm, unsentimental. Short declarative sentences. No charity-appeal pity framing, the audience already has ability; KKF supplies access.

---

## 2. Audiences and primary jobs

| Audience | What they need | Primary CTA |
|---|---|---|
| Young creatives (16–30, Kenya) | Know what programs exist, whether they qualify, how to join | Explore Programs → Apply |
| Donors / individual supporters | Understand impact, see where money goes, give confidently | Donate |
| Corporate & NGO partners | Credibility, reach, proof of outcomes | Partner With Us |
| Mentors & volunteers | Time commitment, how to sign up | Become a Mentor |
| Press / grant reviewers | Facts, numbers, reports, leadership | Impact, Annual Reports |

---

## 3. Site map

```
Home (KKF Homepage)
├── About
├── Programs
├── Impact
├── Stories
├── Get Involved
├── Resources          (blog + events + newsletter)
└── Donate
```

Shared: global **Nav** (fixed) and **Footer** on every page.

---

## 4. Global components

### 4.1 Navigation
- Fixed to top, full width, height **84px.** z-index 200.
- Transparent over the hero on load; a solid `#0F172A` backdrop fades in as the user scrolls (opacity = `min(1, scrollY / 160)`).
- Left: logo mark (favicon.png, 42px, rounded 11px, white plate) + wordmark "KKF" (Poppins 600, 19px, white).
- Links (Inter 500, 14.5px, `rgba(255,255,255,0.82)`, hover white): Home · About · **Programs ▾** · Impact · Stories · Get Involved · Resources.
- Right: "Donate" button, amber `#F59E0B`, dark text, 12px radius.
- **Programs mega-menu** (hover, desktop only): 740px white panel, 3 columns, 20px radius, soft shadow.
  - *Creative Academy:* Graphic Design, Photography, Videography, Animation, Motion Graphics, Music Production
  - *Digital Academy:* Web Design, UI/UX, AI for Creatives, Digital Marketing
  - *Opportunities* (amber heading): Mentorship, Internship, Creative Challenges, Scholarships
- **Breakpoint 1000px.** Below it: hamburger (46px square, bordered) + compact Donate button. Tapping the hamburger opens a full-screen dark panel below the bar with the seven links at Poppins 600 / 24px, 16px vertical padding, hairline dividers, and a full-width Donate button at the bottom. Menu closes automatically if the viewport widens past the breakpoint.

### 4.2 Footer
Dark `#0F172A`. Columns: brand blurb + logo; quick links; programs; contact. Contact values are **placeholders to be replaced**: `hello@kijanakreatives.org`, `+254 700 000 000`, WhatsApp link, "Nairobi, Kenya". Bottom bar: copyright, social links.

---

## 5. Page specifications

### 5.1 Home

Sections in order:

1. **Hero.** dark, ~190px top padding. Eyebrow rule + "Kijana Kreatives Foundation" in amber. H1: *"Your Talent Can Build Your **Future.**"* (Future in amber). Sub: "We equip young people with creative and digital skills, mentorship and opportunities to turn their ideas into careers." Three CTAs: Explore Our Programs (blue solid) · Support Our Mission (ghost) · Watch Our Story → (text). Full-bleed background photo required, overlaid with a left-to-right dark gradient. Content animates in with a 0.9s rise.
2. **Floating impact cards.** four white cards overlapping the hero by −96px, numbered 01–04: Youth Empowerment / Creative Skills / Mentorship / Career Opportunities. Lift on hover.
3. **About.** asymmetric photo mosaic (3 photos + a blue "2021 · Founded in Nairobi, Kenya" tile) beside "Who We Are" / *"Creativity is more than talent. It's an opportunity."* Two paragraphs + "Discover KKF →".
4. **Journey.** "From Talent to Opportunity". Four column-divided steps: 01 Discover, 02 Learn, 03 Create, 04 Launch (numerals alternate blue/amber).
5. **Programs.** dark band, "What We Do" / "Six pathways into the creative economy". Six cards, each photo + title + one-line description + "Explore Program →": Graphic Design; Photography & Videography; Animation & Motion Graphics; Music Production; Web & UI/UX Design; AI for Creatives.
6. **Featured program.** tall image + "KKF Creative Academy" / "Learn. Create. Build." Four checkmarks: Practical learning, Industry mentors, Portfolio development, Career preparation. CTA "Join the Academy".
7. **Impact stats.** blue `#2563EB` band, five figures separated by hairlines. Numbers **count up** once the band scrolls into view (IntersectionObserver, 0.35 threshold, 1.6s cubic ease-out; suffix "+" appears only at completion). Values: 1,000+ Young People Reached · 100+ Creative Projects · 50+ Mentors & Professionals · 20+ Community Partnerships · 10+ Counties Reached (last one in amber).
8. **Why We Exist.** three grey cards: Access / Practice / Opportunity.
9. **Community.** dark. "You Don't Have to Create Alone." + three pills (Create, Collaborate, Connect) and a staggered 2×2 photo grid.
10. **Success stories.** three quote cards with avatar, name, role · town (Amina W. Brian O. Faith N.). Link to Stories.
11. **Creative of the Month.** editorial portrait + placeholder name/bio.
12. **What's Coming Up.** three event cards: Creative Bootcamp (Sept 2026, Nairobi, Training) · Youth Design Challenge (Oct 2026, Online + Nairobi, Challenge) · KKF Creative Festival (Dec 2026, Nairobi, Festival).
13. **Partners.** "Building Together" + six greyscale logo slots that colourise on hover.
14. **Get Involved.** four cards: Become a Mentor, Volunteer, Partner With Us, and a dark "Support a Creative" card linking to Donate.
15. **Donation CTA.** dark full-width. *"A Young Creator Needs More Than **Talent.**"* Two buttons: Donate Today (amber) · Sponsor a Program (ghost).
16. **Blog.** "Ideas, Stories & Inspiration", three post cards with category, title, excerpt, date, Read More.
17. **Newsletter.** grey band, "Stay Connected" + email field and Subscribe button.
18. Footer.

**Optional sticky mobile bar** (off by default): fixed bottom dark bar with "Join" and "Donate".

### 5.2 About
Dark page hero: "A foundation built around young Kenyan talent." Then: Our Story (two paragraphs, "It started with a group of young creatives and borrowed equipment"); Why We Exist (Access/Practice/Opportunity); Our Values (four column-divided values); Leadership (team/board cards, names, roles and portraits are placeholders); Timeline (year → milestone rows); dark CTA "Learn. Create. Connect."

### 5.3 Programs
Hero: "Pick the craft. We'll help you get paid for it." Sub: every program is project-based, mentor-supported, ends in portfolio work.
- **Category filter** (client-side): All / Creative / Digital / Opportunities. Filtering re-renders the card grid; no page reload.
- Program cards mirror the six on the homepage plus digital-academy tracks.
- "How a cohort works", Learn. Create. Build. with a feature checklist and apply CTA.

### 5.4 Impact
Hero: "What the work has added up to." Disclaimer: figures are placeholders until the reporting cycle closes; each number ties to a program record.
Sections: animated stat band; **Where we work** (Nairobi + county chips); **Outcomes** cards; **Annual reports** list with a link to Resources; dark CTA "Help us reach the next cohort."

### 5.5 Stories
Hero: "Real People. Real Creative Journeys." Creative of the Month feature; **Journeys** grid (data-driven list of six story cards: quote, name, discipline, town); dark CTA "Your story could be next."

### 5.6 Get Involved
Hero: "Four ways in. Pick yours." Four route cards (Youth applicant / Mentor / Volunteer / Partner).
**Apply** section with **tabbed forms** (Mentor · Volunteer · Youth). Forms are illustrative only, no submission handling is wired. Rolling review noted in copy. Closing dark CTA "Support a creative instead" → Donate.

### 5.7 Resources
Hero: "Ideas, Stories & Inspiration." Blog grid with category chips; Events cards (same three as home); newsletter band.

### 5.8 Donate
Hero: "A Young Creator Needs More Than Talent."
- **Give type toggle:** One-time / Monthly.
- **Preset amounts** (KES) as selectable chips + custom amount field.
- Each amount states what it funds.
- **Where it goes.** allocation rows (category → share/description).
- No payment processor is connected; the submit action is a stub.

---

## 6. Design system

**Colour**
| Token | Hex | Use |
|---|---|---|
| Ink | `#0F172A` | Dark sections, footer, nav backdrop, body text |
| Blue | `#2563EB` | Primary action, eyebrows, links |
| Amber | `#F59E0B` | Accent, donate, highlighted words |
| Slate 600 | `#475569` | Body copy on light |
| Slate 500 | `#64748B` | Secondary copy |
| Slate 400 | `#94A3B8` | Meta text |
| Mist | `#F8FAFC` | Alternating light section background |
| Hairline | `#E2E8F0` / `#E8EDF4` | Dividers, card borders |
| White | `#FFFFFF` | Cards, base background |
| Card dark | `#16223A` | Cards inside dark sections |

**Type.** Poppins (500/600/700) for headings, eyebrows, buttons; Inter (400/500/600) for body. Both from Google Fonts.
- H1 `clamp(36px, 5.6vw, 60px)` / line-height 1.08 / letter-spacing −0.03em (home hero goes to 76px)
- H2 `clamp(30px, 4.6vw, 46px)` / −0.025em
- H3 21–22px / 600
- Body 15–18.5px / line-height 1.6–1.72
- Eyebrow 12.5px / 600 / uppercase / letter-spacing 0.16em

**Layout.** content max-width 1240px, 24px gutters. Section padding `clamp(66px, 9vw, 130px)`. Grids use `repeat(auto-fit, minmax(Npx, 1fr))` so they reflow without media queries; the only JS breakpoint is the nav at 1000px.

**Shape & motion.** radii 11–30px (cards 24–28px, buttons 12–13px). Card hover: `translateY(-6px)` over 0.3s, shadow deepens. Hero content: 0.9s rise-in. Stat count-up: 1.6s cubic ease-out, once.

**Rhythm rule.** never two consecutive sections with the same background. Cycle white → mist `#F8FAFC` → ink `#0F172A`, with one blue band per page maximum.

---

## 7. Imagery, outstanding work

**Every image on the site is currently a labelled striped placeholder.** Each placeholder carries a monospace caption describing the required shot. Replacing them is the single largest remaining task.

Required photography:
- Hero: young Kenyan creatives in a studio, cameras, laptops, tablets (wide, landscape, room for left-side text)
- Program cards ×6: designer at laptop, camera operator, animation workstation, studio recording, UI design session, creative using AI tools
- About mosaic: design workshop, camera on set, mentor and student
- Community grid ×4: workshop, film shoot, group discussion, mentorship
- Creative Academy wide classroom shot
- Featured creative editorial portrait
- Story avatars ×6 (square, cropped round)
- Blog article images ×3
- Partner logos ×6 (SVG/PNG on transparent)
- Team and board portraits (About)

**Style direction:** natural light, real workspaces, subjects working rather than posed, warm mid-tones that sit with the amber accent. Dark-section images should tolerate a `#0F172A` gradient overlay at 40–95% without losing the subject.

---

## 8. Content still to supply
- Real impact figures and reporting period
- Leadership names, roles, portraits, bios
- Real story subjects (currently Amina W. / Brian O. / Faith N. placeholders) with consent
- Featured creative of the month
- Partner names and logos
- Contact email, phone, WhatsApp, physical address
- Annual report PDFs
- Registration/charity number and legal footer text

## 9. Not yet built
- Form submission handling (Get Involved, newsletter), currently inert
- Payment processing (Donate), M-Pesa, card and PayPal are named in copy but not wired
- CMS for blog and events
- Analytics, SEO metadata beyond title/favicon
- Accessibility audit (contrast pass, focus rings, reduced-motion handling for the count-up and hero animation)

## 10. Acceptance criteria
1. All eight pages render with the shared nav and footer, and every internal link resolves.
2. Nav backdrop fades in on scroll; mega-menu opens on hover ≥1000px; hamburger panel works <1000px and closes on resize.
3. Impact numbers animate exactly once on first scroll into view and finish at their target values with the "+" suffix.
4. Programs filter, Get Involved tabs and Donate amount selection all work client-side with no reload.
5. No horizontal scroll at 320px, 768px, 1024px, 1440px, 1920px.
6. Every image placeholder is either replaced with a real asset or clearly labelled with its required subject.
7. Buttons, links and inputs have visible hover and focus states.

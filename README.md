# Kijana Kreatives Foundation — Website

Marketing and conversion site for Kijana Kreatives Foundation (KKF), a Kenyan non-profit founded in Nairobi in 2021 that equips young people with creative and digital skills, mentorship and pathways into paid creative work.

**Positioning:** Your Talent Can Build Your Future.

---

## Status

Working prototype. All pages build and render; nav and footer are shared and responsive; all internal links resolve.

**Not production-ready.** No forms submit, no payments are connected, and every image is a labelled placeholder. See [Before launch](#before-launch).

---

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `KKF Homepage.dc.html` | Overview and entry to all four conversions |
| About | `KKF About.dc.html` | Story, values, leadership, timeline |
| Programs | `KKF Programs.dc.html` | Twelve program tracks, filterable by category |
| Impact | `KKF Impact.dc.html` | Figures, counties, outcomes, annual reports |
| Stories | `KKF Stories.dc.html` | Alumni journeys, Creative of the Month |
| Get Involved | `KKF Get Involved.dc.html` | Youth, mentor, volunteer and partner routes + forms |
| Resources | `KKF Resources.dc.html` | Blog, events, newsletter |
| Donate | `KKF Donate.dc.html` | One-time and monthly giving |

Shared: `KKF-Nav.dc.html`, `KKF-Footer.dc.html`. Brand mark: `favicon.png`.

---

## Documentation

Read in this order:

| File | What it covers |
|---|---|
| **`prd.md`** | Product brief — audiences, site map, section-by-section specs, design system, acceptance criteria |
| **`architecture.md`** | Current file structure and state model; Next.js + Tailwind rebuild plan |
| **`content.md`** | Every heading, paragraph, button label and form field, verbatim. Copy is not to be paraphrased. |
| **`design-tokens.md`** | Colour, type scale, spacing, radii, elevation, motion, component specs, `tokens.json` |
| **`assets-manifest.md`** | Photography shot list, naming convention, dimensions, alt-text rules, delivery checklist |
| **`data-schema.md`** | Content types, form payloads, validation rules, donation flow contract, privacy requirements |
| **`audit-prompt.md`** | Brief for an AI builder to walk the site as four user personas, deduplicate sections, strip AI-generated tells, and run functional and security tests |

---

## Running it

No build step, no dependencies, no server. Open any `.dc.html` file in a browser. Fonts (Poppins, Inter) load from Google Fonts; everything else is local.

Navigation between pages uses relative links with URL-encoded filenames.

---

## How it's built

Single self-contained file per page. **All styling is inline** — no stylesheets, no CSS classes, no framework. The only global CSS per page is a small head block: body reset, link colours, and one keyframe for the hero entrance.

Layout is fluid-first: grids use `repeat(auto-fit, minmax(N, 1fr))` and type scales with `clamp()`, so there is exactly one JS-driven breakpoint in the whole site — the nav at 1000px — and no CSS media queries.

### Interactivity

| Where | What |
|---|---|
| Nav | Backdrop opacity tracks scroll (`min(1, scrollY/160)`); Programs mega-menu on hover; hamburger panel below 1000px |
| Home, Impact | Stat count-up on first scroll into view (IntersectionObserver, 1.6s) |
| Programs | Client-side category filter |
| Get Involved | Tabbed application forms |
| Donate | One-time/monthly toggle, preset and custom amounts |

No server, no data layer, no persistence. All state is local.

### Design tokens

Ink `#0F172A` · Blue `#2563EB` · Amber `#F59E0B` · Mist `#F8FAFC`
Poppins (display) · Inter (body) · 1240px shell · 24px gutters

Full set in `design-tokens.md`.

---

## Before launch

### Blocking

1. **Forms don't submit.** Wire the endpoints in `data-schema.md` §2, or state plainly that applications are by email and give the address.
2. **Donate takes no money.** The page names M-Pesa, card, bank transfer and international; nothing is connected. A form that looks like it accepts payment and doesn't is worse than no form. Either connect a provider or say it isn't live yet.
3. **Minors' data.** The youth application accepts ages from 14 with no guardian-consent fields. Add them, or raise the minimum to 18. Kenya's Data Protection Act 2019 applies to everything this site collects.
4. **Every image is a placeholder.** See `assets-manifest.md` for the shot list. Do not substitute generic stock photography.
5. **All statistics are unsourced.** 1,000+ · 100+ · 50+ · 20+ · 10+ · 62% · 140 · 1,200. Attach a real reporting period or delete them.
6. **Contact details are fake.** `hello@kijanakreatives.org` and `+254 700 000 000` are placeholders.

### Content KKF must supply

Impact figures and reporting period · leadership names, roles, portraits, bios · real alumni stories with signed consent · featured creative of the month · partner names and logo permissions · contact email, phone, WhatsApp, address · social URLs · annual report PDFs · charity registration number · privacy policy and terms.

### Technical

- Visible focus states on form inputs (currently `outline: none` with no replacement)
- `prefers-reduced-motion` guards on the hero entrance and count-up
- `aria-expanded` / `aria-controls` and a focus trap on the mobile menu
- Keyboard access to the Programs mega-menu (hover-only today)
- Contrast: `#94A3B8` on white fails for body-size text
- Footer link touch targets are ~37px, below the 44px minimum
- Per-page titles, meta descriptions, OG tags, sitemap, robots.txt
- Self-host Poppins and Inter as woff2 subsets
- Security headers, rate limiting, CSRF, spam protection — `audit-prompt.md` Part 5

---

## Known issues

- The homepage runs to eighteen sections, many of which restate each other. `audit-prompt.md` §2.1 is a deduplication pass that cuts it to roughly eight.
- `KKF-Footer copy.dc.html` and `KKF-Footer copy copy.dc.html` are stray duplicates. Delete them; only `KKF-Footer.dc.html` is imported.
- Copy references PayPal in one place and bank transfer in another. Reconcile to the providers actually contracted.

---

## Rebuilding elsewhere

`architecture.md` §4 has a full Next.js App Router + Tailwind plan: route mapping, component list, content modules, and the token config. `content.md` doubles as the seed dataset so a rebuild renders identically before any CMS is connected.

Handing this to another builder: give it `prd.md`, `content.md`, `design-tokens.md`, `assets-manifest.md` and `data-schema.md` together. Auditing what exists instead: give it `audit-prompt.md`.

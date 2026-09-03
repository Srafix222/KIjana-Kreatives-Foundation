# Kijana Kreatives Foundation

The website for Kijana Kreatives Foundation (KKF), a non-profit founded in Nairobi in 2021 that equips young people with creative and digital skills, mentorship and pathways into paid creative work.

**Your Talent Can Build Your Future.**

---

## What the site does

Eight pages, built around four things a visitor might want to do: join a program, give money, offer time as a mentor or volunteer, or partner with KKF as an organisation.

| Page | What's on it |
|---|---|
| **Home** | Who KKF is, the six main programs, impact figures, alumni stories, and routes into all four actions |
| **About** | The story from 2021, why the organisation exists, values, leadership, and a year-by-year timeline |
| **Programs** | Twelve tracks across Creative, Digital, Business and Opportunities, filterable by category, with duration, level, location and cohort dates |
| **Impact** | Figures, the ten counties reached, outcomes, and annual reports |
| **Stories** | Alumni journeys in their own words, plus a Creative of the Month feature |
| **Get Involved** | Four routes in (youth, mentor, volunteer, partner) with application forms |
| **Resources** | Blog posts, upcoming events, newsletter signup |
| **Donate** | One-time and monthly giving, preset amounts, and where the money goes |

Every page shares the same navigation and footer.

---

## The programs

**Creative:** Graphic Design · Photography & Videography · Animation & Motion Graphics · Music Production
**Digital:** Web & UI/UX Design · AI for Creatives · Digital Marketing
**Business:** Creative Business
**Opportunities:** Mentorship Track · Internship Placement · Creative Challenges · Scholarships

Cohorts are project-based and mentor-supported, and end with portfolio work.

---

## Look and feel

Dark navy `#0F172A` with blue `#2563EB` for actions and amber `#F59E0B` for emphasis. Poppins for headings, Inter for body text. Generous whitespace, large type, photography-led.

Sections alternate between white, pale grey and dark navy so no two consecutive bands look the same.

---

## How to open it

No installation and no server. Open any of the `.dc.html` files in a browser and the site works, with links moving between pages as normal.

Start with `KKF Homepage.dc.html`.

---

## Editing it

Text and colours can be changed directly in the editor by clicking on them.

For anything structural, the files are:

```
KKF Homepage.dc.html      Home
KKF About.dc.html         About
KKF Programs.dc.html      Programs
KKF Impact.dc.html        Impact
KKF Stories.dc.html       Stories
KKF Get Involved.dc.html  Get Involved
KKF Resources.dc.html     Resources
KKF Donate.dc.html        Donate
KKF-Nav.dc.html           Navigation, shared by every page
KKF-Footer.dc.html        Footer, shared by every page
favicon.png               Brand mark, used in the nav, footer and browser tab
```

Editing the nav or footer changes it everywhere at once.

---

## What isn't finished

Three things stop this going live today.

**The photography.** Every image is a striped placeholder with a caption naming the shot it needs. `assets-manifest.md` lists all of them with dimensions.

**The forms.** Application and newsletter forms look complete but don't send anywhere yet. Either connect them or replace them with an email address.

**The donations.** The Donate page names M-Pesa, card, bank transfer and international giving, but no payment provider is connected. It should not go live looking like it accepts money until it does.

Also needed from KKF before launch: real impact figures and a reporting period, leadership names and portraits, alumni stories with signed consent, partner names and logo permissions, a real contact email and phone number, social media links, annual report PDFs, the charity registration number, and a privacy policy.

Two points that matter legally: the youth application currently accepts applicants from age 14 with no guardian consent fields, and Kenya's Data Protection Act 2019 applies to everything the forms collect.

---

## The other files

`content.md` holds all site copy in one place. `design-tokens.md` holds the colours, type sizes and spacing. `assets-manifest.md` is the photography shot list. `data-schema.md` covers the forms and donation flow. `architecture.md` explains how the site is put together. `audit-prompt.md` is a brief for reviewing and tightening the site.


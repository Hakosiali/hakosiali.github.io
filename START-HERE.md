# 🚀 AIGuideDZ — Launch & Monetization Guide

Your site is ready. This file tells you exactly how to get it online and earning, in order.

## What's in this folder

```
aiguidedz/
├── index.html                  Homepage
├── guides.html                 All Guides index with live search & topic filters
├── 404.html                    Not-found page (served automatically by Netlify/CF Pages)
├── about.html                  About page (required for AdSense trust)
├── contact.html                Contact page (required for AdSense trust)
├── privacy-policy.html         Privacy policy (REQUIRED for AdSense)
├── affiliate-disclosure.html   Affiliate disclosure (REQUIRED for Amazon Associates)
├── robots.txt                  Search engine rules
├── sitemap.xml                 Sitemap for Google (all 30+ URLs)
├── assets/og-image.png         Social share image (1200×630)
├── assets/aiguidedz-prompt-cheatsheet.pdf   Lead-magnet PDF (50+ prompts)
├── free-prompt-cheatsheet.html Lead-magnet landing page (email-gated PDF download)
├── thank-you-cheatsheet.html   Download page the email service redirects to after signup
├── css/style.css               All styling
├── js/lang.js                  Language switcher
├── js/analytics.js             Analytics loader (Cloudflare/GA4 — one line to activate)
├── js/newsletter.js            Newsletter + lead-magnet form connector
├── fr/ ar/ es/                 French, Arabic & Spanish translations (top 4 articles)
└── articles/                   29 English articles, each with 3 AdSense ad slots,
                                 BreadcrumbList schema, and FAQPage schema where relevant
```

## Step 1 — Get the domain (~$10/year)

Buy **aiguidedz.com** (or your preferred name) at Namecheap, Porkbun, or Cloudflare Registrar
(Cloudflare is cheapest — at-cost pricing).

## Step 2 — Host it FREE

Best free options for a static site like this:

- **Cloudflare Pages** (recommended): free, fast worldwide, connects to your domain easily.
- **Netlify**: drag-and-drop this folder onto app.netlify.com — live in 60 seconds.
- **GitHub Pages**: free if you're comfortable with git.

Either way: upload this whole folder, point your domain at it, done. Total cost so far: ~$10/year.

## Step 3 — Get indexed by Google (day 1)

1. Go to **search.google.com/search-console** → add your domain.
2. Submit `https://yourdomain.com/sitemap.xml`.
3. Request indexing for the homepage and each article.

## Step 4 — Apply for monetization

### Google AdSense (main ad revenue)
- Apply at **adsense.google.com** AFTER the site is live on your domain.
- Requirements you already meet: original content ✅, privacy policy ✅, about/contact ✅, clean navigation ✅.
- What improves approval odds: you now have 29 articles — a solid base. Keep publishing
  1–2/week and wait 2–4 weeks after launch before applying. Thin/new sites get rejected;
  resubmitting is allowed.
- When approved: replace every `<div class="ad-slot">…</div>` in the HTML with your AdSense
  ad unit code, and add the AdSense site code to each page's `<head>`.
- Create an `ads.txt` file in the root with the line AdSense gives you
  (looks like: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`).

### Amazon Associates (affiliate revenue)
- Apply at **affiliate-program.amazon.com** once the site is live.
- IMPORTANT: you must make **3 qualifying sales within 180 days** or the account closes
  (you can reapply). So apply when you have some traffic, not on day 1.
- The "Check today's price on Amazon" buttons in the laptop and phone guides already
  point to live Amazon search URLs, so nothing is a dead click. When approved, swap
  them for your tagged product/search links (add `&tag=YOURTAG-20` or use SiteStripe).
- Keep `rel="sponsored"` on affiliate links (Google requirement) — it's already set.

### Software affiliate programs (often better than Amazon)
Apply directly — commissions are 20–40% recurring vs Amazon's ~3%:
- **Grammarly** (affiliate program via impact.com)
- **Canva** (Canva Affiliates)
- **ELSA Speak / Speak** (language app programs)
- **Web hosting** (Hostinger, Bluehost — high payouts if you write "how to start a blog" content)
- Check **impact.com**, **partnerstack.com**, **shareasale.com** — most SaaS programs live there.

## Step 4.5 — Turn on analytics (5 minutes, do this before traffic arrives)

Right now the site has no analytics, so you'd be flying blind. Fix it in one file:

1. Open `js/analytics.js`.
2. **Recommended: Cloudflare Web Analytics** — free, privacy-friendly, no cookie banner
   needed. Go to dash.cloudflare.com → Web Analytics → Add a site → copy the token →
   paste it into `CF_TOKEN = ""`.
3. Or use **Google Analytics 4** — analytics.google.com → create a property → copy the
   Measurement ID (`G-XXXXXXX`) → paste into `GA4_ID = ""`.
4. Redeploy. Every page on the site (all 4 languages) is instrumented automatically.

## Step 4.6 — Activate the lead magnet (the email list is your real asset)

The site includes a free "50+ AI Prompts Cheat Sheet" PDF used to capture email signups —
promoted inside the two prompt articles and living at `/free-prompt-cheatsheet.html`.

1. Finish Step 6's newsletter setup first (`NEWSLETTER_ACTION` in `js/newsletter.js`) —
   the same email list serves both the homepage newsletter and this cheat sheet.
2. In your email service's form/embed settings, set the **"redirect after submit" URL** to:
   `https://aiguidedz.com/thank-you-cheatsheet.html`
   That page has the actual download button — this is the standard way to gate a free
   download behind an email address on a static site with no backend.
3. Until you've done this, the download form politely says signup is "launching soon"
   and still hands visitors a direct download link — nothing is ever a dead click.
4. This is genuinely the highest-leverage thing you can add later: a niche site's email
   list is worth more than its ad revenue once it has a few hundred subscribers.

## Step 5 — Traffic plan (this is what actually makes money)

Realistic timeline: SEO takes 3–6 months to ramp. To earn sooner:

1. **Publish 2 articles/week.** Google rewards consistency. Target long-tail keywords:
   "best free AI tools for [specific field]", "[tool] vs [tool]", "how to use [tool] for [task]".
2. **Facebook groups & Reddit**: share genuinely helpful answers linking to your guides
   (student groups, AI communities). Don't spam — answer, then link.
3. **TikTok/YouTube Shorts/Instagram Reels**: 30-second versions of your articles
   ("3 free AI tools every student needs") with the site link in bio. This is the fastest
   free traffic channel in 2026.
4. **Pinterest**: create pins for each listicle — surprisingly strong for tool roundups.
5. **Newsletter**: connect the subscribe form to a free service (Brevo, MailerLite) —
   returning readers are what sponsors pay for later.

## Step 6 — Before you publish, personalize

- [x] Contact email set to sialihako@gmail.com in contact.html
- [ ] Update `https://aiguidedz.com` in every canonical/sitemap URL if you chose a different domain
- [ ] Connect the newsletter form: open `js/newsletter.js` and paste your form URL into
      `NEWSLETTER_ACTION = ""` (Brevo, MailerLite and Formspree all give you one).
      One edit connects the form on all four language homepages; until then it shows
      a polite "launching soon" message.
- [ ] Add a favicon (favicon.io generates one free)
- [ ] Re-verify article facts/prices before publishing — keep guides current; "Updated [month]" dates must be honest

## Revenue expectations (honest numbers)

- Months 1–3: ~$0. You're building content and index presence.
- Months 4–6: first AdSense dollars ($10–50/mo) if you hit ~5–10k visits/mo.
- Months 6–12: $100–500/mo is realistic with 30+ good articles and social traffic.
- Software affiliate commissions usually overtake AdSense once you rank for "best/vs" keywords.

The #1 predictor of success: **publishing consistently for 6+ months**. Sites that stop at
10 articles earn nothing; sites that reach 50+ articles in a focused niche almost always earn.

# INDU Foundation — Launch Checklist & Deployment Guide

> **Status:** Ready for Developer Actions
> **Domain:** Register `indu.dev` (preferred) or `indu-lang.org`
> **Deploy:** Cloudflare Pages (zero config, edge network, free for open source)

***

## What's Been Built

### ✅ Documents Created in This Workspace

| Document                                                                                                               | Description                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [INDU Foundation — Project Hub & Master Index](https://app.briefhq.ai/documents/5602dace-6167-40f4-802f-dcc6968b6276)  | Master sitemap, tech stack, all 200+ pages                  |
| [INDU Foundation — Brand Book (Complete)](https://app.briefhq.ai/documents/3a8e1f95-fb95-47b6-891d-1d327fbb2ba6)       | Logo SVGs, colors, typography, manifesto, taglines          |
| [INDU Foundation — SvelteKit Architecture Spec](https://app.briefhq.ai/documents/f924fc94-5187-464d-8b3d-9b6e656fe147) | Full file tree, schemas, package.json, svelte.config.js     |
| [INDU Foundation — Homepage Production Code](https://app.briefhq.ai/documents/e0e1d90a-23eb-4ecf-b5db-e8decd857a06)    | Complete +page.svelte with Three.js aurora, GSAP, preloader |
| [INDU Foundation — Global Components Code](https://app.briefhq.ai/documents/7b4a32d4-16d8-4deb-a824-f444313766cc)      | app.html, app.css, Nav.svelte, Footer.svelte, Hero3D.svelte |

***

## Step-by-Step Launch Plan

### Phase 1: Domain & Infrastructure (Day 1, \~1 hour)

```bash
# 1. Register domain
# Visit: namecheap.com, Cloudflare Registrar, or Porkbun
# Best available options (check in order):
# - indu.dev ← BEST for developer credibility
# - indu-lang.org ← alternative
# - getindu.dev ← fallback

# 2. Create Cloudflare account (free)
# Sign up at: dash.cloudflare.com
# Add your domain → configure DNS

# 3. Create Supabase project (free tier)
# Visit: supabase.com → New Project
# Save: project URL, anon key, service role key
```

### Phase 2: Repository Setup (Day 1, \~2 hours)

```bash
# Create GitHub org and repo
# github.com → New Organization → "indu-lang"
# Create repo: indu-lang/indu-website

# Initialize SvelteKit project
npm create svelte@latest indu-website -- \
  --template skeleton \
  --types typescript \
  --no-eslint \
  --no-prettier \
  --no-playwright \
  --no-vitest

cd indu-website

# Install all dependencies (from Architecture Spec)
npm install @supabase/supabase-js @supabase/ssr \
  three gsap resend zod shiki mdsvex \
  gray-matter @upstash/redis @upstash/ratelimit

npm install -D @sveltejs/adapter-cloudflare \
  @sveltejs/enhanced-img svelte@5 vite@5 \
  typescript svelte-check
```

### Phase 3: Copy All Code Files (Day 2, \~4 hours)

Copy from workspace documents into your project:

1. **`src/app.html`** → from Global Components Code doc
2. **`src/app.css`** → from Global Components Code doc
3. **`src/routes/+page.svelte`** → from Homepage Production Code doc
4. **`src/lib/components/Nav.svelte`** → from Global Components Code doc
5. **`src/lib/components/Hero3D.svelte`** → from Global Components Code doc
6. **`svelte.config.js`** → from Architecture Spec doc
7. **`wrangler.toml`** → from Architecture Spec doc
8. **`.env.example`** → from Architecture Spec doc

### Phase 4: Database Setup (Day 2, \~1 hour)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase login
supabase link --project-ref your-project-ref

# Run migrations (from DB Schema doc)
supabase db push

# Set up GitHub OAuth in Supabase Dashboard:
# Authentication → Providers → GitHub
# Add callback URL: https://indu.dev/auth/callback
```

### Phase 5: Deploy to Cloudflare Pages (Day 2, \~30 min)

```bash
# Connect repo to Cloudflare Pages
# Cloudflare Dashboard → Workers & Pages → Create application
# → Connect to Git → Select your repo

# Build settings:
# Framework preset: SvelteKit
# Build command: npm run build
# Build output directory: .svelte-kit/cloudflare

# Set environment variables in Cloudflare:
# (All variables from .env.example)
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# ... (all 25+ vars)

# First deployment triggers automatically on git push
git add . && git commit -m "feat: initial INDU Foundation website"
git push origin main
```

### Phase 6: DNS Configuration

```
# In Cloudflare DNS:
Type    Name    Value                    Proxy
A       @       192.0.2.1               ✓ (Cloudflare Pages will auto-configure)
CNAME   www     indu-website.pages.dev  ✓

# For subdomains (future):
CNAME   play    indu-website.pages.dev  ✓  (playground)
CNAME   docs    indu-website.pages.dev  ✓  (docs)
```

### Phase 7: Email Setup with Resend (\~1 hour)

```bash
# 1. Sign up at resend.com
# 2. Add and verify your domain (indu.dev)
# 3. Get API key → add to Cloudflare env vars
# 4. Configure DNS (Resend provides MX/TXT/CNAME records)

# Test newsletter subscription:
curl -X POST https://indu.dev/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

***

## Required API Keys Summary

| Service                  | Purpose           | Where to Get                                     |
| ------------------------ | ----------------- | ------------------------------------------------ |
| Supabase URL + Keys      | Database, Auth    | supabase.com → Project Settings → API            |
| GitHub OAuth             | Login with GitHub | github.com/settings/applications → New OAuth App |
| Resend API Key           | Email sending     | resend.com → API Keys                            |
| Algolia (optional)       | Docs search       | algolia.com → DocSearch for open source          |
| Upstash Redis (optional) | Rate limiting     | upstash.com                                      |
| Sentry DSN (optional)    | Error tracking    | sentry.io                                        |

***

## Performance Checklist

Before launch, verify:

* [ ] Lighthouse Desktop: LCP < 1.5s, CLS = 0, FID < 50ms

* [ ] Three.js canvas: `loading="lazy"` / browser check in Hero3D

* [ ] Mobile: hamburger menu works, hero scales properly

* [ ] Docs search: Cmd+K opens search modal

* [ ] Newsletter signup: form submits, success state shows

* [ ] Dark mode: only dark mode (by design — cosmic navy)

* [ ] SEO: sitemap.xml returns 200, robots.txt correct

* [ ] llms.txt: accessible at indu.dev/llms.txt

* [ ] OG images: all pages have og:image, og:title, og:description

* [ ] No console errors in production build

***

## Post-Launch: Community Building

### Week 1

* [ ] Post on Hacker News "Show HN: INDU — A Language Where `agent` is a Keyword"

* [ ] Submit to Lobste.rs

* [ ] Post on r/programming, r/rust (cross-paradigm comparison)

* [ ] Create @indu\_lang on Twitter/X

* [ ] Open GitHub org and make repos public

### Week 2

* [ ] Submit to product directories (ProductHunt, AlternativeTo)

* [ ] Reach out to 10 developer YouTubers with exclusive preview

* [ ] Publish first blog post: "Why We Built INDU"

* [ ] Announce Newsletter Issue #1

### Month 1

* [ ] Publish RFC #0001: Core Language Specification

* [ ] Open GitHub Discussions for community feedback

* [ ] Apply for Algolia DocSearch (free for open source)

* [ ] Submit to awesome-programming-languages lists

***

## Tech Stack Reference (Full)

```
Website: SvelteKit 2.x + Svelte 5 (Runes)
3D/Animation: Three.js r158+ GSAP 3.12+
Styling: CSS Custom Properties (no Tailwind)
Database: Supabase (Postgres 15 + Auth + Realtime)
Email: Resend
Deployment: Cloudflare Pages (edge, global)
Search: Algolia DocSearch (free for OSS)
Monitoring: Sentry + Cloudflare Analytics
Fonts: Space Grotesk + Inter + JetBrains Mono
Code highlighting: Shiki 1.x
Markdown: mdsvex 0.11+

Domain: indu.dev
GitHub: github.com/indu-lang
Discord: discord.gg/indu-lang
```

***

## Cost Estimate (Monthly, at launch scale)

| Service               | Free Tier                      | Paid (when needed)       |
| --------------------- | ------------------------------ | ------------------------ |
| Cloudflare Pages      | ✅ Free (unlimited builds)      | —                        |
| Supabase              | ✅ Free (500MB DB, 1GB storage) | \$25/mo (Pro)            |
| Resend                | ✅ Free (3K emails/mo)          | \$20/mo (50K emails)     |
| Algolia DocSearch     | ✅ Free (open source)           | —                        |
| Upstash Redis         | ✅ Free (10K commands/day)      | \$0.2/100K               |
| Sentry                | ✅ Free (5K errors/mo)          | \$26/mo                  |
| Domain (indu.dev)     | —                              | \~\$40/year              |
| **Total Launch Cost** | **\~\$0/mo**                   | **\$25-100/mo at scale** |

***

## The Vision: What INDU Foundation Becomes

```
Year 1 (2026): Language spec v1.0, compiler alpha, website live
Year 2 (2027): Package registry launch (500+ packages), 
               10K Discord members, first conference (INDUConf)
Year 3 (2028): 50K GitHub stars, 5K daily active developers,
               Foundation 501(c)(3) status, $2M in annual sponsorships
Year 5 (2030): INDU ships in production at 100+ companies,
               University curriculum adoption begins,
               NEXUS engine powers mainstream local AI apps
```


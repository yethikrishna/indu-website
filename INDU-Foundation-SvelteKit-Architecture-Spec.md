# INDU Foundation — SvelteKit Architecture Specification

> Production-ready technical architecture for the INDU Foundation website ecosystem.

---

## Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | SvelteKit | 2.x | SSR + SPA hybrid, excellent DX |
| UI Library | Svelte | 5.x (Runes) | Smallest runtime, native reactivity |
| 3D/WebGL | Three.js | r158+ | Industry standard, excellent docs |
| Animation | GSAP | 3.12+ | Best-in-class scroll animations |
| Styling | CSS Custom Properties | — | No framework needed, full control |
| Database | Supabase | — | Postgres + Auth + Realtime, open source |
| Email | Resend | — | Developer-first, React Email compat |
| Deployment | Cloudflare Pages | — | Edge network, zero cold starts |
| Search | Algolia DocSearch | — | Free for open source |
| Markdown | mdsvex | 0.11+ | Svelte in Markdown |
| Syntax | Shiki | 1.x | Best syntax highlighting |
| Validation | Zod | 3.x | TypeScript-first validation |

---

## Complete Project File Tree

```
indu-foundation/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Main CI/CD pipeline
│       └── docs-check.yml       # Broken link checker
├── src/
│   ├── app.html                 # Root HTML template
│   ├── app.css                  # Global CSS (custom properties, reset)
│   ├── app.d.ts                 # TypeScript declarations
│   ├── hooks.server.ts          # Supabase session management
│   ├── hooks.client.ts          # Client-side hooks (analytics init)
│   │
│   ├── lib/
│   │   ├── index.ts             # Re-exports
│   │   ├── types.ts             # All TypeScript types
│   │   ├── theme.ts             # Svelte 5 theme state
│   │   ├── utils.ts             # Utility functions
│   │   ├── constants.ts         # App-wide constants
│   │   │
│   │   ├── stores/
│   │   │   ├── auth.ts          # Auth state store (Svelte 5 $state)
│   │   │   ├── toast.ts         # Toast notification store
│   │   │   └── navigation.ts    # Navigation state
│   │   │
│   │   ├── server/
│   │   │   ├── supabase.ts      # Supabase server client
│   │   │   ├── resend.ts        # Resend email client
│   │   │   └── redis.ts         # Upstash Redis client (rate limiting)
│   │   │
│   │   ├── seo/
│   │   │   ├── meta.ts          # generateMeta() for each page type
│   │   │   └── schemas.ts       # JSON-LD schema generators
│   │   │
│   │   ├── docs/
│   │   │   ├── nav.ts           # Documentation navigation tree
│   │   │   └── loader.ts        # Markdown file loader utilities
│   │   │
│   │   ├── playground/
│   │   │   ├── indu-language.ts # Monaco language definition
│   │   │   ├── indu-theme.ts    # Monaco editor theme
│   │   │   ├── mock-interpreter.ts # Mock INDU runner
│   │   │   └── examples.ts     # 20 example programs
│   │   │
│   │   └── components/
│   │       ├── Nav.svelte           # Global navigation
│   │       ├── Footer.svelte        # Global footer
│   │       ├── Button.svelte        # Button component
│   │       ├── Card.svelte          # Feature card with 3D tilt
│   │       ├── Hero3D.svelte        # Three.js canvas component
│   │       ├── CodeBlock.svelte     # Syntax highlighted code
│   │       ├── DocSearch.svelte     # Cmd+K search modal
│   │       ├── NewsletterSignup.svelte  # Email signup form
│   │       ├── Toast.svelte         # Toast notifications
│   │       ├── Avatar.svelte        # User avatar component
│   │       ├── Badge.svelte         # Status/tier badges
│   │       ├── Prose.svelte         # Typographic prose wrapper
│   │       ├── FeatureCard.svelte   # Homepage feature cards
│   │       ├── StatCounter.svelte   # Animated counter
│   │       ├── CodeComparison.svelte # Side-by-side code diff
│   │       ├── Timeline.svelte      # Roadmap timeline
│   │       ├── SponsorGrid.svelte   # Sponsor logo grid
│   │       ├── ContributorCard.svelte # Contributor profile
│   │       └── OGImage.svelte       # Dynamic OG image generator
│   │
│   ├── routes/
│   │   ├── +layout.svelte       # Root layout (Nav + Footer)
│   │   ├── +layout.server.ts    # Root server load (session)
│   │   ├── +page.svelte         # Homepage (cinematic)
│   │   ├── +error.svelte        # Global error page
│   │   │
│   │   ├── about/
│   │   │   └── +page.svelte
│   │   │
│   │   ├── manifesto/
│   │   │   └── +page.svelte
│   │   │
│   │   ├── roadmap/
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.ts
│   │   │
│   │   ├── blog/
│   │   │   ├── +page.svelte         # Blog listing
│   │   │   ├── +page.server.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte     # Blog post
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── docs/
│   │   │   ├── +layout.svelte       # Docs layout (sidebar + TOC)
│   │   │   ├── +layout.server.ts
│   │   │   ├── +page.svelte         # Docs hub
│   │   │   └── [...slug]/
│   │   │       ├── +page.svelte     # Doc page
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── playground/
│   │   │   └── +page.svelte         # Online INDU editor
│   │   │
│   │   ├── tour/
│   │   │   └── +page.svelte         # Interactive language tour
│   │   │
│   │   ├── community/
│   │   │   ├── +page.svelte
│   │   │   ├── showcase/
│   │   │   │   └── +page.svelte
│   │   │   └── contributors/
│   │   │       └── +page.svelte
│   │   │
│   │   ├── sponsors/
│   │   │   └── +page.svelte
│   │   │
│   │   ├── packages/
│   │   │   ├── +page.svelte         # Package registry
│   │   │   └── [name]/
│   │   │       └── +page.svelte     # Package detail
│   │   │
│   │   ├── foundation/
│   │   │   ├── +page.svelte
│   │   │   ├── governance/
│   │   │   │   └── +page.svelte
│   │   │   ├── membership/
│   │   │   │   └── +page.svelte
│   │   │   ├── grants/
│   │   │   │   └── +page.svelte
│   │   │   ├── rfcs/
│   │   │   │   ├── +page.svelte     # RFC listing
│   │   │   │   └── [number]/
│   │   │   │       └── +page.svelte # RFC detail
│   │   │   └── coc/
│   │   │       └── +page.svelte
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── +page.svelte
│   │   │   └── callback/
│   │   │       └── +page.server.ts
│   │   │
│   │   ├── profile/
│   │   │   └── +page.svelte
│   │   │
│   │   └── api/
│   │       ├── newsletter/
│   │       │   └── +server.ts       # POST - subscribe to newsletter
│   │       ├── blog/
│   │       │   ├── +server.ts       # GET - blog posts
│   │       │   └── [slug]/
│   │       │       └── +server.ts   # GET - single post, POST - view count
│   │       ├── packages/
│   │       │   └── +server.ts       # GET - package search
│   │       └── og/
│   │           └── +server.ts       # GET - dynamic OG images
│   │
│   └── static/
│       ├── favicon.ico
│       ├── favicon.svg
│       ├── apple-touch-icon.png
│       ├── manifest.webmanifest
│       ├── robots.txt
│       ├── llms.txt
│       ├── security.txt
│       └── fonts/                   # Self-hosted font fallbacks
│
├── docs/                            # Markdown documentation content
│   ├── getting-started/
│   │   ├── installation.md
│   │   ├── hello-world.md
│   │   ├── variables.md
│   │   └── ...
│   ├── language/
│   │   ├── types.md
│   │   ├── agents.md
│   │   ├── sync-let.md
│   │   └── ...
│   ├── framework/
│   │   ├── routing.md
│   │   └── ...
│   └── cli/
│       └── reference.md
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_rls_policies.sql
│
├── svelte.config.js
├── vite.config.ts
├── wrangler.toml
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Supabase Schema Overview

### Tables

```sql
-- Users (auth.users extended)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  bio text,
  website text,
  location text,
  avatar_url text,
  github_username text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'contributor', 'maintainer', 'admin')),
  tier text NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'sustaining', 'professional', 'enterprise')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  author_id uuid REFERENCES public.profiles(id),
  published_at timestamptz,
  tags text[],
  hero_image_url text,
  read_time_minutes integer DEFAULT 5,
  views integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  confirmed boolean DEFAULT false,
  subscribed_at timestamptz DEFAULT now(),
  source text DEFAULT 'website'
);

-- Packages
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  latest_version text NOT NULL,
  description text,
  readme text,
  author_id uuid REFERENCES public.profiles(id),
  downloads_total integer DEFAULT 0,
  downloads_monthly integer DEFAULT 0,
  license text,
  repository_url text,
  tags text[],
  published_at timestamptz DEFAULT now()
);

-- RFCs
CREATE TABLE public.rfcs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer UNIQUE NOT NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'fcp', 'merged', 'postponed', 'withdrawn')),
  author_id uuid REFERENCES public.profiles(id),
  content text,
  discussion_url text,
  created_at timestamptz DEFAULT now()
);

-- Sponsors
CREATE TABLE public.sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'diamond')),
  website text,
  logo_url text,
  description text,
  start_date date NOT NULL,
  active boolean DEFAULT true
);
```

---

## Animation Architecture

### SSR-Safe Three.js Pattern

```typescript
// src/lib/components/Hero3D.svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let canvas: HTMLCanvasElement;

  onMount(async () => {
    if (!browser) return;

    // Dynamic import — only runs in browser
    const THREE = await import('three');
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    // ... rest of init
  });
</script>
```

### GSAP ScrollTrigger Pattern (SvelteKit)

```typescript
// Always use onMount + cleanup
onMount(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8 })
    });
  });

  return () => ctx.revert(); // Cleanup on destroy
});
```

---

## Environment Variables (.env.example)

```bash
# Supabase
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Auth (GitHub OAuth)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@indu.dev
NEWSLETTER_FROM_EMAIL=signal@indu.dev

# Search (Algolia)
PUBLIC_ALGOLIA_APP_ID=your-algolia-app-id
PUBLIC_ALGOLIA_SEARCH_KEY=your-search-only-key
ALGOLIA_ADMIN_KEY=your-admin-key
PUBLIC_ALGOLIA_INDEX_NAME=indu-docs

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Monitoring (Sentry)
PUBLIC_SENTRY_DSN=https://your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# Analytics (Cloudflare)
PUBLIC_CF_BEACON_TOKEN=your-beacon-token

# App
PUBLIC_APP_URL=https://indu.dev
PUBLIC_DISCORD_INVITE=https://discord.gg/indu-lang
PUBLIC_GITHUB_ORG=https://github.com/indu-lang

# Feature Flags
PUBLIC_ENABLE_PLAYGROUND=true
PUBLIC_ENABLE_PACKAGES=false
PUBLIC_MAINTENANCE_MODE=false
```

---

## package.json

```json
{
  "name": "indu-foundation",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "lint": "prettier --check . && eslint .",
    "format": "prettier --write .",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/ssr": "^0.1.0",
    "three": "^0.158.0",
    "gsap": "^3.12.2",
    "resend": "^2.0.0",
    "zod": "^3.22.0",
    "shiki": "^1.0.0",
    "mdsvex": "^0.11.0",
    "gray-matter": "^4.0.3",
    "marked": "^11.0.0",
    "@upstash/redis": "^1.25.0",
    "@upstash/ratelimit": "^1.0.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-cloudflare": "^4.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/enhanced-img": "^0.3.0",
    "svelte": "^5.0.0",
    "vite": "^5.0.0",
    "typescript": "^5.3.0",
    "svelte-check": "^3.6.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.56.0",
    "eslint-plugin-svelte": "^2.35.0",
    "prettier": "^3.1.0",
    "prettier-plugin-svelte": "^3.1.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0"
  }
}
```

---

## svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      remarkPlugins: [remarkGfm],
      highlight: {
        highlighter: async (code, lang) => {
          const { getHighlighter } = await import('shiki');
          const highlighter = await getHighlighter({
            themes: ['github-dark'],
            langs: [lang || 'text']
          });
          return highlighter.codeToHtml(code, {
            lang: lang || 'text',
            theme: 'github-dark'
          });
        }
      }
    })
  ],
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    alias: {
      '$components': './src/lib/components',
      '$stores': './src/lib/stores',
      '$server': './src/lib/server'
    }
  }
};

export default config;
```

---

## wrangler.toml

```toml
name = "indu-foundation"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

[[build.upload.rules]]
type = "ESModule"
globs = ["**/*.js"]

[site]
bucket = ".svelte-kit/cloudflare"

[vars]
PUBLIC_APP_URL = "https://indu.dev"
PUBLIC_ENABLE_PLAYGROUND = "true"
```

---

## Performance Strategy

### Core Web Vitals Targets
- **LCP:** < 1.2s (hero image preloaded, Three.js deferred)
- **FID/INP:** < 50ms (minimal main thread work on load)
- **CLS:** 0 (all dimensions declared, fonts preloaded)

### Code Splitting
```javascript
// Three.js — only load on pages that need it
const Hero3D = await import('$components/Hero3D.svelte');

// Monaco Editor — only in playground
const Monaco = await import('@monaco-editor/react');
```

### Image Optimization
```svelte
<!-- Use @sveltejs/enhanced-img -->
<enhanced:img src="./hero.png" alt="INDU Hero" sizes="100vw" />
```

<!--
SEO Keywords: INDU programming language, INDU website, SvelteKit marketing site, INDU foundation, programming language website, Cloudflare Pages, Svelte 5, GSAP animations, Three.js, mdsvex, Supabase, open source language
-->

<div align="center">

# indu-website

[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

**The official marketing website for the INDU programming language - built with SvelteKit 2, Svelte 5, Three.js 3D visuals, GSAP animations, and deployed on Cloudflare Pages.**

[INDU Foundation](https://github.com/yethikrishna/indu-foundation) · [Report Bug](https://github.com/yethikrishna/indu-website/issues) · [Contribute](https://github.com/yethikrishna/indu-website/blob/master/CONTRIBUTING.md)

</div>

---

## Overview

**indu-website** is the official marketing and documentation website for the INDU programming language, built by the INDU Foundation. It is a high-performance SvelteKit application featuring immersive 3D graphics via Three.js, smooth animations with GSAP, markdown-based documentation through MDSvex, code syntax highlighting with Shiki, and a Monaco editor for interactive code examples. The site is deployed on Cloudflare Pages via the Cloudflare adapter for global edge delivery.

## Features

- **Marketing Pages** - Beautiful landing pages for INDU language features and benefits
- **3D Visuals** - Three.js 3D scenes for engaging hero sections and demos
- **Smooth Animations** - GSAP-powered scroll animations and transitions
- **Documentation** - MDSvex-powered markdown documentation with GitHub-flavored markdown
- **Code Playground** - Monaco Editor integration for interactive INDU code examples
- **Syntax Highlighting** - Shiki for beautiful code blocks, highlight.js for content
- **Search** - Fuse.js fuzzy search for documentation and pages
- **Supabase Backend** - Supabase for data persistence and auth
- **Rate Limiting** - Upstash Redis for API rate limiting
- **Email** - Resend for contact forms and notifications
- **Edge Deployment** - Cloudflare Pages adapter for global edge delivery
- **Image Optimization** - @sveltejs/enhanced-img for optimized images
- **Type-Safe** - Full TypeScript with strict configuration

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | SvelteKit | 2.57.x |
| UI Library | Svelte | 5.55.x |
| Meta Framework | Vite | 8.0.x |
| Deployment | Cloudflare Pages (@sveltejs/adapter-cloudflare) | 7.x |
| 3D Graphics | Three.js | 0.184.x |
| Animation | GSAP | 3.15.x |
| Markdown | MDSvex + remark-gfm | 0.12.x / 4.x |
| Code Editor | Monaco Editor | 0.55.x |
| Syntax Highlighting | Shiki, highlight.js | 4.x / 11.x |
| Search | Fuse.js | 7.x |
| Backend | Supabase SSR + JS | 0.10.x / 2.x |
| Rate Limiting | Upstash Redis + Ratelimit | 1.x / 2.x |
| Email | Resend | 6.x |
| Validation | Zod | 4.x |
| Language | TypeScript | 6.0.x |

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yethikrishna/indu-website.git
cd indu-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Resend (for emails)
RESEND_API_KEY=your_resend_api_key

# Cloudflare
CF_PAGES=1
```

### Development

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run check         # Run svelte-check
npm run check:watch   # Watch mode type checking
```

## Project Structure

```
indu-website/
├── src/
│   ├── routes/        # SvelteKit routes (pages and API)
│   ├── lib/           # Shared components, utilities, stores
│   ├── components/    # Reusable Svelte components
│   ├── posts/         # MDSvex markdown content (docs/blog)
│   ├── app.html       # HTML template
│   └── app.css        # Global styles
├── static/            # Static assets
├── docs/              # Additional documentation
├── scripts/           # Build and utility scripts
├── svelte.config.js   # SvelteKit configuration
├── vite.config.ts     # Vite configuration
├── wrangler.toml      # Cloudflare Workers configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies
```

## Deployment

### Cloudflare Pages (Production)

The site is configured to deploy on Cloudflare Pages using `@sveltejs/adapter-cloudflare`.

```bash
npm run build
# Output goes to .svelte-kit/cloudflare/
```

Configure your Cloudflare Pages build:
- **Build command**: `npm run build`
- **Build output directory**: `.svelte-kit/cloudflare`

### Wrangler Preview

```bash
npx wrangler pages dev .svelte-kit/cloudflare
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Security

For security issues, please see [SECURITY.md](SECURITY.md).

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Related Projects

- [indu-foundation](https://github.com/yethikrishna/indu-foundation) - INDU language foundation and core
- [yetisai](https://github.com/yethikrishna/yetisai) - Yeti AI platform
- [compyle](https://github.com/yethikrishna/compyle) - App building platform

---

<div align="center">

Built with passion by [Yethikrishna R](https://github.com/yethikrishna) · INDU Foundation

</div>

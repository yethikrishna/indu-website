# INDU Foundation — Global Components

## Files: app.html, app.css, Nav.svelte, Footer.svelte, Button.svelte, Hero3D.svelte

***

## `src/app.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1A1A2E" />
    <meta name="color-scheme" content="dark" />
    <!-- Preconnect to font origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <!-- Load fonts -->
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <!-- Favicon -->
    <link rel="icon" href="%sveltekit.assets%/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="%sveltekit.assets%/apple-touch-icon.png" />
    <link rel="manifest" href="%sveltekit.assets%/manifest.webmanifest" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

***

## `src/app.css`

```css
/* ═══════════════════════════════════════════════════════════════════
   INDU FOUNDATION — Global Styles
   Dark-first design system
═══════════════════════════════════════════════════════════════════ */

/* ── CSS Custom Properties ─────────────────────────────────────── */
:root {
  /* Brand Colors */
  --color-primary: #1A1A2E;
  --color-primary-light: #2D2D4E;
  --color-primary-dark: #0F0F1A;
  --color-secondary: #E8A838;
  --color-secondary-light: #F0BF5A;
  --color-secondary-dark: #C48A1F;
  --color-accent: #4ECDC4;
  --color-accent-light: #70D9D2;
  --color-accent-dark: #2DB8AE;

  /* Backgrounds */
  --bg-base: #0d0d1a;
  --bg-surface: #12121f;
  --bg-elevated: #1a1a2e;
  --bg-overlay: rgba(13,13,26,0.92);

  /* Text */
  --text-primary: #F8F6F0;
  --text-secondary: rgba(248,246,240,0.65);
  --text-muted: rgba(248,246,240,0.4);
  --text-inverse: #1A1A2E;

  /* Borders */
  --border-default: rgba(255,255,255,0.08);
  --border-subtle: rgba(255,255,255,0.05);
  --border-focus: #4ECDC4;

  /* Fonts */
  --font-display: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Spacing Scale (4px base) */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 20px; --sp-6: 24px;  --sp-8: 32px;  --sp-10: 40px;
  --sp-12: 48px; --sp-16: 64px; --sp-20: 80px; --sp-24: 96px;
  --sp-32: 128px;

  /* Border Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  --radius-2xl: 28px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.35);
  --shadow-xl: 0 24px 64px rgba(0,0,0,0.4);
  --shadow-glow-gold: 0 0 20px rgba(232,168,56,0.35), 0 0 60px rgba(232,168,56,0.12);
  --shadow-glow-teal: 0 0 20px rgba(78,205,196,0.35), 0 0 60px rgba(78,205,196,0.12);

  /* Easing */
  --ease-out: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quad: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Durations */
  --dur-fast: 120ms;
  --dur-normal: 280ms;
  --dur-slow: 560ms;
  --dur-cinematic: 1100ms;

  /* Z-Index Scale */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-preloader: 9999;

  /* Content Widths */
  --content-sm: 640px;
  --content-md: 800px;
  --content-lg: 1100px;
  --content-xl: 1280px;
}

/* ── Modern Reset ──────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  tab-size: 4;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

/* ── Typography ────────────────────────────────────────────────── */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; letter-spacing: -0.03em; }
h2 { font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 800; letter-spacing: -0.025em; }
h3 { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; }
h4 { font-size: clamp(1.15rem, 2.5vw, 1.5rem); font-weight: 600; }
h5 { font-size: 1.1rem; font-weight: 600; }
h6 { font-size: 1rem; font-weight: 600; }

p { max-width: 70ch; }

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--dur-fast);
}
a:hover { color: var(--color-accent-light); }

/* ── Code ──────────────────────────────────────────────────────── */
code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: rgba(78,205,196,0.1);
  color: var(--color-accent);
  padding: 0.15em 0.4em;
  border-radius: var(--radius-sm);
}

pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background: #0d1117;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--sp-6);
  overflow-x: auto;
  line-height: 1.7;
}

pre code {
  background: none;
  padding: 0;
  color: #e6edf3;
  font-size: inherit;
}

/* ── Focus Visible ─────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 2px;
}
:focus:not(:focus-visible) { outline: none; }

/* ── Selection ─────────────────────────────────────────────────── */
::selection {
  background: rgba(232,168,56,0.3);
  color: var(--text-primary);
}

/* ── Scrollbar ─────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--bg-base); }
::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

/* ── Images ────────────────────────────────────────────────────── */
img, video {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ── Forms ─────────────────────────────────────────────────────── */
input, textarea, select, button {
  font-family: inherit;
  font-size: inherit;
}

button { cursor: pointer; }

/* ── Utility Classes ───────────────────────────────────────────── */
.visually-hidden {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

.container {
  max-width: var(--content-xl);
  margin: 0 auto;
  padding: 0 var(--sp-6);
}
@media (max-width: 768px) { .container { padding: 0 var(--sp-4); } }

.prose { max-width: 72ch; }
.prose h1, .prose h2, .prose h3 { margin-top: 2em; margin-bottom: 0.5em; }
.prose p + p { margin-top: 1em; }
.prose ul, .prose ol { padding-left: 1.5em; margin: 1em 0; }
.prose li + li { margin-top: 0.4em; }
.prose blockquote {
  border-left: 3px solid var(--color-secondary);
  padding-left: 1.25em; margin: 1.5em 0;
  color: var(--text-secondary); font-style: italic;
}

/* ── Print ─────────────────────────────────────────────────────── */
@media print {
  body { background: white; color: black; }
  nav, footer, .no-print { display: none !important; }
  a { color: inherit; text-decoration: underline; }
}
```

***

## `src/lib/components/Nav.svelte`

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let isScrolled = $state(false);
  let mobileOpen = $state(false);
  let activeDropdown = $state<string | null>(null);

  const navLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/playground', label: 'Playground' },
    { href: '/blog', label: 'Blog' },
    { href: '/packages', label: 'Packages' },
    {
      label: 'Community',
      dropdown: [
        { href: '/community', label: 'Community Hub' },
        { href: '/community/showcase', label: 'Showcase' },
        { href: '/community/contributors', label: 'Contributors' },
        { href: '/community/discord', label: 'Discord' },
        { href: '/community/jobs', label: 'Jobs' }
      ]
    },
    {
      label: 'Foundation',
      dropdown: [
        { href: '/foundation', label: 'About the Foundation' },
        { href: '/foundation/governance', label: 'Governance' },
        { href: '/foundation/membership', label: 'Membership' },
        { href: '/foundation/grants', label: 'Grants' },
        { href: '/sponsors', label: 'Sponsors' }
      ]
    }
  ];

  onMount(() => {
    if (!browser) return;
    const onScroll = () => { isScrolled = window.scrollY > 20; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function toggleDropdown(label: string) {
    activeDropdown = activeDropdown === label ? null : label;
  }

  function closeAll() {
    mobileOpen = false;
    activeDropdown = null;
  }

  $effect(() => {
    if (browser && mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else if (browser) {
      document.body.style.overflow = '';
    }
  });
</script>

<svelte:window onclick={(e) => {
  if (!(e.target as Element).closest('.nav-item-dropdown')) {
    activeDropdown = null;
  }
}} />

<nav
  class="nav"
  class:scrolled={isScrolled}
  aria-label="Main navigation"
>
  <div class="nav-container">
    <!-- Logo -->
    <a href="/" class="nav-logo" onclick={closeAll}>
      <svg viewBox="0 0 44 44" width="36" height="36" role="img" aria-label="INDU logo">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E8A838"/>
            <stop offset="100%" stop-color="#4ECDC4"/>
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="20" fill="none" stroke="url(#logoGrad)" stroke-width="2.5"/>
        <path d="M14 22 Q22 10 30 22 Q22 34 14 22" fill="none" stroke="#4ECDC4" stroke-width="2"/>
        <circle cx="22" cy="22" r="4" fill="#E8A838"/>
      </svg>
      <span class="logo-text">INDU</span>
      <span class="logo-sub">Foundation</span>
    </a>

    <!-- Desktop Links -->
    <div class="nav-links" role="list">
      {#each navLinks as link}
        <div class="nav-item" role="listitem">
          {#if link.dropdown}
            <div class="nav-item-dropdown">
              <button
                class="nav-link dropdown-trigger"
                class:active={$page.url.pathname.startsWith('/'+link.label.toLowerCase())}
                onclick={() => toggleDropdown(link.label)}
                aria-expanded={activeDropdown === link.label}
                aria-haspopup="true"
              >
                {link.label}
                <svg class="chevron" class:open={activeDropdown === link.label}
                  viewBox="0 0 16 16" width="12" height="12" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M4 6l4 4 4-4"/>
                </svg>
              </button>
              {#if activeDropdown === link.label}
                <div class="dropdown-menu" role="menu">
                  {#each link.dropdown as item}
                    <a
                      href={item.href}
                      class="dropdown-item"
                      class:current={$page.url.pathname === item.href}
                      role="menuitem"
                      onclick={closeAll}
                    >
                      {item.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <a
              href={link.href}
              class="nav-link"
              class:active={$page.url.pathname.startsWith(link.href ?? '')}
              onclick={closeAll}
            >
              {link.label}
            </a>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Actions -->
    <div class="nav-actions">
      <a
        href="https://github.com/indu-lang/indu"
        class="github-link"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="INDU on GitHub"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>
      <a href="/docs/getting-started/installation" class="cta-button">
        Get Started
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 8h10M9 4l4 4-4 4"/>
        </svg>
      </a>
    </div>

    <!-- Hamburger -->
    <button
      class="hamburger"
      class:active={mobileOpen}
      onclick={() => mobileOpen = !mobileOpen}
      aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={mobileOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileOpen}
    <div class="mobile-menu" role="dialog" aria-label="Mobile navigation">
      {#each navLinks as link}
        {#if link.dropdown}
          <div class="mobile-section">
            <div class="mobile-section-label">{link.label}</div>
            {#each link.dropdown as item}
              <a href={item.href} class="mobile-link" onclick={closeAll}>{item.label}</a>
            {/each}
          </div>
        {:else}
          <a href={link.href} class="mobile-link" onclick={closeAll}>{link.label}</a>
        {/if}
      {/each}
      <div class="mobile-actions">
        <a href="https://github.com/indu-lang/indu" target="_blank" rel="noreferrer" class="mobile-github">
          ★ Star on GitHub
        </a>
        <a href="/docs/getting-started/installation" class="mobile-cta" onclick={closeAll}>
          Get Started →
        </a>
      </div>
    </div>
  {/if}
</nav>

<style>
  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: var(--z-sticky, 200);
    padding: 0 24px;
    transition: background 0.35s ease, backdrop-filter 0.35s ease,
                border-color 0.35s ease, box-shadow 0.35s ease;
  }
  .nav.scrolled {
    background: rgba(13,13,26,0.88);
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
  .nav-container {
    max-width: 1280px; margin: 0 auto;
    display: flex; align-items: center;
    height: 72px; gap: 40px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .logo-text {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800; font-size: 1.2rem;
    letter-spacing: 0.08em;
    color: #F8F6F0;
  }
  .logo-sub {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.65rem; letter-spacing: 0.18em;
    color: rgba(248,246,240,0.4); text-transform: uppercase;
    margin-top: 2px; align-self: flex-end;
  }
  .nav-links {
    display: flex; align-items: center; gap: 4px;
    flex: 1; list-style: none;
  }
  .nav-item { position: relative; }
  .nav-link {
    display: flex; align-items: center; gap: 4px;
    padding: 8px 14px; border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem; font-weight: 500;
    color: rgba(248,246,240,0.65);
    text-decoration: none; background: none; border: none;
    transition: color 0.2s, background 0.2s;
    cursor: pointer; white-space: nowrap;
  }
  .nav-link:hover, .nav-link.active {
    color: #F8F6F0; background: rgba(255,255,255,0.06);
  }
  .chevron { transition: transform 0.2s; flex-shrink: 0; }
  .chevron.open { transform: rotate(180deg); }
  .dropdown-menu {
    position: absolute; top: calc(100% + 8px); left: 50%;
    transform: translateX(-50%);
    background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 8px;
    min-width: 200px; box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    display: flex; flex-direction: column; gap: 2px;
    z-index: 200;
  }
  .dropdown-item {
    padding: 9px 14px; border-radius: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem; color: rgba(248,246,240,0.7);
    text-decoration: none; transition: color 0.15s, background 0.15s;
  }
  .dropdown-item:hover, .dropdown-item.current {
    color: #F8F6F0; background: rgba(255,255,255,0.07);
  }
  .dropdown-item.current { color: #E8A838; }
  .nav-actions {
    display: flex; align-items: center; gap: 12px; margin-left: auto;
  }
  .github-link {
    color: rgba(248,246,240,0.5); transition: color 0.2s;
    display: flex; align-items: center;
  }
  .github-link:hover { color: #E8A838; }
  .cta-button {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 22px; background: #E8A838; color: #1A1A2E;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 0.875rem; border-radius: 8px; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    white-space: nowrap;
  }
  .cta-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(232,168,56,0.35);
    opacity: 0.92;
  }
  .hamburger {
    display: none; flex-direction: column; gap: 5.5px;
    background: none; border: none; padding: 6px; margin-left: auto;
  }
  .hamburger span {
    width: 22px; height: 2px; background: rgba(248,246,240,0.8);
    display: block; border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .hamburger.active span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
  .mobile-menu {
    position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
    background: #0d0d1a; overflow-y: auto;
    padding: 24px; display: flex; flex-direction: column; gap: 4px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .mobile-section { margin-top: 16px; }
  .mobile-section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: rgba(248,246,240,0.35);
    padding: 4px 12px; margin-bottom: 4px;
  }
  .mobile-link {
    display: block; padding: 11px 16px; border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif; font-size: 1rem;
    color: rgba(248,246,240,0.75); text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .mobile-link:hover { background: rgba(255,255,255,0.06); color: #F8F6F0; }
  .mobile-actions {
    margin-top: 24px; padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; flex-direction: column; gap: 12px;
  }
  .mobile-github {
    padding: 12px 16px; border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px; text-align: center; color: rgba(248,246,240,0.7);
    font-family: 'Space Grotesk', sans-serif; text-decoration: none;
  }
  .mobile-cta {
    padding: 14px 16px; background: #E8A838; color: #1A1A2E;
    border-radius: 8px; text-align: center;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    text-decoration: none;
  }
  @media (max-width: 960px) {
    .nav-links, .nav-actions { display: none; }
    .hamburger { display: flex; }
  }
</style>
```

***

## `src/lib/components/Hero3D.svelte`

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Props { class?: string; }
  let { class: className = '' }: Props = $props();

  let canvasEl: HTMLCanvasElement;
  let renderer: any, scene: any, camera: any, mesh: any, mat: any;
  let animId: number;
  let scrollY = 0;
  let time = 0;

  const VERTEX_SHADER = `
    uniform float uTime;
    varying vec3 vNormal;
    varying float vNoise;

    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
    float snoise(vec3 v){
      const vec2 C=vec2(1./6.,1./3.);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
      vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-.5;
      i=mod289(i);
      vec4 p=permute(permute(permute(
        i.z+vec4(0.,i1.z,i2.z,1.))+
        i.y+vec4(0.,i1.y,i2.y,1.))+
        i.x+vec4(0.,i1.x,i2.x,1.));
      vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
      m=m*m;return 42.*dot(m*m,vec4(
        dot(p.xyz,x0),dot(p.yzx,x1),dot(p.zxy,x2),dot(p.wxy,x3)));
    }
    void main(){
      vNormal=normalMatrix*normal;
      float n=snoise(position*1.4+uTime*.25);
      float n2=snoise(position*3.0-uTime*.12);
      vNoise=n*.5+n2*.25;
      vec3 disp=position+normal*(vNoise*0.38);
      gl_Position=projectionMatrix*modelViewMatrix*vec4(disp,1.);
    }
  `;

  const FRAGMENT_SHADER = `
    uniform float uTime;
    varying vec3 vNormal;
    varying float vNoise;
    void main(){
      vec3 navy=vec3(0.1,0.1,0.18);
      vec3 teal=vec3(0.306,0.804,0.769);
      vec3 gold=vec3(0.91,0.659,0.22);
      vec3 violet=vec3(0.5,0.2,0.9);
      float t=uTime*.18;
      float aurora=sin(vNormal.y*2.+t)*0.5+0.5;
      float aurora2=sin(vNormal.x*1.7+t*1.3+1.4)*0.5+0.5;
      vec3 col=mix(navy,teal,aurora*.65);
      col=mix(col,gold,aurora2*.42*(vNoise+.5));
      col=mix(col,violet,sin(t*.4)*.28);
      float fresnel=1.-abs(dot(normalize(vNormal),vec3(0.,0.,1.)));
      col+=teal*pow(fresnel,3.)*.85+gold*pow(fresnel,6.)*.4;
      gl_FragColor=vec4(col,.93);
    }
  `;

  onMount(async () => {
    if (!browser) return;
    const THREE = await import('three');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5.5;

    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const geo = new THREE.IcosahedronGeometry(2, 4);
    mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: { uTime: { value: 0 } },
      transparent: true
    });
    mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe overlay
    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.02, 2),
      new THREE.MeshBasicMaterial({ wireframe: true, color: 0x4ECDC4, transparent: true, opacity: 0.05 })
    );
    scene.add(wireMesh);

    const resize = () => {
      const w = canvasEl.clientWidth, h = canvasEl.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvasEl);
    resize();

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      animId = requestAnimationFrame(tick);
      time += 0.007;
      mat.uniforms.uTime.value = time;
      mesh.rotation.y = time * 0.12 + scrollY * 0.0004;
      mesh.rotation.x = Math.sin(time * 0.18) * 0.18 + scrollY * 0.0002;
      wireMesh.rotation.copy(mesh.rotation);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  });

  onDestroy(() => {
    cancelAnimationFrame(animId);
    if (renderer) renderer.dispose();
    if (mat) mat.dispose();
    if (scene) scene.clear();
  });
</script>

<canvas bind:this={canvasEl} class={`hero-3d-canvas ${className}`}></canvas>

<style>
  .hero-3d-canvas {
    width: 100%; height: 100%;
    display: block;
  }
</style>
```


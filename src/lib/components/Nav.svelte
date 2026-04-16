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

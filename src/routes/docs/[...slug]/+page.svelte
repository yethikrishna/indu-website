<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';

  export let data;

  let toc: { id: string, text: string, level: number }[] = [];
  let contentHtml = '';
  
  $: {
    if (data.content) {
      // Parse Markdown and extract TOC
      const tokens = marked.lexer(data.content);
      
      toc = tokens
        .filter((t): t is marked.Tokens.Heading => t.type === 'heading')
        .map(t => ({
          id: t.text.toLowerCase().replace(/[^\w]+/g, '-'),
          text: t.text,
          level: t.depth
        }));

      // Configure marked for custom IDs and syntax highlighting
      const renderer = new marked.Renderer();
      renderer.heading = function(text, level, raw) {
        const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      };

      marked.setOptions({
        renderer,
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (__) {}
          }
          return code;
        }
      });

      contentHtml = marked.parser(tokens);
    }
  }

  let sidebarOpen = false;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<svelte:head>
  <title>{data.title || 'Documentation'} | INDU Docs</title>
</svelte:head>

<div class="docs-layout">
  <!-- Mobile Header -->
  <div class="mobile-header">
    <button class="menu-btn" on:click={toggleSidebar}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    </button>
    <div class="title">{data.title || 'Docs'}</div>
  </div>

  <!-- Sidebar -->
  <aside class="sidebar {sidebarOpen ? 'open' : ''}">
    <div class="sidebar-header">
      <div class="search-box">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search docs... (Cmd+K)" />
      </div>
    </div>

    <nav class="sidebar-nav">
      {#each data.tree as section}
        <div class="nav-section">
          <h4>{section.title}</h4>
          <ul>
            {#each section.items as item}
              <li>
                <a href="/docs/{item.slug}" class:active={$page.url.pathname === `/docs/${item.slug}`}>
                  {item.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <div class="content-container">
      <article class="prose">
        <h1>{data.title}</h1>
        {#if data.description}
          <p class="lead">{data.description}</p>
        {/if}
        
        {@html contentHtml}

        <!-- Pagination -->
        <div class="pagination">
          {#if data.prev}
            <a href="/docs/{data.prev.slug}" class="page-link prev">
              <span class="label">Previous</span>
              <span class="title">← {data.prev.title}</span>
            </a>
          {:else}
            <div></div>
          {/if}
          
          {#if data.next}
            <a href="/docs/{data.next.slug}" class="page-link next">
              <span class="label">Next</span>
              <span class="title">{data.next.title} →</span>
            </a>
          {/if}
        </div>
      </article>

      <!-- Right TOC -->
      <aside class="toc">
        <div class="toc-inner">
          <h4>On this page</h4>
          <ul>
            {#each toc as heading}
              <li class="level-{heading.level}">
                <a href="#{heading.id}">{heading.text}</a>
              </li>
            {/each}
          </ul>
        </div>
      </aside>
    </div>
  </main>
</div>

<style>
  .docs-layout {
    display: flex;
    min-height: 100vh;
    padding-top: 72px; /* Nav offset */
    background-color: var(--bg-base);
  }

  .mobile-header {
    display: none;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-default);
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    z-index: 90;
  }

  .menu-btn {
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
  }

  /* ── Sidebar ────────────────────────────── */
  .sidebar {
    width: 280px;
    flex-shrink: 0;
    background-color: var(--bg-surface);
    border-right: 1px solid var(--border-default);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 72px;
    height: calc(100vh - 72px);
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 24px;
    position: sticky;
    top: 0;
    background: var(--bg-surface);
    z-index: 10;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box svg {
    position: absolute;
    left: 12px;
    color: var(--text-muted);
  }

  .search-box input {
    width: 100%;
    padding: 10px 12px 10px 36px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-default);
    border-radius: 8px;
    color: var(--text-primary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: border-color 0.2s;
  }

  .search-box input:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  .sidebar-nav {
    padding: 0 24px 40px;
  }

  .nav-section {
    margin-bottom: 24px;
  }

  .nav-section h4 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .nav-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-section li {
    margin-bottom: 6px;
  }

  .nav-section a {
    display: block;
    padding: 6px 12px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    border-radius: 6px;
    transition: all 0.2s;
    margin-left: -12px;
  }

  .nav-section a:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-section a.active {
    color: var(--color-accent);
    background: rgba(78, 205, 196, 0.1);
    font-weight: 500;
  }

  /* ── Main Content ────────────────────────── */
  .main-content {
    flex: 1;
    min-width: 0;
    padding: 48px;
  }

  .content-container {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    gap: 64px;
    align-items: flex-start;
  }

  .prose {
    flex: 1;
    min-width: 0;
    max-width: 760px;
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .lead {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 40px;
    line-height: 1.6;
  }

  :global(.prose h2) {
    font-size: 1.75rem;
    margin-top: 48px;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-default);
  }

  :global(.prose h3) {
    font-size: 1.35rem;
    margin-top: 32px;
    margin-bottom: 16px;
  }

  :global(.prose p) {
    margin-bottom: 24px;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  :global(.prose a) {
    color: var(--color-accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  :global(.prose a:hover) {
    border-bottom-color: var(--color-accent);
  }

  :global(.prose pre) {
    background: #0D1117;
    padding: 20px;
    border-radius: 12px;
    overflow-x: auto;
    margin-bottom: 32px;
    border: 1px solid var(--border-default);
  }

  :global(.prose code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
  }

  :global(.prose p code), :global(.prose li code) {
    background: rgba(255, 255, 255, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--text-primary);
  }

  :global(.prose ul), :global(.prose ol) {
    margin-bottom: 24px;
    padding-left: 24px;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  :global(.prose li) {
    margin-bottom: 8px;
  }

  /* ── Pagination ─────────────────────────── */
  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--border-default);
  }

  .page-link {
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    border: 1px solid var(--border-default);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
    width: 48%;
  }

  .page-link:hover {
    border-color: var(--color-accent);
    background: rgba(78, 205, 196, 0.05);
  }

  .page-link.next {
    align-items: flex-end;
    text-align: right;
  }

  .page-link .label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  .page-link .title {
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--text-primary);
    font-size: 1.1rem;
  }

  /* ── TOC ────────────────────────────────── */
  .toc {
    width: 240px;
    flex-shrink: 0;
    position: sticky;
    top: 120px;
  }

  .toc-inner {
    border-left: 1px solid var(--border-default);
    padding-left: 20px;
  }

  .toc h4 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-primary);
    margin-bottom: 16px;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc li {
    margin-bottom: 10px;
  }

  .toc li.level-3 {
    padding-left: 16px;
  }

  .toc a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    display: block;
    line-height: 1.4;
  }

  .toc a:hover {
    color: var(--color-accent);
  }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 1024px) {
    .toc {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .mobile-header {
      display: flex;
    }

    .sidebar {
      position: fixed;
      left: -100%;
      top: 136px;
      height: calc(100vh - 136px);
      z-index: 80;
      transition: left 0.3s ease;
      width: 100%;
      border-right: none;
    }

    .sidebar.open {
      left: 0;
    }

    .main-content {
      padding: 32px 24px;
      margin-top: 64px;
    }

    .page-link {
      width: 100%;
    }

    .pagination {
      flex-direction: column;
      gap: 16px;
    }
  }
</style>

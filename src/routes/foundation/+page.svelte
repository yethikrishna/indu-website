<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Coming Soon | INDU Foundation</title>
</svelte:head>

<div class="coming-soon">
  <div class="container">
    <div class="badge">Work in Progress</div>
    <h1>{$page.url.pathname}</h1>
    <p>This page is currently being built as part of the INDU Foundation rollout. Check back soon.</p>
    <a href="/" class="btn-primary">Return Home</a>
  </div>
</div>

<style>
  .coming-soon {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 72px;
    background-color: var(--bg-base);
    text-align: center;
  }
  
  .container {
    max-width: 600px;
    padding: 40px;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: 16px;
    box-shadow: var(--shadow-lg);
  }

  .badge {
    display: inline-block;
    padding: 6px 12px;
    background: rgba(232, 168, 56, 0.1);
    color: var(--color-secondary);
    border: 1px solid rgba(232, 168, 56, 0.2);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  h1 {
    font-family: var(--font-mono);
    color: var(--text-primary);
    margin-bottom: 16px;
    font-size: 2rem;
  }

  p {
    color: var(--text-muted);
    margin-bottom: 32px;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .btn-primary {
    display: inline-flex;
    padding: 12px 24px;
    background: var(--color-secondary);
    color: var(--bg-base);
    font-family: var(--font-display);
    font-weight: 600;
    text-decoration: none;
    border-radius: 8px;
    transition: transform 0.2s, opacity 0.2s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
</style>

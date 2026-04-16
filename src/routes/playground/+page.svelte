<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { examples } from '$lib/playground/examples';
  import { induLanguage } from '$lib/playground/indu-language';
  import { induTheme } from '$lib/playground/indu-theme';
  import { runMockInterpreter } from '$lib/playground/mock-interpreter';

  let Monaco: any = null;
  let editor: any = null;
  let editorContainer: HTMLElement;
  let outputContainer: HTMLElement;
  
  let currentExampleId = $state('hello-world');
  let currentCode = $state(examples[0].code);
  let isRunning = $state(false);
  let outputLines = $state<string[]>([]);
  let hasError = $state(false);
  let shareTooltip = $state(false);

  // Initialize Monaco Editor
  onMount(async () => {
    if (!browser) return;

    try {
      // Dynamically import Monaco Editor
      const monacoModule = await import('monaco-editor/esm/vs/editor/editor.api');
      Monaco = monacoModule;

      // Register INDU Language
      const langConfig = induLanguage.loader();
      Monaco.languages.register({ id: 'indu' });
      Monaco.languages.setMonarchTokensProvider('indu', langConfig);
      
      // Register Theme
      Monaco.editor.defineTheme('indu-theme', induTheme);

      // Create Editor
      editor = Monaco.editor.create(editorContainer, {
        value: currentCode,
        language: 'indu',
        theme: 'indu-theme',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        lineHeight: 22,
        padding: { top: 16, bottom: 16 },
        scrollBeyondLastLine: false,
        roundedSelection: false,
        renderLineHighlight: 'all',
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
      });

      // Handle editor changes
      editor.onDidChangeModelContent(() => {
        currentCode = editor.getValue();
      });

      // Check URL for shared code
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get('code');
      if (codeParam) {
        try {
          const decoded = atob(codeParam);
          currentCode = decoded;
          currentExampleId = 'custom';
          editor.setValue(decoded);
        } catch (e) {
          console.error("Failed to decode shared code");
        }
      }

    } catch (e) {
      console.error("Failed to load Monaco Editor", e);
    }

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  });

  function loadExample(id: string) {
    const example = examples.find(e => e.id === id);
    if (example && editor) {
      currentExampleId = id;
      currentCode = example.code;
      editor.setValue(example.code);
      outputLines = [];
    }
  }

  async function handleRun() {
    if (isRunning) return;
    
    isRunning = true;
    outputLines = ['Compiling...'];
    hasError = false;
    
    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const result = runMockInterpreter(currentCode);
    
    outputLines = [];
    
    // Animate output lines for realism
    for (let i = 0; i < result.output.length; i++) {
      outputLines = [...outputLines, result.output[i]];
      await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 50));
      
      if (outputContainer) {
        outputContainer.scrollTop = outputContainer.scrollHeight;
      }
    }
    
    hasError = result.error;
    isRunning = false;
  }

  function handleShare() {
    const encoded = btoa(currentCode);
    const url = new URL(window.location.href);
    url.searchParams.set('code', encoded);
    
    navigator.clipboard.writeText(url.toString());
    
    shareTooltip = true;
    setTimeout(() => {
      shareTooltip = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>INDU Playground — The Universal Language</title>
  <meta name="description" content="Try INDU right in your browser. No installation required." />
</svelte:head>

<div class="playground-layout">
  <!-- Sidebar: Examples -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <h3>Examples</h3>
      <p>Discover INDU primitives</p>
    </div>
    <div class="example-list">
      {#each examples as example}
        <button 
          class="example-btn" 
          class:active={currentExampleId === example.id}
          onclick={() => loadExample(example.id)}
        >
          {example.name}
        </button>
      {/each}
      {#if currentExampleId === 'custom'}
        <button class="example-btn active">Custom Code</button>
      {/if}
    </div>
    
    <div class="sidebar-footer">
      <a href="/docs" class="docs-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        Read the Docs
      </a>
    </div>
  </aside>

  <!-- Main Content: Editor & Output -->
  <main class="main-content">
    <header class="toolbar">
      <div class="toolbar-title">
        <span class="file-icon">INDU</span>
        main.indu
      </div>
      
      <div class="toolbar-actions">
        <div class="share-wrapper">
          <button class="btn-icon" onclick={handleShare} aria-label="Share code">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
            Share
          </button>
          {#if shareTooltip}
            <div class="tooltip">Copied to clipboard!</div>
          {/if}
        </div>
        
        <button class="btn-run" onclick={handleRun} disabled={isRunning}>
          {#if isRunning}
            <span class="spinner"></span>
            Running...
          {:else}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Run Code
          {/if}
        </button>
      </div>
    </header>

    <div class="editor-pane">
      <div bind:this={editorContainer} class="monaco-container"></div>
      {#if !editor}
        <div class="editor-loading">Loading editor environment...</div>
      {/if}
    </div>

    <div class="output-pane">
      <div class="output-header">Terminal</div>
      <div bind:this={outputContainer} class="output-content" class:error={hasError}>
        {#if outputLines.length === 0}
          <div class="output-empty">Press "Run Code" to execute</div>
        {:else}
          {#each outputLines as line}
            <div class="output-line">{line || '\u00A0'}</div>
          {/each}
          {#if isRunning}
            <div class="output-cursor">_</div>
          {/if}
        {/if}
      </div>
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden; /* Prevent scrolling on the playground layout */
  }

  .playground-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    padding-top: 72px; /* Account for global Nav */
    background-color: var(--bg-base);
    color: var(--text-primary);
    font-family: var(--font-body);
  }

  /* ── Sidebar ────────────────────────────────────────── */
  .sidebar {
    width: 260px;
    background-color: var(--bg-surface);
    border-right: 1px solid var(--border-default);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .sidebar-header {
    padding: 24px 20px 16px;
  }

  .sidebar-header h3 {
    font-family: var(--font-display);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    margin-bottom: 4px;
  }

  .sidebar-header p {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .example-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .example-btn {
    background: transparent;
    border: none;
    text-align: left;
    padding: 10px 12px;
    border-radius: 6px;
    color: var(--text-secondary);
    font-family: var(--font-display);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .example-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }

  .example-btn.active {
    background-color: rgba(232, 168, 56, 0.1);
    color: var(--color-secondary);
    font-weight: 500;
  }

  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid var(--border-default);
  }

  .docs-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s;
  }

  .docs-link:hover {
    color: var(--color-accent);
  }

  /* ── Main Content ────────────────────────────────────── */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevent flexbox overflow */
  }

  .toolbar {
    height: 48px;
    background-color: var(--bg-surface);
    border-bottom: 1px solid var(--border-default);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .toolbar-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .file-icon {
    font-size: 0.65rem;
    font-weight: 700;
    background-color: var(--color-accent);
    color: var(--bg-base);
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .share-wrapper {
    position: relative;
  }

  .btn-icon {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid var(--border-default);
    color: var(--text-secondary);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    transition: all 0.2s;
  }

  .btn-icon:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }

  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    background-color: var(--color-accent);
    color: var(--bg-base);
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 10;
  }

  .tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent var(--color-accent) transparent;
  }

  .btn-run {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: var(--color-secondary);
    color: var(--bg-base);
    border: none;
    padding: 6px 16px;
    border-radius: 6px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.85rem;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-run:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn-run:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: var(--bg-base);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Editor & Output Panes ───────────────────────────── */
  .editor-pane {
    flex: 2;
    position: relative;
    background-color: #12121F;
  }

  .monaco-container {
    width: 100%;
    height: 100%;
  }

  .editor-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .output-pane {
    flex: 1;
    min-height: 200px;
    background-color: #0D0D1A;
    border-top: 1px solid var(--border-default);
    display: flex;
    flex-direction: column;
  }

  .output-header {
    padding: 8px 20px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    background-color: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--border-default);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .output-content {
    flex: 1;
    padding: 16px 20px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .output-content.error {
    color: #FF6B6B;
  }

  .output-empty {
    color: var(--text-muted);
    font-style: italic;
  }

  .output-line {
    white-space: pre-wrap;
    word-break: break-all;
  }

  .output-cursor {
    display: inline-block;
    width: 8px;
    animation: blink 1s step-end infinite;
    color: var(--color-secondary);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ── Responsive ──────────────────────────────────────── */
  @media (max-width: 768px) {
    .playground-layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--border-default);
    }

    .example-list {
      flex-direction: row;
      overflow-x: auto;
      padding: 12px 20px;
    }

    .example-btn {
      white-space: nowrap;
    }

    .sidebar-header, .sidebar-footer {
      display: none;
    }

    .main-content {
      flex: 1;
    }

    .editor-pane {
      flex: 1;
    }

    .output-pane {
      flex: 1;
    }
  }
</style>

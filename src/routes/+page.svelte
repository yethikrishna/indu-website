<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
    targetX: number; targetY: number;
  }

  // ─── Reactive State (Svelte 5 Runes) ─────────────────────────────────────
  let preloaderVisible = $state(true);
  let preloaderFading = $state(false);
  let loadProgress = $state(0);
  let navFrosted = $state(false);
  let mobileMenuOpen = $state(false);
  let heroHeadlineVisible = $state(false);
  let newsletterEmail = $state('');
  let newsletterSubmitting = $state(false);
  let newsletterSubmitted = $state(false);
  let statValues = $state([0, 0, 0]);

  // ─── DOM Refs ─────────────────────────────────────────────────────────────
  let canvasEl: HTMLCanvasElement | undefined = $state();
  let preloaderCanvasEl: HTMLCanvasElement | undefined = $state();
  let heroSection: HTMLElement | undefined = $state();
  let statsSection: HTMLElement | undefined = $state();
  let threeRenderer: any = null;
  let animFrameId: number;
  let preloaderAnimId: number;

  // ─── Content Data ─────────────────────────────────────────────────────────
  const headline1 = 'One Language.'.split('');
  const headline2 = 'Every Frontier.'.split('');

  const problems = [
    {
      year: '2020',
      title: 'Redux Boilerplate',
      code: `// 80 lines to update a boolean\nconst SET_LOADING = 'SET_LOADING';\nconst loadingReducer = (state = false, action) => {\n  switch(action.type) {\n    case SET_LOADING: return action.payload;\n    default: return state;\n  }\n};\n// + actions.js + selectors.js + types.js...`,
      desc: '5 files. 80 lines. To flip a boolean.'
    },
    {
      year: '2022',
      title: 'Hydration Nightmares',
      code: `// Next.js hydration error\nError: Hydration failed because the initial\nUI does not match what was rendered on\nthe server.\n// useEffect, useState, dynamic imports...\n// ...just to render a timestamp`,
      desc: 'Server says one thing. Browser says another.'
    },
    {
      year: '2023',
      title: 'LangChain Bloat',
      code: `// 50 lines for a "simple" agent\nconst model = new ChatOpenAI({temperature: 0});\nconst tools = [new SerpAPI(), new Calculator()];\nconst executor = await initializeAgentExecutor(\n  tools, model, {agentType: "react-description"}\n);\n// + memory + vectorstore + embeddings...`,
      desc: '50 layers of abstraction for one API call.'
    },
    {
      year: '2024',
      title: 'CRDT Complexity',
      code: `// Manual CRDT implementation\nimport * as Y from 'yjs';\nconst doc = new Y.Doc();\nconst ytext = doc.getText('content');\nconst wsProvider = new WebsocketProvider(url, room, doc);\n// + awareness + persistence + conflict resolution...`,
      desc: 'Math PhD required to ship a collaborative doc.'
    },
    {
      year: '2025',
      title: 'NPU Fragmentation',
      code: `# Python + CUDA just to run 3B params locally\nimport torch\nfrom transformers import AutoModelForCausalLM\nmodel = AutoModelForCausalLM.from_pretrained(\n  "phi-3-mini", torch_dtype=torch.float16\n).to("cuda")\n# 2GB of deps, CUDA setup, driver hell...`,
      desc: 'Running a local LLM: 2 hours of setup.'
    }
  ];

  const features = [
    { icon: '⚡', title: 'Fluid Typing', desc: 'Python ergonomics for prototyping, Rust precision for production. One language, two modes.' },
    { icon: '🤖', title: 'Native Agents', desc: '`agent` is a keyword. Fault-tolerant, message-passing actors. No LangChain required.' },
    { icon: '🔮', title: 'WebGPU Rendering', desc: 'Bypass the DOM. Paint at game-engine speed. WebGPU canvas is a first-class primitive.' },
    { icon: '🌐', title: 'Sync CRDT', desc: '`sync let x = 0` — INDU handles SQLite persistence and WebRTC sync automatically.' },
    { icon: '🛡️', title: 'ARC Memory', desc: 'Deterministic reference counting. Zero GC pauses. No borrow checker battles.' },
    { icon: '🚫', title: 'Zero-Null Safety', desc: '`null` does not exist in INDU. `Option<T>` and `Result<T,E>` are the only paths.' },
    { icon: '⏱️', title: 'Comptime', desc: 'Zig-inspired compile-time execution. Optimize away runtime overhead before shipping.' },
    { icon: '🧠', title: 'NEXUS Engine', desc: 'Load ONNX/PyTorch models. Run on NPU/GPU via SIMD abstractions. No Python required.' }
  ];

  const stats = [
    { value: '10x', label: 'Development Speed', target: 10, suffix: 'x' },
    { value: '0', label: 'Null Errors Possible', target: 0, suffix: '' },
    { value: '1', label: 'Language for Everything', target: 1, suffix: '' }
  ];

  const codeComparisons = [
    {
      title: 'State Management',
      before: { lang: 'Redux', lines: 80, code: `// actions.js\nexport const INCREMENT = 'INCREMENT';\nexport const DECREMENT = 'DECREMENT';\nexport const SET_VALUE = 'SET_VALUE';\n\nexport const increment = () => ({type: INCREMENT});\nexport const decrement = () => ({type: DECREMENT});\nexport const setValue = (v) => ({type: SET_VALUE, payload: v});\n\n// reducer.js\nconst initialState = { count: 0, loading: false };\nexport function counterReducer(state = initialState, action) {\n  switch (action.type) {\n    case INCREMENT: return {...state, count: state.count + 1};\n    case DECREMENT: return {...state, count: state.count - 1};\n    case SET_VALUE: return {...state, count: action.payload};\n    default: return state;\n  }\n}\n\n// selectors.js\nexport const selectCount = (state) => state.counter.count;\n\n// store.js + Provider wrapping + useSelector + useDispatch...` },
      after: { lang: 'INDU', lines: 3, code: `// INDU — 3 lines, distributed by default\nsync let count: i32 = 0;\n\n// That's it. Persisted to SQLite.\n// Synced via WebRTC. Zero config.` }
    },
    {
      title: 'AI Agent',
      before: { lang: 'LangChain', lines: 45, code: `// LangChain agent setup\nimport { ChatOpenAI } from 'langchain/chat_models';\nimport { initializeAgentExecutor } from 'langchain/agents';\nimport { Calculator } from 'langchain/tools';\nimport { SerpAPI } from 'langchain/tools';\nimport { ConversationBufferMemory } from 'langchain/memory';\n\nconst model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-4' });\nconst tools = [new Calculator(), await SerpAPI.fromEnvironment()];\nconst memory = new ConversationBufferMemory({\n  memoryKey: 'chat_history',\n  returnMessages: true\n});\nconst executor = await initializeAgentExecutorWithOptions(\n  tools, model,\n  { agentType: 'chat-conversational-react-description', memory }\n);\n\ntry {\n  const result = await executor.call({ input: userMessage });\n  return result.output;\n} catch (e) {\n  console.error('Agent error:', e);\n  // No automatic restart. Manual retry logic required.\n}` },
      after: { lang: 'INDU', lines: 12, code: `// INDU native agent — 12 lines\nagent ResearchAgent {\n  tools: [Calculator, WebSearch],\n  model: nexus.gpt4(),\n  \n  fn handle(msg: UserMessage) -> AgentResponse {\n    let plan = self.plan(msg.text)?;\n    plan.execute().await\n  }\n}\n\n// Automatic restart on crash.\n// No manual error handling needed.` }
    }
  ];

  // ─── Preloader Animation ──────────────────────────────────────────────────
  function runPreloader() {
    if (!browser || !preloaderCanvasEl) return;
    const canvas = preloaderCanvasEl;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2, cy = canvas.height / 2;

    const particles: Particle[] = Array.from({ length: 400 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random(),
      targetX: cx + (Math.random() - 0.5) * 220,
      targetY: cy + (Math.random() - 0.5) * 80
    }));

    const startTime = performance.now();
    const duration = 3000;

    function frame(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      loadProgress = Math.round(progress * 100);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0d0d1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ease = Math.pow(progress, 0.5);
      particles.forEach((p, i) => {
        p.x += (p.targetX - p.x) * ease * 0.035 + p.vx * (1 - ease) * 0.3;
        p.y += (p.targetY - p.y) * ease * 0.035 + p.vy * (1 - ease) * 0.3;
        const alpha = 0.2 + ease * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + ease * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${35 + (i / 400) * 20}, 85%, 62%, ${alpha})`;
        ctx.fill();
      });

      // Logo text appears when particles coalesce
      if (progress > 0.55) {
        const a = Math.min((progress - 0.55) / 0.45, 1);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = `bold ${Math.round(64 + a * 12)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#E8A838';
        ctx.shadowColor = '#E8A838';
        ctx.shadowBlur = 30 * a;
        ctx.fillText('INDU', cx, cy - 16);
        ctx.font = `500 15px "Space Grotesk", sans-serif`;
        ctx.fillStyle = '#4ECDC4';
        ctx.shadowColor = '#4ECDC4';
        ctx.shadowBlur = 12 * a;
        ctx.letterSpacing = '0.25em';
        ctx.fillText('FOUNDATION', cx, cy + 28);
        ctx.restore();
      }

      // Progress bar
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(cx - 140, cy + 64, 280, 1.5);
      ctx.fillStyle = '#E8A838';
      ctx.shadowColor = '#E8A838';
      ctx.shadowBlur = 6;
      ctx.fillRect(cx - 140, cy + 64, 280 * progress, 1.5);
      ctx.shadowBlur = 0;

      // Progress number
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText(`${loadProgress}%`, cx, cy + 84);

      if (progress < 1) {
        preloaderAnimId = requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          preloaderFading = true;
          setTimeout(() => {
            preloaderVisible = false;
            heroHeadlineVisible = true;
          }, 700);
        }, 500);
      }
    }
    preloaderAnimId = requestAnimationFrame(frame);
  }

  // ─── Three.js Aurora Scene ────────────────────────────────────────────────
  async function initThree() {
    if (!browser || !canvasEl) return;
    const THREE = await import('three');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    threeRenderer = renderer;

    // Aurora vertex shader
    const vertexShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying float vDisp;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      float snoise(vec3 v) {
        const vec2 C = vec2(1./6., 1./3.);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - 0.5;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0., i1.z, i2.z, 1.)) +
          i.y + vec4(0., i1.y, i2.y, 1.)) +
          i.x + vec4(0., i1.x, i2.x, 1.));
        vec4 m = max(0.6 - vec4(
          dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.);
        m = m * m;
        return 42. * dot(m*m, vec4(
          dot(p.xyz, x0), dot(p.yzx, x1),
          dot(p.zxy, x2), dot(p.wxy, x3)));
      }

      void main() {
        vNormal = normalMatrix * normal;
        float n = snoise(position * 1.5 + uTime * 0.3);
        float n2 = snoise(position * 2.8 - uTime * 0.15);
        vDisp = n * 0.5 + n2 * 0.25;
        vec3 displaced = position + normal * vDisp * 0.35;
        vPos = displaced;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying float vDisp;

      void main() {
        vec3 navy  = vec3(0.102, 0.102, 0.18);
        vec3 teal  = vec3(0.306, 0.804, 0.769);
        vec3 gold  = vec3(0.91, 0.659, 0.22);
        vec3 violet = vec3(0.5, 0.2, 0.9);

        float t = uTime * 0.2;
        float phase = vPos.y * 1.2 + vPos.x * 0.8 + t;
        float aurora = sin(phase) * 0.5 + 0.5;
        float aurora2 = sin(phase * 1.7 + 1.4) * 0.5 + 0.5;

        vec3 col = mix(navy, teal, aurora * 0.6);
        col = mix(col, gold, aurora2 * 0.4 * (vDisp + 0.5));
        col = mix(col, violet, sin(phase * 0.5) * 0.3);

        // Edge glow
        float fresnel = 1.0 - abs(dot(normalize(vNormal), vec3(0., 0., 1.)));
        col += teal * pow(fresnel, 3.0) * 0.8;
        col += gold * pow(fresnel, 6.0) * 0.4;

        gl_FragColor = vec4(col, 0.92);
      }
    `;

    const geometry = new THREE.IcosahedronGeometry(2.2, 4);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      side: THREE.FrontSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4ECDC4, wireframe: true, transparent: true, opacity: 0.06
    });
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(2.22, 2), wireMat);
    scene.add(wireMesh);

    // Scroll-linked rotation
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let t = 0;
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      t += 0.008;
      material.uniforms.uTime.value = t;
      mesh.rotation.y = t * 0.15 + scrollY * 0.0005;
      mesh.rotation.x = Math.sin(t * 0.2) * 0.2 + scrollY * 0.0003;
      wireMesh.rotation.y = mesh.rotation.y;
      wireMesh.rotation.x = mesh.rotation.x;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }

  // ─── Scroll Observer for Nav + Stats ─────────────────────────────────────
  function initScrollObservers() {
    if (!browser) return;

    // Stats counter
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        stats.forEach((s, i) => {
          const dur = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            statValues[i] = Math.round(eased * s.target);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        });
        statsObserver.disconnect();
      },
      { threshold: 0.5 }
    );
    if (statsSection) statsObserver.observe(statsSection);
  }

  // ─── Newsletter Submit ────────────────────────────────────────────────────
  async function submitNewsletter(e: SubmitEvent) {
    e.preventDefault();
    if (!newsletterEmail) return;
    newsletterSubmitting = true;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      newsletterSubmitted = true;
    } catch { } finally {
      newsletterSubmitting = false;
    }
  }

  onMount(() => {
    runPreloader();
    initScrollObservers();

    let cleanupThree: () => void;
    let cleanupGsap: (() => void) | undefined;

    (async () => {
      cleanupThree = await initThree() || (() => {});

      // GSAP scroll animations (loaded async)
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          // Problem cards scroll-in
          document.querySelectorAll('.problem-card').forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -15 : 15 },
              { opacity: 1, x: 0, rotateY: 0, duration: 0.8, delay: i * 0.1,
                scrollTrigger: { trigger: card, start: 'top 85%' } }
            );
          });

          // Feature cards
          document.querySelectorAll('.feature-card').forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: 60, scale: 0.92 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.05,
                scrollTrigger: { trigger: card, start: 'top 90%' } }
            );
          });
        });
        cleanupGsap = () => ctx.revert();
      } catch { /* GSAP not available */ }
    })();

    return () => {
      if (cleanupThree) cleanupThree();
      if (cleanupGsap) cleanupGsap();
    };
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(animFrameId);
      cancelAnimationFrame(preloaderAnimId);
    }
    if (threeRenderer) threeRenderer.dispose();
  });
</script>

<!-- ═══════════════════════════════════════════════ PRELOADER -->
{#if preloaderVisible}
<div class="preloader" class:fading={preloaderFading}>
  <canvas bind:this={preloaderCanvasEl}></canvas>
  <div class="preloader-progress">{loadProgress}%</div>
</div>
{/if}

<!-- ═══════════════════════════════════════════════ HERO -->
<section class="hero" bind:this={heroSection}>
  <canvas bind:this={canvasEl} class="hero-canvas"></canvas>

  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-pulse"></span>
      Open RFC · Language Design in Public
    </div>

    <h1 class="hero-headline">
      <span class="line1">
        {#each headline1 as char, i}
          <span class="char" style="--i:{i}" class:visible={heroHeadlineVisible}>{char === ' ' ? '\u00A0' : char}</span>
        {/each}
      </span>
      <span class="line2">
        {#each headline2 as char, i}
          <span class="char" style="--i:{i + headline1.length + 2}" class:visible={heroHeadlineVisible}>{char === ' ' ? '\u00A0' : char}</span>
        {/each}
      </span>
    </h1>

    <p class="hero-sub" class:visible={heroHeadlineVisible}>
      A compiled, multi-paradigm language where <code>agent</code>, <code>tensor</code>, and <code>sync let</code>
      are first-class citizens. Not libraries. Keywords.
    </p>

    <div class="hero-ctas" class:visible={heroHeadlineVisible}>
      <a href="/docs/getting-started/installation" class="btn-primary">
        Start Building
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <a href="/playground" class="btn-ghost">Try in Browser</a>
    </div>

    <div class="hero-code-snippet" class:visible={heroHeadlineVisible}>
      <span class="code-label">Quick look:</span>
      <pre><code><span class="kw">agent</span> <span class="fn">SummaryBot</span> {"{"}
  <span class="kw">fn</span> <span class="fn">handle</span>(url: <span class="ty">str</span>) → <span class="ty">Result</span>&lt;<span class="ty">str</span>&gt; {"{"}
    <span class="kw">let</span> page = nexus.fetch(url).<span class="kw">await</span>?;
    page.summarize(model: <span class="st">"phi-3"</span>, max_tokens: <span class="num">200</span>)
  {"}"}
{"}"}</code></pre>
    </div>
  </div>

  <div class="scroll-indicator">
    <span>Scroll</span>
    <div class="scroll-arrow"></div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════ PROBLEM SECTION -->
<section class="section-problem">
  <div class="container">
    <div class="section-label">The Problem</div>
    <h2>Six years of developer<br/>pain. One root cause.</h2>
    <p class="section-desc">Fragmentation. We've been building 2026 software with 1995 thinking.</p>

    <div class="problems-grid">
      {#each problems as problem, i}
        <div class="problem-card">
          <div class="problem-year">{problem.year}</div>
          <div class="problem-title">{problem.title}</div>
          <div class="problem-desc">{problem.desc}</div>
          <pre class="problem-code"><code>{problem.code}</code></pre>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════ SOLUTION SECTION -->
<section class="section-solution">
  <div class="container">
    <div class="section-label">The Solution</div>
    <h2>Eight primitives.<br/>One language.</h2>

    <div class="features-grid">
      {#each features as feature, i}
        <div class="feature-card">
          <div class="feature-icon">{feature.icon}</div>
          <div class="feature-title">{feature.title}</div>
          <div class="feature-desc">{feature.desc}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════ CODE COMPARISON -->
<section class="section-compare">
  <div class="container">
    <div class="section-label">The Proof</div>
    <h2>Side by side.</h2>

    {#each codeComparisons as comp}
      <div class="compare-block">
        <h3>{comp.title}</h3>
        <div class="compare-panels">
          <div class="compare-before">
            <div class="compare-header">
              <span class="lang-badge before">{comp.before.lang}</span>
              <span class="lines-badge">{comp.before.lines} lines</span>
            </div>
            <pre><code>{comp.before.code}</code></pre>
          </div>
          <div class="compare-arrow">→</div>
          <div class="compare-after">
            <div class="compare-header">
              <span class="lang-badge after">{comp.after.lang}</span>
              <span class="lines-badge indu">{comp.after.lines} lines</span>
            </div>
            <pre><code>{comp.after.code}</code></pre>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- ═══════════════════════════════════════════════ STATS -->
<section class="section-stats" bind:this={statsSection}>
  <div class="container">
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="stat-item">
          <div class="stat-value">
            {statValues[i]}{stat.suffix}
          </div>
          <div class="stat-label">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════ CTA / NEWSLETTER -->
<section class="section-cta">
  <div class="container">
    <div class="cta-inner">
      <h2>Join the frontier.</h2>
      <p>Get the INDU Signal — monthly updates on language development, RFCs, and community projects.</p>

      {#if newsletterSubmitted}
        <div class="newsletter-success">
          <span>✓</span> You're in. First issue drops soon.
        </div>
      {:else}
        <form class="newsletter-form" onsubmit={submitNewsletter}>
          <input
            type="email"
            bind:value={newsletterEmail}
            placeholder="your@email.dev"
            required
          />
          <button type="submit" disabled={newsletterSubmitting}>
            {newsletterSubmitting ? 'Joining...' : 'Join →'}
          </button>
        </form>
      {/if}

      <div class="cta-links">
        <a href="https://github.com/indu-lang/indu" target="_blank" rel="noreferrer">★ Star on GitHub</a>
        <a href="/foundation/rfcs">Read open RFCs</a>
        <a href="/community">Join Discord</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* ── CSS Custom Properties ────────────────────────────────────────── */
  :root {
    --primary: #1A1A2E;
    --gold: #E8A838;
    --teal: #4ECDC4;
    --bg: #0d0d1a;
    --surface: #12121f;
    --border: rgba(255,255,255,0.08);
    --text: #F8F6F0;
    --text-muted: rgba(248,246,240,0.55);
    --font-display: 'Space Grotesk', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    --ease-out: cubic-bezier(0.19,1,0.22,1);
  }

  /* ── Reset ────────────────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Preloader ────────────────────────────────────────────────────── */
  .preloader {
    position: fixed; inset: 0; z-index: 9999;
    transition: opacity 0.7s var(--ease-out);
  }
  .preloader.fading { opacity: 0; pointer-events: none; }
  .preloader canvas { width: 100%; height: 100%; }
  .preloader-progress { display: none; }

  /* ── Hero ─────────────────────────────────────────────────────────── */
  .hero {
    position: relative; height: 100vh; min-height: 700px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; background: var(--bg);
  }
  .hero-canvas {
    position: absolute; inset: 0; width: 100%; height: 100%;
    opacity: 0.8;
  }
  .hero-content {
    position: relative; z-index: 2;
    max-width: 900px; text-align: center;
    padding: 0 24px;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border: 1px solid var(--border);
    border-radius: 999px; font-family: var(--font-mono);
    font-size: 0.75rem; color: var(--teal); margin-bottom: 32px;
    background: rgba(78,205,196,0.08);
  }
  .badge-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s ease-in-out infinite;
  }
  .hero-headline {
    font-family: var(--font-display); font-weight: 800;
    font-size: clamp(3.5rem, 9vw, 8rem);
    line-height: 0.95; letter-spacing: -0.03em;
    color: var(--text); margin-bottom: 28px;
  }
  .line1, .line2 { display: block; }
  .line2 { color: var(--gold); }
  .char {
    display: inline-block;
    opacity: 0; transform: translateY(40px) rotate(8deg);
    transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
    transition-delay: calc(var(--i) * 0.04s + 0.1s);
  }
  .char.visible { opacity: 1; transform: none; }
  .hero-sub {
    font-family: var(--font-display); font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--text-muted); line-height: 1.6; margin-bottom: 36px;
    max-width: 640px; margin-left: auto; margin-right: auto;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out) 0.8s, transform 0.6s var(--ease-out) 0.8s;
  }
  .hero-sub.visible { opacity: 1; transform: none; }
  .hero-sub code {
    font-family: var(--font-mono); background: rgba(232,168,56,0.12);
    color: var(--gold); padding: 2px 6px; border-radius: 4px; font-size: 0.95em;
  }
  .hero-ctas {
    display: flex; gap: 16px; justify-content: center; margin-bottom: 48px;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out) 1s, transform 0.6s var(--ease-out) 1s;
  }
  .hero-ctas.visible { opacity: 1; transform: none; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; background: var(--gold); color: var(--primary);
    font-family: var(--font-display); font-weight: 700; font-size: 1rem;
    border-radius: 8px; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(232,168,56,0.35);
  }
  .btn-ghost {
    display: inline-flex; align-items: center;
    padding: 14px 28px; border: 1px solid rgba(248,246,240,0.2);
    color: var(--text); font-family: var(--font-display);
    font-weight: 500; font-size: 1rem; border-radius: 8px;
    text-decoration: none; transition: border-color 0.2s, background 0.2s;
  }
  .btn-ghost:hover { border-color: var(--teal); background: rgba(78,205,196,0.07); }

  .hero-code-snippet {
    font-family: var(--font-mono); font-size: 0.82rem;
    background: rgba(0,0,0,0.4); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px 20px; text-align: left;
    max-width: 480px; margin: 0 auto;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out) 1.2s, transform 0.6s var(--ease-out) 1.2s;
  }
  .hero-code-snippet.visible { opacity: 1; transform: none; }
  .code-label {
    font-size: 0.7rem; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.1em;
    display: block; margin-bottom: 8px;
  }
  .hero-code-snippet pre { margin: 0; white-space: pre; overflow-x: auto; }
  .kw { color: #C792EA; } .fn { color: #82AAFF; }
  .ty { color: #4ECDC4; } .st { color: #C3E88D; }
  .num { color: #F78C6C; }

  .scroll-indicator {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--text-muted); font-family: var(--font-mono); font-size: 0.7rem;
    letter-spacing: 0.15em; animation: scrollBounce 2s ease-in-out infinite;
  }
  .scroll-arrow {
    width: 20px; height: 20px;
    border-right: 1.5px solid var(--text-muted);
    border-bottom: 1.5px solid var(--text-muted);
    transform: rotate(45deg);
  }

  /* ── Sections ─────────────────────────────────────────────────────── */
  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .section-label {
    font-family: var(--font-mono); font-size: 0.72rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 16px;
  }
  section h2 {
    font-family: var(--font-display); font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.1;
    letter-spacing: -0.02em; color: var(--text); margin-bottom: 16px;
  }
  .section-desc { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 64px; }

  .section-problem { padding: 120px 0; background: var(--bg); }
  .problems-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px; margin-top: 64px;
  }
  .problem-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 28px; overflow: hidden;
  }
  .problem-year {
    font-family: var(--font-mono); font-size: 0.75rem;
    color: var(--gold); letter-spacing: 0.1em; margin-bottom: 8px;
  }
  .problem-title {
    font-family: var(--font-display); font-weight: 700;
    font-size: 1.1rem; color: var(--text); margin-bottom: 6px;
  }
  .problem-desc { color: var(--text-muted); font-size: 0.875rem; margin-bottom: 16px; }
  .problem-code {
    background: #0d1117; border-radius: 6px; padding: 12px;
    font-family: var(--font-mono); font-size: 0.72rem;
    color: rgba(248,246,240,0.65); overflow-x: auto; white-space: pre;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .section-solution { padding: 120px 0; background: var(--primary); }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px; margin-top: 64px;
  }
  .feature-card {
    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
    border-radius: 12px; padding: 28px;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .feature-card:hover {
    border-color: var(--gold);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(232,168,56,0.1);
  }
  .feature-icon { font-size: 2rem; margin-bottom: 12px; }
  .feature-title {
    font-family: var(--font-display); font-weight: 700;
    color: var(--text); margin-bottom: 8px;
  }
  .feature-desc { color: var(--text-muted); font-size: 0.875rem; line-height: 1.6; }
  .feature-desc code {
    font-family: var(--font-mono); color: var(--gold);
    background: rgba(232,168,56,0.1); padding: 1px 5px; border-radius: 3px;
    font-size: 0.9em;
  }

  .section-compare { padding: 120px 0; background: var(--bg); }
  .compare-block { margin-top: 64px; }
  .compare-block h3 {
    font-family: var(--font-display); font-size: 1.25rem;
    color: var(--text-muted); margin-bottom: 20px;
  }
  .compare-panels {
    display: grid; grid-template-columns: 1fr 40px 1fr; gap: 0;
    align-items: start; margin-bottom: 48px;
  }
  .compare-arrow {
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-size: 1.5rem; padding-top: 52px;
  }
  .compare-before, .compare-after {
    border-radius: 10px; overflow: hidden;
  }
  .compare-before { border: 1px solid rgba(255,80,80,0.2); }
  .compare-after { border: 1px solid rgba(78,205,196,0.3); }
  .compare-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 16px; background: rgba(255,255,255,0.04);
    border-bottom: 1px solid var(--border);
  }
  .lang-badge {
    font-family: var(--font-mono); font-size: 0.72rem;
    padding: 3px 8px; border-radius: 4px; font-weight: 600;
  }
  .lang-badge.before { background: rgba(255,80,80,0.1); color: #FF6B6B; }
  .lang-badge.after { background: rgba(78,205,196,0.1); color: var(--teal); }
  .lines-badge { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); }
  .lines-badge.indu { color: var(--teal); font-weight: 600; }
  .compare-before pre, .compare-after pre {
    background: #0d1117; padding: 16px;
    font-family: var(--font-mono); font-size: 0.75rem;
    color: rgba(248,246,240,0.75); overflow-x: auto; margin: 0;
  }

  .section-stats { padding: 100px 0; background: var(--primary); }
  .stats-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 48px; text-align: center;
  }
  .stat-value {
    font-family: var(--font-display); font-weight: 800;
    font-size: clamp(3rem, 8vw, 6rem);
    color: var(--gold); line-height: 1;
    text-shadow: 0 0 40px rgba(232,168,56,0.4);
  }
  .stat-label {
    font-family: var(--font-display); color: var(--text-muted);
    font-size: 1rem; margin-top: 12px;
  }

  .section-cta { padding: 120px 0; background: var(--bg); }
  .cta-inner {
    max-width: 560px; margin: 0 auto; text-align: center;
  }
  .cta-inner h2 { margin-bottom: 16px; }
  .cta-inner p { color: var(--text-muted); margin-bottom: 36px; }
  .newsletter-form {
    display: flex; gap: 0; border-radius: 8px;
    border: 1px solid var(--border); overflow: hidden;
    background: var(--surface);
  }
  .newsletter-form input {
    flex: 1; padding: 14px 16px; background: none; border: none;
    color: var(--text); font-family: var(--font-display); outline: none;
    font-size: 0.95rem;
  }
  .newsletter-form input::placeholder { color: var(--text-muted); }
  .newsletter-form button {
    padding: 14px 24px; background: var(--gold); color: var(--primary);
    border: none; font-family: var(--font-display); font-weight: 700;
    font-size: 0.9rem; cursor: pointer; transition: opacity 0.2s;
  }
  .newsletter-form button:hover { opacity: 0.88; }
  .newsletter-form button:disabled { opacity: 0.5; cursor: wait; }
  .newsletter-success {
    padding: 16px; background: rgba(78,205,196,0.1);
    border: 1px solid rgba(78,205,196,0.3); border-radius: 8px;
    color: var(--teal); font-family: var(--font-display);
  }
  .cta-links {
    display: flex; gap: 32px; justify-content: center; margin-top: 32px;
  }
  .cta-links a {
    color: var(--text-muted); text-decoration: none;
    font-family: var(--font-display); font-size: 0.9rem;
    transition: color 0.2s;
  }
  .cta-links a:hover { color: var(--gold); }

  /* ── Animations ───────────────────────────────────────────────────── */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  /* ── Mobile ───────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-links.open {
      display: flex; flex-direction: column;
      position: fixed; top: 72px; left: 0; right: 0;
      background: rgba(13,13,26,0.98); padding: 24px;
      gap: 20px; border-bottom: 1px solid var(--border);
    }
    .hamburger { display: flex; }
    .hero-headline { font-size: clamp(2.5rem, 12vw, 4rem); }
    .hero-ctas { flex-direction: column; align-items: center; }
    .problems-grid { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .compare-panels { grid-template-columns: 1fr; }
    .compare-arrow { display: none; }
    .stats-grid { grid-template-columns: 1fr; gap: 32px; }
    .newsletter-form { flex-direction: column; }
  }
</style>

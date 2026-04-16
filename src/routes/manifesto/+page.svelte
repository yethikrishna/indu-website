<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let containerEl: HTMLElement;
  let animFrameId: number;
  let resizeHandler: (() => void) | undefined;
  let gsapCleanup: (() => void) | undefined;

  const pillars = [
    {
      title: 'Unified AST',
      desc: 'One Abstract Syntax Tree from frontend to backend to hardware. The compiler understands the entire stack, eliminating boundary friction.',
      codeBefore: `// Frontend
fetch('/api/users').then(res => res.json())

// Backend
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    res.json(rows)
  })
})`,
      codeAfter: `// INDU
let users = db.users.all().await?;
return users;`
    },
    {
      title: 'Agent-Native',
      desc: 'AI is not a library. It is a fundamental primitive. Agents are actors with built-in fault tolerance, state, and messaging.',
      codeBefore: `// 50 lines of LangChain bloat
import { ChatOpenAI } from 'langchain/chat_models';
import { initializeAgentExecutor } from 'langchain/agents';
// + Memory + VectorStore + Callbacks...`,
      codeAfter: `// INDU
agent SupportBot {
    model: nexus.gpt4(),
    tools: [KnowledgeBase]
}`
    },
    {
      title: 'Memory-Safe',
      desc: 'Deterministic ARC (Automatic Reference Counting). Zero garbage collection pauses. No borrow checker battles.',
      codeBefore: `// C++
int* ptr = new int(10);
// Hope you remember to delete ptr;
// Or use std::shared_ptr and fight the syntax

// Rust
// Lifetime annotations everywhere
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {`,
      codeAfter: `// INDU
let user = User.new("Alice");
// Memory is freed exactly when 'user' 
// goes out of scope. No pauses.`
    },
    {
      title: 'Compiled Speed',
      desc: 'Compiles down to optimized machine code, WebAssembly, or WebGPU compute shaders. C-like performance by default.',
      codeBefore: `// Python
# Interpreted, GIL-locked, dynamic types
def calculate():
    sum = 0
    for i in range(1000000):
        sum += i
    return sum`,
      codeAfter: `// INDU
// Compiles to vectorized SIMD instructions
fn calculate() -> u64 {
    let mut sum: u64 = 0;
    for i in 0..1000000 { sum += i; }
    return sum;
}`
    },
    {
      title: 'Human Readable',
      desc: 'Python ergonomics for prototyping, Rust precision for production. You should be able to read code written 6 months ago.',
      codeBefore: `// Haskell
traverse_ (\\x -> putStrLn $ "Value: " ++ show x) [1..5]

// Perl
foldl (\\acc x -> acc ++ [x * 2]) [] [1..5]`,
      codeAfter: `// INDU
for x in 1..=5 {
    print(f"Value: {x * 2}");
}`
    }
  ];

  onMount(() => {
    if (!browser) return;

    // ── GSAP Horizontal Scroll ────────────────────────────────────────────
    (async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          // Hero fade in
          gsap.fromTo('.manifesto-hero h1',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
          );
          gsap.fromTo('.manifesto-hero p',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
          );

          // Pinned horizontal scroll
          const panels = gsap.utils.toArray('.panel');

          // FIX #1: Assign tween to a variable so containerAnimation can reference it directly
          // FIX #7: Correct scroll distance — use window.innerWidth * (panels.length - 1)
          const scrollTween = gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: '.manifesto-scroll-container',
              pin: true,
              scrub: 1,
              snap: 1 / (panels.length - 1),
              end: () => '+=' + (window.innerWidth * (panels.length - 1))
            }
          });

          // Animate content inside each panel — FIX: pass scrollTween directly, not gsap.getById
          panels.forEach((panel: any) => {
            gsap.fromTo(
              panel.querySelectorAll('.panel-content > *'),
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween, // FIX: direct reference, not getById
                  start: 'left center',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });

          // CTA section
          gsap.fromTo(
            '.manifesto-cta .cta-inner',
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              scrollTrigger: { trigger: '.manifesto-cta', start: 'top 80%' }
            }
          );
        });

        // FIX #2: Store cleanup reference for onDestroy (not in onMount return)
        gsapCleanup = () => ctx.revert();
      } catch (e) {
        console.error('GSAP failed to load', e);
      }
    })();

    // ── Starfield Canvas ──────────────────────────────────────────────────
    const canvas = document.getElementById('starfield') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // FIX #6: Store resize handler reference so we can remove it in onDestroy
        resizeHandler = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeHandler);
        resizeHandler();

        const stars = Array.from({ length: 200 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2 + 0.05,
          opacity: Math.random()
        }));

        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) {
              star.y = canvas.height;
              star.x = Math.random() * canvas.width;
            }
            ctx.fillStyle = `rgba(248, 246, 240, ${star.opacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
          });
        };
        animate();
      }
    }
  });

  // FIX #2 + #6: All cleanup in onDestroy — guarantees it runs even on fast navigation
  onDestroy(() => {
    if (gsapCleanup) gsapCleanup();
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
  });
</script>

<svelte:head>
  <title>Manifesto | INDU Foundation</title>
  <meta name="description" content="We've been building 2026 software with 1995 thinking. The INDU Manifesto." />
</svelte:head>

<div class="manifesto-page">
  <canvas id="starfield" class="starfield"></canvas>

  <section class="manifesto-hero">
    <div class="container">
      <h1>We are building 2026 software<br/>with 1995 thinking.</h1>
      <p>The tech stack is fractured. Frontend, backend, database, infrastructure, and now AI—each isolated in its own silo, glued together by fragile network calls and serialization layers.</p>
      <div class="scroll-indicator">
        <span>The 5 Pillars</span>
        <div class="scroll-line"></div>
      </div>
    </div>
  </section>

  <section bind:this={containerEl} class="manifesto-scroll-container">
    <div class="panels-wrapper">
      {#each pillars as pillar, i}
        <div class="panel">
          <div class="panel-inner container">
            <div class="panel-number">0{i + 1}</div>
            <div class="panel-content">
              <h2>{pillar.title}</h2>
              <p>{pillar.desc}</p>
              <div class="compare-block">
                <div class="compare-col before">
                  <div class="compare-label">The Old Way</div>
                  <pre><code>{pillar.codeBefore}</code></pre>
                </div>
                <div class="compare-col after">
                  <div class="compare-label">The INDU Way</div>
                  <pre><code>{pillar.codeAfter}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section class="manifesto-cta">
    <div class="container">
      <div class="cta-inner">
        <h2>The frontier is open.</h2>
        <p>INDU is an open-source, community-driven language designed for the next generation of computing.</p>
        <div class="cta-actions">
          <a href="https://github.com/indu-lang/indu" class="btn-primary" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
          <a href="/playground" class="btn-secondary">Try the Playground</a>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .manifesto-page {
    background-color: var(--bg-base);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .manifesto-hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .manifesto-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }

  .manifesto-hero p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-secondary);
    max-width: 600px;
    line-height: 1.7;
  }

  .scroll-indicator {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 3rem;
    color: var(--text-muted);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .scroll-line {
    flex: 1;
    max-width: 80px;
    height: 1px;
    background: linear-gradient(90deg, var(--color-accent), transparent);
  }

  /* ── Scroll Container ─────────────────────────────────── */
  .manifesto-scroll-container {
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .panels-wrapper {
    display: flex;
    width: 500vw;
    will-change: transform;
  }

  .panel {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .panel-inner {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 48px;
    align-items: start;
  }

  .panel-number {
    font-family: var(--font-mono);
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-accent);
    opacity: 0.3;
    line-height: 1;
  }

  .panel-content h2 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .panel-content > p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 520px;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  /* ── Compare Block ────────────────────────────────────── */
  .compare-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .compare-col {
    border-radius: 8px;
    overflow: hidden;
  }

  .compare-label {
    padding: 8px 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .compare-col.before .compare-label {
    background-color: rgba(255, 59, 59, 0.1);
    color: #ff6b6b;
    border-bottom: 1px solid rgba(255, 59, 59, 0.2);
  }

  .compare-col.after .compare-label {
    background-color: rgba(78, 205, 196, 0.1);
    color: var(--color-tertiary);
    border-bottom: 1px solid rgba(78, 205, 196, 0.2);
  }

  .compare-col pre {
    margin: 0;
    padding: 16px;
    background-color: var(--bg-surface);
    overflow-x: auto;
  }

  .compare-col code {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .compare-col.after code {
    color: var(--text-primary);
  }

  /* ── CTA ──────────────────────────────────────────────── */
  .manifesto-cta {
    position: relative;
    z-index: 1;
    padding: 120px 0;
    text-align: center;
  }

  .cta-inner h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .cta-inner > p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  .cta-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: var(--color-accent);
    color: var(--bg-base);
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background-color: var(--color-secondary);
    transform: translateY(-2px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    padding: 14px 28px;
    border: 1px solid var(--border-default);
    color: var(--text-primary);
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-secondary:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
  }
</style>

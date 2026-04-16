<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let containerEl: HTMLElement;
  let animFrameId: number;

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

    let cleanupGsap: (() => void) | undefined;

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

          // Pinned scroll section
          const panels = gsap.utils.toArray('.panel');
          
          // Pin the container and horizontal scroll the panels
          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: ".manifesto-scroll-container",
              pin: true,
              scrub: 1,
              snap: 1 / (panels.length - 1),
              end: () => "+=" + (containerEl.offsetWidth * panels.length)
            }
          });

          // Animate content inside panels as they scroll
          panels.forEach((panel: any, i) => {
            gsap.fromTo(panel.querySelectorAll('.panel-content > *'),
              { opacity: 0, y: 40 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: gsap.getById("scrollTween"), // Link to the horizontal scroll
                  start: "left center",
                  toggleActions: "play none none reverse"
                }
              }
            );
          });
          
          // CTA Section
          gsap.fromTo('.manifesto-cta .cta-inner',
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1, scale: 1, duration: 0.8,
              scrollTrigger: { trigger: '.manifesto-cta', start: 'top 80%' }
            }
          );
        });

        cleanupGsap = () => ctx.revert();
      } catch (e) {
        console.error("GSAP failed to load", e);
      }
    })();

    // Starfield background
    const canvas = document.getElementById('starfield') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

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

    return () => {
      if (cleanupGsap) cleanupGsap();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
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

  /* ── Hero ────────────────────────────────────────────── */
  .manifesto-hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    z-index: 1;
    padding-top: 72px; /* Nav offset */
  }

  .manifesto-hero .container {
    max-width: 1000px;
  }

  .manifesto-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
    background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-muted) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .manifesto-hero p {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    color: var(--text-secondary);
    max-width: 800px;
    line-height: 1.6;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 60px;
    left: var(--sp-6);
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .scroll-line {
    width: 60px;
    height: 1px;
    background-color: var(--color-accent);
    transform-origin: left;
    animation: scaleLine 2s ease-in-out infinite;
  }

  @keyframes scaleLine {
    0% { transform: scaleX(0); opacity: 0; }
    50% { transform: scaleX(1); opacity: 1; }
    100% { transform: scaleX(0); opacity: 0; transform-origin: right; }
  }

  /* ── Scroll Section ──────────────────────────────────── */
  .manifesto-scroll-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 2;
    background-color: var(--bg-surface);
  }

  .panels-wrapper {
    display: flex;
    width: 500%; /* 5 panels */
    height: 100%;
  }

  .panel {
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .panel-inner {
    display: flex;
    align-items: flex-start;
    gap: 80px;
    width: 100%;
  }

  .panel-number {
    font-family: var(--font-display);
    font-size: 12rem;
    font-weight: 800;
    line-height: 0.8;
    color: rgba(255, 255, 255, 0.03);
    user-select: none;
  }

  .panel-content {
    flex: 1;
    max-width: 700px;
  }

  .panel h2 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: var(--color-secondary);
    margin-bottom: 24px;
    line-height: 1.1;
  }

  .panel p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 48px;
    line-height: 1.6;
  }

  /* ── Compare Block ───────────────────────────────────── */
  .compare-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .compare-col {
    background: #0D0D1A;
    border: 1px solid var(--border-default);
    border-radius: 12px;
    overflow: hidden;
  }

  .compare-col.before {
    border-color: rgba(255, 107, 107, 0.2);
  }

  .compare-col.after {
    border-color: rgba(78, 205, 196, 0.3);
  }

  .compare-label {
    padding: 12px 16px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px solid var(--border-default);
  }

  .before .compare-label {
    color: #FF6B6B;
    background: rgba(255, 107, 107, 0.05);
  }

  .after .compare-label {
    color: var(--color-accent);
    background: rgba(78, 205, 196, 0.05);
  }

  .compare-col pre {
    margin: 0;
    padding: 20px;
    background: transparent;
    border: none;
    font-size: 0.85rem;
    color: var(--text-secondary);
    overflow-x: auto;
  }

  /* ── CTA Section ─────────────────────────────────────── */
  .manifesto-cta {
    position: relative;
    z-index: 2;
    padding: 160px 0;
    background: var(--bg-base);
    text-align: center;
  }

  .cta-inner {
    max-width: 600px;
    margin: 0 auto;
    padding: 64px 40px;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: 24px;
    box-shadow: var(--shadow-xl);
  }

  .manifesto-cta h2 {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  .manifesto-cta p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 40px;
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .btn-primary, .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--color-secondary);
    color: var(--bg-base);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(232, 168, 56, 0.25);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-default);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--color-accent);
  }

  /* ── Responsive ──────────────────────────────────────── */
  @media (max-width: 960px) {
    .panel-inner {
      flex-direction: column;
      gap: 32px;
    }

    .panel-number {
      font-size: 6rem;
      line-height: 1;
    }

    .compare-block {
      grid-template-columns: 1fr;
    }
    
    .cta-actions {
      flex-direction: column;
    }
  }
</style>

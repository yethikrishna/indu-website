# INDU FOUNDATION — COMPLETE BRAND BOOK

### Version 1.0 · Universal Intelligence, Precision & Warmth

***

## SECTION 1: LOGO SYSTEM

### Chosen Direction: "The Weave" — Interconnected Intelligence

The INDU Foundation logo is a geometric knot formed by three interlocking arcs, creating a continuous loop with no beginning or end — Borromean-ring inspired. Three strokes that pass over and under each other, forming a triangular negative space at the center. Removing any one arc collapses the structure — a metaphor for interdependence.

#### Primary Logo Mark SVG (The Weave)

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <defs>
    <style>
      .arc1 { fill: none; stroke: #1A1A2E; stroke-width: 8; stroke-linecap: round; }
      .arc2 { fill: none; stroke: #E8A838; stroke-width: 8; stroke-linecap: round; }
      .arc3 { fill: none; stroke: #4ECDC4; stroke-width: 8; stroke-linecap: round; }
    </style>
  </defs>
  <!-- Arc 1: Top arc (0°) -->
  <path class="arc1" d="M 50 12 A 38 38 0 0 1 83 62"/>
  <path class="arc1" d="M 80 67 A 38 38 0 0 1 17 62"/>
  <!-- Arc 2: Bottom-right arc (120°) -->
  <path class="arc2" d="M 83 62 A 38 38 0 0 1 29 85"/>
  <path class="arc2" d="M 24 83 A 38 38 0 0 1 20 38"/>
  <!-- Arc 3: Bottom-left arc (240°) -->
  <path class="arc3" d="M 17 62 A 38 38 0 0 1 50 12"/>
  <path class="arc3" d="M 21 35 A 38 38 0 0 1 76 85"/>
</svg>
```

#### Dark Mode Variant SVG (White on dark)

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <rect width="100" height="100" fill="#1A1A2E" rx="12"/>
  <defs>
    <style>
      .arc1-dm { fill: none; stroke: #FFFFFF; stroke-width: 8; stroke-linecap: round; }
      .arc2-dm { fill: none; stroke: #E8A838; stroke-width: 8; stroke-linecap: round; }
      .arc3-dm { fill: none; stroke: #4ECDC4; stroke-width: 8; stroke-linecap: round; }
    </style>
  </defs>
  <path class="arc1-dm" d="M 50 12 A 38 38 0 0 1 83 62"/>
  <path class="arc1-dm" d="M 80 67 A 38 38 0 0 1 17 62"/>
  <path class="arc2-dm" d="M 83 62 A 38 38 0 0 1 29 85"/>
  <path class="arc2-dm" d="M 24 83 A 38 38 0 0 1 20 38"/>
  <path class="arc3-dm" d="M 17 62 A 38 38 0 0 1 50 12"/>
  <path class="arc3-dm" d="M 21 35 A 38 38 0 0 1 76 85"/>
</svg>
```

#### Monochrome SVG (for print, embroidery)

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <defs>
    <style>
      .mono { fill: none; stroke: #1A1A2E; stroke-width: 8; stroke-linecap: round; }
    </style>
  </defs>
  <path class="mono" d="M 50 12 A 38 38 0 0 1 83 62"/>
  <path class="mono" d="M 80 67 A 38 38 0 0 1 17 62"/>
  <path class="mono" d="M 83 62 A 38 38 0 0 1 29 85"/>
  <path class="mono" d="M 24 83 A 38 38 0 0 1 20 38"/>
  <path class="mono" d="M 17 62 A 38 38 0 0 1 50 12"/>
  <path class="mono" d="M 21 35 A 38 38 0 0 1 76 85"/>
</svg>
```

#### Wordmark CSS Spec

```css
.indu-wordmark {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #1A1A2E;
}
.indu-wordmark .foundation {
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.25em;
  display: block;
  margin-top: 2px;
  color: #6B7280;
}
```

***

## SECTION 2: COLOR PALETTE

### Primary Colors

#### Primary 1 — Cosmic Navy "Deep Mind"

```
HEX:  #1A1A2E
RGB:  26, 26, 46
HSL:  240°, 28%, 14%
CMYK: 43, 43, 0, 82
```

**Usage:** Primary text, logo on light backgrounds, dark-mode backgrounds, document headers.

#### Primary 2 — Warm White "Signal"

```
HEX:  #F8F6F0
RGB:  248, 246, 240
HSL:  40°, 43%, 96%
CMYK: 0, 1, 3, 3
```

**Usage:** Primary backgrounds, text on dark surfaces, breathing space.

### Secondary Colors

#### Secondary 1 — Amber Gold "Forge"

```
HEX:  #E8A838
RGB:  232, 168, 56
HSL:  38°, 79%, 56%
CMYK: 0, 28, 76, 9
```

**Usage:** CTAs, highlights, logo accent, pull quotes, hover states.

#### Secondary 2 — Precision Teal

```
HEX:  #4ECDC4
RGB:  78, 205, 196
HSL:  177°, 54%, 55%
CMYK: 62, 0, 4, 20
```

**Usage:** Code syntax, technical callouts, success states, data visualization.

### Extended Palette

```
#0D1117  — GitHub Midnight (code block backgrounds)
#161B22  — Dark Surface
#21262D  — Elevated Surface
#30363D  — Border/Divider
#58A6FF  — Link Blue (accessible on dark)
#3FB950  — Success Green
#F85149  — Error Red
#E3B341  — Warning Yellow
#79C0FF  — Info Blue
```

### CSS Custom Properties (complete)

```css
:root {
  /* Brand */
  --color-primary: #1A1A2E;
  --color-primary-light: #2D2D4E;
  --color-primary-dark: #0F0F1A;
  --color-secondary: #E8A838;
  --color-secondary-light: #F0BF5A;
  --color-secondary-dark: #C48A1F;
  --color-accent: #4ECDC4;
  --color-accent-light: #70D9D2;
  --color-accent-dark: #2DB8AE;
  --color-bg: #F8F6F0;
  --color-bg-dark: #0D1117;

  /* Typography */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04);
  --shadow-glow-gold: 0 0 20px rgba(232,168,56,0.4), 0 0 60px rgba(232,168,56,0.15);
  --shadow-glow-teal: 0 0 20px rgba(78,205,196,0.4), 0 0 60px rgba(78,205,196,0.15);

  /* Animation */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-cinematic: 1200ms;

  /* Z-Index Scale */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
}
```

***

## SECTION 3: TYPOGRAPHY SYSTEM

### Font Stack

| Role             | Font           | Weight   | Use Case                       |
| ---------------- | -------------- | -------- | ------------------------------ |
| Display/Headings | Space Grotesk  | 700, 800 | Hero headlines, section titles |
| Body             | Inter          | 400, 500 | Body text, UI labels           |
| Monospace        | JetBrains Mono | 400, 500 | Code blocks, terminal output   |

### Installation (app.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale (CSS)

```css
/* Display */
.text-display-xl { font-size: clamp(4rem, 10vw, 9rem); font-weight: 800; line-height: 0.95; letter-spacing: -0.04em; }
.text-display-lg { font-size: clamp(3rem, 7vw, 6rem); font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; }
.text-display-md { font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }

/* Headings */
h1 { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; line-height: 1.1; }
h2 { font-size: clamp(1.75rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); font-weight: 600; line-height: 1.25; }
h4 { font-size: 1.25rem; font-weight: 600; line-height: 1.3; }

/* Body */
.text-body-lg { font-size: 1.125rem; line-height: 1.75; }
.text-body-md { font-size: 1rem; line-height: 1.7; }
.text-body-sm { font-size: 0.875rem; line-height: 1.6; }

/* Code */
.text-code { font-family: var(--font-mono); font-size: 0.9em; }
```

***

## SECTION 4: MOTION PRINCIPLES

### Animation Philosophy

> "Motion should feel like physics, not polish."

Every animation should have a physical analog — gravity, elasticity, inertia. No linear easing. No bounces that don't make sense. The INDU brand moves with **precision and inevitability**.

### Easing Functions

```javascript
// Primary easing — most UI animations
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1]; // Fast out, dramatic deceleration

// Cinematic — scroll-driven, hero elements
const EASE_CINEMATIC = [0.76, 0, 0.24, 1]; // Slow in, slow out

// Interactive — buttons, hover states
const EASE_SPRING = [0.175, 0.885, 0.32, 1.275]; // Slight overshoot

// Stagger delays
const STAGGER_FAST = 0.05;    // 50ms between items
const STAGGER_NORMAL = 0.1;   // 100ms between items
const STAGGER_SLOW = 0.15;    // 150ms between items
```

### Duration Scale

| Context   | Duration    | Use Case                        |
| --------- | ----------- | ------------------------------- |
| Micro     | 100-150ms   | Button press, checkbox          |
| Fast      | 200-300ms   | Hover, dropdown open            |
| Normal    | 300-500ms   | Page transitions, modals        |
| Slow      | 600-800ms   | Hero reveals, section entrances |
| Cinematic | 1000-2000ms | Scroll-driven narratives        |

***

## SECTION 5: BRAND MANIFESTO (600 words)

### We Build Infrastructure, Not Products

There is a difference between a tool and infrastructure. A tool is built to do a job. Infrastructure is built to make all the jobs possible.

INDU Foundation exists to build infrastructure — not for us, not for now, but for the engineers who will build the things we cannot yet imagine.

We believe the programming languages of the past were built for the world of the past. Python for data scientists. JavaScript for browsers. Rust for systems programmers. Each is excellent at what it was designed for. None was designed for a world where an engineer wakes up and needs to write a distributed AI agent, a WebGPU data visualization, a local-first collaborative document, and a native mobile application — all before lunch.

The INDU Foundation was created to solve that problem. Not by building another specialized tool for a specialized use case, but by rethinking the foundation itself.

**Our commitments:**

**To the language:** INDU will evolve in public, through a transparent RFC process, governed by the people who use and contribute to it. No single company will control its direction. No private roadmap will emerge from a closed room. The language belongs to its community.

**To safety:** We will never compromise on memory safety, type safety, or operational reliability to ship a feature faster. The developers who trust INDU with their production systems deserve a language that has earned that trust.

**To openness:** The INDU specification, the reference compiler, and the standard library will remain open source, permanently. We have structured the Foundation specifically to make this promise legally binding, not just aspirational.

**To the long view:** We make twenty-year decisions. Language ecosystems take decades to mature. We are building for the developers who will still be using INDU in 2046, not for the ones who will write a blog post about it next week.

**To accessibility:** The best programming language in the world is worthless if the documentation is incomprehensible, the tooling is hostile, or the community is unwelcoming. We invest in learning resources, in documentation, in community, as seriously as we invest in the compiler.

**To you:** If you write a program in INDU today, it will run on INDU in ten years. If you report a bug, someone will read it. If you propose a change, the process for evaluating it will be fair and transparent. If you contribute code, you will be credited. If you disagree with a decision, you will have a mechanism to say so and be heard.

This is what it means to be a foundation. Not a company. Not a startup. Not a project with a roadmap that ends when the funding does.

We are building infrastructure. The kind that outlasts its builders.

The INDU Foundation.

***

## SECTION 6: TAGLINES (15 Options, Ranked)

1. **"One language. Every frontier."** — Universal scope, confident
2. **"The language the next decade deserves."** — Forward-looking, ambitious
3. **"Write less ceremony. Ship more reality."** — Developer-first, precise
4. **"Infrastructure for the age of intelligent software."** — Mission statement as tagline
5. **"The AST is the contract."** — Technical, for devs who understand it
6. **"Built for builders who refuse to choose."** — Anti-fragmentation
7. **"Null is a design flaw. We fixed it."** — Provocative, memorable
8. **"Your stack, unified."** — Simple, benefit-first
9. **"Agent-native. Memory-safe. DOM-free."** — Technical trifecta
10. **"When the language thinks like you do."** — Empathetic, aspirational
11. **"Python's ease. Rust's safety. Erlang's soul."** — Comparative anchor
12. **"Ship the impossible."** — Short, energetic, aspirational
13. **"The foundation of what comes next."** — Foundation brand alignment
14. **"Code the way your brain works."** — Cognitive fit
15. **"Open source. Open future."** — Community values anchor

**Recommended primary tagline:** #1 — "One language. Every frontier."
**Recommended secondary:** #4 — "Infrastructure for the age of intelligent software."

***

## SECTION 7: VOICE & TONE GUIDELINES

### Voice Pillars

1. **Technically precise** — We never dumb things down. Our audience is smart.
2. **Confident without arrogance** — We believe in what we're building, but we earn trust.
3. **Direct** — No hedging. Say what you mean.
4. **Human** — We're building tools for people, not benchmarks.

### Tone Rewrites (10 Examples)

| Before (avoid)                                 | After (INDU voice)                                |
| ---------------------------------------------- | ------------------------------------------------- |
| "INDU might be able to help you with..."       | "INDU solves this."                               |
| "Users may experience better performance"      | "10x faster. Measured."                           |
| "We are committed to safety"                   | "Null doesn't exist. The compiler won't let it."  |
| "Please consider contributing"                 | "Build it with us."                               |
| "Our documentation covers many topics"         | "Everything you need to ship. Nothing you don't." |
| "INDU could potentially replace your stack"    | "One language. No compromises."                   |
| "We believe in open source values"             | "The code is yours. It always will be."           |
| "Thank you for your interest in INDU"          | "Welcome to the frontier."                        |
| "INDU has various features for AI development" | "`agent` is a keyword. Not a library."            |
| "Getting started is fairly straightforward"    | "Ten minutes to your first compiled program."     |

***

## SECTION 8: SOCIAL MEDIA SPECS

### Profile Image (400×400px)

* Background: `#1A1A2E`

* Center: The Weave logo mark at 60% canvas size

* No text (icon only for all profile images)

* Export: PNG with transparency for light backgrounds

### OG/Meta Image (1200×630px)

**Layout:**

* Background: `#1A1A2E` with subtle grid pattern (1px lines, 5% opacity)

* Left 50%: INDU wordmark (large, white), tagline below in `#E8A838`

* Right 50%: Code snippet from Hello World example, Shiki-styled

* Bottom strip: `#E8A838` 4px border

* Logo mark: top-left corner, 48px

### Twitter/X Card (1200×600px)

* Same as OG but shorter, tighter layout

* Headline more prominent, code snippet smaller

### LinkedIn Banner (1584×396px)

* Wide format: Logo left, tagline center, tech stack icons right

* Background: gradient `#1A1A2E` → `#2D1A4E`


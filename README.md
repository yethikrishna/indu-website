# INDU Foundation Website

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success.svg)
![Node Version](https://img.shields.io/badge/node-20.x-green)

The official $10M production website for the **INDU Systems Language & Framework**. This repository houses the ultra-high-performance Next.js and GSAP architecture designed to prove the core thesis of INDU: absolute developer ergonomics without sacrificing bare-metal speed.

> **The Two-Language Problem is Dead. Welcome to INDU.**

## ⚡ The Architecture

This website is not just a marketing page; it is a living organism engineered on a strict **Zero-Cost Power Architecture**:

*   **Next.js (App Router):** Pure Static Site Generation (SSG) and Incremental Static Regeneration (ISR) to guarantee instant HTML payloads.
*   **GSAP (GreenSock):** High-fidelity DOM manipulation leveraging ScrollTrigger, Observer, and Flip plugins.
*   **Web Workers:** GSAP tickers and complex Wasm math are offloaded to background threads, ensuring 0ms Total Blocking Time on the main thread.
*   **Interaction-Driven Loading:** Heavy WebGL and GSAP timelines are predictively hydrated (200px before viewport) to preserve initial load performance.
*   **Adaptive Tiers:** Real-time feature detection downgrades WebGL to high-end CSS for low-power devices, guaranteeing 60fps globally.

## 🎯 The Performance Budget

We operate on a **zero-regression policy**. Every commit and pull request must maintain a perfect **100/100 Lighthouse Score** across Performance, Accessibility, Best Practices, and SEO.

*   **CLS (Cumulative Layout Shift):** Strictly `0.000` via Next/Font and build-time calculations.
*   **TBT (Total Blocking Time):** Strictly `< 10ms` via Web Worker offloading.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v20.x or higher)
*   npm (v10.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yethikrishna/indu-website.git
   cd indu-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The site will be available at `http://localhost:3000`.

### Production Build

To verify the strict 100/100 Lighthouse budget locally, run a production build:

```bash
npm run build
npm start
```
*Note: All core pages must compile as `○ (Static)`.*

## 📖 Master Plan & Documentation

The architectural roadmap and narrative strategy for the 1-year $10M build are documented in the `/docs` folder:

*   [1-Year Master Plan](./docs/1_YEAR_MASTER_PLAN.md) - The hourly/weekly breakdown of the 5 phases of development.
*   [The Vision](./docs/THE_VISION.md) - The official press release and launch day copy.
*   [100 Questions Inquisition](./docs/100_QUESTIONS.md) - The foundational design and technical decisions.

## 🤝 Contributing

We welcome contributions from the community. Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request. 

**Critical:** All PRs must pass the `ci.yml` GitHub Actions workflow and maintain the 100/100 performance budget.

## 🔒 Security

For security policies and vulnerability reporting, please refer to our [Security Policy](SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
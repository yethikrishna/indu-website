"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
}

const SECTIONS = [
  { id: "getting-started", title: "Getting Started", content: "The INDU compiler is built in Rust and native C-FFI. Run `indupm install` to fetch dependencies." },
  { id: "actor-model", title: "Actor Model", content: "Use the `agent` keyword to spawn a lightweight, lock-free actor onto the epoll work-stealing thread pool." },
  { id: "crdt-sync", title: "CRDT Syncing", content: "The `sync let` keyword automatically synchronizes variables over WebRTC Data Channels to any connected peers." },
  { id: "webgpu", title: "WebGPU Rendering", content: "INDU AST compiles directly into WGSL, translating structs into `@location(N)` GPU memory layouts." },
  { id: "simd-math", title: "SIMD Tensor Math", content: "Mapped CPU-specific math intrinsics (AVX2 and NEON) for parallel floating-point vector operations." },
  { id: "http3", title: "HTTP/3 QUIC", content: "Parses raw UDP packets natively, decodes variable-length integers for HTTP/3 streaming." },
];

export default function DocsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((context, contextSafe) => {
    if (!containerRef.current) return;

    ScrollTrigger.batch(".doc-section", {
      interval: 0.1,
      batchMax: 3,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 30, overwrite: true }),
      start: "top 85%",
    });

    const links = document.querySelectorAll(".sidebar-link");
    const handleClick = contextSafe!((e: Event) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (target) {
        gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 100 }, ease: "power3.inOut" });
      }
    });

    links.forEach(link => link.addEventListener("click", handleClick));
    return () => links.forEach(link => link.removeEventListener("click", handleClick));

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-32 flex justify-center">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <aside className="hidden md:block col-span-1 sticky top-32 h-fit border-r border-gray-800 pr-8">
          <h3 className="font-mono text-[#00e5ff] text-sm tracking-widest mb-6">INDEX</h3>
          <ul className="space-y-4 font-mono text-sm text-gray-400">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="sidebar-link interactive hover:text-white transition-colors uppercase">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="col-span-3">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-700">
            Documentation
          </h1>
          
          <div className="space-y-32">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="doc-section opacity-0 translate-y-[30px] border-b border-gray-900 pb-16">
                <h2 className="text-4xl font-bold text-[#00e5ff] mb-6">{s.title}</h2>
                <p className="text-xl text-gray-400 leading-relaxed font-sans max-w-3xl">
                  {s.content}
                </p>
                <div className="mt-8 bg-[#111] border border-gray-800 p-6 rounded-lg font-mono text-sm text-gray-300">
                  <span className="text-green-400">{`// Example Snippet`}</span>
                  <br/>
                  <span className="text-purple-400">pub fn</span> execute() {'{'}
                  <br/>
                  &nbsp;&nbsp;println(&quot;Initializing {s.title}...&quot;);
                  <br/>
                  {'}'}
                </div>
              </section>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

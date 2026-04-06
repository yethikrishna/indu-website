"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextToChars } from "@/lib/utils";
import HomeObserverHero from "@/components/HeroObserver";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Split text for horizontal titles
    const titles = gsap.utils.toArray(".panel-title") as HTMLElement[];
    titles.forEach((title) => {
      splitTextToChars(title);
    });

    const panels = gsap.utils.toArray(".horizontal-panel") as HTMLElement[];
    const track = document.querySelector(".horizontal-track") as HTMLElement;

    if (!track) return;

    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-container",
        pin: true,
        scrub: 1,
        end: () => "+=" + track.offsetWidth,
      }
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;
      const chars = panel.querySelectorAll("span");
      gsap.fromTo(chars, 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.05, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-black text-white w-full overflow-hidden">
      
      <HomeObserverHero />

      <section className="horizontal-container h-screen w-full overflow-hidden flex items-center bg-[#0a0a0a]">
        <div className="horizontal-track flex h-full w-[300vw] items-center">
          
          <div className="horizontal-panel w-[100vw] h-full flex flex-col justify-center p-12 md:p-24 bg-[#0a0a0a] border-r border-gray-800">
            <div className="text-[#00e5ff] font-mono mb-4 text-xl tracking-widest">01 // LANGUAGE</div>
            <h2 className="panel-title text-5xl md:text-8xl font-bold uppercase mb-8 leading-none max-w-4xl">The Core Syntax</h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-sans">
              Fluid typing. `agent` keywords. Zero-allocation memory models. INDU is built for speed and concurrency out of the box.
            </p>
          </div>

          <div className="horizontal-panel w-[100vw] h-full flex flex-col justify-center p-12 md:p-24 bg-[#0a0a0a] border-r border-gray-800">
            <div className="text-orange-400 font-mono mb-4 text-xl tracking-widest">02 // FRAMEWORK</div>
            <h2 className="panel-title text-5xl md:text-8xl font-bold uppercase mb-8 leading-none max-w-4xl">Actor Architecture</h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-sans">
              MPSC mailboxes. Work-stealing schedulers. `sync let` CRDTs automatically synchronizing state across nodes without JS.
            </p>
          </div>

          <div className="horizontal-panel w-[100vw] h-full flex flex-col justify-center p-12 md:p-24 bg-[#0a0a0a]">
            <div className="text-purple-400 font-mono mb-4 text-xl tracking-widest">03 // TOOLCHAIN</div>
            <h2 className="panel-title text-5xl md:text-8xl font-bold uppercase mb-8 leading-none max-w-4xl">The Singularity</h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-sans">
              Fully self-hosted. `indupm` SAT-solving package manager. Rust bootstrap compiler natively generating object files.
            </p>
          </div>

        </div>
      </section>

      <div className="h-screen w-full flex items-center justify-center bg-[#050505] border-t border-gray-800">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-gray-500">
          The future is <span className="text-[#00e5ff]">native</span>.
        </h2>
      </div>
    </main>
  );
}

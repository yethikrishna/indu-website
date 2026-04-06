"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Network, Database, Hexagon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const PILLARS = [
  {
    id: "actor",
    title: "Actor Model",
    desc: "Lock-free MPSC mailboxes and Work-Stealing scheduler built deep into the compiler via the `agent` keyword.",
    icon: Network,
    color: "text-[#00e5ff]"
  },
  {
    id: "crdt",
    title: "Local-First CRDTs",
    desc: "Variables marked with `sync let` automatically synchronize across SQLite VFS and WebRTC data channels.",
    icon: Database,
    color: "text-orange-400"
  },
  {
    id: "webgpu",
    title: "WebGPU Render",
    desc: "Bypassing the DOM. The INDU AST compiles directly to WGSL, generating native pixel-perfect shaders.",
    icon: Hexagon,
    color: "text-purple-400"
  },
  {
    id: "rust",
    title: "Rust Bootstrap",
    desc: "Phase 4 Singularity. Fully self-hosting language capable of generating its own native object files.",
    icon: Cpu,
    color: "text-red-400"
  }
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".pillar-panel") as HTMLElement[];

    if (!trackRef.current || !containerRef.current) return;

    // Fake Horizontal Scroll
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + trackRef.current!.offsetWidth,
        invalidateOnRefresh: true
      }
    });

    // Parallax or inner animations via containerAnimation
    panels.forEach((panel, i) => {
      if (i === 0) return; // Skip first panel
      gsap.fromTo(
        panel.querySelector(".inner-content"),
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-[#0a0a0a] overflow-hidden flex flex-col justify-center">
      <div className="absolute top-12 left-12 z-20 font-mono text-sm tracking-widest text-gray-500">
        01 // ARCHITECTURE
      </div>
      
      <div ref={trackRef} className="flex h-full w-[400vw] items-center">
        {PILLARS.map((pillar, i) => (
          <div 
            key={pillar.id} 
            className="pillar-panel w-[100vw] h-full flex flex-col items-center justify-center px-12 md:px-24"
          >
            <div className="inner-content w-full max-w-4xl relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-900 to-black opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative border border-gray-800 bg-black/50 backdrop-blur-md p-12 md:p-24 shadow-2xl">
                <pillar.icon className={`w-16 h-16 mb-8 ${pillar.color}`} strokeWidth={1} />
                
                <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-4">
                  PILLAR 0{i + 1}
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                  {pillar.title}
                </h2>
                
                <p className="text-xl text-gray-400 leading-relaxed font-sans max-w-2xl">
                  {pillar.desc}
                </p>

                <div className="mt-12 h-px w-full bg-gradient-to-r from-gray-800 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

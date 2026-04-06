"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TerminalSquare, Package, Library, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const TOOLS = [
  { name: "induc", desc: "Native Compiler Backend via LLVM FFI. Bootstrapped in Rust.", icon: TerminalSquare },
  { name: "indupm", desc: "Package Manager. DFS backtracking SAT-solver algorithm for SemVer.", icon: Package },
  { name: "std.indu", desc: "WebSockets, HashMaps, Epoll, Actor Schedulers, CRDTs.", icon: Library },
  { name: "Ghost DOM", desc: "Virtual DOM reconciliation algorithm running at 60fps.", icon: Zap }
];

export default function Ecosystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Staggered reveal for tools using ScrollTrigger.batch
    ScrollTrigger.batch(".tool-card", {
      interval: 0.1,
      batchMax: 4,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true
        });
      },
      onLeaveBack: (batch) => {
        gsap.set(batch, { opacity: 0, y: 50, overwrite: true });
      },
      start: "top 80%"
    });

    gsap.fromTo(
      ".eco-title",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".eco-title",
          start: "top 85%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-12 bg-black border-y border-gray-800">
      <div className="container mx-auto">
        <div className="mb-20 eco-title">
          <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-4">
            02 // THE ECOSYSTEM
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-3xl">
            A Complete Toolchain.
          </h2>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl font-mono">
            40 sub-agents. 20,346 lines of systems code. The theoretical vaporware is physically constructed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOOLS.map((tool, idx) => (
            <div 
              key={idx} 
              className="tool-card opacity-0 translate-y-[50px] p-10 border border-gray-800 bg-[#050505] hover:bg-[#111] transition-colors duration-500 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00e5ff] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
              
              <tool.icon className="w-12 h-12 text-white mb-6" strokeWidth={1} />
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{tool.name}</h3>
              <p className="text-gray-400 leading-relaxed font-sans">
                {tool.desc}
              </p>
              
              <div className="mt-8 font-mono text-sm text-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                [ READ_SOURCE ]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

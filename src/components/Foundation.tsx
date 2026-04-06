"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, CircleDashed } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const PHASES = [
  { phase: "01", title: "The Lexer", desc: "Production-grade, zero-allocation Lexer in INDU. Processing raw files character-by-character, emitting the real AST Token stream.", status: "completed" },
  { phase: "02", title: "LLVM Bootstrap", desc: "Native Rust project acting as the host. Translating AST logic into LLVM IR, emitting physical hello_world.o native object files.", status: "completed" },
  { phase: "03", title: "Standard Library Linkage", desc: "Writing a real Rust AST Parser and LLVM CodeGen pipeline to parse the INDU Standard Library (core.indu) into libindu_std.a.", status: "completed" },
  { phase: "04", title: "The Singularity", desc: "100% self-hosting. Full-scale resilient Rust parser swallowed the 20,000 LOC codebase. INDU compiles its own native executable.", status: "completed" }
];

export default function Foundation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the left section while right scrolls
    ScrollTrigger.create({
      trigger: ".foundation-container",
      start: "top top",
      end: "bottom bottom",
      pin: ".sticky-text",
      pinSpacing: false
    });

    const lines = gsap.utils.toArray(".timeline-line");
    lines.forEach((line: unknown) => {
      const element = line as HTMLElement;
      gsap.fromTo(element, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element.parentElement,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );
    });

    gsap.utils.toArray(".phase-content").forEach((el: unknown) => {
      const element = el as HTMLElement;
      gsap.fromTo(element,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#050505] text-white py-32 px-6 lg:px-12 foundation-container relative">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        
        <div className="sticky-text h-fit lg:h-screen flex flex-col justify-center">
          <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-4">
            03 // THE FOUNDATION
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">
            Forged in 5 Hours.
          </h2>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-sans">
            INDU is not just a language; it is an experiment in autonomous compiler engineering.
            Four strike teams executed a relentless architecture build, leading to The Singularity.
          </p>
        </div>

        <div className="relative py-24">
          {PHASES.map((phase, i) => (
            <div key={i} className="relative flex gap-8 mb-32 last:mb-0 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#00e5ff] flex items-center justify-center bg-black z-10 relative">
                  {phase.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-[#00e5ff]" />
                  ) : (
                    <CircleDashed className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                {i !== PHASES.length - 1 && (
                  <div className="w-px h-full absolute top-12 left-1/2 -translate-x-1/2 bg-gray-800">
                    <div className="timeline-line w-full bg-gradient-to-b from-[#00e5ff] to-purple-500 origin-top h-full" />
                  </div>
                )}
              </div>

              <div className="phase-content flex-1 pt-2">
                <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-2">
                  PHASE {phase.phase}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md font-sans">
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

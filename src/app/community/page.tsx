"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable);
}

const MEMBERS = [
  "Strike Team Alpha", "Agent 01 - LLVM", "Agent 02 - AST",
  "Strike Team Beta", "Agent 15 - CRDTs", "Agent 18 - GC",
  "Strike Team Gamma", "Agent 28 - Actor", "Agent 30 - QUIC",
  "Strike Team Delta", "Agent 34 - indupm", "Agent 35 - Diff"
];

export default function CommunityPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const cards = gsap.utils.toArray(".community-card") as HTMLElement[];
    const cardWidth = 400; // 350px width + 50px gap
    const totalWidth = cardWidth * cards.length;

    // Position cards
    gsap.set(cards, { x: (i) => i * cardWidth });

    // Infinite animation
    const wrap = gsap.utils.wrap(-cardWidth, totalWidth - cardWidth);
    
    // We animate the cards to move left indefinitely
    const animation = gsap.to(cards, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(wrap)
      }
    });

    // Draggable proxy to scrub the timeline
    const proxy = document.createElement("div");
    Draggable.create(proxy, {
      trigger: trackRef.current,
      type: "x",
      inertia: true,
      onPress: () => { animation.pause(); },
      onDrag: function() {
        // Adjust the timeline progress based on drag
        gsap.set(cards, {
          x: `+=${this.deltaX}`,
          modifiers: { x: gsap.utils.unitize(wrap) }
        });
      },
      onRelease: () => { animation.play(); },
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#050505] text-white pt-32 overflow-hidden flex flex-col items-center">
      <div className="text-center z-20 mb-24 pointer-events-none">
        <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-4">05 // COMMUNITY</div>
        <h1 className="text-6xl md:text-8xl font-bold uppercase text-white tracking-tighter">
          The Network
        </h1>
        <p className="text-xl text-gray-400 mt-4 font-mono max-w-2xl mx-auto">
          40 sub-agents built the architecture in 5 hours. Drag to explore the hive mind.
        </p>
      </div>

      <div ref={trackRef} className="relative w-full h-[400px] overflow-hidden cursor-grab active:cursor-grabbing interactive">
        
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {MEMBERS.map((member, i) => (
          <div 
            key={i} 
            className="community-card absolute top-0 left-0 w-[350px] h-[300px] bg-[#111] border border-gray-800 rounded-xl p-8 flex flex-col justify-center items-center shadow-2xl hover:border-[#00e5ff] hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-600 mb-6 flex items-center justify-center font-mono text-[#00e5ff] text-2xl group-hover:border-[#00e5ff] transition-colors">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="text-2xl font-bold text-center tracking-tight">{member}</h3>
            <p className="text-sm text-gray-500 font-mono mt-4 text-center uppercase tracking-widest">INDU Contributor</p>
          </div>
        ))}
      </div>
    </main>
  );
}

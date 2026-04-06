"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { Database, Network, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable);
}

export default function FrameworkPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    Draggable.create(".drag-node", {
      bounds: containerRef.current,
      inertia: true,
      onDragStart: function() {
        gsap.to(this.target, { scale: 1.1, zIndex: 50, duration: 0.2 });
      },
      onDragEnd: function() {
        gsap.to(this.target, { scale: 1, zIndex: 10, duration: 0.2 });
      }
    });

    gsap.fromTo(".drag-node", 
      { opacity: 0, scale: 0.5, y: 100 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 1, ease: "back.out(1.7)" }
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 overflow-hidden flex flex-col items-center">
      <div className="text-center z-20 mb-12 pointer-events-none">
        <h1 className="text-6xl md:text-8xl font-bold uppercase text-[#00e5ff] tracking-tighter">
          The Engine
        </h1>
        <p className="text-xl text-gray-400 mt-4 font-mono max-w-2xl mx-auto">
          Drag the architectural nodes. The MPSC mailboxes and schedulers are interconnected.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl h-[60vh] border border-gray-800 rounded-3xl bg-[#0a0a0a] overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: "linear-gradient(to right, #00e5ff 1px, transparent 1px), linear-gradient(to bottom, #00e5ff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="drag-node interactive absolute top-20 left-20 bg-[#111] border border-orange-500 p-8 rounded-2xl w-64 cursor-grab active:cursor-grabbing shadow-[0_0_30px_rgba(249,115,22,0.1)]">
          <Database className="w-12 h-12 text-orange-500 mb-4" />
          <h3 className="font-bold text-xl mb-2">SQLite VFS</h3>
          <p className="text-gray-400 text-sm">Intercepts sqlite3 reads/writes via C-FFI for local persistence.</p>
        </div>

        <div className="drag-node interactive absolute top-40 right-40 bg-[#111] border border-[#00e5ff] p-8 rounded-2xl w-64 cursor-grab active:cursor-grabbing shadow-[0_0_30px_rgba(0,229,255,0.1)]">
          <Network className="w-12 h-12 text-[#00e5ff] mb-4" />
          <h3 className="font-bold text-xl mb-2">Actor Scheduler</h3>
          <p className="text-gray-400 text-sm">Lock-free MPSC mailboxes and `AtomicU8` state transitions integrated tightly with epoll.</p>
        </div>

        <div className="drag-node interactive absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#111] border border-purple-500 p-8 rounded-2xl w-64 cursor-grab active:cursor-grabbing shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <Cpu className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="font-bold text-xl mb-2">WGSL Emitter</h3>
          <p className="text-gray-400 text-sm">AST-to-WGSL compiler translates INDU structs into `@location(N)` GPU layouts.</p>
        </div>

      </div>
    </main>
  );
}

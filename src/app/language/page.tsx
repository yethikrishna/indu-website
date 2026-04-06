"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Flip, TextPlugin);
}

export default function LanguagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNative, setIsNative] = useState(true);

  useGSAP((context, contextSafe) => {
    // Intro scramble text
    gsap.to(".scramble-text", {
      duration: 2,
      text: {
        value: "INDU is designed for humans. Compiled for machines.",
        delimiter: "",
      },
      ease: "none"
    });

    const toggleLayout = contextSafe!(() => {
      const state = Flip.getState(".syntax-card, .syntax-container");
      setIsNative(!isNative);

      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.8,
          ease: "expo.inOut",
          absolute: true,
          stagger: 0.05,
          onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1, duration: 0.5}),
          onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.8, duration: 0.5})
        });
      });
    });

    const btn = document.querySelector(".toggle-btn");
    if (btn) {
      btn.addEventListener("click", toggleLayout);
      return () => btn.removeEventListener("click", toggleLayout);
    }
  }, { scope: containerRef, dependencies: [isNative] });

  return (
    <main ref={containerRef} className="min-h-screen bg-black pt-32 px-12 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 text-[#00e5ff]">
          Language Specs
        </h1>
        <p className="scramble-text text-2xl font-mono text-gray-400 mb-16 h-8">
          Loading architecture...
        </p>

        <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold uppercase">Syntax Paradigm</h2>
          <button className="toggle-btn interactive px-6 py-2 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors font-mono text-sm">
            TOGGLE VIEW
          </button>
        </div>

        <div className={`syntax-container grid gap-8 ${isNative ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl">
            <div className="font-mono text-sm text-gray-500 mb-4">Actor Model (agent)</div>
            <pre className="font-mono text-[#00e5ff] text-sm overflow-x-auto">
              <code>{`let worker = agent {
  let id = agent_id();
  receive {
    msg: String => {
      println("Received: \${msg}");
    }
  }
};`}</code>
            </pre>
          </div>

          <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl">
            <div className="font-mono text-sm text-gray-500 mb-4">CRDTs (sync let)</div>
            <pre className="font-mono text-orange-400 text-sm overflow-x-auto">
              <code>{`sync let global_counter = 0;

fn increment() {
  global_counter += 1;
  // Automatically syncs over WebRTC
}`}</code>
            </pre>
          </div>

          <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl">
            <div className="font-mono text-sm text-gray-500 mb-4">Reference Semantics</div>
            <pre className="font-mono text-purple-400 text-sm overflow-x-auto">
              <code>{`impl Parser {
  fn advance(&mut self) {
    self.current = self.lexer.next();
  }
}`}</code>
            </pre>
          </div>

          <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl">
            <div className="font-mono text-sm text-gray-500 mb-4">Fluid Typing</div>
            <pre className="font-mono text-green-400 text-sm overflow-x-auto">
              <code>{`let greeting = "INDU";
// Infers string, compiles to safe C-string
println(greeting);`}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

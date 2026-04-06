"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Flip, TextPlugin, ScrollTrigger);
}

export default function LanguagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isNative, setIsNative] = useState(true);

  useGSAP((context, contextSafe) => {
    // 1. Initial Flip Animation (When state changes, trigger Flip)
    if (context.conditions && context.conditions.mounted) {
      const state = Flip.getState(".syntax-card");
      Flip.from(state, {
        duration: 1.2,
        ease: "goldenCurve",
        absolute: true,
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1, duration: 0.8, ease: "goldenCurve"}),
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.95, duration: 0.5, ease: "goldenCurve"})
      });
    }

    // Intro scramble text
    gsap.to(".scramble-text", {
      duration: 2,
      text: {
        value: "INDU is designed for humans. Compiled for machines.",
        delimiter: "",
      },
      ease: "none"
    });

    // ScrollTrigger Skeleton Hook for syntax cards
    if (triggerRef.current) {
      gsap.fromTo(".syntax-card", 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    const toggleLayout = contextSafe!(() => {
      // Scramble text effect on the paradigm title when toggling
      gsap.to(".paradigm-title", {
        duration: 1,
        text: {
          value: !isNative ? "Native INDU Syntax" : "INDU vs Python / Rust",
          delimiter: "",
        },
        ease: "none"
      });

      // The state change will trigger the useGSAP re-render block above
      setIsNative(!isNative);
    });

    // Add condition to prevent Flip running on initial mount
    context.add("mounted", () => true);

    // Bind toggleLayout to window or pass it back if needed, 
    // but in useGSAP we can't easily return it. Let's bind it via DOM event listener instead
    // so we don't lose the contextSafe wrapper scope.
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
          <h2 className="paradigm-title text-3xl font-bold uppercase">Native INDU Syntax</h2>
          <button 
            className="toggle-btn interactive px-6 py-2 border border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors font-mono text-sm"
          >
            TOGGLE COMPARISON
          </button>
        </div>

        <div ref={triggerRef} className={`syntax-container grid gap-8 ${isNative ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}`}>
          {isNative ? (
            <>
              <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl" data-flip-id="card-1">
                <div className="font-mono text-sm text-[#00e5ff] mb-4 uppercase tracking-widest">Agent Core</div>
                <pre className="font-mono text-gray-300 text-sm overflow-x-auto">
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

              <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl" data-flip-id="card-2">
                <div className="font-mono text-sm text-orange-400 mb-4 uppercase tracking-widest">CRDT Sync</div>
                <pre className="font-mono text-gray-300 text-sm overflow-x-auto">
                  <code>{`sync let global_counter = 0;

fn increment() {
  global_counter += 1;
  // Automatically syncs over WebRTC
}`}</code>
                </pre>
              </div>

              <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl" data-flip-id="card-3">
                <div className="font-mono text-sm text-purple-400 mb-4 uppercase tracking-widest">Reference Semantics</div>
                <pre className="font-mono text-gray-300 text-sm overflow-x-auto">
                  <code>{`impl Parser {
  fn advance(&mut self) {
    self.current = self.lexer.next();
  }
}`}</code>
                </pre>
              </div>

              <div className="syntax-card bg-[#111] border border-gray-800 p-8 rounded-xl" data-flip-id="card-4">
                <div className="font-mono text-sm text-green-400 mb-4 uppercase tracking-widest">Fluid Typing</div>
                <pre className="font-mono text-gray-300 text-sm overflow-x-auto">
                  <code>{`let greeting = "INDU";
// Infers string, compiles to safe C-string
println(greeting);`}</code>
                </pre>
              </div>
            </>
          ) : (
            <>
              <div className="syntax-card bg-[#0a0a0a] border border-gray-800 p-8 rounded-xl flex flex-col md:flex-row gap-8" data-flip-id="card-1">
                <div className="flex-1">
                  <div className="font-mono text-sm text-[#00e5ff] mb-4 uppercase tracking-widest">INDU: Agent Core</div>
                  <pre className="font-mono text-gray-300 text-sm overflow-x-auto bg-black p-4 rounded border border-gray-900">
                    <code>{`let worker = agent {
  receive {
    msg: String => println("Got \${msg}")
  }
};`}</code>
                  </pre>
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-red-500 mb-4 uppercase tracking-widest">Rust: The Boilerplate</div>
                  <pre className="font-mono text-gray-500 text-sm overflow-x-auto bg-black p-4 rounded border border-gray-900 opacity-70">
                    <code>{`let (tx, rx) = mpsc::channel();
thread::spawn(move || {
  while let Ok(msg) = rx.recv() {
    println!("Got {}", msg);
  }
});`}</code>
                  </pre>
                </div>
              </div>

              <div className="syntax-card bg-[#0a0a0a] border border-gray-800 p-8 rounded-xl flex flex-col md:flex-row gap-8" data-flip-id="card-2">
                <div className="flex-1">
                  <div className="font-mono text-sm text-orange-400 mb-4 uppercase tracking-widest">INDU: CRDT State</div>
                  <pre className="font-mono text-gray-300 text-sm overflow-x-auto bg-black p-4 rounded border border-gray-900">
                    <code>{`sync let users = HashMap::new();`}</code>
                  </pre>
                </div>
                <div className="flex-1">
                  <div className="font-mono text-sm text-yellow-500 mb-4 uppercase tracking-widest">Python: Manual Redis</div>
                  <pre className="font-mono text-gray-500 text-sm overflow-x-auto bg-black p-4 rounded border border-gray-900 opacity-70">
                    <code>{`import redis
r = redis.Redis(host='localhost', port=6379, db=0)
r.hset('users', mapping=user_dict)`}</code>
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

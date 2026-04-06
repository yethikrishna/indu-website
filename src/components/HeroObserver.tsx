"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { splitTextToChars } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer);
}

export default function HomeObserverHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);

  useGSAP((context, contextSafe) => {
    if (!containerRef.current) return;

    // Intro Timeline
    const title = document.querySelector(".hero-title") as HTMLElement;
    if (title) {
      const chars = splitTextToChars(title);
      gsap.fromTo(chars, 
        { opacity: 0, y: 100, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.05, duration: 1.5, ease: "expo.out", delay: 0.5 }
      );
    }

    gsap.fromTo(".hero-subtitle", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" }
    );

    // Observer Hijacking
    let animating = false;
    const unlockScroll = contextSafe!(() => {
      if (animating || unlocked) return;
      animating = true;
      
      gsap.to(".hero-overlay", {
        height: "0%",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => {
          setUnlocked(true);
          document.body.style.overflow = "auto";
        }
      });
    });

    if (!unlocked) {
      document.body.style.overflow = "hidden";
      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onUp: unlockScroll,
        onDown: unlockScroll,
        tolerance: 10,
        preventDefault: true,
      });
    }
  }, { scope: containerRef, dependencies: [unlocked] });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      <div className="hero-overlay absolute top-0 left-0 w-full h-full bg-[#0a0a0a] z-10 flex flex-col items-center justify-center border-b border-[#00e5ff]">
        <h1 className="hero-title text-[10vw] md:text-[8vw] font-bold tracking-tighter text-white uppercase text-center leading-none" style={{ perspective: "1000px" }}>
          The Singularity
        </h1>
        <p className="hero-subtitle text-xl md:text-3xl text-gray-400 font-mono mt-8 text-center max-w-3xl opacity-0">
          Scroll to unlock the architecture.
        </p>
      </div>

      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-30">
        <div className="w-[80vw] h-[80vw] border border-gray-800 rounded-full absolute animate-ping" style={{ animationDuration: "10s" }} />
        <div className="w-[60vw] h-[60vw] border border-[#00e5ff] rounded-full absolute animate-ping" style={{ animationDuration: "7s" }} />
      </div>
    </section>
  );
}

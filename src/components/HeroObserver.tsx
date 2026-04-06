"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { useGhostDOM } from "@/components/GhostDOM";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer);
}

const SLIDES = [
  {
    title: "The Two-Language Problem is Dead",
    subtitle: "Python is too slow. Rust is too hard. The compromise ends now.",
  },
  {
    title: "Zero-Cost Power Architecture",
    subtitle: "Native CRDTs. WebGPU Rendering. Agent-Oriented Programming.",
  },
  {
    title: "Experience the Singularity",
    subtitle: "Write once. Run everywhere. At the speed of light.",
  }
];

export default function HomeObserverHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const { announce } = useGhostDOM();

  useGSAP((context, contextSafe) => {
    if (!containerRef.current || unlocked) return;

    const slides = gsap.utils.toArray(".hero-slide") as HTMLElement[];
    let currentIndex = 0;
    let animating = false;

    // 1. Initial State: Hide all slides except the first one
    gsap.set(slides, { autoAlpha: 0, scale: 0.95, zIndex: 0 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1, zIndex: 1 });
    
    // Announce the first slide for screen readers immediately
    announce(`Slide 1: ${SLIDES[0].title}. ${SLIDES[0].subtitle}. Use Arrow Keys or Scroll to continue.`);

    // 2. The Timeline Scrubber / Hyperdrive Snap transition
    const gotoSlide = contextSafe!((index: number, direction: number) => {
      if (animating || unlocked) return;
      animating = true;
      
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[index];
      
      // Accessibility Narration
      announce(`Slide ${index + 1}: ${SLIDES[index].title}. ${SLIDES[index].subtitle}`);
      
      const tl = gsap.timeline({
        onComplete: () => {
          animating = false;
          currentIndex = index;
        },
        defaults: { ease: "goldenCurve", duration: 1.2 }
      });

      tl.to(currentSlide, {
        autoAlpha: 0,
        scale: direction === 1 ? 1.05 : 0.95,
        zIndex: 0
      }, 0);

      tl.fromTo(nextSlide, 
        { autoAlpha: 0, scale: direction === 1 ? 0.95 : 1.05, zIndex: 1 },
        { autoAlpha: 1, scale: 1 },
        0
      );
    });

    // 3. Unlock Sequence: Release the Observer and fade out the Hero
    const unlockScroll = contextSafe!(() => {
      if (animating || unlocked) return;
      animating = true;
      
      announce("Hero sequence complete. Unlocking document scroll.");
      
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        yPercent: -20,
        duration: 1.2,
        ease: "goldenCurve",
        onComplete: () => {
          setUnlocked(true);
          document.body.style.overflow = "auto";
        }
      });
    });

    const handleNext = () => {
      if (currentIndex < slides.length - 1) {
        gotoSlide(currentIndex + 1, 1);
      } else {
        unlockScroll();
      }
    };

    const handlePrev = () => {
      if (currentIndex > 0) {
        gotoSlide(currentIndex - 1, -1);
      }
    };

    // 4. Hijack the Scroll and normalize Touch/Wheel/Pointer events
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0); // Lock to top to prevent native scroll glitches

    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onUp: () => handlePrev(),
      onDown: () => handleNext(),
      tolerance: 10,
      preventDefault: true,
    });

    // 5. Accessibility-First Keyboard Mapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " " || e.key === "Tab") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      obs.kill();
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, { scope: containerRef, dependencies: [unlocked] });

  if (unlocked) return null; // Unmount entirely to free DOM memory

  return (
    <section 
      ref={containerRef} 
      className="fixed inset-0 z-50 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505]"
    >
      {/* Background Ambience: Tesseract Spin placeholder (Pulse Rings) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[80vw] h-[80vw] border border-gray-800 rounded-full absolute animate-ping" style={{ animationDuration: "10s" }} />
        <div className="w-[60vw] h-[60vw] border border-[#00e5ff] rounded-full absolute animate-ping" style={{ animationDuration: "7s" }} />
      </div>

      {/* The 3 Multi-Layered Slides */}
      {SLIDES.map((slide, i) => (
        <div 
          key={i} 
          className="hero-slide absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 md:px-20 z-10 text-center"
        >
          <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-none max-w-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 drop-shadow-lg">
            {slide.title}
          </h1>
          <p className="text-xl md:text-3xl text-[#00e5ff] font-mono mt-8 max-w-3xl drop-shadow-md">
            {slide.subtitle}
          </p>
        </div>
      ))}

      {/* Interactive Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-50 animate-pulse pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest mb-2 text-[#00e5ff]">Scroll / Spacebar</span>
        <div className="w-[1px] h-12 bg-[#00e5ff]" />
      </div>
    </section>
  );
}
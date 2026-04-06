"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

    tl.fromTo(
      ".hero-bg",
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2 }
    )
      .fromTo(
        ".hero-title-word",
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.1 },
        "-=1.5"
      )
      .fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.2"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        "-=1.0"
      )
      .fromTo(
        ".hero-code",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0 },
        "-=0.8"
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-gray-800">
      <div className="hero-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6 hero-code opacity-0">
            <Terminal className="text-[#00e5ff] w-5 h-5" />
            <span className="font-mono text-sm tracking-widest text-[#00e5ff]">INDU_LANG_V1.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 flex flex-wrap gap-x-4 uppercase" style={{ perspective: "400px" }}>
            <span className="hero-title-word inline-block origin-bottom text-white">Pure</span>
            <span className="hero-title-word inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-white">Systems</span>
            <span className="hero-title-word inline-block origin-bottom text-white">Engineering.</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed opacity-0">
            A high-performance, actor-model, WebGPU-native programming language forged in a 5-hour AI sprint. 
            Replace the fake bones with real steel.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="hero-cta opacity-0 bg-[#00e5ff] text-black font-bold px-8 py-4 rounded-none hover:bg-white transition-colors duration-300 flex items-center gap-2">
              GET STARTED
            </button>
            <button className="hero-cta opacity-0 bg-transparent border border-gray-600 text-white font-mono px-8 py-4 rounded-none hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors duration-300">
              READ MANIFESTO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

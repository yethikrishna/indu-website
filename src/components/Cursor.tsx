"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current) return;
    
    // Use gsap.quickTo for performance (avoiding tween creation on every mouse move)
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("pointermove", onMove);

    // Interaction scaling
    const onHoverEnter = () => gsap.to(cursorRef.current, { scale: 2, backgroundColor: "rgba(0, 229, 255, 0.2)", border: "1px solid #00e5ff", duration: 0.3 });
    const onHoverLeave = () => gsap.to(cursorRef.current, { scale: 1, backgroundColor: "white", border: "none", duration: 0.3 });

    document.querySelectorAll("a, button, .interactive").forEach(el => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.querySelectorAll("a, button, .interactive").forEach(el => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
    };
  });

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
    />
  );
}

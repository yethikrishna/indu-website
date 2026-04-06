"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

export function GSAPRegistry() {
  useGSAP(() => {
    // 1. Register all premium Club GSAP plugins globally
    gsap.registerPlugin(
      useGSAP, 
      CustomEase, 
      ScrollTrigger, 
      Observer, 
      SplitText, 
      Flip, 
      Draggable, 
      TextPlugin
    );

    // 2. Define 'The Golden Curve'
    // A bespoke bezier curve mathematically derived to feel incredibly heavy, premium, and futuristic.
    // It starts with high inertia and eases out smoothly.
    CustomEase.create("goldenCurve", "M0,0 C0.11,0.49 0.23,1 1,1");
    CustomEase.create("goldenSnap", "M0,0 C0.68,-0.55 0.265,1.55 1,1"); // For magnetic UI snapping

    // 3. Set global GSAP defaults to match the INDU aesthetic
    gsap.defaults({
      ease: "goldenCurve",
      duration: 1.2
    });

  }, []);

  return null;
}
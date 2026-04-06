"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Network, Cpu } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Draggable, ScrollTrigger);
}

// Lazy-loaded 3D Model Component to adhere to 100/100 Lighthouse Budget
function Model({ path, color }: { path: string, color: string }) {
  const { scene } = useGLTF(path);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <primitive ref={meshRef} object={scene} scale={2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color={color} />
    </Float>
  );
}

export default function FrameworkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const webglTriggerRef = useRef<HTMLDivElement>(null);
  const [shouldRenderWebGL, setShouldRenderWebGL] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Interaction-Driven Loading: Only mount WebGL when scrolling near it
    ScrollTrigger.create({
      trigger: webglTriggerRef.current,
      start: "top bottom+=200", // Predictive Proximity Hydration
      onEnter: () => setShouldRenderWebGL(true),
      once: true,
    });

    // ScrollTrigger Skeleton Hook for the framework nodes
    gsap.fromTo(".drag-node", 
      { opacity: 0, scale: 0.5, y: 100 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 1.5, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

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

      {/* Render-On-Scroll WebGL Section */}
      <div ref={webglTriggerRef} className="w-full h-screen flex items-center justify-center border-y border-gray-800 bg-[#0a0a0a] mb-32 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 flex flex-col items-center justify-center pointer-events-none z-0">
            <div className="w-full h-px bg-[#00e5ff] absolute top-1/2 -translate-y-1/2" />
            <div className="h-full w-px bg-[#00e5ff] absolute left-1/2 -translate-x-1/2" />
            <h2 className="text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black">INDU CORE</h2>
         </div>
         
         <div className="absolute inset-0 z-10">
           {shouldRenderWebGL ? (
             <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
               <ambientLight intensity={0.5} />
               <Environment preset="city" />
               <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} config={{ mass: 2, tension: 400 }} snap={{ mass: 4, tension: 400 }}>
                  <Model path="/models/tesseract.glb" color="#00e5ff" />
               </PresentationControls>
             </Canvas>
           ) : (
             <div className="w-full h-full flex items-center justify-center">
               <p className="text-gray-500 font-mono text-sm animate-pulse">[ Hydrating WebGL Pipeline... ]</p>
             </div>
           )}
         </div>
      </div>

      <div ref={triggerRef} className="w-full max-w-6xl mx-auto mb-12">
         <h2 className="text-4xl font-bold mb-4">Architecture Nodes</h2>
         <p className="text-gray-400 font-mono">Powered by GSAP Draggable + ScrollTrigger Scrub.</p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl h-[60vh] border border-gray-800 rounded-3xl bg-[#0a0a0a] overflow-hidden mb-32">
        
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
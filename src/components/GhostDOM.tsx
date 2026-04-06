"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GhostDOMContextType {
  announce: (message: string) => void;
}

const GhostDOMContext = createContext<GhostDOMContextType>({
  announce: () => {},
});

export function useGhostDOM() {
  return useContext(GhostDOMContext);
}

export function GhostDOMProvider({ children }: { children: ReactNode }) {
  const [announcement, setAnnouncement] = useState<string>("");

  const announce = (message: string) => {
    setAnnouncement(message);
    // Clear it after a moment so the same message can be announced again if needed
    setTimeout(() => setAnnouncement(""), 3000);
  };

  return (
    <GhostDOMContext.Provider value={{ announce }}>
      {children}
      {/* 
        The Ghost DOM layer. 
        This is visually hidden but strictly available to screen readers.
        It uses aria-live="polite" to narrate the heavy WebGL and GSAP sequences.
      */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}
      >
        {announcement}
      </div>
    </GhostDOMContext.Provider>
  );
}
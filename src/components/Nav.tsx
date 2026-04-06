"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Language", href: "/language" },
  { label: "Framework", href: "/framework" },
  { label: "Docs", href: "/docs" },
  { label: "Community", href: "/community" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 p-6 mix-blend-difference flex justify-between items-center text-white">
      <Link href="/" className="nav-item font-mono font-bold text-xl tracking-tighter interactive">
        INDU.
      </Link>
      <div className="flex gap-8">
        {LINKS.map(link => (
          <Link 
            key={link.href} 
            href={link.href}
            className={`nav-item text-sm font-mono tracking-widest uppercase interactive ${pathname === link.href ? "text-[#00e5ff]" : "text-gray-400 hover:text-white transition-colors"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

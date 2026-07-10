import { useEffect, useState } from "react";
import { useScrollStore } from "../lib/scroll";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Research" },
  { href: "#publications", label: "Papers" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progress = useScrollStore((s) => s.progress);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Intersection Observer for active section
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-space-deep/85 backdrop-blur-xl border-b border-quantum/10 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-quantum via-cyan to-nebula transition-all duration-100"
        style={{ width: `${progress * 100}%`, boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)" }}
      />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-quantum/30" />
            <div className="absolute inset-0 rounded-full bg-quantum/20 blur-md animate-glow-pulse" />
          </div>
          <div className="font-mono font-bold text-lg tracking-tighter">
            <span className="text-quantum-bright group-hover:text-glow transition-all">&lt;</span>
            <span className="text-star/90">chun_fu_chen</span>
            <span className="text-quantum-bright group-hover:text-glow transition-all"> /&gt;</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 ${
                activeSection === l.href.slice(1)
                  ? "text-quantum-bright bg-quantum/10"
                  : "text-star/50 hover:text-star/80 hover:bg-white/5"
              }`}
            >
              {activeSection === l.href.slice(1) && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1 h-1 rounded-full bg-quantum" />
              )}
              {l.label}
            </a>
          ))}
          {/* Online indicator */}
          <div className="ml-3 flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="w-2 h-2 rounded-full bg-quantum animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-mono text-quantum/60 tracking-widest">ONLINE</span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-star/60 hover:text-quantum transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-quantum/10 px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeSection === l.href.slice(1)
                  ? "text-quantum-bright bg-quantum/10"
                  : "text-star/60"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

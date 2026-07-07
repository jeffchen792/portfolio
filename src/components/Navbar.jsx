import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/85 border-emerald-900/10 shadow-md shadow-emerald-900/5"
          : "bg-white/40 border-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左側 Logo / 標題 */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-stone-200 shadow-sm" />
          <div className="text-emerald-800 font-mono font-bold text-xl tracking-tighter">
            &lt;chun_fu_chen /&gt;
          </div>
        </div>

        {/* 桌面選單 */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-500">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-emerald-700 transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        {/* 手機漢堡按鈕 */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-stone-600"
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

      {/* 手機下拉選單 */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 py-4 flex flex-col gap-4 text-stone-600 font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

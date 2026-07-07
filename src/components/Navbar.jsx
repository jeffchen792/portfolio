export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-emerald-900/10 shadow-sm shadow-emerald-900/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左側 Logo / 標題 */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full border border-stone-200 shadow-sm" />
          <div className="text-emerald-800 font-mono font-bold text-xl tracking-tighter">
            &lt;chun_fu_chen /&gt;
          </div>
        </div>

        {/* 右側選單 */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-500">
          <a href="#about" className="hover:text-emerald-700 transition-colors duration-200">
            About
          </a>
          <a href="#projects" className="hover:text-emerald-700 transition-colors duration-200">
            Research
          </a>
          <a href="#contact" className="hover:text-emerald-700 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

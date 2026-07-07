export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        
        {/* 小標籤 */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-emerald-100 shadow-sm text-sm font-medium text-stone-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Online</span>
        </div>

        {/* 核心大標題 */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-800">
            Chun Fu Chen
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-stone-500">
            Computational <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 font-medium">Material Scientist</span>
          </h2>
        </div>

        {/* 理念與主題 */}
        <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-stone-800">AI for Science.</strong><br />
          Empowering material discovery and solving complex problems through autonomous AI Agents.
        </p>

        {/* 行動呼籲按鈕 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-300 transform hover:-translate-y-1">
            View Research
          </a>
          <a href="#contact" className="px-8 py-3 bg-transparent hover:bg-stone-100 text-emerald-800 border-2 border-emerald-700/20 hover:border-emerald-700/50 font-medium rounded-xl transition-all duration-300">
            Initialize Contact
          </a>
        </div>
      </div>
    </section>
  );
}

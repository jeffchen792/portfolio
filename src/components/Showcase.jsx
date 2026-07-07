import Reveal from "./Reveal";

export default function Showcase() {
  return (
    <section id="projects" className="py-24 relative bg-white/50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* 區塊標題 */}
        <Reveal>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
            Featured <span className="text-emerald-700">Research</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            Computational Material Science &amp; AI Integration
          </p>
        </div>
        </Reveal>

        {/* 海報展示區塊 (Glassmorphism 卡片) */}
        <Reveal delay={150}>
        <div className="bg-white/70 backdrop-blur-md border border-stone-200 rounded-3xl overflow-hidden p-6 md:p-8 hover:border-emerald-300 transition-colors duration-300 shadow-xl shadow-stone-200/50">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 說明文字區 */}
            <div className="md:w-1/3 space-y-6">
              <h3 className="text-2xl font-bold text-stone-800">IAM Research Poster</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                This poster highlights the integration of AI Agents into computational material science. By leveraging advanced simulation techniques and LLMs, we can automate and optimize the discovery process.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">#MaterialScience</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">#AIAgent</span>
              </div>
            </div>

            {/* PDF 嵌入區 */}
            <div className="md:w-2/3 w-full h-[600px] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 relative group shadow-inner">
              <iframe 
                src="/IAM_poster.pdf" 
                className="w-full h-full border-none"
                title="IAM Research Poster"
              ></iframe>
              
              {/* 覆蓋層：在螢幕太小不好滑動時，提示可點擊右上角在新分頁開啟 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href="/IAM_poster.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-lg hover:bg-emerald-800 transition-colors">
                  Open PDF ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

import { timeline } from "../data/timeline";
import Reveal from "./Reveal";

export default function Timeline() {
  return (
    <section id="journey" className="py-24 relative bg-stone-50/50">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        {/* 區塊標題 */}
        <Reveal>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Journey</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base">
              Academic and professional experience
            </p>
          </div>
        </Reveal>

        {/* 時間軸 */}
        <div className="relative border-l-2 border-emerald-200 ml-3 md:ml-0">
          {timeline.map((item, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="mb-10 ml-8 relative">
                {/* 節點圓點 */}
                <div className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-sm"></div>
                
                {/* 內容 */}
                <div className="bg-white/80 backdrop-blur-sm border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-mono text-stone-400 block mb-2">{item.period}</span>
                  <h3 className="text-xl font-bold text-stone-800">{item.title}</h3>
                  <div className="text-emerald-700 font-medium mb-3">{item.org}</div>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

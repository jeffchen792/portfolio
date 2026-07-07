import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* 區塊標題 */}
        <Reveal>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Arsenal</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base">
              Core competencies and technical skills
            </p>
          </div>
        </Reveal>

        {/* 技能矩陣 */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="bg-white/70 backdrop-blur-md border border-stone-200 rounded-3xl p-6 hover:border-emerald-300 transition-colors shadow-sm h-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="text-xl font-bold text-stone-800">{group.group}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

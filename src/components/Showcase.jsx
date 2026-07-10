import { motion } from "motion/react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function Showcase() {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section header */}
        <motion.div {...fadeIn} className="space-y-3">
          <span className="section-label">// 02. RESEARCH</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight">
            Featured{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright via-cyan to-nebula-soft">Research</span>
          </h2>
          <p className="text-star/40 text-sm md:text-base max-w-xl">
            Computational Material Science &amp; AI Integration — pushing boundaries at the atomic scale.
          </p>
        </motion.div>

        {/* Research poster card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="group relative rounded-3xl gradient-border overflow-hidden">
            <div className="glass rounded-[calc(1.5rem-1px)] p-6 md:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                
                {/* Text content */}
                <div className="lg:w-2/5 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-quantum/50 tracking-widest">ACTIVE PROJECT</span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-star mt-2">
                      IAM Research Poster
                    </h3>
                  </div>
                  
                  <p className="text-star/50 leading-relaxed">
                    This poster highlights the integration of AI Agents into computational material science. 
                    By leveraging advanced simulation techniques and LLMs, we can automate and optimize the discovery process — 
                    from atomic-scale modeling to macroscopic property prediction.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["Material Science", "AI Agent", "DFT", "LLM", "Computational"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-quantum/10 text-quantum/80 text-xs font-medium rounded-lg border border-quantum/20 hover:bg-quantum/20 hover:border-quantum/40 transition-all cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="/IAM_poster.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-quantum hover:bg-quantum-bright text-space-deep font-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                  >
                    View Full Poster
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Preview image */}
                <div className="lg:w-3/5 w-full">
                  <a
                    href="/IAM_poster.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden border border-quantum/20 group/img"
                  >
                    <img
                      src="/IAM_poster_preview.png"
                      alt="IAM Research Poster Preview"
                      className="w-full h-auto group-hover/img:scale-[1.03] transition-transform duration-700"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-space-deep/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                      <span className="px-6 py-3 glass border-quantum/30 text-quantum-bright font-medium text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        Open PDF ↗
                      </span>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-quantum/40" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-quantum/40" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-quantum/40" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-quantum/40" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Research stats */}
        <motion.div
          {...stagger}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "DFT+ML", label: "Methodology", icon: "⚛️" },
            { value: "VASP/LAMMPS", label: "Simulation Engines", icon: "🔬" },
            { value: "LLM Agents", label: "AI Framework", icon: "🤖" },
            { value: "Open Source", label: "Philosophy", icon: "🌐" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center space-y-2 group hover:border-quantum/30 transition-all duration-300">
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-lg font-display font-bold text-star/90">{stat.value}</div>
              <div className="text-[10px] font-mono text-quantum/50 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

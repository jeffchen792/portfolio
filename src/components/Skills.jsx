import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { skillGroups } from "../data/skills";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

// Progress bar animation
function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-star/60">{name}</span>
        <span className="text-[10px] font-mono text-quantum/50">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-quantum to-cyan"
          style={{ boxShadow: "0 0 8px rgba(16, 185, 129, 0.4)" }}
        />
      </div>
    </div>
  );
}

// Skill icons map
const skillIcons = {
  Simulation: "🧪",
  "AI / ML": "🤖",
  Engineering: "⚙️",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        <motion.div {...fadeIn} className="space-y-3">
          <span className="section-label">// 04. TECH STACK</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight">
            Skills &amp;{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright to-cyan">Capabilities</span>
          </h2>
          <p className="text-star/40 text-sm md:text-base max-w-xl">
            Tools, frameworks, and methodologies I use to push the boundaries of computational material science.
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: gi * 0.15 }}
            >
              <div className="hud-corners glass rounded-2xl p-6 space-y-5 h-full">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skillIcons[group.group] || "🔧"}</span>
                  <div>
                    <div className="text-[10px] font-mono text-quantum/40 tracking-widest">
                      MODULE {(gi + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="text-lg font-display font-bold text-star/90">{group.group}</h3>
                  </div>
                </div>

                <div className="hud-line" />

                {/* Skill items with progress bars */}
                <div className="space-y-4">
                  {group.items.map((item, i) => (
                    <SkillBar
                      key={item}
                      name={item}
                      level={85 + Math.floor(Math.random() * 15)}
                      delay={0.3 + gi * 0.2 + i * 0.15}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="quantum-dot" />
              <span className="text-xs font-mono text-quantum/60 tracking-widest">ADDITIONAL TOOLS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["VASP", "LAMMPS", "PyTorch", "Graph Neural Networks", "RAG", "LLM Agents", "React", "Linux/HPC", "Git", "Docker", "Python", "Jupyter", "LaTeX"].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 bg-quantum/5 border border-quantum/10 text-star/60 text-xs rounded-lg hover:bg-quantum/10 hover:border-quantum/30 hover:text-quantum-bright transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

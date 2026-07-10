import { lazy, Suspense } from "react";
import { motion } from "motion/react";

const CrystalLattice = lazy(() => import("./CrystalLattice"));

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left: text */}
          <motion.div {...fadeIn} className="md:w-1/2 space-y-8">
            <div>
              <span className="section-label">// 01. ABOUT</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight mt-3">
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright to-cyan">Me</span>
              </h2>
            </div>

            <div className="space-y-5 text-star/60 text-lg leading-relaxed">
              <p>
                Hello! I am <span className="text-quantum-bright font-medium">Chun Fu Chen</span>, a Computational Material Scientist deeply passionate about the intersection of{" "}
                <span className="text-cyan/80 font-medium">Artificial Intelligence</span> and{" "}
                <span className="text-quantum/80 font-medium">Material Science</span>.
              </p>
              <p>
                My research focuses on leveraging autonomous AI Agents to accelerate material discovery and solve complex atomic-scale problems. I believe that by combining rigorous physical simulations with modern machine learning, we can unlock the next generation of sustainable materials.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Research Area", value: "AI × Materials" },
                { label: "Specialization", value: "DFT / MD / ML" },
                { label: "Sim Tools", value: "VASP / LAMMPS" },
                { label: "AI Stack", value: "PyTorch / LLM Agents" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 space-y-1">
                  <div className="text-[10px] font-mono text-quantum/50 tracking-widest uppercase">{stat.label}</div>
                  <div className="text-sm font-medium text-star/80">{stat.value}</div>
                </div>
              ))}
            </div>

            <a
              href="/Jeff_s_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 glass border-quantum/20 hover:border-quantum/50 rounded-xl font-medium text-star/80 hover:text-quantum-bright transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Curriculum Vitae (CV)
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>

          {/* Right: 3D crystal */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 w-full"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-quantum/20 via-transparent to-cyan/10 rounded-3xl blur-3xl" />
              {/* Orbiting ring decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-quantum/10 animate-spin-slow" 
                style={{ animationDuration: "20s" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-cyan/10 animate-spin-slow"
                style={{ animationDuration: "15s", animationDirection: "reverse" }}
              />
              
              <div className="relative aspect-square rounded-3xl gradient-border bg-space-card/50 overflow-hidden">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center text-quantum/30 font-mono text-sm">
                    Loading 3D...
                  </div>
                }>
                  <CrystalLattice />
                </Suspense>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

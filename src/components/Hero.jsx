import { useEffect, useState } from "react";
import { motion } from "motion/react";

const taglines = [
  "AI for Science.",
  "Accelerating material discovery.",
  "Autonomous agents for atoms.",
  "Computational material science.",
];

export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-quantum/20"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-quantum animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-mono text-quantum/80 tracking-widest">SYSTEM ONLINE</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs font-mono text-star/50">v2026.07</span>
        </motion.div>

        {/* Main title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-star via-star/90 to-star/60">
              Chun Fu Chen
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-3xl lg:text-4xl font-light"
          >
            <span className="text-star/50">Computational </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright via-cyan-bright to-nebula-soft font-medium">
              Material Scientist
            </span>
          </motion.h2>
        </div>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="h-12 flex items-center justify-center"
        >
          <motion.p
            key={taglineIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg md:text-xl text-star/60 font-light tracking-wide"
          >
            {taglines[taglineIdx]}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base md:text-lg text-star/40 max-w-2xl mx-auto leading-relaxed"
        >
          Empowering material discovery and solving complex atomic-scale problems through{" "}
          <span className="text-cyan/70">autonomous AI Agents</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-quantum hover:bg-quantum-bright text-space-deep font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Research
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-quantum to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#contact"
            className="group px-8 py-3.5 bg-transparent text-quantum hover:text-quantum-bright border border-quantum/30 hover:border-quantum/60 font-medium rounded-xl transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              Initialize Contact
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-quantum/40 tracking-[0.4em]">SCROLL</span>
          <div className="w-4 h-7 rounded-full border border-quantum/20 flex justify-center pt-1">
            <div className="w-1 h-1.5 rounded-full bg-quantum/60 animate-scroll-dot" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

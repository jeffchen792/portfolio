import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 md:py-32 border-t border-quantum/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-quantum/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 text-center space-y-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <span className="section-label">// 06. CONTACT</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight">
            Get in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright to-cyan">Touch</span>
          </h2>
          <p className="text-star/40 max-w-xl mx-auto leading-relaxed">
            Interested in AI for Science, autonomous agents, or materials discovery?
            Let&apos;s connect and push the boundaries together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:jeffchen792@gmail.com"
            className="group relative px-8 py-3.5 bg-quantum hover:bg-quantum-bright text-space-deep font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </span>
          </a>

          <a
            href="https://github.com/jeffchen792"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 glass border-quantum/20 hover:border-quantum/50 text-star/80 hover:text-quantum-bright font-medium rounded-xl transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </span>
          </a>
        </motion.div>

        {/* HUD line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hud-line max-w-md mx-auto"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-quantum" />
            <p className="text-xs font-mono text-star/20 tracking-widest">
              &copy; {new Date().getFullYear()} CHUN FU CHEN
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-quantum" />
          </div>
          <p className="text-[10px] font-mono text-star/10">
            BUILT WITH REACT · THREE.JS · TAILWIND · MOTION
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

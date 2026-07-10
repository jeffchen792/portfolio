import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { timeline } from "../data/timeline";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-10 md:pl-14 pb-12 last:pb-0">
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[15px] top-10 bottom-0 w-[2px]">
          <div className="h-full bg-gradient-to-b from-quantum/60 via-cyan/40 to-transparent" />
        </div>
      )}

      {/* Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-[3px] md:left-[7px] top-2 w-[18px] h-[18px] rounded-full bg-quantum border-[3px] border-space-deep"
        style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.6), 0 0 30px rgba(16, 185, 129, 0.2)" }}
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      >
        <div className="group relative rounded-2xl gradient-border">
          <div className="glass rounded-[calc(1rem-1px)] p-6 hover:border-quantum/20 transition-all duration-300">
            {/* Period badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-quantum/10 border border-quantum/20 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-quantum animate-pulse" />
              <span className="text-xs font-mono text-quantum/80">{item.period}</span>
            </div>

            <h3 className="text-xl font-display font-bold text-star/90 mb-1">{item.title}</h3>
            <div className="text-sm text-cyan/70 font-medium mb-3">{item.org}</div>
            <p className="text-star/40 text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        
        <motion.div {...fadeIn} className="space-y-3">
          <span className="section-label">// 05. JOURNEY</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight">
            My{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright via-cyan to-nebula-soft">Journey</span>
          </h2>
          <p className="text-star/40 text-sm md:text-base">
            Academic and professional trajectory
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

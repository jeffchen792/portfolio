import { publications } from "../data/publications";
import { motion } from "motion/react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function Publications() {
  return (
    <section id="publications" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        <motion.div {...fadeIn} className="space-y-3">
          <span className="section-label">// 03. PUBLICATIONS</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-star tracking-tight">
            Selected{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-quantum-bright to-cyan">Publications</span>
          </h2>
          <p className="text-star/40 text-sm md:text-base">
            Peer-reviewed papers, preprints, and academic posters
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative rounded-2xl gradient-border">
                <div className="glass rounded-[calc(1rem-1px)] p-6 md:p-8 hover:border-quantum/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 justify-between">
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-quantum/50">{pub.year}</span>
                        <span className="w-1 h-1 rounded-full bg-quantum/40" />
                        <span className="text-xs font-mono text-star/30 italic">{pub.venue}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-star/90 group-hover:text-quantum-bright transition-colors">
                        {pub.title}
                      </h3>

                      <p className="text-star/40 text-sm">
                        {pub.authors.map((author, i) => (
                          <span key={i}>
                            {author === "Chun Fu Chen" ? (
                              <span className="font-semibold text-quantum-bright">{author}</span>
                            ) : (
                              author
                            )}
                            {i < pub.authors.length - 1 && ", "}
                          </span>
                        ))}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {pub.tags?.map((tag, i) => (
                          <span key={i} className="px-2.5 py-1 bg-quantum/10 text-quantum/70 text-xs font-medium rounded-md border border-quantum/15">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 items-start shrink-0">
                      {pub.links?.pdf && (
                        <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" 
                          className="px-4 py-2 text-sm text-quantum border border-quantum/30 hover:border-quantum/60 hover:bg-quantum/10 font-medium rounded-xl transition-all">
                          PDF
                        </a>
                      )}
                      {pub.links?.doi && (
                        <a href={pub.links.doi} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-sm text-quantum border border-quantum/30 hover:border-quantum/60 hover:bg-quantum/10 font-medium rounded-xl transition-all">
                          DOI
                        </a>
                      )}
                      {pub.links?.code && (
                        <a href={pub.links.code} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-sm text-quantum border border-quantum/30 hover:border-quantum/60 hover:bg-quantum/10 font-medium rounded-xl transition-all">
                          Code
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

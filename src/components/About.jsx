import { lazy, Suspense } from "react";
import Reveal from "./Reveal";

const CrystalLattice = lazy(() => import("./CrystalLattice"));

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* 左側：文字介紹 */}
          <div className="md:w-1/2 space-y-6">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Me</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
            <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
              <p>
                Hello! I am Chun Fu Chen, a Computational Material Scientist deeply passionate about the intersection of <strong className="text-emerald-700 font-medium">Artificial Intelligence and Science</strong>.
              </p>
              <p>
                My research focuses on leveraging autonomous AI Agents to accelerate material discovery and solve complex atomic-scale problems. I believe that by combining rigorous physical simulations with modern machine learning, we can unlock the next generation of sustainable materials.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="/Jeff_s_cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-800 border border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-md rounded-xl font-medium transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                View Curriculum Vitae (CV)
              </a>
            </div>
            </Reveal>
          </div>

          {/* 右側：視覺意象區塊 */}
          <div className="md:w-1/2 w-full">
            <Reveal delay={300}>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-100 to-stone-100 border border-white shadow-xl shadow-stone-200/50 overflow-hidden">
              <Suspense fallback={null}>
                <CrystalLattice />
              </Suspense>
            </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

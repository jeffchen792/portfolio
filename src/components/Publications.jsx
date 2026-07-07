import { publications } from "../data/publications";
import Reveal from "./Reveal";

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* 區塊標題 */}
        <Reveal>
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
              Selected <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Publications</span>
            </h2>
            <p className="text-stone-500 text-sm md:text-base">
              Peer-reviewed papers, preprints, and academic posters
            </p>
          </div>
        </Reveal>

        {/* 論文列表 */}
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="bg-white/70 backdrop-blur-md border border-stone-200 rounded-3xl p-6 hover:border-emerald-300 transition-colors shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  {/* 主要內容 */}
                  <div className="space-y-3">
                    <p className="text-sm text-stone-400 font-mono">{pub.year}</p>
                    <h3 className="text-xl font-bold text-stone-800">{pub.title}</h3>
                    
                    <p className="text-stone-500">
                      {pub.authors.map((author, i) => (
                        <span key={i}>
                          {author === "Chun Fu Chen" ? (
                            <span className="font-semibold text-emerald-700">{author}</span>
                          ) : (
                            author
                          )}
                          {i < pub.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    
                    <p className="italic text-stone-600 text-sm">{pub.venue}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {pub.tags?.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 連結按鈕 */}
                  <div className="flex gap-3 items-start shrink-0 pt-2 md:pt-0">
                    {pub.links?.pdf && (
                      <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm text-emerald-800 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 font-medium rounded-xl transition-all">
                        PDF
                      </a>
                    )}
                    {pub.links?.doi && (
                      <a href={pub.links.doi} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm text-emerald-800 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 font-medium rounded-xl transition-all">
                        DOI
                      </a>
                    )}
                    {pub.links?.code && (
                      <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm text-emerald-800 border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 font-medium rounded-xl transition-all">
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

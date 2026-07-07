import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer id="contact" className="py-24 border-t border-stone-200/50 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
            Get in <span className="text-emerald-700">Touch</span>
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
            Interested in AI for Science, autonomous agents, or materials discovery?
            Let&apos;s connect.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:jeffchen792@gmail.com"
              className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Email Me
            </a>
            <a
              href="https://github.com/jeffchen792"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent hover:bg-stone-100 text-emerald-800 border-2 border-emerald-700/20 hover:border-emerald-700/50 font-medium rounded-xl transition-all duration-300"
            >
              GitHub
            </a>
          </div>
          <p className="text-sm text-stone-400 pt-8">
            © {new Date().getFullYear()} Chun Fu Chen. Built with React &amp; Tailwind.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

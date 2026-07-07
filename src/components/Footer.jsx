import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer id="contact" className="py-24 border-t border-emerald-900/50 bg-emerald-900">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-50 tracking-tight">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-400">Touch</span>
          </h2>
          <p className="text-emerald-100 max-w-xl mx-auto leading-relaxed mt-4">
            Interested in AI for Science, autonomous agents, or materials discovery?
            Let&apos;s connect.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="mailto:jeffchen792@gmail.com"
              className="px-8 py-3 bg-teal-300 hover:bg-teal-400 text-emerald-900 font-bold rounded-xl shadow-lg shadow-teal-300/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Email Me
            </a>
            <a
              href="https://github.com/jeffchen792"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent hover:bg-emerald-800 text-teal-300 border-2 border-teal-300/30 hover:border-teal-300 font-medium rounded-xl transition-all duration-300"
            >
              GitHub
            </a>
          </div>
          <p className="text-sm text-emerald-600 pt-8">
            © {new Date().getFullYear()} Chun Fu Chen. Built with React &amp; Tailwind.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

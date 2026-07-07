import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Showcase from "./components/Showcase"
import Publications from "./components/Publications"
import Skills from "./components/Skills"
import Timeline from "./components/Timeline"
import Footer from "./components/Footer"
import AuroraBackground from "./components/AuroraBackground"
import ParticleField from "./components/ParticleField"

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 relative">
      <AuroraBackground />
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
        <Publications />
        <Skills />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}

export default App

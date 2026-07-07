import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Showcase from "./components/Showcase"
import Footer from "./components/Footer"
import AuroraBackground from "./components/AuroraBackground"

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 relative">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
      </main>
      <Footer />
    </div>
  )
}

export default App

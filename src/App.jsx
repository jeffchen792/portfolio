import { useSmoothScroll } from "./lib/scroll";
import QuantumField from "./components/QuantumField";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Showcase from "./components/Showcase";
import Publications from "./components/Publications";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

function App() {
  useSmoothScroll();

  return (
    <div className="min-h-screen font-sans selection:bg-quantum/30 selection:text-quantum-bright relative">
      {/* 3D Quantum background */}
      <QuantumField />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
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
  );
}

export default App;

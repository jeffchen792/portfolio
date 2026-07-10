import { useEffect, useState } from "react";
import { initSmoothScroll } from "./lib/scroll";
import QuantumExperience from "./components/QuantumExperience";
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
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const cleanup = initSmoothScroll();
    let alive = true;
    document.fonts.ready.then(() => alive && setFontsReady(true));
    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-quantum/30 selection:text-quantum-bright">
      {/* 3D Quantum Experience — fixed background, camera driven by scroll */}
      {fontsReady && <QuantumExperience />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Content — normal document flow, scroll drives the 3D camera journey */}
      <Navbar />
      <main className="relative z-10">
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

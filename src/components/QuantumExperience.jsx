import { Canvas } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { scrollState, useScrollStore } from "../lib/scroll";
import CameraRig from "./CameraRig";
import QuantumWorld from "./QuantumWorld";

// true = seriously underpowered → skip 3D entirely
function isTooWeak() {
  if (typeof navigator === "undefined") return false;
  return (navigator.hardwareConcurrency ?? 4) < 2;
}

// true = prefers less motion → keep 3D but tone down effects
const prefersReduced = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function PostSurge({ bloomRef, chromaRef }) {
  useEffect(() => {
    if (prefersReduced) return;
    let raf;
    const tick = () => {
      const v = Math.abs(scrollState.velocity);
      const surge = Math.min(v * 2, 1);
      if (bloomRef.current) bloomRef.current.intensity = 0.6 + surge * 0.5;
      if (chromaRef.current) {
        const o = 0.0004 + surge * 0.004;
        chromaRef.current.offset.x = o;
        chromaRef.current.offset.y = o;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

export default function QuantumExperience() {
  const bloomRef = useRef(null);
  const chromaRef = useRef(null);
  const [skip3D, setSkip3D] = useState(false);
  const weak = isTooWeak();
  const contactProgress = useScrollStore((s) => s.progress > 0.88 ? (s.progress - 0.88) / 0.12 : 0);

  // Performance watchdog: only after 3s warmup, much higher tolerance
  useEffect(() => {
    if (weak) { setSkip3D(true); console.warn("[3D] skipped: hardware too weak"); return; }
    let badFrames = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let raf;
    const check = (t) => {
      const dt = t - lastTime;
      elapsed += dt;
      lastTime = t;
      // Don't count during first 3s (shader compilation)
      if (elapsed > 3000 && dt > 55) badFrames++;
      else badFrames = Math.max(0, badFrames - 1);
      if (badFrames > 120) {
        console.warn("[3D] skipped: sustained low FPS");
        setSkip3D(true);
      } else {
        raf = requestAnimationFrame(check);
      }
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (skip3D) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.08) 0%, #02010a 70%)" }} />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        events={() => undefined}
        dpr={[1, prefersReduced ? 1 : 1.25]}
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.5, 10], fov: 50, near: 0.1, far: 300 }}
        onCreated={(state) => {
          state.scene.fog = new THREE.FogExp2("#050310", 0.0008);
          state.gl.domElement.style.pointerEvents = "none";
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050310"]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[20, 15, 10]} intensity={0.8} color="#c4b5fd" />
          <pointLight position={[-18, 3, -55]} intensity={1.2} color="#10b981" distance={25} />
          <pointLight position={[8, -2, -95]} intensity={0.8} color="#a78bfa" distance={20} />

          <CameraRig />
          <QuantumWorld contactProgress={contactProgress} />

          <EffectComposer multisampling={prefersReduced ? 0 : 2}>
            <Bloom ref={bloomRef} intensity={prefersReduced ? 0.3 : 0.6}
              luminanceThreshold={0.28} luminanceSmoothing={0.9} mipmapBlur />
            {!prefersReduced && <ChromaticAberration ref={chromaRef} offset={[0.0004, 0.0004]} />}
            <Vignette eskil={false} offset={0.12} darkness={0.7} />
          </EffectComposer>
          <PostSurge bloomRef={bloomRef} chromaRef={chromaRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

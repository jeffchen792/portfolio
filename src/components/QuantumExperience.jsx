import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { scrollState, useScrollStore } from "../lib/scroll";
import CameraRig from "./CameraRig";
import QuantumWorld from "./QuantumWorld";

/** Detect low-power GPU — skip post-processing on integrated/mobile GPUs */
function isLowPower() {
  if (typeof navigator === "undefined") return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

function PostSurge({ bloomRef }) {
  useEffect(() => {
    let raf;
    const tick = () => {
      const v = Math.abs(scrollState.velocity);
      const surge = Math.min(v * 2, 1);
      if (bloomRef.current) bloomRef.current.intensity = 0.6 + surge * 0.5;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

export default function QuantumExperience() {
  const bloomRef = useRef(null);
  const [skip3D, setSkip3D] = useState(false);
  const lowPower = isLowPower();
  const contactProgress = useScrollStore((s) => s.progress > 0.88 ? (s.progress - 0.88) / 0.12 : 0);

  // On first frame, if FPS drops below 20 for 2 seconds, fall back
  useEffect(() => {
    if (lowPower) { setSkip3D(true); return; }
    let badFrames = 0;
    let lastTime = performance.now();
    let raf;
    const check = () => {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;
      if (dt > 50) badFrames++;
      else badFrames = Math.max(0, badFrames - 1);
      if (badFrames > 40) setSkip3D(true);
      else raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    setTimeout(() => cancelAnimationFrame(raf), 4000);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (skip3D) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.08) 0%, #02010a 70%)" }} />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, lowPower ? 1 : 1.25]}
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: lowPower ? "low-power" : "high-performance",
        }}
        camera={{ position: [0, 0.5, 10], fov: 50, near: 0.1, far: 300 }}
        onCreated={(state) => {
          state.scene.fog = new THREE.FogExp2("#050310", 0.003);
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050310"]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[20, 15, 10]} intensity={0.7} color="#c4b5fd" />
          <pointLight position={[-18, 3, -55]} intensity={1.2} color="#10b981" distance={25} />
          <pointLight position={[8, -2, -95]} intensity={0.8} color="#a78bfa" distance={20} />

          <CameraRig />
          <QuantumWorld contactProgress={contactProgress} />

          {!lowPower && (
            <EffectComposer multisampling={lowPower ? 0 : 2}>
              <Bloom ref={bloomRef} intensity={0.6} luminanceThreshold={0.28} luminanceSmoothing={0.9} mipmapBlur />
              <Vignette eskil={false} offset={0.12} darkness={0.7} />
            </EffectComposer>
          )}
          {!lowPower && <PostSurge bloomRef={bloomRef} />}
        </Suspense>
      </Canvas>
    </div>
  );
}

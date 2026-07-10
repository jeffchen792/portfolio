import { Canvas } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "../lib/scroll";
import { useScrollStore } from "../lib/scroll";
import CameraRig from "./CameraRig";
import QuantumWorld from "./QuantumWorld";

/**
 * Drives bloom + chromatic aberration intensity based on scroll velocity.
 */
function PostSurge({ bloomRef, chromaRef }) {
  const contactProgress = useScrollStore((s) => {
    return s.progress > 0.88 ? (s.progress - 0.88) / 0.12 : 0;
  });

  useEffect(() => {
    let raf;
    const tick = () => {
      const v = Math.abs(scrollState.velocity);
      const surge = Math.min(v * 2, 1);
      if (bloomRef.current) bloomRef.current.intensity = 0.8 + surge * 0.6;
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
  const contactProgress = useScrollStore((s) => {
    return s.progress > 0.88 ? (s.progress - 0.88) / 0.12 : 0;
  });

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.5, 10], fov: 50, near: 0.1, far: 400 }}
        onCreated={(state) => {
          state.scene.fog = new THREE.FogExp2("#050310", 0.002);
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050310"]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[20, 15, 10]} intensity={0.8} color="#c4b5fd" />
          <pointLight position={[-18, 3, -55]} intensity={1.5} color="#10b981" distance={30} />
          <pointLight position={[8, -2, -95]} intensity={1} color="#a78bfa" distance={25} />

          <CameraRig />
          <QuantumWorld contactProgress={contactProgress} />

          <EffectComposer multisampling={4}>
            <Bloom
              ref={bloomRef}
              intensity={0.8}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration ref={chromaRef} offset={[0.0004, 0.0004]} />
            <Vignette eskil={false} offset={0.15} darkness={0.75} />
          </EffectComposer>

          <PostSurge bloomRef={bloomRef} chromaRef={chromaRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

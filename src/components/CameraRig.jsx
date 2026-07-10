import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sampleCamera } from "../lib/journey";
import { scrollState } from "../lib/scroll";

const _recoil = new THREE.Vector3();

export default function CameraRig({ children }) {
  const smoothP = useRef(0);
  const pos = useRef(new THREE.Vector3(0, 0.5, 10));
  const tgt = useRef(new THREE.Vector3(0, 0.5, 0));
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const cam = state.camera;

    // Smooth the raw progress — camera trails scroll slightly
    smoothP.current = THREE.MathUtils.damp(smoothP.current, scrollState.progress, 3.5, dt);
    const p = smoothP.current;

    const fov = sampleCamera(p, pos.current, tgt.current);

    // Mouse parallax (stronger in hero)
    const px = state.pointer.x;
    const py = state.pointer.y;
    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, px, 4, dt);
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, py, 4, dt);
    const heroFactor = 1 - THREE.MathUtils.smoothstep(p, 0.05, 0.2);
    const amt = 0.5 * heroFactor + 0.2;
    pos.current.x += mouse.current.x * amt;
    pos.current.y += mouse.current.y * amt * 0.5;

    // Velocity shake
    const v = Math.abs(scrollState.velocity);
    const shake = Math.min(v * 5, 1);
    const t = state.clock.elapsedTime;
    const s = shake * 0.04;
    pos.current.x += Math.sin(t * 25) * s;
    pos.current.y += Math.cos(t * 22) * s;

    cam.position.copy(pos.current);
    cam.lookAt(tgt.current);

    // FOV smoothing
    const targetFov = fov + shake * 3;
    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = THREE.MathUtils.damp(cam.fov, targetFov, 6, dt);
      cam.updateProjectionMatrix();
    }
  });

  return children ? children : null;
}

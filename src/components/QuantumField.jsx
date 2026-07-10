import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function QuantumField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Starfield ──
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = -10 - Math.random() * 40;
      starSizes[i] = Math.random() * 1.5 + 0.3;
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    const starsMat = new THREE.PointsMaterial({
      color: 0xeef2ff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // ── Quantum particles (emerald/cyan glow) ──
    const quantumGroup = new THREE.Group();
    const particleCount = 200;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const geo = new THREE.SphereGeometry(0.04 + Math.random() * 0.08, 8, 8);
      const color = Math.random() > 0.5
        ? new THREE.Color().setHSL(0.45 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3)
        : new THREE.Color().setHSL(0.52 + Math.random() * 0.08, 0.9, 0.4 + Math.random() * 0.3);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = {
        baseX: (Math.random() - 0.5) * 80,
        baseY: (Math.random() - 0.5) * 50,
        baseZ: -5 - Math.random() * 25,
        speed: 0.2 + Math.random() * 0.8,
        amplitude: 1 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        targetOpacity: 0.3 + Math.random() * 0.5,
      };
      mesh.position.set(mesh.userData.baseX, mesh.userData.baseY, mesh.userData.baseZ);
      quantumGroup.add(mesh);
      particles.push(mesh);
    }
    scene.add(quantumGroup);

    // ── Orbital rings ──
    const ringGroup = new THREE.Group();
    const ringCount = 3;
    for (let r = 0; r < ringCount; r++) {
      const radius = 12 + r * 6;
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 180);
      const hue = 0.47 + r * 0.04;
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.7, 0.5),
        transparent: true,
        opacity: 0.15 + r * 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + r * 0.3;
      ring.rotation.y = r * 0.5;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    let time = 0;
    let raf;
    const animate = () => {
      time += 0.005;
      raf = requestAnimationFrame(animate);

      // Subtle camera sway
      camera.position.x = Math.sin(time * 0.3) * 1.5;
      camera.position.y = Math.cos(time * 0.4) * 1;
      camera.lookAt(0, 0, 0);

      // Rotate starfield slowly
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;

      // Animate quantum particles
      for (const p of particles) {
        const { baseX, baseY, baseZ, speed, amplitude, phase, targetOpacity } = p.userData;
        p.position.x = baseX + Math.sin(time * speed + phase) * amplitude;
        p.position.y = baseY + Math.cos(time * speed * 1.3 + phase) * amplitude * 0.8;
        p.position.z = baseZ + Math.sin(time * 0.5 + phase) * 3;
        // Pulse opacity
        const opacityPulse = targetOpacity * (0.7 + 0.3 * Math.sin(time * 2 + phase));
        p.material.opacity += (opacityPulse - p.material.opacity) * 0.03;
      }

      // Rotate rings
      ringGroup.children.forEach((ring, i) => {
        ring.rotation.z += 0.0003 * (i + 1) * (i % 2 === 0 ? 1 : -1);
      });

      renderer.render(scene, camera);
    };

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -50 }}
    />
  );
}

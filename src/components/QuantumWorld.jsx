import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CRYSTAL_CENTER, MOLECULE_CENTER, ORBITAL_CENTER, PROJECTS_CRYSTAL, BOND_CENTER } from "../lib/journey";
import { scrollState } from "../lib/scroll";

/** ── Crystal Lattice (FCC) ── */
function CrystalLattice3D({ position, scale = 1, color = "#10b981", emissive = "#064e3b" }) {
  const groupRef = useRef();
  const { atoms, bonds } = useMemo(() => {
    const atoms = [];
    const N = 3;
    const spacing = 2.2;
    const offset = ((N - 1) * spacing) / 2;
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) {
          // FCC: face-centered positions
          if (x < N - 1 && y < N - 1 && z < N - 1) {
            const cx = x * spacing - offset + spacing / 2;
            const cy = y * spacing - offset + spacing / 2;
            const cz = z * spacing - offset + spacing / 2;
            atoms.push([cx, cy, cz]);
          }
          atoms.push([x * spacing - offset, y * spacing - offset, z * spacing - offset]);
        }
    const bonds = [];
    const threshold = spacing * 1.05;
    for (let i = 0; i < atoms.length; i++)
      for (let j = i + 1; j < atoms.length; j++) {
        const d = Math.hypot(atoms[i][0] - atoms[j][0], atoms[i][1] - atoms[j][1], atoms[i][2] - atoms[j][2]);
        if (d < threshold) bonds.push([atoms[i], atoms[j]]);
      }
    return { atoms, bonds };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {atoms.map((p, i) => (
        <mesh key={`a${i}`} position={p}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} metalness={0.1} roughness={0.3} />
        </mesh>
      ))}
      {bonds.map(([a, b], i) => {
        const start = new THREE.Vector3(...a);
        const end = new THREE.Vector3(...b);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        return (
          <mesh key={`b${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.04, 0.04, len, 6]} />
            <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

/** ── Molecular Cluster ── */
function MolecularCluster({ position }) {
  const groupRef = useRef();
  const particles = useMemo(() => {
    const p = [];
    const centerAtoms = 5;
    for (let i = 0; i < centerAtoms; i++) {
      const theta = (i / centerAtoms) * Math.PI * 2;
      const phi = Math.acos(2 * (i / centerAtoms) - 1);
      const r = 2.5;
      p.push({
        pos: [Math.sin(phi) * Math.cos(theta) * r, Math.sin(phi) * Math.sin(theta) * r, Math.cos(phi) * r],
        size: 0.35,
      });
    }
    for (let i = 0; i < 12; i++) {
      p.push({
        pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8],
        size: 0.06 + Math.random() * 0.1,
      });
    }
    return p;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial
            color={i < 7 ? "#a78bfa" : "#67e8f9"}
            emissive={i < 7 ? "#7c3aed" : "#06b6d4"}
            emissiveIntensity={0.6}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/** ── Electron Orbital Clouds ── */
function OrbitalClouds({ position }) {
  const groupRef = useRef();
  const rings = useMemo(() => {
    return [6, 10, 15].map((r, i) => ({
      radius: r,
      color: i === 0 ? "#10b981" : i === 1 ? "#22d3ee" : "#a78bfa",
      speed: 0.5 + i * 0.3,
      tilt: i * 0.5,
    }));
  }, []);

  const particlesRef = useRef([]);
  const particleData = useMemo(() => {
    return Array.from({ length: 100 }, () => ({
      baseAngle: Math.random() * Math.PI * 2,
      radius: 3 + Math.random() * 16,
      height: (Math.random() - 0.5) * 8,
      speed: 0.2 + Math.random() * 0.8,
      size: 0.04 + Math.random() * 0.12,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Animate orbital particle cloud
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = particleData[i];
      const angle = d.baseAngle + t * d.speed;
      mesh.position.x = Math.cos(angle) * d.radius;
      mesh.position.z = Math.sin(angle) * d.radius;
      mesh.position.y = d.height + Math.sin(t * 0.5 + d.baseAngle) * 2;
      mesh.material.opacity = 0.3 + 0.3 * Math.sin(t * 1.5 + d.baseAngle);
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Orbital rings */}
      {rings.map((ring, i) => (
        <mesh key={`ring${i}`} rotation={[ring.tilt, i * 0.4, 0]}>
          <torusGeometry args={[ring.radius, 0.03, 16, 120]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.4} />
        </mesh>
      ))}
      {/* Electron cloud particles */}
      {particleData.map((_, i) => (
        <mesh
          key={`ep${i}`}
          ref={(el) => { particlesRef.current[i] = el; }}
        >
          <sphereGeometry args={[particleData[i].size, 4, 4]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** ── Bond Formation Effect (Contact climax) ── */
function BondFormation({ position, progress }) {
  const ref = useRef();
  const particles = useMemo(() =>
    Array.from({ length: 50 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 2 + Math.random() * 8,
      height: (Math.random() - 0.5) * 6,
      speed: 0.5 + Math.random() * 1.5,
    })), []
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const child = ref.current.children[i];
      if (!child) return;
      const a = p.angle + t * p.speed;
      child.position.x = Math.cos(a) * p.radius * progress;
      child.position.z = Math.sin(a) * p.radius * progress;
      child.position.y = p.height * progress;
      child.scale.setScalar(0.3 + progress * 0.7);
      child.material.opacity = progress;
    });
  });

  return (
    <group ref={ref} position={position}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

/** ── Starfield / Quantum Field Background ── */
function QuantumFieldBg() {
  const starsRef = useRef();
  const starsGeo = useMemo(() => {
    const count = 800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      const hue = 0.45 + Math.random() * 0.15; // green-cyan range
      const c = new THREE.Color().setHSL(hue, 0.6, 0.3 + Math.random() * 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.015;
      starsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry {...starsGeo} />
      <pointsMaterial size={0.2} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/** ── Main Quantum World ── */
export default function QuantumWorld({ contactProgress = 0 }) {
  return (
    <group>
      <QuantumFieldBg />
      <CrystalLattice3D position={CRYSTAL_CENTER} scale={1.2} />
      <MolecularCluster position={MOLECULE_CENTER} />
      <OrbitalClouds position={ORBITAL_CENTER} />
      <CrystalLattice3D position={PROJECTS_CRYSTAL.position} scale={1.5} color="#a78bfa" emissive="#7c3aed" />
      <BondFormation position={BOND_CENTER} progress={contactProgress} />
    </group>
  );
}

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Lattice() {
  const { atoms, bonds } = useMemo(() => {
    const atoms = [];
    const N = 3;            // 3x3x3 簡單立方晶格
    const spacing = 1.4;    // 原子間距
    const offset = ((N - 1) * spacing) / 2;
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++)
          atoms.push([x * spacing - offset, y * spacing - offset, z * spacing - offset]);

    // 只連最近鄰（距離 == spacing 的原子對）
    const bonds = [];
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const [ax, ay, az] = atoms[i];
        const [bx, by, bz] = atoms[j];
        const d = Math.hypot(ax - bx, ay - by, az - bz);
        if (Math.abs(d - spacing) < 0.01) bonds.push([atoms[i], atoms[j]]);
      }
    }
    return { atoms, bonds };
  }, []);

  return (
    <group>
      {atoms.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#2A453B" metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
      {bonds.map(([a, b], i) => {
        const start = new THREE.Vector3(...a);
        const end = new THREE.Vector3(...b);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={`b${i}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.04, 0.04, len, 8]} />
            <meshStandardMaterial color="#D4F134" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function CrystalLattice() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [4.5, 3.5, 4.5], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Lattice />
      <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

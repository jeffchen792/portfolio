import * as THREE from "three";

/** Total scroll pages */
export const TOTAL_PAGES = 10;

/** Section definitions mapped to scroll progress */
export const SECTIONS = [
  { id: "hero", label: "Home", range: [0.0, 0.13] },
  { id: "about", label: "About", range: [0.13, 0.30] },
  { id: "projects", label: "Research", range: [0.30, 0.48] },
  { id: "publications", label: "Papers", range: [0.48, 0.60] },
  { id: "skills", label: "Skills", range: [0.60, 0.75] },
  { id: "timeline", label: "Journey", range: [0.75, 0.88] },
  { id: "contact", label: "Contact", range: [0.88, 1.0] },
];

/* ── Quantum World Landmarks ── */

export const CRYSTAL_CENTER = new THREE.Vector3(-18, 3, -55);
export const MOLECULE_CENTER = new THREE.Vector3(8, -2, -95);
export const ORBITAL_CENTER = new THREE.Vector3(-10, -1, -135);

export const PROJECTS_CRYSTAL = {
  position: new THREE.Vector3(6, -3, -175),
  radius: 10,
  ringRadius: 22,
};

export const BOND_CENTER = new THREE.Vector3(0, 2, -215);

/* ── Camera Keyframes ── */

const CAMERA_KEYS = [
  { p: 0.0, pos: [0, 0.5, 10], tgt: [0, 0.5, 0], fov: 50 },
  { p: 0.08, pos: [0, 0.8, 8], tgt: [0, 0.4, -3], fov: 52 },
  { p: 0.13, pos: [2, 2, 4], tgt: [0, 0, -12], fov: 55 },
  { p: 0.20, pos: [-5, 4, -20], tgt: [-14, 3, -45], fov: 55 },
  { p: 0.28, pos: [-3, 2.5, -42], tgt: [-17, 2, -58], fov: 50 },
  { p: 0.32, pos: [4, 1, -60], tgt: [8, -2, -82], fov: 50 },
  { p: 0.40, pos: [14, 3, -75], tgt: [8, -1, -95], fov: 48 },
  { p: 0.46, pos: [6, 0, -85], tgt: [7, -2, -100], fov: 50 },
  { p: 0.50, pos: [-2, -1, -95], tgt: [-6, 0, -115], fov: 50 },
  { p: 0.57, pos: [-6, -2, -108], tgt: [-10, -1, -130], fov: 48 },
  { p: 0.62, pos: [-10, 2, -120], tgt: [-10, -1, -140], fov: 50 },
  { p: 0.72, pos: [-5, -1, -132], tgt: [0, -1, -150], fov: 48 },
  { p: 0.76, pos: [5, 0, -148], tgt: [6, -3, -170], fov: 48 },
  { p: 0.82, pos: [20, 5, -162], tgt: [6, -2, -175], fov: 45 },
  { p: 0.86, pos: [10, 1, -180], tgt: [4, -1, -195], fov: 46 },
  { p: 0.90, pos: [3, 2.5, -200], tgt: [0, 2, -215], fov: 45 },
  { p: 1.0, pos: [2, 3, -206], tgt: [0, 2, -215], fov: 43 },
];

/* ── Probe Path ── */

const PROBE_KEYS = [
  { p: 0.0, pos: [0, 0, 1] },
  { p: 0.1, pos: [0, 0.5, -2] },
  { p: 0.2, pos: [-8, 2, -30] },
  { p: 0.3, pos: [2, -1, -60] },
  { p: 0.4, pos: [12, 2, -78] },
  { p: 0.5, pos: [-2, -1, -100] },
  { p: 0.6, pos: [-8, -2, -120] },
  { p: 0.7, pos: [-2, -1, -142] },
  { p: 0.8, pos: [16, 3, -170] },
  { p: 0.9, pos: [4, 2, -205] },
  { p: 1.0, pos: [0, 1.5, -218] },
];

/* ── Curve Builders ── */

function buildCurve(keys) {
  const pts = keys.map((k) => new THREE.Vector3(...k.pos));
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
  const stops = keys.map((k) => k.p);
  return { curve, stops };
}

const camPosCurve = buildCurve(CAMERA_KEYS);
const camTgtCurve = buildCurve(CAMERA_KEYS.map((k) => ({ p: k.p, pos: k.tgt })));
const probeCurve = buildCurve(PROBE_KEYS);

function progressToU(p, stops) {
  const n = stops.length;
  const clamped = Math.max(0, Math.min(1, p));
  for (let i = 0; i < n - 1; i++) {
    if (clamped <= stops[i + 1]) {
      const t = (clamped - stops[i]) / (stops[i + 1] - stops[i]);
      return (i + t) / (n - 1);
    }
  }
  return 1;
}

/* ── Sampling ── */

export function sampleCamera(p, outPos, outTgt) {
  camPosCurve.curve.getPoint(progressToU(p, camPosCurve.stops), outPos);
  camTgtCurve.curve.getPoint(progressToU(p, camTgtCurve.stops), outTgt);

  let fov = CAMERA_KEYS[CAMERA_KEYS.length - 1].fov;
  for (let i = 0; i < CAMERA_KEYS.length - 1; i++) {
    if (p <= CAMERA_KEYS[i + 1].p) {
      const t = (p - CAMERA_KEYS[i].p) / (CAMERA_KEYS[i + 1].p - CAMERA_KEYS[i].p);
      fov = CAMERA_KEYS[i].fov + (CAMERA_KEYS[i + 1].fov - CAMERA_KEYS[i].fov) * Math.max(0, Math.min(1, t));
      break;
    }
  }
  return fov;
}

export function sampleProbe(p, outPos) {
  probeCurve.curve.getPoint(progressToU(p, probeCurve.stops), outPos);
}

/* ── Section Helpers ── */

export function sectionAt(p) {
  for (const s of SECTIONS) {
    if (p <= s.range[1]) return s.id;
  }
  return "contact";
}

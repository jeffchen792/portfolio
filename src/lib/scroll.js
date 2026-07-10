import Lenis from "lenis";
import { create } from "zustand";

/**
 * Mutable shared scroll state — canvas reads this in useFrame (zero React re-renders).
 */
export const scrollState = {
  progress: 0,
  velocity: 0,
};

/** Zustand store for DOM components that need reactive scroll */
export const useScrollStore = create((set) => ({
  progress: 0,
  currentSection: "hero",
  setProgress: (p) => set({ progress: p }),
  setSection: (s) => set({ currentSection: s }),
}));

let lenis = null;

export function initSmoothScroll() {
  if (lenis) return () => {};

  lenis = new Lenis({
    duration: 1.3,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  let lastP = 0;
  let lastT = performance.now();
  let raf = 0;

  const loop = (time) => {
    lenis.raf(time);
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    const now = performance.now();
    const dt = Math.max(1, now - lastT) / 1000;

    // Low-pass velocity
    const instV = (p - lastP) / dt;
    scrollState.velocity += (instV - scrollState.velocity) * Math.min(1, dt * 8);
    scrollState.progress = p;

    // Update zustand store (throttled to avoid excessive renders)
    const store = useScrollStore.getState();
    if (Math.abs(store.progress - p) > 0.002) {
      store.setProgress(p);
    }

    lastP = p;
    lastT = now;
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  // Handle for programmatic scroll
  window.__lenis = lenis;

  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    lenis = null;
  };
}

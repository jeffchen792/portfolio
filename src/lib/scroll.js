import { create } from "zustand";

/** Mutable shared scroll state — canvas reads this in useFrame (zero React re-renders). */
export const scrollState = { progress: 0, velocity: 0 };

/** Zustand store for DOM components that need reactive scroll */
export const useScrollStore = create((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}));

let raf = 0;

export function initSmoothScroll() {
  let lastY = window.scrollY;
  let lastT = performance.now();

  const loop = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const y = window.scrollY;
    const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    const now = performance.now();
    const dt = Math.max(16, now - lastT) / 1000;

    // Velocity (pixels/sec normalized to progress/sec)
    scrollState.velocity = (p - scrollState.progress) / dt;
    scrollState.progress = p;

    // Throttled zustand update
    const store = useScrollStore.getState();
    if (Math.abs(store.progress - p) > 0.003) {
      store.setProgress(p);
    }

    lastT = now;
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => cancelAnimationFrame(raf);
}

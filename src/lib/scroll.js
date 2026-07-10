import { useEffect } from "react";
import Lenis from "lenis";
import { create } from "zustand";

export const useScrollStore = create((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}));

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      useScrollStore.getState().setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    };

    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}

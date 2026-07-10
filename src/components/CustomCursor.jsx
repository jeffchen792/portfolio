import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      cursor.classList.add("scale-150", "border-quantum", "bg-quantum/10");
      dot.classList.add("scale-150", "bg-quantum-bright");
    };
    const onMouseLeaveLink = () => {
      cursor.classList.remove("scale-150", "border-quantum", "bg-quantum/10");
      dot.classList.remove("scale-150", "bg-quantum-bright");
    };

    // Attach hover listeners to interactive elements
    const attachLinkListeners = () => {
      const links = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-cursor="link"]'
      );
      links.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };
    attachLinkListeners();

    // Re-attach on DOM changes (simple approach)
    const observer = new MutationObserver(() => {
      attachLinkListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Smooth follow for outer ring
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Faster follow for inner dot
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 -ml-4 -mt-4 rounded-full border border-quantum/40 transition-[transform,border-color,background-color] duration-200"
        style={{ willChange: "left, top" }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-quantum transition-transform duration-150"
        style={{ willChange: "left, top", boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)" }}
      />
    </>
  );
}

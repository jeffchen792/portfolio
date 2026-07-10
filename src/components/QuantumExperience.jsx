export default function QuantumExperience() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      {/* Deep space gradient base */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, #0a1a14 0%, #050a08 40%, #02010a 100%)" }} />
      
      {/* Quantum field blur blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)", filter: "blur(60px)", animation: "drift1 18s ease-in-out infinite alternate" }} />
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "drift2 22s ease-in-out infinite alternate" }} />
      <div className="absolute bottom-[-15%] left-[30%] w-[50vw] h-[50vw] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(70px)", animation: "drift3 25s ease-in-out infinite alternate" }} />

      {/* Floating particles (CSS only, no canvas) */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: Math.random() > 0.5 ? "rgba(16,185,129,0.5)" : "rgba(6,182,212,0.4)",
              boxShadow: Math.random() > 0.5 ? "0 0 6px rgba(16,185,129,0.6)" : "0 0 4px rgba(6,182,212,0.4)",
              animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

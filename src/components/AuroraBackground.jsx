export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-stone-50">
      {/* Blob 1: 左上角 */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" 
      />
      
      {/* Blob 2: 右上角 */}
      <div 
        className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-lime-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob-reverse" 
        style={{ animationDelay: '2s' }}
      />
      
      {/* Blob 3: 下方 */}
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-teal-100/50 rounded-full mix-blend-multiply filter blur-[120px] animate-blob" 
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}

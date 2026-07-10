# 如何打造一個量子分子科學風格的 3D Portfolio

> 從零到上線，完整還原這個網站的製作過程。

---

## 架構總覽

這個網站的核心是一個 **固定背景的 3D 場景 + 正常文件流的 DOM 內容**，透過捲動同步兩者：

```
┌─────────────────────────────────────┐
│  3D Canvas (fixed, z-0)            │  ← Three.js + React Three Fiber
│  - 星空粒子                          │     Bloom + Vignette 後製
│  - 晶格結構 / 分子雲 / 電子軌道       │     scrollState 驅動攝影機
│  - Scroll-driven 攝影機             │
├─────────────────────────────────────┤
│  DOM Overlays (z-10, flow)          │  ← React + Tailwind
│  - Hero / About / Research / ...    │     玻璃擬態 HUD 面板
│  - motion 進場動畫                   │     Anthropic 字體
└─────────────────────────────────────┘
        ↓ 捲動
  Lenis 平滑滾動 → scrollState.progress
        ↓
  sampleCamera(p) → CatmullRom 曲線上的攝影機位置
```

---

## 第一步：技術棧選擇

| 需求 | 方案 | 原因 |
|------|------|------|
| 建構 | Vite + React 19 | 快、生態成熟 |
| 樣式 | Tailwind CSS v3 | 自訂色系方便 |
| 3D | Three.js + @react-three/fiber | React 生態最好的 3D 方案 |
| 後製 | @react-three/postprocessing | Bloom / Vignette 一鍵套用 |
| 動畫 | motion (framer-motion) | 彈簧物理、進場動畫 |
| 滾動 | Lenis | 絲滑慣性滾動，支援 mutable state |
| 字體 | Anthropic Sans / Serif / Mono | 從 anthropic.com CDN 下載 woff2 |

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install lenis motion zustand
```

---

## 第二步：3D 場景架構

### 2.1 量子世界地圖 (`src/lib/journey.js`)

定義整個 3D 世界的「地標」和攝影機路徑：

```js
// 7 個量子地標，對應 7 個網站區塊
export const CRYSTAL_CENTER = new THREE.Vector3(-18, 3, -55);  // About: FCC 晶格
export const MOLECULE_CENTER = new THREE.Vector3(8, -2, -95);  // Research: 分子團簇
export const ORBITAL_CENTER = new THREE.Vector3(-10, -1, -135); // Skills: 電子軌道
export const PROJECTS_CRYSTAL = { position: new THREE.Vector3(6, -3, -175) };
export const BOND_CENTER = new THREE.Vector3(0, 2, -215);      // Contact: 鍵結形成

// CatmullRom 曲線 — 攝影機沿這條線飛行
const CAMERA_KEYS = [
  { p: 0.0, pos: [0, 0.5, 10], tgt: [0, 0.5, 0], fov: 50 },  // Hero
  { p: 0.13, pos: [2, 2, 4], tgt: [0, 0, -12], fov: 55 },     // → About
  { p: 0.30, pos: [4, 1, -60], tgt: [8, -2, -82], fov: 50 },  // → Research
  // ... 共 17 個 keyframe
  { p: 1.0, pos: [0, 3, -210], tgt: [0, 1, -220], fov: 42 },  // Contact
];

// 用 scroll progress (0~1) 取樣攝影機位置
export function sampleCamera(p, outPos, outTgt) {
  curve.getPoint(progressToU(p, stops), outPos);
  // ... 線性內插 FOV
}
```

### 2.2 3D 場景物件 (`src/components/QuantumWorld.jsx`)

```jsx
// FCC 晶格 — 原子 + 鍵結
function CrystalLattice3D({ position, color = "#10b981" }) {
  const { atoms, bonds } = useMemo(() => {
    // N×N×N 立方晶格 + 面心位置
    // 最近鄰鍵結
  }, []);
  
  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.08; // 緩慢自轉
  });
  
  return (
    <group>
      {atoms.map(p => <mesh><sphereGeometry /><meshStandardMaterial emissive /></mesh>)}
      {bonds.map(([a,b]) => <mesh><cylinderGeometry /><meshStandardMaterial emissive /></mesh>)}
    </group>
  );
}

// 分子團簇 — 中心原子 + 周圍粒子
function MolecularCluster({ position }) { ... }

// 電子軌道雲 — 三層光環 + 浮游粒子
function OrbitalClouds({ position }) {
  // torusGeometry 光環 + 200 粒子在球殼內運動
}

// 鍵結形成 — Contact 高潮，粒子匯聚
function BondFormation({ position, progress }) {
  // progress ∈ [0,1] 控制粒子從散開到匯聚
}
```

### 2.3 Scroll-Driven 攝影機 (`src/components/CameraRig.jsx`)

```jsx
export default function CameraRig() {
  const smoothP = useRef(0);

  useFrame((state, dt) => {
    // 攝影機進度滯後於捲動 (damping)，產生慣性
    smoothP.current = THREE.MathUtils.damp(smoothP.current, scrollState.progress, 3.5, dt);
    
    // 從旅程曲線取樣位置
    const fov = sampleCamera(smoothP.current, pos.current, tgt.current);
    
    // 滑鼠視差 (Hero 區較強)
    const heroFactor = 1 - smoothstep(p, 0.05, 0.2);
    pos.current.x += mouse.x * (0.5 * heroFactor + 0.2);
    
    // 速度震動
    const shake = Math.min(Math.abs(scrollState.velocity) * 5, 1);
    pos.current.x += Math.sin(time * 25) * shake * 0.04;
    
    camera.position.copy(pos.current);
    camera.lookAt(tgt.current);
  });
}
```

### 2.4 後製特效 (`src/components/QuantumExperience.jsx`)

```jsx
<Canvas dpr={[1, 1.25]} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
  <CameraRig />
  <QuantumWorld />
  
  <EffectComposer multisampling={2}>
    <Bloom intensity={0.6} luminanceThreshold={0.28} mipmapBlur />
    <Vignette offset={0.12} darkness={0.7} />
  </EffectComposer>
</Canvas>
```

---

## 第三步：滾動同步系統

### 3.1 Mutable Shared State (`src/lib/scroll.js`)

關鍵設計：**不觸發 React re-render**，Canvas 直接在 `useFrame` 讀取：

```js
// Mutable object — zero re-renders
export const scrollState = { progress: 0, velocity: 0 };

// Zustand store — for DOM components that need reactivity
export const useScrollStore = create(set => ({ progress: 0 }));

export function initSmoothScroll() {
  const lenis = new Lenis({ duration: 1.3, smoothWheel: true });
  
  const loop = (time) => {
    lenis.raf(time);
    scrollState.progress = window.scrollY / maxScroll;  // mutable write
    useScrollStore.getState().setProgress(scrollState.progress); // reactive write
    requestAnimationFrame(loop);
  };
}
```

### 3.2 效能優化

```jsx
// 低效能設備偵測
function isLowPower() {
  return navigator.hardwareConcurrency < 4 
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// 動態 FPS 監控 — 低於 20fps 持續 2 秒 → 降級為純 CSS 背景
useEffect(() => {
  let badFrames = 0;
  const check = () => {
    if (performance.now() - lastTime > 50) badFrames++;
    else badFrames = Math.max(0, badFrames - 1);
    if (badFrames > 40) setSkip3D(true); // 降級!
  };
}, []);
```

---

## 第四步：DOM 層設計

### 4.1 字體系統

從 Anthropic CDN 下載 woff2 → `public/fonts/` → CSS @font-face：

```css
@font-face {
  font-family: 'Anthropic Serif';
  src: url('/fonts/AnthropicSerif-Roman.woff2') format('woff2');
  font-weight: 300 800;
  font-display: swap;
}
```

Tailwind config:
```js
fontFamily: {
  sans: ['Anthropic Sans', 'Inter', ...],   // UI / 標題
  mono: ['Anthropic Mono', 'JetBrains Mono'], // 程式碼
}
// Body 直接用 CSS: font-family: 'Anthropic Serif'
```

### 4.2 玻璃擬態 + HUD 風格

```css
.glass {
  background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(10,8,32,0.65));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(154,220,255,0.12);
}
.hud-corners::before, .hud-corners::after {
  /* ::before = 左上角框, ::after = 右下角框 */
  border: 1.5px solid rgba(16,185,129,0.6);
}
```

---

## 第五步：部署到 Vercel

```bash
npm install -g vercel
vercel login        # 瀏覽器授權一次
vercel link --yes   # 連結到 project
vercel git connect --yes https://github.com/user/repo.git
```

`vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

之後 `git push` → Vercel 自動部署。

---

## 常見問題

| 問題 | 解法 |
|------|------|
| 滾動卡住 | 3D Canvas 加 `pointer-events: none` |
| 字體沒變 | 檢查 body 是否有 `font-sans` class 覆蓋了 serif |
| GPU 風扇狂轉 | 減粒子數：星場 800、軌道雲 100、晶格 N=3；低效能自動降級 |
| 手機掉幀 | dpr cap `[1, 1]`，關閉 Bloom |
| build 失敗 (conda) | `export CONDA_NO_PLUGINS=true && npm run build` |

---

## 關鍵數字

| 項目 | 數值 |
|------|------|
| 總粒子數 | ~1,100 (星空 800 + 軌道 100 + 晶格原子 ~100 + 鍵結 ~100) |
| 攝影機 keyframes | 17 |
| 3D 地標 | 5 (晶格×2、分子雲、軌道雲、鍵結) |
| Post-processing | Bloom + Vignette |
| Bundle size | ~1.3MB (gzip ~370KB) |
| 首次載入 | < 3 秒 (字體 + 3D 場景) |

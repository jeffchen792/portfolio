# Portfolio 專案指南（給人類與 AI 的完整地圖）

> 最後更新：2026-07-10（量子分子世界 v2）

---

## 1. 專案概要

- **網站主人**：Chun Fu Chen（陳俊夫）— Computational Material Scientist
- **網站定位**：學術個人網站 / Portfolio，主題是 **AI for Science**（用自主 AI Agent 加速材料發現）
- **視覺風格**：暗色量子分子實驗室主題 — 深太空底色 + 量子綠 + 青色霓虹 + 紫色分子雲、玻璃擬態 HUD、Bloom 後製特效
- **部署**：push 到 GitHub master → Vercel (`portfolio_v2`) 自動部署
- **生產網址**：https://portfoliov2-sepia-nine.vercel.app

## 2. 技術棧

| 項目 | 內容 |
|------|------|
| 建構工具 | Vite 8 |
| 框架 | React 19（純 JSX） |
| 樣式 | Tailwind CSS v3 + 自訂量子色系 |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| 後製 | @react-three/postprocessing (Bloom, ChromaticAberration, Vignette) |
| 動畫 | motion (framer-motion) |
| 平滑滾動 | Lenis (mutable shared state 架構) |
| 狀態 | zustand |
| 部署 | Vercel (`npm run build` → `dist/`) |

```bash
npm run dev      # http://localhost:5173
npm run build    # 打包驗證
git push         # → Vercel 自動部署
```

## 3. 檔案地圖

```
portfolio/
├── index.html
├── tailwind.config.js        # 量子色系 (space, quantum, cyan, nebula)
├── vercel.json               # Vercel 部署設定
├── DEPLOY.md                 # 部署 knowhow
├── src/
│   ├── main.jsx
│   ├── index.css             # 暗色主題 + glass/HUD utilities
│   ├── App.jsx               # 組裝：3D 場景 + DOM overlays
│   ├── lib/
│   │   ├── journey.js        # 量子世界地圖 (7 地標 + CatmullRom 攝影機路徑)
│   │   └── scroll.js         # Lenis + mutable scrollState + zustand
│   ├── data/
│   │   ├── skills.js
│   │   ├── timeline.js
│   │   └── publications.js
│   └── components/
│       ├── QuantumExperience.jsx  # 主 3D Canvas + 後製特效
│       ├── QuantumWorld.jsx       # 分子場景 (晶格/分子雲/軌道/鍵結)
│       ├── CameraRig.jsx          # Scroll-driven 攝影機
│       ├── CrystalLattice.jsx     # 3D 晶格 (About 右側)
│       ├── CustomCursor.jsx       # 自訂遊標
│       ├── Navbar.jsx             # HUD 玻璃導覽 + 進度條
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Showcase.jsx
│       ├── Publications.jsx
│       ├── Skills.jsx
│       ├── Timeline.jsx
│       └── Footer.jsx
└── public/
    ├── Jeff_s_cv.pdf
    ├── IAM_poster.pdf / IAM_poster_preview.png
    └── logo.png
```

## 4. 設計規範

- **主色**：quantum (`#10b981`)、cyan (`#06b6d4`)、nebula (`#7c3aed`)
- **背景**：`#02010a` (space-deep) + 3D 量子星場
- **面板**：`.glass` (玻璃擬態)、`.hud-corners` (HUD 角標)、`.gradient-border`
- **字體**：Space Grotesk (標題)、Inter (內文)、JetBrains Mono (code)
- **區塊標題**：HUD 標籤 `// 0X. NAME` + `text-3xl md:text-5xl font-display font-bold` + 關鍵詞漸層
- **間距**：section `py-24 md:py-32`，容器 `max-w-7xl mx-auto px-6`

## 5. 3D 量子旅程架構

scrollState.progress ∈ [0,1] 驅動攝影機沿 CatmullRom 曲線飛越 7 個量子地標：

| Progress | 區塊 | 3D 地標 |
|----------|------|---------|
| 0–13% | Hero | 近距量子星場 |
| 13–30% | About | FCC 晶格結構 (翡翠綠) |
| 30–48% | Research | 分子團簇 (紫色) |
| 48–60% | Papers | 穿越分子鍵結區 |
| 60–75% | Skills | 電子軌道雲 (三色光環 + 200 粒子) |
| 75–88% | Journey | 大型紫色晶體 |
| 88–100% | Contact | 鍵結形成高潮 (粒子匯聚) |

## 6. Vercel 部署

- Project: `portfolio_v2` (唯一，其他已刪)
- 設定檔：`vercel.json`
- 詳細 knowhow：`DEPLOY.md`

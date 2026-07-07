# Portfolio 專案指南（給人類與 AI 的完整地圖）

> 這份文件是本專案的「單一事實來源」。任何 AI（Claude / Gemini / GPT）或人類接手時，**請先讀完這份文件再動手改碼**。
> 要動手實作新功能時，接著讀 `portfolio_backlog.md` —— 那是 PM 級的執行工單（含可直接複製的程式碼與驗收標準），照票號順序執行即可。
> 最後更新：2026-07-07

---

## 1. 專案概要

- **網站主人**：Chun Fu Chen（陳俊夫）— Computational Material Scientist
- **網站定位**：學術個人網站 / Portfolio，主題是 **AI for Science**（用自主 AI Agent 加速材料發現）
- **視覺風格**：淺色系、翡翠綠（emerald）+ 石灰色（stone）、玻璃擬態（glassmorphism）、極光漸層背景
- **部署**：push 到 GitHub master → Vercel 自動部署

## 2. 技術棧

| 項目 | 內容 |
|------|------|
| 建構工具 | Vite 8 |
| 框架 | React 19（純 JSX，無 TypeScript 元件） |
| 樣式 | Tailwind CSS **v3**（注意：不是 v4，設定在 `tailwind.config.js`） |
| 動畫 | 目前只有 Tailwind 自訂 keyframes（`animate-blob`），**尚未安裝** framer-motion / three.js 等函式庫 |
| 部署 | Vercel（`npm run build` 產出 `dist/`） |

常用指令：

```bash
npm run dev      # 本地開發（預設 http://localhost:5173）
npm run build    # 打包
git commit -am "訊息" && git push   # 推上去 Vercel 就自動部署
```

## 3. 檔案地圖（要改什麼開哪個檔）

```
portfolio/
├── index.html                      # HTML 入口、<title>、favicon、SEO meta
├── tailwind.config.js              # 自訂動畫 keyframes（blob）、主題擴充
├── src/
│   ├── main.jsx                    # React 入口（一般不用動）
│   ├── index.css                   # Tailwind 引入 + 全局底色/文字色
│   ├── App.jsx                     # 頁面組裝：區塊順序在這裡調
│   ├── assets/                     # 打包進 bundle 的圖片
│   └── components/
│       ├── Navbar.jsx              # 固定頂部導覽列、Logo
│       ├── Hero.jsx                # 首屏：姓名、頭銜、標語、CTA 按鈕
│       ├── About.jsx               # 自我介紹 + CV 下載按鈕
│       ├── Showcase.jsx            # Featured Research：IAM 海報 PDF 嵌入
│       └── AuroraBackground.jsx    # 全頁固定的極光 blob 背景
└── public/                         # 原封不動複製到網站根目錄
    ├── Jeff_s_cv.pdf               # 履歷（About 的按鈕連到這）
    ├── IAM_poster.pdf              # 研究海報（Showcase 嵌入）
    ├── logo.png                    # Navbar 的 Logo
    └── favicon.svg
```

**加新區塊的標準流程**：在 `src/components/` 建新的 `.jsx` → 在 `App.jsx` import 並插入 `<main>` 的適當位置 → 如果要讓 Navbar 能跳轉，在該區塊的 `<section>` 加 `id="xxx"` 並在 `Navbar.jsx` 加 `<a href="#xxx">`。

## 4. 設計規範（改動時請遵守，保持風格一致）

- **主色**：`emerald-700`（按鈕、強調字）、輔色 `stone-800/600/500`（標題/內文/次要）
- **背景**：`stone-50` 底 + AuroraBackground 的 blob，區塊本身背景要透明或 `bg-white/50~70` + `backdrop-blur`
- **圓角**：卡片 `rounded-3xl`、按鈕 `rounded-xl`、小標籤 `rounded-full`
- **區塊標題格式**：`text-3xl md:text-5xl font-bold`，其中一個詞用 `text-emerald-700` 上色（例：About **Me**、Featured **Research**）
- **間距**：每個 section `py-24`，內容容器 `max-w-7xl mx-auto px-6`
- **hover 語彙**：按鈕 `hover:-translate-y-1` + shadow、卡片 `hover:border-emerald-300`

## 5. 已知問題（接手者可優先修）

1. **`#contact` 死連結**：`Navbar.jsx` 有 Contact 連結、`Hero.jsx` 的「Initialize Contact」按鈕連到 `#about`，但頁面沒有真正的 Contact/Footer 區塊。
2. **About 右側是佔位圖**：目前只是一個 20% 透明度的燒杯 SVG，等待換成照片或更有意義的視覺。
3. **PDF `<iframe>` 在手機上體驗差**：iOS Safari 常常只顯示第一頁且不能捲動，長期建議把海報轉成圖片預覽 + 「Open PDF」按鈕。
4. **SEO/分享卡片未設定**：`index.html` 缺 `<meta name="description">`、Open Graph（`og:title/og:image`）標籤，貼到社群/LINE 不會有預覽。

---

## 6. 架構升級藍圖：還可以多哪些區塊

依「學術 Portfolio 的說服力」排序，由高到低：

### 6.1 Contact / Footer（優先度：最高，順便修死連結）
- `id="contact"`，含 Email、GitHub、LinkedIn、Google Scholar、ORCID 圖示連結。
- 純 Tailwind 即可完成，半小時工作量。

### 6.2 Research / Publications（學術網站的核心）
- 卡片列出論文、preprint、poster、會議發表：標題、作者（自己名字加粗）、期刊/會議、年份、`[PDF] [DOI] [Code]` 按鈕。
- 資料建議抽成 `src/data/publications.js` 陣列，元件用 `.map()` 渲染 —— 之後新增論文只要改資料檔，不用碰 JSX。

### 6.3 Skills / Tech Arsenal（技能矩陣）
- 分三欄：**Simulation**（DFT、MD、VASP/LAMMPS…）、**AI/ML**（PyTorch、LLM Agents、GNN…）、**Engineering**(Python、HPC、Linux…）。
- 用小徽章（badge）牆或進度感的卡片呈現，同樣抽成資料檔。

### 6.4 Timeline / Journey（學經歷時間軸）
- 垂直時間軸：學歷、研究經歷、獲獎。中線用 `border-l-2 border-emerald-200`，節點用小圓點，很符合現有風格。

### 6.5 Projects Grid（把 Showcase 泛化）
- 目前 Showcase 只有一張海報。改成 2~3 欄卡片網格，每張卡：縮圖、標題、一句話、tags、連結。海報變成其中一張卡。
- 之後有 side project（例如你寫的 AI agent 工具）都能放進來。

### 6.6 進階選項（有餘裕再做）
- **Blog / Notes**：需要 markdown 方案（如 Astro 或 MDX），對 Vite+React 來說工程量大，建議先用 Notion/Hashnode 外連。
- **多語系（EN/中文）**：學術圈以英文為主，優先度低。
- **Dark mode**：Tailwind `darkMode: 'class'` + toggle，中等工程量，視覺回報高。

**建議的最終區塊順序**：`Hero → About → Research(Publications) → Projects → Skills → Timeline → Contact/Footer`

---

## 7. 視覺效果升級藍圖

### 第一梯隊：零安裝、純 CSS/Tailwind（先做這些，CP 值最高）

1. **捲動進場動畫（Scroll Reveal）**
   用原生 `IntersectionObserver` 寫一個 `useInView` hook 或 `<Reveal>` 包裝元件，讓每個 section 進入視窗時 fade-in + 上移。這是「網站質感」單一最大提升點。
2. **Hero 打字機/漸現效果**
   姓名逐字浮現，或 "AI for Science" 用 CSS steps() 打字機效果 + 閃爍游標，呼應 Navbar 的 `<chun_fu_chen />` 程式碼感。
3. **漸層描邊卡片（Gradient Border）**
   Showcase 卡片外圈用 `bg-gradient-to-r from-emerald-400 to-teal-300` 包一層 `p-[1px]`，內層放白卡，hover 時漸層轉動。
4. **文字漸層**：標題關鍵詞從單色 emerald 換成 `bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500`。
5. **Navbar 捲動感應**：往下捲時 Navbar 變更不透明 + 陰影加深（一個 scroll listener + state）。

### 第二梯隊：小型 JS、依然零依賴

6. **原子/分子粒子網背景**（最貼合「材料科學家」身分的效果）
   一個 `<canvas>`：隨機粒子（原子）緩慢漂移，距離近的粒子之間畫淡綠色連線（鍵結），像晶格/分子動力學模擬。取代或疊加在 AuroraBackground 上。約 100 行 vanilla JS，效果極具辨識度。
7. **滑鼠 Spotlight**：跟隨游標的柔光暈（`radial-gradient` + mousemove），或卡片邊框隨游標位置亮起（Linear/Vercel 風格）。
8. **3D 傾斜卡片（Tilt）**：滑鼠在卡片上移動時卡片微微 3D 傾斜（`perspective` + `rotateX/Y`），用在 Showcase 卡片。

### 第三梯隊：需安裝套件（效果最強，但要評估載入成本）

9. **`motion`（framer-motion 後繼者）** — `npm install motion`
   彈簧物理動畫、layout 動畫、手勢。適合統一管理所有進場/hover 動畫，取代第一梯隊的手刻方案。
10. **React Three Fiber 3D 晶格** — `npm install three @react-three/fiber @react-three/drei`
    Hero 或 About 右側放一個可旋轉的 3D 晶體結構（如 FCC 晶格、鑽石結構），滑鼠拖曳可轉。這是「Computational Material Scientist」最殺的視覺名片，但 bundle +150KB，建議 lazy load。
11. **數字滾動統計**：`react-countup` 或手刻，放「N 篇論文 / N 次引用 / N 個模擬」的統計條。

### 建議施工順序

```
Phase 1（半天）：Contact/Footer + SEO meta + Scroll Reveal + 文字漸層
Phase 2（半天）：Publications 區塊 + 資料檔抽離 + Projects 網格化
Phase 3（一天）：粒子網背景 or R3F 3D 晶格（二選一，別同時上，會太吵）
Phase 4（選配）：Dark mode、Timeline、Spotlight
```

**視覺總原則**：目前的淺色極光風格是「安靜的高級感」。加特效時遵守 —— 同屏最多一個「會動的主角」；動畫時長 300~700ms、用 ease-out；所有動效尊重 `prefers-reduced-motion`。

---

## 8. 給 AI 接手者的操作提示

- 改任何視覺前先 `npm run dev` 開起來看現況。
- 新增區塊請沿用第 4 節的設計規範，不要引入新的色系或圓角尺寸。
- 內容資料（論文、技能、時間軸）一律抽到 `src/data/*.js`，元件保持純渲染。
- 安裝新套件前先確認第 7 節的梯隊建議 —— 能用 CSS 解決就不裝套件。
- 完成後 `npm run build` 確認打包沒錯再 commit push（Vercel 直接部署 master）。

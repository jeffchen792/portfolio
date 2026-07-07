# Portfolio 執行工單（Backlog）

> **給執行者（AI 或人類）的規則，違反任何一條就算失敗：**
>
> 1. 先讀 `portfolio_project_guide.md`（專案地圖 + 設計規範），再讀本文件。
> 2. **一次只做一張票**。做完一張 → `npm run build` 確認無錯 → commit（訊息格式：`[T編號] 做了什麼`）→ 才能做下一張。
> 3. 不要安裝任何 npm 套件，除非票裡明確寫「需安裝」。
> 4. 不要重構票範圍以外的程式碼，不要「順手美化」其他檔案。
> 5. 所有新樣式必須沿用設計規範：主色 `emerald-700`、卡片 `rounded-3xl`、按鈕 `rounded-xl`、section `py-24` + `max-w-7xl mx-auto px-6`、標題 `text-3xl md:text-5xl font-bold` 且一個詞上 `text-emerald-700`。
> 6. 所有動畫必須尊重 `prefers-reduced-motion`（票內程式碼已處理，別刪掉那段）。
> 7. 票內的程式碼片段是「已審核過的正確答案」，**優先直接使用**，不要自由發揮重寫。
>
> **全域 Definition of Done**：`npm run dev` 目視正常、`npm run build` 無錯誤、手機寬度（375px）不破版。

執行順序 = 票號順序。P0 必做，P1 強烈建議，P2 選配。

---

## T1【P0 / 小】建立 Contact/Footer 區塊，修復死連結

**問題**：`Navbar.jsx` 的 Contact 連結指向 `#contact`，但頁面沒有這個區塊；`Hero.jsx` 的「Initialize Contact」按鈕連到 `#about` 也不合理。

**步驟**：
1. 新建 `src/components/Footer.jsx`，內容如下（社群連結先放 Email 和 GitHub，其他等網站主人提供再加）：

```jsx
export default function Footer() {
  return (
    <footer id="contact" className="py-24 border-t border-stone-200/50 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight">
          Get in <span className="text-emerald-700">Touch</span>
        </h2>
        <p className="text-stone-600 max-w-xl mx-auto leading-relaxed">
          Interested in AI for Science, autonomous agents, or materials discovery?
          Let&apos;s connect.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:jeffchen792@gmail.com"
            className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            Email Me
          </a>
          <a
            href="https://github.com/jeffchen792"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-transparent hover:bg-stone-100 text-emerald-800 border-2 border-emerald-700/20 hover:border-emerald-700/50 font-medium rounded-xl transition-all duration-300"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm text-stone-400 pt-8">
          © {new Date().getFullYear()} Chun Fu Chen. Built with React &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
```

2. 在 `App.jsx` import Footer，放在 `<Showcase />` 之後、`</main>` 之外（footer 不屬於 main）。
3. 把 `Hero.jsx` 裡「Initialize Contact」的 `href="#about"` 改成 `href="#contact"`。

**驗收**：點 Navbar 的 Contact 和 Hero 的 Initialize Contact 都會平滑捲到頁尾；Email 按鈕開啟郵件軟體。

---

## T2【P0 / 小】SEO 與社群分享 meta 標籤

**問題**：`index.html` 沒有 description 和 Open Graph 標籤，分享到社群沒有預覽卡片。

**步驟**：在 `index.html` 的 `<head>` 內加入（`<title>` 若已存在則更新為相同文字）：

```html
<title>Chun Fu Chen | Computational Material Scientist</title>
<meta name="description" content="Chun Fu Chen — Computational Material Scientist. AI for Science: empowering materials discovery through autonomous AI agents." />
<meta property="og:title" content="Chun Fu Chen | Computational Material Scientist" />
<meta property="og:description" content="AI for Science: empowering materials discovery through autonomous AI agents." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/logo.png" />
<meta name="twitter:card" content="summary" />
```

**驗收**：`npm run build` 後 `dist/index.html` 內含以上標籤。

---

## T3【P0 / 中】捲動進場動畫（Scroll Reveal）— 全站質感最大提升點

**步驟**：
1. 新建 `src/components/Reveal.jsx`，**原封不動**使用以下程式碼：

```jsx
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

2. 用法：到 `About.jsx`、`Showcase.jsx`、`Footer.jsx`，把每個 section 的「標題區」和「內容卡片」分別用 `<Reveal>` 包起來，內容卡片加 `delay={150}` 做出先後層次。**不要包 Hero**（首屏東西一進來就該在）。
3. 注意：`<Reveal>` 只是包一層 div，若外層原本有 flex/grid 排版，把 Reveal 放在排版容器**裡面**包各個子項，不要包住排版容器本身，以免破版。

**驗收**：往下捲動時，About / Showcase / Footer 依序淡入上移；系統開啟「減少動態效果」時內容直接顯示不動畫。

---

## T4【P1 / 小】標題文字漸層 + Navbar 捲動感應

**A. 文字漸層**：把各 section 標題中上色的詞（About **Me**、Featured **Research**、Get in **Touch**）的 `text-emerald-700` 換成：

```
bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500
```

Hero 的 `Material Scientist` 一詞也套用相同 class。

**B. Navbar 捲動感應**：改寫 `Navbar.jsx`，往下捲超過 8px 時背景變實、陰影加深：

```jsx
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/85 border-emerald-900/10 shadow-md shadow-emerald-900/5"
          : "bg-white/40 border-transparent shadow-none"
      }`}
    >
      {/* 內部維持原有內容不變 */}
    </nav>
  );
}
```

（`<nav>` 裡面的 logo 和選單維持原檔內容，只換外層 class 邏輯。）

**驗收**：頁面頂端 Navbar 幾乎透明，往下捲後變白變實有陰影，過渡平滑。

---

## T5【P1 / 小】手機版漢堡選單

**問題**：Navbar 選單是 `hidden md:flex`，手機上完全沒有導覽入口。

**步驟**：在 `Navbar.jsx` 加入 state 與漢堡按鈕：

```jsx
const [open, setOpen] = useState(false);
```

1. 在右側選單 div 旁加一個只在手機顯示的按鈕：

```jsx
<button
  onClick={() => setOpen(!open)}
  className="md:hidden p-2 text-stone-600"
  aria-label="Toggle menu"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {open
      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
  </svg>
</button>
```

2. 在 `<nav>` 的容器 div 之後、`</nav>` 之前加下拉面板：

```jsx
{open && (
  <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-6 py-4 flex flex-col gap-4 text-stone-600 font-medium">
    <a href="#about" onClick={() => setOpen(false)}>About</a>
    <a href="#projects" onClick={() => setOpen(false)}>Research</a>
    <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
  </div>
)}
```

**驗收**：375px 寬度下出現漢堡圖示，點開有選單，點任一連結會捲到目標並收合選單。

---

## T6【P1 / 中】Publications 區塊（資料驅動）

**原則**：內容放資料檔，元件純渲染。之後加論文只改資料檔。

**步驟**：
1. 新建 `src/data/publications.js`：

```js
// 每筆欄位：title, authors(陣列, 本人用 "Chun Fu Chen"), venue, year, tags(陣列),
// links: { pdf?, doi?, code? } — 沒有的連結直接省略該 key
export const publications = [
  {
    title: "IAM: Integrating AI Agents into Computational Material Science",
    authors: ["Chun Fu Chen"],
    venue: "Research Poster",
    year: 2026,
    tags: ["AI Agent", "Material Science"],
    links: { pdf: "/IAM_poster.pdf" },
  },
  // TODO: 網站主人提供更多論文後往下加
];
```

2. 新建 `src/components/Publications.jsx`：section 標題 `Selected <span>Publications</span>`（照設計規範），用 `publications.map()` 渲染卡片列表。每張卡片：
   - 外觀：`bg-white/70 backdrop-blur-md border border-stone-200 rounded-3xl p-6 hover:border-emerald-300 transition-colors`
   - 內容由上而下：年份小字（`text-sm text-stone-400`）、標題（`text-xl font-bold text-stone-800`）、作者列（本人名字 `font-semibold text-emerald-700`，其餘 `text-stone-500`）、venue 斜體、tags 徽章（沿用 Showcase 的 `#tag` 樣式）、連結按鈕列（`[PDF] [DOI] [Code]`，只渲染存在的 key，樣式用小號外框按鈕）。
3. `App.jsx` 中插入位置：`<Showcase />` 之後。`Navbar` 可暫不加連結（Research 已指向 #projects）。

**驗收**：資料檔加一筆假論文，畫面自動多一張卡；刪掉後消失。連結按鈕只出現有提供的類型。

---

## T7【P1 / 中】Skills 技能矩陣（資料驅動）

**步驟**：
1. 新建 `src/data/skills.js`：

```js
export const skillGroups = [
  {
    group: "Simulation",
    icon: "🧪", // 可換成 SVG
    items: ["DFT", "Molecular Dynamics", "VASP", "LAMMPS"],
  },
  {
    group: "AI / ML",
    icon: "🤖",
    items: ["PyTorch", "LLM Agents", "Graph Neural Networks", "RAG"],
  },
  {
    group: "Engineering",
    icon: "⚙️",
    items: ["Python", "Linux / HPC", "Git", "React"],
  },
];
// TODO: 以上為佔位內容，請網站主人確認實際技能後修改
```

2. 新建 `src/components/Skills.jsx`：標題 `Technical <span>Arsenal</span>`；三欄網格 `grid md:grid-cols-3 gap-6`；每欄一張玻璃卡（同 T6 卡片樣式），欄名粗體 + icon，之下 items 用徽章牆（`flex flex-wrap gap-2`，徽章沿用 `#tag` 樣式但去掉 `#`）。
3. `App.jsx` 插入位置：Publications 之後、Footer 之前。

**驗收**：三欄在桌面並排、手機直排；改資料檔即改畫面。

---

## T8【P2 / 中】Timeline 學經歷時間軸（資料驅動）

1. 新建 `src/data/timeline.js`：每筆 `{ period: "2024 – Present", title, org, description }`，先放 2~3 筆佔位並標 TODO 請網站主人補真實資料。
2. 新建 `src/components/Timeline.jsx`：標題 `My <span>Journey</span>`；左側一條 `border-l-2 border-emerald-200`，每個節點：絕對定位的小圓點 `w-3 h-3 rounded-full bg-emerald-600 border-2 border-white`、period 小字、title 粗體、org 上 emerald 色、description 內文色。
3. 插入位置：Skills 之後。

**驗收**：時間軸直線貫穿所有節點，手機不破版。

---

## T9【P2 / 大】原子粒子網背景（招牌視覺，貼合材料科學主題)

**效果**：全頁背景疊一層 canvas——粒子（原子）緩慢漂移，鄰近粒子間畫淡綠連線（鍵結），像分子動力學模擬。與現有 Aurora 背景疊加。

**步驟**：
1. 新建 `src/components/ParticleField.jsx`，**原封不動**使用：

```jsx
import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.5 + Math.random() * 2,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      const LINK = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.fillStyle = "rgba(5, 150, 105, 0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-40 pointer-events-none"
    />
  );
}
```

2. `App.jsx` 中放在 `<AuroraBackground />` 的下一行。z-index 已設好（Aurora 是 -z-50，粒子 -z-40，內容在上）。
3. **翻車點**：不要把 canvas 放進任何有 `overflow-hidden` 的容器；不要調高粒子數量上限（90 顆是效能與美觀的平衡點）。

**驗收**：背景有緩慢漂移的綠色粒子與連線，捲動頁面時它固定不動，滑鼠可正常點擊底下內容，開發者工具 Performance 無明顯掉幀。

---

## T10【P2 / 小】Showcase 卡片漸層描邊 + hover 光效

1. 把 `Showcase.jsx` 的主卡片外面包一層：

```jsx
<div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-emerald-300/60 via-teal-200/40 to-emerald-300/60 hover:from-emerald-400 hover:to-teal-400 transition-all duration-500 shadow-xl shadow-stone-200/50">
  {/* 原本的卡片 div，把它的 border 和 shadow class 移除，rounded-3xl 改為 rounded-[calc(1.5rem-1.5px)] */}
</div>
```

**驗收**：卡片有 1.5px 漸層描邊，hover 時描邊變亮，圓角內外貼合無縫。

---

## T11【P2 / 大・需安裝】Hero 3D 互動晶格（最終大招，做完前面才碰）

**需安裝**：`npm install three @react-three/fiber @react-three/drei`

**規格**：
- 新建 `src/components/CrystalLattice.jsx`：用 R3F 畫一個 3×3×3 的 FCC 晶格——球體（原子）用 `meshStandardMaterial`（顏色 `#047857`，metalness 0.3, roughness 0.4），原子間用細圓柱體連線（顏色 `#a7f3d0`）。加 `<OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} enablePan={false} />`。
- 用 `React.lazy` + `<Suspense fallback={null}>` 載入，避免拖慢首屏。
- 放置位置：取代 `About.jsx` 右側的佔位燒杯 SVG（那個 aspect-square 圓角卡片內）。
- Canvas 尺寸跟隨父容器，`dpr={[1, 1.5]}` 控效能。

**驗收**：About 右側出現自動旋轉、可拖曳的 3D 晶格；`npm run build` 後首頁 JS 主 bundle 沒有因此明顯膨脹（three 應在獨立 chunk）；手機上仍流暢。

---

## T12【P2 / 中】海報 PDF 改為圖片預覽

**問題**：`<iframe>` 嵌 PDF 在 iOS Safari 上只能看第一頁且常無法捲動。

**步驟**：
1. 請網站主人（或用工具）把 `IAM_poster.pdf` 第一頁轉成 `public/IAM_poster_preview.png`（寬 1600px、壓縮後 < 500KB）。**如果拿不到圖片，此票跳過，不要自己生成假圖。**
2. `Showcase.jsx` 中把 `<iframe>` 換成 `<img src="/IAM_poster_preview.png" ...>`，整張圖包在 `<a href="/IAM_poster.pdf" target="_blank">` 內，hover 時圖片輕微放大（`group-hover:scale-[1.02] transition-transform`）+ 顯示原有的「Open PDF ↗」按鈕。

**驗收**：手機上能直接看到海報預覽圖，點擊開新分頁看完整 PDF。

---

## 需要網站主人（Jeff）提供的素材清單

執行者遇到以下缺料時：**用 TODO 佔位並在 commit 訊息註明，不要瞎編**。

- [ ] GitHub / LinkedIn / Google Scholar / ORCID 真實連結（T1、T6）
- [ ] 論文 / 發表清單（T6）
- [ ] 真實技能清單（T7 目前是合理猜測的佔位）
- [ ] 學經歷時間軸內容（T8）
- [ ] 個人照片（可選，About 區塊）或確認用 3D 晶格取代（T11）
- [ ] 海報第一頁的 PNG（T12）

## 完成後的最終區塊順序（`App.jsx`）

```
AuroraBackground + ParticleField（背景層）
Navbar
main:
  Hero → About → Showcase → Publications → Skills → Timeline
Footer（#contact）
```

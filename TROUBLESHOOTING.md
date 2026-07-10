# 踩坑記錄

> 這個網站開發過程中遇到的問題與解法。

---

## 1. 滾動卡死：捲到底回不去 ⚠️ 此條目為誤診，真因見 #7

**症狀**：捲到頁面底部後無法往回捲，且底部一片黑。

**嘗試的解法（全部失敗）**：

| 嘗試 | 做法 | 結果 |
|------|------|------|
| #1 | 外層 div 加 `pointer-events-none` | ❌ 問題根本不在 pointer events |
| #2 | CSS `canvas { pointer-events: none !important }` | ❌ 同上 |
| #3 | 拔掉 Lenis，改用原生 scroll | ❌ 問題不在 Lenis |
| #4 | `<Canvas style={{ pointerEvents: "none" }}>` | ❌ 同上 |
| #5 | 砍掉整個 3D 場景換純 CSS | ⚠️ 「有效」是因為順便砍掉了真兇 EffectComposer |
| #6 | 降低霧濃度 | ❌ 無關 |

**當時以為的解法（錯誤，且引入 #8 的新 bug）**：

```jsx
<Canvas events={() => undefined}>   // ❌ 千萬不要這樣做
```

**事後驗屍（2026-07-10）**：真正原因是「捲到底 → React re-render → EffectComposer
對循環引用的 three.js 物件做 JSON.stringify → 整個 app 崩潰 unmount → 黑屏、
文件高度塌陷、看似『捲不回去』」。完整分析見 #7。
`events={() => undefined}` 之所以「治好」滾動，是因為它把整個 render loop
弄死了（見 #8）——3D 一幀都沒畫，自然也不會崩潰。

---

## 2. 3D 場景完全沒 render

**症狀**：頁面打開沒有任何 3D 背景，只有一個 canvas（About 的 CrystalLattice）。

**原因**：`App.jsx` 中 `{fontsReady && <QuantumExperience />}` — `fontsReady` state 依賴 `document.fonts.ready` promise。但自託管的 @font-face 字體（Anthropic Sans/Serif/Mono）可能比 React mount 更早載入，導致 `.then()` 永遠不觸發。

**解法**：3D 場景不需要等字體，直接渲染 `<QuantumExperience />`。

---

## 3. 字體沒變成 Anthropic Serif

**症狀**：內文還是 sans-serif，沒有 Anthropic 網站的襯線感。

**原因**：`App.jsx` 根 div 有 `font-sans` class → Tailwind 將整站字體壓成 Anthropic Sans。

**解法**：移除 `font-sans`，讓 body CSS 的 `font-family: 'Anthropic Serif'` 自然繼承。

---

## 4. Canvas 吃 GPU 效能

**解法**：
- 星場粒子從 2000 → 800
- 晶格從 4³ → 3³
- 電子軌道雲從 200 → 100 粒子
- 鍵結粒子從 80 → 50
- dpr cap 從 [1, 1.5] → [1, 1.25]
- 低效能設備自動降級為純 CSS 背景

---

## 5. Vercel CLI 認證

```bash
vercel login  # 打開瀏覽器授權（一次性）
vercel link --yes --project portfolio_v2
vercel git connect --yes https://github.com/jeffchen792/portfolio.git
```

---

## 6. conda 干擾 npm

每次跑 npm 指令都會跳 conda 錯誤。解法：`export CONDA_NO_PLUGINS=true` 或 `CONDA_NO_PLUGINS=true npx vite build`。

---

## 7. 【真兇一】捲到底 app 整個崩潰：EffectComposer × React re-render

**症狀**：捲過 progress 0.88 後黑屏、文件高度塌陷、scrollY 被夾回 0 →
表面上看是「滾動卡死」（#1 的真正原因）。

**診斷過程**：在 window 上掛 error listener 才抓到（**console 只看 console.log，
抓不到 uncaught exception！**）：

```
Uncaught TypeError: Converting circular structure to JSON
    at @react-three/postprocessing (children -> parent 循環)
```

**因果鏈**：
1. `QuantumExperience` 用 `useScrollStore` 訂閱 `contactProgress`
2. 捲過 0.88 → selector 回傳值改變 → React re-render
3. `<EffectComposer>` 子樹重新評估 → 內部對含循環引用的 three 物件 `JSON.stringify` → throw
4. render 期間的 uncaught error → React 卸載整棵樹 → root 變空 → 黑屏 + 高度塌陷

**解法**：Canvas 子樹「絕不」訂閱會隨捲動變化的 React state。
捲動資料一律走 mutable `scrollState`，在 `useFrame` 內讀取（零 re-render）。
`BondFormation` 的 progress 改為在 useFrame 內自行計算。

---

## 8. 【真兇二】3D 一幀都沒渲染：`events={() => undefined}` 弄死 render loop

**症狀**：canvas 存在、無 console 錯誤、元件都有 mount，但畫面全黑。
useFrame 從未執行（用 `window.__camDebug` 計數器驗證 = null）。

**原因**：#1 當時加的 `events={() => undefined}` 會讓 R3F v9 的 frame loop
靜默死亡——不報錯、不渲染，電子雲/晶格/星場全部看不見。

**解法**：移除 `events` prop。滾動保護已由三層足夠覆蓋：
- CSS `canvas { pointer-events: none !important }`（index.css）
- `onCreated` 設 `state.gl.domElement.style.pointerEvents = "none"`
- 外層 div `pointer-events-none`

若未來真的需要停用 R3F 事件，正確做法是把事件綁到一個 detached 元素：
`eventSource={document.createElement("div")}`，而不是 `events={() => undefined}`。

**副作用備註**：canvas 收不到 pointer 事件 → `state.pointer` 永遠是 (0,0) →
CameraRig 的滑鼠視差目前無效。若要恢復，需在 window 層級監聽 pointermove
寫入 mutable 物件，再由 useFrame 讀取。

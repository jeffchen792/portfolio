# 踩坑記錄

> 這個網站開發過程中遇到的問題與解法。

---

## 1. 滾動卡死：捲到底回不去

**症狀**：捲到頁面底部後無法往回捲，且底部一片黑。

**嘗試的解法（全部失敗）**：

| 嘗試 | 做法 | 結果 |
|------|------|------|
| #1 | 外層 div 加 `pointer-events-none` | ❌ R3F 內部 canvas 自己的 `pointer-events: auto` 蓋掉了 |
| #2 | CSS `canvas { pointer-events: none !important }` | ❌ R3F 的 event manager 仍然註冊了 DOM listener |
| #3 | 拔掉 Lenis，改用原生 scroll | ❌ 問題不在 Lenis |
| #4 | `<Canvas style={{ pointerEvents: "none" }}>` | ❌ style prop 沒傳到 canvas DOM |
| #5 | 砍掉整個 3D 場景換純 CSS | ⚠️ 滾動正常但沒 3D 視覺 |
| #6 | 降低霧濃度 | ❌ 無關 |

**最終解法**：

```jsx
<Canvas events={() => undefined}>
```

`events={() => undefined}` 是 R3F 的官方 API，讓 R3F 完全不註冊任何 DOM 事件 listener。同時在 `onCreated` 中設：

```js
state.gl.domElement.style.pointerEvents = "none";
```

雙重保險。

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

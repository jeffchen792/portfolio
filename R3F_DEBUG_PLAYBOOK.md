# R3F / Three.js「3D 效果沒出來」除錯手冊

> 寫給 AI 助手（DeepSeek 等）與未來的自己。
> 本手冊來自一次真實除錯：電子雲（OrbitalClouds）看似「沒渲染」，
> 追到最後發現是兩個互相掩護的 bug（見 TROUBLESHOOTING.md #7、#8）。
> 核心教訓：**不要瞎猜著改，要逐層驗證；一次只動一個變因。**

---

## 零、心法（最重要）

1. **先觀察，再假設，再驗證，最後才改碼。** 每個假設都要有一個能證明/證偽它的實驗。
2. **一次一個變因。** 同時改三個東西，「好了」也不知道是誰的功勞（本專案 #1 就是這樣誤診的：砍掉 3D 場景「治好」滾動，其實只是順便砍掉了真兇 EffectComposer）。
3. **「沒有錯誤訊息」≠「沒有錯誤」。** console.log 監聽抓不到 uncaught exception；React render 期間的錯誤會讓整棵樹靜默 unmount。必須主動掛 listener（見下方 Layer 0）。
4. **修好 A 之後要回歸測試 B。** 本案移除 `events={() => undefined}` 讓 3D 復活，卻立刻暴露了被它掩蓋的崩潰 bug。每次修完都要把「當初那個 bug 的復現步驟」重跑一遍。

---

## 一、分層診斷流程（由淺入深，每層都有可貼上的驗證碼）

黑屏/看不到 3D 時，依序回答這五個問題。**不要跳層。**

### Layer 0：有沒有被吞掉的錯誤？

Console 面板看不到 ≠ 沒有錯。在頁面 console 貼：

```js
window.__errs = [];
window.addEventListener('error', e => window.__errs.push(e.message + ' @ ' + e.filename + ':' + e.lineno));
window.addEventListener('unhandledrejection', e => window.__errs.push('REJECTION: ' + String(e.reason?.stack || e.reason)));
// …復現操作（捲動、點擊）之後：
window.__errs
```

同時檢查 `document.getElementById('root').children.length` ——
**變成 0 代表 React 崩潰 unmount 了**（黑屏的常見真因）。

### Layer 1：canvas 存在嗎？元件有 mount 嗎？

```js
[...document.querySelectorAll('canvas')].map(c => ({
  w: c.width, h: c.height, engine: c.getAttribute('data-engine'),
}));
```

- 沒有 canvas → 檢查條件渲染（skip3D / 降級分支 / Suspense 卡住）。
- 元件是否 mount：暫時加 `useEffect(() => { window.__xMounted = true; console.log("[X] MOUNTED"); }, [])`。

### Layer 2：render loop 活著嗎？ ★ 本案關鍵層

canvas 存在、元件 mount、沒錯誤，仍可能**一幀都沒畫**。
在任一 useFrame 裡加計數器：

```jsx
useFrame(() => {
  window.__frames = (window.__frames ?? 0) + 1;
});
```

過兩秒後看 `window.__frames`：
- `undefined` → **loop 死了**。已知殺手：
  - `events={() => undefined}`（R3F v9 靜默弄死 loop，本案真兇二）
  - `frameloop="never"` / `"demand"` 沒有人呼叫 invalidate
- 有數字且持續增加 → loop 正常，往 Layer 3。

### Layer 3：資料有流進 3D 嗎？（scroll/state 驅動的場景）

Vite dev 下可以直接 import 同一個 module 實例來檢查 —— 超好用的技巧：

```js
// 在瀏覽器 console（Vite dev server）：
const m = await import('/src/lib/scroll.js');
m.scrollState   // { progress, velocity } 應隨捲動更新
```

再驗證相機真的在動（暫時加進 CameraRig 的 useFrame）：

```jsx
window.__camDebug = { p, camPos: cam.position.toArray(), tgt: tgt.current.toArray(), fov: cam.fov };
```

### Layer 4：物件在相機視野內嗎？

3D「有渲染」但「看不到」最常見的原因：**相機沒對著它**。
- 手算：物件位置 vs 相機位置/lookAt/fov/near/far。距離 65 單位、偏離視軸 18 單位、fov 50 → 就是在畫面外。
- 或暫時把一顆大球放在鏡頭正前方當「探針」：看得到探針 → 渲染管線沒問題，是佈局問題。

### Layer 5：看得到但太暗/太小？

- 隱藏 DOM 內容直接看 canvas 本體：
  ```js
  document.querySelector('main').style.visibility = 'hidden';
  ```
- 檢查：粒子 size、opacity、fog 濃度（`FogExp2` 密度 × 距離）、bloom threshold、材質是否 `transparent` 但 opacity 0、`sizeAttenuation` 遠處縮小。

---

## 二、本專案踩過的 R3F 鐵則（違反任一條都會複現歷史 bug）

1. **Canvas 子樹絕不訂閱會高頻變化的 React state**（zustand selector、useState 都算）。
   捲動/滑鼠等每幀資料 → 寫進 mutable 物件（`scrollState`），由 `useFrame` 讀。
   違反後果：re-render 觸發 EffectComposer 的 `JSON.stringify` 循環引用崩潰 → 整個 app unmount（真兇一）。

2. **永遠不要用 `events={() => undefined}` 停用 R3F 事件。**
   它會靜默弄死 render loop（真兇二）。要擋事件用三層 CSS/DOM 方案：
   - CSS：`canvas { pointer-events: none !important }`
   - `onCreated`：`state.gl.domElement.style.pointerEvents = "none"`
   - 外層 div：`pointer-events-none`
   真的要停用事件系統 → `eventSource={document.createElement("div")}`（綁到 detached 元素）。

3. **不要把 three 實例用 spread 塞進 JSX**：`<bufferGeometry {...geo} />` ❌。
   正確：`<points geometry={geo}>` 或 `<primitive object={geo} attach="geometry" />`。

4. **降級邏輯要保守、要可觀察。**
   - `prefers-reduced-motion` → 降效果（關 bloom/降粒子），不要整個砍 3D。
   - 效能看門狗要跳過前 3 秒（shader 編譯期必卡），觸發時必須 `console.warn` 留痕。

5. **`<Suspense fallback={null}>` 會把載入中和「掛了」都變成一片空白**——除錯時先給 fallback 一個看得見的東西，或配合 Layer 1 的 mount log。

6. **修 bug 前先寫下「復現步驟」，修完後重跑。** 包括舊 bug 的復現步驟（回歸測試）。

---

## 三、視覺品質方針（3D「有出來」之後怎麼變好看）

1. **首屏必須有東西看。** progress=0 時鏡頭前方（z -5 ~ -30、視錐內）要有主角物件。所有地標都放在 -50 以外 = 使用者以為 3D 壞了。
2. **粒子要「看得見」三要素**：size 夠大（近景 points size ≥ 0.4）、`AdditiveBlending` + `depthWrite: false`、顏色亮度夠（HSL L ≥ 0.5）。
3. **Bloom 是廉價的質感放大器**：發光體給 `emissiveIntensity` 0.5+，`luminanceThreshold` 0.25~0.35 之間微調——太低整個畫面泛光，太高什麼都不亮。
4. **Fog 用來做深度層次，不是遮醜**：`FogExp2` 密度先從 0.0008 起跳，確認最遠地標仍可辨識再加。
5. **相機動線 > 物件動畫**。捲動驅動的 Catmull-Rom 相機路徑（本專案 journey.js 的做法）比讓每個物件自轉更有「進入世界」感。關鍵幀之間距離要均勻，避免忽快忽慢。
6. **效能預算**：dpr cap ≤ 1.5、單場景 draw call < 300（大量重複小球改 InstancedMesh）、粒子總數看門狗實測後再加。
7. **每個視覺改動都截圖對比**。「應該有變好」不算數，看到才算數。

---

## 四、快速自查清單（改完 3D 相關程式碼後）

- [ ] 首屏截圖：3D 有東西
- [ ] 捲到中段截圖：該區地標出現
- [ ] **捲到最底 → root 沒 unmount → 能捲回來**（歷史 bug 回歸測試）
- [ ] `window.__errs` 為空（Layer 0 listener 掛著測）
- [ ] console 無新增紅字
- [ ] `getComputedStyle(canvas).pointerEvents === "none"`（滾動保護仍在）

# Portfolio 部署 Knowhow

> 本專案部署在 Vercel，push master 即自動部署。以下是完整操作手冊。

## 部署架構

| 項目 | 值 |
|------|-----|
| Vercel Project | `portfolio_v2` |
| 生產網址 | https://portfoliov2-sepia-nine.vercel.app |
| GitHub Repo | https://github.com/jeffchen792/portfolio |
| 框架 | Vite 8 + React 19 |
| Build 指令 | `npm run build` (產出 `dist/`) |
| 自動部署 | ✅ push master → Vercel 自動 rebuild |

## Vercel CLI 常用指令

```bash
# 登入（一次性）
vercel login

# 查看所有 projects
vercel projects list

# 查看部署歷史
vercel list

# 連結本地目錄到 project
vercel link --yes --project <project-name>

# 手動部署（一般不需要，GitHub push 會自動觸發）
vercel --prod

# 連接 / 斷開 GitHub repo
vercel git connect --yes https://github.com/jeffchen792/portfolio.git
vercel git disconnect --yes

# 刪除 project（含所有部署記錄）
vercel project rm <project-name>
```

## 本地開發流程

```bash
npm run dev      # http://localhost:5173
npm run build    # 驗證打包無錯
git add -A
git commit -m "訊息"
git push         # → Vercel 自動部署
```

## vercel.json 設定

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite",
  "installCommand": "npm install"
}
```

## GitHub 認證（本機）

```bash
# 設定 git identity
git config --global user.name "jeffchen792"
git config --global user.email "jeffchen792@gmail.com"

# 儲存 GitHub token（避免每次 push 輸入密碼）
git config --global credential.helper store
echo "https://<username>:<token>@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
```

## 疑難排解

| 問題 | 解法 |
|------|------|
| `vercel` CLI 報 no credentials | 執行 `vercel login`，打開瀏覽器授權 |
| build 失敗（conda 干擾） | `export CONDA_NO_PLUGINS=true && npm run build` |
| GitHub push 問密碼 | Personal Access Token 過期，去 GitHub Settings → Developer settings 重發 |
| Vercel 部署成功但網址打不開 | 等 10 秒 CDN 傳播，或檢查 Vercel dashboard 的 Deployments 狀態 |
| 多個 project 混亂 | `vercel projects list` 看有哪些，`vercel project rm <name>` 刪掉多餘的 |

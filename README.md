# 命運大轉盤 ✳ Lucky Spin

零依賴的繁體中文隨機抽籤網站。純 HTML、CSS、原生 JavaScript 與 Canvas，不需要後端、帳號或資料庫。

## 上傳 GitHub 並開啟網站

1. 解壓縮，開啟 `fortune-wheel-github` 資料夾。
2. 在 GitHub 建立 repository，預設分支使用 `main`。
3. 將此資料夾**裡面的內容**上傳到 repository 根目錄。確認 `index.html` 與 `package.json` 在根目錄，並包含 `.github/workflows/pages.yml`、`.gitignore`、`.gitattributes` 與 `.nojekyll`。不要只上傳 ZIP，也不要把外層資料夾多包一層。
4. 到 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
5. 到 **Actions → Test and deploy GitHub Pages → Run workflow** 選擇 `main` 執行；之後每次推送到 `main` 都會自動測試並部署。
6. 工作流程成功後，從 **Settings → Pages** 或 deployment 工作取得網站網址。通常為 `https://你的帳號.github.io/你的儲存庫名稱/`。

若網頁拖曳上傳遺漏隱藏檔，請以 Git 上傳完整資料夾，或在 GitHub 網頁使用 **Add file → Create new file** 建立 `.github/workflows/pages.yml`，貼入本專案同名檔案的內容。GitHub Actions 的部署方式參考 [GitHub 官方文件](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

也可在此資料夾開終端機後使用 Git（將最後的 URL 換成自己的 repository）：

```sh
git init
git add .
git commit -m "Initial fortune wheel project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

本包只準備原始碼與部署設定，尚未替你建立 repository 或發布網站。首次推送前可先完成 Pages 的 Source 設定；若首次 workflow 因尚未開啟 Pages 失敗，完成設定後重新執行即可。

## 本機啟動

Windows 雙擊 `start.bat`，保持視窗開啟，瀏覽器開啟 **http://127.0.0.1:4173/**。

或在此資料夾執行：

```sh
node server.js
```

沒有 Node.js 時也可以執行 `python -m http.server 4173 --bind 127.0.0.1`。不要直接雙擊 `index.html`，ES Modules 需要透過 HTTP 載入。

## 功能

- 2–100 個選項的 Canvas 轉盤；Web Crypto 加權抽籤，指針與結果對齊。
- 新增、批次貼上、編輯、刪除、停用、自訂顏色與權重；五組範本與洗牌。
- 3–8 秒緩動旋轉、音效、彩帶、結果視窗、抽中後排除。
- 最近 100 筆歷史、本機自動保存、分享連結、JSON 匯入／匯出。
- 手機版、系統／淺／深色主題、鍵盤操作、減少動態偏好、全螢幕與 PWA 離線快取。

分享內容只有選項與標題，不包含歷史；localhost 連結只能在同一部電腦使用，部署後才能跨裝置分享。本機資料不會上傳 GitHub。首次連網載入並完成快取後可離線使用，PWA 安裝能力依瀏覽器而異。

## 測試與部署檔案

使用 Node.js 22 以上，不需要安裝套件：

```sh
node --test tests/core.test.js
node scripts/build.js
```

測試包含 2–100 選項的指針幾何、權重邊界、10 萬次加權抽籤、中文分享往返與輸入驗證。`scripts/build.js` 只把網站所需的公開檔案放入 `dist/`；GitHub Actions 發布此目錄，不發布測試、啟動伺服器或開發設定。

所有網站資源使用相對路徑，可部署於 GitHub Pages 的 repository 子目錄。更新離線資源時，請同步修改 `sw.js` 的快取版本。若改 repository 名稱或移動網址，應重新安裝舊 PWA。

尚未提供拖曳排序、英文介面，也未完成實機手機安裝與 Lighthouse 評分驗證。

## 目錄

```text
.github/workflows/pages.yml  自動測試與 Pages 部署
assets/                     本地圖示
css/                        樣式
js/                         抽籤、狀態、畫面與效果
scripts/build.js            準備公開部署檔案
tests/                      核心測試
index.html                  網站入口
manifest.webmanifest        PWA 設定
sw.js                       離線快取
server.js                   本機預覽伺服器
start.bat                   Windows 啟動檔
```

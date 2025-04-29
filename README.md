<p align="center"><img src="https://github.com/NCUAppTeam/NCU-App/blob/main/src/assets/logo.png?raw=true" width = "200" height="200" ></img> </p>

# NCU-APP

NCU-APP 是為國立中央大學（NCU）學生所打造的應用程式，旨在透過現代化且使用者友善的介面來簡化他們的校園體驗。

## 使用技術

- **React**：用於構建使用者界面的 JavaScript 函式庫，使用它來創建動態和響應式的元件。
- **TypeScript**：JavaScript 的型別增強版，有助於在開發過程中提前發現錯誤，並使程式碼更容易理解。
- **Vite**：快速的編譯工具，可提供即時回饋，從而改善開發過程。
- **Vite PWA**: 漸進式網路應用程式 (Progressive Web Apps)的套件，協助將專案與行動裝置相容。
- **TanStack Router**：路由函式庫，可輕鬆在應用程式的不同頁面之間進行導航。
- **Tailwind CSS**：CSS 框架，可在不需撰寫大量自定義 CSS 的情況下構建自定義設計。
- **Supabase**：開源的後端服務，提供驗證、資料庫和 API 功能，類似於 Firebase，但更具可定制性。
- **Playwright**：Ｅnd-to-End 的自動測試框架，用於維護程式品值。

## 專案結構

- `src/`：主要的資料夾，包含所有的原始碼。
  - `components/`：可重複使用的 UI 元件，如按鈕、表單等。
  - `routes/`：包含處理頁面導航的檔案。每個頁面都有自己的路由檔案。
  - `utils/`：工具函式和可重複使用的型別，幫助減少程式碼重複。
- `public/`：靜態檔案，如圖片和圖示，這些檔案在運行時不會改變。
- `supabase/`：包含與 Supabase 相關的配置和與後端服務交互的函式。
- `tests/`：Playwright 的測試腳本。

## 開始上手

按照以下步驟在你的電腦上設置專案：

1. **複製程式碼**：
   ```bash
   git clone https://github.com/NCUAppTeam/NCU-App.git
   ```
2. **進入專案**：
   ```bash
   cd NCU-App
   ```
3. **安裝依賴套件**：
   ```bash
   npm install
   ```
4. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```
   執行此命令後，打開瀏覽器並前往顯示的 URL 來查看應用程式運行情況。

### 前置準備

在開始之前，請確保你的電腦已安裝 Node.js 和 npm。如果你還未安裝這些工具，可以從[這裡](https://nodejs.org/)下載。

## 路由管理

本專案使用 **TanStack Router** 來管理不同頁面之間的導航。應用程式中的每個頁面或視圖都有自己的檔案，位於 `src/routes/` 資料夾中，這樣可以更輕鬆地管理和擴展應用。

## 元件

可重複使用的元件存放於 `src/components/` 資料夾中。每個元件通常是 UI 的一小部分，例如按鈕、標題或表單，這些元件可以在應用的不同部分中重複使用。

如果你在添加新功能或修改 UI，請考慮是否應該創建一個新元件，以保持程式碼的模組化和可維護性。

## 樣式

我們使用 **Tailwind CSS** 來為應用程式進行樣式設計。與其撰寫自定義 CSS，Tailwind 提供的實用工具類別可以直接在 JSX 中應用，這樣可以保持樣式的一致性，並減少撰寫 CSS 檔案的需求。

Tailwind 的配置檔位於 `tailwind.config.js`。

## 後端

**Supabase** 作為後端，用於處理用戶驗證、即時資料庫和 API 請求。所有與後端相關的配置和邏輯都存放在 `supabase/` 資料夾中。

### 環境配置

要與 Supabase 資料庫互動，你需要設置 `.env` 檔案（模板可參考`.env.example`)，並填入以下變數：

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```
若您為中央大學學生，想在本地端測試、使用portal註冊功能，則需先於portal申請portal開發成員：
申請時的Single Sign On Url填為：http://localhost:5173
       Return To Address填為：http://localhost:5173/callback

`.env`檔則填入申請後說得到的client-id和client-secret：
```
VITE_NCU_PORTAL_CLIENT_ID=
VITE_NCU_PORTAL_CLIENT_SECRET=
```


### Edge Functions

Supabase 提供 **Edge Functions**，這些是基於 [Deno](https://deno.land/) 構建的雲端函式，可以用來執行不方便在使用者的裝置上跑的程式碼。

### Local Development

如果你想修改資料庫欄位，請在本地端先進行開發測試，新增 migration 後再提 PR 請求更動正式伺服器。
請參考 Supabase 官方文件的 [Database Migration](https://supabase.com/docs/guides/cli/local-development#database-migrations) 部分

開發完成後，請將變更記錄到 Repository 裡面

```sh
npx supabase gen types typescript --local > src/utils/database.types.ts
npx supabase db pull --local
```

## 開發

我們使用 **ESLint** 來維護程式碼品質，並使用 **TypeScript** 進行型別檢查。這有助於提前發現錯誤，並使程式碼更容易理解。

你可以用以下命令運行這些檢查：

- **程式碼檢查**：
  ```bash
  npm run lint
  ```
- **構建專案**：
  ```bash
  npm run build
  ```

執行這些命令可以確保程式碼遵循規定，並且沒有型別錯誤。

## 測試

本專案使用 Playwright 進行端到端測試。Playwright 允許我們編寫和運行模擬不同瀏覽器中用戶操作的測試。

### 執行測試

要執行測試，請使用以下命令：

```bash
npm run test
```

這將執行 `tests` 資料夾中定義的所有測試。

### 測試結構

我們的測試位於 `tests` 資料夾中。每個測試檔案通常專注於應用程式的一個特定功能或元件。

想了解如何使用 Playwright 編寫測試，請參閱 [Playwright 文檔](https://playwright.dev/docs/intro)。

## 部署

本專案配置了 **GitHub Actions** 來進行持續整合（CI）。每次你將程式碼推送到 Github 時，GitHub 都會自動運行測試和程式碼檢查，確保程式碼品質。你不需要自己設置 CI，但了解這個過程有助於維護專案的質量。

## 貢獻

我們歡迎所有人的貢獻，無論你是否是新手開發者！如果你想貢獻，請按照以下步驟：

1. **Fork Repository**：在你的 GitHub 帳號下創建一份這個 repo 的副本。
2. **進行修改**：撰寫乾淨、結構良好的程式碼，並在必要時添加註釋。
3. **測試修改**：在提交之前，測試你的程式碼，確保它能正常運行。
4. **提交拉取請求**：完成後，推送你的更改並提交 PR。我們的團隊會進行審查，並在審核通過後將其合併到主程式碼庫中。

請確保你：

- 遵循專案現有的程式碼風格。
- 撰寫清晰的提交訊息，解釋你的更改。
- 如果你添加了新功能，請包含相應的測試。

如果你有任何問題或需要幫助，歡迎在我們的 Discord 伺服器中詢問。

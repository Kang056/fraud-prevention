# 🎮 詐獸獵人 (Project S.C.A.M.) - 開發指南

## 📋 目錄
- [快速開始](#快速開始)
- [項目結構](#項目結構)
- [核心功能](#核心功能)
- [技術棧](#技術棧)
- [開發進度](#開發進度)
- [下一步](#下一步)

---

## 快速開始

### 環境要求
- Node.js 16+
- npm 或 yarn

### 安裝與執行

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

開發伺服器將在 `http://localhost:5173` 啟動

---

## 項目結構

```
fraud-prevention/
├── public/
│   └── index.html          # HTML 入口
├── src/
│   ├── components/
│   │   ├── Scanner/        # 掃描儀系統
│   │   │   ├── ScannerScreen.tsx
│   │   │   └── ScannerScreen.css
│   │   ├── Battle/         # 戰鬥系統
│   │   │   ├── BattleScreen.tsx
│   │   │   └── BattleScreen.css
│   │   ├── Bestiary/       # 獵人圖鑑
│   │   │   ├── BestiaryScreen.tsx
│   │   │   └── BestiaryScreen.css
│   │   └── Bounty/         # 懸賞公會
│   │       ├── BountyScreen.tsx
│   │       └── BountyScreen.css
│   ├── services/
│   │   └── aiService.ts    # AI 分析服務
│   ├── types/
│   │   └── game.ts         # TypeScript 類型定義
│   ├── App.tsx             # 主應用組件
│   ├── App.css             # 全局樣式
│   ├── index.css           # CSS 變數與基礎樣式
│   └── main.tsx            # 入口文件
├── docs/
│   └── GAME_DESIGN.md      # 詳細設計文檔
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 核心功能

### ✅ 已實現

#### 1. **戰術掃描儀 (Scanner)**
- 文本/網址輸入
- 風險等級評估
- 自動詐獸識別
- 視覺反饋效果

**檔案:**
- [ScannerScreen.tsx](src/components/Scanner/ScannerScreen.tsx)
- [ScannerScreen.css](src/components/Scanner/ScannerScreen.css)

#### 2. **詐獸殲滅戰 (Battle System)**
- 3 選 1 的回應選擇
- 10 秒倒計時
- 實時戰鬥動畫
- 結果判定與結算

**檔案:**
- [BattleScreen.tsx](src/components/Battle/BattleScreen.tsx)
- [BattleScreen.css](src/components/Battle/BattleScreen.css)

#### 3. **獵人圖鑑 (Bestiary)**
- 詐獸卡牌收集
- 屬性/風險分類
- 詳細信息面板
- 成就系統

**檔案:**
- [BestiaryScreen.tsx](src/components/Bestiary/BestiaryScreen.tsx)
- [BestiaryScreen.css](src/components/Bestiary/BestiaryScreen.css)

#### 4. **懸賞公會 (Bounty)**
- 動態任務列表
- 難度與獎勵系統
- 貢獻記錄機制
- 參與指南

**檔案:**
- [BountyScreen.tsx](src/components/Bounty/BountyScreen.tsx)
- [BountyScreen.css](src/components/Bounty/BountyScreen.css)

---

## 技術棧

### 前端框架
- **React 18** - UI 框架
- **TypeScript** - 類型安全
- **Vite** - 構建工具
- **CSS3** - 賽博龐克樣式

### 特性
- 賽博龐克風格設計
- 霓虹光效與故障藝術效果
- 響應式設計（Mobile First）
- 掃描線與視覺特效

### AI 集成 (待完成)
- LLM API 串接 (OpenAI/Google Gemini)
- 詐騙內容分析
- 動態詐獸生成

---

## 開發進度

### 第 1 階段 ✅ (完成)
- [x] 項目框架搭建
- [x] UI 組件開發
- [x] 樣式與特效實現
- [x] 基本互動邏輯
- [x] 模擬數據集成

### 第 2 階段 🔄 (進行中)
- [ ] LLM API 串接
- [ ] Prompt Engineering 優化
- [ ] 詐獸 AI 生成
- [ ] 詳細規則測試

### 第 3 階段 (計劃)
- [ ] 後端 API 開發
- [ ] 用戶認証系統
- [ ] 數據持久化
- [ ] 排行榜系統

### 第 4 階段 (未來)
- [ ] 美術資源製作
- [ ] 動畫優化
- [ ] 音效系統
- [ ] 社交分享功能

---

## 核心文件說明

### App.tsx
主應用組件，管理全局狀態和導航

```typescript
interface GameState {
  playerHP: number
  playerXP: number
  playerGold: number
  hunterLevel: number
  currentBeast: any | null
}
```

### 類型定義 (types/game.ts)
```typescript
// 詐獸卡牌
interface BeastCard {
  id: string
  name: string
  attribute: 'greed' | 'fear' | 'emotion'
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  // ...
}

// 戰鬥響應
interface BattleResponse {
  riskLevel: string
  beastName: string
  attackTactic: string
  responseCards: {
    trap: string      // 陷阱卡
    defend: string    // 防禦卡
    critical: string  // 爆擊卡
  }
  // ...
}
```

### AI 服務 (services/aiService.ts)
負責詐騙內容分析和詐獸生成

```typescript
// 主要函數
export async function analyzeInput(
  input: string, 
  inputType: 'text' | 'url'
): Promise<BattleResponse>
```

---

## CSS 變數系統

```css
:root {
  /* 賽博龐克主色 */
  --neon-purple: #a21cff;
  --neon-cyan: #00d4ff;
  --neon-pink: #ff006e;
  --neon-green: #39ff14;
  
  /* 背景 */
  --dark-bg: #0a0e27;
  --dark-secondary: #1a1f3a;
  
  /* 文字 */
  --text-primary: #ffffff;
  --text-secondary: #b0b8cc;
  --text-muted: #6c7a8a;
}
```

---

## 響應式設計

項目採用 **Mobile First** 策略，所有組件都適配以下斷點：

- **桌面**: 1024px+
- **平板**: 768px - 1023px
- **手機**: < 768px

---

## 下一步

### 即時優先順序
1. ⭐ **LLM API 串接**
   - 集成 OpenAI API 或 Google Gemini
   - 優化 Prompt 工程
   - 測試詐騙識別準確率

2. 🎨 **美術資源製作**
   - 設計像素風格詐獸
   - 製作 UI 圖標
   - 優化視覺效果

3. 🔊 **音效系統**
   - 添加背景音樂
   - 戰鬥音效
   - 反饋音效

4. 📊 **排行榜與數據**
   - 用戶認証系統
   - 排行榜實現
   - 戰績分享

---

## 貢獻指南

### 新增功能
1. 在相應目錄建立組件文件
2. 遵循現有命名規范
3. 添加 TypeScript 類型定義
4. 實現響應式設計

### 代碼風格
- 使用 TypeScript
- 命名採用 camelCase
- CSS 類名採用 kebab-case
- 添加適當註解

### Git 提交
```bash
# 格式: type(scope): description
# 示例:
git commit -m "feat(scanner): add keyboard shortcuts"
git commit -m "fix(battle): resolve timer reset issue"
```

---

## 資源連結

- 📖 [完整企劃書](../Project%20S.C.A.M.txt)
- 🎨 [設計規格](GAME_DESIGN.md)
- 🔗 [Vite 文檔](https://vitejs.dev)
- ⚛️ [React 文檔](https://react.dev)

---

## 許可證

MIT License © 2025 Project S.C.A.M.

---

**最後更新:** 2025-01-29  
**維護者:** Development Team

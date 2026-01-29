# 📦 Project S.C.A.M. - 詐獸獵人
## 項目完整文件結構與概覽

**版本**: 0.1.0 MVP  
**開發日期**: 2025-01-29  
**狀態**: 🟢 開發中 (前端完成, 等待 AI 集成)

---

## 📁 完整項目結構

```
fraud-prevention/
│
├── 📄 README.md                          ← 項目首頁
├── 📄 package.json                       ← npm 依賴與腳本
├── 📄 tsconfig.json                      ← TypeScript 配置
├── 📄 tsconfig.node.json                 ← TS Node 配置
├── 📄 vite.config.ts                     ← Vite 配置
│
├── 📁 public/
│   └── 📄 index.html                     ← HTML 入口 (Vite)
│
├── 📁 src/                               ← 應用源代碼
│   │
│   ├── 📄 main.tsx                       ← React 應用入口
│   ├── 📄 App.tsx                        ← 主應用組件 (遊戲框架)
│   ├── 📄 App.css                        ← 主應用樣式
│   ├── 📄 index.css                      ← 全局 CSS + 變數系統
│   │
│   ├── 📁 types/                         ← TypeScript 類型定義
│   │   └── 📄 game.ts                    ← 遊戲數據類型
│   │
│   ├── 📁 services/                      ← 業務邏輯服務層
│   │   └── 📄 aiService.ts               ← AI 分析服務 (詐騙識別)
│   │
│   └── 📁 components/                    ← React UI 組件
│       │
│       ├── 📁 Scanner/                   ← 掃描儀系統
│       │   ├── 📄 ScannerScreen.tsx      ← 掃描儀主組件
│       │   └── 📄 ScannerScreen.css      ← 掃描儀樣式
│       │
│       ├── 📁 Battle/                    ← 戰鬥系統
│       │   ├── 📄 BattleScreen.tsx       ← 戰鬥主組件
│       │   └── 📄 BattleScreen.css       ← 戰鬥樣式
│       │
│       ├── 📁 Bestiary/                  ← 獵人圖鑑
│       │   ├── 📄 BestiaryScreen.tsx     ← 圖鑑主組件
│       │   └── 📄 BestiaryScreen.css     ← 圖鑑樣式
│       │
│       └── 📁 Bounty/                    ← 懸賞公會
│           ├── 📄 BountyScreen.tsx       ← 公會主組件
│           └── 📄 BountyScreen.css       ← 公會樣式
│
└── 📁 docs/                              ← 開發文檔
    ├── 📄 DEVELOPMENT.md                 ← 詳細開發指南
    ├── 📄 GAME_DESIGN.md                 ← 完整遊戲設計文檔
    └── 📄 PROGRESS.md                    ← 開發進度追蹤
```

---

## 🎯 核心模塊說明

### 1️⃣ **掃描儀系統 (Scanner)**
**位置**: `src/components/Scanner/`

| 文件 | 功能 |
|------|------|
| `ScannerScreen.tsx` | 主應用組件，處理輸入與分析 |
| `ScannerScreen.css` | 賽博龐克風格界面 |

**特性**:
- 文本/網址輸入切換
- 雷達掃描動畫
- 4 級風險評估 (低/中/高/極限)
- 自動詐獸識別與戰鬥觸發

**關鍵函數**:
```typescript
handleScan() → analyzeInput() → 更新 scanResult → 決策進入戰鬥
```

---

### 2️⃣ **戰鬥系統 (Battle)**
**位置**: `src/components/Battle/`

| 文件 | 功能 |
|------|------|
| `BattleScreen.tsx` | 戰鬥邏輯與 UI 展示 |
| `BattleScreen.css` | 戰鬥視覺效果與動畫 |

**特性**:
- 詐獸 vs 獵人對戰介面
- 3 選 1 卡牌系統
- 10 秒倒計時 (視覺化進度圈)
- 實時 HP 條與結果判定

**卡牌設定**:
```
🔴 陷阱卡 → 💀 GAME OVER (0 XP)
🟡 防禦卡 → 🛡️ DRAW (20 XP)
🟢 爆擊卡 → ⚔️ VICTORY (100 XP + 掉落物)
```

---

### 3️⃣ **獵人圖鑑 (Bestiary)**
**位置**: `src/components/Bestiary/`

| 文件 | 功能 |
|------|------|
| `BestiaryScreen.tsx` | 詐獸卡牌收集與展示 |
| `BestiaryScreen.css` | 卡牌網格與詳情面板 |

**特性**:
- 詐獸卡牌網格 (Hover 放大)
- 屬性篩選 (貪婪/恐懼/情感)
- 風險篩選 (低/中/高/極限)
- 詳細信息面板 (發現者/日期/弱點)
- 成就系統

**數據示例**:
```typescript
{
  name: "殺豬盤魅魔",
  attribute: "emotion",
  riskLevel: "extreme",
  weakness: "視訊驗證"
}
```

---

### 4️⃣ **懸賞公會 (Bounty)**
**位置**: `src/components/Bounty/`

| 文件 | 功能 |
|------|------|
| `BountyScreen.tsx` | 任務列表與獎勵管理 |
| `BountyScreen.css` | 公會 UI 設計 |

**特性**:
- 進行中/已完成任務篩選
- 難度等級分類 (簡單/中等/困難/傳奇)
- 獎勵與統計面板
- 參與指南
- 貢獻記錄機制

**獎勵等級**:
- 簡單: 200G
- 中等: 300G
- 困難: 500G
- 傳奇: 1000G

---

### 5️⃣ **類型系統 (Types)**
**位置**: `src/types/game.ts`

定義所有遊戲數據結構:

```typescript
// 詐獸卡牌
interface BeastCard {
  id: string
  name: string
  attribute: 'greed' | 'fear' | 'emotion'
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  // ... 更多字段
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
  // ... 更多字段
}

// 懸賞任務
interface BountyTask {
  id: string
  title: string
  reward: number
  status: 'active' | 'completed'
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
}

// 獵人檔案
interface HunterProfile {
  level: number
  xp: number
  gold: number
  totalKills: number
  beastsCollected: string[]
}
```

---

### 6️⃣ **AI 服務層 (Services)**
**位置**: `src/services/aiService.ts`

**核心函數**:

```typescript
// 主要分析函數
async analyzeInput(
  input: string, 
  inputType: 'text' | 'url'
): Promise<BattleResponse>

// 詐獸頭像生成
async generateBeastImage(
  beastName: string
): Promise<string>
```

**分析流程**:
1. 詐騙模式關鍵詞匹配
2. 屬性分類 (貪婪/恐懼/情感)
3. 風險等級判定
4. 詐獸命名與台詞生成
5. 反擊卡牌創意生成

---

## 🎨 CSS 設計系統

### 色彩變數 (index.css)

```css
:root {
  /* 賽博龐克霓虹色 */
  --neon-purple: #a21cff;    /* 主要強調色 */
  --neon-cyan: #00d4ff;      /* 次要強調色 */
  --neon-pink: #ff006e;      /* 危險警告色 */
  --neon-green: #39ff14;     /* 成功通過色 */
  
  /* 背景色 */
  --dark-bg: #0a0e27;        /* 主背景 */
  --dark-secondary: #1a1f3a; /* 次背景 */
  
  /* 文字色 */
  --text-primary: #ffffff;   /* 主文字 */
  --text-secondary: #b0b8cc; /* 次文字 */
  --text-muted: #6c7a8a;     /* 弱化文字 */
}
```

### 特效系統

| 特效 | 實現 | 用途 |
|------|------|------|
| 霓虹發光 | `text-shadow` + blur | 標題與重點文字 |
| 掃描線 | `repeating-linear-gradient` | 屏幕質感 |
| 故障閃爍 | `@keyframes glitch` | 警告與錯誤 |
| 脈衝 | `@keyframes pulse` | 交互反饋 |
| 漸變 | `linear-gradient` | 背景與卡牌 |

---

## 📊 遊戲狀態管理

### App.tsx 全局狀態

```typescript
interface GameState {
  playerHP: number        // 獵人體力
  playerXP: number        // 經驗值
  playerGold: number      // 金幣
  hunterLevel: number     // 等級
  currentBeast: any | null // 當前戰鬥詐獸
}
```

### 狀態流轉

```
初始化 (Level 1, HP 100, XP 0)
  ↓
掃描儀 (等待輸入)
  ↓
詐獸出現 (觸發戰鬥)
  ↓
戰鬥結算:
├─ 勝利 → XP +100, 金幣 +50, HP +20
├─ 平手 → XP +20, 金幣 +10
└─ 失敗 → HP 歸零, 重新開始
  ↓
返回掃描儀或返回首頁
```

---

## 📦 依賴與配置

### package.json
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### 技術棧
- **框架**: React 18
- **語言**: TypeScript 5
- **構建**: Vite 5
- **樣式**: CSS3 (無框架)
- **HTTP**: Axios (待整合 API)

---

## 🚀 快速開始

### 安裝
```bash
cd /workspaces/fraud-prevention
npm install
```

### 開發
```bash
npm run dev
# 訪問 http://localhost:5173
```

### 構建
```bash
npm run build
npm run preview
```

---

## 🔄 工作流程

### 新增功能步驟
1. 在相應目錄創建 `.tsx` 組件
2. 定義 TypeScript 類型 (types/game.ts)
3. 創建 `.css` 樣式文件
4. 在 App.tsx 中導入並整合
5. 測試與優化

### 命名約定
- **組件**: PascalCase (e.g., `ScannerScreen.tsx`)
- **變數**: camelCase (e.g., `const playerHP`)
- **CSS 類**: kebab-case (e.g., `.scanner-screen`)
- **類型**: PascalCase (e.g., `interface BeastCard`)

---

## 📚 文檔指南

| 文檔 | 內容 |
|------|------|
| [README.md](README.md) | 項目概覽 (給使用者) |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | 詳細開發指南 |
| [GAME_DESIGN.md](docs/GAME_DESIGN.md) | 完整遊戲設計規格 |
| [PROGRESS.md](docs/PROGRESS.md) | 開發進度與里程碑 |

---

## 🎯 下一步優先事項

### 立即 (1-2 週)
- [ ] **LLM API 串接** (OpenAI/Google Gemini)
- [ ] **Prompt 工程優化**
- [ ] **詐騙樣本測試**

### 短期 (2-3 週)
- [ ] **美術資源製作** (詐獸像素藝術)
- [ ] **音效系統** (背景音樂 + 音效)
- [ ] **動畫優化**

### 中期 (3-4 週)
- [ ] **後端 API 開發** (Node.js/Python)
- [ ] **數據庫設計** (Supabase/Firebase)
- [ ] **排行榜系統**

### 長期 (1-2 月)
- [ ] **社交分享** (戰績圖生成)
- [ ] **全服活動** (Boss 戰)
- [ ] **1.0 版本發布**

---

## 📞 支持與反饋

- 📖 閱讀 [開發指南](docs/DEVELOPMENT.md)
- 🐛 報告 Bug 或建議
- 💬 討論新功能

---

**最後更新**: 2025-01-29  
**維護者**: Development Team  
**許可證**: MIT © 2025 Project S.C.A.M.

🎮 **一起狩獵詐獸，守護數位世界！**

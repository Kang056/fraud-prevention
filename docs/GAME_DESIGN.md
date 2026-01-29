# Project S.C.A.M. - 詐獸獵人
## 詳細遊戲設計文檔

### 最後更新：2025-01-29
### 版本：0.1.0 (MVP)

---

## 目錄
1. [遊戲概述](#遊戲概述)
2. [核心循環](#核心循環)
3. [視覺設計](#視覺設計)
4. [交互設計](#交互設計)
5. [AI 邏輯](#ai-邏輯)
6. [數據模型](#數據模型)

---

## 遊戲概述

### 核心定位
**全球首款沉浸式防詐 RPG 遊戲化平台**

### 標語
在充滿雜訊的數位荒野中，狩獵惡意，反殺騙局。

### 目標受眾
- 15-45 歲數位原住民與移民
- 習慣滑手機、容易接觸網路詐騙的族群
- 喜歡遊戲化學習與成就感的用戶

### 核心價值
- 將「查證」轉化為「戰鬥」
- 將「教育」轉化為「遊戲成就」
- 讓使用者主動想學、想玩、想分享

---

## 核心循環

### 遊戲迴圈流程

```
輸入可疑資訊
    ↓
掃描儀分析
    ↓
判定風險等級
    ↓
[安全] → 返回掃描儀
[危險] ↓
詐獸出現 → 進入戰鬥
    ↓
選擇反擊卡牌 (10秒)
    ↓
[陷阱卡] → GAME OVER → 學習防詐知識
[防禦卡] → DRAW → 詐獸逃脫
[爆擊卡] → VICTORY → 收錄詐獸 + XP/金幣 + 知識詳解
```

### 各階段詳述

#### 階段 1：掃描儀 (Scanner)
- **輸入**: 文本/網址/截圖
- **處理**: API 查詢 + LLM 分析
- **輸出**: 風險等級 (4 級)

#### 階段 2：戰鬥準備 (Pre-Battle)
- 詐獸出現動畫
- 顯示怪獸名稱、屬性、風險
- 播放警報音效

#### 階段 3：戰鬥 (Battle)
- Round 1: 詐獸先攻（話術展示）
- Round 2: 獵人反擊（3 選 1）
- Round 3: 結算與獎勵

#### 階段 4：收錄與分享 (Collection)
- 詐獸加入圖鑑
- 顯示弱點攻略
- 生成戰績分享圖

---

## 視覺設計

### 美術風格

#### 主題
**賽博龐克像素風**
- 復古掌機感
- 霓虹光效
- 故障藝術 (Glitch)

#### 色彩方案

| 用途 | 顏色 | 代碼 |
|------|------|------|
| 主色 (Cyan) | 靛青 | #00D4FF |
| 警告 (Pink) | 霓虹粉 | #FF006E |
| 成功 (Green) | 亮綠 | #39FF14 |
| 輔助 (Purple) | 紫色 | #A21CFF |
| 背景 | 深藍黑 | #0A0E27 |

#### 特效清單

| 特效 | 用途 | CSS |
|------|------|-----|
| 霓虹發光 | 文本強調 | `text-shadow: 0 0 10px...` |
| 掃描線 | 屏幕質感 | `repeating-linear-gradient...` |
| 故障閃爍 | 危險警告 | `animation: glitch...` |
| 脈衝 | 交互反饋 | `animation: pulse...` |

### 怪獸設計

#### 屬性系統

**🤑 貪婪系 (Greed)**
- 形象：長著金幣鱗片的龍、紅眼魅魔
- 台詞：強調利益與快速致富
- 弱點：理性分析、風險提示

**😨 恐懼系 (Fear)**
- 形象：扭曲的法官臉、警察怪獸
- 台詞：制造緊急感和恐慌
- 弱點：打官方電話驗證、查詢公開資訊

**💔 情感系 (Emotion)**
- 形象：獨眼淚珠魅魔、心碎怪獸
- 台詞：利用感情、親情、愛情
- 弱點：視訊通話驗證、冷靜思考

---

## 交互設計

### 掃描儀交互

#### 輸入區
```
[📝 文本] [🔗 網址]
┌─────────────────────────┐
│ 貼上可疑的訊息、對話... │
│                         │
│                         │
└─────────────────────────┘
[🔍 開始掃描] (Disabled until input)
```

#### 結果展示
- **🟢 安全**: 綠色界面，愉悅音效
- **🟡 警告**: 橙色界面，注意音效
- **🔴 危險**: 紅色界面，警報聲
- **☠️ 極限**: 黑紅界面，緊急警報

### 戰鬥交互

#### 時間壓力
- 倒計時 10 秒（可視化圓形進度）
- 超時自動選擇「防禦卡」
- 音效與視覺反饋

#### 卡牌選擇
```
        [🟢 陷阱卡]
[🟡 防禦卡] [🟢 爆擊卡]
```

#### 卡牌詳情

| 卡牌 | 視覺 | 結果 | 獎勵 |
|------|------|------|------|
| 🔴 陷阱 | 紅色邊框 | 💀 Game Over | 0 XP |
| 🟡 防禦 | 橙色邊框 | 🛡️ Draw | 20 XP |
| 🟢 爆擊 | 綠色邊框 | ⚔️ Victory | 100 XP + 掉落物 |

### 圖鑑交互

#### 卡牌網格
- 縮略圖 + 名稱 + 屬性 + 風險
- Hover: 放大 + 邊框高亮
- Click: 展開詳情面板

#### 詳情面板
- 怪獸頭像（大）
- 屬性、風險等級、技能、弱點
- 發現者與日期
- 關閉按鈕

#### 篩選器
- 屬性篩選: 全部 / 貪婪 / 恐懼 / 情感
- 風險篩選: 全部 / 低 / 中 / 高 / 極限
- 組合篩選支持

---

## AI 邏輯

### 分析流程

```
使用者輸入
    ↓
第 1 層: 硬資料庫查詢
├─ 165 反詐騙 API
├─ Whoscall API
└─ Google Safe Browsing
    ↓
[命中] → 標記為「已知頭目」→ 進行戰鬥
    ↓
[未命中] → 第 2 層: LLM 分析
    ↓
LLM Prompt 工程
├─ Role: 詐獸狩獵大師
├─ Task: 風險判定 + 詐獸屬性分類
├─ Action: 生成台詞與反擊卡
└─ Output: JSON 格式
    ↓
前端渲染 + 進行戰鬥
```

### LLM Prompt 設計

#### System Prompt
```
你是 Cyberia 大陸的防衛官兼遊戲大師。
你的職責是：
1. 分析輸入文本是否包含詐騙內容
2. 判斷風險等級（low, medium, high, extreme）
3. 識別詐騙屬性（貪婪/恐懼/情感）
4. 生成詐獸名稱、台詞與弱點攻略
5. 創意地生成三張回應卡牌

你必須以 JSON 格式輸出，包含：
- riskLevel, beastName, beastAttribute, attackTactic, responseCards, weakness
```

#### User Prompt 範例
```
分析這個訊息並生成遊戲卡牌：
「親愛的客户，您的银行账户因涉嫌洗钱已被冻结。
请立即点击此链接验证身份：[惡意链接]」

回應格式 JSON
```

#### 輸出範例
```json
{
  "riskLevel": "extreme",
  "beastName": "法務恐懼獸",
  "beastAttribute": "fear",
  "attackTactic": "您的帳戶涉及洗錢！再不配合就要被逮捕！",
  "responseCards": {
    "trap": "驚惶點擊連結輸入密碼",
    "defend": "掛掉電話並報警",
    "critical": "撥打官方客服電話驗證，不點任何連結"
  },
  "weakness": "撥打官方電話確認，詐騙集團無法冒充銀行打來"
}
```

### 詐獸命名規則

- **命名公式**: [台詞關鍵詞] + [怪獸昵稱]
- **範例**: 「殺豬盤」 + 「魅魔」 = 「殺豬盤魅魔」

### 反擊卡牌生成規則

#### 陷阱卡 (Trap)
- 模擬使用者可能的錯誤反應
- 展示詐騙成功的後果
- 用於教育目的

#### 防禦卡 (Defend)
- 基礎保護措施
- 終止互動但不能消滅威脅
- 低風險、低收益

#### 爆擊卡 (Critical)
- 邏輯反殺或安全驗證
- 需要批判性思維
- 高難度、高獎勵

---

## 數據模型

### BeastCard (詐獸卡牌)
```typescript
interface BeastCard {
  id: string
  name: string                    // 詐獸名稱
  attribute: 'greed'|'fear'|'emotion'
  riskLevel: 'low'|'medium'|'high'|'extreme'
  imageUrl: string               // emoji 或圖片路徑
  skill: string                  // 技能描述
  weakness: string               // 弱點攻略
  attackTactic: string           // 完整台詞
  discoveredBy?: string          // 發現者 ID
  discoveredDate?: Date          // 發現日期
}
```

### BattleResponse (戰鬥響應)
```typescript
interface BattleResponse {
  riskLevel: string              // 風險等級
  beastName: string              // 詐獸名稱
  beastAttribute: BeastAttribute
  attackTactic: string           // 詐獸台詞
  responseCards: {
    trap: string                 // 陷阱卡選項
    defend: string               // 防禦卡選項
    critical: string             // 爆擊卡選項
  }
  weakness: string               // 破解關鍵
  explanation: string            // 詳細解釋
}
```

### HunterProfile (獵人檔案)
```typescript
interface HunterProfile {
  id: string
  name: string
  level: number                  // 獵人等級 (1-100)
  hp: number                     // 當前 HP
  xp: number                     // 經驗值
  gold: number                   // 金幣
  totalKills: number             // 擊殺總數
  victories: number              // 勝利次數
  beastsCollected: string[]      // 收集的詐獸 ID
  achievements: string[]         // 成就 ID 列表
}
```

### BountyTask (懸賞任務)
```typescript
interface BountyTask {
  id: string
  title: string
  description: string
  reward: number                 // XP 或金幣獎勵
  status: 'active' | 'completed'
  difficulty: 'easy'|'medium'|'hard'|'legendary'
  requiredBeastType?: BeastAttribute
}
```

---

## 成就系統範例

### 解鎖成就

| 成就 | 條件 | 獎勵 |
|------|------|------|
| 🎯 首次狩獵 | 擊敗第 1 隻詐獸 | 稱號 |
| 💰 華爾街獵人 | 收集 10 隻貪婪系 | 稱號 + 1000G |
| 😨 恐懼剋星 | 收集 10 隻恐懼系 | 稱號 + 1000G |
| 💔 情感衛士 | 收集 10 隻情感系 | 稱號 + 1000G |
| 🔥 連勝獵人 | 連贏 5 場戰鬥 | 勳章 |
| 📚 百科全書 | 收集 50 隻詐獸 | 傳說稱號 |
| 🌍 世界衛士 | 擊敗全服 Boss | 限定皮膚 |

---

## 未來擴展計劃

### Phase 2: 完整系統
- [ ] 後端 API (Node.js / Python)
- [ ] 用戶認証 (OAuth / JWT)
- [ ] 數據庫 (PostgreSQL)
- [ ] 排行榜系統

### Phase 3: 美術製作
- [ ] 詐獸像素藝術設計
- [ ] 角色動畫製作
- [ ] UI 精美化
- [ ] 音效編輯

### Phase 3: 社交功能
- [ ] 戰績分享圖生成
- [ ] 朋友對戰
- [ ] 公會系統
- [ ] 社群活動

---

## 參考資料

- [完整企劃書](../Project%20S.C.A.M.txt)
- [React 官方文檔](https://react.dev)
- [Vite 官方文檔](https://vitejs.dev)
- [TypeScript 最佳實踐](https://www.typescriptlang.org/docs/)

---

**文檔版本**: 0.1.0  
**最後更新**: 2025-01-29  
**維護者**: Development Team

/* 詐獸屬性類型 */
export type BeastAttribute = 'greed' | 'fear' | 'emotion'

export interface BeastCard {
  id: string
  name: string
  attribute: BeastAttribute
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  imageUrl: string
  skill: string
  weakness: string
  attackTactic: string
  discoveredBy?: string
  discoveredDate?: Date
}

export interface BattleResponse {
  riskLevel: string
  beastName: string
  beastAttribute: BeastAttribute
  attackTactic: string
  responseCards: {
    trap: string      // 陷阱卡 - 導致 Game Over
    defend: string    // 防禦卡 - 平手
    critical: string  // 爆擊卡 - 勝利
  }
  weakness: string
  explanation: string
}

export interface BountyTask {
  id: string
  title: string
  description: string
  reward: number
  status: 'active' | 'completed'
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  requiredBeastType?: BeastAttribute
}

export interface HunterProfile {
  id: string
  name: string
  level: number
  hp: number
  xp: number
  gold: number
  totalKills: number
  victories: number
  beastsCollected: string[]
  achievements: string[]
}

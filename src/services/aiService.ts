import { BattleResponse, BeastAttribute } from '../types/game'

// 模擬詐獸資料庫
const SCAM_PATTERNS = {
  greed: [
    {
      keywords: ['股票', '投資', '報酬率', '保證', '漲停'],
      beastName: '飆股暴利龍',
      attackTactic: '只有今天這支股票將漲停！立刻投資，月入 10 倍！',
      attribute: 'greed' as BeastAttribute,
      weakness: '詢問具體公司資訊和風險揭示',
      riskLevel: 'high'
    },
    {
      keywords: ['買虛擬幣', '加密貨幣', '礦場', '挖礦', '返現'],
      beastName: '幣圈吸血鬼',
      attackTactic: '這個新幣種保証翻倍！只需投資 500 美元就能日賺千元！',
      attribute: 'greed' as BeastAttribute,
      weakness: '查詢該虛擬幣的正規交易所',
      riskLevel: 'extreme'
    }
  ],
  fear: [
    {
      keywords: ['爸媽', '孩子被抓', '綁架', '急需匯款'],
      beastName: '哭腔獸',
      attackTactic: '爸！我被打得好慘，快匯款救我！不要告訴媽媽！',
      attribute: 'fear' as BeastAttribute,
      weakness: '撥打孩子原號碼或直接去學校查詢',
      riskLevel: 'extreme'
    },
    {
      keywords: ['帳戶凍結', '違法', '法院', '檢舉'],
      beastName: '法務恐懼獸',
      attackTactic: '你的帳戶涉及洗錢！再不配合就要被逮捕！',
      attribute: 'fear' as BeastAttribute,
      weakness: '撥打官方客服電話驗證',
      riskLevel: 'high'
    }
  ],
  emotion: [
    {
      keywords: ['戀愛', '寶寶', '親愛的', '愛你'],
      beastName: '殺豬盤魅魔',
      attackTactic: '親愛的寶寶，我需要錢投資，請幫我匯款好嗎？',
      attribute: 'emotion' as BeastAttribute,
      weakness: '視訊通話確認身份',
      riskLevel: 'extreme'
    }
  ]
}

export async function analyzeInput(input: string, inputType: 'text' | 'url'): Promise<BattleResponse> {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1500))

  const lowerInput = input.toLowerCase()
  let riskLevel = 'low'
  let matchedPattern: any = null
  let beastAttribute: BeastAttribute = 'greed'

  // 檢查是否匹配詐騙模式
  for (const [attribute, patterns] of Object.entries(SCAM_PATTERNS)) {
    for (const pattern of patterns) {
      const match = pattern.keywords.some(keyword => lowerInput.includes(keyword))
      if (match) {
        matchedPattern = pattern
        beastAttribute = attribute as BeastAttribute
        riskLevel = pattern.riskLevel
        break
      }
    }
    if (matchedPattern) break
  }

  // 如果沒有匹配到特定模式，進行基本風險評估
  if (!matchedPattern) {
    const suspiciousKeywords = ['匯款', '急需', '只限今天', '保證', '限時', '立刻', '緊急']
    const matchCount = suspiciousKeywords.filter(kw => lowerInput.includes(kw)).length

    if (matchCount >= 3) {
      riskLevel = 'high'
    } else if (matchCount >= 2) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'low'
    }
  }

  // 建立詐獸形象（如果風險高或以上）
  if (['high', 'extreme'].includes(riskLevel) && matchedPattern) {
    return {
      riskLevel,
      beastName: matchedPattern.beastName,
      beastAttribute,
      attackTactic: matchedPattern.attackTactic,
      responseCards: {
        trap: '急忙去銀行匯款',
        defend: '掛掉電話，不理會',
        critical: generateCritical(matchedPattern)
      },
      weakness: matchedPattern.weakness,
      explanation: `這是一個 ${beastAttribute === 'greed' ? '貪婪系' : beastAttribute === 'fear' ? '恐懼系' : '情感系'} 的詐騙。${matchedPattern.weakness}`
    }
  }

  // 安全或低風險
  return {
    riskLevel,
    beastName: '安全區',
    beastAttribute: 'greed',
    attackTactic: '未偵測到異常活動',
    responseCards: {
      trap: '無',
      defend: '無',
      critical: '無'
    },
    weakness: '無',
    explanation: '此內容未偵測到詐騙跡象'
  }
}

function generateCritical(pattern: any): string {
  const criticals: { [key: string]: string[] } = {
    greed: [
      '我想看你公司的營業執照和金管會許可',
      '這個股票代碼是什麼？我要直接到證券商查詢',
      '請提供你的身份證字號和營業地址'
    ],
    fear: [
      '我現在立刻打給警察局驗證你的身份',
      '我會親自去法院查詢此案件',
      '請告訴我法官姓名和案號，我要自己去查'
    ],
    emotion: [
      '寶寶，我們視訊通話吧，讓我看看你的傷口',
      '我要直接去你公司找你，地址是？',
      '這很可疑，我要報警並通知你家人'
    ]
  }

  const typeKey = pattern.attribute
  const options = criticals[typeKey] || criticals.greed
  return options[Math.floor(Math.random() * options.length)]
}

// 這是一個簡單的模擬實現
// 實際應該串接真實的 LLM API (OpenAI, Google, etc.)
export async function generateBeastImage(beastName: string): Promise<string> {
  // 返回一個 emoji 作為佔位符
  const emojis = ['🐉', '👹', '👿', '🤖', '👾', '💀']
  return emojis[Math.floor(Math.random() * emojis.length)]
}

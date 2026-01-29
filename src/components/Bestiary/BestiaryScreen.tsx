import { useState } from 'react'
import { BeastCard } from '../../types/game'
import './BestiaryScreen.css'

const SAMPLE_BEASTS: BeastCard[] = [
  {
    id: '1',
    name: '殺豬盤魅魔',
    attribute: 'greed',
    riskLevel: 'extreme',
    imageUrl: '💔',
    skill: '甜言蜜語',
    weakness: '視訊驗證',
    attackTactic: '親愛的寶寶，我需要錢投資，請幫我匯款...',
    discoveredBy: 'Hunter_Alpha',
    discoveredDate: new Date('2025-01-15')
  },
  {
    id: '2',
    name: '飆股暴利龍',
    attribute: 'greed',
    riskLevel: 'high',
    imageUrl: '🐉',
    skill: '限時施壓',
    weakness: '風險提示',
    attackTactic: '只有今天這個股票即將漲停，立刻購買！',
    discoveredBy: 'Hunter_Beta',
    discoveredDate: new Date('2025-01-20')
  },
  {
    id: '3',
    name: '哭腔獸',
    attribute: 'fear',
    riskLevel: 'high',
    imageUrl: '😨',
    skill: '聲淚俱下',
    weakness: '撥打原號碼',
    attackTactic: '爸！我被打得好慘，快匯款救我！',
    discoveredBy: 'Hunter_Gamma',
    discoveredDate: new Date('2025-01-18')
  }
]

export default function BestiaryScreen() {
  const [selectedBeast, setSelectedBeast] = useState<BeastCard | null>(null)
  const [filterAttribute, setFilterAttribute] = useState<string | null>(null)
  const [filterRisk, setFilterRisk] = useState<string | null>(null)

  const filteredBeasts = SAMPLE_BEASTS.filter(beast => {
    if (filterAttribute && beast.attribute !== filterAttribute) return false
    if (filterRisk && beast.riskLevel !== filterRisk) return false
    return true
  })

  return (
    <div className="bestiary-screen">
      <div className="bestiary-header card">
        <h2>📖 獵人圖鑑</h2>
        <p className="subtitle">已發現 {filteredBeasts.length} 隻詐獸</p>

        <div className="filter-controls">
          <div className="filter-group">
            <label>屬性:</label>
            <button
              className={!filterAttribute ? 'active' : ''}
              onClick={() => setFilterAttribute(null)}
            >
              全部
            </button>
            <button
              className={filterAttribute === 'greed' ? 'active' : ''}
              onClick={() => setFilterAttribute('greed')}
            >
              🤑 貪婪系
            </button>
            <button
              className={filterAttribute === 'fear' ? 'active' : ''}
              onClick={() => setFilterAttribute('fear')}
            >
              😨 恐懼系
            </button>
            <button
              className={filterAttribute === 'emotion' ? 'active' : ''}
              onClick={() => setFilterAttribute('emotion')}
            >
              💔 情感系
            </button>
          </div>

          <div className="filter-group">
            <label>風險:</label>
            <button
              className={!filterRisk ? 'active' : ''}
              onClick={() => setFilterRisk(null)}
            >
              全部
            </button>
            <button
              className={filterRisk === 'low' ? 'active' : ''}
              onClick={() => setFilterRisk('low')}
            >
              🟢 低
            </button>
            <button
              className={filterRisk === 'medium' ? 'active' : ''}
              onClick={() => setFilterRisk('medium')}
            >
              🟡 中
            </button>
            <button
              className={filterRisk === 'high' ? 'active' : ''}
              onClick={() => setFilterRisk('high')}
            >
              🔴 高
            </button>
            <button
              className={filterRisk === 'extreme' ? 'active' : ''}
              onClick={() => setFilterRisk('extreme')}
            >
              ☠️ 極限
            </button>
          </div>
        </div>
      </div>

      <div className="bestiary-content">
        {/* 詐獸卡牌列表 */}
        <div className="beast-cards-grid">
          {filteredBeasts.map(beast => (
            <div
              key={beast.id}
              className={`beast-card card-clickable ${selectedBeast?.id === beast.id ? 'selected' : ''}`}
              onClick={() => setSelectedBeast(beast)}
            >
              <div className="card-avatar">{beast.imageUrl}</div>
              <div className="card-name">{beast.name}</div>
              <div className="card-meta">
                <span className={`attribute-tag ${beast.attribute}`}>
                  {beast.attribute === 'greed' && '🤑'}
                  {beast.attribute === 'fear' && '😨'}
                  {beast.attribute === 'emotion' && '💔'}
                </span>
                <span className={`risk-tag risk-${beast.riskLevel}`}>
                  {beast.riskLevel.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 詳細信息面板 */}
        {selectedBeast && (
          <div className="beast-detail-panel card">
            <div className="detail-header">
              <div className="detail-avatar">{selectedBeast.imageUrl}</div>
              <div className="detail-title">
                <h3>{selectedBeast.name}</h3>
                <p className="detail-discovered">
                  首殺：{selectedBeast.discoveredBy} ({selectedBeast.discoveredDate?.toLocaleDateString('zh-TW')})
                </p>
              </div>
            </div>

            <div className="detail-stats">
              <div className="stat-item">
                <label>屬性</label>
                <div className="stat-content">
                  {selectedBeast.attribute === 'greed' && '🤑 貪婪系'}
                  {selectedBeast.attribute === 'fear' && '😨 恐懼系'}
                  {selectedBeast.attribute === 'emotion' && '💔 情感系'}
                </div>
              </div>

              <div className="stat-item">
                <label>風險等級</label>
                <div className={`stat-content risk-${selectedBeast.riskLevel}`}>
                  {selectedBeast.riskLevel.toUpperCase()}
                </div>
              </div>

              <div className="stat-item">
                <label>技能</label>
                <div className="stat-content">{selectedBeast.skill}</div>
              </div>
            </div>

            <div className="detail-section">
              <h4>攻擊話術</h4>
              <div className="dialogue-box">
                <p>"{selectedBeast.attackTactic}"</p>
              </div>
            </div>

            <div className="detail-section">
              <h4>弱點攻略</h4>
              <div className="weakness-box">
                <p>✅ {selectedBeast.weakness}</p>
              </div>
            </div>

            <button className="close-button" onClick={() => setSelectedBeast(null)}>
              關閉詳情
            </button>
          </div>
        )}
      </div>

      <div className="bestiary-achievements card">
        <h3>🏆 成就系統</h3>
        <div className="achievement-list">
          <div className="achievement-item">
            <span className="achievement-icon">🎯</span>
            <span className="achievement-name">首次狩獵</span>
            <span className="achievement-desc">擊敗第一隻詐獸</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">💰</span>
            <span className="achievement-name">華爾街之狼獵人</span>
            <span className="achievement-desc">收集 10 隻貪婪系詐獸</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">💪</span>
            <span className="achievement-name">連勝獵人</span>
            <span className="achievement-desc">連贏 5 場戰鬥</span>
          </div>
        </div>
      </div>
    </div>
  )
}

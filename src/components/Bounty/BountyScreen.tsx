import { useState } from 'react'
import { BountyTask } from '../../types/game'
import './BountyScreen.css'

const SAMPLE_BOUNTIES: BountyTask[] = [
  {
    id: '1',
    title: '急徵！新型態 AI 換臉詐騙樣本',
    description: '最近出現利用 deepfake 技術進行視訊詐騙的新型態。如果你遇到可疑的視訊通話要求匯款，請通報此樣本。',
    reward: 500,
    status: 'active',
    difficulty: 'hard',
    requiredBeastType: 'emotion'
  },
  {
    id: '2',
    title: '持續蒐集：假冒物流詐騙訊息',
    description: '蒐集任何聲稱 DHL、FedEx、UPS 等國際物流的詐騙訊息。',
    reward: 200,
    status: 'active',
    difficulty: 'easy'
  },
  {
    id: '3',
    title: '稀有！跨國投資詐騙信件樣本',
    description: '尋找來自海外的投資詐騙案例。難度高，但獎勵豐富。',
    reward: 1000,
    status: 'active',
    difficulty: 'legendary',
    requiredBeastType: 'greed'
  },
  {
    id: '4',
    title: '已完成：銀行冒充詐騙',
    description: '已成功蒐集足夠樣本。感謝所有獵人的貢獻！',
    reward: 300,
    status: 'completed',
    difficulty: 'medium'
  }
]

export default function BountyScreen() {
  const [selectedBounty, setSelectedBounty] = useState<BountyTask | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('active')
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)

  const filteredBounties = SAMPLE_BOUNTIES.filter(bounty => {
    if (filterStatus !== 'all' && bounty.status !== filterStatus) return false
    if (filterDifficulty && bounty.difficulty !== filterDifficulty) return false
    return true
  })

  const activeBounties = SAMPLE_BOUNTIES.filter(b => b.status === 'active').length
  const completedBounties = SAMPLE_BOUNTIES.filter(b => b.status === 'completed').length
  const totalRewards = SAMPLE_BOUNTIES.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.reward, 0)

  return (
    <div className="bounty-screen">
      <div className="bounty-header card">
        <h2>💰 懸賞公會</h2>
        <p className="subtitle">收集詐騙樣本，協力建設防詐社群</p>

        <div className="bounty-stats">
          <div className="stat-box">
            <div className="stat-number">{activeBounties}</div>
            <div className="stat-label">進行中的懸賞</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{completedBounties}</div>
            <div className="stat-label">已完成懸賞</div>
          </div>
          <div className="stat-box">
            <div className="stat-number neon-glow-green">${totalRewards}</div>
            <div className="stat-label">累積獎勵</div>
          </div>
        </div>
      </div>

      <div className="bounty-filters card">
        <div className="filter-group">
          <label>狀態:</label>
          <button
            className={filterStatus === 'all' ? 'active' : ''}
            onClick={() => setFilterStatus('all')}
          >
            全部
          </button>
          <button
            className={filterStatus === 'active' ? 'active' : ''}
            onClick={() => setFilterStatus('active')}
          >
            🔔 進行中
          </button>
          <button
            className={filterStatus === 'completed' ? 'active' : ''}
            onClick={() => setFilterStatus('completed')}
          >
            ✅ 已完成
          </button>
        </div>

        <div className="filter-group">
          <label>難度:</label>
          <button
            className={!filterDifficulty ? 'active' : ''}
            onClick={() => setFilterDifficulty(null)}
          >
            全部
          </button>
          <button
            className={filterDifficulty === 'easy' ? 'active' : ''}
            onClick={() => setFilterDifficulty('easy')}
          >
            🟢 簡單
          </button>
          <button
            className={filterDifficulty === 'medium' ? 'active' : ''}
            onClick={() => setFilterDifficulty('medium')}
          >
            🟡 中等
          </button>
          <button
            className={filterDifficulty === 'hard' ? 'active' : ''}
            onClick={() => setFilterDifficulty('hard')}
          >
            🔴 困難
          </button>
          <button
            className={filterDifficulty === 'legendary' ? 'active' : ''}
            onClick={() => setFilterDifficulty('legendary')}
          >
            ⭐ 傳奇
          </button>
        </div>
      </div>

      <div className="bounty-content">
        {/* 懸賞單列表 */}
        <div className="bounty-list">
          {filteredBounties.map(bounty => (
            <div
              key={bounty.id}
              className={`bounty-item card ${bounty.status === 'completed' ? 'completed' : 'active'}`}
              onClick={() => setSelectedBounty(bounty)}
            >
              <div className="bounty-header-row">
                <div className="bounty-title">
                  <span className="bounty-status-indicator">
                    {bounty.status === 'active' ? '🔔' : '✅'}
                  </span>
                  {bounty.title}
                </div>
                <div className="bounty-reward">
                  <span className={`reward-amount ${bounty.status}`}>
                    +${bounty.reward}
                  </span>
                </div>
              </div>

              <p className="bounty-description">{bounty.description}</p>

              <div className="bounty-meta">
                <span className={`difficulty-badge difficulty-${bounty.difficulty}`}>
                  {bounty.difficulty === 'easy' && '🟢 簡單'}
                  {bounty.difficulty === 'medium' && '🟡 中等'}
                  {bounty.difficulty === 'hard' && '🔴 困難'}
                  {bounty.difficulty === 'legendary' && '⭐ 傳奇'}
                </span>

                {bounty.requiredBeastType && (
                  <span className={`beast-type-badge`}>
                    {bounty.requiredBeastType === 'greed' && '🤑 貪婪系'}
                    {bounty.requiredBeastType === 'fear' && '😨 恐懼系'}
                    {bounty.requiredBeastType === 'emotion' && '💔 情感系'}
                  </span>
                )}
              </div>

              <button className="view-details-btn">
                {selectedBounty?.id === bounty.id ? '✓ 已選中' : '查看詳情'}
              </button>
            </div>
          ))}
        </div>

        {/* 詳細信息面板 */}
        {selectedBounty && (
          <div className="bounty-detail-panel card">
            <div className="detail-header">
              <span className="detail-status-icon">
                {selectedBounty.status === 'active' ? '🔔' : '✅'}
              </span>
              <h3>{selectedBounty.title}</h3>
            </div>

            <div className="detail-reward-box">
              <div className="reward-title">懸賞金額</div>
              <div className={`reward-display ${selectedBounty.status}`}>
                ${selectedBounty.reward}
              </div>
            </div>

            <div className="detail-section">
              <h4>詳細描述</h4>
              <p>{selectedBounty.description}</p>
            </div>

            <div className="detail-specs">
              <div className="spec-item">
                <label>難度等級</label>
                <div className={`spec-value difficulty-${selectedBounty.difficulty}`}>
                  {selectedBounty.difficulty === 'easy' && '🟢 簡單'}
                  {selectedBounty.difficulty === 'medium' && '🟡 中等'}
                  {selectedBounty.difficulty === 'hard' && '🔴 困難'}
                  {selectedBounty.difficulty === 'legendary' && '⭐ 傳奇'}
                </div>
              </div>

              {selectedBounty.requiredBeastType && (
                <div className="spec-item">
                  <label>所需詐獸類型</label>
                  <div className="spec-value">
                    {selectedBounty.requiredBeastType === 'greed' && '🤑 貪婪系詐獸'}
                    {selectedBounty.requiredBeastType === 'fear' && '😨 恐懼系詐獸'}
                    {selectedBounty.requiredBeastType === 'emotion' && '💔 情感系詐獸'}
                  </div>
                </div>
              )}

              <div className="spec-item">
                <label>狀態</label>
                <div className="spec-value">
                  {selectedBounty.status === 'active' ? '🔔 進行中' : '✅ 已完成'}
                </div>
              </div>
            </div>

            {selectedBounty.status === 'active' && (
              <button 
                className="submit-button success"
                onClick={() => alert(`已提交樣本到: ${selectedBounty.title}！\n審核通過後將發送獎勵。`)}
              >
                📤 提交詐騙樣本
              </button>
            )}

            {selectedBounty.status === 'completed' && (
              <div className="completed-message">
                <p>✅ 此懸賞已圓滿完成！感謝所有獵人的支持與貢獻。</p>
              </div>
            )}

            <button className="close-button" onClick={() => setSelectedBounty(null)}>
              關閉詳情
            </button>
          </div>
        )}
      </div>

      <div className="bounty-guide card">
        <h3>📋 如何參與懸賞</h3>
        <ol className="guide-steps">
          <li>
            <span className="step-number">1</span>
            <span className="step-text">選擇一個進行中的懸賞任務</span>
          </li>
          <li>
            <span className="step-number">2</span>
            <span className="step-text">蒐集符合條件的詐騙樣本（文字、截圖或網址）</span>
          </li>
          <li>
            <span className="step-number">3</span>
            <span className="step-text">透過掃描儀驗證樣本並通報</span>
          </li>
          <li>
            <span className="step-number">4</span>
            <span className="step-text">成功通報後，你的獵人ID將被永久記錄在該詐獸卡牌上</span>
          </li>
          <li>
            <span className="step-number">5</span>
            <span className="step-text">獲得獎勵金幣和經驗值，上傳你的戰績！</span>
          </li>
        </ol>
      </div>
    </div>
  )
}

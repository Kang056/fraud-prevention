import { useState, useEffect } from 'react'
import { BattleResponse } from '../../types/game'
import './BattleScreen.css'

interface BattleScreenProps {
  beastData: BattleResponse
  onBattleEnd: (result: 'victory' | 'draw' | 'defeat') => void
}

export default function BattleScreen({ beastData, onBattleEnd }: BattleScreenProps) {
  const [round, setRound] = useState(1)
  const [beastHP, setBeastHP] = useState(100)
  const [hunterHP, setHunterHP] = useState(100)
  const [timeLeft, setTimeLeft] = useState(10)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [battleActive, setBattleActive] = useState(true)

  // 倒數計時器
  useEffect(() => {
    if (!battleActive || selectedCard) return

    if (timeLeft <= 0) {
      // 超時自動選擇防禦卡
      handleCardSelect('defend')
      return
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, battleActive, selectedCard])

  const handleCardSelect = (cardType: 'trap' | 'defend' | 'critical') => {
    setSelectedCard(cardType)
    setBattleActive(false)

    const messages: { [key: string]: string } = {
      trap: `💀 你選擇了 [${beastData.responseCards.trap}]... 這是大錯誤！`,
      defend: `🛡️ 你選擇了 [${beastData.responseCards.defend}]，詐獸逃跑了！`,
      critical: `⚔️ 你選擇了 [${beastData.responseCards.critical}]，這是完美的反擊！`
    }

    const newLog = [...battleLog, messages[cardType]]
    setBattleLog(newLog)

    setTimeout(() => {
      if (cardType === 'trap') {
        setHunterHP(0)
        endBattle('defeat')
      } else if (cardType === 'defend') {
        setBeastHP(50)
        endBattle('draw')
      } else if (cardType === 'critical') {
        setBeastHP(0)
        endBattle('victory')
      }
    }, 1500)
  }

  const endBattle = (result: 'victory' | 'draw' | 'defeat') => {
    const resultMessages = {
      victory: '🎉 詐獸已被消滅！獲得勝利！',
      draw: '⚔️ 戰鬥平手，詐獸逃脫了...',
      defeat: '💀 你被詐騙了！遊戲結束！'
    }

    setBattleLog(prev => [...prev, resultMessages[result]])

    setTimeout(() => {
      onBattleEnd(result)
    }, 2000)
  }

  return (
    <div className="battle-screen">
      <div className="battle-arena">
        {/* 詐獸側 */}
        <div className="battle-side beast-side">
          <div className={`beast-avatar ${beastHP <= 0 ? 'defeated' : ''}`}>
            <div className="beast-placeholder">
              {beastData.beastAttribute === 'greed' && '🤑'}
              {beastData.beastAttribute === 'fear' && '😨'}
              {beastData.beastAttribute === 'emotion' && '💔'}
            </div>
          </div>

          <div className="battle-entity-info">
            <h3 className="entity-name">{beastData.beastName}</h3>
            <div className="attribute-badge">
              {beastData.beastAttribute === 'greed' && '🤑 貪婪系'}
              {beastData.beastAttribute === 'fear' && '😨 恐懼系'}
              {beastData.beastAttribute === 'emotion' && '💔 情感系'}
            </div>

            <div className="hp-bar-container">
              <div className="hp-label">HP</div>
              <div className="hp-bar">
                <div
                  className="hp-fill beast-hp"
                  style={{ width: `${Math.max(0, beastHP)}%` }}
                ></div>
              </div>
              <div className="hp-value">{Math.max(0, beastHP)}/100</div>
            </div>
          </div>

          <div className="beast-dialogue">
            <p className="dialogue-text">"{beastData.attackTactic}"</p>
          </div>
        </div>

        {/* VS */}
        <div className="battle-vs">
          <div className="vs-text">VS</div>
          <div className="round-indicator">回合 {round}</div>
        </div>

        {/* 獵人側 */}
        <div className="battle-side hunter-side">
          <div className="battle-entity-info">
            <h3 className="entity-name">獵人</h3>
            <div className="level-badge">Lv.1</div>

            <div className="hp-bar-container">
              <div className="hp-label">HP</div>
              <div className="hp-bar">
                <div
                  className="hp-fill hunter-hp"
                  style={{ width: `${Math.max(0, hunterHP)}%` }}
                ></div>
              </div>
              <div className="hp-value">{Math.max(0, hunterHP)}/100</div>
            </div>
          </div>

          <div className="hunter-avatar">
            <div className="hunter-placeholder">🎯</div>
          </div>
        </div>
      </div>

      {/* 戰鬥選項 */}
      {battleActive && (
        <div className="battle-choices">
          <div className="timer-display">
            <div className="timer-circle" style={{ '--time': timeLeft / 10 } as any}>
              <span className="timer-text">{timeLeft}s</span>
            </div>
          </div>

          <div className="card-grid">
            <button
              className="battle-card card-trap"
              onClick={() => handleCardSelect('trap')}
              disabled={selectedCard !== null}
            >
              <div className="card-header">🔴 陷阱卡</div>
              <div className="card-title">驚慌匯款</div>
              <div className="card-content">
                {beastData.responseCards.trap}
              </div>
              <div className="card-result">💀 GAME OVER</div>
            </button>

            <button
              className="battle-card card-defend"
              onClick={() => handleCardSelect('defend')}
              disabled={selectedCard !== null}
            >
              <div className="card-header">🟡 防禦卡</div>
              <div className="card-title">直接掛斷</div>
              <div className="card-content">
                {beastData.responseCards.defend}
              </div>
              <div className="card-result">🛡️ DRAW</div>
            </button>

            <button
              className="battle-card card-critical"
              onClick={() => handleCardSelect('critical')}
              disabled={selectedCard !== null}
            >
              <div className="card-header">🟢 爆擊卡</div>
              <div className="card-title">邏輯反殺</div>
              <div className="card-content">
                {beastData.responseCards.critical}
              </div>
              <div className="card-result">⚔️ CRITICAL!</div>
            </button>
          </div>

          <p className="battle-prompt">選擇最佳回應卡牌！</p>
        </div>
      )}

      {/* 戰鬥日誌 */}
      <div className="battle-log">
        <h4>戰鬥記錄</h4>
        <div className="log-entries">
          {battleLog.map((log, idx) => (
            <div key={idx} className="log-entry">
              {log}
            </div>
          ))}
        </div>
      </div>

      {!battleActive && (
        <div className="battle-waiting">
          <p>結果處理中...</p>
        </div>
      )}
    </div>
  )
}

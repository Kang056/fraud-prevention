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

  const getThreatStars = (level: string) => {
    switch (level) {
      case 'low': return '★☆☆☆☆'
      case 'medium': return '★★☆☆☆'
      case 'high': return '★★★★☆'
      case 'extreme': return '★★★★★'
      default: return '★☆☆☆☆'
    }
  }

  return (
    <div className="battle-screen">
      {/* HUD Layer */}
      <div className="battle-hud">
        <div className="hud-section hud-left">
          <span className="hud-label">THREAT LEVEL</span>
          <span className="hud-value threat-stars">{getThreatStars(beastData.riskLevel)}</span>
        </div>
        <div className="hud-section hud-center">
          <span className="match-timer">00:{timeLeft.toString().padStart(2, '0')}</span>
        </div>
        <div className="hud-section hud-right">
          <span className="hud-label">CREDIT</span>
          <span className="hud-value crypto-counter">₿ 0450</span>
        </div>
      </div>

      <div className="battle-arena">
        {/* 詐獸側 */}
        <div className="battle-side beast-side">
          <div className={`beast-avatar ${beastHP <= 0 ? 'defeated' : ''} glitch-container`}>
            <div className={`beast-placeholder ${beastHP > 0 ? 'glitch-anim' : ''}`}>
              {beastData.beastAttribute === 'greed' && '🤑'}
              {beastData.beastAttribute === 'fear' && '😨'}
              {beastData.beastAttribute === 'emotion' && '💔'}
            </div>
          </div>

          <div className="battle-entity-info">
            <h3 className="entity-name glitch-text">{beastData.beastName}</h3>
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
              <div className="hp-value">{Math.max(0, beastHP)}%</div>
            </div>
          </div>

          <div className="beast-dialogue typing-effect">
            <p className="dialogue-text">"{beastData.attackTactic}"</p>
          </div>
        </div>

        {/* VS */}
        <div className="battle-vs">
          <div className="vs-text">VS</div>
          <div className="round-indicator">ROUND {round}</div>
        </div>

        {/* 獵人側 */}
        <div className="battle-side hunter-side">
          <div className="battle-entity-info">
            <h3 className="entity-name">HUNTER</h3>
            <div className="level-badge">Lv.1</div>

            <div className="hp-bar-container">
              <div className="hp-label">HP</div>
              <div className="hp-bar">
                <div
                  className="hp-fill hunter-hp"
                  style={{ width: `${Math.max(0, hunterHP)}%` }}
                ></div>
              </div>
              <div className="hp-value">{Math.max(0, hunterHP)}%</div>
            </div>
          </div>

          <div className="hunter-avatar">
            <div className="hunter-placeholder">🎯</div>
          </div>
        </div>
      </div>

      {/* 戰鬥選項 */}
      <div className={`battle-choices ${!battleActive ? 'phase-resolution' : ''}`}>
        {!battleActive && selectedCard && (
           <div className="resolution-overlay">
             <h2>
               {selectedCard === 'critical' ? 'CRITICAL HIT' : 
                selectedCard === 'trap' ? 'SYSTEM FAILURE' : 'DEFENSE UP'}
             </h2>
           </div>
        )}

        <div className="card-grid">
          <button
            className={`battle-card card-trap ${selectedCard && selectedCard !== 'trap' ? 'card-dimmed' : ''} ${selectedCard === 'trap' ? 'card-selected' : ''}`}
            onClick={() => handleCardSelect('trap')}
            disabled={selectedCard !== null}
          >
            <div className="card-header">🔴 TRAP</div>
            <div className="card-title">驚慌匯款</div>
            <div className="card-content">
              {beastData.responseCards.trap}
            </div>
            <div className="card-result">💀 GAME OVER</div>
          </button>

          <button
             className={`battle-card card-defend ${selectedCard && selectedCard !== 'defend' ? 'card-dimmed' : ''} ${selectedCard === 'defend' ? 'card-selected' : ''}`}
            onClick={() => handleCardSelect('defend')}
            disabled={selectedCard !== null}
          >
            <div className="card-header">🟡 DEFENSE</div>
            <div className="card-title">直接掛斷</div>
            <div className="card-content">
              {beastData.responseCards.defend}
            </div>
            <div className="card-result">🛡️ DRAW</div>
          </button>

          <button
             className={`battle-card card-critical ${selectedCard && selectedCard !== 'critical' ? 'card-dimmed' : ''} ${selectedCard === 'critical' ? 'card-selected' : ''}`}
            onClick={() => handleCardSelect('critical')}
            disabled={selectedCard !== null}
          >
            <div className="card-header">🟢 CRITICAL</div>
            <div className="card-title">邏輯反殺</div>
            <div className="card-content">
              {beastData.responseCards.critical}
            </div>
            <div className="card-result">⚔️ VICTORY</div>
          </button>
        </div>
      </div>

      {/* 戰鬥日誌 */}
      <div className="battle-log terminal-style">
        <h4>&gt; SYSTEM_LOG</h4>
        <div className="log-entries">
          {battleLog.map((log, idx) => (
            <div key={idx} className="log-entry">
              <span className="log-prefix">[{new Date().toLocaleTimeString('en-US', {hour12: false})}]</span> {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

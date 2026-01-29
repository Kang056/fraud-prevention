import { useState, useEffect } from 'react'
import { BattleResponse } from '../../types/game'
import './ResultScreen.css'

interface ResultScreenProps {
  result: 'victory' | 'draw' | 'defeat'
  beastData: BattleResponse
  onReset: () => void
}

export default function ResultScreen({ result, beastData, onReset }: ResultScreenProps) {
  const [revealed, setRevealed] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    // Stage 1: Reveal Card
    const timer1 = setTimeout(() => setRevealed(true), 500)
    // Stage 2: Show Stats
    const timer2 = setTimeout(() => setShowStats(true), 1500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const getTitle = () => {
    switch(result) {
      case 'victory': return 'SCAM NEUTRALIZED'
      case 'draw': return 'TARGET ESCAPED'
      case 'defeat': return 'YOU GOT SCAMMED'
      default: return 'MISSION END'
    }
  }

  return (
    <div className={`result-screen result-${result}`}>
      <div className="result-header">
        <h1 className="glitch-text" data-text={getTitle()}>{getTitle()}</h1>
      </div>

      <div className="card-container">
        <div className={`beast-card ${revealed ? 'revealed' : ''} ${result === 'victory' ? 'captured' : ''}`}>
          <div className="card-front">
            <div className="card-holo-overlay"></div>
            <div className="card-top">
              <span className="card-risk">{beastData.riskLevel.toUpperCase()} RISK</span>
              <span className="card-type">{beastData.beastAttribute.toUpperCase()}</span>
            </div>
            
            <div className="card-image-placeholder">
              <span className="beast-icon">
                {beastData.beastAttribute === 'greed' && '🤑'}
                {beastData.beastAttribute === 'fear' && '😨'}
                {beastData.beastAttribute === 'emotion' && '💔'}
              </span>
              {result === 'victory' && <div className="stamp-deceased">PURGED</div>}
            </div>

            <div className="card-info">
              <h3>{beastData.beastName}</h3>
              <p>"{beastData.attackTactic}"</p>
            </div>
            
            <div className="card-weakness">
              <strong>WEAKNESS EXPOSED:</strong>
              <p>{beastData.weakness}</p>
            </div>
          </div>
          
          <div className="card-back">
            <div className="cyber-pattern"></div>
            <div className="logo-icon">S.C.A.M.</div>
          </div>
        </div>
      </div>

      <div className={`result-stats ${showStats ? 'visible' : ''}`}>
        <div className="stat-row">
          <span className="label">BOUNTY</span>
          <span className="value money">+{result === 'victory' ? '50' : '0'} ₿</span>
        </div>
        <div className="stat-row">
          <span className="label">XP</span>
          <span className="value xp">+{result === 'victory' ? '100' : '10'} XP</span>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-share" onClick={() => alert('Shared to Neural Net! (Mock)')}>
          📸 SHARE REPORT
        </button>
        <button className="btn-next primary" onClick={onReset}>
          🔍 SCAN NEXT TARGET
        </button>
      </div>
    </div>
  )
}

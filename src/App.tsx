import { useState } from 'react'
import ScannerScreen from './components/Scanner/ScannerScreen'
import BestiaryScreen from './components/Bestiary/BestiaryScreen'
import BountyScreen from './components/Bounty/BountyScreen'
import BattleScreen from './components/Battle/BattleScreen'
import './App.css'
import { BattleResponse } from './types/game'

function App() {
  const [currentScreen, setCurrentScreen] = useState('scanner')
  const [battleData, setBattleData] = useState<BattleResponse | null>(null)
  const [gameState, setGameState] = useState({
    level: 1,
    experience: 0,
    beastsDefeated: 0
  })

  const handleBattleStart = (beastData: BattleResponse) => {
    setBattleData(beastData)
    setCurrentScreen('battle')
  }

  const handleBattleEnd = (result: 'victory' | 'draw' | 'defeat') => {
    if (result === 'victory') {
      setGameState(prev => ({
        ...prev,
        beastsDefeated: prev.beastsDefeated + 1,
        experience: prev.experience + 100
      }))
    }
    setBattleData(null)
    setCurrentScreen('scanner')
  }

  return (
    <div className="app">
      <header className="game-header">
        <h1 className="game-title neon-glow">詐獸獵人</h1>
        <p className="game-subtitle">PROJECT S.C.A.M.</p>
        <div className="game-stats">
          <span>Lv. {gameState.level}</span>
          <span>EXP: {gameState.experience}</span>
          <span>獵獸: {gameState.beastsDefeated}</span>
        </div>
      </header>

      <nav className="game-nav">
        <button 
          onClick={() => setCurrentScreen('scanner')}
          className={currentScreen === 'scanner' ? 'active' : ''}
        >
          🎯 掃描儀
        </button>
        <button 
          onClick={() => setCurrentScreen('bestiary')}
          className={currentScreen === 'bestiary' ? 'active' : ''}
        >
          📖 獵人圖鑑
        </button>
        <button 
          onClick={() => setCurrentScreen('bounty')}
          className={currentScreen === 'bounty' ? 'active' : ''}
        >
          💰 懸賞公會
        </button>
      </nav>

      <main className="game-main scanlines">
        {currentScreen === 'scanner' && (
          <ScannerScreen onBattleStart={handleBattleStart} gameState={gameState} />
        )}
        {currentScreen === 'bestiary' && (
          <BestiaryScreen />
        )}
        {currentScreen === 'bounty' && (
          <BountyScreen />
        )}
        {currentScreen === 'battle' && battleData && (
          <BattleScreen beastData={battleData} onBattleEnd={handleBattleEnd} />
        )}
      </main>

      <footer className="game-footer">
        <p>Cyberia 獵人局 © 2025</p>
      </footer>
    </div>
  )
}

export default App

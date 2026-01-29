import { useState } from 'react'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('scanner')

  return (
    <div className="app">
      <header className="game-header">
        <h1 className="game-title neon-glow">詐獸獵人</h1>
        <p className="game-subtitle">PROJECT S.C.A.M.</p>
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
          <div className="screen">
            <h2>🎯 詐騙掃描儀</h2>
            <p>輸入可疑信息進行分析...</p>
          </div>
        )}
        {currentScreen === 'bestiary' && (
          <div className="screen">
            <h2>📖 獵人圖鑑</h2>
            <p>查看已收集的詐獸...</p>
          </div>
        )}
        {currentScreen === 'bounty' && (
          <div className="screen">
            <h2>💰 懸賞公會</h2>
            <p>接受狩獵任務...</p>
          </div>
        )}
      </main>

      <footer className="game-footer">
        <p>Cyberia 獵人局 © 2025</p>
      </footer>
    </div>
  )
}

export default App

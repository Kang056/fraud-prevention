import { useState } from 'react'
import { BattleResponse } from '../../types/game'
import { analyzeInput } from '../../services/aiService'
import './ScannerScreen.css'

interface ScannerScreenProps {
  onBattleStart: (beastData: BattleResponse) => void
  gameState: any
}

export default function ScannerScreen({ onBattleStart, gameState }: ScannerScreenProps) {
  const [inputValue, setInputValue] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<BattleResponse | null>(null)
  const [inputType, setInputType] = useState<'text' | 'url'>('text')
  const [error, setError] = useState('')
  const [scanLogs, setScanLogs] = useState<string[]>([])

  const addLog = (msg: string) => setScanLogs(prev => [...prev.slice(-4), msg])

  const handleScan = async () => {
    if (!inputValue.trim()) {
      setError('請輸入要掃描的內容')
      return
    }

    setScanning(true)
    setError('')
    setScanResult(null)
    setScanLogs(['> 初始化神經網絡...', '> 連接反詐騙資料庫...'])
    
    // Simulate steps
    setTimeout(() => addLog('> 分析文本語義...'), 500)
    setTimeout(() => addLog('> 比對已知道特徵值...'), 1000)

    try {
      // 調用 AI 分析服務
      const result = await analyzeInput(inputValue, inputType)
      addLog('> 分析完成!')
      console.log('analyzeInput result:', result);
      setScanResult(result)

      // 根據風險等級決定是否進入戰鬥
      if (['medium', 'high', 'extreme'].includes(result.riskLevel)) {
        addLog(`> 偵測到風險: ${result.riskLevel.toUpperCase()}`)
        addLog('> 啟動戰鬥協議...')
        // 延遲後自動進入戰鬥
        setTimeout(() => {
          onBattleStart(result)
        }, 2000)
      } else {
        addLog('> 區域安全.')
      }
    } catch (err) {
      console.error('Scan failed:', err)
      setError('掃描失敗，請稍後重試')
      addLog('> 錯誤: 掃描中斷')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="scanner-screen">
      <div className="radar-container">
        <div className={`radar-circle ${scanning ? 'scanning' : ''}`}></div>
        <div className="radar-sweep"></div>
      </div>

      <div className="scanner-content card">
        <h2 className="scanner-title">🎯 戰術掃描儀</h2>
        <p className="scanner-subtitle">輸入可疑資訊進行風險評估</p>

        <div className="input-section">
          {/* ... inputs ... */}
          <div className="input-type-selector">
            <button 
              className={inputType === 'text' ? 'active' : ''}
              onClick={() => setInputType('text')}
            >
              📝 文本
            </button>
            <button 
              className={inputType === 'url' ? 'active' : ''}
              onClick={() => setInputType('url')}
            >
              🔗 網址
            </button>
          </div>

          <textarea
            className="scanner-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputType === 'text' 
              ? '貼上可疑的訊息 (例如: "保證獲利", "急需匯款")...' 
              : '輸入可疑的網址...'}
            disabled={scanning}
            rows={6}
          />
          
          <div className="scanner-logs">
             {scanLogs.map((log, i) => <div key={i} className="log-line">{log}</div>)}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="scan-button"
            onClick={handleScan}
            disabled={scanning || !inputValue.trim()}
          >
            {scanning ? '⚡ 掃描中...' : '🔍 開始掃描'}
          </button>
        </div>

        {scanResult && (
          <div className={`scan-result result-${scanResult.riskLevel}`}>
            <h3 className="result-title">
              {scanResult.riskLevel === 'low' && '✅ 安全區'}
              {scanResult.riskLevel === 'medium' && '⚠️ 警告區'}
              {scanResult.riskLevel === 'high' && '🚨 危險區'}
              {scanResult.riskLevel === 'extreme' && '☠️ 致命區'}
            </h3>

            <div className="result-details">
              <div className="detail-row">
                <span className="label">風險等級:</span>
                <span className="value">{scanResult.riskLevel.toUpperCase()}</span>
              </div>

              {['high', 'extreme'].includes(scanResult.riskLevel) && (
                <>
                  <div className="detail-row">
                    <span className="label">詐獸名稱:</span>
                    <span className="value">{scanResult.beastName}</span>
                  </div>

                  <div className="detail-row">
                    <span className="label">屬性:</span>
                    <span className="value">
                      {scanResult.beastAttribute === 'greed' && '🤑 貪婪系'}
                      {scanResult.beastAttribute === 'fear' && '😨 恐懼系'}
                      {scanResult.beastAttribute === 'emotion' && '💔 情感系'}
                    </span>
                  </div>

                  <div className="alert-box">
                    <p className="alert-title">⚡ 警告！詐獸已出現！</p>
                    <p className="alert-message">準備進入戰鬥模式...</p>
                  </div>

                  <button 
                    className="battle-button success"
                    onClick={() => onBattleStart(scanResult)}
                  >
                    ⚔️ 進入戰鬥
                  </button>
                </>
              )}

              {scanResult.riskLevel === 'medium' && (
                <div className="caution-box">
                  <p>此內容存在中等風險，請保持警惕</p>
                  <button 
                    className="battle-button warning"
                    onClick={() => onBattleStart(scanResult)}
                  >
                    ⚔️ 強制進入演習
                  </button>
                </div>
              )}

              {scanResult.riskLevel === 'low' && (
                <div className="safe-box">
                  <p>✅ 區域淨空，祝您衝浪愉快</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="scanner-footer">
        <div className="hunter-tip">
          <span className="label">獵人提示:</span>
          <span className="message">使用掃描儀辨識詐騙內容，擊敗詐獸來保護自己</span>
        </div>
      </div>
    </div>
  )
}


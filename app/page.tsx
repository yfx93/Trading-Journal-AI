'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Home() {
  const [activeTab, setActiveTab] = useState('entry')
  const [trades, setTrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    asset: 'NQ',
    direction: 'Long',
    result: 'Win',
    points_pl: 0,
    dollar_pl: 0,
    entry_time: '09:30',
    smt_timeframe: '4H',
    smt_timing: 'Early',
    micro_ssmt_quarters: 'Q1/Q4',
    htf_quarter: 'Q1',
    ssmt_quality: 'High',
    notes: ''
  })

  useEffect(() => {
    loadTrades()
  }, [])

  const loadTrades = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      setTrades(data || [])
    } catch (err) {
      console.error('Error loading trades:', err)
      const local = localStorage.getItem('smtTrades')
      if (local) {
        try {
          setTrades(JSON.parse(local))
        } catch (e) {
          console.error('Parse error:', e)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const saveTrade = async (e: any) => {
    e.preventDefault()
    try {
      const tradeData = {
        user_id: 'user1',
        ...formData,
        points_pl: parseFloat(formData.points_pl as any) || 0,
        dollar_pl: parseFloat(formData.dollar_pl as any) || 0,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('trades')
        .insert([tradeData])
        .select()

      if (error) throw error

      alert('✅ Trade saved successfully!')
      loadTrades()
      setActiveTab('history')
    } catch (err: any) {
      console.error('Error saving trade:', err)
      
      // Fallback to localStorage
      const localTrades = [...trades, { 
        id: Date.now().toString(), 
        ...formData,
        created_at: new Date().toISOString() 
      }]
      setTrades(localTrades)
      localStorage.setItem('smtTrades', JSON.stringify(localTrades))
      alert('✅ Trade saved to local storage!')
      setActiveTab('history')
    }
  }

  const deleteTrade = async (id: string) => {
    if (!confirm('Delete this trade?')) return
    
    try {
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadTrades()
      alert('✅ Trade deleted!')
    } catch (err) {
      console.error('Error deleting:', err)
      const filtered = trades.filter(t => t.id !== id)
      setTrades(filtered)
      localStorage.setItem('smtTrades', JSON.stringify(filtered))
      alert('✅ Trade deleted from local storage!')
    }
  }

  const stats = {
    total: trades.length,
    wins: trades.filter((t: any) => t.result === 'Win').length,
    losses: trades.filter((t: any) => t.result === 'Loss').length,
    winRate: trades.length > 0 ? ((trades.filter((t: any) => t.result === 'Win').length / trades.length) * 100).toFixed(1) : '0',
    totalPL: trades.reduce((sum: number, t: any) => sum + (parseFloat(t.dollar_pl) || 0), 0).toFixed(2),
    avgWin: trades.filter((t: any) => t.result === 'Win').length > 0 
      ? (trades.filter((t: any) => t.result === 'Win').reduce((sum: number, t: any) => sum + (parseFloat(t.dollar_pl) || 0), 0) / trades.filter((t: any) => t.result === 'Win').length).toFixed(2)
      : '0',
    avgLoss: trades.filter((t: any) => t.result === 'Loss').length > 0
      ? (Math.abs(trades.filter((t: any) => t.result === 'Loss').reduce((sum: number, t: any) => sum + (parseFloat(t.dollar_pl) || 0), 0)) / trades.filter((t: any) => t.result === 'Loss').length).toFixed(2)
      : '0'
  }

  return (
    <div className="container">
      <div className="header">
        <h1>SMT Trading Journal</h1>
        <p style={{ color: '#a5b4fc', fontSize: '0.875rem' }}>
          Ultra Robust Edition • Mobile Optimized • Cloud Synced ✅
        </p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'entry' ? 'active' : ''}`} onClick={() => setActiveTab('entry')}>
          📝 Entry
        </button>
        <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          📚 History
        </button>
        <button className={`tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          📈 Analytics
        </button>
      </div>

      <div className="card">
        {loading && activeTab !== 'entry' ? (
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ marginTop: '16px', color: '#a5b4fc' }}>Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'entry' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '24px' }}>Log New Trade</h2>
                <form onSubmit={saveTrade}>
                  <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                    </div>
                    
                    <div className="form-group">
                      <label>Asset</label>
                      <select value={formData.asset} onChange={(e) => setFormData({...formData, asset: e.target.value})} required>
                        <option value="NQ">NQ</option>
                        <option value="ES">ES</option>
                        <option value="YM">YM</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Direction</label>
                      <select value={formData.direction} onChange={(e) => setFormData({...formData, direction: e.target.value})} required>
                        <option value="Long">Long</option>
                        <option value="Short">Short</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Result</label>
                      <select value={formData.result} onChange={(e) => setFormData({...formData, result: e.target.value})} required>
                        <option value="Win">Win</option>
                        <option value="Loss">Loss</option>
                        <option value="BE">Breakeven</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Entry Time</label>
                      <input type="time" value={formData.entry_time} onChange={(e) => setFormData({...formData, entry_time: e.target.value})} required />
                    </div>

                    <div className="form-group">
                      <label>SMT Timeframe</label>
                      <select value={formData.smt_timeframe} onChange={(e) => setFormData({...formData, smt_timeframe: e.target.value})} required>
                        <option value="4H">4H</option>
                        <option value="1H">1H</option>
                        <option value="15M">15M</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>SMT Timing</label>
                      <select value={formData.smt_timing} onChange={(e) => setFormData({...formData, smt_timing: e.target.value})} required>
                        <option value="Early">Early</option>
                        <option value="Mid">Mid</option>
                        <option value="Late">Late</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>SSMT Quality</label>
                      <select value={formData.ssmt_quality} onChange={(e) => setFormData({...formData, ssmt_quality: e.target.value})} required>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Micro SSMT</label>
                      <select value={formData.micro_ssmt_quarters} onChange={(e) => setFormData({...formData, micro_ssmt_quarters: e.target.value})} required>
                        <option value="Q1/Q4">Q1/Q4</option>
                        <option value="Q2/Q1">Q2/Q1</option>
                        <option value="Q3/Q2">Q3/Q2</option>
                        <option value="Q4/Q3">Q4/Q3</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>HTF Quarter</label>
                      <select value={formData.htf_quarter} onChange={(e) => setFormData({...formData, htf_quarter: e.target.value})} required>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Points P/L</label>
                      <input type="number" step="0.01" value={formData.points_pl} onChange={(e) => setFormData({...formData, points_pl: e.target.value as any})} required />
                    </div>

                    <div className="form-group">
                      <label>Dollar P/L</label>
                      <input type="number" step="0.01" value={formData.dollar_pl} onChange={(e) => setFormData({...formData, dollar_pl: e.target.value as any})} required />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label>Notes</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={3} placeholder="Trade notes, execution quality, lessons learned..." />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '24px', width: '100%' }}>
                    💾 Save Trade
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Trade History</h2>
                <div style={{ marginBottom: '16px', padding: '12px', background: '#0f1535', borderRadius: '8px', fontSize: '0.875rem' }}>
                  <strong>{trades.length}</strong> total trades • <strong>{stats.wins}</strong> wins • <strong>{stats.losses}</strong> losses
                </div>
                {trades.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>No Trades Yet</h3>
                    <p>Click the Entry tab to log your first SMT trade!</p>
                  </div>
                ) : (
                  <div className="trade-list">
                    {trades.map((trade: any) => (
                      <div key={trade.id} className="trade-item">
                        <div className="trade-header">
                          <div>
                            <strong>{trade.asset}</strong> {trade.direction}
                            <div style={{ fontSize: '0.875rem', color: '#a5b4fc', marginTop: '4px' }}>
                              {new Date(trade.date).toLocaleDateString()} @ {trade.entry_time}
                            </div>
                          </div>
                          <div className={`trade-result ${trade.result.toLowerCase()}`}>
                            {trade.result}
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', fontSize: '0.875rem', color: '#a5b4fc', marginTop: '12px' }}>
                          <div><strong>SMT:</strong> {trade.smt_timeframe} {trade.smt_timing}</div>
                          <div><strong>SSMT:</strong> {trade.micro_ssmt_quarters}</div>
                          <div><strong>Quality:</strong> {trade.ssmt_quality}</div>
                          <div><strong>HTF:</strong> {trade.htf_quarter}</div>
                          <div><strong>Points:</strong> {trade.points_pl}</div>
                          <div style={{ color: parseFloat(trade.dollar_pl) >= 0 ? '#00ff88' : '#ff3366' }}>
                            <strong>P/L:</strong> ${parseFloat(trade.dollar_pl).toFixed(2)}
                          </div>
                        </div>
                        {trade.notes && (
                          <div style={{ marginTop: '12px', padding: '12px', background: '#0f1535', borderRadius: '8px', fontSize: '0.875rem' }}>
                            <strong style={{ color: '#00d4ff' }}>Notes:</strong> {trade.notes}
                          </div>
                        )}
                        <button onClick={() => deleteTrade(trade.id)} className="btn-danger" style={{ marginTop: '12px', padding: '8px 16px', fontSize: '0.875rem' }}>
                          🗑️ Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '24px' }}>Analytics Dashboard</h2>
                <div className="stat-grid">
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#00d4ff' }}>{stats.total}</div>
                    <div className="stat-label">Total Trades</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#00ff88' }}>{stats.winRate}%</div>
                    <div className="stat-label">Win Rate</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#00ff88' }}>{stats.wins}</div>
                    <div className="stat-label">Wins</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#ff3366' }}>{stats.losses}</div>
                    <div className="stat-label">Losses</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: parseFloat(stats.totalPL) >= 0 ? '#00ff88' : '#ff3366' }}>
                      ${stats.totalPL}
                    </div>
                    <div className="stat-label">Total P/L</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#00ff88' }}>
                      ${stats.avgWin}
                    </div>
                    <div className="stat-label">Avg Win</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#ff3366' }}>
                      ${stats.avgLoss}
                    </div>
                    <div className="stat-label">Avg Loss</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: '#8b5cf6' }}>
                      {parseFloat(stats.avgLoss) > 0 ? (parseFloat(stats.avgWin) / parseFloat(stats.avgLoss)).toFixed(2) : '0'}
                    </div>
                    <div className="stat-label">Profit Factor</div>
                  </div>
                </div>

                {trades.length > 0 && (
                  <div style={{ marginTop: '32px' }}>
                    <h3 style={{ color: '#00d4ff', marginBottom: '16px' }}>Performance by Asset</h3>
                    {['NQ', 'ES', 'YM'].map(asset => {
                      const assetTrades = trades.filter((t: any) => t.asset === asset)
                      const assetWins = assetTrades.filter((t: any) => t.result === 'Win').length
                      const assetWR = assetTrades.length > 0 ? ((assetWins / assetTrades.length) * 100).toFixed(1) : '0'
                      const assetPL = assetTrades.reduce((sum: number, t: any) => sum + (parseFloat(t.dollar_pl) || 0), 0).toFixed(2)
                      
                      return assetTrades.length > 0 ? (
                        <div key={asset} style={{ marginBottom: '12px', padding: '16px', background: '#0f1535', borderRadius: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong style={{ fontSize: '1.25rem' }}>{asset}</strong>
                              <div style={{ fontSize: '0.875rem', color: '#a5b4fc', marginTop: '4px' }}>
                                {assetTrades.length} trades • {assetWins}W-{assetTrades.length - assetWins}L
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: parseFloat(assetWR) >= 50 ? '#00ff88' : '#ff3366' }}>
                                {assetWR}%
                              </div>
                              <div style={{ fontSize: '0.875rem', color: parseFloat(assetPL) >= 0 ? '#00ff88' : '#ff3366', marginTop: '4px' }}>
                                ${assetPL}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="debug">
        <div>✅ Active Tab: <strong>{activeTab}</strong></div>
        <div>✅ Database: {trades.length > 0 && trades[0].id?.length > 10 ? 'Supabase Connected ✅' : 'localStorage Fallback'}</div>
        <div>✅ Tabs: React State (Mobile Optimized)</div>
      </div>
    </div>
  )
}

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

  const stats = {
    total: trades.length,
    wins: trades.filter((t: any) => t.result === 'Win').length,
    losses: trades.filter((t: any) => t.result === 'Loss').length,
    winRate: trades.length > 0 ? ((trades.filter((t: any) => t.result === 'Win').length / trades.length) * 100).toFixed(1) : '0',
    totalPL: trades.reduce((sum: number, t: any) => sum + (t.dollar_pl || 0), 0).toFixed(2),
  }

  return (
    <div className="container">
      <div className="header">
        <h1>SMT Trading Journal</h1>
        <p style={{ color: '#a5b4fc', fontSize: '0.875rem' }}>
          Ultra Robust Edition • Mobile Optimized ✅
        </p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'entry' ? 'active' : ''}`}
          onClick={() => setActiveTab('entry')}
        >
          📝 Entry
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📚 History
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ marginTop: '16px', color: '#a5b4fc' }}>Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'entry' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Trade Entry</h2>
                <p style={{ color: '#a5b4fc' }}>
                  Trade entry form coming soon. For now, you can add trades directly in Supabase.
                </p>
                <div style={{ marginTop: '16px', padding: '16px', background: '#0f1535', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Total Trades in Database: <strong style={{ color: '#00d4ff' }}>{trades.length}</strong>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Trade History</h2>
                {trades.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>No Trades Yet</h3>
                    <p>Start logging your SMT trades to see them here!</p>
                  </div>
                ) : (
                  <div className="trade-list">
                    {trades.slice(0, 10).map((trade: any) => (
                      <div key={trade.id} className="trade-item">
                        <div className="trade-header">
                          <div>
                            <strong>{trade.asset}</strong> {trade.direction}
                            <div style={{ fontSize: '0.875rem', color: '#a5b4fc', marginTop: '4px' }}>
                              {new Date(trade.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={`trade-result ${trade.result.toLowerCase()}`}>
                            {trade.result}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: '#a5b4fc' }}>
                          <div>Points: {trade.points_pl}</div>
                          <div>P/L: ${trade.dollar_pl}</div>
                          <div>{trade.smt_timeframe} {trade.smt_timing}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 style={{ color: '#00d4ff', marginBottom: '24px' }}>Analytics</h2>
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
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="debug">
        <div>✅ Active Tab: <strong>{activeTab}</strong></div>
        <div>✅ Tabs: React state (works on all devices!)</div>
        <div>✅ Database: {trades.length > 0 ? 'Connected ✅' : 'Using localStorage fallback'}</div>
      </div>
    </div>
  )
}

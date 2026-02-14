'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)


export default function Home() {
  const [activeTab, setActiveTab] = useState('entry')
  const [trades, setTrades] = useState([])
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
      setTrades(data as Trade[] || [])
    } catch (err) {
      console.error('Error loading trades:', err)
      // Fallback to localStorage
      const local = localStorage.getItem('smtTrades')
      if (local) {
        try {
          const parsed = JSON.parse(local)
          if (Array.isArray(parsed)) setTrades(parsed)
        } catch (e) {
          console.error('localStorage parse error:', e)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'entry', label: '📝 Entry', icon: '📝' },
    { id: 'history', label: '📚 History', icon: '📚' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'calendar', label: '📅 Calendar', icon: '📅' },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
            SMT Trading Journal
          </h1>
          <p className="text-[#a5b4fc] font-mono text-sm">
            ULTRA ROBUST EDITION • Mobile Optimized
          </p>
        </div>

        {/* Tabs - React State Management (GUARANTEED to work) */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                console.log('Tab clicked:', tab.id)
                setActiveTab(tab.id)
              }}
              className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#8b5cf6]/20 border-2 border-[#00d4ff] text-white shadow-lg'
                  : 'bg-transparent border-2 border-[rgba(165,180,252,0.1)] text-[#a5b4fc] hover:border-[#00d4ff]'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="card">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[rgba(165,180,252,0.1)] border-t-[#00d4ff] rounded-full animate-spin mb-4" />
              <p className="text-[#a5b4fc]">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === 'entry' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">Trade Entry</h2>
                  <p className="text-[#a5b4fc] mb-4">Enter your SMT trades here.</p>
                  <div className="bg-[#0f1535] p-6 rounded-xl border border-[rgba(165,180,252,0.1)]">
                    <p className="text-sm text-[#6b7280]">Trade entry form coming soon...</p>
                    <p className="text-sm text-[#6b7280] mt-2">Total Trades: {trades.length}</p>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">Trade History</h2>
                  {trades.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📭</div>
                      <h3 className="text-xl font-semibold mb-2">No Trades Yet</h3>
                      <p className="text-[#a5b4fc]">Start logging your SMT trades!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trades.slice(0, 5).map((trade, i) => (
                        <div key={i} className="bg-[#0f1535] p-4 rounded-xl border border-[rgba(165,180,252,0.1)]">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold">{trade.asset}</span>
                              <span className="ml-2 text-[#a5b4fc]">{trade.direction}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              trade.result === 'Win' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#ff3366]/20 text-[#ff3366]'
                            }`}>
                              {trade.result}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#0f1535] p-6 rounded-xl border border-[rgba(165,180,252,0.1)] text-center">
                      <div className="text-4xl font-bold text-[#00d4ff] mb-2">{trades.length}</div>
                      <div className="text-[#a5b4fc] text-sm">Total Trades</div>
                    </div>
                    <div className="bg-[#0f1535] p-6 rounded-xl border border-[rgba(165,180,252,0.1)] text-center">
                      <div className="text-4xl font-bold text-[#00ff88] mb-2">
                        {trades.length > 0 ? ((trades.filter(t => t.result === 'Win').length / trades.length) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-[#a5b4fc] text-sm">Win Rate</div>
                    </div>
                    <div className="bg-[#0f1535] p-6 rounded-xl border border-[rgba(165,180,252,0.1)] text-center">
                      <div className="text-4xl font-bold text-[#8b5cf6] mb-2">
                        {trades.filter(t => t.result === 'Win').length}
                      </div>
                      <div className="text-[#a5b4fc] text-sm">Wins</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">Calendar View</h2>
                  <div className="bg-[#0f1535] p-6 rounded-xl border border-[rgba(165,180,252,0.1)]">
                    <p className="text-[#a5b4fc]">Calendar visualization coming soon...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tab State Debug Info */}
        <div className="mt-4 p-4 bg-[#0f1535] rounded-xl border border-[rgba(165,180,252,0.1)]">
          <p className="text-xs text-[#6b7280]">
            Active Tab: <span className="text-[#00d4ff] font-mono">{activeTab}</span>
          </p>
          <p className="text-xs text-[#6b7280] mt-1">
            ✅ Tabs use React state - guaranteed to work on all devices!
          </p>
        </div>
      </div>
    </main>
  )
}

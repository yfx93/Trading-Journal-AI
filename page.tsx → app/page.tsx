'use client'

import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('entry')

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
          SMT Trading Journal
        </h1>
        <p style={{ color: '#a5b4fc', fontSize: '0.875rem' }}>
          ✅ Deployed Successfully!
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('entry')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'entry' ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2))' : 'transparent',
            border: '2px solid',
            borderColor: activeTab === 'entry' ? '#00d4ff' : 'rgba(165, 180, 252, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📝 Entry
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'history' ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2))' : 'transparent',
            border: '2px solid',
            borderColor: activeTab === 'history' ? '#00d4ff' : 'rgba(165, 180, 252, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📚 History
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'analytics' ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2))' : 'transparent',
            border: '2px solid',
            borderColor: activeTab === 'analytics' ? '#00d4ff' : 'rgba(165, 180, 252, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📈 Analytics
        </button>
      </div>

      <div style={{ background: '#1a2351', padding: '24px', borderRadius: '16px', border: '1px solid rgba(165, 180, 252, 0.1)' }}>
        {activeTab === 'entry' && (
          <div>
            <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Trade Entry</h2>
            <p style={{ color: '#a5b4fc' }}>Your trading journal is live! ✅</p>
            <p style={{ color: '#a5b4fc', marginTop: '8px' }}>Tabs are working on mobile!</p>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Trade History</h2>
            <p style={{ color: '#a5b4fc' }}>No trades yet. Start logging!</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ color: '#00d4ff', marginBottom: '16px' }}>Analytics</h2>
            <p style={{ color: '#a5b4fc' }}>Stats will appear here as you log trades.</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#0f1535', borderRadius: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
        <div>✅ Active Tab: <strong style={{ color: '#00d4ff' }}>{activeTab}</strong></div>
        <div>✅ Tabs work on all devices!</div>
      </div>
    </div>
  )
}

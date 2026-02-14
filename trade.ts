export interface Trade {
  id: string
  user_id: string
  date: string
  asset: 'NQ' | 'ES' | 'YM'
  direction: 'Long' | 'Short'
  result: 'Win' | 'Loss' | 'BE'
  
  // P&L
  points_pl: number
  dollar_pl: number
  
  // SMT Details
  entry_time: string
  smt_timeframe: '4H' | '1H' | '15M'
  smt_timing: 'Early' | 'Mid' | 'Late'
  smt_pattern: string[]
  
  // SSMT
  micro_ssmt_quarters: string
  htf_quarter: string
  ssmt_quality: 'High' | 'Medium' | 'Low'
  
  // Sweep
  sweep_assets: string[]
  sweep_direction: 'Bullish' | 'Bearish' | 'Both'
  
  // News
  news_present: boolean
  news_importance?: 'High' | 'Medium' | 'Low'
  news_event?: string
  
  // Charts
  htf_chart_img?: string
  exec_chart_img?: string
  
  // Notes
  trade_notes?: string
  
  // Metadata
  created_at: string
  updated_at: string
}

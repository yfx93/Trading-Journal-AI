-- SMT Trading Journal Database Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  asset TEXT NOT NULL CHECK (asset IN ('NQ', 'ES', 'YM')),
  direction TEXT NOT NULL CHECK (direction IN ('Long', 'Short')),
  result TEXT NOT NULL CHECK (result IN ('Win', 'Loss', 'BE')),
  
  -- P&L
  points_pl DECIMAL(10, 2) DEFAULT 0,
  dollar_pl DECIMAL(10, 2) DEFAULT 0,
  
  -- SMT Details
  entry_time TIME,
  smt_timeframe TEXT CHECK (smt_timeframe IN ('4H', '1H', '15M')),
  smt_timing TEXT CHECK (smt_timing IN ('Early', 'Mid', 'Late')),
  smt_pattern TEXT[],
  
  -- SSMT
  micro_ssmt_quarters TEXT,
  htf_quarter TEXT,
  ssmt_quality TEXT CHECK (ssmt_quality IN ('High', 'Medium', 'Low')),
  
  -- Sweep
  sweep_assets TEXT[],
  sweep_direction TEXT CHECK (sweep_direction IN ('Bullish', 'Bearish', 'Both')),
  
  -- News
  news_present BOOLEAN DEFAULT false,
  news_importance TEXT CHECK (news_importance IN ('High', 'Medium', 'Low')),
  news_event TEXT,
  
  -- Charts (URLs)
  htf_chart_img TEXT,
  exec_chart_img TEXT,
  
  -- Notes
  trade_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_date ON trades(date DESC);
CREATE INDEX idx_trades_asset ON trades(asset);
CREATE INDEX idx_trades_result ON trades(result);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trades_updated_at
BEFORE UPDATE ON trades
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Allow all access (you can restrict later)
CREATE POLICY "Allow all access" ON trades
FOR ALL USING (true) WITH CHECK (true);

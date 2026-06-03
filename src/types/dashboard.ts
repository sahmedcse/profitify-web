/**
 * Dashboard view types and backend response shapes.
 *
 * The view types (Stock, Signal, Indicator, Fundamental, Level, PerfPoint)
 * are the shape the UI components consume. The Api* types mirror the Go
 * backend's JSON responses and are transformed into view types inside
 * `src/lib/dashboard-api.ts`.
 */

/* ─── View types (component-facing) ──────────────────────────────── */

export type Signal = 'Strong Buy' | 'Bullish' | 'Neutral' | 'Bearish' | 'Strong Sell';

export type Stock = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  pct: number;
  signal: Signal;
  strength: number;
};

export type Indicator = {
  name: string;
  value: string;
  status: 'bullish' | 'neutral' | 'bearish';
  detail: string;
};

export type Fundamental = { label: string; value: string };

export type Level = {
  type: 'support' | 'resistance';
  label: string;
  price: number;
  strength: 'weak' | 'moderate' | 'strong';
};

export type PerfPoint = { week: string } & Record<string, number | string>;

export type Timeframe = '1M' | '3M' | '6M' | '1Y' | 'ALL';
export type ComparePeriod = '3M' | '6M' | '1Y';

/* ─── Backend response types ─────────────────────────────────────── */

export interface ApiTicker {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  latest_price: number;
  price_change: number;
  price_change_pct: number;
  signal_label: string;
  signal_strength: number;
}

export interface ApiListResponse {
  tickers: ApiTicker[];
}

/**
 * Shape of `GET /v1/tickers/{symbol}`. Identity fields are always present;
 * the stats fields (price_change etc.) are optional because the backend
 * returns the identity row even if no stats have been materialized yet.
 * `latest_price` is not returned by this endpoint today — callers merge
 * it from the list row when possible.
 */
export interface ApiTickerDetail {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price_change?: number;
  price_change_pct?: number;
  signal_label?: string;
  signal_strength?: number;
}

export interface ApiPriceBar {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ApiPricesResponse {
  symbol: string;
  timeframe: string;
  bars: ApiPriceBar[];
}

export interface ApiIndicatorRow {
  name: string;
  value: number;
  status: 'bullish' | 'neutral' | 'bearish';
  detail: string;
}

export interface ApiTechnicalsResponse {
  symbol: string;
  indicators: ApiIndicatorRow[];
  buy_count: number;
  neutral_count: number;
  sell_count: number;
}

export interface ApiTechnicalsHistoryPoint {
  time: string;
  macd_line: number | null;
  macd_signal: number | null;
  macd_histogram: number | null;
}

export interface ApiTechnicalsHistoryResponse {
  symbol: string;
  timeframe: Timeframe;
  series: ApiTechnicalsHistoryPoint[];
}

export interface ApiFundamentalsResponse {
  symbol: string;
  market_cap: number;
  dividend_yield: number | null;
  high_52w: number | null;
  low_52w: number | null;
  avg_volume_30d: number | null;
}

export interface ApiPivotLevel {
  price: number;
  strength: string;
}

export interface ApiLevelsResponse {
  symbol: string;
  levels: {
    R3: ApiPivotLevel;
    R2: ApiPivotLevel;
    R1: ApiPivotLevel;
    S1: ApiPivotLevel;
    S2: ApiPivotLevel;
    S3: ApiPivotLevel;
  };
}

export interface ApiComparePoint {
  time: string;
  a_pct: number;
  b_pct: number;
}

export interface ApiCompareResponse {
  a: string;
  b: string;
  period: string;
  series: ApiComparePoint[];
  summary_a_pct: number;
  summary_b_pct: number;
}

/* ─── Chart data shapes (component-facing) ───────────────────────── */

export type PricePoint = { t: number; price: number };
export type VolumePoint = { t: number; vol: number; up: boolean };
export type MacdPoint = { t: number; macd: number; signal: number };

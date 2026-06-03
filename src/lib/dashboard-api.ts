/**
 * Dashboard API layer.
 *
 * Thin fetch functions built on top of `apiClient.get<T>()` that hit the
 * Go backend's `/v1` endpoints and transform each response into the view
 * types consumed by the dashboard components. Keeping the transforms
 * here means every component stays dumb and the UI never sees snake_case
 * or raw numeric values.
 */

import { apiClient } from './api-client';
import type {
  ApiCompareResponse,
  ApiFundamentalsResponse,
  ApiLevelsResponse,
  ApiListResponse,
  ApiPivotLevel,
  ApiPricesResponse,
  ApiTechnicalsHistoryResponse,
  ApiTechnicalsResponse,
  ApiTicker,
  ApiTickerDetail,
  ComparePeriod,
  Fundamental,
  Indicator,
  Level,
  MacdPoint,
  PerfPoint,
  PricePoint,
  Signal,
  Stock,
  Timeframe,
  VolumePoint,
} from '@/types/dashboard';

/* ─── Mappers ────────────────────────────────────────────────────── */

const VALID_SIGNALS: readonly Signal[] = [
  'Strong Buy',
  'Bullish',
  'Neutral',
  'Bearish',
  'Strong Sell',
];

function toSignal(label: string | undefined): Signal {
  if (!label) return 'Neutral';
  return VALID_SIGNALS.includes(label as Signal) ? (label as Signal) : 'Neutral';
}

function apiTickerToStock(t: ApiTicker): Stock {
  return {
    symbol: t.symbol,
    name: t.name,
    sector: t.sector,
    price: t.latest_price,
    change: t.price_change,
    pct: t.price_change_pct,
    signal: toSignal(t.signal_label),
    strength: t.signal_strength,
  };
}

/* ─── Indicator name pretty-print ────────────────────────────────── */

const INDICATOR_LABELS: Record<string, string> = {
  rsi_14: 'RSI (14)',
  macd: 'MACD',
  sma_20: 'SMA 20',
  sma_50: 'SMA 50',
  ema_12: 'EMA 12',
  bollinger: 'Bollinger Bands',
};

function prettyIndicatorName(key: string): string {
  return INDICATOR_LABELS[key] ?? key;
}

function formatIndicatorValue(value: number): string {
  return value.toFixed(2);
}

/* ─── Fundamental formatters ─────────────────────────────────────── */

function formatMarketCap(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${n.toFixed(0)}`;
}

function formatVolume(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

function formatCurrency(n: number): string {
  return `$${n.toFixed(2)}`;
}

function formatPercent(n: number): string {
  return `${n.toFixed(2)}%`;
}

/* ─── Fetch functions ────────────────────────────────────────────── */

/**
 * Fetch the top-performing tickers for the sidebar. The backend does not
 * yet expose a `sort` query param, so we fetch `limit=100` and do the
 * sort + slice client-side. Sorted by `price_change_pct` descending.
 */
export async function fetchTopTickers(limit: number = 20): Promise<Stock[]> {
  const res = await apiClient.get<ApiListResponse>('/v1/tickers?limit=100');
  const stocks = res.tickers.map(apiTickerToStock);
  return stocks.sort((a, b) => b.pct - a.pct).slice(0, limit);
}

/**
 * Fetch the detail payload for a single ticker. Callers may pass the
 * list row so the returned Stock preserves `price`, `change`, `pct` even
 * if the detail endpoint omits them.
 */
export async function fetchTickerDetail(symbol: string, base?: Stock): Promise<Stock> {
  const res = await apiClient.get<ApiTickerDetail>(`/v1/tickers/${encodeURIComponent(symbol)}`);
  return {
    symbol: res.symbol,
    name: res.name,
    sector: res.sector,
    price: base?.price ?? 0,
    change: res.price_change ?? base?.change ?? 0,
    pct: res.price_change_pct ?? base?.pct ?? 0,
    signal: toSignal(res.signal_label ?? base?.signal),
    strength: res.signal_strength ?? base?.strength ?? 0,
  };
}

export async function fetchPrices(
  symbol: string,
  timeframe: Timeframe = '3M',
): Promise<{ price: PricePoint[]; volume: VolumePoint[] }> {
  const res = await apiClient.get<ApiPricesResponse>(
    `/v1/tickers/${encodeURIComponent(symbol)}/prices?timeframe=${timeframe}`,
  );
  const bars = res.bars ?? [];
  const priceBars = bars.slice(-60);
  const volumeBars = bars.slice(-30);

  const price: PricePoint[] = priceBars.map((b, i) => ({
    t: i,
    price: Number(b.close.toFixed(2)),
  }));

  const volume: VolumePoint[] = volumeBars.map((b, i) => ({
    t: i,
    vol: Number((b.volume / 1_000_000).toFixed(1)),
    up: b.close >= b.open,
  }));

  return { price, volume };
}

export async function fetchTechnicals(symbol: string): Promise<Indicator[]> {
  const res = await apiClient.get<ApiTechnicalsResponse>(
    `/v1/tickers/${encodeURIComponent(symbol)}/technicals`,
  );
  return (res.indicators ?? []).map((row) => ({
    name: prettyIndicatorName(row.name),
    value: formatIndicatorValue(row.value),
    status: row.status,
    detail: row.detail,
  }));
}

export async function fetchTechnicalsHistory(
  symbol: string,
  timeframe: Timeframe = '3M',
): Promise<MacdPoint[]> {
  const res = await apiClient.get<ApiTechnicalsHistoryResponse>(
    `/v1/tickers/${encodeURIComponent(symbol)}/technicals/history?timeframe=${timeframe}`,
  );
  const points = (res.series ?? []).filter(
    (p): p is { time: string; macd_line: number; macd_signal: number; macd_histogram: number } =>
      p.macd_line !== null && p.macd_signal !== null,
  );
  return points.slice(-30).map((p, i) => ({
    t: i,
    macd: Number(p.macd_line.toFixed(3)),
    signal: Number(p.macd_signal.toFixed(3)),
  }));
}

export async function fetchFundamentals(symbol: string): Promise<Fundamental[]> {
  const res = await apiClient.get<ApiFundamentalsResponse>(
    `/v1/tickers/${encodeURIComponent(symbol)}/fundamentals`,
  );
  const out: Fundamental[] = [];
  if (res.market_cap > 0) {
    out.push({ label: 'Market Cap', value: formatMarketCap(res.market_cap) });
  }
  if (res.dividend_yield != null) {
    out.push({ label: 'Dividend Yield', value: formatPercent(res.dividend_yield) });
  }
  if (res.high_52w != null) {
    out.push({ label: '52W High', value: formatCurrency(res.high_52w) });
  }
  if (res.low_52w != null) {
    out.push({ label: '52W Low', value: formatCurrency(res.low_52w) });
  }
  if (res.avg_volume_30d != null) {
    out.push({ label: 'Avg Volume', value: formatVolume(res.avg_volume_30d) });
  }
  return out;
}

const LEVEL_STRENGTHS: readonly Level['strength'][] = ['weak', 'moderate', 'strong'];

function toLevelStrength(s: string): Level['strength'] {
  return LEVEL_STRENGTHS.includes(s as Level['strength']) ? (s as Level['strength']) : 'moderate';
}

export async function fetchLevels(symbol: string): Promise<Level[]> {
  const res = await apiClient.get<ApiLevelsResponse>(
    `/v1/tickers/${encodeURIComponent(symbol)}/levels`,
  );
  const { levels } = res;
  const order: Array<[keyof ApiLevelsResponse['levels'], Level['type']]> = [
    ['R3', 'resistance'],
    ['R2', 'resistance'],
    ['R1', 'resistance'],
    ['S1', 'support'],
    ['S2', 'support'],
    ['S3', 'support'],
  ];
  const out: Level[] = [];
  for (const [key, type] of order) {
    const lvl: ApiPivotLevel | undefined = levels?.[key];
    if (!lvl || !lvl.price) continue;
    out.push({
      type,
      label: key,
      price: lvl.price,
      strength: toLevelStrength(lvl.strength),
    });
  }
  return out;
}

export async function fetchCompare(
  a: string,
  b: string,
  period: ComparePeriod,
): Promise<PerfPoint[]> {
  const res = await apiClient.get<ApiCompareResponse>(
    `/v1/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&period=${period}`,
  );
  return (res.series ?? []).map((pt, i) => ({
    week: `W${i + 1}`,
    [a]: Number(pt.a_pct.toFixed(2)),
    [b]: Number(pt.b_pct.toFixed(2)),
  }));
}

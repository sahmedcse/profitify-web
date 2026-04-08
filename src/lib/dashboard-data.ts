/**
 * Sample dashboard data — deterministic to avoid hydration mismatches in static export.
 *
 * All "random-looking" arrays are generated at module load via a seeded mulberry32 PRNG
 * with a fixed seed, so server build and client hydration produce identical values.
 */

export type Signal = 'Strong Buy' | 'Bullish' | 'Neutral' | 'Bearish';

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

/* ─── Seeded PRNG ─────────────────────────────────────────────────── */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(0xc0ffee);

/* ─── Stocks ──────────────────────────────────────────────────────── */

export const stocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 232.18,
    change: 3.42,
    pct: 1.49,
    signal: 'Strong Buy',
    strength: 87,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 421.65,
    change: 5.12,
    pct: 1.23,
    signal: 'Bullish',
    strength: 78,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Communication',
    price: 178.42,
    change: -1.23,
    pct: -0.69,
    signal: 'Neutral',
    strength: 52,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors',
    price: 138.75,
    change: 4.21,
    pct: 3.13,
    signal: 'Strong Buy',
    strength: 91,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer',
    price: 215.34,
    change: 1.87,
    pct: 0.88,
    signal: 'Bullish',
    strength: 71,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Communication',
    price: 612.49,
    change: -3.45,
    pct: -0.56,
    signal: 'Neutral',
    strength: 48,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    price: 348.91,
    change: -8.12,
    pct: -2.27,
    signal: 'Bearish',
    strength: 32,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financials',
    price: 247.18,
    change: 1.04,
    pct: 0.42,
    signal: 'Bullish',
    strength: 68,
  },
];

/* ─── Performance data (per stock × 52 weeks) ─────────────────────── */

function generatePerf(weeks: number, drift: number): number[] {
  const out: number[] = [];
  let value = 0;
  for (let i = 0; i < weeks; i++) {
    value += drift + (rand() - 0.5) * 4;
    out.push(Number(value.toFixed(2)));
  }
  return out;
}

const perfDrifts: Record<string, number> = {
  AAPL: 0.45,
  MSFT: 0.38,
  GOOGL: 0.12,
  NVDA: 0.78,
  AMZN: 0.31,
  META: 0.18,
  TSLA: -0.25,
  JPM: 0.22,
};

export const perfData: Record<string, number[]> = Object.fromEntries(
  stocks.map((s) => [s.symbol, generatePerf(52, perfDrifts[s.symbol] ?? 0.2)]),
);

export const comparisonData: PerfPoint[] = Array.from({ length: 52 }, (_, i) => {
  const point: PerfPoint = { week: `W${i + 1}` };
  for (const symbol of Object.keys(perfData)) {
    point[symbol] = perfData[symbol][i];
  }
  return point;
});

/* ─── Price / Volume / MACD history ───────────────────────────────── */

function generatePrice(points: number, base: number): { t: number; price: number }[] {
  const out: { t: number; price: number }[] = [];
  let p = base;
  for (let i = 0; i < points; i++) {
    p += (rand() - 0.45) * 1.6;
    out.push({ t: i, price: Number(p.toFixed(2)) });
  }
  return out;
}

export const priceHistory = generatePrice(60, 228);

export const volumeHistory: { t: number; vol: number; up: boolean }[] = Array.from(
  { length: 30 },
  (_, i) => ({
    t: i,
    vol: Number((30 + rand() * 40).toFixed(1)),
    up: rand() > 0.45,
  }),
);

function generateMacd(points: number): { t: number; macd: number; signal: number }[] {
  const out: { t: number; macd: number; signal: number }[] = [];
  let m = 0;
  let s = 0;
  for (let i = 0; i < points; i++) {
    m += (rand() - 0.5) * 0.6;
    s = s * 0.85 + m * 0.15;
    out.push({ t: i, macd: Number(m.toFixed(3)), signal: Number(s.toFixed(3)) });
  }
  return out;
}

export const macdData = generateMacd(30);

/* ─── Technical indicators ────────────────────────────────────────── */

export const indicators: Indicator[] = [
  { name: 'RSI (14)', value: '64.8', status: 'bullish', detail: 'Approaching overbought' },
  { name: 'MACD', value: '+1.42', status: 'bullish', detail: 'Bullish crossover' },
  { name: 'Stochastic', value: '78.2', status: 'bullish', detail: 'Strong momentum' },
  { name: 'Bollinger Bands', value: 'Upper', status: 'bullish', detail: 'Price near upper band' },
  { name: 'ADX', value: '32.5', status: 'bullish', detail: 'Strong trend strength' },
  { name: 'CCI (20)', value: '+118', status: 'neutral', detail: 'Overbought territory' },
  { name: 'Williams %R', value: '-22', status: 'neutral', detail: 'Approaching overbought' },
  { name: 'Ichimoku', value: 'Above', status: 'bearish', detail: 'Weakening cloud support' },
];

/* ─── Key fundamentals ────────────────────────────────────────────── */

export const fundamentals: Fundamental[] = [
  { label: 'Market Cap', value: '$3.51T' },
  { label: 'P/E Ratio', value: '28.4' },
  { label: 'EPS (TTM)', value: '$8.17' },
  { label: 'Dividend Yield', value: '0.42%' },
  { label: '52W High', value: '$237.49' },
  { label: '52W Low', value: '$164.08' },
  { label: 'Avg Volume', value: '48.2M' },
  { label: 'Beta', value: '1.24' },
];

/* ─── Support & resistance levels ─────────────────────────────────── */

export const levels: Level[] = [
  { type: 'resistance', label: 'R3', price: 245.8, strength: 'weak' },
  { type: 'resistance', label: 'R2', price: 240.15, strength: 'moderate' },
  { type: 'resistance', label: 'R1', price: 235.42, strength: 'strong' },
  { type: 'support', label: 'S1', price: 228.6, strength: 'strong' },
  { type: 'support', label: 'S2', price: 222.18, strength: 'moderate' },
  { type: 'support', label: 'S3', price: 215.75, strength: 'weak' },
];

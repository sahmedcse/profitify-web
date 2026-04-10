import { describe, it, expect, vi } from 'vitest';
import { render, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DashboardClient } from '../dashboard-client';
import type {
  Fundamental,
  Indicator,
  Level,
  MacdPoint,
  PerfPoint,
  PricePoint,
  Stock,
  VolumePoint,
} from '@/types/dashboard';

/* ─── Recharts mock (same pattern as before) ──────────────────────── */

vi.mock('recharts', () => {
  const Pass = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
  const Empty = () => null;
  return {
    ResponsiveContainer: Pass,
    AreaChart: Pass,
    Area: Empty,
    BarChart: Pass,
    Bar: Pass,
    Cell: Empty,
    LineChart: Pass,
    Line: Empty,
    XAxis: Empty,
    YAxis: Empty,
    CartesianGrid: Empty,
    Tooltip: Empty,
    ReferenceLine: Empty,
  };
});

/* ─── Fixtures ────────────────────────────────────────────────────── */

const FIXTURE_STOCKS: Stock[] = [
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
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sector: 'Automotive',
    price: 348.91,
    change: -8.12,
    pct: -2.27,
    signal: 'Bearish',
    strength: 32,
  },
];

const FIXTURE_PRICES: PricePoint[] = Array.from({ length: 10 }, (_, i) => ({
  t: i,
  price: 200 + i,
}));

const FIXTURE_VOLUME: VolumePoint[] = Array.from({ length: 10 }, (_, i) => ({
  t: i,
  vol: 40 + i,
  up: i % 2 === 0,
}));

const FIXTURE_MACD: MacdPoint[] = Array.from({ length: 10 }, (_, i) => ({
  t: i,
  macd: i * 0.1,
  signal: i * 0.08,
}));

const FIXTURE_INDICATORS: Indicator[] = [
  { name: 'RSI (14)', value: '64.80', status: 'bullish', detail: 'Approaching overbought' },
  { name: 'MACD', value: '1.42', status: 'bullish', detail: 'above signal' },
];

const FIXTURE_FUNDAMENTALS: Fundamental[] = [
  { label: 'Market Cap', value: '$3.51T' },
  { label: 'Dividend Yield', value: '0.42%' },
];

const FIXTURE_LEVELS: Level[] = [
  { type: 'resistance', label: 'R1', price: 235.42, strength: 'strong' },
  { type: 'support', label: 'S1', price: 228.6, strength: 'strong' },
];

const FIXTURE_COMPARE: PerfPoint[] = [
  { week: 'W1', AAPL: 0, MSFT: 0 },
  { week: 'W2', AAPL: 1.5, MSFT: 0.8 },
];

/* ─── Hook mocks ─────────────────────────────────────────────────── */

vi.mock('@/hooks/use-dashboard', () => {
  const ok = <T,>(data: T) => ({
    data,
    isLoading: false,
    isError: false,
    error: null,
  });
  return {
    useTopTickers: () => ok(FIXTURE_STOCKS),
    useTickerDetail: (symbol: string | undefined) =>
      ok(FIXTURE_STOCKS.find((s) => s.symbol === symbol) ?? FIXTURE_STOCKS[0]),
    usePrices: () => ok({ price: FIXTURE_PRICES, volume: FIXTURE_VOLUME }),
    useTechnicals: () => ok(FIXTURE_INDICATORS),
    useTechnicalsHistory: () => ok(FIXTURE_MACD),
    useFundamentals: () => ok(FIXTURE_FUNDAMENTALS),
    useLevels: () => ok(FIXTURE_LEVELS),
    useCompare: () => ok(FIXTURE_COMPARE),
  };
});

/* ─── Render helper ──────────────────────────────────────────────── */

function renderDashboard() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardClient />
      </TooltipProvider>
    </QueryClientProvider>,
  );
}

/* ─── Tests ──────────────────────────────────────────────────────── */

describe('DashboardClient', () => {
  it('renders the initially selected stock (AAPL)', async () => {
    const { container } = renderDashboard();
    const view = within(container);
    await waitFor(() => {
      expect(view.getAllByText('AAPL').length).toBeGreaterThan(0);
    });
    expect(view.getAllByText('Apple Inc.').length).toBeGreaterThan(0);
  });

  it('renders all major dashboard section titles', async () => {
    const { container } = renderDashboard();
    const view = within(container);
    await waitFor(() => {
      expect(view.getByText('Price Action')).toBeInTheDocument();
    });
    expect(view.getByText('Volume')).toBeInTheDocument();
    // "MACD" appears both as the chart title and as an indicator row.
    expect(view.getAllByText('MACD').length).toBeGreaterThan(0);
    expect(view.getByText('Stock vs Stock')).toBeInTheDocument();
    expect(view.getByText('Technical Indicators')).toBeInTheDocument();
    expect(view.getByText('Key Data')).toBeInTheDocument();
    expect(view.getByText('Support & Resistance')).toBeInTheDocument();
  });

  it('renders indicator and fundamental rows flowing from the hooks', async () => {
    const { container } = renderDashboard();
    const view = within(container);
    // Value comes from the fixture through useTechnicals → IndicatorsTable.
    await waitFor(() => {
      expect(view.getByText('RSI (14)')).toBeInTheDocument();
    });
    // Label comes from the fixture through useFundamentals → KeyDataCard.
    expect(view.getByText('Market Cap')).toBeInTheDocument();
    expect(view.getByText('$3.51T')).toBeInTheDocument();
  });

  it('renders the top tickers in the sidebar', async () => {
    const { container } = renderDashboard();
    const view = within(container);
    await waitFor(() => {
      expect(view.getAllByText('MSFT').length).toBeGreaterThan(0);
    });
    expect(view.getAllByText('NVDA').length).toBeGreaterThan(0);
    expect(view.getAllByText('TSLA').length).toBeGreaterThan(0);
  });
});

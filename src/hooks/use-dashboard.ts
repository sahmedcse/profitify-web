/**
 * TanStack Query hooks for the stock analysis dashboard.
 *
 * Each hook owns a stable `queryKey` prefix and delegates to the fetch
 * functions in `src/lib/dashboard-api.ts`. Per-section loading/error
 * UX is handled at the component level — hooks just surface the raw
 * query state.
 */

import { useQuery } from '@tanstack/react-query';
import {
  fetchCompare,
  fetchFundamentals,
  fetchLevels,
  fetchPrices,
  fetchTechnicals,
  fetchTechnicalsHistory,
  fetchTickerDetail,
  fetchTopTickers,
} from '@/lib/dashboard-api';
import type { ComparePeriod, Stock, Timeframe } from '@/types/dashboard';

export const dashboardKeys = {
  topTickers: (limit: number) => ['dashboard', 'top-tickers', limit] as const,
  tickerDetail: (symbol: string) => ['dashboard', 'ticker', symbol] as const,
  prices: (symbol: string, timeframe: Timeframe) =>
    ['dashboard', 'prices', symbol, timeframe] as const,
  technicals: (symbol: string) => ['dashboard', 'technicals', symbol] as const,
  technicalsHistory: (symbol: string, timeframe: Timeframe) =>
    ['dashboard', 'technicals-history', symbol, timeframe] as const,
  fundamentals: (symbol: string) => ['dashboard', 'fundamentals', symbol] as const,
  levels: (symbol: string) => ['dashboard', 'levels', symbol] as const,
  compare: (a: string, b: string, period: ComparePeriod) =>
    ['dashboard', 'compare', a, b, period] as const,
};

export function useTopTickers(limit: number = 20) {
  return useQuery({
    queryKey: dashboardKeys.topTickers(limit),
    queryFn: () => fetchTopTickers(limit),
  });
}

export function useTickerDetail(symbol: string | undefined, base?: Stock) {
  return useQuery({
    queryKey: dashboardKeys.tickerDetail(symbol ?? ''),
    queryFn: () => fetchTickerDetail(symbol as string, base),
    enabled: Boolean(symbol),
  });
}

export function usePrices(symbol: string | undefined, timeframe: Timeframe = '3M') {
  return useQuery({
    queryKey: dashboardKeys.prices(symbol ?? '', timeframe),
    queryFn: () => fetchPrices(symbol as string, timeframe),
    enabled: Boolean(symbol),
  });
}

export function useTechnicals(symbol: string | undefined) {
  return useQuery({
    queryKey: dashboardKeys.technicals(symbol ?? ''),
    queryFn: () => fetchTechnicals(symbol as string),
    enabled: Boolean(symbol),
  });
}

export function useTechnicalsHistory(symbol: string | undefined, timeframe: Timeframe = '3M') {
  return useQuery({
    queryKey: dashboardKeys.technicalsHistory(symbol ?? '', timeframe),
    queryFn: () => fetchTechnicalsHistory(symbol as string, timeframe),
    enabled: Boolean(symbol),
  });
}

export function useFundamentals(symbol: string | undefined) {
  return useQuery({
    queryKey: dashboardKeys.fundamentals(symbol ?? ''),
    queryFn: () => fetchFundamentals(symbol as string),
    enabled: Boolean(symbol),
  });
}

export function useLevels(symbol: string | undefined) {
  return useQuery({
    queryKey: dashboardKeys.levels(symbol ?? ''),
    queryFn: () => fetchLevels(symbol as string),
    enabled: Boolean(symbol),
  });
}

export function useCompare(a: string | undefined, b: string | undefined, period: ComparePeriod) {
  return useQuery({
    queryKey: dashboardKeys.compare(a ?? '', b ?? '', period),
    queryFn: () => fetchCompare(a as string, b as string, period),
    enabled: Boolean(a && b),
  });
}

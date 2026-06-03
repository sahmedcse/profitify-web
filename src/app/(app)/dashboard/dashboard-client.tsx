'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { StockPickerSidebar } from '@/components/dashboard/stock-picker-sidebar';
import { StockHeader } from '@/components/dashboard/stock-header';
import { PriceChart } from '@/components/dashboard/price-chart';
import { VolumeChart } from '@/components/dashboard/volume-chart';
import { MacdChart } from '@/components/dashboard/macd-chart';
import { StockVsStock } from '@/components/dashboard/stock-vs-stock';
import { IndicatorsTable } from '@/components/dashboard/indicators-table';
import { KeyDataCard } from '@/components/dashboard/key-data-card';
import { SupportResistanceCard } from '@/components/dashboard/support-resistance-card';
import {
  useFundamentals,
  useLevels,
  usePrices,
  useTechnicals,
  useTechnicalsHistory,
  useTickerDetail,
  useTopTickers,
} from '@/hooks/use-dashboard';

export function DashboardClient() {
  const tickers = useTopTickers();
  const stocks = useMemo(() => tickers.data ?? [], [tickers.data]);
  const [pickedSymbol, setPickedSymbol] = useState<string | undefined>(undefined);

  // Default the selection to the first ticker until the user picks one.
  // Derived during render to avoid `react-hooks/set-state-in-effect`.
  const selectedSymbol = pickedSymbol ?? stocks[0]?.symbol;

  const listRow = useMemo(
    () => stocks.find((s) => s.symbol === selectedSymbol),
    [stocks, selectedSymbol],
  );

  const detail = useTickerDetail(selectedSymbol, listRow);
  const prices = usePrices(selectedSymbol, '3M');
  const technicals = useTechnicals(selectedSymbol);
  const technicalsHistory = useTechnicalsHistory(selectedSymbol, '3M');
  const fundamentals = useFundamentals(selectedSymbol);
  const levels = useLevels(selectedSymbol);

  // Prefer the detail response for the header so sector/signal/strength
  // stay in sync with the backend, but fall back to the list row so the
  // price/pct values remain populated even if the detail query is still
  // loading.
  const selectedStock = detail.data ?? listRow;
  const up = (selectedStock?.change ?? 0) >= 0;

  return (
    <div className="grid flex-1 lg:grid-cols-[250px_1fr]">
      <StockPickerSidebar
        stocks={stocks}
        selectedSymbol={selectedSymbol}
        onSelect={setPickedSymbol}
        isLoading={tickers.isLoading}
      />
      <main className="space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
        {tickers.isError && (
          <ErrorBanner message="Failed to load tickers from the Profitify API." />
        )}
        <StockHeader stock={selectedStock} />
        <PriceChart data={prices.data?.price} up={up} />
        <div className="grid gap-5 md:grid-cols-2">
          <VolumeChart data={prices.data?.volume} />
          <MacdChart data={technicalsHistory.data} />
        </div>
        <StockVsStock stocks={stocks} />
        <div className="grid gap-5 md:grid-cols-[1fr_280px]">
          <IndicatorsTable indicators={technicals.data} />
          <div className="flex flex-col gap-5">
            <KeyDataCard fundamentals={fundamentals.data} />
            <SupportResistanceCard levels={levels.data} currentPrice={selectedStock?.price} />
            <DisclaimerCard />
          </div>
        </div>
      </main>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <Card className="rounded-[10px] border-0 py-3" style={{ boxShadow: 'var(--card-shadow)' }}>
      <CardContent className="flex items-start gap-2 px-3.5">
        <AlertTriangle size={14} className="text-loss mt-0.5 shrink-0" />
        <p className="text-foreground text-[12px] leading-relaxed">{message}</p>
      </CardContent>
    </Card>
  );
}

function DisclaimerCard() {
  return (
    <Card className="rounded-[10px] border-0 py-3" style={{ boxShadow: 'var(--card-shadow)' }}>
      <CardContent className="flex items-start gap-2 px-3.5">
        <AlertTriangle size={13} className="text-gold mt-0.5 shrink-0" />
        <p className="text-muted-foreground text-[10px] leading-relaxed">
          Profitify provides data-driven readings based on technical analysis. This is not financial
          advice. Always do your own research.
        </p>
      </CardContent>
    </Card>
  );
}

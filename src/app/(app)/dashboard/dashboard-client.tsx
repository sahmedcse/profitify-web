'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  fundamentals,
  indicators,
  levels,
  macdData,
  priceHistory,
  stocks,
  volumeHistory,
} from '@/lib/dashboard-data';
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

export function DashboardClient() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const stock = stocks[selectedIndex];
  const up = stock.change >= 0;

  return (
    <div className="grid flex-1 lg:grid-cols-[250px_1fr]">
      <StockPickerSidebar
        stocks={stocks}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
      <main className="space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
        <StockHeader stock={stock} />
        <PriceChart data={priceHistory} up={up} />
        <div className="grid gap-5 md:grid-cols-2">
          <VolumeChart data={volumeHistory} />
          <MacdChart data={macdData} />
        </div>
        <StockVsStock />
        <div className="grid gap-5 md:grid-cols-[1fr_280px]">
          <IndicatorsTable indicators={indicators} />
          <div className="flex flex-col gap-5">
            <KeyDataCard fundamentals={fundamentals} />
            <SupportResistanceCard levels={levels} currentPrice={stock.price} />
            <DisclaimerCard />
          </div>
        </div>
      </main>
    </div>
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

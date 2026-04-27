'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* ═══ Data ═══ */

const stocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$198.45',
    change: '+1.19%',
    up: true,
    signal: 'Bullish',
    signalStrength: 78,
    spark: [0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 0.75],
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$924.67',
    change: '+2.04%',
    up: true,
    signal: 'Strong Buy',
    signalStrength: 92,
    spark: [0.3, 0.5, 0.6, 0.7, 0.8, 0.85, 0.95],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '$248.90',
    change: '-2.23%',
    up: false,
    signal: 'Neutral',
    signalStrength: 48,
    spark: [0.9, 0.85, 0.7, 0.5, 0.6, 0.4, 0.35],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    price: '$452.12',
    change: '-0.71%',
    up: false,
    signal: 'Bullish',
    signalStrength: 65,
    spark: [0.7, 0.75, 0.65, 0.7, 0.6, 0.55, 0.58],
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com',
    price: '$186.34',
    change: '+1.02%',
    up: true,
    signal: 'Bullish',
    signalStrength: 72,
    spark: [0.5, 0.55, 0.6, 0.65, 0.7, 0.72, 0.75],
  },
];

/* ═══ Helpers ═══ */

function signalColor(signal: string): string {
  if (signal === 'Neutral') return 'var(--muted-foreground)';
  if (signal.includes('Buy')) return 'var(--accent-green)';
  return 'var(--primary)';
}

function signalBgColor(signal: string): string {
  if (signal.includes('Buy') || signal.includes('Bullish')) return 'var(--profit-soft)';
  if (signal === 'Neutral') return 'rgba(156,163,175,0.1)';
  return 'var(--loss-soft)';
}

function strengthBarColor(signal: string): string {
  if (signal === 'Neutral') return 'var(--muted-foreground)';
  if (signal.includes('Buy') || signal.includes('Bullish')) return 'var(--accent-green)';
  return 'var(--loss)';
}

/* ═══ Component ═══ */

export function PreviewTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (symbol: string) => {
    setExpanded((prev) => (prev === symbol ? null : symbol));
  };

  return (
    <div
      className="border-border bg-card mt-12 overflow-hidden rounded-2xl border"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      {/* Table header */}
      <div className="border-border text-muted-foreground grid grid-cols-[1fr_auto_14px] items-center border-b px-5 py-3 text-center text-[12px] font-semibold tracking-[0.08em] uppercase md:grid-cols-[2fr_1fr_1fr_1fr_2fr]">
        <span className="text-left">Stock</span>
        <span className="text-right md:hidden">Price</span>
        <span className="md:hidden" />
        <span className="hidden md:inline">Trend</span>
        <span className="hidden md:inline">Price</span>
        <span className="hidden md:inline">Change</span>
        <span className="hidden md:inline">Strength</span>
      </div>

      {/* Table rows */}
      {stocks.map((s) => {
        const isOpen = expanded === s.symbol;

        return (
          <div key={s.symbol} className="border-border border-b last:border-b-0">
            {/* Main row */}
            <div
              className="grid cursor-pointer grid-cols-[1fr_auto_14px] items-center gap-x-2 px-5 py-3 text-center md:cursor-default md:grid-cols-[2fr_1fr_1fr_1fr_2fr] md:gap-x-0"
              onClick={() => toggle(s.symbol)}
            >
              {/* Stock + signal badge */}
              <div className="flex items-center gap-2 text-left">
                <span className="font-display text-[15px] font-bold">{s.symbol}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{
                    backgroundColor: signalBgColor(s.signal),
                    color: signalColor(s.signal),
                  }}
                >
                  {s.signal}
                </span>
              </div>

              {/* Price - mobile (right-aligned) */}
              <span className="font-display text-right text-[14px] font-bold md:hidden">
                {s.price}
              </span>

              {/* Expand arrow - mobile only */}
              <ChevronDown
                size={14}
                className="text-muted-foreground shrink-0 transition-transform md:hidden"
                style={{ transform: isOpen ? 'rotate(180deg)' : undefined }}
              />

              {/* Sparkline - desktop only */}
              <div className="hidden items-end justify-center gap-[2px] md:flex">
                {s.spark.map((v, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-sm"
                    style={{
                      height: `${v * 24}px`,
                      backgroundColor: s.up ? 'var(--accent-green)' : 'var(--loss)',
                      opacity: 0.3 + (i / 6) * 0.7,
                    }}
                  />
                ))}
              </div>

              {/* Price - desktop */}
              <span className="font-display hidden text-[14px] font-bold md:inline">{s.price}</span>

              {/* Change - desktop */}
              <span
                className="hidden text-[14px] font-semibold md:inline"
                style={{ color: s.up ? 'var(--profit)' : 'var(--loss)' }}
              >
                {s.change}
              </span>

              {/* Strength - desktop */}
              <div className="hidden items-center justify-center gap-2 md:flex">
                <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.signalStrength}%`,
                      backgroundColor: strengthBarColor(s.signal),
                    }}
                  />
                </div>
                <span className="text-muted-foreground w-6 text-[12px]">{s.signalStrength}</span>
              </div>
            </div>

            {/* Expanded details - mobile only */}
            <div
              className="grid overflow-hidden transition-all md:hidden"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <div className="border-border grid grid-cols-3 border-t px-5 py-3">
                  {/* Trend sparkline */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
                      Trend
                    </span>
                    <div className="flex items-end gap-[2px]">
                      {s.spark.map((v, i) => (
                        <div
                          key={i}
                          className="w-[3px] rounded-sm"
                          style={{
                            height: `${v * 24}px`,
                            backgroundColor: s.up ? 'var(--accent-green)' : 'var(--loss)',
                            opacity: 0.3 + (i / 6) * 0.7,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Change */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
                      Change
                    </span>
                    <span
                      className="text-[14px] font-semibold"
                      style={{ color: s.up ? 'var(--profit)' : 'var(--loss)' }}
                    >
                      {s.change}
                    </span>
                  </div>

                  {/* Strength */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
                      Strength
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="bg-muted h-1.5 w-12 overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.signalStrength}%`,
                            backgroundColor: strengthBarColor(s.signal),
                          }}
                        />
                      </div>
                      <span className="text-muted-foreground text-[12px]">{s.signalStrength}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="text-muted-foreground px-5 py-3 text-[13px] italic">
        Sample data shown for illustration. Live data available at launch.
      </div>
    </div>
  );
}

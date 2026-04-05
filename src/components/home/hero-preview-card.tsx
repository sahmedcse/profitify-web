'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const chartData = [
  { x: 0, v: 42 },
  { x: 1, v: 45 },
  { x: 2, v: 41 },
  { x: 3, v: 52 },
  { x: 4, v: 48 },
  { x: 5, v: 58 },
  { x: 6, v: 54 },
  { x: 7, v: 63 },
  { x: 8, v: 59 },
  { x: 9, v: 68 },
  { x: 10, v: 72 },
  { x: 11, v: 78 },
];

const readings = [
  { label: 'RSI (14)', value: '62.4', status: 'Neutral' },
  { label: 'MACD', value: '+1.82', status: 'Bullish' },
  { label: 'Volume', value: '48.2M', status: 'Above Avg' },
];

export function HeroPreviewCard() {
  return (
    <div
      className="animate-float border-border bg-card w-full max-w-[380px] rounded-[20px] border p-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <span className="text-text-secondary text-[13px]">AAPL · Apple Inc.</span>
        <span className="bg-accent-green-soft text-accent-green rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
          BULLISH
        </span>
      </div>
      <div className="mb-4 flex items-baseline gap-2.5">
        <span className="font-display text-[28px] font-bold tracking-tight">$198.45</span>
        <span className="text-profit text-[14px] font-semibold">+1.19%</span>
      </div>

      {/* Mini area chart */}
      <div className="mb-4 h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="heroChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0891B2" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0891B2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="#0891B2"
              strokeWidth={2}
              fill="url(#heroChartGradient)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Readings */}
      <div className="flex gap-2">
        {readings.map((r) => (
          <div key={r.label} className="bg-muted flex-1 rounded-xl px-3 py-2">
            <div className="text-muted-foreground text-[11px]">{r.label}</div>
            <div className="font-display text-[15px] font-bold">{r.value}</div>
            <div className="text-text-secondary text-[11px]">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

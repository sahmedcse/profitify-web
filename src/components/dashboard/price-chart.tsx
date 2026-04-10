'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  data: { t: number; price: number }[] | undefined;
  up: boolean;
};

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

function MiniTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0].value;
  return (
    <Card className="rounded-md border p-2 shadow-md">
      <span className="font-display text-foreground text-[12px] font-bold">
        ${typeof v === 'number' ? v.toFixed(2) : v}
      </span>
    </Card>
  );
}

export function PriceChart({ data, up }: Props) {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const color = up ? 'var(--accent-green)' : 'var(--loss)';

  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <Activity size={16} className="text-accent-green" />
          Price Action
        </CardTitle>
        <CardAction className="flex flex-wrap gap-1">
          {TIMEFRAMES.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={tf === timeframe ? 'default' : 'outline'}
              onClick={() => setTimeframe(tf)}
              className="h-7 px-2.5 text-[11px]"
            >
              {tf}
            </Button>
          ))}
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        {!data || data.length === 0 ? (
          <ChartEmptyState height={200} label="No price data yet" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="t"
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                interval={9}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                width={36}
                domain={['auto', 'auto']}
              />
              <Tooltip content={MiniTooltip} cursor={{ stroke: 'var(--border)' }} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={2}
                fill="url(#priceFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

function ChartEmptyState({ height, label }: { height: number; label: string }) {
  return (
    <div
      className="text-muted-foreground flex items-center justify-center rounded-md text-[11px]"
      style={{ height }}
    >
      {label}
    </div>
  );
}

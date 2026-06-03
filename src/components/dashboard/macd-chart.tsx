'use client';

import { Activity } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  data: { t: number; macd: number; signal: number }[] | undefined;
};

function MacdTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <Card className="rounded-md border p-2 shadow-md">
      {payload.map((p) => (
        <span key={String(p.dataKey)} className="font-display block text-[11px]">
          <span className="text-muted-foreground capitalize">{String(p.dataKey)}: </span>
          <span className="text-foreground font-bold">
            {typeof p.value === 'number' ? p.value.toFixed(3) : String(p.value ?? '')}
          </span>
        </span>
      ))}
    </Card>
  );
}

export function MacdChart({ data }: Props) {
  const last = data && data.length > 0 ? data[data.length - 1] : undefined;
  const bullish = last ? last.macd >= last.signal : true;
  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <Activity size={16} className="text-primary" />
          MACD
        </CardTitle>
        <CardAction>
          <Badge
            variant="secondary"
            className={
              bullish
                ? 'bg-accent-green-soft text-accent-green tracking-wider uppercase'
                : 'bg-loss-soft text-loss tracking-wider uppercase'
            }
          >
            {bullish ? 'Bullish' : 'Bearish'}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        {!data || data.length === 0 ? (
          <div className="text-muted-foreground flex h-[160px] items-center justify-center rounded-md text-[11px]">
            No MACD data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="t"
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip content={MacdTooltip} cursor={{ stroke: 'var(--border)' }} />
              <Line
                type="monotone"
                dataKey="macd"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="signal"
                stroke="var(--loss)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

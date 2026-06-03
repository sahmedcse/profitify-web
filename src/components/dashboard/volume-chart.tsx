'use client';

import { BarChart3 } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  data: { t: number; vol: number; up: boolean }[] | undefined;
};

function VolumeTooltip({ active, payload }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <Card className="rounded-md border p-2 shadow-md">
      <span className="font-display text-foreground text-[12px] font-bold">
        {payload[0].value}M
      </span>
    </Card>
  );
}

export function VolumeChart({ data }: Props) {
  const avgLabel =
    data && data.length > 0
      ? `Avg: ${(data.reduce((acc, d) => acc + d.vol, 0) / data.length).toFixed(1)}M`
      : '';
  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <BarChart3 size={16} className="text-primary" />
          Volume
        </CardTitle>
        <CardAction className="text-muted-foreground text-[11px]">{avgLabel}</CardAction>
      </CardHeader>
      <CardContent className="px-5">
        {!data || data.length === 0 ? (
          <div className="text-muted-foreground flex h-[160px] items-center justify-center rounded-md text-[11px]">
            No volume data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                width={32}
              />
              <Tooltip content={VolumeTooltip} cursor={{ fill: 'var(--muted)' }} />
              <Bar dataKey="vol" radius={[2, 2, 0, 0]}>
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.up ? 'var(--accent-green)' : 'var(--loss)'}
                    fillOpacity={0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { GitCompareArrows } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SignalBadge } from './signal-badge';
import { useCompare } from '@/hooks/use-dashboard';
import type { ComparePeriod, Stock } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const PERIODS: readonly ComparePeriod[] = ['3M', '6M', '1Y'];

type Props = {
  stocks: Stock[];
};

function CompTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <Card className="rounded-md border p-2 shadow-md">
      <div className="text-muted-foreground mb-1 text-[10px]">{String(label ?? '')}</div>
      {payload.map((p) => (
        <div key={String(p.dataKey)} className="font-display flex items-center gap-1.5 text-[11px]">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{String(p.dataKey)}:</span>
          <span className="text-foreground font-bold">
            {typeof p.value === 'number'
              ? `${p.value >= 0 ? '+' : ''}${p.value.toFixed(2)}%`
              : String(p.value ?? '')}
          </span>
        </div>
      ))}
    </Card>
  );
}

export function StockVsStock({ stocks }: Props) {
  const [pickedA, setPickedA] = useState<string | undefined>(undefined);
  const [pickedB, setPickedB] = useState<string | undefined>(undefined);
  const [period, setPeriod] = useState<ComparePeriod>('1Y');

  // Default A/B to the first two available stocks until the user picks.
  // Derived during render to avoid `react-hooks/set-state-in-effect`.
  const compareA = pickedA ?? stocks[0]?.symbol;
  const compareB = pickedB ?? stocks[1]?.symbol;

  const { data: series } = useCompare(compareA, compareB, period);
  const rows = series ?? [];

  const stockA = stocks.find((s) => s.symbol === compareA);
  const stockB = stocks.find((s) => s.symbol === compareB);
  const last = rows[rows.length - 1];
  const lastA = last && compareA ? Number(last[compareA]) : 0;
  const lastB = last && compareB ? Number(last[compareB]) : 0;

  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <GitCompareArrows size={16} className="text-gold" />
          Stock vs Stock
        </CardTitle>
        <CardAction className="flex flex-wrap gap-1">
          {PERIODS.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={p === period ? 'default' : 'outline'}
              onClick={() => setPeriod(p)}
              className="h-7 px-2.5 text-[11px]"
            >
              {p}
            </Button>
          ))}
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <PickerPanel
            label="Stock A"
            value={compareA}
            onChange={setPickedA}
            stocks={stocks}
            perf={lastA}
            stock={stockA}
            colorVar="var(--primary)"
          />
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="px-2 text-[10px] tracking-wider uppercase">
              vs
            </Badge>
          </div>
          <PickerPanel
            label="Stock B"
            value={compareB}
            onChange={setPickedB}
            stocks={stocks}
            perf={lastB}
            stock={stockB}
            colorVar="var(--gold)"
          />
        </div>

        <div className="mt-4">
          {rows.length === 0 ? (
            <div className="text-muted-foreground flex h-[220px] items-center justify-center rounded-md text-[11px]">
              No comparison data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={rows} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  interval={Math.max(1, Math.floor(rows.length / 6))}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                  axisLine={false}
                  tickLine={false}
                  width={42}
                  tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}%`}
                />
                <Tooltip content={CompTooltip} cursor={{ stroke: 'var(--border)' }} />
                <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="2 2" />
                {compareA && (
                  <Line
                    type="monotone"
                    dataKey={compareA}
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {compareB && (
                  <Line
                    type="monotone"
                    dataKey={compareB}
                    stroke="var(--gold)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mt-2 flex items-center justify-center gap-5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: 'var(--primary)' }} />
            <span className="text-muted-foreground">{compareA ?? '—'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: 'var(--gold)' }} />
            <span className="text-muted-foreground">{compareB ?? '—'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type PickerProps = {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  stocks: Stock[];
  perf: number;
  stock: Stock | undefined;
  colorVar: string;
};

function PickerPanel({ label, value, onChange, stocks, perf, stock, colorVar }: PickerProps) {
  const up = perf >= 0;
  return (
    <div className="border-border bg-muted/30 flex flex-col gap-2 rounded-lg border p-3">
      <span className="text-muted-foreground text-[10px] tracking-wider uppercase">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select stock" />
        </SelectTrigger>
        <SelectContent>
          {stocks.map((s) => (
            <SelectItem key={s.symbol} value={s.symbol}>
              {s.symbol} — {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-text-secondary truncate text-[11px]">{stock?.name ?? '—'}</span>
      <span className={cn('font-display text-[18px] font-bold')} style={{ color: colorVar }}>
        {up ? '+' : ''}
        {perf.toFixed(2)}%
      </span>
      {stock && <SignalBadge signal={stock.signal} size="small" />}
    </div>
  );
}

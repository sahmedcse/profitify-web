import { Gauge } from 'lucide-react';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Indicator } from '@/types/dashboard';

type Props = { indicators: Indicator[] | undefined };

const STATUS_DOT: Record<Indicator['status'], string> = {
  bullish: 'bg-accent-green',
  neutral: 'bg-gold',
  bearish: 'bg-loss',
};

export function IndicatorsTable({ indicators }: Props) {
  const rows = indicators ?? [];
  const buy = rows.filter((i) => i.status === 'bullish').length;
  const neutral = rows.filter((i) => i.status === 'neutral').length;
  const sell = rows.filter((i) => i.status === 'bearish').length;

  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <Gauge size={16} className="text-gold" />
          Technical Indicators
        </CardTitle>
        <CardAction className="flex items-center gap-3 text-[10px]">
          <LegendDot color="bg-accent-green" label="Bullish" />
          <LegendDot color="bg-gold" label="Neutral" />
          <LegendDot color="bg-loss" label="Bearish" />
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        <div className="mb-4 grid grid-cols-3 gap-3">
          <SummaryTile count={buy} label="Buy" tone="bullish" />
          <SummaryTile count={neutral} label="Neutral" tone="neutral" />
          <SummaryTile count={sell} label="Sell" tone="bearish" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground text-[11px] tracking-wider uppercase">
                Indicator
              </TableHead>
              <TableHead className="text-muted-foreground text-[11px] tracking-wider uppercase">
                Value
              </TableHead>
              <TableHead className="text-muted-foreground text-[11px] tracking-wider uppercase">
                Detail
              </TableHead>
              <TableHead className="w-[20px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground py-6 text-center text-[11px]"
                >
                  No indicators available yet
                </TableCell>
              </TableRow>
            )}
            {rows.map((ind) => (
              <TableRow key={ind.name}>
                <TableCell className="font-display text-foreground text-[12px] font-semibold">
                  {ind.name}
                </TableCell>
                <TableCell className="font-display text-foreground text-[12px] font-bold">
                  {ind.value}
                </TableCell>
                <TableCell className="text-text-secondary text-[11px]">{ind.detail}</TableCell>
                <TableCell>
                  <span
                    className={cn('inline-block size-2 rounded-full', STATUS_DOT[ind.status])}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="text-muted-foreground flex items-center gap-1">
      <span className={cn('size-2 rounded-full', color)} />
      {label}
    </span>
  );
}

function SummaryTile({
  count,
  label,
  tone,
}: {
  count: number;
  label: string;
  tone: Indicator['status'];
}) {
  const bg =
    tone === 'bullish'
      ? 'bg-accent-green-soft'
      : tone === 'neutral'
        ? 'bg-gold-soft'
        : 'bg-loss-soft';
  const fg =
    tone === 'bullish' ? 'text-accent-green' : tone === 'neutral' ? 'text-gold' : 'text-loss';
  return (
    <div className={cn('flex flex-col items-center gap-1 rounded-lg px-2 py-3', bg)}>
      <span className={cn('font-display text-[22px] font-extrabold', fg)}>{count}</span>
      <span className={cn('text-[10px] tracking-wider uppercase', fg)}>{label}</span>
    </div>
  );
}

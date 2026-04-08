import { ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SignalBadge } from './signal-badge';
import { StrengthGauge } from './strength-gauge';
import { cn } from '@/lib/utils';
import type { Stock } from '@/lib/dashboard-data';

type Props = { stock: Stock };

export function StockHeader({ stock }: Props) {
  const up = stock.change >= 0;
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-foreground text-[24px] font-extrabold tracking-[-0.03em] sm:text-[28px]">
          {stock.symbol}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary text-[14px]">{stock.name}</span>
          <Badge
            variant="outline"
            className="text-muted-foreground px-1.5 py-0 text-[9px] tracking-wider uppercase"
          >
            {stock.sector}
          </Badge>
        </div>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-display text-foreground text-[32px] font-extrabold tracking-[-0.03em] sm:text-[38px]">
            ${stock.price.toFixed(2)}
          </span>
          <span
            className={cn(
              'flex items-center gap-1 text-[14px] font-semibold',
              up ? 'text-accent-green' : 'text-loss',
            )}
          >
            {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {up ? '+' : ''}
            {stock.change.toFixed(2)} ({up ? '+' : ''}
            {stock.pct.toFixed(2)}%)
          </span>
        </div>
        <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-[11px]">
          <Clock size={11} />
          Sample data · For illustration only
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end">
        <SignalBadge signal={stock.signal} />
        <StrengthGauge value={stock.strength} />
      </div>
    </header>
  );
}

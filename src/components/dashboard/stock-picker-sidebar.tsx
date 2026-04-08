'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Stock } from '@/lib/dashboard-data';

type Props = {
  stocks: Stock[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function StockPickerSidebar({ stocks, selectedIndex, onSelect }: Props) {
  return (
    <aside className="border-border bg-secondary flex max-h-[300px] w-full flex-col overflow-y-auto border-b lg:max-h-none lg:w-[250px] lg:border-r lg:border-b-0">
      <div className="flex flex-col">
        {stocks.map((stock, index) => {
          const isActive = index === selectedIndex;
          const up = stock.change >= 0;
          return (
            <button
              key={stock.symbol}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                'border-border hover:bg-muted/50 flex w-full items-center gap-3 border-b border-l-[3px] border-l-transparent px-4 py-3 text-left transition-colors',
                isActive && 'bg-primary-soft border-l-primary',
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-foreground text-[15px] font-bold">
                    {stock.symbol}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-1.5 py-0 text-[9px] tracking-wider uppercase"
                  >
                    {stock.sector}
                  </Badge>
                </div>
                <span className="text-text-secondary truncate text-[11px]">{stock.name}</span>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="font-display text-foreground text-[14px] font-bold">
                  ${stock.price.toFixed(2)}
                </span>
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-[11px] font-medium',
                    up ? 'text-accent-green' : 'text-loss',
                  )}
                >
                  {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {up ? '+' : ''}
                  {stock.pct.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-auto hidden px-4 py-3 text-[10px] leading-relaxed lg:block">
        Showing a curated list of popular stocks. Full search available above.
      </p>
    </aside>
  );
}

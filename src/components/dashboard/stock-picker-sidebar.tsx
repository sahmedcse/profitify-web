'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Stock } from '@/types/dashboard';

type Props = {
  stocks: Stock[];
  selectedSymbol: string | undefined;
  onSelect: (symbol: string) => void;
  isLoading?: boolean;
};

export function StockPickerSidebar({ stocks, selectedSymbol, onSelect, isLoading }: Props) {
  return (
    <aside className="border-border bg-secondary flex max-h-[300px] w-full flex-col overflow-y-auto border-b lg:max-h-none lg:w-[250px] lg:border-r lg:border-b-0">
      <div className="flex flex-col">
        {isLoading && stocks.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SidebarSkeletonRow key={i} />)
          : stocks.map((stock) => {
              const isActive = stock.symbol === selectedSymbol;
              const up = stock.change >= 0;
              return (
                <button
                  key={stock.symbol}
                  type="button"
                  onClick={() => onSelect(stock.symbol)}
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
                      {stock.sector && (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground px-1.5 py-0 text-[9px] tracking-wider uppercase"
                        >
                          {stock.sector}
                        </Badge>
                      )}
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
        Showing top movers by daily performance. Full search coming soon.
      </p>
    </aside>
  );
}

function SidebarSkeletonRow() {
  return (
    <div className="border-border flex w-full items-center gap-3 border-b px-4 py-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="bg-muted h-3 w-12 rounded" />
        <div className="bg-muted/70 h-2.5 w-20 rounded" />
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <div className="bg-muted h-3 w-14 rounded" />
        <div className="bg-muted/70 h-2.5 w-10 rounded" />
      </div>
    </div>
  );
}

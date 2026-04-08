import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Level } from '@/lib/dashboard-data';

type Props = {
  levels: Level[];
  currentPrice: number;
};

const STRENGTH_DOTS: Record<Level['strength'], number> = {
  weak: 1,
  moderate: 2,
  strong: 3,
};

export function SupportResistanceCard({ levels, currentPrice }: Props) {
  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <Target size={16} className="text-loss" />
          Support & Resistance
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="flex flex-col gap-1">
          {levels.map((lvl) => {
            const isResistance = lvl.type === 'resistance';
            const labelColor = isResistance ? 'text-loss' : 'text-accent-green';
            const isKey = lvl.label === 'R1' || lvl.label === 'S1';
            const bgClass = isKey ? (isResistance ? 'bg-loss-soft' : 'bg-accent-green-soft') : '';
            return (
              <div
                key={lvl.label}
                className={cn('flex items-center justify-between rounded-md px-2 py-1.5', bgClass)}
              >
                <div className="flex items-center gap-2">
                  <span className={cn('text-[11px] font-bold tracking-wider', labelColor)}>
                    {lvl.label}
                  </span>
                  <span className="font-display text-foreground text-[13px] font-bold">
                    ${lvl.price.toFixed(2)}
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={cn(
                            'size-1.5 rounded-full',
                            dot <= STRENGTH_DOTS[lvl.strength]
                              ? isResistance
                                ? 'bg-loss'
                                : 'bg-accent-green'
                              : 'bg-border',
                          )}
                        />
                      ))}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <span className="capitalize">{lvl.strength}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>

        <Separator className="my-3" />

        <div className="flex items-center justify-between rounded-md px-2">
          <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
            Current
          </span>
          <span className="font-display text-foreground text-[14px] font-extrabold">
            ${currentPrice.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

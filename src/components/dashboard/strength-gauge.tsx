import { cn } from '@/lib/utils';

type Props = { value: number };

export function StrengthGauge({ value }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const fillClass = clamped >= 70 ? 'bg-accent-green' : clamped >= 45 ? 'bg-gold' : 'bg-loss';

  return (
    <div className="flex w-full max-w-[160px] flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
          Signal Strength
        </span>
        <span className="font-display text-foreground text-[12px] font-bold">{clamped}/100</span>
      </div>
      <div className="bg-background h-1.5 w-full overflow-hidden rounded-full">
        <div
          className={cn('h-full rounded-full transition-all', fillClass)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

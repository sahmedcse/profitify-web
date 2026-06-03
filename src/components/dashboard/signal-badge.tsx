import {
  CheckCircle,
  MinusCircle,
  TrendingDown,
  TrendingUp,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Signal } from '@/types/dashboard';

type Props = {
  signal: Signal;
  size?: 'normal' | 'small';
};

function styleFor(signal: Signal): { Icon: LucideIcon; classes: string } {
  switch (signal) {
    case 'Strong Buy':
      return { Icon: CheckCircle, classes: 'bg-accent-green-soft text-accent-green' };
    case 'Bullish':
      return { Icon: TrendingUp, classes: 'bg-accent-green-soft text-accent-green' };
    case 'Neutral':
      return { Icon: MinusCircle, classes: 'bg-gold-soft text-gold' };
    case 'Bearish':
      return { Icon: TrendingDown, classes: 'bg-loss-soft text-loss' };
    case 'Strong Sell':
      return { Icon: XCircle, classes: 'bg-loss-soft text-loss' };
  }
}

export function SignalBadge({ signal, size = 'normal' }: Props) {
  const { Icon, classes } = styleFor(signal);
  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-1 rounded-full font-bold tracking-wider uppercase',
        classes,
        size === 'small' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]',
      )}
    >
      <Icon size={size === 'small' ? 11 : 13} />
      {signal}
    </Badge>
  );
}

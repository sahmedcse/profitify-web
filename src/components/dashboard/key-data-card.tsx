import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Fundamental } from '@/lib/dashboard-data';

type Props = { fundamentals: Fundamental[] };

export function KeyDataCard({ fundamentals }: Props) {
  return (
    <Card
      className="gap-3 rounded-[14px] border-0 py-5"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <CardHeader className="px-5">
        <CardTitle className="font-display flex items-center gap-2 text-[15px] font-bold">
          <Info size={16} className="text-primary" />
          Key Data
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {fundamentals.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-[11px]">{f.label}</span>
              <span className="font-display text-foreground text-[14px] font-bold">{f.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

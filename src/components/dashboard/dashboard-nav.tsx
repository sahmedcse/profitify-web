'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search } from 'lucide-react';
import { ProfitifyIcon } from '@/components/icons/profitify-icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function DashboardNav() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <nav
      className="border-border sticky top-0 z-50 flex items-center justify-between gap-4 border-b px-5 py-3 backdrop-blur-md backdrop-saturate-[1.4] sm:px-7"
      style={{ backgroundColor: 'var(--bg-glass)' }}
    >
      <div className="flex items-center gap-3">
        <ProfitifyIcon size={32} />
        <span className="font-display text-[18px] font-bold tracking-[-0.03em] sm:text-[20px]">
          profit<span className="text-accent-green">ify</span>
        </span>
        <Badge
          variant="secondary"
          className="bg-primary-soft text-primary hidden tracking-[0.08em] uppercase sm:inline-flex"
        >
          Dashboard
        </Badge>
      </div>

      <div className="relative hidden md:block">
        <Search
          size={14}
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Input placeholder="Search stocks…" className="w-[300px] pl-9" aria-label="Search stocks" />
      </div>

      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="text-gold size-5" />
          ) : (
            <Moon className="text-muted-foreground size-5" />
          )}
        </Button>
      )}
    </nav>
  );
}

'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { ProfitifyIcon } from '@/components/icons/profitify-icon';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <nav
      className="border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md backdrop-saturate-[1.4]"
      style={{ backgroundColor: 'var(--bg-glass)' }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 md:px-12">
        <div className="flex items-center gap-2.5">
          <ProfitifyIcon size={36} />
          <span className="font-display text-[21px] font-bold tracking-[-0.03em]">
            profit
            <span className="text-accent-green">ify</span>
          </span>
        </div>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:bg-muted cursor-pointer rounded-lg p-2 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="text-gold h-5 w-5" />
            ) : (
              <Moon className="text-muted-foreground h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}

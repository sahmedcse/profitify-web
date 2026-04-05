import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profitify - Financial Dashboard & Analytics',
};

export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-24 text-center">
      <div className="flex items-center gap-3">
        <BarChart3 className="text-brand-600 h-10 w-10" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Profitify</h1>
      </div>
      <p className="text-muted-foreground max-w-2xl text-lg">
        Track your portfolio performance, analyze market trends, and make data-driven financial
        decisions.
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </section>
  );
}

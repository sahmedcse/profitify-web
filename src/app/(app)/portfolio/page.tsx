import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Portfolio' };

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="text-muted-foreground">Portfolio holdings will appear here.</p>
    </div>
  );
}

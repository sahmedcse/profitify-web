import type { Metadata } from 'next';
import { Eye, BarChart3, Activity } from 'lucide-react';
import { Navbar } from '@/components/home/navbar';
import { HeroPreviewCard } from '@/components/home/hero-preview-card';
import { PreviewTable } from '@/components/home/preview-table';
import { ProfitifyIcon } from '@/components/icons/profitify-icon';

export const metadata: Metadata = {
  title: 'Profitify - Stock Insights, Simplified',
  description:
    "We crunch the numbers so you don't have to. Clear readings, honest signals, and real data for every stock.",
};

/* ═══ Data ═══ */

const features = [
  {
    icon: Eye,
    title: 'Clear Signals',
    description:
      'Every stock gets a simple reading — Bullish, Bearish, or Neutral — backed by real technical data.',
    color: 'var(--primary)',
    softColor: 'var(--primary-soft)',
  },
  {
    icon: BarChart3,
    title: 'Key Indicators',
    description:
      'RSI, MACD, moving averages, volume analysis, and more — all calculated and presented clearly.',
    color: 'var(--accent-green)',
    softColor: 'var(--accent-green-soft)',
  },
  {
    icon: Activity,
    title: 'Live Data',
    description:
      "Updated in real-time so you're always looking at the latest numbers, not yesterday's news.",
    color: 'var(--gold)',
    softColor: 'var(--gold-soft)',
  },
];

const steps = [
  {
    num: '01',
    title: 'Pick a stock',
    description: 'Search any ticker. We cover major exchanges and update data in real-time.',
  },
  {
    num: '02',
    title: 'Read the numbers',
    description:
      'We break down the key technical indicators — RSI, MACD, volume trends, moving averages — into a clean summary.',
  },
  {
    num: '03',
    title: 'Make informed decisions',
    description:
      'Use our readings alongside your own research. We provide the data — you make the call.',
  },
];

/* ═══ Page ═══ */

export default function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            opacity: 0.4,
          }}
        />
        {/* Gradient orb */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 h-[400px] w-[600px] -translate-x-1/2 blur-[40px]"
          style={{
            background: 'radial-gradient(ellipse, var(--primary) 0%, transparent 70%)',
            opacity: 0.1,
          }}
        />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-16 px-6 md:grid-cols-2 md:px-12">
          <div className="animate-fade-up">
            <span className="bg-gold-soft text-gold mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-[0.08em]">
              <span className="animate-pulse-dot bg-gold inline-block h-2 w-2 rounded-full" />
              Coming Soon
            </span>
            <h1 className="font-display mt-4 text-[48px] leading-[1.1] font-extrabold tracking-[-0.035em] md:text-[54px]">
              Stock insights,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-green))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                simplified
              </span>
            </h1>
            <p className="text-text-secondary mt-5 max-w-[480px] text-[17px] leading-relaxed">
              We crunch the numbers so you don&apos;t have to. Clear readings, honest signals, and
              real data for every stock — no noise, no fluff.
            </p>
          </div>
          <div className="flex justify-center" style={{ animation: 'fade-up 0.7s ease 0.2s both' }}>
            <HeroPreviewCard />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="mx-auto max-w-[1000px] px-6 text-center md:px-12">
          <span className="text-primary text-[13px] font-semibold tracking-[0.08em] uppercase">
            What We Do
          </span>
          <h2 className="font-display mt-3 text-[34px] font-extrabold tracking-[-0.03em] md:text-[38px]">
            Data-driven stock readings,
            <br />
            zero guesswork
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-[600px] text-[15px] leading-relaxed">
            Profitify analyzes technical indicators, price action, and volume data to generate
            clear, actionable readings for any stock.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="border-border bg-card rounded-2xl border p-6 text-left transition-all hover:-translate-y-[3px] hover:border-[var(--border-hover)]"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div
                  className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-[11px]"
                  style={{
                    backgroundColor: f.softColor,
                    border: `1px solid color-mix(in srgb, ${f.color} 22%, transparent)`,
                  }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-display mb-1.5 text-[16px] font-bold">{f.title}</h3>
                <p className="text-text-secondary text-[14px] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Table */}
      <section className="py-20">
        <div className="mx-auto max-w-[1000px] px-6 text-center md:px-12">
          <span className="text-accent-green text-[13px] font-semibold tracking-[0.08em] uppercase">
            Preview
          </span>
          <h2 className="font-display mt-3 text-[34px] font-extrabold tracking-[-0.03em] md:text-[38px]">
            What you&apos;ll see
          </h2>

          <PreviewTable />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-[700px] px-6 text-center md:px-12">
          <span className="text-gold text-[13px] font-semibold tracking-[0.08em] uppercase">
            How It Works
          </span>
          <h2 className="font-display mt-3 text-[34px] font-extrabold tracking-[-0.03em] md:text-[38px]">
            Simple by design
          </h2>

          <div className="relative mt-14 flex flex-col gap-10 text-left">
            {/* Vertical gradient line */}
            <div
              className="absolute top-0 bottom-0 left-[28px] w-px"
              style={{
                background:
                  'linear-gradient(180deg, var(--primary), var(--accent-green), var(--gold))',
                opacity: 0.15,
              }}
            />

            {steps.map((s) => (
              <div key={s.num} className="relative flex gap-5">
                <div
                  className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] text-[18px] font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent-green))',
                  }}
                >
                  {s.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-[18px] font-bold">{s.title}</h3>
                  <p className="text-text-secondary mt-1.5 text-[15px] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 md:flex-row md:items-center md:justify-between md:gap-0 md:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProfitifyIcon size={28} />
              <span className="font-display text-[15px] font-bold">
                profit<span className="text-accent-green">ify</span>
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-4 text-[13px] md:hidden">
              <a
                href="https://github.com/sahmedcse/profitify-web"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sadatahmed4/"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center justify-center gap-4 text-[13px] md:justify-end">
            <span>&copy; 2026 Sadat Ahmed</span>
            <a
              href="https://github.com/sahmedcse/profitify-web"
              className="hover:text-foreground hidden transition-colors md:inline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sadatahmed4/"
              className="hover:text-foreground hidden transition-colors md:inline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

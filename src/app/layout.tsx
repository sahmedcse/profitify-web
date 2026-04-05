import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import { AppProviders } from '@/providers/app-providers';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Profitify - Financial Dashboard & Analytics',
    template: '%s | Profitify',
  },
  description:
    'Track your portfolio performance, analyze market trends, and make data-driven financial decisions with Profitify.',
  keywords: [
    'financial dashboard',
    'portfolio analytics',
    'market analysis',
    'investment tracking',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Profitify',
    title: 'Profitify - Financial Dashboard & Analytics',
    description: 'Track your portfolio performance and analyze market trends.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profitify - Financial Dashboard & Analytics',
    description: 'Track your portfolio performance and analyze market trends.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-background min-h-screen font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

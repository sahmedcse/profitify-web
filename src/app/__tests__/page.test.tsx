import { describe, it, expect, vi } from 'vitest';
import { render, within } from '@testing-library/react';
import HomePage from '../page';

vi.mock('@/components/home/navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock('@/components/home/hero-preview-card', () => ({
  HeroPreviewCard: () => <div data-testid="hero-preview-card">HeroPreviewCard</div>,
}));

describe('HomePage', () => {
  it('renders the hero heading', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText(/stock insights,/i)).toBeInTheDocument();
    expect(within(container).getByText('simplified')).toBeInTheDocument();
  });

  it('renders the Coming Soon badge', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('Coming Soon')).toBeInTheDocument();
  });

  it('renders the navbar and hero preview card', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByTestId('navbar')).toBeInTheDocument();
    expect(within(container).getByTestId('hero-preview-card')).toBeInTheDocument();
  });

  it('renders feature titles', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('Clear Signals')).toBeInTheDocument();
    expect(within(container).getByText('Key Indicators')).toBeInTheDocument();
    expect(within(container).getByText('Live Data')).toBeInTheDocument();
  });

  it('renders stock tickers in preview table', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('AAPL')).toBeInTheDocument();
    expect(within(container).getByText('NVDA')).toBeInTheDocument();
    expect(within(container).getByText('TSLA')).toBeInTheDocument();
    expect(within(container).getByText('MSFT')).toBeInTheDocument();
    expect(within(container).getByText('AMZN')).toBeInTheDocument();
  });

  it('renders how it works steps', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('Pick a stock')).toBeInTheDocument();
    expect(within(container).getByText('Read the numbers')).toBeInTheDocument();
    expect(within(container).getByText('Make informed decisions')).toBeInTheDocument();
  });

  it('renders the footer with copyright', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('© 2026 Sadat Ahmed')).toBeInTheDocument();
    expect(within(container).getAllByText('GitHub').length).toBeGreaterThanOrEqual(1);
    expect(within(container).getAllByText('LinkedIn').length).toBeGreaterThanOrEqual(1);
  });
});

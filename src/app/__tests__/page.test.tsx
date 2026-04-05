import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the Profitify heading', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText('Profitify')).toBeInTheDocument();
  });

  it('renders the Go to Dashboard link', () => {
    const { container } = render(<HomePage />);

    const link = within(container).getByRole('link', { name: /go to dashboard/i });
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders the description text', () => {
    const { container } = render(<HomePage />);

    expect(within(container).getByText(/track your portfolio performance/i)).toBeInTheDocument();
  });
});

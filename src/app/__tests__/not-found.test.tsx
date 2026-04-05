import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound', () => {
  it('renders 404 text', () => {
    const { container } = render(<NotFound />);

    expect(within(container).getByText('404')).toBeInTheDocument();
  });

  it('renders Page not found message', () => {
    const { container } = render(<NotFound />);

    expect(within(container).getByText('Page not found.')).toBeInTheDocument();
  });

  it('renders Go Home link', () => {
    const { container } = render(<NotFound />);

    const link = within(container).getByRole('link', { name: /go home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});

import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    const { container } = render(<Badge>New</Badge>);

    const badge = within(container).getByText('New');
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge).toHaveAttribute('data-variant', 'default');
  });

  it('renders with secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Info</Badge>);

    const badge = within(container).getByText('Info');
    expect(badge).toHaveAttribute('data-variant', 'secondary');
  });

  it('renders with destructive variant', () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);

    const badge = within(container).getByText('Error');
    expect(badge).toHaveAttribute('data-variant', 'destructive');
  });

  it('renders with outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);

    const badge = within(container).getByText('Outline');
    expect(badge).toHaveAttribute('data-variant', 'outline');
  });
});

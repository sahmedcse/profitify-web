import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { Label } from '../label';

describe('Label', () => {
  it('renders with text content', () => {
    const { container } = render(<Label>Email</Label>);

    expect(within(container).getByText('Email')).toBeInTheDocument();
  });

  it('renders with data-slot', () => {
    const { container } = render(<Label>Name</Label>);

    const label = container.querySelector('[data-slot="label"]');
    expect(label).toBeInTheDocument();
  });

  it('renders with htmlFor attribute', () => {
    const { container } = render(<Label htmlFor="email-input">Email</Label>);

    const label = container.querySelector('[data-slot="label"]');
    expect(label).toHaveAttribute('for', 'email-input');
  });
});

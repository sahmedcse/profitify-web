import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Separator } from '../separator';

describe('Separator', () => {
  it('renders with data-slot', () => {
    const { container } = render(<Separator />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toBeInTheDocument();
  });

  it('renders horizontal by default', () => {
    const { container } = render(<Separator />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />);

    const separator = container.querySelector('[data-slot="separator"]');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });
});

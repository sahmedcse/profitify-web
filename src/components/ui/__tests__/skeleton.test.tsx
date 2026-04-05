import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders with data-slot', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('forwards className', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toHaveClass('h-4', 'w-32');
  });
});

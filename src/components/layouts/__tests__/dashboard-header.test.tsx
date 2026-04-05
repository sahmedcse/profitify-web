import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { DashboardHeader } from '../dashboard-header';

describe('DashboardHeader', () => {
  it('renders the header element', () => {
    const { container } = render(<DashboardHeader />);

    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('renders avatar fallback', () => {
    const { container } = render(<DashboardHeader />);

    expect(within(container).getByText('U')).toBeInTheDocument();
  });
});

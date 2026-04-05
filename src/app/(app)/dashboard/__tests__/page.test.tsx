import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import DashboardPage from '../page';

describe('DashboardPage', () => {
  it('renders the Dashboard heading', () => {
    const { container } = render(<DashboardPage />);

    expect(within(container).getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders all 4 metric cards', () => {
    const { container } = render(<DashboardPage />);
    const view = within(container);

    expect(view.getByText('Total Value')).toBeInTheDocument();
    expect(view.getByText('Daily P&L')).toBeInTheDocument();
    expect(view.getByText('Total Return')).toBeInTheDocument();
    expect(view.getByText('Open Positions')).toBeInTheDocument();
  });

  it('shows placeholder values', () => {
    const { container } = render(<DashboardPage />);

    const placeholders = within(container).getAllByText('--');
    expect(placeholders).toHaveLength(4);
  });
});

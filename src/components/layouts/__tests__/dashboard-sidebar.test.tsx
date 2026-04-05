import { describe, it, expect, vi } from 'vitest';
import { render, within } from '@testing-library/react';
import { DashboardSidebar } from '../dashboard-sidebar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('DashboardSidebar', () => {
  it('renders all nav items', () => {
    const { container } = render(<DashboardSidebar />);
    const view = within(container);

    expect(view.getByText('Dashboard')).toBeInTheDocument();
    expect(view.getByText('Analytics')).toBeInTheDocument();
    expect(view.getByText('Portfolio')).toBeInTheDocument();
    expect(view.getByText('Settings')).toBeInTheDocument();
  });

  it('renders Profitify logo link', () => {
    const { container } = render(<DashboardSidebar />);

    const logo = within(container).getByText('Profitify');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders nav links with correct hrefs', () => {
    const { container } = render(<DashboardSidebar />);
    const view = within(container);

    expect(view.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(view.getByText('Analytics').closest('a')).toHaveAttribute('href', '/analytics');
    expect(view.getByText('Portfolio').closest('a')).toHaveAttribute('href', '/portfolio');
    expect(view.getByText('Settings').closest('a')).toHaveAttribute('href', '/settings');
  });
});

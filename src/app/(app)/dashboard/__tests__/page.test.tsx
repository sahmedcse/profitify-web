import { describe, it, expect, vi } from 'vitest';
import { render, within } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DashboardClient } from '../dashboard-client';

vi.mock('recharts', () => {
  const Pass = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>;
  const Empty = () => null;
  return {
    ResponsiveContainer: Pass,
    AreaChart: Pass,
    Area: Empty,
    BarChart: Pass,
    Bar: Pass,
    Cell: Empty,
    LineChart: Pass,
    Line: Empty,
    XAxis: Empty,
    YAxis: Empty,
    CartesianGrid: Empty,
    Tooltip: Empty,
    ReferenceLine: Empty,
  };
});

function renderDashboard() {
  return render(
    <TooltipProvider>
      <DashboardClient />
    </TooltipProvider>,
  );
}

describe('DashboardClient', () => {
  it('renders the initially selected stock (AAPL)', () => {
    const { container } = renderDashboard();
    const view = within(container);
    expect(view.getAllByText('AAPL').length).toBeGreaterThan(0);
    expect(view.getAllByText('Apple Inc.').length).toBeGreaterThan(0);
  });

  it('renders all major dashboard section titles', () => {
    const { container } = renderDashboard();
    const view = within(container);
    expect(view.getByText('Price Action')).toBeInTheDocument();
    expect(view.getByText('Volume')).toBeInTheDocument();
    // "MACD" appears both as the chart title and as an indicator row.
    expect(view.getAllByText('MACD').length).toBeGreaterThan(0);
    expect(view.getByText('Stock vs Stock')).toBeInTheDocument();
    expect(view.getByText('Technical Indicators')).toBeInTheDocument();
    expect(view.getByText('Key Data')).toBeInTheDocument();
    expect(view.getByText('Support & Resistance')).toBeInTheDocument();
  });

  it('renders sample indicator and fundamental rows', () => {
    const { container } = renderDashboard();
    const view = within(container);
    expect(view.getByText('RSI (14)')).toBeInTheDocument();
    expect(view.getByText('Market Cap')).toBeInTheDocument();
  });

  it('renders the curated stock list in the sidebar', () => {
    const { container } = renderDashboard();
    const view = within(container);
    // Picker rows include all 8 stock symbols.
    expect(view.getAllByText('MSFT').length).toBeGreaterThan(0);
    expect(view.getAllByText('NVDA').length).toBeGreaterThan(0);
    expect(view.getAllByText('TSLA').length).toBeGreaterThan(0);
  });
});

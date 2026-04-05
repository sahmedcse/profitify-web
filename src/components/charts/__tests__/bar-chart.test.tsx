import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BarChart } from '../bar-chart';

vi.mock('recharts', () => {
  const MockResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  );
  const MockBarChart = ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="bar-chart" data-count={data.length}>
      {children}
    </div>
  );
  const MockBar = (props: { dataKey: string }) => (
    <div data-testid="bar" data-key={props.dataKey} />
  );
  const MockXAxis = () => <div data-testid="x-axis" />;
  const MockYAxis = () => <div data-testid="y-axis" />;
  const MockCartesianGrid = () => <div data-testid="grid" />;
  const MockTooltip = () => <div data-testid="tooltip" />;

  return {
    ResponsiveContainer: MockResponsiveContainer,
    BarChart: MockBarChart,
    Bar: MockBar,
    XAxis: MockXAxis,
    YAxis: MockYAxis,
    CartesianGrid: MockCartesianGrid,
    Tooltip: MockTooltip,
  };
});

const sampleData = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
];

describe('BarChart', () => {
  it('renders the chart with data', () => {
    const { container } = render(<BarChart data={sampleData} />);

    expect(container.querySelector('[data-testid="responsive-container"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="bar-chart"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="bar-chart"]')).toHaveAttribute('data-count', '3');
  });

  it('renders chart axes and grid', () => {
    const { container } = render(<BarChart data={sampleData} />);

    expect(container.querySelector('[data-testid="x-axis"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="y-axis"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="grid"]')).toBeInTheDocument();
  });

  it('renders bar with value dataKey', () => {
    const { container } = render(<BarChart data={sampleData} />);

    const bar = container.querySelector('[data-testid="bar"]');
    expect(bar).toHaveAttribute('data-key', 'value');
  });
});

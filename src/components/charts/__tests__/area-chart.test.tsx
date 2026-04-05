import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { AreaChart } from '../area-chart';

vi.mock('recharts', () => {
  const MockResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  );
  const MockAreaChart = ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="area-chart" data-count={data.length}>
      {children}
    </div>
  );
  const MockArea = (props: { dataKey: string }) => (
    <div data-testid="area" data-key={props.dataKey} />
  );
  const MockXAxis = () => <div data-testid="x-axis" />;
  const MockYAxis = () => <div data-testid="y-axis" />;
  const MockCartesianGrid = () => <div data-testid="grid" />;
  const MockTooltip = () => <div data-testid="tooltip" />;

  return {
    ResponsiveContainer: MockResponsiveContainer,
    AreaChart: MockAreaChart,
    Area: MockArea,
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

describe('AreaChart', () => {
  it('renders the chart with data', () => {
    const { container } = render(<AreaChart data={sampleData} />);

    expect(container.querySelector('[data-testid="responsive-container"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="area-chart"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="area-chart"]')).toHaveAttribute(
      'data-count',
      '3',
    );
  });

  it('renders chart axes and grid', () => {
    const { container } = render(<AreaChart data={sampleData} />);

    expect(container.querySelector('[data-testid="x-axis"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="y-axis"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="grid"]')).toBeInTheDocument();
  });

  it('renders area with value dataKey', () => {
    const { container } = render(<AreaChart data={sampleData} />);

    const area = container.querySelector('[data-testid="area"]');
    expect(area).toHaveAttribute('data-key', 'value');
  });
});

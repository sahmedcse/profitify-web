import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import type { CandlestickData, Time } from 'lightweight-charts';

const mockSetData = vi.fn();
const mockFitContent = vi.fn();
const mockApplyOptions = vi.fn();
const mockRemove = vi.fn();
const mockAddSeries = vi.fn(() => ({
  setData: mockSetData,
}));
const mockTimeScale = vi.fn(() => ({
  fitContent: mockFitContent,
}));
const mockCreateChart = vi.fn(() => ({
  addSeries: mockAddSeries,
  timeScale: mockTimeScale,
  applyOptions: mockApplyOptions,
  remove: mockRemove,
}));

vi.mock('lightweight-charts', () => ({
  createChart: (...args: unknown[]) => mockCreateChart(...args),
  CandlestickSeries: 'CandlestickSeries',
}));

const sampleData: CandlestickData<Time>[] = [
  { time: '2024-01-01' as Time, open: 100, high: 110, low: 95, close: 105 },
  { time: '2024-01-02' as Time, open: 105, high: 115, low: 100, close: 112 },
];

describe('CandlestickChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a container div', async () => {
    const { CandlestickChart } = await import('../candlestick-chart');
    const { container } = render(<CandlestickChart data={sampleData} />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('calls createChart on mount', async () => {
    const { CandlestickChart } = await import('../candlestick-chart');
    render(<CandlestickChart data={sampleData} />);

    expect(mockCreateChart).toHaveBeenCalledTimes(1);
  });

  it('adds candlestick series with data', async () => {
    const { CandlestickChart } = await import('../candlestick-chart');
    render(<CandlestickChart data={sampleData} />);

    expect(mockAddSeries).toHaveBeenCalledWith('CandlestickSeries', expect.any(Object));
    expect(mockSetData).toHaveBeenCalledWith(sampleData);
  });

  it('fits content to time scale', async () => {
    const { CandlestickChart } = await import('../candlestick-chart');
    render(<CandlestickChart data={sampleData} />);

    expect(mockFitContent).toHaveBeenCalled();
  });

  it('removes chart on unmount', async () => {
    const { CandlestickChart } = await import('../candlestick-chart');
    const { unmount } = render(<CandlestickChart data={sampleData} />);

    unmount();
    expect(mockRemove).toHaveBeenCalled();
  });
});

'use client';

import { useEffect, useRef } from 'react';
import {
  createChart,
  CandlestickSeries,
  type IChartApi,
  type CandlestickData,
  type Time,
} from 'lightweight-charts';

interface CandlestickChartProps {
  data: CandlestickData<Time>[];
  height?: number;
}

export function CandlestickChart({ data, height = 400 }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const profit = computedStyle.getPropertyValue('--color-profit').trim() || '#16a34a';
    const loss = computedStyle.getPropertyValue('--color-loss').trim() || '#dc2626';

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: computedStyle.getPropertyValue('--foreground').trim() || '#171717',
      },
      grid: {
        vertLines: { color: computedStyle.getPropertyValue('--border').trim() || '#e5e5e5' },
        horzLines: { color: computedStyle.getPropertyValue('--border').trim() || '#e5e5e5' },
      },
      rightPriceScale: {
        borderColor: computedStyle.getPropertyValue('--border').trim() || '#e5e5e5',
      },
      timeScale: {
        borderColor: computedStyle.getPropertyValue('--border').trim() || '#e5e5e5',
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: profit,
      downColor: loss,
      borderUpColor: profit,
      borderDownColor: loss,
      wickUpColor: profit,
      wickDownColor: loss,
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    chartRef.current = chart;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  return <div ref={containerRef} className="w-full" />;
}

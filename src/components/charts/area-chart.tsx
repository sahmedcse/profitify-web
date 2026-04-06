'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  label: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
}

export function AreaChart({ data, height = 300, color = 'var(--color-primary)' }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="label" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.1} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

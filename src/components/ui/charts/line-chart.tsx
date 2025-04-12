import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    stroke: string;
    name?: string;
  }[];
  xAxisDataKey?: string;
  height?: number | string;
  width?: number | string;
  grid?: boolean;
  legend?: boolean;
  tooltip?: boolean;
}

export function LineChart({
  data,
  lines,
  xAxisDataKey = "name",
  height = 300,
  width = "100%",
  grid = true,
  legend = true,
  tooltip = true
}: LineChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        {tooltip && <Tooltip />}
        {legend && <Legend />}
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={line.name || line.dataKey}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

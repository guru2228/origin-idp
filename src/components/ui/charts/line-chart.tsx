"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  width?: number | string;
  height?: number | string;
  xAxisDataKey?: string;
  lineDataKey?: string;
  lineColor?: string;
  strokeWidth?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom";
  className?: string;
}

export function LineChart({
  data,
  width = "100%",
  height = 300,
  xAxisDataKey = "name",
  lineDataKey = "value",
  lineColor = "hsl(var(--primary))",
  strokeWidth = 2,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  legendPosition = "bottom",
  className,
}: LineChartProps) {
  return (
    <div className={className} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "0.25rem" }}
            />
          )}
          {showLegend && <Legend layout="horizontal" verticalAlign={legendPosition} />}
          <Line
            type="monotone"
            dataKey={lineDataKey}
            stroke={lineColor}
            strokeWidth={strokeWidth}
            dot={{ r: 4, strokeWidth: 1 }}
            activeDot={{ r: 6, strokeWidth: 1 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;

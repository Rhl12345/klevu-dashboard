"use client";
import ChartHeader from "@/components/charts/ChartHeader";
import { ILineChartProps } from "@/types/charts/charts.type";
import { AXIS_CLASSES } from "@/utils/constants";
import { memo, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const LineChart = memo(
  ({
    data,
    title,
    dateRange,
    className,
    dropdownFilter,
    dateFilter,
    showTooltip = true,
    storeName,
    children,
    tooltipFormatter,
    yAxisLabel,
    xAxisLabel,
    lineColor = "#8884d8",
    xDataKey = "name",
    lineDataKey = "value",
  }: ILineChartProps) => {
    const chartData = useMemo(() => data, [data]);

    const hasData = useMemo(
      () => chartData.some((item) => item.value > 0),
      [chartData]
    );

    return (
      <div
        className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
        aria-label={`${title} line chart`}
      >
        <ChartHeader
          title={title}
          dateFilter={dateFilter}
          dropdownFilter={dropdownFilter}
          dateRange={dateRange}
          storeName={storeName}
        />

        {/* Chart Section */}
        {hasData ? (
          <div className="p-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={xDataKey}
                    label={{
                      value: xAxisLabel,
                      position: "bottom",
                      offset: 20,
                      style: {
                        textAnchor: "middle",
                      },
                      className: AXIS_CLASSES,
                    }}
                    tick={(props) => {
                      return (
                        <text {...props} dy={15} className={AXIS_CLASSES}>
                          {props.payload.value}
                        </text>
                      );
                    }}
                  />
                  <YAxis
                    label={{
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        textAnchor: "middle",
                      },
                      className: AXIS_CLASSES,
                    }}
                    tick={(props) => {
                      return (
                        <text {...props} dy={10} className={AXIS_CLASSES}>
                          {props.payload.value}
                        </text>
                      );
                    }}
                  />
                  {showTooltip && (
                    <Tooltip
                      formatter={tooltipFormatter}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey={lineDataKey}
                    stroke={lineColor}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  {children}
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No data available</div>
        )}
      </div>
    );
  }
);

export default LineChart;

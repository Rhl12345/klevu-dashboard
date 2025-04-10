"use client";
import ChartHeader from "@/components/charts/ChartHeader";
import { IScatterChartProps } from "@/types/charts/charts.type";
import { AXIS_CLASSES, COLOR_CODES } from "@/utils/constants";
import { memo, useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  ScatterChart as RechartsScatterChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * ScatterChart Component
 * @param {IScatterChartProps} props - The component props
 * @returns {JSX.Element} Rendered ScatterChart
 */
export const ScatterChart = memo(
  ({
    data,
    title,
    dateRange,
    className = "",
    dropdownFilter,
    showTooltip = true,
    storeName,
    children,
    dateFilter,
    tooltipFormatter,
    yAxisLabel,
    xAxisLabel,
    defaultColor = "#8884d8",
  }: IScatterChartProps) => {
    const chartData = useMemo(() => {
      try {
        return data?.map((item, index) => ({
          ...item,
          color: COLOR_CODES?.[index]?.code || defaultColor,
        }));
      } catch (error) {
        console.error("Error transforming chart data:", error);
        return [];
      }
    }, [data, defaultColor]);

    const hasData = useMemo(
      () => Array.isArray(data) && data.length > 0,
      [data]
    );

    return (
      <div
        className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
        aria-label={`${title} scatter chart`}
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
                <RechartsScatterChart
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="x"
                    type="number"
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
                        <text {...props} dy={10} className={AXIS_CLASSES}>
                          {props.payload.value}
                        </text>
                      );
                    }}
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
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
                  <Scatter data={chartData}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || defaultColor}
                      />
                    ))}
                  </Scatter>
                  {children}
                </RechartsScatterChart>
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

ScatterChart.displayName = "ScatterChart";

export default ScatterChart;

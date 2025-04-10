"use client";
import ChartHeader from "@/components/charts/ChartHeader";
import { IRadialBarChartProps } from "@/types/charts/charts.type";
import { COLOR_CODES } from "@/utils/constants";
import { memo, useMemo } from "react";
import {
  Legend,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/**
 * Radial Bar Chart component for displaying data visualizations
 * @param {IRadialBarChartProps} props - The component props
 * @returns {JSX.Element} Rendered RadialBarChart component
 */
export const RadialBarChart = memo(
  ({
    data,
    title,
    className = "",
    showTooltip = true,
    innerRadius = "45%",
    outerRadius = "120%",
    barSize = 20,
    startAngle = 180,
    endAngle = 0,
    children,
    storeName = "",
    dateRange = "",
    dataKey = "value",
    background = true,
    tooltipFormatter,
    dropdownFilter,
    dateFilter,
  }: IRadialBarChartProps) => {
    const chartData = useMemo(
      () =>
        data.map((item, index) => ({
          ...item,
          fill: COLOR_CODES[index].code,
        })),
      [data]
    );

    // Add prop validation for critical values
    if (innerRadius > outerRadius) {
      console.warn("innerRadius should not be greater than outerRadius");
    }

    return (
      <div
        className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
        aria-label={`${title} radial bar chart`}
      >
        {/* Header Section */}
        <ChartHeader
          title={title}
          dateFilter={dateFilter}
          dropdownFilter={dropdownFilter}
          dateRange={dateRange}
          storeName={storeName}
        />

        {/* Chart Section */}
        <div className="p-4">
          <div className="h-[300px]">
            {data?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsRadialBarChart
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  barSize={barSize}
                  data={chartData}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  cx="50%"
                  cy="50%"
                >
                  <RadialBar background={background} dataKey={dataKey} />
                  <Legend
                    iconSize={14}
                    wrapperStyle={{
                      paddingTop: "10px",
                      fontSize: "14px",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    payload={chartData.map((item) => ({
                      value: `${item.name} (${item.value}%)`,
                      type: "circle",
                      id: item.name,
                      color: item.fill,
                    }))}
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
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
                  {children}
                </RechartsRadialBarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default RadialBarChart;

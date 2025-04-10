"use client";
import ChartHeader from "@/components/charts/ChartHeader";
import { IBarChartProps } from "@/types/charts/charts.type";
import { AXIS_CLASSES } from "@/utils/constants";
import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * BarChart Component Props
 * @param {IBarChartProps} props - The props for the BarChart component.
 * @returns {JSX.Element} - The BarChart component.
 */
export const BarChart = ({
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
  barColor = "#8884d8",
  xDataKey = "name",
}: IBarChartProps) => {
  const hasData = useMemo(() => data.some((item) => item.value > 0), [data]);

  return (
    <div
      className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
      role="figure"
      aria-label={`Bar chart showing ${title}`}
    >
      {/* Header Section */}
      <ChartHeader
        title={title}
        dateRange={dateRange}
        storeName={storeName}
        dropdownFilter={dropdownFilter}
        dateFilter={dateFilter}
      />
      {/* Chart Section */}
      {hasData ? (
        <div className="p-4">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={data}
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
                  tickFormatter={(value) => value.toString()}
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
                      <text {...props} className={AXIS_CLASSES}>
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
                    cursor={{
                      className: "fill-gray-selected/60 dark:fill-gray-dark/60",
                    }}
                  />
                )}
                <Bar dataKey="value" fill={barColor} />
                {children}
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default BarChart;

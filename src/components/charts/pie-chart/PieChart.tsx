"use client";
import Button from "@/components/Button/Button";
import ChartHeader from "@/components/charts/ChartHeader";
import { ICustomLabelProps, IPieChartProps } from "@/types/charts/charts.type";
import { COLOR_CODES } from "@/utils/constants";
import { memo, useCallback, useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsChart,
  Label as RechartsLabel,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Custom Label Component
const CustomLabel = ({ viewBox, text, value }: ICustomLabelProps) => {
  if (!viewBox) return null;
  const { cx, cy } = viewBox;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="text-sm font-normal fill-quaternary-dark dark:fill-quaternary-light"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {text}
      </text>
      <text
        x={cx}
        y={cy + 20}
        className="text-xl font-semibold fill-quaternary-dark dark:fill-quaternary-light"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    </g>
  );
};

/**
 * Pie Chart component for displaying data visualizations
 * @param {IPieChartProps} props - The component props
 * @returns {JSX.Element} Rendered PieChart component
 */
export const PieChart = memo(
  ({
    data,
    title,
    dateRange,
    className,
    dropdownFilter,
    dateFilter,
    showTooltip = true,
    showLabels = false,
    storeName,
    centerLabel,
    children,
    tooltipFormatter,
  }: IPieChartProps) => {
    const [hiddenSegments, setHiddenSegments] = useState<Set<string>>(
      new Set()
    );

    const chartData = useMemo(() => {
      return data.map((item, index) => ({
        ...item,
        value: item.value,
        color: COLOR_CODES?.[index]?.code,
      }));
    }, [data]);

    const handleSegmentToggle = useCallback((segmentName: string) => {
      setHiddenSegments((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(segmentName)) {
          newSet.delete(segmentName);
        } else {
          newSet.add(segmentName);
        }
        return newSet;
      });
    }, []);

    const processedData = useMemo(
      () =>
        chartData.map((item, index) => ({
          ...item,
          value: item.value,
          displayColor: hiddenSegments.has(item.name)
            ? "#f3f4f6"
            : COLOR_CODES[index].code,
        })),
      [chartData, hiddenSegments]
    );

    const hasData = useMemo(
      () => chartData.some((item) => item.value > 0),
      [chartData]
    );

    return (
      <div
        className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
        aria-label={`${title} pie chart`}
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
        {hasData ? (
          <div className="p-4 lg:p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsChart>
                  <Pie
                    data={processedData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    label={showLabels}
                  >
                    {processedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.displayColor}
                        className="transition-opacity duration-200"
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                    {centerLabel && (
                      <RechartsLabel
                        content={
                          <CustomLabel
                            text={centerLabel.text}
                            value={centerLabel.value}
                          />
                        }
                        position="center"
                      />
                    )}
                  </Pie>
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
                        className:
                          "fill-gray-selected/60 dark:fill-gray-dark/60",
                      }}
                    />
                  )}
                  {children}
                </RechartsChart>
              </ResponsiveContainer>
            </div>

            {/* Legend Section */}
            <div className="mt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {chartData.map((segment) => (
                  <Button
                    key={segment.name}
                    onClick={() => handleSegmentToggle(segment.name)}
                    variant="outline-secondary"
                    size="sm"
                    className={`inline-flex items-center ${
                      hiddenSegments.has(segment.name) ? "opacity-50" : ""
                    }`}
                    icon={
                      <span
                        className="w-3 h-3 rounded-sm block"
                        style={{ backgroundColor: segment.color }}
                      />
                    }
                  >
                    {segment.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No data available</div>
        )}
      </div>
    );
  }
);

export default PieChart;

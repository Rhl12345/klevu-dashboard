import ChartHeader from "@/components/charts/ChartHeader";
import { IGeoChartProps } from "@/types/charts/charts.type";
import { useMemo } from "react";
import { Chart } from "react-google-charts";

/**
 * GeoChart component for displaying geographical data visualizations
 * @param {IGeoChartProps} props - The component props
 * @returns {JSX.Element} Rendered GeoChart component
 */
export const GeoChart = ({
  data,
  title,
  region = "US",
  className,
  showTooltip = true,
  dropdownFilter,
  storeName = "",
  dateRange = "",
  header = ["Location", "Value"],
  displayMode = "regions",
  colors = ["#e0f7fa", "#006064"],
  datalessRegionColor = "#f5f5f5",
  dateFilter,
  theme = "light",
}: IGeoChartProps) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) {
      return [header];
    }
    const rows = data.map((item) => [item.location, item.value]);
    return [header, ...rows];
  }, [data, header]);

  const options = useMemo(() => {
    return {
      ...(region !== "world" ? { region, resolution: "provinces" } : {}),
      displayMode,
      colorAxis: { colors },
      tooltip: { isHtml: showTooltip },
      datalessRegionColor,
      backgroundColor: theme === "dark" ? "#0c0e12" : "#ffffff",
    };
  }, [region, displayMode, colors, showTooltip, datalessRegionColor, theme]);

  return (
    <div
      className={`rounded-none border border-gray-light dark:border-gray-dark w-full overflow-auto md:overflow-x-auto md:max-w-full ${className}`}
    >
      <ChartHeader
        title={title}
        dateFilter={dateFilter}
        dropdownFilter={dropdownFilter}
        dateRange={dateRange}
        storeName={storeName}
      />

      {/* Chart Section */}
      <div className="p-4">
        <div className="h-[400px]">
          <Chart
            chartType="GeoChart"
            width="100%"
            height="100%"
            data={chartData}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default GeoChart;

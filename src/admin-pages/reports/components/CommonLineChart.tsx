import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { LineChart } from "@/components/charts/line-chart/LineChart";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  ICommonLineChartProps,
  IDateChangeHandler,
} from "@/types/reports/reports";
/**
 * CommonLineChart - A reusable line chart component with date filtering capabilities
 * @param props - See ICommonLineChartProps for detailed prop documentation
 */
const CommonLineChart = ({
  store,
  title,
  data,
  showTooltip = false,
  showDateFilter = false,
  xAxisLabel,
  yAxisLabel,
  lineColor,
  dateRange,
  className = "",
}: ICommonLineChartProps) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);

  const handleStartDateChange: IDateChangeHandler = useCallback(
    (date) => {
      if (date > endDate) {
        toast.error("Start date cannot be after end date");
        return;
      }
      setStartDate(date);
    },
    [endDate]
  );

  const handleEndDateChange: IDateChangeHandler = useCallback(
    (date) => {
      if (date < startDate) {
        toast.error("End date cannot be before start date");
        return;
      }
      setEndDate(date);
    },
    [startDate]
  );

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <LineChart
      className={className}
      title={title}
      data={data}
      dateRange={dateRange}
      showTooltip={showTooltip}
      storeName={store?.label}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      lineColor={lineColor}
      dateFilter={{
        startDate,
        endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        showDateFilter,
      }}
    />
  );
};

export default CommonLineChart;

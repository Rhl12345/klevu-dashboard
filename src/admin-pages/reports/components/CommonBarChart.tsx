import BarChart from "@/components/charts/bar-chart/BarChart";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  ICommonBarChartProps,
  IDateChangeHandler,
} from "@/types/reports/reports";
import { useState } from "react";
import { toast } from "react-toastify";
/**
 * CommonBarChart component for displaying a bar chart
 * @param {ICommonBarChartProps} props - The props for the CommonBarChart component
 * @returns A BarChart component displaying the data
 */

const CommonBarChart = ({
  store,
  title,
  data,
  showTooltip = false,
  xAxisLabel,
  yAxisLabel,
  showDateFilter = false,
}: ICommonBarChartProps) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);

  const handleStartDateChange: IDateChangeHandler = (date) => {
    if (date > endDate) {
      toast.error("Start date cannot be after end date");
      // Handle invalid date range
      return;
    }

    setStartDate(date);
  };

  const handleEndDateChange: IDateChangeHandler = (date) => {
    if (date < startDate) { 
      toast.error("End date cannot be before start date");
      // Handle invalid date range
      return;
    }
    setEndDate(date);
  };
  return (
    <BarChart
      title={title}
      data={data}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      dateFilter={{
        startDate: startDate,
        endDate: endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        showDateFilter: showDateFilter,
      }}
      storeName={store?.label}
      showTooltip={showTooltip}
    />
  );
};

export default CommonBarChart;

import PieChart from "@/components/charts/pie-chart/PieChart";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  ICommonPieChartProps,
  IDateChangeHandler,
} from "@/types/reports/reports";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * CommonPieChart component for displaying a pie chart
 * @param {ICommonPieChartProps} props - The props for the CommonPieChart component
 * @returns A PieChart component displaying the data
 */
const CommonPieChart = ({
  store,
  title,
  centerLabelText,
  centerLabelValue,
  data,
  showTooltip = false,
  showLabels = true,
  showDateFilter = false,
}: ICommonPieChartProps) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);

  const handleStartDateChange: IDateChangeHandler = (date) => {
    if (date > endDate) {
      // Add user feedback
      toast.error("Start date cannot be after end date");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange: IDateChangeHandler = (date) => {
    if (date < startDate) {
      // Handle invalid date range
      toast.error("End date cannot be before start date");
      return;
    }
    setEndDate(date);
  };

  return (
    <PieChart
      title={title}
      data={data}
      centerLabel={{
        text: centerLabelText,
        value: centerLabelValue,
      }}
      dateFilter={{
        startDate: startDate,
        endDate: endDate,
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        showDateFilter: showDateFilter,
      }}
      storeName={store?.label}
      showLabels={showLabels}
      showTooltip={showTooltip}
    />
  );
};

export default CommonPieChart;

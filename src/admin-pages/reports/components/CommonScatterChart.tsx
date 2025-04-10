import { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { ScatterChart } from "@/components/charts/scatter-chart/ScatterChart";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  ICommonScatterChartProps,
  IDateChangeHandler,
} from "@/types/reports/reports";

const ERROR_MESSAGES = {
  START_DATE: "Start date cannot be after end date",
  END_DATE: "End date cannot be before start date"
} as const;

/**
 * A reusable scatter chart component with optional date filtering capabilities
 * @param {ICommonScatterChartProps} props - Component props
 * @returns {JSX.Element} Rendered scatter chart
 */
const CommonScatterChart = ({
  store,
  title,
  data,
  showTooltip = false,
  xAxisLabel,
  yAxisLabel,
  showDateFilter = false,
  defaultColor,
}: ICommonScatterChartProps) => {
  const [startDate, setStartDate] = useState<Date>(DEFAULT_START_DATE);
  const [endDate, setEndDate] = useState<Date>(DEFAULT_END_DATE);

  const handleStartDateChange: IDateChangeHandler = useCallback((date) => {
    if (date > endDate) {
      toast.error(ERROR_MESSAGES.START_DATE);
      return;
    }
    setStartDate(date);
  }, [endDate]);

  const handleEndDateChange: IDateChangeHandler = useCallback((date) => {
    if (date < startDate) {
      toast.error(ERROR_MESSAGES.END_DATE);
      return;
    }
    setEndDate(date);
  }, [startDate]);

  const dateFilterProps = useMemo(() => ({
    startDate,
    endDate,
    onStartDateChange: handleStartDateChange,
    onEndDateChange: handleEndDateChange,
    showDateFilter
  }), [startDate, endDate, handleStartDateChange, handleEndDateChange, showDateFilter]);

  return (
    <ScatterChart
      title={title}
      data={data}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      dateFilter={dateFilterProps}
      storeName={store?.label}
      showTooltip={showTooltip}
      defaultColor={defaultColor}
    />
  );
};

export default CommonScatterChart;

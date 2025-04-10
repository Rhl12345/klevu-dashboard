import React, { useCallback } from "react";
import PieChart from "@/components/charts/pie-chart/PieChart";
import { ISettingsPieChartProps } from "@/types/settings-dashboard/settingsDashboard.type";

const SettingsPieChart = React.memo(
  ({ data, showTooltip, centerLabel }: ISettingsPieChartProps) => {
    const tooltipFormatter = useCallback(
      (value: number, name: string) => [`${value}`, name],
      []
    );

    return (
      <div role="region" aria-label="Settings Distribution Chart">
        <PieChart
          title={"Module Wise User Report"}
          data={data}
          showTooltip={showTooltip}
          centerLabel={centerLabel}
          tooltipFormatter={tooltipFormatter}
        />
      </div>
    );
  }
);

export default SettingsPieChart;

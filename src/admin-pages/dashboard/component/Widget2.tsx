import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import React, { useMemo } from "react";
import ReportsData from "@/mock-data/reports.json";
import { storeOptions } from "@/utils/Dummy";

const Widget2 = () => {
  const customerOrderReport = useMemo(
    () => ReportsData.customerOrderReport,
    []
  );

  return (
    <CommonPieChart
      store={storeOptions[0]}
      title="Customer Order Report"
      centerLabelText="Total"
      centerLabelValue={customerOrderReport.total}
      data={customerOrderReport.data}
      showTooltip={true}
      showLabels={false}
      showDateFilter={false}
    />
  );
};

export default Widget2;

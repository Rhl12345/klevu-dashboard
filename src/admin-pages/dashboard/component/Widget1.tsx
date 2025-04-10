import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import React, { useMemo } from "react";
import ReportsData from "@/mock-data/reports.json";
import { storeOptions } from "@/utils/Dummy";

const Widget1 = () => {
  const productStatusReport = useMemo(
    () => ReportsData.productStatusReport,
    []
  );

  return (
    <CommonPieChart
      store={storeOptions[0]}
      title="Product Status Report"
      centerLabelText="Total"
      centerLabelValue={productStatusReport.total}
      data={productStatusReport.data}
      showTooltip={true}
      showLabels={false}
      showDateFilter={false}
    />
  );
};

export default Widget1;

import CommonPieChart from "@/admin-pages/reports/components/CommonPieChart";
import React, { useMemo } from "react";
import ReportsData from "@/mock-data/reports.json";
import { storeOptions } from "@/utils/Dummy";

const Widget3 = () => {
  const productSyncStatusReport = useMemo(
    () => ReportsData.productSyncStatusReport,
    []
  );

  return (
    <CommonPieChart
      store={storeOptions[0]}
      title="Product Sync Status Report"
      centerLabelText="Total"
      centerLabelValue={productSyncStatusReport.total}
      data={productSyncStatusReport.data}
      showTooltip={true}
      showLabels={false}
      showDateFilter={false}
    />
  );
};

export default Widget3;

"use client";
import CommonDashBoard from "@/components/common/dashboard";
import React from "react";
import {
  STORE_SECTION,
  STORE_DASHBOARD_DATA,
  STORE_DASHBOARD_INFO,
  STORE_DASHBOARD_INFO_EXTRA,
} from "@/mock-data/masterProductFeedDashboard";

const MasterCatalogDashboard = () => {
  return (
    <CommonDashBoard
      storeSection={STORE_SECTION}
      storeDashboardData={STORE_DASHBOARD_DATA}
      storeDashboardInfo={STORE_DASHBOARD_INFO}
      storeDashboardInfoExtra={STORE_DASHBOARD_INFO_EXTRA}
    />
  );
};

export default MasterCatalogDashboard;

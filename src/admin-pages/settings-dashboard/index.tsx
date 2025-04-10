"use client";
import React from "react";
import CommonDashboard from "@/admin-pages/settings-dashboard/components/CommonDashboard";
import {
  SETTINGS_DASHBOARD_DATA,
  SETTINGS_MODULES_DATA,
  PIE_CHART_CONFIG,
} from "@/mock-data/settingsDashboard";
import { ISettingsDashboardProps } from "@/types/settings-dashboard/settingsDashboard.type";

const SettingsDashboard: React.FC<ISettingsDashboardProps> = () => {
  return (
    <>
      <CommonDashboard
        settingsDashboardData={SETTINGS_DASHBOARD_DATA}
        settingsModulesData={SETTINGS_MODULES_DATA}
        settingsPieChartData={[PIE_CHART_CONFIG]}
      />
    </>
  );
};

export default SettingsDashboard;

import React from "react";
import Grid from "@/components/Grid/Grid";
import { ISettingsDashboardProps } from "@/types/settings-dashboard/settingsDashboard.type";
import SettingsCard from "@/admin-pages/settings-dashboard/components/SettingsCard";
import SettingsModulesCard from "@/admin-pages/settings-dashboard/components/SettingsModulesCard";
import SettingsPieChart from "@/admin-pages/settings-dashboard/components/SettingsPieChart";

const CommonDashboard = React.memo(
  ({
    settingsDashboardData,
    settingsModulesData,
    settingsPieChartData,
  }: ISettingsDashboardProps) => {
    return (
      <>
        <div className="lg:py-8 py-4 w-full gap-4 lg:gap-8 px-4 lg:px-0">
          <Grid
            columns={settingsDashboardData.length}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 lg:max-w-5xl mx-auto"
            rowClassName="grid grid-cols-4 gap-6"
          >
            {settingsDashboardData.map((settingsCard) => (
              <SettingsCard key={settingsCard.title} {...settingsCard} />
            ))}
          </Grid>
        </div>

        <div className="lg:py-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full px-4 lg:px-0">
          <div className="col-span-1 lg:col-span-6">
            {settingsModulesData.map((settingsModulesCard) => (
              <SettingsModulesCard
                key={settingsModulesCard.title}
                {...settingsModulesCard}
              />
            ))}
          </div>

          <div className="col-span-1 lg:col-span-6">
            {settingsPieChartData.map((settingsPieChart) => (
              <SettingsPieChart
                key={settingsPieChart.title}
                {...settingsPieChart}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
);

export default CommonDashboard;

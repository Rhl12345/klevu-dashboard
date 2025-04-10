import React from "react";
import Text from "@/components/Text/Text";
import { ISettingsModulesCardProps } from "@/types/settings-dashboard/settingsDashboard.type";

const SettingsModulesCard = React.memo(
  ({ title, modules }: ISettingsModulesCardProps) => {
    return (
      <div className="relative w-full max-w-full text-center">
        <div className="p-4 font-semibold text-quaternary-dark dark:text-quaternary-light border border-b-0  border-gray-light dark:border-gray-dark ">
          <Text size="lg" align="center">
            {title}
          </Text>
        </div>
        <div className="p-4 text-quaternary-light dark:text-quaternary-light font-bold text-xs flex justify-between border border-b-0  border-gray-light dark:border-gray-dark">
          <div className="flex text-left text-quaternary-dark dark:text-quaternary-light text-xs uppercase gap-2">Module Name</div>
          <div className="flex text-right text-quaternary-dark dark:text-quaternary-light text-xs uppercase gap-2">Users</div>
        </div>
        {modules?.map((module) => (
          <div
            key={module.label}
            className="p-4 text-quaternary-dark dark:text-quaternary-light font-bold text-xs flex justify-between border border-b-0 last:!border-b border-gray-light dark:border-gray-dark"
          >
            {module.label}
            <div className="text-right">{module.value}</div>
          </div>
        ))}
      </div>
    );
  }
);

export default SettingsModulesCard;

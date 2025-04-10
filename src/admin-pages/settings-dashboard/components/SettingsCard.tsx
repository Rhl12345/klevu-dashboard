import React from "react";
import Link from "next/link";
import Text from "@/components/Text/Text";
import { ISettingsCardProps } from "@/types/settings-dashboard/settingsDashboard.type";

const SettingsCard = React.memo(
  ({ title, mainLink, links }: ISettingsCardProps) => {
    return (
      <div className="relative w-full max-w-full text-center">
        <Link href={mainLink || ""}>
          <div className="p-4 text-quaternary-light dark:text-quaternary-dark font-bold text-xs flex justify-between border border-b-0 border-gray-light dark:border-gray-dark">
            <Text size="lg" align="center">
              {title}
            </Text>
          </div>
        </Link>

        {links?.map((link) => (
          <div
            key={link.label}
            className="p-4 text-quaternary-dark dark:text-quaternary-light font-bold text-xs flex justify-between border border-b-0 last:!border-b border-gray-light dark:border-gray-dark"
          >
            <Link href={link.href || ""}>{link.label}</Link>
            {link.value}
          </div>
        ))}
      </div>
    );
  }
);

export default SettingsCard;

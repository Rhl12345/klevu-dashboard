"use client";
import MyTabs from "@/components/Tab/Tab";
import { usePathname, useRouter } from "next/navigation";
import { ITabOption } from "@/components/Tab/types";
import { IconName } from "@/components/SvgIcons/types";
import { PROFILE_PATHS } from "@/utils/constants";
import { IProfileSidebarProps } from "@/types/profile/myAccount.type";

const menuItems: ITabOption[] = [
  {
    id: 0,
    label: "My Account",
    icon: "UserIcon" as IconName,
  },
  {
    id: 1,
    label: "My Notification",
    icon: "BellIcon" as IconName,
  },
  {
    id: 2,
    label: "Account Activity",
    icon: "article" as IconName,
  },
  {
    id: 3,
    label: "User Permission",
    icon: "vpn_key" as IconName,
  },
  {
    id: 4,
    label: "System Log",
    icon: "article" as IconName,
  },
];

const ProfileSidebar = ({ userId }: IProfileSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Store paths separately if needed

  const handleTabClick = (index: number) => {
    router.push(`${PROFILE_PATHS[index]}/${userId}`);
  };

  return (
    <div className="flex flex-col">
      <MyTabs
        options={menuItems}
        activeTab={PROFILE_PATHS.findIndex(
          (item) => `${item}/${userId}` === pathname
        )}
        onTabClick={handleTabClick}
      />
    </div>
  );
};

export default ProfileSidebar;

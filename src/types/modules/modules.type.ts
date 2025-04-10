import { IconName } from "@/components/SvgIcons/types";

export interface IModule {
  id: string;
  name: string;
  isDisplay: boolean;
  accessCode: string;
  menuIcon: IconName;
  status: "active" | "inactive";
  hasChildren: boolean;
}

export interface IModuleData extends IModule {
  subRows?: IModule[];
}

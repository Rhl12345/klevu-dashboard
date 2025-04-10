export interface ISettingsDashboardProps {
  settingsDashboardData: ISettingsCardProps[];
  settingsModulesData: ISettingsModulesCardProps[];
  settingsPieChartData: ISettingsPieChartProps[];
}

export interface ISettingsCardProps {
  title: string;
  mainLink?: string;
  links?: Array<{
    href: string;
    label: string;
    value: number;
  }>;
  header?: string;
  modules?: Array<{
    label?: string;
    value?: number;
  }>;
}

export interface ISettingsLink {
  href: string;
  label: string;
  value: number | string;
}

export interface ISettingsModule {
  label: string;
  value: number | string;
}

export interface ISettingsModulesCardProps {
  title: string;
  header: string;
  modules: {
    label?: string;
    value?: number;
  }[];
}

interface IPieChartData {
  name: string;
  value: number;
  color: string;
}

export interface ISettingsPieChartProps {
  data: IPieChartData[];
  title?: string;
  showTooltip?: boolean;
  showLabels?: boolean;
  centerLabel?: {
    text: string;
    value: string | number;
  };
}

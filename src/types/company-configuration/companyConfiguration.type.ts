export interface ICompanyConfigurationOption {
  id: number | null;
  logo: string;
  company_name: string;
  full_name: string;
  email: string;
  phone: string;
  modules: string[];
  created_date: string | null;
  created_by: string | null;
  updated_date: string | null;
  updated_by: string | null;
  logout: string;
  recStatus: "A" | "I";
  login_type: "default" | "sso";
}

export interface ICompanyConfigurationProps {
  id?: string;
}
export interface IDropdownOption {
  label: string;
  value: string;
}

export interface ICompanyConfigurationFormValues {
  id: number | null;
  fullName: string;
  shortName: string;
  email: string;
  phone: string;
  companyLogo: string;
  logout: string;
  login_type: "default" | "sso";
}

export type TModalType = "delete" | "activeInactive" | null;

export interface ICellProps {
  row: {
    original: ICompanyConfigurationOption;
    getValue: () => string[] | number | boolean | null;
  };
}

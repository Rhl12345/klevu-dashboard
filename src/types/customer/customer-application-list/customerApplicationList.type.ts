export interface ICustomerApplicationList {
  id: number;
  organizationName: string;
  customerName: string;
  email: string;
  phone: string;
  createdDate: string;
  recStatus: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  industry: string;
  department_name: string;
  company_name: string;
  status: string;
  tier_name?: string;
  notes?: string;
  customer_number?: string;
  asi_distributor?: string;
  purpose_of_order?: string;
  styles_of_interest?: string;
  quantity?: string;
  in_hand_date?: string;
  additional_comments?: string;
  website?: string;
  annual_promotional?: string;
  is_company_under_supplier?: string;
}

export interface ICustomerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: ICustomerApplicationList | null;
}

export interface IFormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | undefined | null;
}
 
export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

export interface IFilterOption {
  columnName: string;
  name: string;
  type: 'checkbox' | 'date' | 'select';
  options: any[] | null;
  conditionalSearch?: boolean;
}
export interface IFilteringOption {
  value: string;
  label: string;
}


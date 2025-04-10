export interface ICustomerCredential {
  email: string;
  password: string;
  onResetPassword?: () => void;
}

export interface ICustomerTableProps {
  customers: ICustomerCredential[];
} 
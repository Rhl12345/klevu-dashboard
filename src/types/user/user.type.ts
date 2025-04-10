export interface IFormValues {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface ICloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  userId: number;
}

export interface IAdminUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reportingTo: string;
  isSuperUser: boolean;
  role?: string; // optional since it's only shown when isSuperUser is false
}

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  image: string;
  role: string;
  recStatus: string;
  lastLoginTime?: string;
  createdDate?: string;
  modifiedDate?: string;
  createdName?: string;
  modifiedName?: string;
}

export interface IFormValuesUsers {
  adminUserViewModel: IAdminUser[];
}

export interface IDropdownOption {
  label: string;
  value: string;
}

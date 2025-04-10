import { FormikProps } from "formik";

export interface IMyAccountFormValues {
  firstname: string;
  lastname: string;
  phone: string;
  acceptNewsletter: boolean;
  isSuperUser: boolean;
  reportingTo: { value: string; label: string };
}

export interface IMyAccountProps {
  formik: FormikProps<IMyAccountFormValues>;
}

export interface IProfileSidebarProps {
  userId: string | number;
  setActiveTab: (tab: number) => void;
}

export interface IPermissionData {
  id: string;
  name: string;
  hasChildren: boolean;
  bgColor: string;
  parentId: string | null;
  permissions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
  subRows?: IPermissionData[];
}

export interface IPermissionAction {
  view: boolean;
  edit: boolean;
  delete: boolean;
}

export interface IPermissionColumn {
  id: string;
  header: string;
  accessorKey: string;
  cell: ({ row }: { row: any }) => JSX.Element;
}

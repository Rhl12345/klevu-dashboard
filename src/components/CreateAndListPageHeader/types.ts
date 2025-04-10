import { ReactNode } from "react";

export interface IListPageHeaderProps {
  moduleName: string;
  children?: ReactNode;
  name?: string;
  navigateUrl?: string;
  className?: string;
  showBackButton?: boolean;
  usedInsideSection?: boolean;
}
export interface IContentHeader {
  children?: ReactNode;
  name?: string;
  className?: string;
}

export interface ICreatePageHeaderProps {
  module: string;
  navigateUrl?: string;
  saveButtonName?: string;
  cancelButtonName?: string;
  validateForm?: () => Promise<any>;
  toolTipMessage?: string;
  buttonType?: "button" | "submit" | "reset";
  children?: ReactNode;
  borderShow?: boolean;
  onSubmit?: () => Promise<void>;
  showBackButton?: boolean;
  showCancelButton?: boolean;
}

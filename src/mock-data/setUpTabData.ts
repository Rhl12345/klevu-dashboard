import { ITabOption } from "@/components/Tab/types";
import { ITypeOptions } from "@/types/account-activity/accountActivity.type";

export const typeOptions: ITypeOptions[] = [
  { value: "3", label: "Corporate" },
  { value: "4", label: "Healthcare" },
  { value: "5", label: "Team" },
  // Add other options as needed
];

export const paymentMethods = [
  { id: 1, payment: "individual cards", delivery: "individual addresses" },
  { id: 2, payment: "individual cards", delivery: "one address" },
  { id: 3, payment: "individual cards", delivery: "both" },
  { id: 4, payment: "bulk payment", delivery: "individual addresses" },
  { id: 5, payment: "bulk payment", delivery: "one address" },
  { id: 6, payment: "bulk payment", delivery: "both" },
  { id: 7, payment: "both", delivery: "individual addresses" },
  { id: 8, payment: "both", delivery: "one address" },
  { id: 9, payment: "both", delivery: "both" },
];

export const tabItems: ITabOption[] = [
  { id: 0, label: "Setup" },
  { id: 1, label: "General" },
  { id: 2, label: "Payment & Info" },
  { id: 3, label: "Taxes & Fees" },
  { id: 4, label: "Messages" },
  { id: 5, label: "Theme Configuration" },
  { id: 6, label: "Popup Configurator" },
  { id: 7, label: "Categories" },
  { id: 8, label: "Products" },
  { id: 9, label: "Sequence" },
  { id: 10, label: "Report" },
  { id: 11, label: "Share Report" },
  { id: 12, label: "Brand Master" },
];

export const DISABLED_TABS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

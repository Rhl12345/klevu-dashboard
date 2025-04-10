import { ITabOption } from "@/components/Tab/types";
import { ICONTACT_INFO_TAB } from "@/types/store-builder-store-report/fundRaisingReport.type";
export const tabItems: ITabOption[] = [
  { id: 0, label: "Order Report" },
  { id: 1, label: "Product Report" },
  { id: 2, label: "Customer Report" },
  { id: 3, label: "Fundraising Report" },
  { id: 4, label: "Flyers" },
  { id: 5, label: "Receipts" },
  { id: 6, label: "Order Details" },
];

export const CONTACT_INFO_TAB: ICONTACT_INFO_TAB[] = [
  { value: 0, label: "Naynesh Pandya" },
  { value: 1, label: "Vishal Varma" },
  { value: 2, label: "Rohit Kshatriya" },
  { value: 3, label: "Priya Chitlangia" },
  { value: 4, label: "Alpesh P Prajapati" },
  { value: 5, label: "Rutvi K" },
];

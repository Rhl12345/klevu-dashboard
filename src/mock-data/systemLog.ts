import { IDropdownOption } from "@/types/common/common.type";
import systemLogData from "@/mock-data/systemLog.json";

const ipAddressValues: IDropdownOption[] = systemLogData.myLogData.map((item) => ({
  value: item.ipAddress,
  label: item.ipAddress,
}));

const eventValues: IDropdownOption[] = [
  { value: "Created", label: "Created" },
  { value: "Updated", label: "Updated" },
  { value: "Deleted", label: "Deleted" },
];

const pageNamesValues: IDropdownOption[] = systemLogData.myLogData.map((item) => ({
  value: item.page,
  label: item.page,
}));

const moduleNamesValues: IDropdownOption[] = systemLogData.myLogData.map((item) => ({
  value: item.module,
  label: item.module,
}));

export const moreFilterOption = [
  {
    name: "Event",
    options: eventValues,
    columnName: "event",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "Page",
    options: pageNamesValues,
    columnName: "page",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "Module",
    options: moduleNamesValues,
    columnName: "moduleId",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "IP Address",
    options: ipAddressValues,
    columnName: "ipAddress",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "Date",
    options: [],
    columnName: "date",
    type: "date",
    conditionalSearch: true,
  },
];

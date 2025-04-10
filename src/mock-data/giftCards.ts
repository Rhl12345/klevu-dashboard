import { IMoreFilterOption } from "@/types/common/common.type";
import { userNameValues } from "@/utils/constants";

export const moreFilterOption: IMoreFilterOption[] = [
  {
    columnName: "createdby",
    name: "Created By",
    type: "checkbox",
    options: userNameValues,
    conditionalSearch: true,
  },
  {
    columnName: "createddate",
    name: "Created Date",
    type: "date",
    options: null,
  },
  {
    columnName: "modifiedby",
    name: "Updated By",
    type: "checkbox",
    options: userNameValues,
    conditionalSearch: true,
  },
  {
    columnName: "modifieddate",
    name: "Updated Date",
    type: "date",
    options: null,
  },
];

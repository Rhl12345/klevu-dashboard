import { IDropdownOption, IMoreFilterOption } from "@/types/common/common.type";

export const userNameValues: IDropdownOption[] = [
    {
      value: "133",
      label: "Aakash  Chaudhary",
    },
    {
      value: "93",
      label: "Alex Alutto",
    },
    {
      value: "82",
      label: "Alex Dumais",
    },
    {
      value: "47",
      label: "Alex Pohl",
    },
    {
      value: "40",
      label: "Alexis Bernard",
    },
    {
      value: "24",
      label: "Allysa Beaton",
    },
    {
      value: "4",
      label: "Alpesh Prajapati",
    },
    {
      value: "44",
      label: "Amanda Rosenberg",
    },
  ];

  
export const moreFilterOption : IMoreFilterOption[] = [
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

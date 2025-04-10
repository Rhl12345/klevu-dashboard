import { ICustomLogoData } from "./company.type";

export interface ITableCellProps {
  row: {
    original: ICustomLogoData;
    getValue: () => any;
  };
}


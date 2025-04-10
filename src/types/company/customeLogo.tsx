import { ModalType } from "@/admin-pages/company/components/tabsPages/customLogo";
import { ICustomLogoData } from "./company.type";

 export interface ITableCellProps {
  row: {
    original: ICustomLogoData;
    getValue: () => any;
  };
}

export interface IModalState {
  isOpen: boolean;
  type: ModalType;
  selectedLogo: ICustomLogoData | null;
}
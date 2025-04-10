export interface IAdditionalProduct {
    id: number;
    name: string;
    amount: number;
    description: string;
    hideFromCustomer: boolean;
    fundRaising: boolean;
  }
  export interface IAdditionalProductCellProps {
    row: {
      original: IAdditionalProduct;
    };
    getValue: () => any;
  }
  export interface IModalType {
    type: "edit" | "add" | null;
  }
  export interface IModalState {
    isOpen: boolean;
    type: IModalType["type"];
  }
 export  interface IProductAdditionalPriceModalProps {
    isOpen: boolean;
    editId: number | null;
    setModalState: (modalState: IModalState) => void;
    setEditId: (editId: number | null) => void;
  }
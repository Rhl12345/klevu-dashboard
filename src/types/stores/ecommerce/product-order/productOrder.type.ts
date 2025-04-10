export interface IImportModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  export interface IImportFormValues {
    file: File | null;
  }

  export interface IProduct {
    productName: string;
    image: string;
    productId: string;
    msrp: number;
    ourSku: number;
  }
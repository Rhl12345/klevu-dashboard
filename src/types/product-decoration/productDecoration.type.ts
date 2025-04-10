interface IProductDecorationItem {
  logoType: string;
  logoLocation: string;
  logoNo: string;
  logoFileUrl: string;
  sewOutUrl: string;
  dstFileUrl: string;
  sewOutProofFileUrl: string;
  sewOutThreadColor: string;
  logoLocationId: number;
  logoTypeId: string | number;
}

interface IProductDecorationFormValues {
  description: string;
  logoTypeId: string;
  logoFileUrl: string;
}

interface IProductDecorationLogoType {
  handleClose: () => void;
  isModalOpen: {
    isOpen: boolean;
    type: "add" | "edit" | "delete" | "applyLogoToAllProducts" | null;
  };
}

export type {
  IProductDecorationItem,
  IProductDecorationFormValues,
  IProductDecorationLogoType,
};

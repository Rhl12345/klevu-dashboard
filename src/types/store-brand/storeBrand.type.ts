import { SetStateAction, Dispatch } from "react";

export interface IStoreBrand {
  id: string | number;
  brandLogoUrl: string;
  brandName: string;
  productCount: number;
  activeProductCount: number;
  vendorName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedName: string;
  recStatus: string;
  recordName: string;
}

export interface ICatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ICatalogData;
  catalogId: number;
}

export interface ICatalogData {
  catalogName: string;
  catalogLogo: string;
  uploadCatalogURL: string;
  displayOrder: number | string;
  recStatus: string;
  uploadCatalogName: string;
}

export interface IProductModalProps {
  productName: string;
  imageUrl: string;
  name: string;
  sku: string;
  msrp: number;
  showBorder: boolean;
  showProductName: boolean;
  showSplitProducts: boolean;
  showButton: boolean;
  showPrice: boolean;
  showBrandLogo: boolean;
}

export interface IAllProductsTabProps {
  AllProductsData: IProductModalProps[];
  selectedRows: IProductModalProps[];
  setSelectedRows: Dispatch<SetStateAction<IProductModalProps[]>>;
}

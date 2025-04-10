import { Dispatch, SetStateAction } from "react";

export interface ICategory {
  id: string;
  title: string;
  products: number;
  createddate: string;
  createdby: string;
  modifieddate: string;
  modifiedby: string;
  recStatus: string;
  description: string;
  displayOrder: number;
  subRows?: ICategory[];
  parentCategory: string;
  parentCategoryName: string;
  bannerImage: string;
  customCollectionUrl: string;
  seName: string;
  showBorder: boolean;
  showProductName: boolean;
  showSplitProducts: boolean;
  showButton: boolean;
  showPrice: boolean;
  showBrandLogo: boolean;
}
export interface IAllProductsTabProps {
  AllProductsData: any;
  selectedRows: any[];
  setSelectedRows: Dispatch<SetStateAction<any[]>>;
}
export interface IProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface IcategoryProductModalProps {
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
 
// export interface IAllProductsTabProps {
//   AllProductsData: IProductModalProps[];
//   selectedRows: IProductModalProps[];
//   setSelectedRows: Dispatch<SetStateAction<IProductModalProps[]>>;
// }
 
